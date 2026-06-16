// qris-webhook — public payment-provider callback (signature verified).
// Settles a payment by order_id and propagates status to its parking session.
import { json, methodNotAllowed, preflight } from "../_shared/http.ts";
import { createAdminClient } from "../_shared/supabase.ts";

const SUCCESS = new Set([
  "paid",
  "settlement",
  "capture",
  "success",
  "succeeded",
  "settled",
]);
const FAILED = new Set(["expire", "expired", "cancel", "deny", "failure", "failed"]);

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifySignature(
  raw: string,
  signature: string | null,
  secret: string,
): Promise<boolean> {
  if (!signature) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(raw),
  );
  const hex = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return constantTimeEqual(hex, signature.toLowerCase());
}

interface WebhookPayload {
  order_id?: string;
  external_id?: string;
  transaction_id?: string;
  id?: string;
  status?: string;
  transaction_status?: string;
  [key: string]: unknown;
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const raw = await req.text();

    // Verify the HMAC signature when a secret is configured. In stub mode
    // (no secret) verification is skipped so local testing works.
    const secret = Deno.env.get("QRIS_WEBHOOK_SECRET");
    if (secret) {
      const sig = req.headers.get("x-signature");
      if (!(await verifySignature(raw, sig, secret))) {
        return json({ error: "invalid_signature" }, 401);
      }
    }

    let payload: WebhookPayload;
    try {
      payload = JSON.parse(raw) as WebhookPayload;
    } catch {
      return json({ error: "invalid_json" }, 400);
    }

    const orderId = payload.order_id ?? payload.external_id;
    if (!orderId) return json({ error: "order_id_required" }, 400);

    const supabase = createAdminClient();
    const { data: payment } = await supabase
      .from("payments")
      .select("id, session_id, amount, status")
      .eq("order_id", orderId)
      .maybeSingle();
    if (!payment) return json({ error: "payment_not_found" }, 404);

    const rawStatus = (payload.status ?? payload.transaction_status ?? "")
      .toString()
      .toLowerCase();
    const isPaid = SUCCESS.has(rawStatus);
    const isFailed = FAILED.has(rawStatus);
    const newStatus = isPaid ? "paid" : isFailed ? "failed" : "pending";

    await supabase
      .from("payments")
      .update({
        status: newStatus,
        provider_txn_id:
          payload.transaction_id ?? payload.id ?? null,
        paid_at: isPaid ? new Date().toISOString() : null,
        webhook_payload: payload,
      })
      .eq("id", payment.id);

    // Propagate to the parking session.
    if (payment.session_id && (isPaid || isFailed)) {
      await supabase
        .from("parking_sessions")
        .update({
          payment_status: newStatus,
          fee_paid: isPaid ? payment.amount : 0,
          session_status: isPaid ? "completed" : "active",
        })
        .eq("id", payment.session_id);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("qris-webhook", err);
    return json({ error: "internal_error" }, 500);
  }
});

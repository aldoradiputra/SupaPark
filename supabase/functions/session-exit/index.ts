// session-exit — lane-authenticated vehicle exit.
// Finds the active session, computes the fee from the location tariff, creates
// a (stubbed) QRIS payment when one is due, and closes the session.
import { authenticateLane } from "../_shared/auth.ts";
import { json, methodNotAllowed, preflight, readJson } from "../_shared/http.ts";
import { normalizePlate } from "../_shared/plate.ts";
import { createAdminClient } from "../_shared/supabase.ts";
import {
  asVehicleType,
  calculateFee,
  type TariffConfig,
  tierFor,
} from "../_shared/tariff.ts";

interface ExitBody {
  plate: string;
  plate_normalized?: string;
  lane_id?: string;
}

// Stub mode auto-settles QRIS immediately. Set QRIS_STUB=false to leave the
// payment pending for the qris-webhook to settle.
const AUTO_SETTLE = (Deno.env.get("QRIS_STUB") ?? "true") !== "false";

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const supabase = createAdminClient();

    const lane = await authenticateLane(req, supabase);
    if (!lane) return json({ error: "unauthorized" }, 401);

    const body = await readJson<ExitBody>(req);
    if (!body?.plate) return json({ error: "plate_required" }, 400);

    const locationId = lane.location_id;
    const norm = body.plate_normalized?.trim() || normalizePlate(body.plate);

    // Most recent active session for this plate at this location.
    const { data: session } = await supabase
      .from("parking_sessions")
      .select("id, entry_time, vehicle_type, is_member, payment_status")
      .eq("location_id", locationId)
      .eq("plate_normalized", norm)
      .eq("session_status", "active")
      .order("entry_time", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!session) return json({ error: "no_active_session" }, 404);

    const { data: location } = await supabase
      .from("locations")
      .select("tariff_config")
      .eq("id", locationId)
      .maybeSingle();

    const now = new Date();
    const entry = new Date(session.entry_time);
    const durationMin = Math.max(
      0,
      Math.round((now.getTime() - entry.getTime()) / 60000),
    );
    const vt = asVehicleType(session.vehicle_type);
    const tier = tierFor(location?.tariff_config as TariffConfig | null, vt);
    const alreadyPaid = session.payment_status === "paid";
    const fee = alreadyPaid
      ? 0
      : calculateFee(tier, durationMin, session.is_member);

    let paymentId: string | null = null;
    let qrString: string | null = null;
    let qrUrl: string | null = null;
    let paymentStatus: string = alreadyPaid ? "paid" : "pending";

    if (!alreadyPaid && fee > 0) {
      // Create a (stub) QRIS payment.
      const orderId = `SP-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
      qrString = `SUPAPARK-QRIS-${orderId}`;
      qrUrl = `https://stub.supapark.local/qr/${orderId}.png`;
      const settled = AUTO_SETTLE;
      const { data: payment } = await supabase
        .from("payments")
        .insert({
          session_id: session.id,
          method: "qris",
          amount: fee,
          order_id: orderId,
          qr_string: qrString,
          qr_url: qrUrl,
          status: settled ? "paid" : "pending",
          provider_txn_id: settled ? `STUB-${orderId}` : null,
          paid_at: settled ? now.toISOString() : null,
        })
        .select("id")
        .single();
      paymentId = payment?.id ?? null;
      paymentStatus = settled ? "paid" : "pending";
    } else {
      // Free (member / within grace) or already prepaid.
      paymentStatus = "paid";
    }

    const isPaid = paymentStatus === "paid";
    await supabase
      .from("parking_sessions")
      .update({
        exit_lane_id: lane.id,
        exit_time: now.toISOString(),
        duration_min: durationMin,
        fee_calculated: fee,
        fee_paid: isPaid ? fee : 0,
        payment_method: session.is_member ? "member" : fee > 0 ? "qris" : "free",
        payment_status: isPaid ? "paid" : "pending",
        session_status: isPaid ? "completed" : "active",
        synced_at: now.toISOString(),
      })
      .eq("id", session.id);

    return json({
      session_id: session.id,
      plate: body.plate,
      fee,
      is_member: session.is_member,
      payment_status: paymentStatus,
      qr_string: qrString,
      qr_url: qrUrl,
      payment_id: paymentId,
    });
  } catch (err) {
    console.error("session-exit", err);
    return json({ error: "internal_error" }, 500);
  }
});

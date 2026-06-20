// session-sync — lane-authenticated bulk upload of offline-queued sessions.
// Each session is upserted by its edge_session_id (idempotent). If a session
// asks to notify on sync and we have a phone for the plate, we log a (stub)
// notification.
import { authenticateLane } from "../_shared/auth.ts";
import { json, methodNotAllowed, preflight, readJson } from "../_shared/http.ts";
import { normalizePlate } from "../_shared/plate.ts";
import { createAdminClient } from "../_shared/supabase.ts";
import { asVehicleType } from "../_shared/tariff.ts";

interface EdgeSession {
  edge_session_id: string;
  plate: string;
  vehicle_type?: string;
  entry_time?: string;
  exit_time?: string | null;
  duration_min?: number | null;
  fee_calculated?: number | null;
  fee_paid?: number | null;
  payment_method?: string | null;
  payment_status?: string | null;
  session_status?: string | null;
  is_member?: boolean;
  notify_on_sync?: boolean;
}

interface SyncBody {
  sessions: EdgeSession[];
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const supabase = createAdminClient();

    const lane = await authenticateLane(req, supabase);
    if (!lane) return json({ error: "unauthorized" }, 401);

    const body = await readJson<SyncBody>(req);
    if (!Array.isArray(body?.sessions)) {
      return json({ error: "sessions_required" }, 400);
    }

    const now = new Date().toISOString();
    let synced = 0;
    let errors = 0;

    for (const s of body.sessions) {
      if (!s?.edge_session_id || !s?.plate) {
        errors++;
        continue;
      }
      try {
        const norm = normalizePlate(s.plate);

        // Best-effort link to the global vehicle identity.
        const { data: vehicle } = await supabase
          .from("vehicles")
          .select("id, phone")
          .eq("plate_normalized", norm)
          .maybeSingle();

        const { error } = await supabase.from("parking_sessions").upsert(
          {
            edge_session_id: s.edge_session_id,
            location_id: lane.location_id,
            entry_lane_id: lane.id,
            vehicle_id: vehicle?.id ?? null,
            plate: s.plate,
            vehicle_type: asVehicleType(s.vehicle_type),
            entry_time: s.entry_time ?? now,
            exit_time: s.exit_time ?? null,
            duration_min: s.duration_min ?? null,
            fee_calculated: s.fee_calculated ?? 0,
            fee_paid: s.fee_paid ?? 0,
            payment_method: s.payment_method ?? null,
            payment_status: s.payment_status ?? "pending",
            session_status: s.session_status ?? "completed",
            is_member: s.is_member ?? false,
            synced_at: now,
          },
          { onConflict: "edge_session_id" },
        );
        if (error) {
          errors++;
          continue;
        }

        if (s.notify_on_sync && vehicle?.phone) {
          // Stub: real implementation queues a WhatsApp/push receipt.
          console.log(
            `notify ${vehicle.phone} for session ${s.edge_session_id}`,
          );
        }
        synced++;
      } catch (_e) {
        errors++;
      }
    }

    return json({ synced, errors });
  } catch (err) {
    console.error("session-sync", err);
    return json({ error: "internal_error" }, 500);
  }
});

// session-entry — lane-authenticated vehicle entry.
// Verifies the lane key, ensures the vehicle exists, rejects blacklisted
// plates, opens a parking session, and returns member/tariff/occupancy info
// for the gate to cache and display.
import { authenticateLane } from "../_shared/auth.ts";
import { json, methodNotAllowed, preflight, readJson } from "../_shared/http.ts";
import { normalizePlate } from "../_shared/plate.ts";
import { createAdminClient } from "../_shared/supabase.ts";
import {
  asVehicleType,
  type TariffConfig,
  tierFor,
} from "../_shared/tariff.ts";

interface EntryBody {
  plate: string;
  plate_normalized?: string;
  vehicle_type?: string;
  confidence?: number;
  lane_id?: string;
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const supabase = createAdminClient();

    const lane = await authenticateLane(req, supabase);
    if (!lane) return json({ error: "unauthorized" }, 401);

    const body = await readJson<EntryBody>(req);
    if (!body?.plate) return json({ error: "plate_required" }, 400);

    const locationId = lane.location_id;
    const norm = body.plate_normalized?.trim() || normalizePlate(body.plate);
    const vt = asVehicleType(body.vehicle_type);

    // Location: tariff + capacity.
    const { data: location } = await supabase
      .from("locations")
      .select("tariff_config, capacity_car, capacity_moto")
      .eq("id", locationId)
      .maybeSingle();

    // Reject blacklisted plates for this location.
    const { data: rules } = await supabase
      .from("plate_rules")
      .select("rule_type")
      .eq("location_id", locationId)
      .eq("plate_normalized", norm);
    if ((rules ?? []).some((r) => r.rule_type === "blacklist")) {
      return json({ error: "blacklisted", allowed: false }, 403);
    }

    // Ensure the vehicle exists (global identity). The session-insert trigger
    // bumps last_seen + visit_count, so we don't touch them here.
    let { data: vehicle } = await supabase
      .from("vehicles")
      .select("id, phone")
      .eq("plate_normalized", norm)
      .maybeSingle();
    if (!vehicle) {
      const inserted = await supabase
        .from("vehicles")
        .insert({ plate: body.plate, vehicle_type: vt })
        .select("id, phone")
        .single();
      if (inserted.error) {
        return json({ error: "vehicle_upsert_failed" }, 500);
      }
      vehicle = inserted.data;
    }

    // Active membership at this location (respecting validity window).
    const today = new Date().toISOString().slice(0, 10);
    const { data: members } = await supabase
      .from("members")
      .select("valid_from, valid_until")
      .eq("location_id", locationId)
      .eq("plate_normalized", norm)
      .eq("active", true);
    const isMember = (members ?? []).some(
      (m) =>
        (!m.valid_from || m.valid_from <= today) &&
        (!m.valid_until || m.valid_until >= today),
    );

    // Open the session.
    const { data: session, error: sessionError } = await supabase
      .from("parking_sessions")
      .insert({
        location_id: locationId,
        entry_lane_id: lane.id,
        vehicle_id: vehicle.id,
        plate: body.plate,
        plate_confidence: body.confidence ?? null,
        vehicle_type: vt,
        is_member: isMember,
        session_status: "active",
        payment_status: "pending",
      })
      .select("id")
      .single();
    if (sessionError || !session) {
      return json({ error: "session_create_failed" }, 500);
    }

    // Occupancy (after entry) for this vehicle type.
    const capacity =
      vt === "motorcycle"
        ? (location?.capacity_moto ?? 0)
        : (location?.capacity_car ?? 0);
    const { count } = await supabase
      .from("parking_sessions")
      .select("*", { count: "exact", head: true })
      .eq("location_id", locationId)
      .eq("session_status", "active")
      .eq("vehicle_type", vt);
    const slotsAvailable = Math.max(0, capacity - (count ?? 0));

    return json({
      session_id: session.id,
      is_member: isMember,
      phone: vehicle.phone ?? null,
      tariff_info: tierFor(location?.tariff_config as TariffConfig | null, vt),
      slots_available: slotsAvailable,
    });
  } catch (err) {
    console.error("session-entry", err);
    return json({ error: "internal_error" }, 500);
  }
});

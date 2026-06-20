// lane-heartbeat — lane-authenticated liveness ping.
// Updates lanes.last_heartbeat and status. firmware_version is accepted but
// not persisted (no column on lanes yet).
import { authenticateLane } from "../_shared/auth.ts";
import { json, methodNotAllowed, preflight, readJson } from "../_shared/http.ts";
import { createAdminClient } from "../_shared/supabase.ts";

const LANE_STATUSES = new Set(["online", "offline", "maintenance", "disabled"]);

interface HeartbeatBody {
  lane_id?: string;
  status?: string;
  firmware_version?: string;
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const supabase = createAdminClient();

    const lane = await authenticateLane(req, supabase);
    if (!lane) return json({ error: "unauthorized" }, 401);

    const body = (await readJson<HeartbeatBody>(req)) ?? {};
    const status =
      body.status && LANE_STATUSES.has(body.status) ? body.status : "online";

    const { error } = await supabase
      .from("lanes")
      .update({ status, last_heartbeat: new Date().toISOString() })
      .eq("id", lane.id);
    if (error) return json({ error: "update_failed" }, 500);

    return json({ ok: true, lane_id: lane.id, status });
  } catch (err) {
    console.error("lane-heartbeat", err);
    return json({ error: "internal_error" }, 500);
  }
});

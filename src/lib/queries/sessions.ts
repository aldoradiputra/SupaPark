import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { SessionStatus } from "@/types";

export interface ListSessionsParams {
  locationId?: string;
  status?: SessionStatus;
  limit?: number;
}

export async function listParkingSessions(
  supabase: TypedSupabaseClient,
  { locationId, status, limit = 50 }: ListSessionsParams = {},
) {
  let query = supabase
    .from("parking_sessions")
    .select("*")
    .order("entry_time", { ascending: false })
    .limit(limit);

  if (locationId) query = query.eq("location_id", locationId);
  if (status) query = query.eq("session_status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getParkingSessionById(
  supabase: TypedSupabaseClient,
  id: string,
) {
  const { data, error } = await supabase
    .from("parking_sessions")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Count vehicles currently inside (active sessions) for a location. */
export async function countActiveSessions(
  supabase: TypedSupabaseClient,
  locationId?: string,
) {
  let query = supabase
    .from("parking_sessions")
    .select("*", { count: "exact", head: true })
    .eq("session_status", "active");
  if (locationId) query = query.eq("location_id", locationId);

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

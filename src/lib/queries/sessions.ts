import { revenueDaily } from "@/lib/queries/revenue";
import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { ParkingSession, PaymentStatus, SessionStatus } from "@/types";

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

export interface ListSessionsPageParams {
  locationId: string;
  search?: string;
  paymentStatus?: PaymentStatus;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export interface SessionsPage {
  rows: ParkingSession[];
  count: number;
}

/** Paginated, filterable sessions for the sessions table. */
export async function listParkingSessionsPaged(
  supabase: TypedSupabaseClient,
  p: ListSessionsPageParams,
): Promise<SessionsPage> {
  const limit = p.limit ?? 20;
  const offset = p.offset ?? 0;

  let query = supabase
    .from("parking_sessions")
    .select("*", { count: "exact" })
    .eq("location_id", p.locationId)
    .order("entry_time", { ascending: false })
    .range(offset, offset + limit - 1);

  if (p.search) query = query.ilike("plate", `%${p.search}%`);
  if (p.paymentStatus) query = query.eq("payment_status", p.paymentStatus);
  if (p.from) query = query.gte("entry_time", p.from);
  if (p.to) query = query.lte("entry_time", p.to);

  const { data, count, error } = await query;
  if (error) throw error;
  return { rows: data ?? [], count: count ?? 0 };
}

export interface OverviewStats {
  activeCount: number;
  todayRevenue: number;
  todaySessions: number;
  recent: ParkingSession[];
}

/** Headline metrics + recent sessions for the overview page. */
export async function getOverview(
  supabase: TypedSupabaseClient,
  locationId: string,
): Promise<OverviewStats> {
  const [activeCount, daily, recent] = await Promise.all([
    countActiveSessions(supabase, locationId),
    revenueDaily(supabase, locationId, 1),
    listParkingSessions(supabase, { locationId, limit: 10 }),
  ]);
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
  const row = daily.find((d) => d.day === today);
  return {
    activeCount,
    todayRevenue: row?.revenue ?? 0,
    todaySessions: row?.sessions ?? 0,
    recent,
  };
}

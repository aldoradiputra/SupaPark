import type { TypedSupabaseClient } from "@/lib/supabase/types";

export async function revenueDaily(
  supabase: TypedSupabaseClient,
  locationId: string,
  days = 30,
) {
  const { data, error } = await supabase.rpc("revenue_daily", {
    p_location_id: locationId,
    p_days: days,
  });
  if (error) throw error;
  return data ?? [];
}

export async function revenueByMethod(
  supabase: TypedSupabaseClient,
  locationId: string,
  days = 30,
) {
  const { data, error } = await supabase.rpc("revenue_by_method", {
    p_location_id: locationId,
    p_days: days,
  });
  if (error) throw error;
  return data ?? [];
}

export async function sessionsPeakHours(
  supabase: TypedSupabaseClient,
  locationId: string,
  days = 30,
) {
  const { data, error } = await supabase.rpc("sessions_peak_hours", {
    p_location_id: locationId,
    p_days: days,
  });
  if (error) throw error;
  return data ?? [];
}

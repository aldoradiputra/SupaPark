import type { TypedSupabaseClient } from "@/lib/supabase/types";

export async function listLanes(
  supabase: TypedSupabaseClient,
  locationId: string,
) {
  const { data, error } = await supabase
    .from("lanes")
    .select("*")
    .eq("location_id", locationId)
    .order("lane_type")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

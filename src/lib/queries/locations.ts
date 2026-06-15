import type { TypedSupabaseClient } from "@/lib/supabase/types";

export async function listLocations(
  supabase: TypedSupabaseClient,
  params: { activeOnly?: boolean } = {},
) {
  let query = supabase.from("locations").select("*").order("name");
  if (params.activeOnly) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLocationById(
  supabase: TypedSupabaseClient,
  id: string,
) {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

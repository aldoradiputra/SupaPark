import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { Database } from "@/types/database.types";

type PlateRuleInsert = Database["public"]["Tables"]["plate_rules"]["Insert"];

export async function listPlateRules(
  supabase: TypedSupabaseClient,
  locationId: string,
) {
  const { data, error } = await supabase
    .from("plate_rules")
    .select("*")
    .eq("location_id", locationId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createPlateRule(
  supabase: TypedSupabaseClient,
  payload: PlateRuleInsert,
) {
  const { data, error } = await supabase
    .from("plate_rules")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePlateRule(
  supabase: TypedSupabaseClient,
  id: string,
) {
  const { error } = await supabase.from("plate_rules").delete().eq("id", id);
  if (error) throw error;
}

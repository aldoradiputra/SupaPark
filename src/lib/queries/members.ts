import { normalizePlate } from "@/lib/utils";
import type { TypedSupabaseClient } from "@/lib/supabase/types";

export interface ListMembersParams {
  locationId?: string;
  active?: boolean;
  plate?: string;
}

export async function listMembers(
  supabase: TypedSupabaseClient,
  { locationId, active, plate }: ListMembersParams = {},
) {
  let query = supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (locationId) query = query.eq("location_id", locationId);
  if (active !== undefined) query = query.eq("active", active);
  if (plate) query = query.eq("plate_normalized", normalizePlate(plate));

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getMemberById(supabase: TypedSupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

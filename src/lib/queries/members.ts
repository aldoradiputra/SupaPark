import { normalizePlate } from "@/lib/utils";
import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { Database } from "@/types/database.types";

type MemberInsert = Database["public"]["Tables"]["members"]["Insert"];
type MemberUpdate = Database["public"]["Tables"]["members"]["Update"];

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

export async function createMember(
  supabase: TypedSupabaseClient,
  payload: MemberInsert,
) {
  const { data, error } = await supabase
    .from("members")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMember(
  supabase: TypedSupabaseClient,
  id: string,
  patch: MemberUpdate,
) {
  const { data, error } = await supabase
    .from("members")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export function setMemberActive(
  supabase: TypedSupabaseClient,
  id: string,
  active: boolean,
) {
  return updateMember(supabase, id, { active });
}

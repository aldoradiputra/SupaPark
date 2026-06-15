import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { Database } from "@/types/database.types";
import type { LeadStatus } from "@/types";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

export async function listLeads(
  supabase: TypedSupabaseClient,
  params: { status?: LeadStatus } = {},
) {
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (params.status) query = query.eq("status", params.status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLeadById(supabase: TypedSupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Public onboarding step 1 — anon INSERT is allowed by RLS. */
export async function createLead(
  supabase: TypedSupabaseClient,
  payload: LeadInsert,
) {
  const { data, error } = await supabase
    .from("leads")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

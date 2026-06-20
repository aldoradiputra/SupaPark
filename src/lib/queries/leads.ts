import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { Database } from "@/types/database.types";
import type { CurrentSystemType, Lead, LeadStatus } from "@/types";

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

/** Admin-side create (authenticated; can read the row back). */
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

export interface OnboardingStep1Input {
  name: string;
  email: string;
  phone: string;
  facilityName: string;
}

/**
 * Public onboarding step 1. Anon has INSERT (no SELECT) on leads, so we mint
 * the id client-side and insert WITHOUT a read-back, then return that id for
 * the step-2 URL.
 */
export async function createOnboardingLead(
  supabase: TypedSupabaseClient,
  input: OnboardingStep1Input,
): Promise<string> {
  const id = crypto.randomUUID();
  const { error } = await supabase.from("leads").insert({
    id,
    name: input.name,
    email: input.email,
    phone: input.phone,
    facility_name: input.facilityName,
    source: "website",
    status: "new",
  });
  if (error) throw error;
  return id;
}

export interface OnboardingStep2Input {
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  entryLanes?: number;
  exitLanes?: number;
  currentSystem?: CurrentSystemType;
  dailyVolume?: number;
  preferredDate?: string;
  notes?: string;
}

export async function updateLeadStatus(
  supabase: TypedSupabaseClient,
  id: string,
  status: LeadStatus,
) {
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

/**
 * Convert a lead into a project (client-side): create the project, then mark
 * the lead converted and link it. Admins can write both tables (RLS).
 */
export async function convertLead(supabase: TypedSupabaseClient, lead: Lead) {
  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      lead_id: lead.id,
      facility_name: lead.facility_name,
      contact_name: lead.name,
      contact_email: lead.email,
      contact_phone: lead.phone,
      city: lead.city,
      address: lead.address,
      latitude: lead.latitude,
      longitude: lead.longitude,
      entry_lanes: lead.entry_lanes,
      exit_lanes: lead.exit_lanes,
      status: "planning",
    })
    .select()
    .single();
  if (error) throw error;

  const { error: linkError } = await supabase
    .from("leads")
    .update({
      status: "converted",
      converted_at: new Date().toISOString(),
      project_id: project.id,
    })
    .eq("id", lead.id);
  if (linkError) throw linkError;

  return project;
}

/** Public onboarding step 2 — saves details via the SECURITY DEFINER RPC. */
export async function submitOnboardingLead(
  supabase: TypedSupabaseClient,
  id: string,
  input: OnboardingStep2Input,
): Promise<string> {
  const { data, error } = await supabase.rpc("submit_onboarding_lead", {
    p_id: id,
    p_city: input.city ?? null,
    p_address: input.address ?? null,
    p_latitude: input.latitude ?? null,
    p_longitude: input.longitude ?? null,
    p_entry_lanes: input.entryLanes ?? null,
    p_exit_lanes: input.exitLanes ?? null,
    p_current_system: input.currentSystem ?? null,
    p_daily_volume: input.dailyVolume ?? null,
    p_preferred_date: input.preferredDate ?? null,
    p_notes: input.notes ?? null,
  });
  if (error) throw error;
  return data;
}

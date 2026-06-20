import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { ProjectStatus } from "@/types";

export async function listProjects(
  supabase: TypedSupabaseClient,
  params: { status?: ProjectStatus } = {},
) {
  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (params.status) query = query.eq("status", params.status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProjectById(
  supabase: TypedSupabaseClient,
  id: string,
) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateProjectStatus(
  supabase: TypedSupabaseClient,
  id: string,
  status: ProjectStatus,
) {
  const { error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

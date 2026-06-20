import type { TypedSupabaseClient } from "@/lib/supabase/types";

/** The signed-in user's profile row (id, org_id, role, …). */
export async function getMyProfile(supabase: TypedSupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  return data;
}

export async function getOrgById(supabase: TypedSupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Org team. RLS returns all members for admins, just self for others. */
export async function listOrgUsers(
  supabase: TypedSupabaseClient,
  orgId: string,
) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}

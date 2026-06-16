import type { TypedSupabaseClient } from "@/lib/supabase/types";

/**
 * Locations belonging to the signed-in user's organization (for the dashboard
 * location switcher). RLS also exposes other orgs' active locations for the
 * public map, so we filter explicitly by the user's org here.
 */
export async function listMyOrgLocations(supabase: TypedSupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: me } = await supabase
    .from("users")
    .select("org_id")
    .eq("id", user.id)
    .maybeSingle();
  if (!me?.org_id) return [];

  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("org_id", me.org_id)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

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

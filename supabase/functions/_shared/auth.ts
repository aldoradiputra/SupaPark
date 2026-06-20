import type { SupabaseClient } from "./supabase.ts";

export interface Lane {
  id: string;
  location_id: string;
  lane_type: "entry" | "exit";
  status: string;
  name: string;
}

/**
 * Authenticate a lane by the X-API-Key header against lanes.api_key.
 * Returns the lane (with its location) or null if the key is missing/invalid.
 */
export async function authenticateLane(
  req: Request,
  supabase: SupabaseClient,
): Promise<Lane | null> {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return null;

  const { data, error } = await supabase
    .from("lanes")
    .select("id, location_id, lane_type, status, name")
    .eq("api_key", apiKey)
    .maybeSingle();

  if (error || !data) return null;
  return data as Lane;
}

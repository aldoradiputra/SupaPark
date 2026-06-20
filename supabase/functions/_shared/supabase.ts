import {
  createClient,
  type SupabaseClient,
} from "npm:@supabase/supabase-js@2.45.4";

/**
 * Service-role client for machine-to-machine edge functions. It BYPASSES RLS,
 * so every function must do its own authorization (lane API key / webhook
 * signature) before touching data.
 */
export function createAdminClient(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type { SupabaseClient };

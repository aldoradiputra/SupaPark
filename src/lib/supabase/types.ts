import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

/**
 * A Supabase client bound to our schema. Query functions accept this so the
 * same code works with the browser client (Client Components) and the server
 * client (Server Components / Actions / Route Handlers).
 */
export type TypedSupabaseClient = SupabaseClient<Database>;

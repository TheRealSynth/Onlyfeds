import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && serviceKey);

/**
 * Server-only client using the service role key. Only constructed when both
 * SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set. Never import this
 * from client components.
 */
export function getSupabaseServerClient() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

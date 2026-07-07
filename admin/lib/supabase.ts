import { createClient, SupabaseClient } from '@supabase/supabase-js';

// One browser client for the whole app. Auth state (the trainer's session)
// lives in localStorage; every PostgREST call carries the user's JWT, so
// row-level security — not this UI — is what limits what each role can do.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
      throw new Error(
        'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in admin/.env.local',
      );
    }
    client = createClient(url, anonKey);
  }
  return client;
}

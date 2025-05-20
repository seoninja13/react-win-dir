// src/lib/supabase/adminClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded, especially for server-side contexts
// In Next.js, these are typically available via process.env

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL (NEXT_PUBLIC_SUPABASE_URL) is not defined in environment variables.');
}

if (!supabaseServiceRoleKey) {
  throw new Error('Supabase Service Role Key (SUPABASE_SERVICE_ROLE_KEY) is not defined in environment variables.');
}

// Create a single instance of the Supabase client for admin operations
// This client uses the Service Role Key and should only be used on the server-side.
let supabaseAdmin: SupabaseClient | null = null;

export const getSupabaseAdminClient = (): SupabaseClient => {
  if (!supabaseAdmin) {
    console.log('Initializing Supabase Admin Client...');
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        // It's recommended to disable auto-refreshing tokens for server-side clients
        // as they typically use the service_role key which doesn't expire.
        autoRefreshToken: false,
        persistSession: false,
        // detectSessionInUrl: false, // Deprecated and not needed for service role
      },
    });
    console.log('Supabase Admin Client initialized successfully.');
  } else {
    // console.log('Returning existing Supabase Admin Client instance.');
  }
  return supabaseAdmin;
};

// Optional: Export the client directly if you prefer a simpler import
// and manage initialization at the module level (less common for singletons like this)
// export const supabaseAdminDirect = getSupabaseAdminClient();

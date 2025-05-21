import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

/**
 * Supabase client initialization
 * 
 * This file initializes the Supabase client with the appropriate URL and anonymous key.
 * The client is typed with the Database type to provide type safety for database operations.
 */

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

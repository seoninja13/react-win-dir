'use server';

import { createClient } from '@supabase/supabase-js';

/**
 * Server action to check the Supabase connection
 * This function attempts to connect to Supabase and run a simple query
 * to verify that the connection is working properly.
 */
export async function checkSupabaseConnection() {
  try {
    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        isConnected: false,
        message: 'Supabase credentials are not configured',
        details: {
          url: supabaseUrl ? 'Configured' : 'Missing',
          serviceKey: supabaseServiceKey ? 'Configured' : 'Missing',
        },
      };
    }
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Test connection with a simple query
    const { data, error } = await supabase.from('_prisma_migrations').select('*').limit(1);
    
    if (error) {
      throw error;
    }
    
    return {
      isConnected: true,
      message: 'Successfully connected to Supabase',
      details: {
        url: supabaseUrl,
        version: 'Supabase PostgreSQL',
        tables: data ? 'Available' : 'No tables found',
      },
    };
  } catch (error) {
    console.error('Error checking Supabase connection:', error);
    
    return {
      isConnected: false,
      message: 'Failed to connect to Supabase',
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

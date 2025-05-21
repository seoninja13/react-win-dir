'use server';

import { createClient } from '@supabase/supabase-js';

/**
 * Server action to get all tables in the database
 * This function retrieves a list of all tables in the database,
 * including system tables and views.
 */
export async function getDatabaseTables() {
  try {
    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials are not configured');
    }
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Query to get all tables and views
    const { data, error } = await supabase.rpc('get_tables_info');
    
    if (error) {
      throw error;
    }
    
    // If RPC function doesn't exist, fall back to direct query
    if (!data) {
      const { data: tablesData, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name, table_schema, table_type')
        .order('table_schema')
        .order('table_name');
        
      if (tablesError) {
        throw tablesError;
      }
      
      return {
        tables: tablesData || [],
      };
    }
    
    return {
      tables: data || [],
    };
  } catch (error) {
    console.error('Error getting database tables:', error);
    
    return {
      error: error instanceof Error ? error.message : String(error),
      tables: [],
    };
  }
}

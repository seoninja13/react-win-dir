'use server';

import { createClient } from '@supabase/supabase-js';

/**
 * Server action to get column details for a specific table
 * This function retrieves detailed information about all columns in a table,
 * including data types, constraints, and foreign key relationships.
 */
export async function getTableColumnDetails(tableName: string) {
  try {
    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials are not configured');
    }
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Query to get column information
    const { data, error } = await supabase.rpc('get_table_columns_info', {
      p_table_name: tableName,
    });
    
    if (error) {
      throw error;
    }
    
    // If RPC function doesn't exist, fall back to direct query
    if (!data) {
      const { data: columnsData, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default, is_identity')
        .eq('table_name', tableName)
        .eq('table_schema', 'public')
        .order('ordinal_position');
        
      if (columnsError) {
        throw columnsError;
      }
      
      // Add basic constraint information
      const columns = columnsData?.map(column => ({
        ...column,
        is_primary_key: false,
        is_foreign_key: false,
      })) || [];
      
      return {
        columns,
      };
    }
    
    return {
      columns: data || [],
    };
  } catch (error) {
    console.error(`Error getting column details for table ${tableName}:`, error);
    
    return {
      error: error instanceof Error ? error.message : String(error),
      columns: [],
    };
  }
}

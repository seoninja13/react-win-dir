// src/app/admin/actions/checkSupabaseConnection.ts
'use server'; // Marks all exports from this file as Server Actions

import { getSupabaseAdminClient } from '../../../lib/supabase/adminClient'; // Changed to relative path

interface ConnectionStatusResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: any; // Optional: To return some data like schema names for confirmation
}

export async function checkSupabaseConnection(): Promise<ConnectionStatusResult> {
  try {
    console.log('Attempting to connect to Supabase via admin client...');
    const supabase = getSupabaseAdminClient();

    // Perform a simple query to check the connection.
    // Querying a system table like pg_catalog.pg_tables is generally safe and available.
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .limit(1);

    if (error) {
      console.error('Supabase connection check error:', error);
      return { success: false, error: `Supabase query failed: ${error.message}` };
    }

    console.log('Supabase connection check successful. Sample data:', data);
    return { 
      success: true, 
      message: 'Successfully connected to Supabase and fetched table list.',
      data: data
    };

  } catch (e: any) {
    console.error('Exception during Supabase connection check:', e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

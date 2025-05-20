// src/app/admin/actions/getDatabaseTables.ts
'use server';

import { getSupabaseAdminClient } from '../../../lib/supabase/adminClient';

interface TableSchema {
  table_schema: string;
  table_name: string;
}

interface TableListResult {
  success: boolean;
  tables?: { schema: string; name: string }[];
  error?: string;
}

const SYSTEM_SCHEMAS = [
  'information_schema',
  'pg_catalog',
  'pg_toast',
  'graphql',
  'graphql_public',
  'storage',
  'auth',
  'realtime',
  'pgsodium',
  'pgsodium_masks',
  'vault',
  // Add any other Supabase-internal or system schemas you want to exclude
];

export async function getDatabaseTables(): Promise<TableListResult> {
  try {
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_schema, table_name')
      // .not('table_schema', 'in', `(${SYSTEM_SCHEMAS.map(s => `'${s}'`).join(',')})`) // Filter out system schemas
      // Order by schema and then by table name for consistent listing
      .order('table_schema', { ascending: true })
      .order('table_name', { ascending: true });

    if (error) {
      console.error('Error fetching database tables:', error);
      return { success: false, error: `Failed to fetch tables: ${error.message}` };
    }

    // Further filter in code because complex NOT IN array might be tricky with PostgREST
    const userTables = data.filter((table: TableSchema) => !SYSTEM_SCHEMAS.includes(table.table_schema));

    return { 
      success: true, 
      tables: userTables.map((t: TableSchema) => ({ schema: t.table_schema, name: t.table_name })) 
    };

  } catch (e: any) {
    console.error('Exception during getDatabaseTables:', e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

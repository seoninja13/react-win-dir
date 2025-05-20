// src/app/admin/actions/getTableColumnDetails.ts
'use server';

import { getSupabaseAdminClient } from '../../../lib/supabase/adminClient';

export interface ColumnDetail {
  column_name: string;
  data_type: string;
  is_nullable: string; // 'YES' or 'NO'
  column_default: string | null;
  character_maximum_length: number | null;
  numeric_precision: number | null;
  numeric_scale: number | null;
  // Add more fields from information_schema.columns as needed
}

interface TableColumnDetailsResult {
  success: boolean;
  columns?: ColumnDetail[];
  error?: string;
}

export async function getTableColumnDetails(
  schemaName: string,
  tableName: string
): Promise<TableColumnDetailsResult> {
  if (!schemaName || !tableName) {
    return { success: false, error: 'Schema name and table name are required.' };
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale')
      .eq('table_schema', schemaName)
      .eq('table_name', tableName)
      .order('ordinal_position', { ascending: true });

    if (error) {
      console.error(`Error fetching column details for ${schemaName}.${tableName}:`, error);
      return { success: false, error: `Failed to fetch column details: ${error.message}` };
    }

    return { 
      success: true, 
      columns: data as ColumnDetail[]
    };

  } catch (e: any) {
    console.error(`Exception during getTableColumnDetails for ${schemaName}.${tableName}:`, e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

// src/app/admin/actions/getTableData.ts
'use server';

import { getSupabaseAdminClient } from '../../../lib/supabase/adminClient';

export interface TableDataResult {
  success: boolean;
  columns?: string[]; // To store column names for dynamic table rendering
  rows?: any[];       // To store row data
  error?: string;
  rowCount?: number;  // Total rows in the table (for future pagination)
}

const DEFAULT_ROW_LIMIT = 20;

export async function getTableData(
  schemaName: string,
  tableName: string,
  limit: number = DEFAULT_ROW_LIMIT, // For now, just a limit
  // offset: number = 0, // For future pagination
  // filters: any[] = [], // For future filtering
  // sort: { column: string; order: 'asc' | 'desc' } | null = null // For future sorting
): Promise<TableDataResult> {
  if (!schemaName || !tableName) {
    return { success: false, error: 'Schema name and table name are required.' };
  }

  try {
    const supabase = getSupabaseAdminClient();

    // First, get column names to return them for dynamic table headers
    // This is a simplified way; a more robust way might involve information_schema.columns
    // if the table could be empty or to get data types.
    const { data: sampleRowData, error: sampleError } = await supabase
      .from(tableName, { schema: schemaName }) // Correctly specify schema
      .select('*') // Select all columns
      .limit(1);

    if (sampleError && sampleError.code !== 'PGRST204') { // PGRST204: No rows found, which is fine for getting columns from an empty table if it had structure
      console.error(`Error fetching sample row for ${schemaName}.${tableName}:`, sampleError);
      // If we can't even get a sample, maybe the table doesn't exist or schema is wrong
      // but information_schema.columns would be better for column names if this fails.
    }
    
    let columns: string[] = [];
    if (sampleRowData && sampleRowData.length > 0) {
      columns = Object.keys(sampleRowData[0]);
    } else {
      // Fallback or more robust column fetching needed if table is empty or sample fetch fails
      // For now, we'll proceed, and if there's no data, columns array will be empty.
      console.warn(`No sample row data found for ${schemaName}.${tableName} to determine columns. Table might be empty.`);
    }

    // Now fetch the actual data with the specified limit
    const { data, error, count } = await supabase
      .from(tableName, { schema: schemaName }) // Correctly specify schema
      .select('*', { count: 'exact' }) // Select all columns and get total count
      .limit(limit);
      // .range(offset, offset + limit - 1); // For future pagination

    if (error) {
      console.error(`Error fetching data for ${schemaName}.${tableName}:`, error);
      return { success: false, error: `Failed to fetch data: ${error.message}` };
    }

    return { 
      success: true, 
      columns: columns.length > 0 ? columns : (data && data.length > 0 ? Object.keys(data[0]) : []),
      rows: data || [],
      rowCount: count || 0
    };

  } catch (e: any) {
    console.error(`Exception during getTableData for ${schemaName}.${tableName}:`, e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

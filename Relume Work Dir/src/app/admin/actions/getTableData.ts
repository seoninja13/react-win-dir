'use server';

import { createClient } from '@supabase/supabase-js';

/**
 * Server action to get data from a specific table
 * This function retrieves rows from a table with optional filtering,
 * sorting, and pagination.
 */
export async function getTableData(
  tableName: string,
  options: {
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    filter?: { column: string; operator: string; value: any }[];
  } = {}
) {
  try {
    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials are not configured');
    }
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Set default options
    const {
      limit = 10,
      offset = 0,
      orderBy,
      orderDirection = 'asc',
      filter = [],
    } = options;
    
    // Start building the query
    let query = supabase.from(tableName).select('*');
    
    // Apply filters if any
    filter.forEach(({ column, operator, value }) => {
      switch (operator) {
        case 'eq':
          query = query.eq(column, value);
          break;
        case 'neq':
          query = query.neq(column, value);
          break;
        case 'gt':
          query = query.gt(column, value);
          break;
        case 'gte':
          query = query.gte(column, value);
          break;
        case 'lt':
          query = query.lt(column, value);
          break;
        case 'lte':
          query = query.lte(column, value);
          break;
        case 'like':
          query = query.like(column, `%${value}%`);
          break;
        case 'ilike':
          query = query.ilike(column, `%${value}%`);
          break;
        default:
          // Ignore invalid operators
          break;
      }
    });
    
    // Apply ordering if specified
    if (orderBy) {
      query = query.order(orderBy, { ascending: orderDirection === 'asc' });
    }
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Get column names from the first row
    const columns = data && data.length > 0 
      ? Object.keys(data[0]) 
      : [];
    
    return {
      rows: data || [],
      columns,
      count: data?.length || 0,
      limit,
      offset,
    };
  } catch (error) {
    console.error(`Error getting data from table ${tableName}:`, error);
    
    return {
      error: error instanceof Error ? error.message : String(error),
      rows: [],
      columns: [],
      count: 0,
      limit: options.limit || 10,
      offset: options.offset || 0,
    };
  }
}

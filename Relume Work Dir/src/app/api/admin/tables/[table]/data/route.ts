import { NextResponse } from 'next/server';
import { getTableData } from '@/app/admin/actions/getTableData';

export async function GET(
  request: Request,
  { params }: { params: { table: string } }
) {
  try {
    const { table } = params;
    const url = new URL(request.url);
    
    if (!table) {
      return NextResponse.json(
        {
          error: 'Table name is required',
          rows: [],
          columns: [],
          count: 0,
        },
        { status: 400 }
      );
    }
    
    // Parse query parameters
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const orderBy = url.searchParams.get('orderBy') || undefined;
    const orderDirection = url.searchParams.get('orderDirection') as 'asc' | 'desc' | undefined;
    
    // Parse filters if provided
    const filterParam = url.searchParams.get('filter');
    let filter;
    
    if (filterParam) {
      try {
        filter = JSON.parse(filterParam);
      } catch (e) {
        console.error('Error parsing filter parameter:', e);
      }
    }
    
    const result = await getTableData(table, {
      limit,
      offset,
      orderBy,
      orderDirection,
      filter,
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in table data API route:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        rows: [],
        columns: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}

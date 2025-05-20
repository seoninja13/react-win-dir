import { NextResponse } from 'next/server';
import { getTableColumnDetails } from '@/app/admin/actions/getTableColumnDetails';

export async function GET(
  request: Request,
  { params }: { params: { table: string } }
) {
  try {
    const { table } = params;
    
    if (!table) {
      return NextResponse.json(
        {
          error: 'Table name is required',
          columns: [],
        },
        { status: 400 }
      );
    }
    
    const result = await getTableColumnDetails(table);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in table columns API route:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        columns: [],
      },
      { status: 500 }
    );
  }
}

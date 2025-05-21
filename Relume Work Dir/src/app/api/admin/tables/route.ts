import { NextResponse } from 'next/server';
import { getDatabaseTables } from '@/app/admin/actions/getDatabaseTables';

export async function GET() {
  try {
    const result = await getDatabaseTables();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in tables API route:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        tables: [],
      },
      { status: 500 }
    );
  }
}

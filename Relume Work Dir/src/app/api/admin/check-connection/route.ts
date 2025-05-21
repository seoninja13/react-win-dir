import { NextResponse } from 'next/server';
import { checkSupabaseConnection } from '@/app/admin/actions/checkSupabaseConnection';

export async function GET() {
  try {
    const result = await checkSupabaseConnection();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in check-connection API route:', error);
    return NextResponse.json(
      {
        isConnected: false,
        message: 'Error checking connection',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

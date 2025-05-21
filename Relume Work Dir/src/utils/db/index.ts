import { supabase } from '../supabase';
import { logError } from '../logging';

export async function handleDatabaseError(error: any, operation: string, details?: any) {
  const errorDetails = {
    operation,
    details,
    error: error.message,
    code: error.code,
  };
  
  console.error('Database operation failed:', errorDetails);
  
  // Log to Supabase if logging utility is available
  try {
    logError('Database operation failed', errorDetails);
  } catch (logError) {
    // If logging fails, just continue
    console.error('Failed to log error:', logError);
  }
  
  throw new Error(`Database operation failed: ${operation}`);
}

export { supabase };

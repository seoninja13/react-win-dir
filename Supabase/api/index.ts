import { supabase } from '../client';
import { logError } from '../utils/logging';

/**
 * Base API Utilities
 * 
 * This file contains base utilities for interacting with the Supabase API.
 * It provides a function for handling database errors in a consistent way.
 */

/**
 * Handle a database error
 * 
 * @param error - The error to handle
 * @param operation - The operation that caused the error
 * @param details - Additional details about the operation
 * @returns Never returns, always throws an error
 */
export async function handleDatabaseError(error: any, operation: string, details?: any): Promise<never> {
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

/**
 * Supabase Logger Utility
 * 
 * This utility provides functions for logging errors, warnings, and information to Supabase.
 * It helps track and debug issues that arise during the image generation process.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables if not already loaded
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  dotenv.config({ path: '.env.local' });
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log levels
export enum LogLevel {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEBUG = 'debug',
}

// Log entry interface
export interface LogEntry {
  level: LogLevel;
  message: string;
  source: string;
  details?: any;
  timestamp: string;
}

/**
 * Log an entry to Supabase
 * 
 * @param entry - The log entry to store
 * @returns The result of the insert operation
 */
export async function logToSupabase(entry: LogEntry) {
  try {
    // Also log to console for immediate feedback
    const consoleMessage = `[${entry.level.toUpperCase()}] [${entry.source}] ${entry.message}`;
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(consoleMessage, entry.details || '');
        break;
      case LogLevel.WARNING:
        console.warn(consoleMessage, entry.details || '');
        break;
      case LogLevel.INFO:
        console.info(consoleMessage, entry.details || '');
        break;
      case LogLevel.DEBUG:
        console.debug(consoleMessage, entry.details || '');
        break;
    }
    
    // Insert into Supabase logs table
    const { data, error } = await supabase
      .from('logs')
      .insert([entry]);
    
    if (error) {
      // If we can't log to Supabase, at least log to console
      console.error('Failed to log to Supabase:', error);
    }
    
    return { data, error };
  } catch (err) {
    // Catch any unexpected errors in the logging process itself
    console.error('Unexpected error in logging:', err);
    return { data: null, error: err };
  }
}

/**
 * Log an error
 * 
 * @param message - Error message
 * @param source - Source of the error (e.g., function name, file name)
 * @param details - Additional error details
 * @returns The result of the log operation
 */
export async function logError(message: string, source: string, details?: any) {
  return logToSupabase({
    level: LogLevel.ERROR,
    message,
    source,
    details,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Log a warning
 * 
 * @param message - Warning message
 * @param source - Source of the warning
 * @param details - Additional warning details
 * @returns The result of the log operation
 */
export async function logWarning(message: string, source: string, details?: any) {
  return logToSupabase({
    level: LogLevel.WARNING,
    message,
    source,
    details,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Log information
 * 
 * @param message - Information message
 * @param source - Source of the information
 * @param details - Additional information details
 * @returns The result of the log operation
 */
export async function logInfo(message: string, source: string, details?: any) {
  return logToSupabase({
    level: LogLevel.INFO,
    message,
    source,
    details,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Log debug information
 * 
 * @param message - Debug message
 * @param source - Source of the debug information
 * @param details - Additional debug details
 * @returns The result of the log operation
 */
export async function logDebug(message: string, source: string, details?: any) {
  // Only log debug messages if DEBUG environment variable is set
  if (process.env.DEBUG === 'true') {
    return logToSupabase({
      level: LogLevel.DEBUG,
      message,
      source,
      details,
      timestamp: new Date().toISOString(),
    });
  }
  return { data: null, error: null };
}

/**
 * Create a logger for a specific source
 * 
 * @param source - The source to create a logger for
 * @returns An object with logging functions for the specified source
 */
export function createLogger(source: string) {
  return {
    error: (message: string, details?: any) => logError(message, source, details),
    warning: (message: string, details?: any) => logWarning(message, source, details),
    info: (message: string, details?: any) => logInfo(message, source, details),
    debug: (message: string, details?: any) => logDebug(message, source, details),
  };
}

/**
 * Log an error and format the error details
 * 
 * @param error - The error object
 * @param source - Source of the error
 * @param context - Additional context about the error
 * @returns The result of the log operation
 */
export async function logErrorObject(error: Error, source: string, context?: any) {
  const errorDetails = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
  };
  
  return logError(error.message, source, errorDetails);
}

/**
 * Example usage:
 * 
 * ```typescript
 * import { logError, logInfo, createLogger } from '../utils/logger';
 * 
 * // Log directly
 * await logError('Failed to process CSV file', 'process-image-csv.ts', { reason: 'Invalid format' });
 * await logInfo('CSV processing completed', 'process-image-csv.ts', { recordsProcessed: 150 });
 * 
 * // Or create a logger for a specific source
 * const logger = createLogger('test-batch-generate-images.ts');
 * await logger.info('Starting batch processing');
 * try {
 *   // Some code that might throw an error
 * } catch (error) {
 *   await logger.error('Batch processing failed', error);
 * }
 * ```
 */

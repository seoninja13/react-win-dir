import { supabase } from '../client';

/**
 * Logging Utilities
 * 
 * This file contains utilities for logging messages and errors to Supabase.
 * It provides functions for logging different levels of messages (info, warning, error, debug).
 */

type LogLevel = 'info' | 'warning' | 'error' | 'debug';

/**
 * Log a message to Supabase
 * 
 * @param level - The log level (info, warning, error, debug)
 * @param message - The message to log
 * @param details - Additional details to log
 * @param tags - Tags to categorize the log
 */
export async function log(
  level: LogLevel,
  message: string,
  details?: any,
  tags?: string[]
) {
  try {
    const { error } = await supabase.from('logs').insert([
      {
        level,
        message,
        details,
        tags,
        source: 'client',
        url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
    ]);
    
    if (error) {
      console.error('Failed to log message:', error);
    }
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](
        `[${level.toUpperCase()}] ${message}`,
        details
      );
    }
  } catch (err) {
    console.error('Logging failed:', err);
  }
}

/**
 * Log an info message
 * 
 * @param message - The message to log
 * @param details - Additional details to log
 * @param tags - Tags to categorize the log
 */
export function logInfo(message: string, details?: any, tags?: string[]) {
  return log('info', message, details, tags);
}

/**
 * Log a warning message
 * 
 * @param message - The message to log
 * @param details - Additional details to log
 * @param tags - Tags to categorize the log
 */
export function logWarning(message: string, details?: any, tags?: string[]) {
  return log('warning', message, details, tags);
}

/**
 * Log an error message
 * 
 * @param message - The message to log
 * @param details - Additional details to log
 * @param tags - Tags to categorize the log
 */
export function logError(message: string, details?: any, tags?: string[]) {
  // Also log to recent_errors table
  try {
    supabase.from('recent_errors').insert([
      {
        message,
        details,
        source: 'client',
        url: typeof window !== 'undefined' ? window.location.href : '',
      },
    ]);
  } catch (err) {
    console.error('Error logging to recent_errors failed:', err);
  }
  
  return log('error', message, details, tags);
}

/**
 * Log a debug message
 * 
 * @param message - The message to log
 * @param details - Additional details to log
 * @param tags - Tags to categorize the log
 */
export function logDebug(message: string, details?: any, tags?: string[]) {
  return log('debug', message, details, tags);
}

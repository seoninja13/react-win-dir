import { supabase } from './supabase';

type LogLevel = 'info' | 'warning' | 'error' | 'debug';

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

export function logInfo(message: string, details?: any, tags?: string[]) {
  return log('info', message, details, tags);
}

export function logWarning(message: string, details?: any, tags?: string[]) {
  return log('warning', message, details, tags);
}

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

export function logDebug(message: string, details?: any, tags?: string[]) {
  return log('debug', message, details, tags);
}

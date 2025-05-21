'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logger } from '@/utils/logger';

interface LoggingProviderProps {
  children: ReactNode;
}

export function LoggingProvider({ children }: LoggingProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Enable server logging
  useEffect(() => {
    logger.enableServerLogging();
    
    // Log initial page load
    logger.info('Page loaded', {
      path: pathname,
      query: Object.fromEntries(searchParams.entries()),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });

    // Log when component unmounts (page unload)
    return () => {
      logger.info('Page unloaded', { path: pathname });
    };
  }, []);

  // Log route changes
  useEffect(() => {
    logger.info('Route changed', {
      path: pathname,
      query: Object.fromEntries(searchParams.entries()),
    });
  }, [pathname, searchParams]);

  // Log errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logger.error('Uncaught error', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error ? {
          name: event.error.name,
          message: event.error.message,
          stack: event.error.stack,
        } : null,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logger.error('Unhandled promise rejection', {
        reason: event.reason instanceof Error ? {
          name: event.reason.name,
          message: event.reason.message,
          stack: event.reason.stack,
        } : String(event.reason),
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return <>{children}</>;
}

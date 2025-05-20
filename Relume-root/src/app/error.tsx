'use client';

import { useEffect } from 'react';
import { logger } from '@/utils/logger';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error with detailed information
    logger.error(`Application Error: ${error.message}`, {
      errorName: error.name,
      errorStack: error.stack,
      errorDigest: error.digest,
      path: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Our team has been notified of this issue.
        </p>
        <div className="mb-6 p-4 bg-gray-100 rounded text-left">
          <p className="text-sm text-gray-700 font-mono">
            <strong>Error:</strong> {error.message}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-700 font-mono mt-2">
              <strong>Error ID:</strong> {error.digest}
            </p>
          )}
        </div>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

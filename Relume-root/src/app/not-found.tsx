'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logger } from '@/utils/logger';

export default function NotFound() {
  useEffect(() => {
    // Log the 404 error with detailed information
    logger.error('404 Page Not Found', {
      path: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="mb-6 p-4 bg-gray-100 rounded text-left">
          <p className="text-sm text-gray-700 font-mono">
            <strong>Path:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'unknown'}
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

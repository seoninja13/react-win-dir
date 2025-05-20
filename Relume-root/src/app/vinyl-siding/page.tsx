'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { logger } from '@/utils/logger';

export default function VinylSiding() {
  useEffect(() => {
    // Log that the vinyl siding page has been rendered
    logger.info('Vinyl Siding page rendered', {
      component: 'VinylSidingPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Vinyl Siding Page</h1>
        <p className="text-gray-600 mb-6">
          This is a simplified version of the Vinyl Siding page to help with debugging.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Debugging Information</h2>
          <p className="text-sm text-gray-700">
            This page is being served from the App Router at src/app/vinyl-siding/page.tsx.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/debug"
            className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
          >
            Debug Page
          </Link>
        </div>
      </div>
    </div>
  );
}

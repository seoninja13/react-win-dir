'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLogger } from '@/utils/logger';

export default function Home() {
  const logger = useLogger('HomePage');

  useEffect(() => {
    // Log that the home page has been rendered
    logger.info('Home page rendered', {
      timestamp: new Date().toISOString(),
    });

    // Log migration status
    logger.migration('App Router migration in progress', {
      timestamp: new Date().toISOString(),
      route: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }, [logger]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Windows Doors CA</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the Windows Doors CA website. This is the home page rendered from src/app/page.tsx.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">App Router Migration</h2>
          <p className="text-sm text-gray-700">
            This website is being migrated to use the Next.js App Router exclusively. This process will improve performance, simplify the codebase, and align with Next.js best practices.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-3">Migration Tools</h2>
        <ul className="space-y-2 mb-6">
          <li>
            <Link href="/migration-test" className="text-blue-500 hover:underline">
              Migration Test Page
            </Link>
            <span className="text-xs text-gray-500 ml-2">Test routes and functionality</span>
          </li>
          <li>
            <Link href="/debug" className="text-blue-500 hover:underline">
              Debug Page
            </Link>
            <span className="text-xs text-gray-500 ml-2">Diagnose routing issues</span>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">Available Pages</h2>
        <ul className="space-y-2 mb-6">
          <li>
            <Link href="/windows" className="text-blue-500 hover:underline">
              Windows Page
            </Link>
          </li>
          <li>
            <Link href="/doors" className="text-blue-500 hover:underline">
              Doors Page
            </Link>
          </li>
          <li>
            <Link href="/vinyl-siding" className="text-blue-500 hover:underline">
              Vinyl Siding Page
            </Link>
          </li>
          <li>
            <Link href="/admin" className="text-blue-500 hover:underline">
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link href="/sample-page" className="text-blue-500 hover:underline">
              Sample Page
            </Link>
          </li>
        </ul>

        <div className="flex justify-center space-x-4">
          <Link
            href="/migration-test"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Migration Test
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

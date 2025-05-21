'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLogger } from '@/utils/logger';

interface PageTemplateProps {
  title: string;
  description: string;
  pageName: string;
}

/**
 * Basic Page Template
 *
 * This template can be used as a starting point for migrating pages from the Pages Router to the App Router.
 * It includes basic structure, logging, and navigation.
 *
 * Usage:
 * 1. Copy this file to the appropriate directory in src/app
 * 2. Rename it to page.tsx
 * 3. Customize the content as needed
 */
export default function PageTemplate({ title, description, pageName }: PageTemplateProps) {
  // Use the logger hook for better component context
  const logger = useLogger(pageName);

  useEffect(() => {
    // Log that the page has been rendered
    logger.info(`${pageName} page rendered`, {
      timestamp: new Date().toISOString(),
    });

    // Log migration status
    logger.logPageMigration(pageName, 'completed', {
      timestamp: new Date().toISOString(),
      route: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }, [pageName, logger]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">App Router Migration</h2>
          <p className="text-sm text-gray-700">
            This page has been migrated from the Pages Router to the App Router.
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

// Example usage:
// export default function WindowsPage() {
//   return (
//     <PageTemplate
//       title="Windows"
//       description="Explore our wide selection of high-quality windows."
//       pageName="Windows"
//     />
//   );
// }

'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import Link from 'next/link';

export default function TestPage() {
  useEffect(() => {
    // Log that the test page has been rendered
    logger.info('Test page rendered', {
      component: 'TestPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-6">
          This is a test page to verify that the App Router is working correctly.
        </p>
        
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Debugging Information</h2>
          <p className="text-sm text-gray-700">
            This page is being served from the App Router. If you're seeing this page, the App Router is working.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Navigation Links</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link href="/" className="text-blue-500 hover:underline">Home</Link></li>
            <li><Link href="/windows" className="text-blue-500 hover:underline">Windows</Link></li>
            <li><Link href="/windows/bay-bow" className="text-blue-500 hover:underline">Bay-Bow Windows</Link></li>
            <li><Link href="/bay-bow" className="text-blue-500 hover:underline">Bay-Bow Windows (Pages Router)</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

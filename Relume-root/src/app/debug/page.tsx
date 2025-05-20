'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logger } from '@/utils/logger';

interface RouteInfo {
  path: string;
  type: string;
  exists: boolean;
}

export default function DebugPage() {
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkRoutes = async () => {
      try {
        setLoading(true);
        
        // Log that we're checking routes
        logger.info('Checking routes on debug page');
        
        // Common routes to check
        const routesToCheck = [
          '/',
          '/windows',
          '/doors',
          '/vinyl-siding',
          '/about',
          '/contact',
          '/admin',
          '/sample-page',
        ];
        
        const results: RouteInfo[] = [];
        
        // Check each route
        for (const route of routesToCheck) {
          try {
            const response = await fetch(route, { method: 'HEAD' });
            results.push({
              path: route,
              type: 'app',
              exists: response.ok,
            });
          } catch (err) {
            results.push({
              path: route,
              type: 'app',
              exists: false,
            });
          }
        }
        
        setRoutes(results);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        logger.error('Error checking routes', { error: errorMessage });
      } finally {
        setLoading(false);
      }
    };
    
    checkRoutes();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Route Debugging</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
              <p><strong>Browser:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}</p>
            </div>
            <div>
              <p><strong>Current Path:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'Unknown'}</p>
              <p><strong>Referrer:</strong> {typeof document !== 'undefined' ? document.referrer : 'Unknown'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Route Status</h2>
          
          {loading ? (
            <p>Checking routes...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {routes.map((route, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.path}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${route.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {route.exists ? 'Exists' : 'Not Found'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={route.path} className="text-blue-600 hover:text-blue-900">
                          Visit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Check that all page files are in the correct locations</li>
            <li>Verify that the App Router is properly configured</li>
            <li>Check for any conflicting routes between App Router and Pages Router</li>
            <li>Ensure that all components are properly exported</li>
            <li>Check the server logs for any errors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

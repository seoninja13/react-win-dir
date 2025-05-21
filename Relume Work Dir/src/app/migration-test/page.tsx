'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLogger } from '@/utils/logger';
import { testRoute, testRoutes } from '@/utils/migration-testing';

interface RouteTestResult {
  route: string;
  status: 'success' | 'failure';
  statusCode?: number;
  error?: string;
}

export default function MigrationTestPage() {
  const logger = useLogger('MigrationTestPage');
  const [routes, setRoutes] = useState<string[]>([
    '/',
    '/windows',
    '/doors',
    '/vinyl-siding',
    '/contact',
    '/debug',
  ]);
  const [customRoute, setCustomRoute] = useState('');
  const [results, setResults] = useState<RouteTestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    logger.migration('Migration test page rendered', {
      timestamp: new Date().toISOString(),
    });
  }, [logger]);

  const handleAddRoute = () => {
    if (customRoute && !routes.includes(customRoute)) {
      setRoutes([...routes, customRoute]);
      setCustomRoute('');
    }
  };

  const handleRemoveRoute = (route: string) => {
    setRoutes(routes.filter(r => r !== route));
  };

  const handleTestRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      logger.migration('Starting route tests', {
        routes,
        timestamp: new Date().toISOString(),
      });
      
      const results = await testRoutes(routes);
      setResults(results);
      
      const successCount = results.filter(r => r.status === 'success').length;
      logger.migration('Route tests completed', {
        total: results.length,
        success: successCount,
        failure: results.length - successCount,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      logger.error('Error testing routes', { error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleTestSingleRoute = async (route: string) => {
    try {
      logger.migration(`Testing single route: ${route}`, {
        timestamp: new Date().toISOString(),
      });
      
      const result = await testRoute(route);
      
      // Update the results array with the new result
      setResults(prevResults => {
        const index = prevResults.findIndex(r => r.route === route);
        if (index >= 0) {
          const newResults = [...prevResults];
          newResults[index] = result;
          return newResults;
        }
        return [...prevResults, result];
      });
      
      logger.migration(`Single route test completed: ${route}`, {
        status: result.status,
        statusCode: result.statusCode,
        error: result.error,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      logger.error(`Error testing route: ${route}`, { error: errorMessage });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">App Router Migration Testing</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Routes to Test</h2>
          
          <div className="mb-4 flex">
            <input
              type="text"
              value={customRoute}
              onChange={(e) => setCustomRoute(e.target.value)}
              placeholder="Enter a route (e.g., /about-us)"
              className="flex-1 p-2 border rounded mr-2"
            />
            <button
              onClick={handleAddRoute}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Route
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Current Routes:</h3>
            <ul className="space-y-2">
              {routes.map((route) => (
                <li key={route} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{route}</span>
                  <div>
                    <button
                      onClick={() => handleTestSingleRoute(route)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm mr-2 hover:bg-green-700"
                    >
                      Test
                    </button>
                    <button
                      onClick={() => handleRemoveRoute(route)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={handleTestRoutes}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Testing...' : 'Test All Routes'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          
          {results.length === 0 ? (
            <p className="text-gray-500">No tests have been run yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.route}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {result.status === 'success' ? 'Success' : 'Failure'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.statusCode || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.error || 'None'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={result.route} className="text-blue-600 hover:text-blue-900 mr-4">
                          Visit
                        </Link>
                        <button
                          onClick={() => handleTestSingleRoute(result.route)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Retest
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link 
            href="/"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Home
          </Link>
          <Link 
            href="/debug"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Debug Page
          </Link>
        </div>
      </div>
    </div>
  );
}

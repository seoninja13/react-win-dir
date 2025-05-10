'use client';

import React, { useState } from 'react';
import { logger, createLogger } from '@/lib/logger';

// Create a component-specific logger
const componentLogger = createLogger('LoggingExample');

export default function LoggingExample() {
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState('info');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Log the message with the selected level
      let logResult;

      switch (level) {
        case 'debug':
          logResult = await componentLogger.debug(message, { source: 'user-input' });
          break;
        case 'info':
          logResult = await componentLogger.info(message, { source: 'user-input' });
          break;
        case 'warn':
          logResult = await componentLogger.warn(message, { source: 'user-input' });
          break;
        case 'error':
          logResult = await componentLogger.error(message, { source: 'user-input' });
          break;
        case 'fatal':
          logResult = await componentLogger.fatal(message, { source: 'user-input' });
          break;
        default:
          logResult = await componentLogger.info(message, { source: 'user-input' });
      }

      // Check if the log was only saved to console
      if (logResult.consoleOnly) {
        setResult({
          success: true,
          details: logResult,
          consoleOnly: true,
          message: logResult.message || 'Log saved to console only'
        });
      } else {
        setResult({ success: true, details: logResult });
      }
      setMessage('');
    } catch (error) {
      setResult({ success: false, error });
    }
  };

  // Log page view when component mounts
  React.useEffect(() => {
    logger.info('Logging example page viewed', {
      component: 'LoggingExample',
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Logging Example</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Log Message
          </label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Log Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
            <option value="fatal">Fatal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Log Message
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-3 rounded ${result.success ? (result.consoleOnly ? 'bg-yellow-100' : 'bg-green-100') : 'bg-red-100'}`}>
          <p className="text-sm font-medium">
            {result.success
              ? (result.consoleOnly
                ? 'Log saved to console only'
                : 'Log saved successfully to Supabase!')
              : 'Failed to save log.'}
          </p>
          {result.message && (
            <p className="text-xs mt-1 text-gray-600">{result.message}</p>
          )}
          <pre className="mt-2 text-xs overflow-auto max-h-40 bg-gray-50 p-2 rounded">
            {JSON.stringify(result.details || result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

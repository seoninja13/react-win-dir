'use client';

import { useState, useEffect } from 'react';

interface ConnectionStatus {
  isConnected: boolean;
  message: string;
  details?: any;
}

export default function SupabaseConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Checking connection...',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/check-connection');
        const data = await response.json();
        
        setStatus({
          isConnected: data.isConnected,
          message: data.message,
          details: data.details,
        });
      } catch (error) {
        setStatus({
          isConnected: false,
          message: 'Failed to check connection',
          details: error instanceof Error ? error.message : String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="mb-8 p-4 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold mb-2">Supabase Connection Status</h2>
      
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full mr-2 ${status.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`font-medium ${status.isConnected ? 'text-green-700' : 'text-red-700'}`}>
          {isLoading ? 'Checking connection...' : status.isConnected ? 'Connected' : 'Not Connected'}
        </span>
      </div>
      
      <p className="mt-2 text-gray-600">{status.message}</p>
      
      {status.details && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <p className="font-medium text-gray-700">Connection Details:</p>
          <pre className="mt-1 text-xs overflow-x-auto">
            {typeof status.details === 'object' 
              ? JSON.stringify(status.details, null, 2) 
              : status.details}
          </pre>
        </div>
      )}
    </div>
  );
}

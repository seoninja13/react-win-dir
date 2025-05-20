// src/app/admin/components/SupabaseConnectionStatus.tsx
'use client';

import { useState, useTransition } from 'react';
import { checkSupabaseConnection } from '../actions/checkSupabaseConnection';

interface StatusMessage {
  type: 'idle' | 'loading' | 'success' | 'error';
  text: string | null;
}

export default function SupabaseConnectionStatus() {
  const [status, setStatus] = useState<StatusMessage>({ type: 'idle', text: 'Click the button to check Supabase connection.' });
  const [isPending, startTransition] = useTransition();

  const handleCheckConnection = () => {
    startTransition(async () => {
      setStatus({ type: 'loading', text: 'Checking connection...' });
      try {
        const result = await checkSupabaseConnection();
        if (result.success) {
          setStatus({ type: 'success', text: result.message || 'Successfully connected to Supabase!' });
        } else {
          setStatus({ type: 'error', text: result.error || 'Failed to connect to Supabase.' });
        }
      } catch (error: any) {
        console.error('Error calling checkSupabaseConnection action:', error);
        setStatus({ type: 'error', text: `Client-side error: ${error.message || 'An unknown error occurred.'}` });
      }
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Supabase Connection Test</h2>
      <button
        onClick={handleCheckConnection}
        disabled={isPending}
        className={`px-4 py-2 font-medium rounded-md text-white 
                    ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'}`}
      >
        {isPending ? 'Checking...' : 'Check Supabase Connection'}
      </button>
      {status.text && (
        <div 
          className={`mt-4 p-3 rounded-md text-sm 
                      ${status.type === 'success' ? 'bg-green-100 text-green-700' : ''}
                      ${status.type === 'error' ? 'bg-red-100 text-red-700' : ''}
                      ${status.type === 'loading' || status.type === 'idle' ? 'bg-blue-100 text-blue-700' : ''}`}
        >
          <p><strong>Status:</strong> {status.text}</p>
        </div>
      )}
    </div>
  );
}

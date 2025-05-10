'use client';

import React, { useEffect, useState } from 'react';
import LoggingExample from '@/components/LoggingExample';
import { supabase } from '@/lib/supabase';

export default function LoggingTestPage() {
  const [supabaseStatus, setSupabaseStatus] = useState<string>('Checking Supabase connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check Supabase connection
    async function checkSupabase() {
      try {
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('Supabase client:', supabase);

        const { data, error } = await supabase.from('logs').select('count').limit(1);

        if (error) {
          console.error('Supabase error:', error);
          setSupabaseStatus('Error connecting to Supabase');
          setError(error.message);
        } else {
          console.log('Supabase connection successful:', data);
          setSupabaseStatus('Connected to Supabase successfully');
        }
      } catch (err) {
        console.error('Error checking Supabase:', err);
        setSupabaseStatus('Error checking Supabase connection');
        setError(err instanceof Error ? err.message : String(err));
      }
    }

    checkSupabase();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Supabase Logging Test</h1>
      <p className="text-center mb-8 text-gray-600">
        This page demonstrates the integration with Supabase for extensive logging.
      </p>

      <div className={`mb-6 p-4 rounded ${error ? 'bg-red-100' : 'bg-green-100'}`}>
        <h3 className="font-bold">Supabase Status:</h3>
        <p>{supabaseStatus}</p>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <LoggingExample />

      <div className="mt-12 max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About the Logging System</h2>
        <p className="mb-4">
          This logging system uses Supabase to store detailed logs with the following features:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Multiple log levels (debug, info, warn, error, fatal)</li>
          <li>Structured data storage with JSON support</li>
          <li>Source tracking to identify which component generated the log</li>
          <li>Session tracking across page views</li>
          <li>Browser and environment information</li>
          <li>Automatic cleanup of old logs (30 days)</li>
          <li>Row-level security for log access</li>
        </ul>
      </div>
    </div>
  );
}

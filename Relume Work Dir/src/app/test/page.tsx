'use client';

import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">App Router Test Page</h1>
        <p className="text-gray-600 mb-6">
          If you can see this page, the App Router is working correctly.
        </p>
      </div>
    </div>
  );
}

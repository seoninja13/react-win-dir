import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Windows Doors CA</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the Windows Doors CA website. This is the home page rendered from pages/index.js.
        </p>
        
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Debugging Information</h2>
          <p className="text-sm text-gray-700">
            This page is being served from the Pages Router. If you're seeing this page, basic routing is working.
          </p>
        </div>
        
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
            <Link href="/debug" className="text-blue-500 hover:underline">
              Debug Page
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
        
        <div className="flex justify-center">
          <Link 
            href="/debug" 
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Debug Page
          </Link>
        </div>
      </div>
    </div>
  );
}

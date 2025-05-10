'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';

export default function WindowsPage(): React.JSX.Element {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Windows</h1>
        <p className="mb-4">
          Discover our wide selection of energy-efficient windows designed to enhance your home&apos;s beauty and comfort.
        </p>
      </main>

      <Footer4 />
    </div>
  );
}

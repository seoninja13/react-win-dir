'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';

export default function RoofingPage(): React.JSX.Element {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Roofing</h1>
        <p className="mb-4">
          Protect your home with our durable, high-quality roofing solutions.
        </p>
      </main>

      <Footer4 />
    </div>
  );
}

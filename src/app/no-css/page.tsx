'use client';

import React from 'react';

export default function NoCssPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Page Without CSS Imports</h1>
      <p style={{ marginBottom: '20px' }}>This is a simple page without any CSS imports.</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h2>Windows</h2>
          <p>Explore our window options</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h2>Doors</h2>
          <p>Discover our door collection</p>
        </div>
      </div>
    </div>
  );
}

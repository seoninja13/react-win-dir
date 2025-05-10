'use client';

import React from 'react';

export default function SimplePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Welcome to Windows Doors Website</h1>
      <p style={{ marginBottom: '20px' }}>This is a simple page without Tailwind CSS.</p>
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
      <div style={{ marginTop: '30px' }}>
        <a href="/relume-home" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Relume Home Page
        </a>
      </div>
    </div>
  );
}

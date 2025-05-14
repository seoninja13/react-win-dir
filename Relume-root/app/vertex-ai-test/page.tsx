import React from 'react';
import VertexAIImageGenerator from '../../components/VertexAIImageGenerator';

export default function VertexAITestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Vertex AI Integration Test</h1>
      <VertexAIImageGenerator />
    </div>
  );
}

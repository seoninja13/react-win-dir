'use client'; // Required for components with hooks and event handlers

import { useState } from 'react';
import Head from 'next/head'; // Can still be used for basic head tags, or use new Metadata API

// You might want to create a more structured layout for admin pages later
// import AdminLayout from '@/components/admin/AdminLayout'; 

const VertexAIPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<{
    id: string;
    uri: string;
    prompt: string;
    model: string;
    timestamp: string;
    size: { width: number; height: number };
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageData(null);

    try {
      // The API route is now /admin/api/vertex-ai/image/generate
      // The 'fetch' path should be absolute from the root of the domain.
      const response = await fetch('/admin/api/vertex-ai/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ensure NEXT_PUBLIC_API_KEY is set in your .env.local for client-side access
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY || 'your-secure-api-key'}` 
        },
        body: JSON.stringify({ prompt })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate image. Check server logs for more details.');
      }

      setImageData(result.data);
    } catch (err: any) {
      console.error('❌ Error generating image from client:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Basic styling for now, can be enhanced with Tailwind from Relume or custom CSS.
  return (
    // <AdminLayout> // Example if using a layout
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <Head>
        <title>Vertex AI Image Generation (App Router)</title>
        <meta name="description" content="Generate images using Vertex AI with App Router" />
      </Head>

      <h1>Vertex AI Image Generation (App Router)</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="prompt" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Image Prompt:
          </label>
          <textarea
            id="prompt"
            rows={4}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="e.g., A futuristic cityscape at sunset"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {error && (
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {imageData && (
        <div>
          <h2>Generated Image:</h2>
          <div style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
            <img
              src={imageData.uri} // Ensure this URI is a data URL or publicly accessible image URL
              alt={imageData.prompt}
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
            />
            <p><strong>Prompt:</strong> {imageData.prompt}</p>
            <p><strong>Model:</strong> {imageData.model}</p>
            <p><strong>Timestamp:</strong> {new Date(imageData.timestamp).toLocaleString()}</p>
            <p><strong>Size:</strong> {imageData.size.width}x{imageData.size.height}</p>
          </div>
        </div>
      )}
    </div>
    // </AdminLayout>
  );
};

export default VertexAIPage;

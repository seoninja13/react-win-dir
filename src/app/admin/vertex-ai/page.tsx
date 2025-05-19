'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VertexAIPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<{
    id: string;
    uri: string;
    prompt: string;
    model: string;
    timestamp: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/admin/api/vertex-ai/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // In a real app, you would get this from your auth system
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY || 'your-secret-key'}`
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setImageData(data.data);
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.message || 'An error occurred while generating the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vertex AI Image Generation</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Image Prompt
            </label>
            <textarea
              id="prompt"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {imageData && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Generated Image</h2>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={imageData.uri}
                alt={imageData.prompt}
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p><span className="font-medium">Prompt:</span> {imageData.prompt}</p>
              <p><span className="font-medium">Model:</span> {imageData.model}</p>
              <p><span className="font-medium">Generated at:</span> {new Date(imageData.timestamp).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

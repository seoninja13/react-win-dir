'use client';

import { useState } from 'react';

interface GenerationRequest {
  id: string;
  type: 'text' | 'image';
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  error?: string;
  createdAt: string;
}

export default function ContentEngine() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [textPrompt, setTextPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [generationRequests, setGenerationRequests] = useState<GenerationRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // Tabs for different generation types
  const tabs = [
    { id: 'text', label: 'Text Generation' },
    { id: 'image', label: 'Image Generation' },
  ];

  // Handle text generation
  const handleTextGeneration = async () => {
    if (!textPrompt.trim()) return;

    setLoading(true);

    // Create a new generation request
    const newRequest: GenerationRequest = {
      id: Date.now().toString(),
      type: 'text',
      prompt: textPrompt,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Add to requests
    setGenerationRequests(prev => [newRequest, ...prev]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update request status
      setGenerationRequests(prev =>
        prev.map(req =>
          req.id === newRequest.id
            ? {
                ...req,
                status: 'completed',
                result: `Generated text for prompt: "${textPrompt}"\n\nThis is a placeholder for the actual generated text. In a real implementation, this would be the result from the content generation API.`,
              }
            : req
        )
      );
    } catch (error) {
      // Update request status with error
      setGenerationRequests(prev =>
        prev.map(req =>
          req.id === newRequest.id
            ? {
                ...req,
                status: 'failed',
                error: error instanceof Error ? error.message : 'An unknown error occurred',
              }
            : req
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle image generation
  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) return;

    setLoading(true);

    // Create a new generation request
    const newRequest: GenerationRequest = {
      id: Date.now().toString(),
      type: 'image',
      prompt: imagePrompt,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Add to requests
    setGenerationRequests(prev => [newRequest, ...prev]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update request status
      setGenerationRequests(prev =>
        prev.map(req =>
          req.id === newRequest.id
            ? {
                ...req,
                status: 'completed',
                result: 'https://placehold.co/600x400?text=Generated+Image',
              }
            : req
        )
      );
    } catch (error) {
      // Update request status with error
      setGenerationRequests(prev =>
        prev.map(req =>
          req.id === newRequest.id
            ? {
                ...req,
                status: 'failed',
                error: error instanceof Error ? error.message : 'An unknown error occurred',
              }
            : req
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'text' | 'image')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Text Generation Tab */}
      {activeTab === 'text' && (
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Text Generation</h3>
          <div className="mb-4">
            <label htmlFor="textPrompt" className="block text-sm font-medium text-gray-700 mb-1">
              Prompt
            </label>
            <textarea
              id="textPrompt"
              rows={4}
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              placeholder="Enter a prompt for text generation..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <button
              onClick={handleTextGeneration}
              disabled={loading || !textPrompt.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Text'}
            </button>
          </div>
        </div>
      )}

      {/* Image Generation Tab */}
      {activeTab === 'image' && (
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Image Generation</h3>
          <div className="mb-4">
            <label htmlFor="imagePrompt" className="block text-sm font-medium text-gray-700 mb-1">
              Prompt
            </label>
            <textarea
              id="imagePrompt"
              rows={4}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter a prompt for image generation..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <button
              onClick={handleImageGeneration}
              disabled={loading || !imagePrompt.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
        </div>
      )}

      {/* Generation History */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Generation History</h3>
        {generationRequests.length === 0 ? (
          <p className="text-gray-500">No generation requests yet.</p>
        ) : (
          <div className="space-y-4">
            {generationRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">{request.type === 'text' ? 'Text' : 'Image'} Generation</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : request.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Prompt:</strong> {request.prompt}
                </p>
                {request.result && request.type === 'text' && (
                  <div className="mt-2 p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap">
                    {request.result}
                  </div>
                )}
                {request.result && request.type === 'image' && (
                  <div className="mt-2">
                    <img
                      src={request.result}
                      alt="Generated image"
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                )}
                {request.error && (
                  <div className="mt-2 p-3 bg-red-50 text-red-700 rounded text-sm">
                    <strong>Error:</strong> {request.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

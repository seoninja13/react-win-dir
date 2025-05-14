'use client';

import React, { useState } from 'react';
import { generateImage, generateMultipleImages } from '../../Supabase/utils/image-generation';

interface ImageGenerationResponse {
  imageUrl: string;
  enhancedPrompt?: string;
}

export default function VertexAIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<ImageGenerationResponse | null>(null);
  const [generatedImages, setGeneratedImages] = useState<ImageGenerationResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateImage(prompt);
      setGeneratedImage(result);
      setGeneratedImages([]);
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMultipleImages = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const results = await generateMultipleImages(prompt);
      setGeneratedImages(results);
      setGeneratedImage(null);
    } catch (err) {
      console.error('Error generating images:', err);
      setError('Failed to generate images. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Vertex AI Image Generator</h1>
      
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your prompt
        </label>
        <textarea
          id="prompt"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
        />
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleGenerateImage}
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Single Image'}
        </button>
        
        <button
          onClick={handleGenerateMultipleImages}
          disabled={isGenerating}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Multiple Images'}
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {generatedImage && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
          <div className="border border-gray-300 rounded-md p-4">
            <img
              src={generatedImage.imageUrl}
              alt="Generated image"
              className="w-full h-auto rounded-md"
            />
            {generatedImage.enhancedPrompt && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Enhanced Prompt:</h3>
                <p className="text-gray-600">{generatedImage.enhancedPrompt}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {generatedImages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.map((image, index) => (
              <div key={index} className="border border-gray-300 rounded-md p-4">
                <img
                  src={image.imageUrl}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-auto rounded-md"
                />
                {image.enhancedPrompt && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700">Enhanced Prompt:</h3>
                    <p className="text-gray-600">{image.enhancedPrompt}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

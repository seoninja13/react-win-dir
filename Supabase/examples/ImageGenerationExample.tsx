import React, { useState } from 'react';
import {
  useSingleImageGeneration,
  useMultipleImageGeneration,
  useProductImageGeneration,
  useProductImageVariations
} from '../hooks/useImageGeneration';

/**
 * Example component for generating images using Google Generative AI SDK
 *
 * Documentation:
 * - Google Generative AI SDK: https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
 * - Imagen API: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 * - Quickstart: https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console
 */
export default function ImageGenerationExample() {
  // Single image generation
  const { generateSingleImage, loading: singleLoading, imageData, error: singleError } = useSingleImageGeneration();
  const [prompt, setPrompt] = useState('');

  // Multiple image generation
  const { generateImages, loading: multipleLoading, imagesData, error: multipleError } = useMultipleImageGeneration();

  // Product image generation
  const { generateProductImage, loading: productLoading, imageData: productImageData, error: productError } = useProductImageGeneration();
  const { generateProductImageVariations, loading: variationsLoading, imagesData: productVariations, error: variationsError } = useProductImageVariations();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('windows');

  // Handle single image generation
  const handleSingleImageGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    try {
      await generateSingleImage(prompt, {
        aspectRatio: '1:1',
        safetySetting: 'block_medium_and_above',
      });
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Handle multiple image generation
  const handleMultipleImageGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    try {
      await generateImages(prompt, {
        aspectRatio: '1:1',
        safetySetting: 'block_medium_and_above',
        numberOfImages: 4,
      });
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  // Handle product image generation
  const handleProductImageGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productDescription) return;

    try {
      await generateProductImage(productName, productDescription, productCategory, {
        aspectRatio: '1:1',
        safetySetting: 'block_medium_and_above',
      });
    } catch (error) {
      console.error('Error generating product image:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Generation Example</h1>

      {/* Single Image Generation */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Generate Single Image</h2>
        <form onSubmit={handleSingleImageGeneration} className="mb-4">
          <div className="mb-4">
            <label htmlFor="prompt" className="block mb-1">Prompt:</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter a description of the image you want to generate"
              required
            />
          </div>
          <button
            type="submit"
            disabled={singleLoading || !prompt}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {singleLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {singleError && (
          <div className="text-red-500 mb-4">
            Error: {singleError.message}
          </div>
        )}

        {imageData && (
          <div>
            <h3 className="font-semibold mb-2">Generated Image:</h3>
            <div className="border rounded p-2">
              <img
                src={imageData.imageUrl}
                alt="Generated image"
                className="max-w-full h-auto"
              />
              {imageData.enhancedPrompt && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Enhanced prompt: {imageData.enhancedPrompt}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Multiple Image Generation */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Generate Multiple Images</h2>
        <form onSubmit={handleMultipleImageGeneration} className="mb-4">
          <div className="mb-4">
            <label htmlFor="multiPrompt" className="block mb-1">Prompt:</label>
            <textarea
              id="multiPrompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter a description of the images you want to generate"
              required
            />
          </div>
          <button
            type="submit"
            disabled={multipleLoading || !prompt}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {multipleLoading ? 'Generating...' : 'Generate Images'}
          </button>
        </form>

        {multipleError && (
          <div className="text-red-500 mb-4">
            Error: {multipleError.message}
          </div>
        )}

        {imagesData.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Generated Images:</h3>
            <div className="grid grid-cols-2 gap-4">
              {imagesData.map((image, index) => (
                <div key={index} className="border rounded p-2">
                  <img
                    src={image.imageUrl}
                    alt={`Generated image ${index + 1}`}
                    className="max-w-full h-auto"
                  />
                  {image.enhancedPrompt && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Enhanced prompt: {image.enhancedPrompt}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Image Generation */}
      <div className="p-4 border rounded mb-8">
        <h2 className="text-xl font-semibold mb-2">Generate Product Image</h2>
        <form onSubmit={handleProductImageGeneration} className="mb-4">
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-1">Product Name:</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block mb-1">Product Description:</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productCategory" className="block mb-1">Product Category:</label>
            <select
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="windows">Windows</option>
              <option value="doors">Doors</option>
              <option value="siding">Siding</option>
              <option value="roofing">Roofing</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={productLoading || !productName || !productDescription}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {productLoading ? 'Generating...' : 'Generate Product Image'}
          </button>
        </form>

        {productError && (
          <div className="text-red-500 mb-4">
            Error: {productError.message}
          </div>
        )}

        {productImageData && (
          <div>
            <h3 className="font-semibold mb-2">Generated Product Image:</h3>
            <div className="border rounded p-2">
              <img
                src={productImageData.imageUrl}
                alt="Generated product image"
                className="max-w-full h-auto"
              />
              {productImageData.enhancedPrompt && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Enhanced prompt: {productImageData.enhancedPrompt}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Image Variations */}
      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Generate Product Image Variations</h2>
        <p className="mb-4 text-gray-600">Generate multiple variations of a product image to choose from.</p>
        <button
          onClick={() => {
            if (productName && productDescription) {
              generateProductImageVariations(productName, productDescription, productCategory, {
                aspectRatio: '1:1',
                numberOfImages: 4,
              });
            }
          }}
          disabled={variationsLoading || !productName || !productDescription}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {variationsLoading ? 'Generating...' : 'Generate Variations'}
        </button>

        {variationsError && (
          <div className="text-red-500 mt-4">
            Error: {variationsError.message}
          </div>
        )}

        {productVariations && productVariations.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Product Image Variations:</h3>
            <div className="grid grid-cols-2 gap-4">
              {productVariations.map((image, index) => (
                <div key={index} className="border rounded p-2">
                  <img
                    src={image.imageUrl}
                    alt={`Product image variation ${index + 1}`}
                    className="max-w-full h-auto"
                  />
                  {image.enhancedPrompt && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Enhanced prompt: {image.enhancedPrompt}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

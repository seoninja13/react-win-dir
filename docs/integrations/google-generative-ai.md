# Google Generative AI Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Google Generative AI

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
3. [Google Cloud CLI Setup](#google-cloud-cli-setup)
4. [Image Generation Utilities](#image-generation-utilities)
   - [Gemini Model](#gemini-model)
   - [Imagen Model](#imagen-model)
   - [Product Image Generation](#product-image-generation)
5. [React Hooks](#react-hooks)
   - [Single Image Generation](#single-image-generation)
   - [Multiple Image Generation](#multiple-image-generation)
   - [Product Image Generation](#product-image-generation-1)
   - [Product Image Variations](#product-image-variations)
6. [Example Usage](#example-usage)
   - [Basic Image Generation](#basic-image-generation)
   - [Product Image Generation](#product-image-generation-2)
   - [Complete Example Component](#complete-example-component)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Related Documentation](#related-documentation)

## Overview

The Google Generative AI integration provides image generation capabilities for the Windows Doors CA website. It uses Google's Generative AI SDK to generate high-quality images from text prompts, including product images for windows, doors, and other products.

This integration replaces the previous Unsplash integration, providing more control over the generated images and ensuring they match the specific products being displayed.

## Setup

### Prerequisites

- Google Cloud account with billing enabled
- Google Cloud project with Vertex AI API enabled
- Google Cloud API key with access to Generative AI APIs

### Installation

1. Install the Google Generative AI SDK:

```bash
npm install @google/genai
```

2. Install the Google Cloud CLI (gcloud):

Visit the official download page: https://cloud.google.com/sdk/docs/install and follow the installation instructions for your operating system.

### Configuration

1. Add the following environment variables to your `.env.local` file:

```
# Google Cloud Environment Variables
GOOGLE_CLOUD_API_KEY=your-google-cloud-api-key-here
```

2. Import the image generation utilities in your code:

```typescript
import { generateImage, generateMultipleImages } from 'Supabase/utils/image-generation';
```

3. Import the React hooks in your components:

```typescript
import { 
  useSingleImageGeneration, 
  useMultipleImageGeneration, 
  useProductImageGeneration 
} from 'Supabase/hooks/useImageGeneration';
```

## Google Cloud CLI Setup

The Google Cloud CLI (gcloud) is a set of tools that you can use to manage resources and applications hosted on Google Cloud. Here's how to set it up:

1. Download and install the Google Cloud CLI from https://cloud.google.com/sdk/docs/install
2. Initialize the gcloud CLI:

```bash
gcloud init
```

3. Log in with your Google account and select your project
4. Set up application default credentials:

```bash
gcloud auth application-default login
```

5. Verify the installation:

```bash
gcloud --version
```

## Image Generation Utilities

The image generation utilities are located in `Supabase/utils/image-generation.ts`. They provide functions for generating images using both the Gemini and Imagen models.

### Gemini Model

The Gemini model is used for general image generation. It's faster and more versatile, but may not produce images with the same level of detail as the Imagen model.

```typescript
const result = await generateImage("A modern double-hung window with white frame");
```

### Imagen Model

The Imagen model is used for high-quality image generation. It produces more detailed and realistic images, but may be slower and more expensive.

```typescript
const images = await generateMultipleImages("A modern entry door with glass panels", {
  numberOfImages: 4,
  aspectRatio: "1:1"
});
```

### Product Image Generation

The product image generation utilities are designed specifically for generating product images. They create optimized prompts based on the product name, description, and category.

```typescript
const productImage = await generateProductImage(
  "Double-Hung Window",
  "Energy-efficient vinyl window with tilt-in sashes for easy cleaning",
  "windows"
);
```

## React Hooks

The React hooks are located in `Supabase/hooks/useImageGeneration.ts`. They provide a convenient way to use the image generation utilities in React components.

### Single Image Generation

The `useSingleImageGeneration` hook is used for generating a single image using the Gemini model.

```typescript
const { generateSingleImage, loading, imageData, error } = useSingleImageGeneration();

// Generate an image
await generateSingleImage("A modern double-hung window with white frame");
```

### Multiple Image Generation

The `useMultipleImageGeneration` hook is used for generating multiple images using the Imagen model.

```typescript
const { generateImages, loading, imagesData, error } = useMultipleImageGeneration();

// Generate multiple images
await generateImages("A modern entry door with glass panels", {
  numberOfImages: 4,
  aspectRatio: "1:1"
});
```

### Product Image Generation

The `useProductImageGeneration` hook is used for generating a single product image.

```typescript
const { generateProductImage, loading, imageData, error } = useProductImageGeneration();

// Generate a product image
await generateProductImage(
  "Double-Hung Window",
  "Energy-efficient vinyl window with tilt-in sashes for easy cleaning",
  "windows"
);
```

### Product Image Variations

The `useProductImageVariations` hook is used for generating multiple variations of a product image.

```typescript
const { generateProductImageVariations, loading, imagesData, error } = useProductImageVariations();

// Generate product image variations
await generateProductImageVariations(
  "Double-Hung Window",
  "Energy-efficient vinyl window with tilt-in sashes for easy cleaning",
  "windows",
  {
    numberOfImages: 4,
    aspectRatio: "1:1"
  }
);
```

## Example Usage

### Basic Image Generation

```tsx
import React, { useState } from 'react';
import { useSingleImageGeneration } from 'Supabase/hooks/useImageGeneration';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const { generateSingleImage, loading, imageData, error } = useSingleImageGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    
    try {
      await generateSingleImage(prompt);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description of the image you want to generate"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      
      {error && <div>Error: {error.message}</div>}
      
      {imageData && (
        <div>
          <img src={imageData.imageUrl} alt="Generated image" />
        </div>
      )}
    </div>
  );
}
```

### Product Image Generation

```tsx
import React from 'react';
import { useProductImageGeneration } from 'Supabase/hooks/useImageGeneration';

function ProductImageGenerator({ product }) {
  const { generateProductImage, loading, imageData, error } = useProductImageGeneration();

  const handleGenerateImage = async () => {
    try {
      await generateProductImage(
        product.name,
        product.description,
        product.category
      );
    } catch (error) {
      console.error('Error generating product image:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Product Image'}
      </button>
      
      {error && <div>Error: {error.message}</div>}
      
      {imageData && (
        <div>
          <img src={imageData.imageUrl} alt={`Generated image of ${product.name}`} />
        </div>
      )}
    </div>
  );
}
```

### Complete Example Component

A complete example component is available at `Supabase/examples/ImageGenerationExample.tsx`. It demonstrates all the image generation capabilities, including:

- Single image generation
- Multiple image generation
- Product image generation
- Product image variations

## Best Practices

1. **Optimize Prompts**: Be specific and detailed in your prompts to get the best results.
2. **Cache Generated Images**: Store generated images in Supabase Storage to avoid regenerating them.
3. **Handle Errors**: Always handle errors gracefully and provide feedback to the user.
4. **Limit Generation**: Limit the number of images generated to control costs.
5. **Use Appropriate Models**: Use the Gemini model for faster, less detailed images and the Imagen model for high-quality images.
6. **Optimize Image Size**: Use the appropriate aspect ratio and size for your use case.
7. **Respect Usage Limits**: Be aware of Google Cloud's usage limits and pricing.

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure your API key has access to the Generative AI APIs.
2. **Quota Exceeded**: Check your Google Cloud console for quota usage.
3. **Model Not Available**: Ensure the model you're trying to use is available in your region.
4. **Poor Image Quality**: Try adjusting your prompt to be more specific.
5. **Slow Generation**: The Imagen model can be slower than the Gemini model.

### Error Handling

Always wrap image generation calls in try-catch blocks:

```typescript
try {
  const result = await generateImage("A modern double-hung window");
} catch (error) {
  console.error('Image generation failed:', error);
  // Handle the error appropriately
}
```

## Related Documentation

- [Google Generative AI SDK Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview)
- [Imagen API Reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api)
- [Quickstart: Generate images using the console](https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console)
- [Supabase Integration](./supabase.md)
- [Database Schema Documentation](../architecture/database-schema.md)

Last Updated: May 16, 2025 (Initial documentation)

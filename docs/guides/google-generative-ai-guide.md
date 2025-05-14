# Google Generative AI Integration Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Google Generative AI Integration Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Setting Up Google Cloud](#setting-up-google-cloud)
   - [Creating a Google Cloud Project](#creating-a-google-cloud-project)
   - [Enabling the Vertex AI API](#enabling-the-vertex-ai-api)
   - [Creating an API Key](#creating-an-api-key)
4. [Installing the Google Cloud CLI](#installing-the-google-cloud-cli)
   - [Windows Installation](#windows-installation)
   - [macOS Installation](#macos-installation)
   - [Linux Installation](#linux-installation)
   - [Initializing the CLI](#initializing-the-cli)
5. [Installing the Google Generative AI SDK](#installing-the-google-generative-ai-sdk)
6. [Configuring Environment Variables](#configuring-environment-variables)
7. [Using the Image Generation Utilities](#using-the-image-generation-utilities)
   - [Basic Image Generation](#basic-image-generation)
   - [Multiple Image Generation](#multiple-image-generation)
   - [Product Image Generation](#product-image-generation)
8. [Using the React Hooks](#using-the-react-hooks)
   - [Single Image Generation Hook](#single-image-generation-hook)
   - [Multiple Image Generation Hook](#multiple-image-generation-hook)
   - [Product Image Generation Hook](#product-image-generation-hook)
   - [Product Image Variations Hook](#product-image-variations-hook)
9. [Integrating with Supabase](#integrating-with-supabase)
10. [Troubleshooting](#troubleshooting)
11. [Related Documentation](#related-documentation)

## Introduction

This guide provides step-by-step instructions for integrating Google Generative AI into the Windows Doors CA website. The integration enables the generation of high-quality images for products, including windows, doors, and other home improvement items.

## Prerequisites

Before you begin, ensure you have:

- A Google Cloud account with billing enabled
- Node.js 18 or later installed
- npm or yarn package manager
- Access to the Windows Doors CA codebase

## Setting Up Google Cloud

### Creating a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter a name for your project (e.g., "Windows Doors CA")
5. Click "Create"

### Enabling the Vertex AI API

1. In the Google Cloud Console, go to the [API Library](https://console.cloud.google.com/apis/library)
2. Search for "Vertex AI API"
3. Click on "Vertex AI API"
4. Click "Enable"

### Creating an API Key

1. In the Google Cloud Console, go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" and select "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to only the Vertex AI API for security

## Installing the Google Cloud CLI

The Google Cloud CLI (gcloud) is a set of tools that you can use to manage resources and applications hosted on Google Cloud.

### Windows Installation

1. Download the [Google Cloud SDK installer](https://cloud.google.com/sdk/docs/install#windows)
2. Run the installer and follow the prompts
3. Select the following options during installation:
   - "Add gcloud CLI to your PATH"
   - "Create a desktop shortcut"
   - "Create a start menu shortcut"
   - "Create a Windows registry key for Windows terminal integration"
4. Click "Install"

### macOS Installation

1. Download the [Google Cloud SDK installer](https://cloud.google.com/sdk/docs/install#mac)
2. Extract the archive to a location of your choice
3. Run the install script:

```bash
./google-cloud-sdk/install.sh
```

### Linux Installation

1. Download the [Google Cloud SDK installer](https://cloud.google.com/sdk/docs/install#linux)
2. Extract the archive to a location of your choice
3. Run the install script:

```bash
./google-cloud-sdk/install.sh
```

### Initializing the CLI

After installation, initialize the gcloud CLI:

1. Open a terminal or command prompt
2. Run the initialization command:

```bash
gcloud init
```

3. Follow the prompts to log in with your Google account and select your project
4. Set up application default credentials:

```bash
gcloud auth application-default login
```

5. Verify the installation:

```bash
gcloud --version
```

## Installing the Google Generative AI SDK

Install the Google Generative AI SDK in your project:

```bash
npm install @google/genai
```

## Configuring Environment Variables

Add the following environment variables to your `.env.local` file:

```
# Google Cloud Environment Variables
GOOGLE_CLOUD_API_KEY=your-google-cloud-api-key-here
```

Replace `your-google-cloud-api-key-here` with the API key you created earlier.

## Using the Image Generation Utilities

The image generation utilities are located in `Supabase/utils/image-generation.ts`. They provide functions for generating images using both the Gemini and Imagen models.

### Basic Image Generation

To generate a single image using the Gemini model:

```typescript
import { generateImage } from 'Supabase/utils/image-generation';

// Generate an image
const result = await generateImage("A modern double-hung window with white frame");
console.log(result.imageUrl); // URL of the generated image
```

### Multiple Image Generation

To generate multiple images using the Imagen model:

```typescript
import { generateMultipleImages } from 'Supabase/utils/image-generation';

// Generate multiple images
const images = await generateMultipleImages("A modern entry door with glass panels", {
  numberOfImages: 4,
  aspectRatio: "1:1"
});

// Process the generated images
images.forEach((image, index) => {
  console.log(`Image ${index + 1}:`, image.imageUrl);
});
```

### Product Image Generation

To generate a product image with an optimized prompt:

```typescript
import { generateProductImage } from 'Supabase/utils/image-generation';

// Generate a product image
const productImage = await generateProductImage(
  "Double-Hung Window",
  "Energy-efficient vinyl window with tilt-in sashes for easy cleaning",
  "windows"
);

console.log(productImage.imageUrl); // URL of the generated product image
```

## Using the React Hooks

The React hooks are located in `Supabase/hooks/useImageGeneration.ts`. They provide a convenient way to use the image generation utilities in React components.

### Single Image Generation Hook

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
          placeholder="Enter a description"
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

### Multiple Image Generation Hook

```tsx
import React, { useState } from 'react';
import { useMultipleImageGeneration } from 'Supabase/hooks/useImageGeneration';

function MultipleImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const { generateImages, loading, imagesData, error } = useMultipleImageGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    
    try {
      await generateImages(prompt, {
        numberOfImages: 4,
        aspectRatio: "1:1"
      });
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Images'}
        </button>
      </form>
      
      {error && <div>Error: {error.message}</div>}
      
      {imagesData.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {imagesData.map((image, index) => (
            <div key={index}>
              <img src={image.imageUrl} alt={`Generated image ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Product Image Generation Hook

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

### Product Image Variations Hook

```tsx
import React from 'react';
import { useProductImageVariations } from 'Supabase/hooks/useImageGeneration';

function ProductImageVariations({ product }) {
  const { generateProductImageVariations, loading, imagesData, error } = useProductImageVariations();

  const handleGenerateVariations = async () => {
    try {
      await generateProductImageVariations(
        product.name,
        product.description,
        product.category,
        {
          numberOfImages: 4,
          aspectRatio: "1:1"
        }
      );
    } catch (error) {
      console.error('Error generating product image variations:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateVariations} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Variations'}
      </button>
      
      {error && <div>Error: {error.message}</div>}
      
      {imagesData.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {imagesData.map((image, index) => (
            <div key={index}>
              <img src={image.imageUrl} alt={`Product image variation ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Integrating with Supabase

To store generated images in Supabase Storage:

1. Generate the image using the utilities or hooks
2. Convert the base64 image data to a file
3. Upload the file to Supabase Storage
4. Store the URL in the database

Example:

```typescript
import { supabase } from 'Supabase/client';
import { generateProductImage } from 'Supabase/utils/image-generation';

async function generateAndStoreProductImage(product) {
  // Generate the product image
  const result = await generateProductImage(
    product.name,
    product.description,
    product.category
  );
  
  // Convert base64 to file
  const base64Data = result.imageUrl.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const fileName = `${product.slug}-${Date.now()}.png`;
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, buffer, {
      contentType: 'image/png',
      upsert: true
    });
  
  if (error) {
    throw error;
  }
  
  // Get the public URL
  const publicURL = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName).data.publicUrl;
  
  // Update the product in the database
  const { error: updateError } = await supabase
    .from('products')
    .update({ image_url: publicURL })
    .eq('id', product.id);
  
  if (updateError) {
    throw updateError;
  }
  
  return publicURL;
}
```

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

- [Google Generative AI Integration](../integrations/google-generative-ai.md)
- [Google Generative AI SDK Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview)
- [Imagen API Reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api)
- [Quickstart: Generate images using the console](https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console)
- [Supabase Integration](../integrations/supabase.md)

Last Updated: May 16, 2025 (Initial documentation)

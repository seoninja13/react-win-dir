# Vertex AI Image Analysis Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Vertex AI Image Analysis Guide

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Basic Image Analysis](#basic-image-analysis)
5. [Advanced Usage](#advanced-usage)
6. [React Integration](#react-integration)
7. [Testing](#testing)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Related Documentation](#related-documentation)

## Overview

This guide explains how to use the Vertex AI Gemini Vision API to analyze images in the Windows Doors CA website. The Gemini Vision API allows you to send an image along with a text prompt to the model, which will then analyze the image and provide a detailed response based on the prompt.

## Prerequisites

Before using the Vertex AI image analysis functionality, ensure you have:

- Google Cloud account with Vertex AI API enabled
- Google Cloud project with billing enabled
- Google Cloud CLI installed and configured
- Environment variables set up for Vertex AI
- Required packages installed (@google/genai and @google-cloud/vertexai)

## Setup

### 1. Install Required Packages

```bash
npm install @google/genai @google-cloud/vertexai
```

### 2. Set Environment Variables

Add the following environment variables to your `.env.local` file:

```
GOOGLE_CLOUD_PROJECT=mold-removal-lead-gen
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GENAI_USE_VERTEXAI=true
```

### 3. Set Up Authentication

To authenticate with Google Cloud, set up Application Default Credentials (ADC) using the Google Cloud CLI:

```bash
gcloud auth application-default login
```

## Basic Image Analysis

The `analyzeImage` function in the `vertex-ai-client.ts` file allows you to analyze images using the Vertex AI Gemini Vision API.

### Function Signature

```typescript
async function analyzeImage(
  imageUri: string,
  prompt: string,
  model = 'gemini-2.0-flash-001'
): Promise<string>
```

### Parameters

- `imageUri`: The URI of the image to analyze (e.g., a Google Cloud Storage URI, a public URL)
- `prompt`: The text prompt to analyze the image with
- `model`: The model to use (default: 'gemini-2.0-flash-001')

### Return Value

The function returns a string containing the model's analysis of the image based on the prompt.

### Basic Example

```typescript
import { analyzeImage } from '../../Supabase/utils/vertex-ai-client';

async function analyzeProductImage() {
  try {
    const analysis = await analyzeImage(
      'gs://cloud-samples-data/generative-ai/image/scones.jpg',
      'What is shown in this image?'
    );
    console.log(analysis);
  } catch (error) {
    console.error('Error analyzing image:', error);
  }
}
```

## Advanced Usage

### Analyzing Images from Different Sources

You can analyze images from various sources by providing a valid URI:

```typescript
// Analyze an image from Google Cloud Storage
const gcsAnalysis = await analyzeImage(
  'gs://your-bucket/your-image.jpg',
  'Describe this image in detail'
);

// Analyze an image from a public URL
const urlAnalysis = await analyzeImage(
  'https://example.com/image.jpg',
  'What objects are in this image?'
);

// Analyze an image from Supabase Storage (using a signed URL)
const { data } = await supabase.storage
  .from('images')
  .createSignedUrl('product-images/window.jpg', 60);

if (data?.signedUrl) {
  const supabaseAnalysis = await analyzeImage(
    data.signedUrl,
    'Is this a double-hung window?'
  );
}
```

### Customizing Prompts for Better Results

The quality of the analysis depends significantly on the prompt you provide. Here are some tips for crafting effective prompts:

- Be specific about what you want to know
- Ask one question at a time
- Provide context if necessary
- Specify the level of detail you want

Examples:

```typescript
// General description
const generalAnalysis = await analyzeImage(
  imageUri,
  'Describe what is shown in this image.'
);

// Specific question
const specificAnalysis = await analyzeImage(
  imageUri,
  'Is this a double-hung window or a casement window?'
);

// Detailed analysis
const detailedAnalysis = await analyzeImage(
  imageUri,
  'Analyze this window image and describe its style, materials, and any visible features.'
);
```

## React Integration

To integrate image analysis into a React component, you can create a custom hook:

```typescript
import { useState } from 'react';
import { analyzeImage } from '../../Supabase/utils/vertex-ai-client';

export function useImageAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const analyzeImageWithState = async (imageUri: string, prompt: string) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeImage(imageUri, prompt);
      setAnalysis(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return {
    analyzeImage: analyzeImageWithState,
    isAnalyzing,
    analysis,
    error,
  };
}
```

Then use this hook in your component:

```tsx
import { useImageAnalysis } from '../../hooks/useImageAnalysis';

function ImageAnalysisComponent() {
  const { analyzeImage, isAnalyzing, analysis, error } = useImageAnalysis();
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  
  const handleAnalyze = async () => {
    if (!imageUrl || !prompt) return;
    
    try {
      await analyzeImage(imageUrl, prompt);
    } catch (error) {
      console.error('Failed to analyze image:', error);
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to know about this image?"
      />
      <button onClick={handleAnalyze} disabled={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
      </button>
      
      {error && <div className="error">{error.message}</div>}
      {analysis && (
        <div className="analysis">
          <h3>Analysis Result:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}
```

## Testing

A test script is available at `Supabase/scripts/test-gemini-vision.js`. This script tests the Vertex AI Gemini Vision model by analyzing a sample image.

To run the test script:

```bash
node Supabase/scripts/test-gemini-vision.js
```

The script analyzes a sample image of scones and outputs the analysis result.

## Best Practices

- **Cache Analysis Results**: Store analysis results in Supabase to avoid redundant API calls
- **Validate Input**: Ensure image URIs are valid and accessible
- **Handle Errors**: Implement proper error handling for API calls
- **Optimize Prompts**: Craft specific and clear prompts for better results
- **Respect Privacy**: Only analyze images that you have permission to use
- **Monitor Usage**: Keep track of API usage to control costs

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure you have set up Application Default Credentials correctly
2. **Access Denied**: Verify that the image URI is accessible to the Vertex AI service
3. **Invalid Image Format**: Ensure the image is in a supported format (JPEG, PNG)
4. **Model Not Available**: Verify that the model you're using is available in your region
5. **Quota Exceeded**: Check your Google Cloud console for quota usage

### Error Handling

Always wrap image analysis calls in try-catch blocks:

```typescript
try {
  const analysis = await analyzeImage(imageUri, prompt);
} catch (error) {
  console.error('Image analysis failed:', error);
  // Handle the error appropriately
}
```

## Related Documentation

- [Vertex AI Integration](../integrations/vertex-ai.md)
- [Google Generative AI SDK Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview)
- [Gemini Vision Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-multipart-prompts)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini)

## Last Updated

May 14, 2025 (Initial documentation)

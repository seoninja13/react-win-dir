# Vertex AI Integration

## Overview

The Vertex AI integration allows the Windows Doors CA website to use Google's advanced AI models for generating content, images, and analyzing media. This integration leverages the Google Generative AI SDK with Vertex AI to provide high-quality AI capabilities.

## Features

- **Text Generation**: Generate high-quality text content using Gemini models
- **Image Generation**: Generate realistic product images using Imagen models
- **Image Analysis**: Analyze images to extract information and descriptions
- **Video Analysis**: Analyze videos to extract information and descriptions
- **React Hooks**: Easy-to-use React hooks for integrating AI capabilities into components

## Prerequisites

- Google Cloud account with Vertex AI API enabled
- Google Cloud project with billing enabled
- Google Cloud CLI installed and configured
- Environment variables set up for Vertex AI

## Setup

### 1. Install Required Packages

```bash
npm install @google/genai
```

### 2. Set Environment Variables

Add the following environment variables to your `.env.local` file:

```
GOOGLE_CLOUD_PROJECT=your-google-cloud-project-id
GOOGLE_CLOUD_LOCATION=your-google-cloud-location
GOOGLE_GENAI_USE_VERTEXAI=true
```

For our project, we use:

```
GOOGLE_CLOUD_PROJECT=mold-removal-lead-gen
GOOGLE_CLOUD_LOCATION=us-west1
GOOGLE_GENAI_USE_VERTEXAI=true
```

### 3. Set Up Authentication

To authenticate with Google Cloud, you need to set up Application Default Credentials (ADC). This can be done using the Google Cloud CLI:

```bash
gcloud auth application-default login
```

This will open a browser window where you can log in to your Google Cloud account. Once you've logged in, the credentials will be saved to your local machine.

## Usage

### Vertex AI Client

The Vertex AI client is initialized in the `vertex-ai-client.ts` file. This file provides utilities for initializing and using the Vertex AI client.

```typescript
import { initializeGenAIClient, generateContent, generateImage } from '../../Supabase/utils/vertex-ai-client';

// Generate text content
const textResponse = await generateContent('Why is the sky blue?');
console.log(textResponse);

// Generate an image
const imageResponse = await generateImage('A beautiful sunset over the ocean');
console.log(imageResponse.imageUrl);
```

### Image Generation

The image generation utilities are available in the `image-generation.ts` file. These utilities provide a simple API for generating images using Vertex AI.

```typescript
import { generateImage, generateMultipleImages } from '../../Supabase/utils/image-generation';

// Generate a single image
const image = await generateImage('A modern house with large windows');
console.log(image.imageUrl);

// Generate multiple images
const images = await generateMultipleImages('A modern house with large windows', { numberOfImages: 4 });
images.forEach(image => console.log(image.imageUrl));
```

### Image Analysis

The image analysis functionality is available in the `vertex-ai-client.ts` file. This allows you to send an image to the Vertex AI Gemini Vision model along with a text prompt to analyze the image.

```typescript
import { analyzeImage } from '../../Supabase/utils/vertex-ai-client';

// Analyze an image using a Google Cloud Storage URI
const analysis = await analyzeImage(
  'gs://cloud-samples-data/generative-ai/image/scones.jpg',
  'What is shown in this image?'
);
console.log(analysis);

// You can also analyze images from other sources by providing a valid URI
// For example, a public URL or a signed URL from your own storage
```

### React Hooks

The React hooks for Vertex AI are available in the `useVertexAI.ts` file. These hooks provide a simple way to use Vertex AI in React components.

```typescript
import { useVertexAI, useProductImageGeneration } from '../../hooks/useVertexAI';

// In your component
const { generateText, generateSingleImage, isLoading, error, data } = useVertexAI();

// Generate text
const handleGenerateText = async () => {
  const response = await generateText('Why is the sky blue?');
  console.log(response);
};

// Generate an image
const handleGenerateImage = async () => {
  const response = await generateSingleImage('A beautiful sunset over the ocean');
  console.log(response.imageUrl);
};

// For product images
const { generateProductImage } = useProductImageGeneration();

const handleGenerateProductImage = async () => {
  const response = await generateProductImage(
    'Double-Hung Window',
    'A classic window design with two sashes that move up and down',
    'windows'
  );
  console.log(response.imageUrl);
};
```

## Example Component

An example component demonstrating the Vertex AI integration is available at `components/VertexAIImageGenerator.tsx`. This component allows you to generate images using Vertex AI.

To use this component, add it to a page:

```tsx
import VertexAIImageGenerator from '../../components/VertexAIImageGenerator';

export default function VertexAITestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Vertex AI Integration Test</h1>
      <VertexAIImageGenerator />
    </div>
  );
}
```

## Testing

Several test scripts are available to test different aspects of the Vertex AI integration:

### Comprehensive Test Script

The main test script is available at `Supabase/scripts/test-vertex-ai.ts`. This script tests the Vertex AI client by generating content, images, and analyzing images.

To run the test script:

```bash
npx ts-node -r dotenv/config Supabase/scripts/test-vertex-ai.ts
```

### Image Analysis Test Script

A dedicated script for testing the image analysis functionality is available at `Supabase/scripts/test-gemini-vision.js`. This script tests the Vertex AI Gemini Vision model by analyzing a sample image.

To run the image analysis test script:

```bash
node Supabase/scripts/test-gemini-vision.js
```

### Image Generation Test Script

A dedicated script for testing the image generation functionality is available at `Supabase/scripts/test-genai-image.js`. This script tests the Google GenAI SDK by generating an image and saving it locally.

To run the image generation test script:

```bash
node Supabase/scripts/test-genai-image.js
```

## Best Practices

- **Use Caching**: Store generated images and analysis results in Supabase Storage to avoid regenerating them
- **Optimize Prompts**: Fine-tune prompts for better results in both image generation and analysis
- **Handle Errors**: Implement proper error handling for API calls
- **Monitor Usage**: Keep track of API usage to control costs
- **Use React Hooks**: Use the provided React hooks for easy integration
- **Preprocess Images**: For image analysis, ensure images are in a supported format and resolution
- **Provide Clear Instructions**: When analyzing images, provide clear and specific prompts to get better results

## Troubleshooting

### Authentication Issues

If you encounter authentication issues, make sure you have set up Application Default Credentials correctly:

```bash
gcloud auth application-default login
```

### API Errors

If you encounter API errors, check the following:

- Make sure the Vertex AI API is enabled in your Google Cloud project
- Verify that your Google Cloud project has billing enabled
- Check that the environment variables are set correctly
- Ensure you have the necessary permissions to use Vertex AI

### Image Generation Issues

If you encounter issues with image generation, try the following:

- Adjust the prompt to be more specific
- Try a different model
- Check the API response for error messages

### Image Analysis Issues

If you encounter issues with image analysis, try the following:

- Ensure the image URI is accessible to the Vertex AI service
- Try a different image format (JPEG, PNG)
- Make your prompt more specific and detailed
- Check that the image doesn't violate content policies
- Verify that the model you're using supports image analysis (e.g., gemini-2.0-flash-001)

## Related Documentation

- [Google Generative AI SDK Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api)
- [Image Generation Quickstart](https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console)
- [Gemini Vision Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-multipart-prompts)
- [Google Generative AI Integration](./google-generative-ai.md)
- [Google Generative AI Guide](../guides/google-generative-ai-guide.md)
- [Vertex AI Image Analysis Guide](../guides/vertex-ai-image-analysis-guide.md)

## Last Updated

May 14, 2025 (Added image analysis documentation)

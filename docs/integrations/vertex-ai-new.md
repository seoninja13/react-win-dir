# Vertex AI Integration

## Overview

This integration enables the Windows Doors CA website to use Google's AI models
for:

- Content and image generation
- Media analysis

This integration uses the Google Generative AI SDK with Vertex AI
to provide high-quality AI capabilities.

## Implementation Rules

### Naming Conventions

#### File Naming

All Vertex AI related files must follow this pattern:

```javascript
genai-{implementation}-{model}-{functionality}-{specifics}.{ext}
```

Examples:

- `genai-vertexai-imagen3-imagegen-batch.mjs`
- `genai-directapi-gemini2-textgen-ratelimited.js`

### Rate Limiting

- **Imagen 3.0**: 50 requests per minute per project in us-west1
- **Gemini 2.0**: 60 requests per minute per project
- Always implement rate limiting with a safety margin (e.g., 45 RPM for a 50 RPM limit)

### Environment Variables

```bash
# Required for Vertex AI
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json

# For direct API access (if used)
GOOGLE_API_KEY=your-api-key
```

### Error Handling

All Vertex AI calls must include:

- Retry logic with exponential backoff
- Proper error logging
- Graceful degradation
- Input validation

## Features

- **Image Generation**: Generate high-quality product images using Gemini models
- **Batch Processing**: Generate multiple images in a single request
- **Direct REST API**: Most reliable approach for integration
- **React Hooks**: Easy-to-use React hooks for integrating AI capabilities into components

## Key Findings

- Working Model: `gemini-2.0-flash`
- Best Approach: Direct REST API instead of SDK
- API Key: Use environment variables for secure storage
- Successful Implementation: Direct REST API approach

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

For the direct REST API approach, add these environment variables:

```bash
GOOGLE_API_KEY=your-api-key-here
GEMINI_MODEL_VERSION=gemini-2.0-flash
```

For SDK-based approach (optional):

```bash
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-west1
GOOGLE_GENAI_USE_VERTEXAI=true
```

### 3. Set Up Authentication

For direct REST API approach:

- No authentication setup needed
- Use API key directly in requests

For SDK-based approach:

- Set up Application Default Credentials (ADC) using Google Cloud CLI

```bash
gcloud auth application-default login
```

This will open a browser window where you can log in to your Google Cloud account.
Once you've logged in, the credentials will be saved to your local machine.

## Usage

### Vertex AI Client

The Vertex AI client is initialized in the `vertex-ai-client.ts` file.
This file provides utilities for initializing and using the Vertex AI client.

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

The image generation utilities are available in the `image-generation.ts` file.
These utilities provide a simple API for generating images using Vertex AI.

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

The image analysis functionality is available in the `vertex-ai-client.ts` file.
This allows you to send an image to the Vertex AI Gemini Vision model along with a text prompt
to analyze the image.

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

The React hooks for Vertex AI are available in the `useVertexAI.ts` file.
These hooks provide a simple way to use Vertex AI in React components.

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

An example component demonstrating the Vertex AI integration is available at
`components/VertexAIImageGenerator.tsx`. This component allows you to generate
images using Vertex AI.

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

### Test Suite for Vertex AI Connection Approaches

A comprehensive test suite is available at `tests/vertex-ai-approaches/` that demonstrates
different ways to connect to Vertex AI:

#### Test Cases

1. **REST API - Text Generation**
   - Uses direct REST API with API key
   - File: `test-rest-text.js`

2. **REST API - Image Generation**
   - Uses direct REST API with API key
   - File: `test-rest-image.js`

3. **Service Account - Text Generation**
   - Uses Vertex AI SDK with service account
   - File: `test-service-account-text.js`

4. **Service Account - Image Generation**
   - Uses Vertex AI SDK with service account
   - File: `test-service-account-image.js`

#### Running the Tests

1. Navigate to the test directory:

   ```bash
   cd tests/vertex-ai-approaches
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your credentials:

   ```env
   # For REST API tests
   GOOGLE_API_KEY=your-api-key
   
   # For Service Account tests
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
   GOOGLE_CLOUD_PROJECT=your-project-id
   GOOGLE_CLOUD_LOCATION=us-central1
   ```

4. Run the tests:

   ```bash
   # Run all tests
   npm run test:all
   
   # Or run individual tests
   npm run test:rest-text
   npm run test:rest-image
   npm run test:service-account-text
   npm run test:service-account-image
   ```

### Comprehensive Test Script

The main test script is available at `Supabase/scripts/test-vertex-ai.ts`.
This script tests the Vertex AI client by generating content, images, and analyzing images.

To run the test script:

```bash
npx ts-node -r dotenv/config Supabase/scripts/test-vertex-ai.ts
```

### Image Analysis Test Script

A dedicated script for testing the image analysis functionality is available at
`Supabase/scripts/test-gemini-vision.js`. This script tests the Vertex AI Gemini
Vision model by analyzing a sample image.

To run the image analysis test script:

```bash
node Supabase/scripts/test-gemini-vision.js
```

### Image Generation Test Script

A dedicated script for testing the image generation functionality is available at
`Supabase/scripts/test-genai-image.js`. This script tests the Google GenAI SDK
by generating an image and saving it locally.

To run the image generation test script:

```bash
node Supabase/scripts/test-genai-image.js
```

## Best Practices

- **Use Caching**: Store generated images and analysis results in Supabase Storage
- **Optimize Prompts**: Fine-tune prompts for better results
- **Handle Errors**: Implement proper error handling for API calls
- **Monitor Usage**: Keep track of API usage to control costs
- **Use React Hooks**: Use the provided React hooks for easy integration
- **Preprocess Images**: Ensure images are in a supported format and resolution
- **Provide Clear Instructions**: When analyzing images, provide clear prompts

## Troubleshooting

### Authentication Issues

If you encounter authentication issues, make sure you have set up Application
Default Credentials correctly:

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
- Verify that the model you're using supports image analysis

## Related Documentation

- [Google Generative AI SDK Documentation](
  https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
  )
- [Vertex AI Documentation](
  https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
  )
- [Image Generation Quickstart](
  https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console
  )
- [Gemini Vision Documentation](
  https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-multipart-prompts
  )
- [Google Generative AI Integration](./google-generative-ai.md)
- [Google Generative AI Guide](
  ../guides/google-generative-ai-guide.md)
- [Vertex AI Image Analysis Guide](../guides/vertex-ai-image-analysis-guide.md)

## Last Updated

May 16, 2025 (Fixed markdown linting issues and improved documentation
formatting)

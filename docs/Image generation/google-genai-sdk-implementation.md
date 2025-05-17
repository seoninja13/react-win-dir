# Google GenAI SDK Implementation

This document details the implementation and testing of the new `@google/genai` SDK for image generation in the Windows Doors CA website project.

## Overview

As part of our Google Generative AI integration priority, we've explored using the new unified `@google/genai` SDK which provides a consistent interface for both Google AI Studio and Vertex AI implementations of the Gemini API.

## SDK Comparison

### New @google/genai SDK

The new SDK offers several advantages over the previous implementation:

1. **Unified API**: Single interface for both Google AI Studio and Vertex AI
2. **Simplified Authentication**: Clearer authentication methods for both APIs
3. **Improved Error Handling**: More consistent error patterns
4. **Enhanced TypeScript Support**: Better type definitions and IDE integration
5. **Additional Features**: Built-in streaming, function calling, and caching

### Authentication Methods

The SDK supports two primary authentication methods:

#### 1. Google AI Studio API (Development)

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: 'GEMINI_API_KEY', // From Google AI Studio
});
```

#### 2. Vertex AI (Production)

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: true,
  project: 'your-project-id',
  location: 'your-location',
});
```

## Implementation Testing

We've created several test scripts to evaluate the SDK's functionality and authentication methods:

### 1. Basic SDK Test

File: `scripts/test-new-sdk.js`
- Tests basic SDK initialization and text generation
- Verifies environment variable configuration
- Includes comprehensive error handling

### 2. Vertex AI Text Generation Test

File: `scripts/test-vertex-text.js`
- Tests Vertex AI connectivity with multiple regions and models
- Implements fallback mechanisms for different configurations
- Includes detailed error categorization and troubleshooting steps

### 3. Service Account Authentication Test

File: `scripts/vertex-ai-service-account-auth-test.js`
- Tests Vertex AI connectivity using service account authentication
- Tries multiple regions and models to find a working configuration
- Provides detailed diagnostics and error information

## Authentication Challenges

During testing, we encountered several authentication challenges:

1. **API Key Issues**: The Google AI Studio API key returned 401 Unauthorized errors
2. **Quota Limitations**: Vertex AI image generation hit quota limits with error: "Quota exceeded for aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model"
3. **Model Availability**: Some models weren't available in certain regions

## Recommended Implementation Approach

Based on our testing, we recommend the following approach:

### For Development

Use the Google AI Studio API with a new API key:

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate text
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-001',
  contents: prompt,
});
```

### For Production

Use Vertex AI with proper authentication and rate limiting:

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION,
});

// Generate image with rate limiting
await rateLimit(); // Implement conservative rate limiting
const response = await ai.models.generateContent({
  model: 'imagen-3.0-fast-generate-001',
  contents: [{
    role: 'user',
    parts: [{ text: prompt }]
  }],
});
```

## Next Steps

1. **Generate New API Key**: Create a new API key from Google AI Studio
2. **Update Environment Variables**: Add the new key to `.env.local`
3. **Implement Rate Limiting**: Add conservative rate limiting for Vertex AI
4. **Request Quota Increase**: If needed, request a quota increase for production use
5. **Integrate with Batch Processing**: Connect the new SDK with the existing batch processing system

## Error Handling Best Practices

Based on our testing, we've developed comprehensive error handling patterns:

### API Key Issues
- Verify API key format and validity
- Check for whitespace or formatting issues
- Generate a new key if necessary

### Model Initialization Errors
- Verify model name and availability in the region
- Try alternative models or regions
- Check service account permissions

### Rate Limiting Errors
- Implement exponential backoff
- Use conservative request rates (well below the 50/min quota)
- Monitor usage in Google Cloud Console

## Documentation Standards

All code implementing the new SDK should follow these documentation standards:

1. **Proper Heading Hierarchy**: Use consistent markdown headings
2. **Consistent List Formatting**: Use bullet points for lists
3. **Code Block Formatting**: Include language specification in code blocks
4. **Error Message Patterns**: Document common error patterns and solutions

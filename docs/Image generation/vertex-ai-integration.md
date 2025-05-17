# Vertex AI Integration for Image Generation

This document outlines different approaches for connecting to Google Cloud's Vertex AI for image generation in the Windows Doors CA website project.

## Project Priority: Google Generative AI Integration

As outlined in the project priorities, the Google Generative AI integration is a key focus for the Windows Doors CA website. This integration involves:

1. Processing CSV data from Window World LA website
2. Generating images using Google Cloud's Vertex AI
3. Implementing batch processing functionality
4. Integrating generated images into the website

This document focuses on item #2: generating images using Google Cloud's Vertex AI.

## 1. Using Existing Gen-AI SDK (Recommended)

The project already has authentication set up with the Google Gen-AI SDK. This is the recommended approach as it leverages existing configuration and authentication.

### Implementation

File: `vertex-genai-test.js`

```javascript
import { initializeVertexAIClient, generateMultipleImages } from '../utils/vertex-ai-client.js';

// Generate images using the existing client
const images = await generateMultipleImages(prompt, {
  numberOfImages: 1,
  aspectRatio: '4:3',
  model: 'imagen-3.0-generate-002'
});
```

### Usage

```bash
node scripts/vertex-genai-test.js
```

### Advantages

- Uses existing authentication and configuration
- Consistent with the rest of the project
- Handles error cases and response parsing
- Already integrated with the project's logging system

## 2. REST API Implementation

This approach uses the Vertex AI REST API directly with node-fetch.

### Implementation

File: `vertex-rest-api.js`

```javascript
// Construct the API URL
const apiUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict`;

// Make the API request
const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  body: JSON.stringify(payload)
});
```

### Usage

```bash
node scripts/vertex-rest-api.js
```

### Advantages

- Direct control over API requests
- Follows the official Vertex AI REST API documentation
- Useful for debugging API-specific issues

## 3. Python SDK Implementation

This approach uses the official Vertex AI Python SDK.

### Implementation

File: `vertex-python-api.py`

```python
from vertexai.preview.generative_models import GenerativeModel

# Initialize the generative model
model = GenerativeModel(MODEL_VERSION)

# Generate images
response = model.generate_images(
    prompt=prompt,
    number_of_images=number_of_images,
    aspect_ratio=aspect_ratio
)
```

### Usage

```bash
python scripts/vertex-python-api.py
```

### Advantages

- Uses the official Python SDK
- Comprehensive error handling and type checking
- Access to advanced Python-specific features

## 4. Curl Implementation

This approach uses curl commands to interact with the API directly.

### Implementation

File: `vertex-curl-api.sh`

```bash
curl -X POST \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  "${API_URL}" \
  -d @"${PAYLOAD_FILE}" \
  -o "${RESPONSE_FILE}"
```

### Usage

```bash
bash scripts/vertex-curl-api.sh
```

### Advantages

- No dependencies required
- Useful for quick testing and debugging
- Can be used in CI/CD pipelines

## Authentication Methods

Vertex AI supports multiple authentication methods. The project is currently set up with:

1. **OAuth 2.0 Authentication**
   - Client ID: 994200435445-tq3hmqo1he917bmpq2iuftnshhn1r7lm.apps.googleusercontent.com
   - Project: LeadGen (created March 2, 2025)
   - Type: Desktop application

2. **API Key Authentication**
   - API Key stored in the `GEMINI_API_KEY` environment variable

## Environment Configuration

All implementations use the following environment variables from `.env.local`:

- `GOOGLE_CLOUD_PROJECT`: Your Google Cloud project ID (mold-removal-lead-gen)
- `GOOGLE_CLOUD_LOCATION`: Your Google Cloud region (us-west1)
- `GEMINI_API_KEY`: Your API key for authentication
- `GOOGLE_GENAI_USE_VERTEXAI`: Set to 'true' to use Vertex AI

## Image Generation Parameters

The following parameters can be customized for image generation:

- `prompt`: The text prompt for image generation
- `numberOfImages`/`sampleCount`: Number of images to generate (1-4)
- `aspectRatio`: Aspect ratio of the images ('1:1', '9:16', '16:9', '3:4', or '4:3')
- `model`: Model version to use (default: 'imagen-3.0-generate-002')
- `addWatermark`: Whether to add a watermark to the generated images
- `enhancePrompt`: Whether to use LLM-based prompt enhancement

## Output

All implementations save the generated images to the `Docs/Image generation/test-output` directory.

## Integration with CSV Processing

The image generation functionality is part of a larger workflow:

1. **CSV Processing**: Extract image information from Window World LA website
2. **Image Generation**: Generate new images using Vertex AI
3. **Batch Processing**: Process multiple images efficiently
4. **Website Integration**: Display generated images on the Windows Doors CA website

## Troubleshooting

If you encounter issues with image generation:

1. Check that all required environment variables are set correctly
2. Verify that the authentication credentials have the necessary permissions
3. Check the Google Cloud console for API quotas and limits
4. Review the error messages in the console output
5. Check the Supabase logs table for detailed error information
6. Ensure the model version (imagen-3.0-generate-002) is available in your region

## References

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Imagen API Reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api)
- [REST API Reference](https://cloud.google.com/vertex-ai/docs/reference/rest)

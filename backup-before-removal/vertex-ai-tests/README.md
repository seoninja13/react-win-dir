# Vertex AI Connectivity Testing

This directory contains multiple approaches to test connectivity with Google's Vertex AI and Generative AI services. Each approach is kept in its own folder to allow for systematic testing and comparison.

## Approaches Overview

### Approach 1: Google GenAI SDK
- **File**: `approach-1-genai-sdk/test.mjs`
- **Description**: Uses the `@google/genai` SDK with ES modules
- **Model**: gemini-2.5-pro-preview-05-06
- **Authentication**: Vertex AI with project and location

### Approach 2: Vertex AI SDK
- **File**: `approach-2-vertex-sdk/test.cjs`
- **Description**: Uses the official `@google-cloud/vertexai` SDK with CommonJS
- **Model**: gemini-1.0-pro
- **Authentication**: Application Default Credentials

### Approach 3: REST API
- **File**: `approach-3-rest-api/test.cjs`
- **Description**: Makes direct REST API calls to Vertex AI
- **Model**: gemini-1.0-pro
- **Authentication**: Access token from gcloud CLI

### Approach 4: Direct API Key
- **File**: `approach-4-direct-api/test.cjs`
- **Description**: Uses direct API calls with an API key
- **Model**: gemini-1.0-pro
- **Authentication**: API key

## How to Test

To test each approach, navigate to the project root directory and run:

```bash
# Approach 1
node vertex-ai-tests/approach-1-genai-sdk/test.mjs

# Approach 2
node vertex-ai-tests/approach-2-vertex-sdk/test.cjs

# Approach 3
node vertex-ai-tests/approach-3-rest-api/test.cjs

# Approach 4
node vertex-ai-tests/approach-4-direct-api/test.cjs
```

## Comparison Results

After testing each approach, here are the results:

| Approach | Status | Notes |
|----------|--------|-------|
| 1 - GenAI SDK | ❌ Failed | Error with the SDK initialization. May require additional configuration. |
| 2 - Vertex SDK | ❌ Failed | 404 error: Model not found. The API may need to be enabled or the model isn't available in the region. |
| 3 - REST API | ❌ Failed | 404 error: Similar to Approach 2, suggesting the model isn't available or the API isn't properly enabled. |
| 4 - Direct API | ⚠️ Partial Success | Successfully listed 50 available models using the API key, but failed to generate text with a 404 error for the specific model. |

## Key Findings

1. **API Key Access Works**: Approach 4 successfully connected to the Google AI API and listed 50 available models, which indicates that your API key is valid.

2. **Model Availability Issue**: All approaches failed when trying to access specific models. This suggests that:
   - The models you're trying to use may not be available in your project or region
   - The Vertex AI API may need to be explicitly enabled
   - You may need to request access to specific models

3. **Next Steps**:
   - Enable the Vertex AI API: `gcloud services enable aiplatform.googleapis.com`
   - Try using one of the models that was successfully listed in Approach 4
   - Consider requesting access to the specific models you need
   - Check quota limits for the models you're trying to use

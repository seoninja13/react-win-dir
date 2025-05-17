# Vertex AI Imagen API Implementation Plan

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Image Generation](./index.md) > Vertex AI Imagen Implementation Plan

## Table of Contents

1. [Overview](#overview)
2. [Objectives](#objectives)
3. [Prerequisites](#prerequisites)
4. [Implementation Approaches](#implementation-approaches)
5. [Authentication Methods](#authentication-methods)
6. [Rate Limiting Strategy](#rate-limiting-strategy)
7. [Error Handling Framework](#error-handling-framework)
8. [Implementation Structure](#implementation-structure)
9. [Testing Strategy](#testing-strategy)
10. [Integration Plan](#integration-plan)
11. [Performance Considerations](#performance-considerations)
12. [Documentation Standards](#documentation-standards)
13. [Risk Management](#risk-management)
14. [Success Metrics](#success-metrics)

## Overview

This implementation plan outlines the strategy for integrating Google Cloud's Vertex AI Imagen API into the Windows Doors CA website. The plan includes two authentication approaches (Service Account and Application Default Credentials) and focuses on implementing proper rate limiting, error handling, and batch processing capabilities.

## Objectives

1. Create a robust implementation of the Vertex AI Imagen API for image generation
2. Implement both Service Account and ADC authentication methods for flexibility
3. Ensure proper rate limiting to stay within the 50 RPM quota for us-west1 region
4. Develop comprehensive error handling and retry mechanisms
5. Support batch processing for efficient image generation
6. Provide clear documentation and examples for future reference

## Prerequisites

- Access to Google Cloud Platform with Vertex AI enabled
- Google Cloud project: `mold-removal-lead-gen`
- Location: `us-west1` (for Imagen 3.0)
- Service Account with appropriate permissions
- Application Default Credentials configured
- Imagen 3.0 model access
- Environment variables properly configured

## Implementation Approaches

### Service Account Authentication Approach

1. **Script Name**: `genai-vertexai-imagen3-imagegen-serviceaccount.mjs`
2. **Authentication Method**: Explicit service account credentials from JSON file
3. **Key Components**:
   - Import Google Generative AI SDK
   - Load service account credentials from a JSON file
   - Initialize the client with service account authentication
   - Implement rate-limited image generation with exponential backoff
   - Include proper error handling and logging
   - Support batch processing with configurable parameters

### ADC Authentication Approach

1. **Script Name**: `genai-vertexai-imagen3-imagegen-adc.mjs`
2. **Authentication Method**: Application Default Credentials
3. **Key Components**:
   - Import Google Generative AI SDK
   - Initialize the client with ADC authentication
   - Implement rate-limited image generation with exponential backoff
   - Include proper error handling and logging
   - Support batch processing with configurable parameters

## Authentication Methods

### Service Account Authentication

```javascript
import { GoogleGenerativeAI } from '@google/genai';
import fs from 'fs/promises';

// Load service account credentials
const credentials = JSON.parse(
  await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
);

// Initialize client with service account
const genAI = new GoogleGenerativeAI({
  projectId: credentials.project_id,
  location: 'us-west1',
  serviceAccountKey: credentials
});
```

### ADC Authentication

```javascript
import { GoogleGenerativeAI } from '@google/genai';

// Initialize client with ADC
const genAI = new GoogleGenerativeAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: 'us-west1'
});
```

## Rate Limiting Strategy

To comply with the Vertex AI quota of 50 requests per minute for Imagen 3.0 in us-west1:

1. **Token Bucket Implementation**:
   - Implement a token bucket algorithm with 45 tokens per minute (safety margin)
   - Refill rate of 0.75 tokens per second
   - Maximum bucket size of 45 tokens

2. **Queue Management**:
   - Implement a request queue for batch processing
   - Process queue based on available tokens
   - Provide status updates for queued requests

3. **Monitoring**:
   - Track request rates and quota usage
   - Log warnings when approaching quota limits
   - Implement adaptive rate limiting based on error responses

## Error Handling Framework

Following the documentation structure improvements, our error handling will include:

### Error Categories

1. **Authentication Errors**:
   - Invalid credentials
   - Expired tokens
   - Insufficient permissions

2. **Rate Limiting Errors**:
   - Quota exceeded
   - Resource exhaustion
   - Temporary capacity issues

3. **Model Errors**:
   - Invalid model parameters
   - Content policy violations
   - Model availability issues

4. **Network Errors**:
   - Connection timeouts
   - DNS resolution failures
   - API endpoint issues

### Retry Strategy

```javascript
async function withRetry(fn, options = {}) {
  const {
    maxRetries = 5,
    initialDelay = 1000,
    maxDelay = 60000,
    factor = 2,
    retryableStatusCodes = [408, 429, 500, 502, 503, 504]
  } = options;

  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      const statusCode = error.status || error.statusCode || 0;
      const isRetryable = retryableStatusCodes.includes(statusCode);
      
      if (!isRetryable || retries >= maxRetries) {
        throw error;
      }

      console.warn(`Retry ${retries + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      retries++;
      delay = Math.min(delay * factor, maxDelay);
    }
  }
}
```

## Implementation Structure

Both scripts will follow this structure:

### 1. Configuration Section

```javascript
// Environment variables and constants
const MODEL_NAME = 'imagen-3.0-generate-002';
const REGION = 'us-west1';
const MAX_RPM = 45; // Safety margin below 50 RPM quota

// Rate limiting parameters
const TOKEN_REFILL_RATE = 0.75; // tokens per second
const MAX_TOKENS = 45;
```

### 2. Authentication Setup

As detailed in the Authentication Methods section.

### 3. Helper Functions

```javascript
// Rate limiting implementation
class RateLimiter {
  constructor(tokensPerSecond, maxTokens) {
    this.tokensPerSecond = tokensPerSecond;
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  async getToken() {
    this.refillTokens();
    
    if (this.tokens < 1) {
      const waitTime = (1 / this.tokensPerSecond) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.refillTokens();
    }
    
    this.tokens -= 1;
    return true;
  }

  refillTokens() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const newTokens = timePassed * this.tokensPerSecond;
    
    this.tokens = Math.min(this.tokens + newTokens, this.maxTokens);
    this.lastRefill = now;
  }
}
```

### 4. Core Image Generation Functions

```javascript
/**
 * Generates a single image using Vertex AI Imagen
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} The generated image data
 */
async function generateImage(prompt, options = {}) {
  const {
    aspectRatio = '1:1',
    model = MODEL_NAME,
  } = options;

  await rateLimiter.getToken();
  
  return withRetry(async () => {
    const genModel = genAI.getGenerativeModel({ model });
    
    const result = await genModel.generateImages({
      prompt,
      aspectRatio,
      responseFormat: 'b64_json'
    });
    
    return {
      imageData: result.images[0].data,
      prompt,
      timestamp: new Date().toISOString(),
      model
    };
  });
}
```

## Testing Strategy

We'll create separate test files for each implementation:

### 1. Service Account Test

```javascript
import { generateImage, generateBatchImages } from './genai-vertexai-imagen3-imagegen-serviceaccount.mjs';

async function runTests() {
  try {
    console.log('Testing single image generation...');
    const singleResult = await generateImage(
      'A modern double-hung window with white frame against a blue sky'
    );
    console.log('Single image generated successfully');
    
    console.log('Testing batch image generation...');
    const batchResults = await generateBatchImages([
      'A classic entry door with sidelights',
      'A contemporary sliding patio door with energy-efficient glass'
    ]);
    console.log(`Generated ${batchResults.length} images successfully`);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests();
```

### 2. ADC Test

Similar structure to the Service Account test, but importing from the ADC implementation.

## Integration Plan

To integrate these implementations with the existing image generation workflow:

1. **Create Adapter Functions**:
   - Develop adapter functions to make the new implementations compatible with existing code
   - Ensure consistent return formats for both implementations

2. **Fallback Mechanism**:
   - Implement fallback between authentication methods if one fails
   - Create a unified interface that tries both methods sequentially

3. **Monitoring Integration**:
   - Add logging for all API calls
   - Track success rates and performance metrics
   - Implement alerting for quota issues

## Performance Considerations

1. **Batch Processing Optimization**:
   - Group requests to maximize throughput while respecting rate limits
   - Implement parallel processing where appropriate
   - Use adaptive batch sizes based on system performance

2. **Caching Strategy**:
   - Cache generated images to avoid redundant generation
   - Implement a fingerprinting system for prompts to detect duplicates
   - Store generation parameters with images for reproducibility

3. **Resource Management**:
   - Monitor memory usage during batch operations
   - Implement graceful degradation under high load
   - Optimize network connection handling

## Documentation Standards

Following our documentation structure improvements, we will include:

1. **Error Handling Section**:
   - Comprehensive error patterns
   - Troubleshooting steps
   - Solutions and workarounds
   - Best practices

2. **Code Examples**:
   - Proper code blocks with language specification
   - Error handling examples
   - Validation examples
   - Monitoring examples

3. **Best Practices**:
   - Error handling guidelines
   - Dependency management practices
   - Testing recommendations

## Risk Management

### Potential Risks

1. **Authentication Failures**:
   - **Mitigation**: Implement credential validation before operations
   - **Contingency**: Automatic fallback between authentication methods

2. **Rate Limiting Issues**:
   - **Mitigation**: Conservative rate limiting with safety margin
   - **Contingency**: Adaptive throttling based on error responses

3. **Model Availability**:
   - **Mitigation**: Regular health checks of the API
   - **Contingency**: Fallback to alternative models or cached images

4. **Cost Management**:
   - **Mitigation**: Implement usage tracking and budgeting
   - **Contingency**: Automatic shutdown when approaching budget limits

## Success Metrics

1. **Reliability**:
   - Success rate > 99% for image generation requests
   - Zero quota violation incidents

2. **Performance**:
   - Average response time < 5 seconds per image
   - Batch processing efficiency > 90% of theoretical maximum

3. **Integration**:
   - Seamless compatibility with existing image workflows
   - Zero regression in existing functionality

4. **Documentation**:
   - Complete coverage of all functions and error scenarios
   - Clear examples for all common use cases

## Last Updated

May 16, 2025 (Initial implementation plan)

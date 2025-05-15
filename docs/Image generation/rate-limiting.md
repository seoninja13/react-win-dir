# Rate Limiting Implementation

This document provides guidance on implementing rate limiting for the Google Generative AI integration to avoid quota issues with the Vertex AI API.

## Overview

The Vertex AI API has quota limits that restrict the number of requests that can be made within a specific time period. Implementing rate limiting helps ensure that our image generation process stays within these limits and avoids quota exceeded errors.

## Quota Limits

The Vertex AI API has the following quota limits for image generation:

- **Requests per minute**: Limited number of requests allowed per minute
- **Requests per day**: Limited number of requests allowed per day
- **Concurrent requests**: Limited number of requests that can be processed simultaneously

These limits vary based on your Google Cloud project and can be viewed and adjusted in the Google Cloud Console under IAM & Admin > Quotas & System Limits.

## Rate Limiting Strategies

### 1. Fixed Window Rate Limiting

This strategy limits the number of requests within a fixed time window.

```typescript
class FixedWindowRateLimiter {
  private requestCount: number = 0;
  private windowStart: number = Date.now();
  private readonly windowSize: number; // in milliseconds
  private readonly maxRequests: number;

  constructor(maxRequests: number, windowSizeInSeconds: number) {
    this.maxRequests = maxRequests;
    this.windowSize = windowSizeInSeconds * 1000;
  }

  async acquirePermission(): Promise<boolean> {
    const now = Date.now();
    
    // Reset window if needed
    if (now - this.windowStart > this.windowSize) {
      this.windowStart = now;
      this.requestCount = 0;
    }
    
    // Check if we can make another request
    if (this.requestCount < this.maxRequests) {
      this.requestCount++;
      return true;
    }
    
    // Wait until the window resets
    const timeToWait = this.windowSize - (now - this.windowStart);
    await new Promise(resolve => setTimeout(resolve, timeToWait));
    
    // Reset window and count
    this.windowStart = Date.now();
    this.requestCount = 1;
    
    return true;
  }
}
```

### 2. Token Bucket Rate Limiting

This strategy uses a token bucket that refills at a constant rate.

```typescript
class TokenBucketRateLimiter {
  private tokens: number;
  private lastRefillTimestamp: number;
  private readonly maxTokens: number;
  private readonly refillRate: number; // tokens per second

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefillTimestamp = Date.now();
  }

  async acquirePermission(): Promise<boolean> {
    // Refill tokens based on elapsed time
    this.refill();
    
    // Check if we have enough tokens
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    
    // Wait for enough tokens
    const timeToWait = (1 - this.tokens) / this.refillRate * 1000;
    await new Promise(resolve => setTimeout(resolve, timeToWait));
    
    // Refill and consume token
    this.refill();
    this.tokens -= 1;
    
    return true;
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    const newTokens = elapsedSeconds * this.refillRate;
    
    this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
    this.lastRefillTimestamp = now;
  }
}
```

## Implementation in Batch Processing

Here's how to integrate rate limiting into our batch processing:

```typescript
import { TokenBucketRateLimiter } from '../utils/rate-limiter';
import { processCsvFile } from '../utils/batch-image-generation';

async function processWithRateLimiting(csvFilePath: string) {
  // Create rate limiter (5 requests per minute)
  const rateLimiter = new TokenBucketRateLimiter(5, 5/60);
  
  // Override the generateImage function to use rate limiting
  const originalGenerateImage = require('../utils/image-generation').generateImage;
  const generateImageWithRateLimiting = async (prompt: string, options = {}) => {
    // Acquire permission before making the request
    await rateLimiter.acquirePermission();
    
    // Make the request
    return originalGenerateImage(prompt, options);
  };
  
  // Replace the original function with the rate-limited version
  require('../utils/image-generation').generateImage = generateImageWithRateLimiting;
  
  // Process the CSV file
  return processCsvFile(csvFilePath);
}
```

## Exponential Backoff

In addition to rate limiting, implementing exponential backoff for retrying failed requests can help handle temporary quota issues:

```typescript
async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 5,
  initialDelayMs: number = 1000
): Promise<T> {
  let retries = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (retries >= maxRetries || !isRetryableError(error)) {
        throw error;
      }
      
      const delayMs = initialDelayMs * Math.pow(2, retries);
      const jitter = Math.random() * 100;
      
      console.log(`Retrying after ${delayMs + jitter}ms (attempt ${retries + 1}/${maxRetries})...`);
      
      await new Promise(resolve => setTimeout(resolve, delayMs + jitter));
      retries++;
    }
  }
}

function isRetryableError(error: any): boolean {
  // Check if the error is related to quota or rate limiting
  return error.code === 429 || // Too Many Requests
         error.code === 503 || // Service Unavailable
         error.message?.includes('quota') ||
         error.message?.includes('rate limit');
}
```

## Monitoring Rate Limits

To monitor rate limits and adjust your implementation accordingly:

1. **Google Cloud Console**: Check the Quotas & System Limits page regularly
2. **Logging**: Implement logging to track request rates and quota usage
3. **Alerts**: Set up alerts for when quota usage approaches limits

## Best Practices

1. **Batch Processing**: Process images in small batches with delays between batches
2. **Prioritization**: Prioritize critical image generation tasks
3. **Caching**: Cache generated images to avoid regenerating the same content
4. **Quota Increase**: Request quota increases well before you need them
5. **Fallback Mechanism**: Implement fallback mechanisms for when quota is exceeded

## Conclusion

Implementing rate limiting is essential for ensuring reliable operation of the image generation process. By using the strategies outlined in this document, you can avoid quota exceeded errors and ensure that your application stays within the limits imposed by the Vertex AI API.

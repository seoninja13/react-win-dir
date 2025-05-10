# API Integration Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > API Integration Guide

## Overview

This document details the integration of external APIs in the Water Damage CA website, focusing on cost optimization, error handling, and best practices.

## Google Places API Integration

### Configuration

```typescript
interface PlacesApiConfig {
  apiKey: string;
  maxResultsPerQuery: number;
  cacheDuration: number;
  fieldMask: string[];
}

const defaultConfig: PlacesApiConfig = {
  apiKey: process.env.GOOGLE_PLACES_API_KEY,
  maxResultsPerQuery: 20,
  cacheDuration: 180 * 24 * 60 * 60 * 1000, // 180 days
  fieldMask: ['displayName', 'formattedAddress', 'editorialSummary']
};
```

### Cost Optimization

1. **Field Masks**
   - Use minimal field sets
   - Request only required data
   - Avoid expensive fields unless necessary

2. **Caching Strategy**
   - 6-month file-based caching
   - Cache invalidation on updates
   - Automatic cleanup of stale data

3. **Request Batching**
   - Group requests by city/service
   - Process in off-peak hours
   - Implement rate limiting

### Error Handling

```typescript
class PlacesApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly retryable: boolean
  ) {
    super(message);
    this.name = 'PlacesApiError';
  }
}

async function handlePlacesApiError(error: PlacesApiError): Promise<void> {
  if (error.retryable) {
    await exponentialBackoff();
    // Retry the request
  } else {
    // Log error and use fallback data
    console.error(`Places API Error: ${error.message}`);
  }
}
```

## MCP Server Integration

### Available Endpoints

1. **Google Maps**
   - Directions
   - Distance Matrix
   - Geocoding
   - Place Details
   - Places Search

2. **OpenAI**
   - Chat Completion
   - Content Generation

3. **Search**
   - Perplexity Search
   - Web Content Retrieval

### Usage Examples

```typescript
// Google Maps Directions
const getDirections = async (origin: string, destination: string) => {
  const response = await mcp0_maps_directions({
    origin,
    destination,
    mode: 'driving'
  });
  return response;
};

// OpenAI Chat
const generateContent = async (prompt: string) => {
  const response = await mcp1_openai_chat({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  });
  return response;
};

// Perplexity Search
const searchWeb = async (query: string) => {
  const response = await mcp2_search({
    query,
    search_recency_filter: 'month'
  });
  return response;
};
```

### Rate Limiting

1. **Google Maps**
   - 10,000 requests/day for Text Search
   - 100,000 requests/day for Place Details
   - Implement exponential backoff

2. **OpenAI**
   - Monitor token usage
   - Implement request queuing
   - Cache responses where possible

3. **Perplexity**
   - Implement request throttling
   - Cache search results
   - Monitor usage patterns

## Implementation Best Practices

### Error Recovery

```typescript
const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
  
  throw lastError;
};
```

### Request Optimization

```typescript
const batchApiCalls = async <T>(
  items: any[],
  apiCall: (item: any) => Promise<T>,
  batchSize = 3
): Promise<T[]> => {
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => withRetry(() => apiCall(item)))
    );
    results.push(...batchResults);
    
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
};
```

### Response Validation

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: number;
}

const validateApiResponse = <T>(
  response: ApiResponse<T>,
  schema: any
): boolean => {
  try {
    return schema.validate(response.data);
  } catch (error) {
    console.error('Response validation failed:', error);
    return false;
  }
};
```

## Monitoring and Logging

### API Metrics

1. **Request Tracking**
   - Request counts
   - Error rates
   - Response times
   - Cache hit rates

2. **Cost Monitoring**
   - Daily API usage
   - Cost per request type
   - Budget alerts

3. **Performance Analysis**
   - Response time trends
   - Error patterns
   - Cache effectiveness

## Security Considerations

### API Key Management

1. **Key Storage**
   - Store keys in environment variables
   - Rotate keys regularly
   - Implement key restrictions

2. **Authentication**
   - Use secure headers
   - Validate all responses
   - Implement rate limiting

3. **Data Protection**
   - Encrypt sensitive data
   - Implement access controls
   - Regular security audits

## Related Documentation

- [Google Places Integration](./google-places.md)
- [OpenRouter Integration](./openrouter.md)
- [Perplexity Integration](./perplexity.md)
- [Brave Search Integration](./brave-search.md)
- [Batch Processing](../processes/batch-processing.md)

Last Updated: April 22, 2025

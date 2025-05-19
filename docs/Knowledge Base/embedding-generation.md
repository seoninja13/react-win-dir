# Embedding Generation with Gemini 2.0 Flash

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Knowledge Base](./index.md) > Embedding Generation

## Table of Contents

1. [Overview](#overview)
2. [Gemini 2.0 Flash Embeddings](#gemini-20-flash-embeddings)
3. [Implementation Details](#implementation-details)
4. [API Integration](#api-integration)
5. [Rate Limiting](#rate-limiting)
6. [Error Handling](#error-handling)
7. [Performance Considerations](#performance-considerations)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Overview

Embedding generation is a crucial component of the knowledge base system, converting text chunks into vector representations that can be efficiently stored and queried. This document explains how the system uses Google's Gemini 2.0 Flash model to generate high-quality embeddings for semantic search.

### What Are Embeddings?

Embeddings are numerical representations of text that capture semantic meaning. Similar texts will have similar embedding vectors, allowing for semantic search based on vector similarity rather than keyword matching.

### Why Gemini 2.0 Flash?

Gemini 2.0 Flash provides high-quality embeddings with several advantages:

- **Semantic Understanding**: Captures nuanced meanings and relationships
- **Contextual Awareness**: Understands content in context
- **Multilingual Support**: Works across multiple languages
- **Efficiency**: Optimized for fast processing
- **Dimensionality**: 768-dimensional vectors balance precision and storage efficiency

## Gemini 2.0 Flash Embeddings

### Technical Specifications

- **Model Name**: `embedding-001`
- **Vector Dimension**: 768
- **Normalization**: Vectors are L2-normalized
- **API Access**: Via Google Generative AI SDK

### Embedding Properties

- **Cosine Similarity**: Embeddings are designed for cosine similarity comparison
- **Contextual**: Captures the meaning of text in context
- **Domain Adaptability**: Works well across various domains and content types

## Implementation Details

The embedding generation implementation is found in `scripts/knowledge-base-embeddings-gemini.mjs` and consists of the `EmbeddingGenerator` class:

```javascript
class EmbeddingGenerator {
  constructor(apiKey) {
    this.validateApiKey(apiKey);
    this.rateLimiter = new RateLimiter(DEFAULTS.RATE_LIMIT_RPM, DEFAULTS.RATE_WINDOW_MS);
    this.initializeClient(apiKey);
  }
  
  validateApiKey(apiKey) {
    if (!apiKey) {
      throw new Error('Google API key is required for Gemini embedding generation');
    }
  }
  
  initializeClient(apiKey) {
    try {
      this.client = new GoogleGenerativeAI(apiKey);
      this.embeddingModel = this.client.getGenerativeModel({ model: DEFAULTS.EMBEDDING_MODEL });
      console.log(`Initialized Gemini embedding model: ${DEFAULTS.EMBEDDING_MODEL}`);
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error.message);
      throw new Error(`Failed to initialize Gemini client: ${error.message}`);
    }
  }
  
  // Generate embeddings for a single text
  async generateEmbedding(text) {
    await this.rateLimiter.acquire();
    
    try {
      return await withRetry(
        async () => {
          const result = await this.embeddingModel.embedContent(text);
          return result.embedding.values;
        },
        {
          onRetry: (error, attempt, delay) => {
            console.warn(`Embedding generation failed (attempt ${attempt}), retrying in ${delay}ms:`, error.message);
          },
        }
      );
    } catch (error) {
      console.error('Failed to generate embedding:', error.message);
      throw new Error(`Failed to generate embedding: ${error.message}`);
    }
  }
  
  // Generate embeddings for a batch of texts
  async generateBatchEmbeddings(texts) {
    const embeddings = [];
    
    for (const text of texts) {
      const embedding = await this.generateEmbedding(text);
      embeddings.push(embedding);
    }
    
    return embeddings;
  }
}
```

### Key Components

1. **Client Initialization**: Sets up the Google Generative AI client with API key
2. **Rate Limiting**: Implements token bucket rate limiting to stay within API quotas
3. **Retry Logic**: Implements exponential backoff for transient errors
4. **Single Text Embedding**: Generates embedding for a single text chunk
5. **Batch Processing**: Processes multiple text chunks sequentially

## API Integration

### Google Generative AI SDK

The implementation uses the official Google Generative AI SDK:

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
```

### API Authentication

Authentication is done using an API key:

```javascript
const client = new GoogleGenerativeAI(apiKey);
```

### Embedding Generation

The actual embedding generation uses the `embedContent` method:

```javascript
const result = await embeddingModel.embedContent(text);
const embedding = result.embedding.values;
```

## Rate Limiting

To avoid hitting API rate limits, the implementation includes a token bucket rate limiter:

```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.queue = [];
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  // Acquire a slot in the rate limit window
  async acquire() {
    const now = Date.now();
    
    // Remove expired timestamps
    while (this.queue.length > 0 && this.queue[0] < now - this.timeWindow) {
      this.queue.shift();
    }
    
    if (this.queue.length >= this.maxRequests) {
      // Wait until the oldest request expires
      const oldestTimestamp = this.queue[0];
      const waitTime = oldestTimestamp + this.timeWindow - now;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.acquire(); // Try again after waiting
    }
    
    // Add current timestamp to queue
    this.queue.push(now);
  }
}
```

### Default Rate Limits

- **Maximum Requests**: 100 per minute
- **Time Window**: 60,000 ms (1 minute)

## Error Handling

The implementation includes comprehensive error handling:

### Retry Logic

```javascript
async function withRetry(fn, options = {}) {
  const {
    maxRetries = DEFAULTS.MAX_RETRIES,
    retryDelay = DEFAULTS.RETRY_DELAY_MS,
    onRetry = null,
  } = options;
  
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      if (attempt <= maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        
        if (onRetry) {
          onRetry(error, attempt, delay);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }
  
  throw lastError;
}
```

### Error Categories

The implementation handles various error types:

1. **Authentication Errors**: Invalid API key
2. **Rate Limit Errors**: Too many requests
3. **API Errors**: Issues with the Gemini API
4. **Network Errors**: Connection issues
5. **Timeout Errors**: Request took too long

## Performance Considerations

### Embedding Generation Speed

- **Single Text**: ~200-500ms per request
- **Batch Processing**: Sequential processing with rate limiting
- **Daily Capacity**: ~100,000 chunks per day within rate limits

### Optimization Strategies

1. **Chunk Size Optimization**: Larger chunks mean fewer API calls
2. **Batch Processing**: Process documents in batches
3. **Caching**: Cache embeddings for frequently accessed content
4. **Parallel Processing**: Process multiple documents in parallel (with rate limiting)

## Best Practices

### Input Text Preparation

- **Clean Text**: Remove unnecessary whitespace, special characters
- **Normalize Text**: Convert to consistent case, format
- **Optimal Length**: 100-2000 characters per chunk works best
- **Semantic Units**: Ensure chunks contain complete semantic units

### API Key Management

- **Secure Storage**: Store API keys securely
- **Key Rotation**: Rotate keys periodically
- **Usage Monitoring**: Monitor API usage and costs

### Error Handling

- **Retry Transient Errors**: Network issues, rate limits
- **Log Persistent Errors**: Authentication issues, invalid inputs
- **Graceful Degradation**: Fall back to alternative methods if embedding generation fails

## Troubleshooting

### Common Issues

#### Authentication Errors

**Symptom**: `Failed to initialize Gemini client: Invalid API key`

**Solutions**:
- Verify API key is correct
- Ensure API key has access to Gemini embeddings
- Check if API key has been revoked or expired

#### Rate Limit Errors

**Symptom**: `Failed to generate embedding: Rate limit exceeded`

**Solutions**:
- Reduce concurrent requests
- Implement more aggressive rate limiting
- Request increased quota from Google

#### Large Input Errors

**Symptom**: `Failed to generate embedding: Input too large`

**Solutions**:
- Reduce chunk size
- Split very large chunks further
- Pre-process text to remove unnecessary content

#### API Availability Issues

**Symptom**: `Failed to generate embedding: Service unavailable`

**Solutions**:
- Implement more aggressive retry logic
- Add circuit breaker pattern
- Fall back to alternative embedding models

## Last Updated

May 16, 2025

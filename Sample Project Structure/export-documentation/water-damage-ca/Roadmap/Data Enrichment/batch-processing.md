# Batch Processing Implementation Guide

## Overview

This document outlines the batch processing system for updating business data from Google Places API while maintaining cost efficiency and reliability.

## Latest Implementation (April 2025)

### New Components

1. **Utility Classes**

   ```typescript
   // Logger for structured logging
   const logger = new Logger('BatchProcessor');
   
   // File-based cache with 6-month TTL
   const cache = new FileCache('cache/places-api');
   
   // Rate limiter for API calls
   const rateLimiter = new RateLimiter({
     maxRequests: 10,
     windowMs: 60 * 1000
   });
   ```

2. **Data Enrichment Flow**

   ```typescript
   async function enrichCityData(city: CityData): Promise<CityData> {
     const gbpData = await fetchGBPData(city.name, city.state);
     return {
       ...city,
       enriched_data: {
         gbp_data: gbpData,
         last_updated: new Date().toISOString(),
         data_version: '1.0'
       }
     };
   }
   ```

3. **Cost Optimization**

   - Field masks for minimal data transfer
   - 6-month caching strategy
   - Maximum results per query (20)
   - Rate limiting (10 requests/minute)

4. **Error Handling**

   - Retry mechanism with exponential backoff
   - Comprehensive error logging
   - Data validation before storage

### Test Configuration

```typescript
const TARGET_CITIES = [
  { name: 'Los Angeles', state: 'CA' },    // existing - control
  { name: 'Sacramento', state: 'CA' },     // existing - control
  { name: 'Fresno', state: 'CA' },         // new
  { name: 'Oakland', state: 'CA' },        // new
  { name: 'Santa Clara', state: 'CA' }     // new
];
```

### Monitoring Metrics

- Cache hit/miss rates
- API call statistics
- Processing times per city
- Success/failure rates
- Data quality metrics

## System Architecture

```typescript
interface BatchProcessConfig {
  batchSize: number;
  delayBetweenBatches: number;
  maxRetries: number;
  logLevel: 'debug' | 'info' | 'error';
}

class BatchProcessor {
  private readonly config: BatchProcessConfig;
  private readonly cache: FileCache;
  private readonly logger: Logger;

  constructor(config: BatchProcessConfig) {
    this.config = config;
    this.cache = new FileCache('/cache/places-api');
    this.logger = new Logger(config.logLevel);
  }

  async processCityBatch(cities: string[]): Promise<ProcessingResult[]> {
    return this.batchRequests(cities, this.config.batchSize);
  }

  private async batchRequests(items: string[], batchSize: number): Promise<any[]> {
    const results = [];
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await this.processBatch(batch);
      results.push(...batchResults);
      await this.delay(this.config.delayBetweenBatches);
    }
    return results;
  }
}
```

## Implementation Guide

### Batch Processor Setup

```typescript
const processor = new BatchProcessor({
  batchSize: 3,
  delayBetweenBatches: 1000,
  maxRetries: 3,
  logLevel: 'info'
});
```

### Processing Logic

```typescript
async function processCity(city: string): Promise<ProcessingResult> {
  try {
    // Check cache first
    const cached = await cache.get(`places-${city}`);
    if (cached) return cached;

    // Fetch from API if not cached
    const data = await fetchPlacesData(city);
    await cache.set(`places-${city}`, data);
    return { city, success: true, data };
  } catch (error) {
    return { city, success: false, error };
  }
}
```

### Error Management

```typescript
class ProcessingError extends Error {
  constructor(
    message: string,
    public readonly city: string,
    public readonly retryable: boolean
  ) {
    super(message);
    this.name = 'ProcessingError';
  }
}

async function handleError(error: ProcessingError): Promise<void> {
  if (error.retryable) {
    await exponentialBackoff();
    // Retry the operation
  } else {
    // Log permanent failure
    logger.error(`Failed to process ${error.city}: ${error.message}`);
  }
}
```

## Monitoring System

### Metrics Collection

```typescript
interface ProcessingMetrics {
  cacheHits: number;
  cacheMisses: number;
  apiCalls: number;
  errors: {
    retryable: number;
    permanent: number;
  };
  processingTimes: {
    min: number;
    max: number;
    avg: number;
  };
}

class MetricsCollector {
  private metrics: ProcessingMetrics;

  constructor() {
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      apiCalls: 0,
      errors: {
        retryable: 0,
        permanent: 0
      },
      processingTimes: {
        min: Infinity,
        max: -Infinity,
        avg: 0
      }
    };
  }

  recordCacheHit() {
    this.metrics.cacheHits++;
  }

  recordCacheMiss() {
    this.metrics.cacheMisses++;
  }

  recordApiCall() {
    this.metrics.apiCalls++;
  }

  recordError(error: ProcessingError) {
    if (error.retryable) {
      this.metrics.errors.retryable++;
    } else {
      this.metrics.errors.permanent++;
    }
  }

  recordProcessingTime(ms: number) {
    this.metrics.processingTimes.min = Math.min(this.metrics.processingTimes.min, ms);
    this.metrics.processingTimes.max = Math.max(this.metrics.processingTimes.max, ms);
    // Update running average
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    this.metrics.processingTimes.avg = 
      (this.metrics.processingTimes.avg * (total - 1) + ms) / total;
  }
}
```

## Rate Control

```typescript
class RateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private requests: number[];

  constructor(config: { maxRequests: number; windowMs: number }) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
    this.requests = [];
  }

  async acquire(): Promise<void> {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.requests.push(now);
  }
}
```

## Implementation Example

```typescript
async function main() {
  const processor = new BatchProcessor({
    batchSize: 3,
    delayBetweenBatches: 1000,
    maxRetries: 3,
    logLevel: 'info'
  });

  const metrics = new MetricsCollector();
  const rateLimiter = new RateLimiter({
    maxRequests: 10,
    windowMs: 60 * 1000
  });

  try {
    await processor.processCityBatch(TARGET_CITIES);
  } catch (error) {
    if (error instanceof ProcessingError) {
      await handleError(error);
    } else {
      throw error;
    }
  }
}
```

## Best Practices

### Resource Management

- Implement proper cleanup
- Monitor memory usage
- Handle rate limits gracefully
- Cache responses effectively
- Log all critical operations

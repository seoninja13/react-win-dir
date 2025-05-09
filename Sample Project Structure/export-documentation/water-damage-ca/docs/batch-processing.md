# Batch Processing System Documentation

## Overview

The batch processing system is designed to efficiently fetch, enrich, and store city and business data from Google Places API while optimizing for cost, performance, and reliability. The system follows a strict two-step process:

1. **Step 1**: Retrieve Google Business Profile (GBP) data for cities
2. **Step 2**: Enrich business profiles with additional data

## Key Features

- **Two-Step Process Flow**: Clear separation between data retrieval and enrichment
- **Strict Completion Requirements**: Step 2 only starts when Step 1 is 100% complete
- **Cost Optimization**: Field masks, caching, and rate limiting
- **Comprehensive Error Handling**: Retry mechanisms and detailed logging
- **Real-time Progress Tracking**: UI dashboard with detailed statistics

## System Components

### 1. Core Utilities

#### Logger (`lib/utils/logger.ts`)

  - Structured logging with Supabase integration and console fallback
  - Log levels: debug, info, warn, error
  - Metadata tracking for each log entry
  - Graceful fallback when Supabase is unavailable
  - Example usage:

```typescript
// Initialize with fallback
let logger: Logger;
try {
  logger = new Logger('ComponentName');
} catch (error) {
  logger = {
    info: (msg: string, meta?: any) => console.log(msg, meta),
    warn: (msg: string, meta?: any) => console.warn(msg, meta),
    error: (msg: string, meta?: any) => console.error(msg, meta),
    debug: (msg: string, meta?: any) => console.debug(msg, meta),
  } as Logger;
}

// Usage
await logger.info('Operation completed', { metadata });
```

#### FileCache (`lib/utils/cache.ts`)

  - File-based persistent caching system
  - 6-month default TTL
  - Cache statistics tracking
  - JSON storage format

```typescript
const cache = new FileCache('cache/places-api');
await cache.set(key, data, ttlMs);
const data = await cache.get(key);
```

#### RateLimiter (`lib/utils/rateLimiter.ts`)

  - Configurable request windows
  - Token bucket algorithm
  - Automatic delay handling
  - Usage statistics

```typescript
const rateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
  delayMs: 1000,
});
await rateLimiter.acquire();
```

### 2. Batch Processor (`lib/batchProcessor.ts`)

The core batch processing logic is implemented in `batchProcessor.ts`. This module:

  - Manages the batch process state
  - Implements the two-step process flow
  - Handles API integrations
  - Updates the database
  - Provides status updates

#### Two-Step Process Flow

1. **Step 1: Retrieve Google Business Profile Data**
   - Fetches cities without GBP data (`has_gbp = FALSE` or `NULL`)
   - Retrieves business profiles from Google Places API
   - Updates the city's `has_gbp` flag to `TRUE`
   - Only completes when ALL cities have `has_gbp = TRUE`

2. **Step 2: Enrich Business Profiles**
   - Only starts after Step 1 is 100% complete
   - Enriches businesses with OpenRouter Web Search
   - Updates the database with enriched data

#### Key Functions

  - `batchProcessCities()`: Processes cities to retrieve GBP data
  - `startBusinessEnrichment()`: Starts the business enrichment process
  - `isStep1Complete()`: Checks if all cities have GBP data
  - `refreshBatchStatistics()`: Updates UI statistics from the database

### 3. API Endpoints

#### Main Batch Process Endpoint (`app/api/admin/batch-process/route.ts`)

  - Controls the batch process
  - Provides status updates
  - Handles process cancellation

#### Step 2 Endpoint (`app/api/admin/batch-process/start-step2/route.ts`)

  - Verifies Step 1 is complete
  - Starts Step 2 (business enrichment)

#### Fix Cities GBP Endpoint (`app/api/admin/fix-cities-gbp/route.ts`)

  - Fixes cities that have businesses but don't have `has_gbp = TRUE`

### 4. UI Components

#### Batch Process Dashboard (`app/admin/batch-process/simple-page.tsx`)

  - Displays process status and progress
  - Shows statistics on cities and businesses
  - Provides controls for starting and managing the process

#### Cities Without GBP Component (`app/admin/batch-process/components/CitiesWithoutGbp.tsx`)

  - Lists cities that need GBP data
  - Provides pagination
  - Includes controls for starting the batch process

## Implementation Details

### Database Schema

```sql
-- Cities Table
ALTER TABLE cities ADD COLUMN has_gbp BOOLEAN DEFAULT FALSE;

-- Businesses Table
ALTER TABLE businesses ADD COLUMN enriched_data JSONB;
ALTER TABLE businesses ADD COLUMN enrichment_source VARCHAR(255);
```

### Cost Optimization

1. **Field Masks**: Using the Places API with field masks to request only necessary data
2. **Caching**: 6-month file-based caching for API responses
3. **Rate Limiting**: 10 requests/minute rate control
4. **Batch Processing**: Processing cities in batches to optimize performance

### Error Handling

1. **Retry Mechanism**: Exponential backoff for transient errors
2. **Comprehensive Logging**: Detailed logs for debugging
3. **Data Validation**: Validation before database updates
4. **Graceful Cancellation**: Ability to cancel the process at any point

## Usage Guide

### Starting the Batch Process

1. Navigate to the Admin Batch Process page
2. View the list of cities without GBP data
3. Click "Start Batch Process" to begin Step 1
4. Monitor the progress in the dashboard

### Starting Step 2 (Business Enrichment)

1. Wait for Step 1 to be 100% complete (all cities have GBP data)
2. When the "Step 1 completed successfully" message appears, click "Start Step 2"
3. Monitor the business enrichment progress

## Recent Updates

1. **Strict Two-Step Flow**: Enforced that Step 2 only starts when Step 1 is 100% complete
2. **Improved Status Messages**: Clearer messages about the current process state
3. **Enhanced UI**: Better visualization of the two-step flow
4. **Performance Optimizations**: Added index on `has_gbp` column for efficient querying

## For More Details

For more detailed information about specific components of the batch processing system, see:

- [Batch Processing System Implementation](./batch-processing-system.md) - Detailed technical documentation
- [Admin Dashboard](./admin-batch-process.md) - Admin interface documentation

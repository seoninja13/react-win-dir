# Batch Processing System Documentation

## Overview

The Batch Processing System is a two-step process designed to:

1. Retrieve Google Business Profile (GBP) data for cities
2. Enrich business profiles with additional data

This document explains the architecture, implementation, and usage of the system.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Two-Step Process Flow](#two-step-process-flow)
3. [Data Flow](#data-flow)
4. [API Endpoints](#api-endpoints)
5. [UI Components](#ui-components)
6. [Database Schema](#database-schema)
7. [Cost Optimization](#cost-optimization)
8. [Error Handling](#error-handling)
9. [Usage Guide](#usage-guide)
10. [Recent Updates](#recent-updates)

## System Architecture

The batch processing system consists of several key components:

- **Batch Processor**: Core logic for processing cities and businesses
- **API Endpoints**: RESTful endpoints for controlling the batch process
- **UI Components**: Admin interface for monitoring and controlling the process
- **Database Integration**: Supabase tables for storing city and business data
- **External API Integration**: Google Places API for retrieving business data

### Key Files

- `lib/batchProcessor.ts`: Core batch processing logic
- `app/api/admin/batch-process/route.ts`: Main API endpoint
- `app/api/admin/batch-process/start-step2/route.ts`: Step 2 API endpoint
- `app/api/admin/fix-cities-gbp/route.ts`: Utility endpoint to fix city GBP flags
- `app/admin/batch-process/simple-page.tsx`: Admin UI for batch processing
- `app/admin/batch-process/components/CitiesWithoutGbp.tsx`: Component for displaying cities without GBP data

## Two-Step Process Flow

The batch processing system follows a strict two-step flow:

### Step 1: Retrieve Google Business Profile Data

1. Fetches cities from the database that need GBP data (`has_gbp = FALSE` or `NULL`)
2. For each city, retrieves business profiles from Google Places API
3. Stores the business data in the database
4. Updates the city's `has_gbp` flag to `TRUE`
5. **Important**: Step 1 is only considered complete when ALL cities have `has_gbp = TRUE`

### Step 2: Enrich Business Profiles

1. **Prerequisite**: Step 1 must be 100% complete (all cities must have `has_gbp = TRUE`)
2. Fetches businesses from the database that need enrichment
3. For each business, retrieves additional information using OpenRouter Web Search
4. Processes and stores the enriched data in the `enriched_data` column
5. Updates the `enrichment_source` to track the data origin

### Key Functions

#### `isStep1Complete()`

This function checks if Step 1 is complete by verifying if there are any cities with `has_gbp = FALSE` or `NULL`:

```typescript
export async function isStep1Complete(): Promise<boolean> {
  try {
    const { count: citiesWithoutGbp, error: countError } = await ensureSupabase()
      .from("cities")
      .select("*", { count: "exact", head: true })
      .or("has_gbp.is.null,has_gbp.eq.false");

    if (countError) {
      throw countError;
    }

    // Step 1 is complete only if ALL cities have has_gbp = TRUE
    return citiesWithoutGbp === 0;
  } catch (error) {
    console.error("Error checking if Step 1 is complete:", error);
    return false;
  }
}
```

#### `startBusinessEnrichment()`

This function starts Step 2 (business enrichment) only if Step 1 is complete:

```typescript
export async function startBusinessEnrichment(): Promise<void> {
  try {
    // First, verify that Step 1 is complete
    const step1Complete = await isStep1Complete();
    if (!step1Complete) {
      throw new Error("Cannot start Step 2: Step 1 is not complete.");
    }

    // Update batch state to indicate we're starting Step 2
    await updateBatchState({
      status: "running",
      currentStep: "Starting business enrichment (Step 2)",
      progress: 0,
      startTime: Date.now(),
    });

    // Start the business enrichment process
    // ... (business enrichment logic)
  } catch (error) {
    console.error("Error starting business enrichment:", error);
    await updateBatchState({
      status: "failed",
      error: `Failed to start business enrichment: ${error.message}`,
    });
    throw error;
  }
}
```

## Data Flow

The batch processing system follows this data flow:

1. **City Selection**:
   - Identifies cities that need GBP data (`has_gbp = FALSE` or `NULL`)
   - Prioritizes cities based on population or other criteria

2. **GBP Data Retrieval**:
   - Constructs search queries for each city (e.g., "water damage restoration in [city], CA")
   - Retrieves business profiles using Google Places API with field masks
   - Processes and validates the retrieved data

3. **Business Storage**:
   - Stores business data in the `businesses` table
   - Links businesses to cities using `city_id`
   - Updates the city's `has_gbp` flag to `TRUE`

4. **Business Enrichment**:
   - Retrieves businesses that need enrichment
   - Constructs search queries for each business
   - Retrieves additional information using OpenRouter Web Search
   - Processes and stores the enriched data

## API Endpoints

### Main Batch Process Endpoint

```http
POST /api/admin/batch-process
```

Controls the batch process with the following query parameters:

- `startProcess`: Start the batch process
- `cancelProcess`: Cancel the running process
- `refreshStats`: Refresh batch statistics

### Step 2 Endpoint

```http
POST /api/admin/batch-process/start-step2
```

Starts Step 2 (business enrichment) only if Step 1 is complete.

### Fix Cities GBP Endpoint

```http
POST /api/admin/fix-cities-gbp
```

Fixes cities that have businesses but don't have `has_gbp = TRUE`.

## UI Components

### Batch Process Dashboard

The main admin interface for the batch process, located at `/admin/batch-process/simple-page.tsx`:

- **Process Controls**: Start, cancel, and refresh buttons
- **Process Status**: Current status, progress, and error messages
- **Process Statistics**: Number of cities and businesses processed
- **Process Logs**: Detailed logs of the batch process

### Cities Without GBP Component

A component that displays cities without GBP data, located at `/admin/batch-process/components/CitiesWithoutGbp.tsx`:

- **City List**: Paginated list of cities without GBP data
- **City Count**: Total number of cities without GBP data
- **Action Buttons**: Start batch process and fix cities GBP buttons

## Database Schema

### Cities Table

```sql
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  state_code VARCHAR(2) NOT NULL,
  county VARCHAR(255),
  population INTEGER,
  latitude FLOAT,
  longitude FLOAT,
  priority INTEGER DEFAULT 0,
  featured_image_alt VARCHAR(255),
  featured_image_title VARCHAR(255),
  featured_image_description TEXT,
  has_gbp BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Businesses Table

```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  city_id INTEGER REFERENCES cities(id),
  rating FLOAT,
  review_count INTEGER,
  enriched_data JSONB,
  enrichment_source VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Cost Optimization

The batch processing system implements several strategies to minimize API costs:

1. **Field Masks**: Using the Places API with field masks to request only necessary data
2. **Caching**: 6-month file-based caching for API responses
3. **Rate Limiting**: 10 requests/minute rate control
4. **Batch Processing**: Processing cities in batches to optimize performance

## Error Handling

The batch processing system implements robust error handling:

1. **Retry Mechanism**: Exponential backoff for transient errors
2. **Comprehensive Logging**: Detailed logs for debugging
3. **Data Validation**: Validation before database updates
4. **Graceful Cancellation**: Ability to cancel the process at any point

## Usage Guide

### Starting the Batch Process

1. Navigate to the Admin Batch Process page (`/admin/batch-process`)
2. View the list of cities without GBP data
3. Click "Start Batch Process" to begin Step 1
4. Monitor the progress in the dashboard

### Starting Step 2 (Business Enrichment)

1. Wait for Step 1 to be 100% complete (all cities have GBP data)
2. When the "Step 1 completed successfully" message appears, click "Start Step 2"
3. Monitor the business enrichment progress

## Recent Updates

### Strict Two-Step Flow

- Enforced that Step 2 only starts when Step 1 is 100% complete
- Added `isStep1Complete()` function to verify all cities have GBP data
- Created a dedicated API endpoint for starting Step 2

### Improved Status Messages

- Clearer messages about the current process state
- Removed misleading messages like "Step 1 partially completed"
- Added explicit success messages when Step 1 is complete

### Enhanced UI

- Better visualization of the two-step flow
- Added button to start Step 2 only when Step 1 is complete
- Improved error handling and user feedback

### Performance Optimizations

- Added index on `has_gbp` column for efficient querying
- Implemented pagination for large city lists
- Added batch processing for CSV imports

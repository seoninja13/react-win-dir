# GBP Fetching and Enrichment Plan

## Overview

This document outlines the process of fetching Google Business Profile (GBP) data and enriching it using OpenRouter for the Water Damage CA project.

## Phase 1: City Data Management

1. **Add Test Cities**:

   ```typescript
   const testCities = [
     'Fresno CA',
     'Bakersfield CA',
     'Stockton CA',
     'Riverside CA',
     'Santa Ana CA',
     'Anaheim CA',
     'Irvine CA',
     'Fremont CA',
     'Modesto CA',
     'Fontana CA'
   ];
   ```

2. **City Data Structure**:

   ```typescript
   interface City {
     id: number;
     name: string;
     slug: string;
     state: string;
     coordinates?: {
       lat: number;
       lng: number;
     };
   }
   ```

## Phase 2: Google Places API Integration

1. **Fetch GBPs**:

   ```typescript
   interface GBPResult {
     place_id: string;
     displayName: string;
     formattedAddress: string;
     rating?: number;
     userRatingsTotal?: number;
   }

   async function fetchGBPs(city: string) {
     // Use field masks for cost optimization
     const fields = ['place_id', 'displayName', 'formattedAddress', 'rating'];
     const query = `water damage restoration ${city}`;
     // Returns top 20 results per city
   }
   ```

2. **Cost Optimization**:

   - Use field masks to minimize data transfer
   - Cache responses for 6 months
   - Limit to 20 results per query
   - Only display top 10 businesses

## Phase 3: OpenRouter Enrichment

1. **Enrichment Process**:

   ```typescript
   interface EnrichmentJob {
     place_id: string;
     business_name: string;
     city: string;
     status: 'pending' | 'processing' | 'completed' | 'failed';
   }
   ```

2. **Enriched Data Structure**:

   ```typescript
   interface EnrichedData {
     reviewInsights: {
       summary: string;
       strengths: string[];
       testimonialHighlights: string[];
     };
     serviceDetails: {
       certifications: string[];
       primaryServices: Array<{
         name: string;
         description: string;
       }>;
     };
     remediationProcess: {
       steps: string[];
       description: string;
     };
   }
   ```

3. **Rate Limiting**:

   - Process max 5 businesses per minute
   - Cache enrichment results
   - Implement retry mechanism

## Phase 4: Data Storage (Supabase)

1. **Business Profiles Table**:

   ```sql
   CREATE TABLE business_profiles (
     id SERIAL PRIMARY KEY,
     city_id INTEGER REFERENCES cities(id),
     place_id TEXT UNIQUE,
     business_name TEXT,
     address TEXT,
     rating DECIMAL,
     ratings_count INTEGER,
     gbp_data JSONB,
     enriched_data JSONB,
     enrichment_status TEXT DEFAULT 'pending',
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Indexing**:

   ```sql
   CREATE INDEX idx_business_city ON business_profiles(city_id);
   CREATE INDEX idx_business_status ON business_profiles(enrichment_status);
   ```

## Phase 5: UI Implementation

1. **Business Profile Component**:

   ```typescript
   interface BusinessProfileProps {
     business: {
       gbp_data: GBPResult;
       enriched_data: EnrichedData;
     };
   }
   ```

2. **Loading States**:

   - Show skeleton loader during fetch
   - Display partial data while enriching
   - Handle error states gracefully

## Success Metrics

1. All 10 cities added successfully
2. Each city has 10-20 GBPs
3. All GBPs enriched with:
   - Review insights
   - Service details
   - Remediation process

## Error Handling

1. Log all API errors
2. Implement retry mechanism
3. Track rate limits
4. Store failed enrichments for review

## Monitoring

1. Track API usage:
   - Google Places API calls
   - OpenRouter requests
   - Cache hit rates
2. Monitor enrichment queue
3. Log error rates

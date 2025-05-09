# Business Data Flow Documentation

## Overview

This document outlines the current data flow for business profiles in the Water Damage CA project, focusing on Google Places API integration and OpenRouter enrichment.

## Architecture

```mermaid
graph TD
    A[Entry Point: [business]-[city]-ca/page.tsx] --> B[Middleware]
    B --> C[Business Page Component]
    C --> D[Supabase Data Layer]
    C --> E[GoogleBusinessProfile Component]
    E --> F[Review Insights]
    E --> G[Service Details]
    E --> H[Remediation Process]
```

## Data Flow

1. **Initial Data Fetch (Google Places API)**

   ```typescript
   // Using field masks for cost optimization
   interface GBPData {
     place_id: string;
     displayName: string;
     formattedAddress: string;
     rating?: number;
     userRatingsTotal?: number;
   }
   ```

2. **Data Enrichment (OpenRouter)**

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

3. **Storage (Supabase)**

   ```typescript
   interface BusinessRecord {
     id: string;
     place_id: string;
     business_name: string;
     city_id: number;
     gbp_data: GBPData;
     enriched_data: EnrichedData;
     last_updated: Date;
   }
   ```

## Cost Optimization

1. **Google Places API**

   - Use field masks to request minimal data
   - Cache results for 6 months
   - Limit to 20 results per query
   - Only display top 10 businesses

2. **OpenRouter**

   - Batch process enrichment requests
   - Cache enriched content
   - Rate limit requests
   - Implement retry mechanism

## Implementation Details

1. **Entry Point**

   ```typescript
   // [business]-[city]-ca/page.tsx
   export async function generateMetadata({ params }) {
     const { business, city } = params;
     // Fetch business data from Supabase
     // Generate metadata
   }
   ```

2. **Business Profile Component**

   ```typescript
   // components/GoogleBusinessProfile.tsx
   const GoogleBusinessProfile: React.FC<Props> = ({
     business
   }) => {
     // Render business data with schema
     // Display enriched content
   };
   ```

3. **Schema Implementation**

   ```typescript
   const businessSchema = {
     "@context": "https://schema.org",
     "@type": "HomeAndConstructionBusiness",
     "name": business.name,
     "address": {
       "@type": "PostalAddress",
       "addressLocality": business.city.name,
       "addressRegion": "CA"
     },
     // Include enriched data in schema
   };
   ```

## Error Handling

1. **API Failures**

   - Implement retry mechanism
   - Fall back to cached data
   - Display graceful error messages

2. **Data Validation**

   - Validate all API responses
   - Ensure required fields are present
   - Handle missing or malformed data

## Testing

1. **Unit Tests**

   - Test data fetching functions
   - Validate schema generation
   - Check error handling

2. **Integration Tests**

   - Test complete data flow
   - Verify caching mechanism
   - Check rate limiting

## Monitoring

1. **API Usage**

   - Track Google Places API calls
   - Monitor OpenRouter usage
   - Log cache hit rates

2. **Performance**

   - Track page load times
   - Monitor component render times
   - Log API response times

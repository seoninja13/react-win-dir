# GBP Batch Processing Plan

## Overview

This plan outlines the process of fetching and enriching Google Business Profile (GBP) data for 10 new cities across our service categories.

## Service Categories

1. Water Damage Repair/Restoration
   - Search query: "water damage restoration {city} CA"
   - Business type: "Water Damage Restoration Service"

2. Mold Removal
   - Search query: "mold removal service {city} CA"
   - Business type: "Mold Remediation Service"

## Target Cities

Selected based on population and not currently in database:
1. Fresno, CA
2. Bakersfield, CA
3. Stockton, CA
4. Riverside, CA
5. Santa Ana, CA
6. Anaheim, CA
7. Irvine, CA
8. Fremont, CA
9. Modesto, CA
10. Fontana, CA

## Implementation Plan

### Phase 1: Database Setup

1. **Check Existing Cities**:
   ```typescript
   const checkExistingCities = async () => {
     const { data: existingCities } = await supabase
       .from('cities')
       .select('name')
       .in('name', targetCities);
     return existingCities;
   };
   ```

2. **Add New Cities**:
   ```typescript
   const addNewCities = async (cities: string[]) => {
     const cityData = cities.map(city => ({
       name: city,
       slug: slugify(city),
       state: 'CA'
     }));
     await supabase.from('cities').insert(cityData);
   };
   ```

### Phase 2: GBP Data Fetching

1. **Fetch Process**:
   ```typescript
   interface FetchJob {
     city: string;
     service: string;
     query: string;
   }

   const fetchGBPBatch = async (jobs: FetchJob[]) => {
     const results = [];
     // Process 5 jobs per minute (rate limiting)
     for (const job of jobs) {
       const businesses = await fetchGBPsForCity(job);
       results.push(...businesses);
       await delay(12000); // 12 second delay between requests
     }
     return results;
   };
   ```

2. **Cost Optimization**:
   - Use field masks: name, address, rating, reviews
   - Cache responses for 6 months
   - Limit to top 20 results per query
   - Total API calls: 20 (10 cities × 2 services)

### Phase 3: Data Enrichment

1. **Enrichment Queue**:
   ```typescript
   interface EnrichmentJob {
     place_id: string;
     business_name: string;
     city: string;
     service: string;
   }

   const processEnrichmentQueue = async (jobs: EnrichmentJob[]) => {
     // Process 5 businesses per minute
     for (const job of jobs) {
       await enrichBusiness(job);
       await delay(12000);
     }
   };
   ```

2. **OpenRouter Prompts**:
   - Review analysis
   - Service specialization
   - Emergency response details
   - Local expertise

### Phase 4: Data Storage

1. **Store GBP Data**:
   ```typescript
   const storeGBPData = async (data: GBPResult[]) => {
     const batchSize = 50;
     for (let i = 0; i < data.length; i += batchSize) {
       const batch = data.slice(i, i + batchSize);
       await supabase.from('business_profiles').insert(batch);
     }
   };
   ```

2. **Update Enrichment Status**:
   ```typescript
   const updateEnrichmentStatus = async (
     place_id: string,
     status: 'completed' | 'failed'
   ) => {
     await supabase
       .from('business_profiles')
       .update({ enrichment_status: status })
       .eq('place_id', place_id);
   };
   ```

## Execution Steps

1. **Preparation (5 minutes)**:
   - Validate target cities
   - Check rate limits
   - Clear cache if needed

2. **City Processing (2 hours)**:
   - Add new cities to database
   - Fetch GBP data (20 API calls)
   - Initial data validation

3. **Data Enrichment (4 hours)**:
   - Process ~400 businesses (20 per city × 2 services × 10 cities)
   - Rate limited to 5 per minute
   - Cache enrichment results

4. **Verification (1 hour)**:
   - Check data quality
   - Validate schema
   - Test page generation

## Success Metrics

1. **Data Coverage**:
   - 10 new cities added
   - 200-400 new business profiles
   - 100% enrichment completion

2. **Data Quality**:
   - Valid place_ids
   - Complete business info
   - Rich enrichment content

3. **Performance**:
   - < 100ms DB queries
   - < 2s page generation
   - 90% cache hit rate

## Error Handling

1. **API Failures**:
   - Retry failed requests (max 3 attempts)
   - Log errors for review
   - Maintain partial results

2. **Rate Limiting**:
   - Implement exponential backoff
   - Queue overflow protection
   - Monitor API quotas

## Monitoring

1. **API Usage**:
   - Track request counts
   - Monitor rate limits
   - Log cache hits/misses

2. **Data Quality**:
   - Validate enrichment results
   - Check for missing fields
   - Monitor error rates

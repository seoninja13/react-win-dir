# Batch Processing Implementation Documentation

## 1. System Architecture

### Database Schema
- Using existing `cities` table
  ```sql
  cities (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
  )
  ```
- Using existing `businesses` table for GBP data storage
  - Stores Google Places API responses
  - Contains enriched data in JSON format

### Data Flow
1. City Processing Pipeline
   ```mermaid
   graph TD
     A[Input Cities Batch] --> B[Validate Cities]
     B --> C[Check Existing Cities]
     C --> D[Insert Valid New Cities]
     D --> E[Update Business Data]
     E --> F[Cache API Responses]
   ```

2. Business Data Enrichment
   ```mermaid
   graph TD
     A[City Data] --> B[Fetch GBP Data]
     B --> C[Cache Response]
     C --> D[Update businesses Table]
     D --> E[Enrich Data]
   ```

## 2. Implementation Details

### Batch Processing Components

1. **City Batch Processor**
   ```typescript
   async function processCityBatch(cities: string[], batchSize = 10) {
     for (let i = 0; i < cities.length; i += batchSize) {
       const batch = cities.slice(i, i + batchSize);
       await Promise.all(batch.map(processCity));
     }
   }
   ```

2. **City Validation & Processing**
   ```typescript
   async function processCity(city: string) {
     const { data: existingCity } = await supabase
       .from('cities')
       .select('id, name')
       .eq('name', city)
       .single();

     if (!existingCity && validateCity(city)) {
       await insertCity(city);
     }
   }
   ```

3. **Business Data Updates**
   ```typescript
   async function updateBusinessData(city: string) {
     // Fetch and cache GBP data
     // Update businesses table
     // Enrich data as needed
   }
   ```

## 3. API Cost Optimization

### Google Places API Integration
- Field masks for minimal data transfer
- Maximum results per request (20)
- 6-month file-based caching
- Display limit of top 10 businesses

### Caching Strategy
1. Check cache before API calls
2. Store responses for 6 months
3. Implement disk persistence
4. Cache invalidation on major data changes

## 4. Testing Strategy

### Test Cities (Batch of 10)
1. Los Angeles (existing - control)
2. Sacramento (existing - control)
3. Fresno
4. Oakland
5. Santa Clara
6. Riverside
7. Bakersfield
8. Stockton
9. Modesto
10. Santa Rosa

### Success Metrics
1. City validation accuracy
2. API cost efficiency
3. Cache hit rate
4. Data quality consistency
5. Processing time per batch

### Monitoring Points
1. API calls per city
2. Cache effectiveness
3. Error rates
4. Data quality metrics
5. Processing duration

## 5. Error Handling

### Types of Errors
1. API rate limits
2. Invalid city data
3. Database connection issues
4. Cache failures

### Recovery Strategies
1. Exponential backoff for API limits
2. Data validation before processing
3. Transaction rollback capabilities
4. Cache rebuild mechanisms

## 6. Implementation Phases

### Phase 1: Core Setup
- [x] Document existing table structure
- [x] Plan batch processing flow
- [x] Define API optimization strategy

### Phase 2: Implementation
- [ ] Develop batch processing logic
- [ ] Implement caching system
- [ ] Add error handling

### Phase 3: Testing
- [ ] Test with 10-city batch
- [ ] Monitor API costs
- [ ] Validate data quality

### Phase 4: Optimization
- [ ] Fine-tune batch size
- [ ] Optimize cache strategy
- [ ] Improve error recovery

## 7. Maintenance Plan

### Regular Tasks
1. Cache cleanup (monthly)
2. API usage audit (weekly)
3. Data quality check (daily)
4. Error log review (daily)

### Performance Monitoring
1. Processing time tracking
2. Cache hit rate analysis
3. API cost tracking
4. Error rate monitoring

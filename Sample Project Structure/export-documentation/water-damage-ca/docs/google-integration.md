# Google Places API Integration Documentation

This document provides detailed information about the integration of Google Places API in the Water Damage CA project.

## Table of Contents

1. [Google Places API Integration](#google-places-api-integration)
   - [Implementation Details](#implementation-details)
   - [Cost Optimization](#cost-optimization)
   - [API Usage](#api-usage)
   - [Troubleshooting](#troubleshooting)
   - [Test Scripts](#test-scripts)

---

## Google Places API Integration

The project uses the Google Places API (New) to fetch business data for water damage and mold removal services in various California cities.

### Implementation Details

The Places API integration is implemented in the following files:

- `lib/api/googlePlaces.ts`: Core implementation of the Places API client
- `app/api/business/search/route.ts`: API route for searching businesses
- `app/test/page.tsx`: Test page for trying out the Places API

The implementation uses the new Places API endpoint (`https://places.googleapis.com/v1/places:searchText`) with field masking to optimize for cost.

### Recent Updates (04/18/2025)

The Google Places API integration has been improved with the following changes:

1. **Error Handling Improvements**
   - Added specific handling for non-OK responses
   - Added detection for error messages in response text
   - Removed fallback to mock data in production mode
   - Added detailed error logging with context
   - Improved error reporting with full response details

2. **API Request Format**
   - Added proper Accept header
   - Added detailed logging of API requests
   - Ensured correct field masks are used
   - Fixed API key handling to use the correct key

3. **Cache Implementation**
   - Added checks for server-side environments
   - Skipped caching in server-side environments
   - Improved error handling for cache operations
   - Added cache statistics tracking

4. **Real Data Usage**
   - Updated to use real Google Business Profiles instead of mock data
   - Created dedicated test scripts for verifying API functionality
   - Added retry logic for failed API calls
   - Improved error handling for API failures

### Cost Optimization

Several strategies are implemented to minimize API costs:

1. **Field Masking**: Only requesting the specific fields needed (ID, name, description) to use the most cost-effective Text Search (ID Only) SKU.

2. **Long-term Caching**: Implementing a 6-month file-based caching mechanism to drastically reduce the number of API calls. Cache is persisted to disk to survive server restarts.

3. **Maximizing Results Per Request**: Setting `maxResultCount` to 20 (the maximum allowed) to get as many businesses as possible in a single request.

4. **Minimal Data Transfer**: Only requesting the absolute minimum required fields to minimize data transfer costs.

5. **Limited Display**: While we fetch up to 20 results per query to ensure quality, we only display the top 10 businesses per location.

### API Usage

The Places API is used in the following ways:

1. **Text Search**: Searching for businesses based on a query string (e.g., "water damage Sacramento CA").

2. **Field Masking**: Using the `X-Goog-FieldMask` header to specify which fields to include in the response.

3. **Caching**: Caching results for 6 months to minimize API calls.

Example API request:

```javascript
const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.types,places.rating,places.userRatingCount,places.editorialSummary,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.businessStatus',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    textQuery: 'water damage Sacramento CA',
    maxResultCount: 20,
    languageCode: 'en'
  })
});
```

### Troubleshooting

Common issues and solutions:

1. **API Key Issues**: Make sure the API key is correctly set in the `.env.local` file and that the Places API is enabled in the Google Cloud Console.

2. **Rate Limiting**: If you encounter rate limiting, consider implementing exponential backoff or further optimizing your API usage.

3. **Cache Issues**: If the cache is not working correctly, check the `.cache/places` directory and ensure it has write permissions.

4. **Error Handling**: If you encounter errors from the API, check the error message in the response. The API may return a 200 status code but still contain an error message in the response body.

5. **Mock Data**: In development mode, the API will fall back to mock data if there are issues with the API. This is useful for testing but may cause confusion if you're expecting real data.

6. **Server-Side Rendering**: The cache implementation now checks for server-side environments and skips caching in those environments. This prevents errors when running on the server.

7. **Next Steps**: For details on the next steps for the Google Places API integration, see the [Immediate Next Steps](./immediate-next-steps.md) document.

### Test Scripts

Several test scripts have been created to verify the Google Places API integration:

1. **Direct API Test** (`scripts/test-google-places-direct.js`):
   - Tests the Google Places API directly with the provided API key
   - Verifies that the API key is working correctly
   - Tests multiple search queries to ensure consistent results
   - Provides detailed logging of API requests and responses

2. **Batch Processor Test** (`scripts/test-batch-processor-direct.js`):
   - Tests the batch processor with real Google Places API data
   - Falls back to mock data for testing if the API fails
   - Verifies that the batch processor correctly updates the database
   - Provides detailed logging of the batch processing progress

3. **Specific Search Test** (`scripts/search-mold-removal-sf.js`):
   - Tests searching for specific businesses in a specific location
   - Limits the results to a specified number
   - Displays detailed information about each business
   - Useful for quick verification of the API functionality

To run these test scripts:

```bash
# Test the Google Places API directly
node scripts/test-google-places-direct.js

# Test the batch processor with real data
node scripts/test-batch-processor-direct.js

# Test searching for specific businesses
node scripts/search-mold-removal-sf.js
```

---

## Cost Analysis

### Google Places API

- **API Call**: 1 Text Search (ID Only) request per service-city combination
- **Data Retrieved**: Business name and description for top 10 businesses
- **Cost**: Approximately $0.02 per service-city page

### Cost With 6-Month Caching

- Each service-city combination requires only 1 API call every 6 months
- For 100 cities × 50 services = 5,000 service-city combinations
- **Total Cost Per 6 Months**: 5,000 × $0.02 = $100
- **Monthly Cost**: $16.67

This analysis shows that our implementation is highly cost-effective while still providing the necessary business information for our service-city pages.

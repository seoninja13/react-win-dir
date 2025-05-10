# Google Places API Integration

## Overview

This document provides a comprehensive guide to the Google Places API integration implemented in the Water Damage CA website project. The integration enables the retrieval of business data for specific cities in California, with caching in Google Sheets to optimize API usage.

## Implementation Details

### 1. Environment Configuration

- **Google Cloud Project**: A project with Places API enabled
- **API Key**: Created for Google Maps/Places API access
- **Billing Account**: Linked to the Google Cloud project to enable API usage
- **Environment Variables**:
  ```
  GOOGLE_MAPS_API_KEY=your-api-key
  ```

### 2. Core Components

#### 2.1 API Integration

- **File**: `lib/api/googleSheets.ts`
- **Function**: `getEnrichedBusinessData()`
- **Purpose**: Retrieves business data from Google Sheets, filters by city, and enriches with Places API data

```typescript
export async function getEnrichedBusinessData(): Promise<GBPBusiness[]> {
  const sheetData = await getGoogleSheetData('business!A2:Z1000');
  // Filter by city and enrich with Places API data
  // Return up to 10 results
  return results.slice(0, 10);
}
```

#### 2.2 API Route

- **File**: `app/api/business/by-city/route.ts`
- **Endpoint**: `/api/business/by-city?city={cityName}`
- **Purpose**: Handles requests for business data by city

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Sacramento';
  
  try {
    const businesses = await getBusinessesByCity(city);
    return Response.json(businesses);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch businesses' }, { status: 500 });
  }
}
```

#### 2.3 Caching Mechanism

- **File**: `lib/api/googleSheets.ts`
- **Function**: `markAsCached(placeId: string)`
- **Purpose**: Updates the cache status in Google Sheets after fetching data from Places API

```typescript
export async function markAsCached(placeId: string) {
  // Update the 'Cached' status and timestamp in Google Sheets
}
```

### 3. Data Flow

1. User requests business data for a specific city
2. System checks Google Sheets for cached data
3. If data is cached and recent, it returns the cached data
4. If data is not cached or outdated, it fetches from Places API
5. New data is cached in Google Sheets for future use
6. Up to 10 businesses are returned per location

### 4. Testing

#### 4.1 Direct API Testing

```powershell
$apiKey = (Get-Content .env.local | Select-String "GOOGLE_MAPS_API_KEY").Line.Split('=')[1].Trim()
curl "https://maps.googleapis.com/maps/api/place/textsearch/json?query=water%20damage%20Los%20Angeles%20CA&key=$apiKey"
```

#### 4.2 API Route Testing

```powershell
curl "http://localhost:3000/api/business/by-city?city=Sacramento"
```

### 5. Error Handling

- Authentication errors are caught and logged
- API rate limit errors trigger fallback to cached data
- Malformed responses are handled gracefully

### 6. Optimization Strategies

- Caching in Google Sheets reduces API calls
- Limiting to 10 results per location optimizes API usage
- Requesting only necessary fields reduces response size
- Timestamp tracking ensures data freshness

## Next Steps

1. Implement direct Places API endpoint for real-time data
2. Add more comprehensive error handling
3. Optimize data fetching and caching logic
4. Implement pagination for results beyond 10 items
5. Add more detailed business information from Places Details API

## Troubleshooting

### Common Issues

1. **API Key Authentication Errors**
   - Verify API key format in `.env.local`
   - Confirm Places API is enabled in Google Cloud Console
   - Check billing account is linked to the project

2. **No Results Returned**
   - Verify search query format
   - Check if the city name is correctly spelled
   - Test direct API call to isolate the issue

3. **Google Sheets Integration Issues**
   - Verify service account has access to the sheet
   - Check credentials format in environment variables
   - Run the test script to validate connection

### Support Resources

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api/guides/concepts)
- Project-specific documentation in the `Roadmap` folder

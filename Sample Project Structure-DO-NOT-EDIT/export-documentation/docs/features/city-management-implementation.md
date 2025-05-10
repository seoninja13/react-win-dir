# City Management Implementation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Features](./index.md) > City Management Implementation

## Overview
Implementation of city management system with name normalization, slug generation, validation, and coordinate management. The admin interface now supports adding and editing latitude and longitude coordinates for cities.

## Components Modified

### 1. UI Component (`app/ui/components/CityComparisonUI.tsx`)
```typescript
// Key features:
- Single input for city names
- Automatic name normalization
- Color-coded status display (green=added, blue=skipped, red=error)
- Error details per city
- CSV upload support
```

### 2. API Route (`app/api/cities/process-batch/route.ts`)
```typescript
// Core functionality:
1. Name normalization
2. Slug generation and validation
3. Duplicate checking
4. Database insertion
```

## Data Flow

1. **Input Processing**:
   ```typescript
   // Input: "San Jose" or "San Jose CA"
   const cityName = name.toLowerCase().trim();  // -> "san jose ca"
   const citySlug = generateSlug(cityName);     // -> "san-jose-ca"
   ```

2. **Validation Checks**:
   ```typescript
   // Slug validation rules:
   - Length: 3-100 characters
   - Format: lowercase letters, numbers, hyphens only
   - Must end with "-ca"
   - No consecutive hyphens
   - Must be unique in database
   ```

3. **Database Operations**:
   ```typescript
   // Current city table schema:
   {
     name: string,        // e.g., "san jose ca"
     slug: string,        // e.g., "san-jose-ca"
     latitude: number,    // e.g., 37.3382
     longitude: number,   // e.g., -121.8863
     // other fields...
   }
   ```

## Recent Improvements

1. **Coordinate Management**:
   - Added UI for manually entering latitude and longitude coordinates
   - Updated database operations to store coordinates
   - Fixed type mismatch issues between TypeScript interface and database schema
   - Added validation for coordinate input

## Known Issues

1. **Duplicate City Prevention**:
   - Currently, the admin interface does not check for existing cities before adding new ones
   - This can lead to duplicate cities in the database
   - Need to implement duplicate checking before adding new cities

2. **Future Enhancements Needed**:
   ```typescript
   // TODO: Add coordinates fetching:
   const coordinates = await fetchCityCoordinates(cityName);
   await supabase.from('cities').insert([{
     name: cityName,
     slug: citySlug,
     latitude: coordinates.lat,
     longitude: coordinates.lng,
     place_id: coordinates.place_id
   }]);
   ```

## Code Changes Made

### 1. Name Normalization:
```typescript
const normalizeCityName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')     // Replace multiple spaces
    .replace(/,?\s*ca$/i, '') // Remove CA from end
    .concat(' ca');           // Add CA suffix
};
```

### 2. Slug Generation:
```typescript
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special chars
    .replace(/\s+/g, '-')           // Spaces to hyphens
    .replace(/-+/g, '-')            // Clean up hyphens
    .replace(/^-+|-+$/g, '')        // Trim hyphens
    .concat('-ca');                 // Add CA suffix
};
```

### 3. Validation:
```typescript
const validateSlug = (slug: string): { isValid: boolean; error?: string } => {
  // Length check
  if (slug.length < 3 || slug.length > 100) {
    return { isValid: false, error: 'Invalid length' };
  }
  // Format check
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { isValid: false, error: 'Invalid characters' };
  }
  // CA suffix check
  if (!slug.endsWith('-ca')) {
    return { isValid: false, error: 'Must end with -ca' };
  }
  return { isValid: true };
};
```

## Next Steps

1. **Prevent Duplicate Cities**:
   - Implement check for existing cities before adding new ones
   - Add warning or error message for duplicate cities
   - Provide option to update existing city instead of creating a duplicate

2. **Automate Coordinates**:
   - Implement Google Maps API integration
   - Add batch geocoding functionality
   - Add button to fetch coordinates automatically

3. **Data Enrichment**:
   - Add city population data
   - Add metropolitan area info
   - Add state/county data

4. **UI Improvements**:
   - Add coordinates display
   - Add map preview
   - Add bulk edit capabilities

## Related Documentation

- [City Management](./city-management.md)
- [Admin Cities Businesses](./admin-cities-businesses.md)
- [Admin Dashboard](./admin-dashboard.md)
- [Google Places Integration](../integrations/google-places.md)
- [Supabase Integration](../integrations/supabase.md)
- [GBP Batch Plan](../planning/gbp-batch-plan.md)

Last Updated: April 22, 2025

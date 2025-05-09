# Database Operations Index

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > Database Operations Index

This document serves as a searchable index of all database-related operations, scripts, and functions in the Water Damage CA project. Use this index to quickly find the right script or function for interacting with specific database tables.

## How to Use This Index

1. Use your browser's search function (Ctrl+F or Cmd+F) to search for:
   - Table names (e.g., "businesses", "cities")
   - Operation types (e.g., "count", "fetch", "update")
   - File types (e.g., "script", "function", "API")

2. Each entry includes:
   - File path
   - Description of functionality
   - Tables accessed
   - Example usage (where applicable)

## Scripts for Database Operations

### Count and Statistics Scripts

#### `scripts/count-businesses.js`
- **Description**: Counts businesses in the database with detailed statistics
- **Tables**: businesses, cities
- **Features**: 
  - Counts total businesses
  - Counts businesses by city
  - Counts businesses by rating
  - Counts businesses with reviews
  - Counts businesses with enriched data
  - Shows sample businesses
- **Usage**: `node scripts/count-businesses.js`

#### `scripts/check-batch-stats.js`
- **Description**: Checks batch process statistics for businesses and cities
- **Tables**: businesses, cities
- **Features**:
  - Counts total businesses
  - Counts enriched businesses
  - Counts total cities
  - Counts cities with has_gbp=true
  - Lists cities with/without has_gbp=true
  - Counts businesses per city
- **Usage**: `node scripts/check-batch-stats.js`

#### `scripts/check-database.js`
- **Description**: Checks database tables and their contents
- **Tables**: cities, services, businesses, business_services, content, faqs, reviews
- **Features**:
  - Checks if tables exist
  - Shows sample records from each table
- **Usage**: `node scripts/check-database.js`

### Data Manipulation Scripts

#### `scripts/enrich-all-businesses.js`
- **Description**: Enriches all businesses with AI-generated content
- **Tables**: businesses
- **Features**:
  - Fetches all businesses
  - Enriches businesses with AI content
  - Updates businesses in the database
- **Usage**: `node scripts/enrich-all-businesses.js`

#### `scripts/batch-enrich-businesses.ts`
- **Description**: Batch enriches businesses that need enrichment
- **Tables**: businesses
- **Features**:
  - Fetches businesses without enriched data
  - Enriches businesses in batches
  - Updates businesses in the database
- **Usage**: `npx ts-node scripts/batch-enrich-businesses.ts`

#### `scripts/inspect-database.mjs`
- **Description**: Inspects database structure and sample data
- **Tables**: businesses, cities, services
- **Features**:
  - Shows table structure
  - Shows sample data
- **Usage**: `node scripts/inspect-database.mjs`

## Library Functions for Database Operations

### Business Table Operations (`lib/database.ts`)

#### `getBusinesses(cityId?: string)`
- **Description**: Gets all businesses with optional city filtering
- **Tables**: businesses, cities, business_services, services
- **Returns**: Array of businesses with related data
- **Example**:
  ```typescript
  const { data, error } = await getBusinesses();
  // or
  const { data, error } = await getBusinesses("city-id-here");
  ```

#### `getBusinessById(id: string)`
- **Description**: Gets a business by ID
- **Tables**: businesses
- **Returns**: Single business object
- **Example**:
  ```typescript
  const { data, error } = await getBusinessById("business-id-here");
  ```

### Business Table Operations (`lib/business.ts`)

#### `getBusinessBySlug(businessSlug: string, citySlug: string)`
- **Description**: Gets a business by slug and city slug
- **Tables**: businesses, cities, business_services, services
- **Returns**: Business details object
- **Example**:
  ```typescript
  const { data, error } = await getBusinessBySlug("business-slug", "city-slug");
  ```

#### `getBusinessesByCityId(cityId: string)`
- **Description**: Gets businesses by city ID
- **Tables**: businesses
- **Returns**: Array of businesses
- **Example**:
  ```typescript
  const { data, error } = await getBusinessesByCityId("city-id-here");
  ```

#### `getBusinessesByCityAndService(cityId: string, serviceId: string)`
- **Description**: Gets businesses by city ID and service ID
- **Tables**: businesses, business_services
- **Returns**: Array of businesses
- **Example**:
  ```typescript
  const { data, error } = await getBusinessesByCityAndService("city-id", "service-id");
  ```

### City Table Operations (`lib/database.ts`)

#### `getCities()`
- **Description**: Gets all cities
- **Tables**: cities
- **Returns**: Array of cities
- **Example**:
  ```typescript
  const { data, error } = await getCities();
  ```

#### `getCityBySlug(slug: string)`
- **Description**: Gets a city by slug
- **Tables**: cities
- **Returns**: Single city object
- **Example**:
  ```typescript
  const { data, error } = await getCityBySlug("city-slug");
  ```

### Service Table Operations (`lib/database.ts`)

#### `getServices()`
- **Description**: Gets all services
- **Tables**: services
- **Returns**: Array of services
- **Example**:
  ```typescript
  const { data, error } = await getServices();
  ```

#### `getServiceBySlug(slug: string)`
- **Description**: Gets a service by slug
- **Tables**: services
- **Returns**: Single service object
- **Example**:
  ```typescript
  const { data, error } = await getServiceBySlug("service-slug");
  ```

## API Routes for Database Operations

### Business API Routes

#### `app/api/business/[business]/[city]/route.ts`
- **Description**: API route to get business by slug and city
- **Tables**: businesses, cities, business_services, services
- **Endpoint**: GET `/api/business/[business]/[city]`

#### `app/api/business/search/route.ts`
- **Description**: API route to search for businesses
- **Tables**: businesses
- **Endpoint**: GET `/api/business/search?query=[query]&limit=[limit]`

### Admin API Routes

#### `app/api/admin/batch-process/route.ts`
- **Description**: API route for batch processing
- **Tables**: businesses, cities
- **Endpoints**: 
  - GET `/api/admin/batch-process?action=getState`
  - POST `/api/admin/batch-process`

#### `app/api/admin/batch-process/refresh-stats/route.ts`
- **Description**: API route to refresh batch process statistics
- **Tables**: businesses, cities
- **Endpoint**: GET `/api/admin/batch-process/refresh-stats`

#### `app/api/admin/enrich-businesses/route.ts`
- **Description**: API route to enrich businesses
- **Tables**: businesses, cities
- **Endpoint**: POST `/api/admin/enrich-businesses`

### Test API Routes

#### `app/api/test/business-data.ts`
- **Description**: API route to get test business data
- **Tables**: businesses, cities, business_services, services
- **Endpoint**: GET `/api/test/business-data`

#### `app/api/test/list-businesses/route.ts`
- **Description**: API route to list businesses
- **Tables**: businesses, cities
- **Endpoint**: GET `/api/test/list-businesses`

## Database Schema

### Business Table Schema
- **id**: UUID (primary key)
- **name**: string
- **slug**: string
- **city_id**: UUID (foreign key to cities.id)
- **address**: string
- **phone**: string
- **website**: string
- **rating**: number
- **review_count**: number
- **place_id**: string
- **latitude**: number
- **longitude**: number
- **enriched_data**: JSON
- **enrichment_source**: string
- **created_at**: timestamp
- **updated_at**: timestamp

### City Table Schema
- **id**: UUID (primary key)
- **name**: string
- **slug**: string
- **state**: string
- **has_gbp**: boolean
- **latitude**: number
- **longitude**: number
- **created_at**: timestamp
- **updated_at**: timestamp

### Service Table Schema
- **id**: UUID (primary key)
- **name**: string
- **slug**: string
- **description**: string
- **emergency**: boolean
- **created_at**: timestamp
- **updated_at**: timestamp

### Business_Services Table Schema
- **id**: UUID (primary key)
- **business_id**: UUID (foreign key to businesses.id)
- **service_id**: UUID (foreign key to services.id)
- **is_primary**: boolean
- **created_at**: timestamp
- **updated_at**: timestamp

## Common Database Queries

### Count Total Businesses
```typescript
const { count, error } = await supabase
  .from('businesses')
  .select('*', { count: 'exact', head: true });
```

### Count Enriched Businesses
```typescript
const { count, error } = await supabase
  .from('businesses')
  .select('*', { count: 'exact', head: true })
  .not('enriched_data', 'is', null);
```

### Count Cities with has_gbp=true
```typescript
const { count, error } = await supabase
  .from('cities')
  .select('*', { count: 'exact', head: true })
  .eq('has_gbp', true);
```

### Count Businesses by City
```typescript
const { count, error } = await supabase
  .from('businesses')
  .select('*', { count: 'exact', head: true })
  .eq('city_id', cityId);
```

## Last Updated
This document was last updated on 2024-06-20.

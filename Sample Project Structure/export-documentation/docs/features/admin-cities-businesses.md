# Cities and Businesses Admin Pages

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Features](./index.md) > Admin Cities Businesses

## Cities Management

The Cities Management page provides a comprehensive interface for managing cities in the database. It allows administrators to add, edit, and delete cities, as well as search and filter the city list.

### Features

1. **City Listing**
   - Displays a paginated list of all cities in the database
   - Shows city ID, name, state, slug, and timestamps
   - Sortable columns for easy organization

2. **Search and Filter**
   - Search cities by name
   - Filter results with real-time updates

3. **Add City**
   - Add new cities to the database
   - Automatically generate slugs from city names
   - Validate input to ensure data integrity
   - Include latitude and longitude coordinates

4. **Edit City**
   - Update existing city information
   - Modify name, state, slug, latitude, and longitude
   - Automatically update timestamps

5. **Delete City**
   - Remove cities from the database
   - Confirmation to prevent accidental deletion

### Usage

1. **Viewing Cities**
   - Navigate to `/admin/cities`
   - Browse the paginated list of cities
   - Use the search box to find specific cities

2. **Adding a City**
   - Click the "Add City" button
   - Fill in the city name and state (default: CA)
   - Optionally provide a custom slug
   - Optionally provide latitude and longitude coordinates
   - Click "OK" to save

3. **Editing a City**
   - Click the edit icon next to a city
   - Modify the city information
   - Click "OK" to save changes

4. **Deleting a City**
   - Click the delete icon next to a city
   - Confirm the deletion

## Businesses Management

The Businesses Management page provides a comprehensive interface for managing businesses in the database. It allows administrators to add, edit, delete, and view detailed information about businesses, as well as search and filter the business list.

### Features

1. **Business Listing**
   - Displays a paginated list of all businesses in the database
   - Shows business ID, name, city, rating, review count, and enrichment status
   - Sortable columns for easy organization

2. **Search and Filter**
   - Search businesses by name
   - Filter by city
   - Combined search and filter for precise results

3. **Add Business**
   - Add new businesses to the database
   - Select city from dropdown
   - Enter business details including address, phone, website, rating, and review count
   - Automatically generate slugs from business names

4. **Edit Business**
   - Update existing business information
   - Modify all business details
   - Automatically update timestamps

5. **View Business Details**
   - Detailed view of business information
   - Display enriched data and metadata
   - Quick access to enrich content

6. **Delete Business**
   - Remove businesses from the database
   - Confirmation to prevent accidental deletion

### Usage

1. **Viewing Businesses**
   - Navigate to `/admin/businesses`
   - Browse the paginated list of businesses
   - Use the search box and city filter to find specific businesses

2. **Adding a Business**
   - Click the "Add Business" button
   - Fill in the business details
   - Select a city from the dropdown
   - Optionally provide a custom slug
   - Click "OK" to save

3. **Editing a Business**
   - Click the edit icon next to a business
   - Modify the business information
   - Click "OK" to save changes

4. **Viewing Business Details**
   - Click the view icon next to a business
   - Review detailed business information
   - Click "Enrich Content" to enrich the business data
   - Click "Close" to return to the list

5. **Deleting a Business**
   - Click the delete icon next to a business
   - Confirm the deletion

## Technical Implementation

### Client-Side (React)

The client-side implementation uses React with the following components:

- **State Management**: Uses React's useState and useEffect hooks to manage the state
- **UI Components**: Uses Tailwind CSS components for the user interface
- **API Integration**: Communicates with the Supabase database directly

### Database Integration

The pages interact with the Supabase database using the following tables:

- **cities**: Stores city information
- **businesses**: Stores business information

### Error Handling

The pages include comprehensive error handling:

- **Input Validation**: Validates user input before saving
- **Error Messages**: Displays user-friendly error messages
- **Loading States**: Shows loading indicators during database operations

## Integration with Other Admin Pages

The Cities and Businesses Management pages integrate with other admin pages:

- **Dashboard**: Shows statistics on cities and businesses
- **Batch Process**: Adds cities and businesses through batch processing
- **Enrich Businesses**: Enriches business data with additional information

## Future Enhancements

- Add bulk import/export functionality
- Implement more advanced filtering options
- Add data visualization for business metrics
- Implement user roles and permissions
- Add duplicate city check before adding new cities
- Add Google Maps API integration for automatic geocoding of cities

## Related Documentation

- [Admin Dashboard](./admin-dashboard.md)
- [Admin Batch Process](../processes/admin-batch-process.md)
- [City Management](./city-management.md)
- [Business Profile Implementation](./business-profile-implementation.md)
- [Data Enrichment](./data-enrichment.md)
- [Google Places Integration](../integrations/google-places.md)
- [Supabase Integration](../integrations/supabase.md)

Last Updated: April 22, 2025

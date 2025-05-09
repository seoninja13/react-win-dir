# Business Profile Implementation Guide

## Overview

This guide explains how to work with the business profile components in the Water Damage CA project. These components display business information from Google Places API data stored in Supabase on business detail pages.

## Project Structure

The business profile implementation consists of several key components:

1. **GoogleBusinessProfile Component**: Displays business information in a structured format
2. **BusinessProfileWrapper**: Client-side wrapper that fetches and displays business data
3. **Business Detail Page**: Dynamic route page that displays business information
4. **Test Pages**: Pages for testing components and data fetching

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account with proper credentials
- Environment variables set up (see `.env.example`)

### Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx netlify dev
   ```

3. Access the application at `http://localhost:8888`

## Key Components

### GoogleBusinessProfile Component

**Location**: `/components/GoogleBusinessProfile.tsx`

This component is responsible for displaying business information in a user-friendly format. It takes a `BusinessDetails` object as input and renders it.

**Usage Example**:
```tsx
import GoogleBusinessProfile from '@/components/GoogleBusinessProfile';

// With business data from Supabase
<GoogleBusinessProfile business={businessDetails} />
```

### BusinessProfileWrapper Component

**Location**: `/app/[business]-[city]-ca/BusinessProfileWrapper.tsx`

This client-side wrapper fetches business data from Supabase and renders the `GoogleBusinessProfile` component.

**Usage Example**:
```tsx
import BusinessProfileWrapper from './BusinessProfileWrapper';

// In a server component
<BusinessProfileWrapper 
  businessSlug="los-angeles-flood-masters" 
  citySlug="los-angeles" 
/>
```

## Data Flow

1. User navigates to a business detail page (e.g., `/los-angeles-flood-masters-los-angeles-ca`)
2. The server component extracts the business and city slugs from the URL
3. The `BusinessProfileWrapper` component receives these slugs
4. The wrapper fetches data from Supabase and renders the `GoogleBusinessProfile` component

## Business Data Structure

The `BusinessDetails` interface (defined in `/lib/types/business.ts`) has been updated with the following structure:

### Core Properties
- Basic information (name, description, address, phone, website)
- Location data (latitude, longitude)
- Rating (numerical value)
- Services offered (array of service names)
- Emergency availability (available status and response time)
- City information (name and state only)
- Hours of operation (Record type mapping days to hours)
- Photos (array with required reference, width, and height)

### Enriched Data (Optional)
The interface now includes an optional `enriched_data` field with AI-enhanced content:

```typescript
enriched_data?: {
  reviewInsights?: {
    summary?: string;
    strengths?: string[];
    testimonialHighlights?: string[];
  };
  serviceDetails?: {
    certifications?: string[];
    primaryServices?: Array<{
      name: string;
      description: string;
    }>;
  };
  remediationProcess?: {
    steps?: string[];
    description?: string;
  };
  restorationTechniques?: {
    dryingTechniques?: string[];
    specializedEquipment?: string[];
  };
}
```

### Recent Changes (04/17/2025)
- Removed unnecessary properties (id, slug, place_id, review_count, reviews)
- Simplified city object to only include name and state
- Changed hours format to use Record type
- Made photo dimensions (width/height) required
- Added comprehensive null safety handling
- Added optional enriched data structure

## Testing Components

### Test Components Page

**Location**: `/app/test-components/page.tsx`

This page allows you to test the `GoogleBusinessProfile` component with mock data.

**Access**: `http://localhost:8888/test-components`

### Supabase Test Page

**Location**: `/app/test-supabase/page.tsx`

This page tests Supabase connectivity and data retrieval.

**Access**: `http://localhost:8888/test-supabase`

### Standalone Business Profile Page

**Location**: `/app/business-profile/page.tsx`

This page allows you to test business profile display with specific business and city slugs.

**Access**: `http://localhost:8888/business-profile?business=los-angeles-flood-masters&city=los-angeles`

## Troubleshooting

### Component Not Displaying

If the business profile isn't displaying:

1. Check the browser console for errors
2. Verify that the business and city slugs are correct
3. Test the component on the test pages
4. Check Supabase connectivity and data

### Data Issues

If business data is incorrect or missing:

1. Use the Supabase test page to verify data retrieval
2. Check the business and city slugs in the URL
3. Verify that the business exists in the Supabase database
4. Check the data structure against the `BusinessDetails` interface

## Adding New Features

### Adding New Business Information Fields

1. Update the `BusinessDetails` interface in `/lib/types/business.ts`
   - Add new fields with proper TypeScript types
   - Use optional properties when appropriate
   - Follow the established pattern for nested objects

2. Modify the data transformation in `BusinessProfileWrapper.tsx`
   - Add proper null checks for new fields
   - Use optional chaining for nested properties
   - Provide default values where appropriate
   - Transform data to match the interface requirements

3. Update the `GoogleBusinessProfile` component to display the new fields
   - Add conditional rendering for optional fields
   - Include proper loading states
   - Handle missing data gracefully
   - Follow the established styling patterns

4. Update the enriched data handling if needed
   - Modify the enrichment process in relevant files
   - Update the admin interface if necessary
   - Add new fields to the enrichment flow

### Styling Changes

The components use Tailwind CSS for styling. To modify the appearance:

1. Edit the class names in the respective component files
2. For global styles, update `/app/globals.css`

## Best Practices

1. **Client vs. Server Components**:
   - Use server components for data fetching when possible
   - Use client components for interactive elements
   - Pass minimal data between server and client components

2. **Error Handling**:
   - Always include loading and error states
   - Provide helpful error messages to users
   - Log detailed errors to the console for debugging
   - Use proper null safety checks with optional chaining
   - Provide fallback values using nullish coalescing
   - Handle missing enriched data gracefully

3. **Testing**:
   - Test components in isolation on the test pages
   - Verify data fetching with the Supabase test page
   - Test the complete flow on the actual business detail pages

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)

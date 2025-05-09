# Google Business Profile Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Planning](./index.md) > GBP Integration

## Overview

This document tracks the implementation of the Google Business Profile (GBP) component for business pages on the Water Damage CA website. The GBP component displays business information fetched from Supabase, which stores data originally sourced from the Google Places API.

## Implementation Details

### Architecture

- **Data Source**: Supabase database (replacing the deprecated Google Sheets integration)
- **API Endpoint**: `/api/business/[business]/[city]` - Fetches business data from Supabase
- **Component**: `GoogleBusinessProfile.tsx` - React component for displaying business information
- **Injection Script**: `inject-gbp.js` - Client-side script that dynamically loads and renders the GBP component on business pages

### Cost Optimization

In line with our Google Places API cost optimization strategy, this implementation:

- Uses data stored in Supabase, which is populated from cached Google Places API responses
- Avoids direct API calls to Google Places API on each page load
- Displays only essential business information (name, address, contact info, services, etc.)

### Technical Implementation

#### 1. Component Build Process

- The `GoogleBusinessProfile` component is built using esbuild
- The build script (`scripts/build-components.cjs`) bundles the component with all its dependencies
- The bundled component is output to `/public/components/GoogleBusinessProfile.js`

#### 2. Injection Script

The `inject-gbp.js` script handles:

- Dynamic loading of React and ReactDOM if they're not already available
- URL pattern matching to detect business pages
- Creating or finding the container element for the GBP component
- Fetching business data from the API endpoint
- Dynamically importing and rendering the GBP component

#### 3. Integration with Next.js

- The injection script is loaded in the layout component using Next.js `Script` component
- The script runs on the client side and doesn't interfere with server-side rendering

## Progress Log

### April 13, 2025

- **Initial Implementation**: Created the basic GBP component and injection script
- **Issues Encountered**:
  - Hydration errors due to conflicts between Next.js and dynamically loaded React
  - Container element not found on the page
  - Module resolution errors for React and Next.js dependencies
- **Solutions Implemented**:
  - Updated the injection script to dynamically load React and ReactDOM only when needed
  - Modified the component build script to include all dependencies in the bundle
  - Implemented a more robust container element creation strategy
  - Removed Next.js Link dependency from the component
  - Improved positioning logic to ensure the component appears above the fold
- **Positioning Improvements**:
  - Implemented multiple insertion strategies to find the optimal placement:
    1. After the hero section (first section or div)
    2. After the first h1 heading's container
    3. After emergency call sections with phone links
    4. After the first paragraph or its container
  - Added detailed debugging to help diagnose DOM structure issues
  - Enhanced container traversal logic for nested DOM structures

## Final Implementation Details

### Key Features

1. **Dynamic Dependency Loading**:
   - Checks if React and ReactDOM are already available in the global scope
   - Dynamically loads them if needed by injecting script tags
   - Waits for dependencies to be available before proceeding

2. **Smart URL Pattern Matching**:
   - Detects business page URLs using regex patterns
   - Extracts business slug and city slug from the URL
   - Supports multiple URL patterns for flexibility

3. **Intelligent DOM Insertion**:
   - Uses multiple strategies to find the optimal placement
   - Ensures the component appears above the fold for maximum visibility
   - Falls back to simpler insertion methods if preferred locations aren't found

4. **Error Handling and Logging**:
   - Comprehensive logging throughout the process
   - Detailed error messages for troubleshooting
   - Graceful fallbacks when optimal conditions aren't met

### Performance Considerations

- The script is loaded with the `strategy="afterInteractive"` option to avoid blocking page rendering
- Component bundle is loaded only when needed (on business pages)
- React and ReactDOM are loaded dynamically to prevent conflicts with Next.js hydration

## Status: COMPLETED ✅

The Google Business Profile integration is now fully functional and properly positioned above the fold on business pages. The implementation successfully:

1. Detects business pages based on URL patterns
2. Dynamically loads necessary dependencies
3. Creates a container element in a prominent position
4. Fetches business data from the API
5. Renders the GBP component with the business information

All identified issues have been resolved, and the component now displays correctly on business pages with proper positioning above the fold.

## Future Enhancements

- Add error handling for cases where business data is not available
- Implement loading state improvements for better user experience
- Add analytics tracking for GBP component interactions
- Consider implementing a fallback UI for when the component fails to load
- Optimize component styling for better mobile responsiveness

## Related Documentation

- [GBP Batch Plan](./gbp-batch-plan.md)
- [GBP Enrichment Plan](./gbp-enrichment-plan.md)
- [Google Places Integration](../integrations/google-places.md)
- [Business Profile Implementation](../features/business-profile-implementation.md)
- [Supabase Integration](../integrations/supabase.md)

Last Updated: April 22, 2025

# SEO-Optimized Images Implementation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Features](./index.md) > SEO Images Implementation

## Overview

This document details the implementation of SEO-optimized images throughout the Water Damage CA website, enhancing visual appeal while improving SEO performance.

## Table of Contents

1. [Overview](#overview)
2. [Components Created](#components-created)
3. [Schema Markup](#schema-markup)
4. [API Integration](#api-integration)
5. [Caching Strategy](#caching-strategy)
6. [Fallback Images](#fallback-images)
7. [Page Modifications](#page-modifications)
8. [SEO Optimizations](#seo-optimizations)
9. [Technical Considerations](#technical-considerations)
10. [Compliance with Pixabay Requirements](#compliance-with-pixabay-requirements)
11. [Future Improvements](#future-improvements)

## Overview

We've integrated Pixabay API to dynamically fetch relevant, high-quality images for both service pages and the home page. This implementation focuses on:

- Improving visual appeal with relevant, high-quality images
- Enhancing SEO with proper alt text, schema markup, and image optimization
- Ensuring compliance with Pixabay's attribution requirements
- Implementing efficient caching to reduce API calls
- Providing fallback images for reliability

## Components Created

### ServiceImage Component

- **Purpose**: Fetches and displays service-specific images on service-city pages
- **Location**: `components/ServiceImage.tsx`
- **Features**:
  - Dynamic image fetching based on service type and city
  - 24-hour caching per Pixabay API requirements
  - Fallback images for different service types
  - SEO-optimized alt text generation
  - Proper attribution with photographer credit
  - Error handling and loading states

### HomeImage Component

- **Purpose**: Displays category-specific images on the home page
- **Location**: `components/HomeImage.tsx`
- **Features**:
  - Category-based image selection (hero, emergency, services, etc.)
  - 24-hour caching per Pixabay API requirements
  - Fallback images for each category
  - SEO-optimized alt text generation
  - Proper attribution with photographer credit
  - Error handling and loading states

## Schema Markup

Added `generateImageSchema` function to `lib/schema.ts` to create structured data for images following Schema.org ImageObject specification, enhancing SEO by providing search engines with detailed information about images.

```typescript
// Example of the schema markup function
export const generateImageSchema = (image: {
  url: string;
  width?: number;
  height?: number;
  alt: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: image.url,
    width: image.width,
    height: image.height,
    alt: image.alt,
  };
};
```

## API Integration

### Pixabay API

- **API Key**: `266184-72cde13a76b1e8da8d7d65d14`
- **Endpoint**: `https://pixabay.com/api/`
- **Parameters**:
  - `key`: API key
  - `q`: Search query (service + city or category-specific)
  - `image_type`: "photo"
  - `orientation`: "horizontal"
  - `safesearch`: true
  - `per_page`: 3
  - `lang`: "en"

Example API call:

```typescript
const response = await fetch(
  `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&lang=en`
);
```

## Caching Strategy

- **Duration**: 24 hours (per Pixabay API requirements)
- **Storage**: Browser localStorage
- **Structure**:

  ```typescript
  interface CachedImage {
    url: string;
    timestamp: number;
    altText: string;
    attribution: string;
    sourceUrl: string;
  }
  ```

- **Keys**:
  - Service pages: `pixabay_image_${service}_${city}`
  - Home page: `pixabay_home_image_${category}`

## Fallback Images

Default images from Pixabay are used as fallbacks when API requests fail or return no results:

### Service Types

- Water damage: `https://cdn.pixabay.com/photo/2019/04/08/15/24/basement-4112569_1280.jpg`
- Mold: `https://cdn.pixabay.com/photo/2020/04/25/10/15/mold-5090355_1280.jpg`
- Fire: `https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg`
- Flood: `https://cdn.pixabay.com/photo/2018/06/10/23/33/flood-3467988_1280.jpg`
- Restoration: `https://cdn.pixabay.com/photo/2017/03/18/17/42/reconstruction-2154662_1280.jpg`

### Home Page Categories

- Hero: `https://cdn.pixabay.com/photo/2018/01/31/07/36/water-3120193_1280.jpg`
- Emergency: `https://cdn.pixabay.com/photo/2019/04/08/15/24/basement-4112569_1280.jpg`
- Services: `https://cdn.pixabay.com/photo/2020/04/25/10/15/mold-5090355_1280.jpg`
- Cities: `https://cdn.pixabay.com/photo/2019/07/05/06/51/golden-gate-bridge-4317939_1280.jpg`
- Why: `https://cdn.pixabay.com/photo/2017/03/18/17/42/reconstruction-2154662_1280.jpg`
- Testimonials: `https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg`

## Page Modifications

### Service-City Pages

- Added hero image at the top of the page
- Added process section image
- Added facts section image
- Enhanced layout with responsive grid
- Added image schema markup

### Home Page

- Added hero image with overlay
- Added images to all major sections
- Enhanced layout with responsive grid
- Added image schema markup

## SEO Optimizations

- **Alt Text**: Dynamically generated with service/city or category information plus image tags
- **Schema Markup**: Added ImageObject schema for better search engine understanding
- **Responsive Sizing**: Proper image sizing for all devices
- **Priority Loading**: Hero images use priority loading for better LCP metrics
- **Attribution**: Proper attribution as required by Pixabay

## Technical Considerations

### Performance Optimizations

- **Next.js Image Component**: Used for automatic optimization, lazy loading, and responsive sizing
- **Initial Fallback**: Images initialize with fallbacks to prevent layout shift
- **Loading States**: Placeholder shown during loading for better UX
- **Error Handling**: Automatic fallback to default images on error

### Server-Side Rendering Compatibility

- Components check for browser environment before accessing localStorage
- Initial state includes fallback images to work with SSR
- Loading state properly handled in both client and server environments

### Error Handling

- Try/catch blocks around localStorage operations
- Error state for image loading failures
- Console logging for debugging
- Automatic fallback to default images

## Compliance with Pixabay Requirements

1. **Attribution**: All images include proper attribution with photographer name and link to source
2. **Caching**: Images are cached for 24 hours as per API requirements
3. **Usage**: Images are downloaded and served from Pixabay's CDN, not hotlinked
4. **Safe Search**: Safe search parameter enabled for all requests

## Future Improvements

1. **Server-Side Caching**: Implement server-side caching for better performance
2. **Image Optimization**: Further optimize images for different devices and screen sizes
3. **Lazy Loading**: Implement lazy loading for non-critical images
4. **Custom Image Selection**: Allow manual selection of images for specific services/cities
5. **Image Analytics**: Track image performance and user engagement

## Related Documentation

- [SEO Images Developer Guide](../architecture/seo-images.md)
- [SEO Structure](../architecture/seo-structure.md)
- [Business Profile Implementation](./business-profile-implementation.md)
- [City Management](./city-management.md)
- [Google Places Integration](../integrations/google-places.md)

Last Updated: April 22, 2025

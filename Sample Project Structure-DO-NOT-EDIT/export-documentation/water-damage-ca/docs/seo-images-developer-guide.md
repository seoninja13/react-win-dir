# SEO Images Developer Guide
## Water Damage CA Website Project

This guide provides instructions for developers working with the SEO-optimized images implementation in the Water Damage CA website. It covers how to maintain, extend, and troubleshoot the image components.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Component Usage](#component-usage)
3. [Adding New Image Categories](#adding-new-image-categories)
4. [Modifying Fallback Images](#modifying-fallback-images)
5. [Troubleshooting](#troubleshooting)
6. [Best Practices](#best-practices)

## Getting Started

The Water Damage CA website uses two main components for SEO-optimized images:

- `ServiceImage`: For service-city pages
- `HomeImage`: For the home page

Both components fetch images from Pixabay API and include caching, fallback images, and proper attribution.

### Prerequisites

- Pixabay API key (currently using: `266184-72cde13a76b1e8da8d7d65d14`)
- Understanding of Next.js Image component
- Familiarity with localStorage for client-side caching

## Component Usage

### ServiceImage Component

Use this component on service-city pages to display service-specific images:

```tsx
import ServiceImage from '@/components/ServiceImage';

// Basic usage
<ServiceImage 
  service="water-damage-restoration" 
  city="Sacramento" 
/>

// With additional props
<ServiceImage 
  service="mold-remediation" 
  city="Los Angeles" 
  className="rounded-xl shadow-lg" 
  priority={true} 
  width={1200} 
  height={600} 
  alt="Professional mold remediation services in Los Angeles" 
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| service | string | Required | Service slug or name |
| city | string | Required | City name |
| className | string | '' | Additional CSS classes |
| priority | boolean | false | Set to true for LCP images |
| width | number | 800 | Image width |
| height | number | 500 | Image height |
| alt | string | Generated | Custom alt text |

### HomeImage Component

Use this component on the home page for different sections:

```tsx
import HomeImage from '@/components/HomeImage';

// Basic usage
<HomeImage 
  category="hero" 
/>

// With additional props
<HomeImage 
  category="services" 
  className="rounded-xl shadow-lg" 
  priority={true} 
  width={1200} 
  height={600} 
  alt="Water damage restoration services in California" 
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| category | string | Required | Image category (hero, emergency, services, cities, why, testimonials) |
| className | string | '' | Additional CSS classes |
| priority | boolean | false | Set to true for LCP images |
| width | number | 800 | Image width |
| height | number | 500 | Image height |
| alt | string | Generated | Custom alt text |

## Adding New Image Categories

### For ServiceImage

To add support for a new service type:

1. Update the `getFallbackImage` function in `ServiceImage.tsx`:

```typescript
const getFallbackImage = (serviceType: string): string => {
  const serviceTypeLower = serviceType.toLowerCase();
  
  if (serviceTypeLower.includes('water')) return DEFAULT_FALLBACKS.water;
  if (serviceTypeLower.includes('mold')) return DEFAULT_FALLBACKS.mold;
  if (serviceTypeLower.includes('fire')) return DEFAULT_FALLBACKS.fire;
  if (serviceTypeLower.includes('flood')) return DEFAULT_FALLBACKS.flood;
  // Add your new service type check here
  if (serviceTypeLower.includes('new-service')) return DEFAULT_FALLBACKS.newService;
  
  return DEFAULT_FALLBACKS.restoration;
};
```

2. Add the new fallback image to the `DEFAULT_FALLBACKS` object:

```typescript
const DEFAULT_FALLBACKS = {
  water: 'https://cdn.pixabay.com/photo/2019/04/08/15/24/basement-4112569_1280.jpg',
  mold: 'https://cdn.pixabay.com/photo/2020/04/25/10/15/mold-5090355_1280.jpg',
  fire: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg',
  flood: 'https://cdn.pixabay.com/photo/2018/06/10/23/33/flood-3467988_1280.jpg',
  restoration: 'https://cdn.pixabay.com/photo/2017/03/18/17/42/reconstruction-2154662_1280.jpg',
  // Add your new service type here
  newService: 'https://cdn.pixabay.com/photo/your-new-image-path.jpg'
};
```

3. Update the search query formatting in the `fetchImage` function:

```typescript
// Add specific terms based on service type
if (formattedService.includes('water damage')) {
  searchQuery = `water damage restoration flood`;
} else if (formattedService.includes('mold')) {
  searchQuery = `mold remediation removal`;
} 
// Add your new service type here
else if (formattedService.includes('new-service')) {
  searchQuery = `new service specific keywords`;
}
```

### For HomeImage

To add a new category to the HomeImage component:

1. Update the `DEFAULT_FALLBACKS` object in `HomeImage.tsx`:

```typescript
const DEFAULT_FALLBACKS = {
  hero: 'https://cdn.pixabay.com/photo/2018/01/31/07/36/water-3120193_1280.jpg',
  emergency: 'https://cdn.pixabay.com/photo/2019/04/08/15/24/basement-4112569_1280.jpg',
  services: 'https://cdn.pixabay.com/photo/2020/04/25/10/15/mold-5090355_1280.jpg',
  cities: 'https://cdn.pixabay.com/photo/2019/07/05/06/51/golden-gate-bridge-4317939_1280.jpg',
  why: 'https://cdn.pixabay.com/photo/2017/03/18/17/42/reconstruction-2154662_1280.jpg',
  testimonials: 'https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg',
  // Add your new category here
  newCategory: 'https://cdn.pixabay.com/photo/your-new-image-path.jpg'
};
```

2. Update the search query formatting in the `fetchImage` function:

```typescript
// Format search query based on category
let searchQuery = '';
switch (category) {
  case 'hero':
    searchQuery = 'water damage restoration flood emergency';
    break;
  case 'emergency':
    searchQuery = 'water damage emergency flood';
    break;
  // Add your new category here
  case 'newCategory':
    searchQuery = 'your new category search terms';
    break;
  default:
    searchQuery = `water damage ${category}`;
}
```

## Modifying Fallback Images

When selecting new fallback images:

1. Only use images from Pixabay to ensure proper licensing
2. Choose high-resolution images (at least 1280px wide)
3. Select images that are relevant to the service or category
4. Ensure images are horizontally oriented for consistent layout
5. Test how images look in both light and dark modes
6. Update the `DEFAULT_FALLBACKS` object in the respective component

Example:

```typescript
const DEFAULT_FALLBACKS = {
  water: 'https://cdn.pixabay.com/photo/NEW_IMAGE_PATH.jpg',
  // Other fallbacks...
};
```

## Troubleshooting

### Common Issues

#### Images Not Loading

1. Check browser console for errors
2. Verify Pixabay API key is valid
3. Check network tab to see if API requests are being made
4. Clear localStorage cache by running:
   ```javascript
   // In browser console
   localStorage.clear();
   ```
5. Verify fallback images are accessible

#### Layout Shift Issues

If you notice layout shifts when images load:

1. Ensure initial state includes fallback image URL
2. Check that width and height props are consistent
3. Use the `priority` prop for above-the-fold images
4. Verify loading state UI has the same dimensions as the image

#### Server-Side Rendering Issues

If you encounter errors during SSR:

1. Ensure all localStorage access is wrapped in `typeof window !== 'undefined'` checks
2. Initialize state with fallback images
3. Handle loading state properly in both client and server environments

## Best Practices

### SEO Optimization

1. Always provide descriptive alt text that includes:
   - Service name
   - City name (if applicable)
   - Relevant keywords

2. Use schema markup for images:
   ```tsx
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{
       __html: JSON.stringify(generateImageSchema({
         url: imageUrl,
         width: 800,
         height: 500,
         alt: imageAlt
       }))
     }}
   />
   ```

### Performance Optimization

1. Use the `priority` prop for above-the-fold images
2. Set appropriate `width` and `height` props
3. Use responsive sizing with the `sizes` prop
4. Consider lazy loading for below-the-fold images

### Caching Strategy

The current implementation uses localStorage with a 24-hour cache duration (per Pixabay API requirements). If you need to modify this:

1. Update the `CACHE_DURATION` constant in both components
2. Ensure cache keys remain unique for different service-city combinations
3. Consider implementing server-side caching for better performance

## Related Documentation

- [SEO Images Implementation](./seo-images-implementation.md)
- [Developer Onboarding Guide](./developer-onboarding.md)
- [Pixabay API Documentation](https://pixabay.com/api/docs/)

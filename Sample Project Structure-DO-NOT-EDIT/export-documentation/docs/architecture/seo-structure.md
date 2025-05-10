# Water Damage CA - SEO Structure & Sitemap

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > SEO Structure

This document outlines the complete SEO-optimized structure for the Water Damage CA website, including URL patterns, metadata strategies, schema markup, and sitemap generation.

## URL Structure

The website follows a carefully planned URL structure to maximize SEO value:

### Primary URL Patterns

| Page Type | URL Pattern | Example | Priority |
|-----------|-------------|---------|----------|
| Home | / | https://waterdamage-ca.com/ | 1.0 |
| City Landing | /[city-slug] | /los-angeles | 0.8 |
| Service Landing | /services/[service-slug] | /services/water-damage-restoration | 0.8 |
| City-Service | /[service-slug]-[city-slug]-ca | /water-damage-restoration-los-angeles-ca | 0.7-0.9 |
| Business Profile | /[business-slug]-[city-slug]-ca | /abc-restoration-los-angeles-ca | 0.6 |
| Static Pages | /[page-slug] | /about, /contact | 0.3-0.5 |

### URL Design Principles

1. **Keyword-Rich**: Each URL contains primary keywords (service type, city name)
2. **Hierarchical**: Clear content hierarchy with logical URL structure
3. **Readable**: Human-readable URLs with hyphens separating words
4. **Consistent**: Follows consistent patterns across the site
5. **Concise**: Keeps URLs as short as possible while maintaining SEO value

## Metadata Strategy

### Title Tag Format

| Page Type | Title Format | Example |
|-----------|--------------|---------|
| Home | Water Damage & Mold Removal Services in California | Water Damage & Mold Removal Services in California |
| City Landing | Water Damage & Mold Removal in [City], CA | Water Damage & Mold Removal in Los Angeles, CA |
| Service Landing | [Service] Services in California | Water Damage Restoration Services in California |
| City-Service | [Service] in [City], CA - 24/7 Emergency Service | Water Damage Restoration in Los Angeles, CA - 24/7 Emergency Service |
| Business Profile | [Business Name] - [Service] in [City], CA | ABC Restoration - Water Damage Experts in Los Angeles, CA |

### Meta Description Strategy

| Page Type | Description Format | Character Count |
|-----------|-------------------|-----------------|
| Home | Professional water damage and mold removal services across California. 24/7 emergency response, licensed technicians, and free estimates. | 140-160 |
| City Landing | Expert water damage and mold removal services in [City], CA. Fast response, licensed professionals, and free estimates for all [City] residents. | 140-160 |
| Service Landing | Professional [service] services throughout California. [Key benefit 1], [Key benefit 2], and [Key benefit 3]. Call now for a free estimate! | 140-160 |
| City-Service | Need [service] in [City], CA? Our expert technicians provide 24/7 emergency service, free estimates, and guaranteed work. Call now! | 140-160 |
| Business Profile | [Business Name] provides professional [service] in [City], CA. [USP]. [Years] of experience, [rating] star rating. Contact now! | 140-160 |

### Canonical Tags

- Implemented on all pages to prevent duplicate content issues
- Format: `<link rel="canonical" href="https://waterdamage-ca.com/[full-path]" />`
- Dynamic generation based on current URL

### Hreflang Tags

- Not implemented in initial phase (English-only content)
- Reserved for future multi-language expansion

## Heading Structure

### H1 Heading Format

| Page Type | H1 Format | Example |
|-----------|-----------|---------|
| Home | Water Damage & Mold Removal Services in California | Water Damage & Mold Removal Services in California |
| City Landing | Water Damage & Mold Removal in [City], California | Water Damage & Mold Removal in Los Angeles, California |
| Service Landing | Professional [Service] Services in California | Professional Water Damage Restoration Services in California |
| City-Service | [Service] in [City], California | Water Damage Restoration in Los Angeles, California |
| Business Profile | [Business Name]: [Service] Experts in [City], CA | ABC Restoration: Water Damage Experts in Los Angeles, CA |

### Subheading Structure

Each page follows a consistent heading hierarchy:

- **H1**: Main page title (only one per page)
- **H2**: Major section headings
- **H3**: Subsection headings
- **H4**: Minor section headings
- **H5/H6**: Rarely used, only for deep content hierarchy

## Schema Markup Implementation

### LocalBusiness Schema

Applied to business profile pages:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "image": "[Business Image URL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "addressRegion": "CA",
    "postalCode": "[Zip Code]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [Latitude],
    "longitude": [Longitude]
  },
  "url": "https://waterdamage-ca.com/[business-slug]-[city-slug]-ca",
  "telephone": "[Phone Number]",
  "priceRange": "$$-$$$",
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[Rating]",
    "reviewCount": "[Review Count]"
  }
}
```

### Service Schema

Applied to service pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "serviceType": "[Service Type]",
  "areaServed": {
    "@type": "City",
    "name": "[City Name]",
    "sameAs": "https://en.wikipedia.org/wiki/[City_Name],_California"
  },
  "provider": {
    "@type": "LocalBusiness",
    "name": "Water Damage CA",
    "telephone": "[Phone Number]",
    "priceRange": "$$-$$$"
  },
  "description": "[Service Description]",
  "offers": {
    "@type": "Offer",
    "price": "[Starting Price]",
    "priceCurrency": "USD"
  }
}
```

### FAQ Schema

Applied to pages with FAQ sections:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer 1]"
      }
    },
    {
      "@type": "Question",
      "name": "[Question 2]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer 2]"
      }
    }
  ]
}
```

### BreadcrumbList Schema

Applied to all pages:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://waterdamage-ca.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Parent Category]",
      "item": "https://waterdamage-ca.com/[parent-path]"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Current Page]"
    }
  ]
}
```

## Sitemap Generation

The website implements a comprehensive XML sitemap strategy:

### Sitemap Structure

- **Sitemap Index**: Main sitemap.xml file that references all individual sitemaps
- **Individual Sitemaps**: Split by page type and limited to 2,500 URLs each
- **Priority Weighting**: Higher priority for emergency services and main landing pages
- **Change Frequency**: Weekly for dynamic content, monthly for static pages
- **Last Modified**: Dynamically generated based on content updates

### Sitemap Generation Process

1. Fetch all cities, services, and businesses from the database
2. Generate URLs for all page types with appropriate metadata
3. Split URLs into chunks of 2,500 or fewer
4. Generate individual sitemap XML files
5. Create sitemap index file referencing all individual sitemaps
6. Automatically regenerate when content is updated

### Implementation

The sitemap generation is implemented in `scripts/generate-sitemap.js` and can be run manually or as part of the build process.

## Image Optimization

### Image Naming Convention

- Format: `[descriptive-name]-[dimensions].[extension]`
- Example: `water-damage-restoration-los-angeles-800x600.webp`

### Image Metadata

- All images include appropriate alt text
- Descriptive filenames with keywords
- Proper image dimensions for each usage context
- WebP format with JPEG/PNG fallbacks

### Lazy Loading

- Implemented for all non-critical images
- Critical images loaded with priority
- Proper image sizing with srcset for responsive images

## Performance Optimization

### Core Web Vitals Optimization

- **LCP (Largest Contentful Paint)**: < 2.5s
  - Optimized image loading
  - Server-side rendering for critical content
  - Efficient caching strategy
  
- **FID (First Input Delay)**: < 100ms
  - Minimal JavaScript on initial load
  - Code splitting and lazy loading
  - Optimized event handlers
  
- **CLS (Cumulative Layout Shift)**: < 0.1
  - Pre-defined image dimensions
  - Stable font loading
  - Reserved space for dynamic content

### Caching Strategy

- 24-hour ISR (Incremental Static Regeneration) for dynamic pages
- 6-month caching for static assets
- CDN distribution via Netlify

## Mobile Optimization

- Fully responsive design
- Mobile-first approach
- Touch-friendly UI elements
- Optimized for mobile page speed

## Implementation Plan

1. Set up base URL structure and routing patterns
2. Implement metadata generation for all page types
3. Create schema markup templates
4. Set up sitemap generation script
5. Implement image optimization strategy
6. Configure performance monitoring
7. Test and validate all SEO elements

## Monitoring and Validation

- Regular testing with Google Search Console
- Schema validation with Schema.org Validator
- Sitemap validation and submission
- Core Web Vitals monitoring
- Regular SEO audits

## Related Documentation

- [Website Architecture](./website-architecture.md)
- [Technical Implementation Plan](./technical-implementation-plan.md)
- [Data Flow](./data-flow.md)

Last Updated: April 22, 2025

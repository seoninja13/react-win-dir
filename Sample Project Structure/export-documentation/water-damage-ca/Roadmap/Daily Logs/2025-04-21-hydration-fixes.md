# 2025-04-21: Layout and Schema Hydration Fixes

## Changes Made

### 1. Root Layout Component (`app/layout.tsx`)

#### Removed Client-Side Features
- Removed `'use client'` directive since metadata export is incompatible with client components
- Removed `useMemo` hook since schema generation is now server-side only
- Removed dynamic imports that were causing hydration mismatches

#### Schema Generation
- Moved schema generation outside the component:
```typescript
// Pre-generate the schema data at module level
const websiteSchema = generateWebsiteSchema();
const organizationSchema = generateOrganizationSchema();
```
- Schema is now generated once at build time instead of per-request

#### Metadata Configuration
- Kept metadata export in the same file since it's server-side only
- Added comprehensive OpenGraph metadata
- Added proper robots and alternate configurations

### 2. Schema Generation (`lib/schema.ts`)

#### Static Configuration
- Replaced dynamic environment variables with static values to ensure consistent output:
```typescript
const siteName = "Water Damage CA";
const siteUrl = "https://waterdamage-ca.com";
const sitePhone = "1-800-555-1234";
const siteLogoUrl = "https://waterdamage-ca.com/images/logo.png";
```

#### Schema Improvements
- Added more detailed organization schema with contact points and social media
- Added search action to website schema
- Ensured consistent URL formatting across all schemas

## Technical Details

### Hydration Issue Resolution
The main hydration issue was caused by:
1. Using `'use client'` with `metadata` export (Next.js restriction)
2. Dynamic schema generation causing mismatches between server and client

### Solution Approach
1. Made layout a server component to handle metadata properly
2. Pre-generated schemas at build time for consistency
3. Removed client-side state management (useMemo) since it's not needed

### Performance Impact
- Reduced client-side JavaScript bundle size
- Improved initial page load by removing hydration
- Better SEO with consistent schema markup

## Testing Notes

### What to Test
1. Page metadata in view-source
2. Schema markup in view-source
3. Dev tools console for hydration warnings
4. Google Search Console schema validator

### Expected Behavior
- No hydration warnings in console
- Consistent schema markup between server and client
- Valid JSON-LD schema in page source
- Proper metadata tags in page head

## Related Documentation
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Guidelines](https://schema.org/docs/gs.html)
- [Google Search Console Schema Guidelines](https://developers.google.com/search/docs/advanced/structured-data)

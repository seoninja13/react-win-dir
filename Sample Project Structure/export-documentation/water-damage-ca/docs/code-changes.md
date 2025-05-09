# Code Changes Documentation

## Type Error and Image Loading Fixes (2025-04-14)

### 1. Schema Updates

- Updated `SchemaBusinessData` interface in `lib/types/business.ts` to match `BusinessDetails` interface
- Changed `photos` type from `string[]` to `Array<{ reference: string }>` for consistency
- Updated `Business` interface to use the same photo type structure

### 2. Photo Data Transformation

- Modified `BusinessProfileIntegration` component to properly transform photo data
- Added mapping of raw photo strings to objects with `reference` property
- Added null check for photos array to prevent errors
- Example transformation:

```typescript
photos: businessData.photos ? businessData.photos.map((photo: string) => ({ reference: photo })) : []
```

### 3. Next.js Image Configuration

- Added 'pixabay.com' to allowed image domains in `next.config.js`
- Updated configuration:

```javascript
images: {
  domains: ['images.unsplash.com', 'via.placeholder.com', 'pixabay.com']
}
```

### 4. Schema Generation Updates

- Modified schema generation in `lib/schema.ts` to handle the new photo structure
- Updated `generateLocalBusinessSchema` to use `photo.reference` for image URLs
- Fixed property name from `reviewCount` to `review_count` for consistency

### Files Modified

1. `lib/types/business.ts`
2. `components/BusinessProfileIntegration.tsx`
3. `next.config.js`
4. `lib/schema.ts`
5. `app/[...slug]/page.tsx`
6. `app/[service]-[city]-ca/page.tsx`
7. `app/emergency-water-extraction-los-angeles-ca/page.tsx`

### Impact

- Fixed TypeScript errors related to photo data structure
- Resolved Next.js image loading errors for Pixabay images
- Ensured consistent property naming across the codebase
- Improved type safety for business data handling

### Testing

- Successfully built the application with `yarn build`
- Verified image loading in development environment
- Confirmed proper photo data transformation in business profiles

### Testing Instructions

1. Verify all sections render properly:
   - Homepage
   - Service pages
   - Business profiles

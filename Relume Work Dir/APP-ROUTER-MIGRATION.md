# App Router Migration Plan

## Overview

This document outlines the plan to migrate the Windows Doors CA website from using a mix of Pages Router and App Router to using only the App Router. This will simplify the codebase, reduce routing conflicts, and align with Next.js best practices.

## Why App Router?

1. **Modern Approach**: The App Router is Next.js's newer, recommended routing system.
2. **Better Features**: Built-in support for layouts, loading states, error handling, and server components.
3. **Simplified Mental Model**: Having a single routing system makes the codebase easier to understand and maintain.
4. **Future-Proof**: Next.js is focusing development efforts on the App Router.

## Current State

The project currently uses both routing systems:
- **Pages Router**: `/pages` directory
- **App Router**: `/src/app` directory

This has led to routing conflicts, 404 errors, and maintenance challenges.

## Migration Steps

### Phase 1: Preparation (Current)

1. ✅ Create this migration plan
2. ✅ Add error logging to track issues during migration
3. ✅ Create a debug page to help diagnose routing issues
4. ✅ Ensure the root URL works correctly

### Phase 2: Page-by-Page Migration

For each page in the Pages Router, follow these steps:

1. Check if an equivalent page already exists in the App Router
2. If it exists, update it to match the functionality of the Pages Router version
3. If it doesn't exist, create a new page in the App Router
4. Test the new page thoroughly
5. Update any internal links to point to the new page
6. Keep the Pages Router version temporarily for backward compatibility

#### Migration Checklist

| Page | App Router Equivalent | Status | Notes |
|------|----------------------|--------|-------|
| `/` (index.js) | `/src/app/page.tsx` | ✅ | Migrated on May 15, 2025 |
| `/windows` | `/src/app/windows/page.tsx` | ✅ | Migrated on May 20, 2025 |
| `/doors` | `/src/app/doors/page.tsx` | ✅ | Doors page |
| `/vinyl-siding` | `/src/app/vinyl-siding/page.tsx` | ✅ | Vinyl Siding page |
| `/1000-series` | `/src/app/1000-series/page.tsx` | ❌ | Need to create |
| `/1500-series` | `/src/app/1500-series/page.tsx` | ❌ | Need to create |
| `/2000-series` | `/src/app/2000-series/page.tsx` | ❌ | Need to create |
| `/3000-series` | `/src/app/3000-series/page.tsx` | ❌ | Need to create |
| `/4000-series` | `/src/app/4000-series/page.tsx` | ❌ | Need to create |
| `/5000-series` | `/src/app/5000-series/page.tsx` | ❌ | Need to create |
| `/awning` | `/src/app/awning/page.tsx` | ❌ | Need to create |
| `/bay-bow` | `/src/app/windows/bay-bow/page.tsx` | ✅ | Migrated on May 22, 2025 |
| `/blog` | `/src/app/blog/page.tsx` | ❌ | Need to create |
| `/casement` | `/src/app/casement/page.tsx` | ✅ | Migrated on May 20, 2025 |
| `/custom` | `/src/app/custom/page.tsx` | ❌ | Need to create |
| `/double-hung` | `/src/app/double-hung/page.tsx` | ✅ | Migrated on May 20, 2025 |
| `/energy-efficient` | `/src/app/energy-efficient/page.tsx` | ❌ | Need to create |
| `/entry` | `/src/app/entry/page.tsx` | ❌ | Need to create |
| `/garage` | `/src/app/garage/page.tsx` | ❌ | Need to create |
| `/installation` | `/src/app/installation/page.tsx` | ❌ | Need to create |
| `/patio` | `/src/app/patio/page.tsx` | ❌ | Need to create |
| `/picture-window` | `/src/app/picture-window/page.tsx` | ❌ | Need to create |
| `/shutters` | `/src/app/shutters/page.tsx` | ❌ | Need to create |
| `/sliding` | `/src/app/sliding/page.tsx` | ❌ | Need to create |
| `/wood-windows` | `/src/app/wood-windows/page.tsx` | ❌ | Need to create |
| `/warranty-*` | `/src/app/warranty/page.tsx` | ✅ | Consolidate warranty pages |

### Phase 3: API Routes Migration

Migrate API routes from `/pages/api` to `/src/app/api`:

1. Identify all API routes in `/pages/api`
2. Create equivalent route handlers in `/src/app/api`
3. Test each API route thoroughly
4. Update any client-side code that calls these APIs

### Phase 4: Component Migration

1. Move shared components to `/src/components`
2. Update imports in all files
3. Test components in their new location

### Phase 5: Clean Up

1. Remove the `/pages` directory once all pages have been migrated
2. Update the `next.config.js` file to remove any Pages Router specific configuration
3. Update documentation to reflect the new structure
4. Run a final round of testing to ensure everything works correctly

## Testing Strategy

For each migrated page:

1. Test direct URL access
2. Test navigation to and from the page
3. Test all functionality on the page
4. Test on multiple devices and browsers

## Timeline

- **Phase 1**: 1 day
- **Phase 2**: 3-5 days (depending on complexity)
- **Phase 3**: 1-2 days
- **Phase 4**: 1-2 days
- **Phase 5**: 1 day

Total estimated time: 7-11 days

## Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Migrating from Pages to App Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [App Router Examples](https://github.com/vercel/next.js/tree/canary/examples)

## Notes

- Keep both routing systems working during the migration to minimize disruption
- Prioritize high-traffic pages for migration
- Document any issues encountered during migration for future reference

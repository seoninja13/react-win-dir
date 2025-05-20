# App Router Migration Tracking

**Priority Level: 1 (Critical)**

## Overview

This document tracks the progress of migrating the Windows Doors CA website from using a mix of Pages Router and App Router to using only the App Router. This migration is critical for simplifying the codebase, reducing routing conflicts, and aligning with Next.js best practices.

## Migration Status

**Overall Progress**: 0% (0/25 pages migrated)

### Phase 1: Core Pages (Highest Priority)

| Page Name | Current Route | Pages Router Path | App Router Path | Status | Priority | Dependencies | Issues | Notes |
|-----------|---------------|-------------------|-----------------|--------|----------|--------------|--------|-------|
| Home | / | /pages/index.js | /src/app/page.tsx | Not Started | High | None | | Already has partial implementation |
| Windows | /windows | /pages/windows.js | /src/app/windows/page.tsx | Not Started | High | None | | Already has partial implementation |
| Doors | /doors | /pages/doors.js | /src/app/doors/page.tsx | Not Started | High | None | | Already has partial implementation |
| Vinyl Siding | /vinyl-siding | /pages/vinyl-siding.js | /src/app/vinyl-siding/page.tsx | Not Started | High | None | | Already has partial implementation |
| Contact | /contact | /pages/contact.js | /src/app/contact/page.tsx | Not Started | High | None | | Contains form functionality |

### Phase 2: Product Detail Pages (High Priority)

| Page Name | Current Route | Pages Router Path | App Router Path | Status | Priority | Dependencies | Issues | Notes |
|-----------|---------------|-------------------|-----------------|--------|----------|--------------|--------|-------|
| Double-Hung | /double-hung | /pages/double-hung.js | /src/app/double-hung/page.tsx | Not Started | High | Windows | | |
| Casement | /casement | /pages/casement.js | /src/app/casement/page.tsx | Not Started | High | Windows | | |
| Awning | /awning | /pages/awning.js | /src/app/awning/page.tsx | Not Started | High | Windows | | |
| Bay/Bow | /bay-bow | /pages/bay-bow.js | /src/app/bay-bow/page.tsx | Not Started | High | Windows | | |
| Picture | /picture-window | /pages/picture-window.js | /src/app/picture-window/page.tsx | Not Started | High | Windows | | |
| Sliding | /sliding | /pages/sliding.js | /src/app/sliding/page.tsx | Not Started | High | Windows | | |
| Entry | /entry | /pages/entry.js | /src/app/entry/page.tsx | Not Started | High | Doors | | |
| Patio | /patio | /pages/patio.js | /src/app/patio/page.tsx | Not Started | High | Doors | | |
| Garage | /garage | /pages/garage.js | /src/app/garage/page.tsx | Not Started | High | Doors | | |
| 1000 Series | /vinyl-siding/1000-series | /pages/vinyl-siding/1000-series.js | /src/app/vinyl-siding/1000-series/page.tsx | Not Started | High | Vinyl Siding | | |

### Phase 3: Information Pages (Medium Priority)

| Page Name | Current Route | Pages Router Path | App Router Path | Status | Priority | Dependencies | Issues | Notes |
|-----------|---------------|-------------------|-----------------|--------|----------|--------------|--------|-------|
| About Us | /about-us | /pages/about-us.js | /src/app/about-us/page.tsx | Not Started | Medium | None | | |
| Financing | /financing | /pages/financing.js | /src/app/financing/page.tsx | Not Started | Medium | None | | |
| Warranty | /warranty | /pages/warranty.js | /src/app/warranty/page.tsx | Not Started | Medium | None | | |
| Installation | /installation | /pages/installation.js | /src/app/installation/page.tsx | Not Started | Medium | None | | |
| Gallery | /gallery | /pages/gallery.js | /src/app/gallery/page.tsx | Not Started | Medium | None | | |

### Phase 4: Blog and Miscellaneous Pages (Lower Priority)

| Page Name | Current Route | Pages Router Path | App Router Path | Status | Priority | Dependencies | Issues | Notes |
|-----------|---------------|-------------------|-----------------|--------|----------|--------------|--------|-------|
| Blog | /blog | /pages/blog.js | /src/app/blog/page.tsx | Not Started | Low | None | | |
| Blog Post | /blog/[slug] | /pages/blog/[slug].js | /src/app/blog/[slug]/page.tsx | Not Started | Low | Blog | | |
| Window Style Finder | /window-style-finder | /pages/window-style-finder.js | /src/app/window-style-finder/page.tsx | Not Started | Low | None | | |
| Energy Efficient | /energy-efficient | /pages/energy-efficient.js | /src/app/energy-efficient/page.tsx | Not Started | Low | None | | |
| Custom | /custom | /pages/custom.js | /src/app/custom/page.tsx | Not Started | Low | None | | |

## Migration Log

| Date | Page/Component | Action | Details | Developer |
|------|----------------|--------|---------|-----------|
| YYYY-MM-DD | Example | Started | Initial setup | Developer Name |

## Issues and Solutions

| Issue | Severity | Status | Solution | Notes |
|-------|----------|--------|----------|-------|
| Example Issue | Medium | Resolved | Solution details | Additional notes |

## Testing Results

| Page/Component | Test Type | Status | Details | Date |
|----------------|-----------|--------|---------|------|
| Example | Routing | Passed | All routes working correctly | YYYY-MM-DD |

## Next Steps

1. Begin migration of Home page
2. Test thoroughly
3. Document any issues and solutions
4. Proceed to Windows page

## Resources

- [Migration Plan](./app-router-migration-plan.md)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

## Last Updated

YYYY-MM-DD

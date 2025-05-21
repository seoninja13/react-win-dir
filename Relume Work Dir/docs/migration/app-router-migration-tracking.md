# App Router Migration Tracking

**Priority Level: 1 (Critical)**

## Overview

This document tracks the progress of migrating the Windows Doors CA website from using a mix of Pages Router and App Router to using only the App Router. This migration is critical for simplifying the codebase, reducing routing conflicts, and aligning with Next.js best practices.

## Migration Status

**Overall Progress**: 8% (2/25 pages migrated)

### Phase 1: Core Pages (Highest Priority)

| Page Name | Current Route | Pages Router Path | App Router Path | Status | Priority | Dependencies | Issues | Notes |
|-----------|---------------|-------------------|-----------------|--------|----------|--------------|--------|-------|
| Home | / | /pages/index.js | /src/app/page.tsx | Completed | High | None | | Migrated on May 15, 2025 |
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
| Bay/Bow | /bay-bow | /pages/bay-bow.js | /src/app/windows/bay-bow/page.tsx | In Progress | High | Windows | Pages Router taking precedence | Migration started on May 22, 2025, App Router implementation exists but not being accessed |
| Picture | /picture-window | /pages/picture-window.js | /src/app/picture-window/page.tsx | Not Started | High | Windows | | |
| Sliding | /sliding | /pages/sliding.js | /src/app/sliding/page.tsx | Not Started | High | Windows | | |
| Entry | /entry | /pages/entry.js | /src/app/entry/page.tsx | Not Started | High | Doors | | |
| Patio | /patio | /pages/patio.js | /src/app/patio/page.tsx | Not Started | High | Doors | | |
| Garage | /garage, /doors/garage | /pages/garage.js | /src/app/doors/garage/page.tsx | In Progress | High | Doors | Initial implementation resulted in "Page Not Found" error | Migration started on May 23, 2025, fixed by directly importing components instead of the whole page component |
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
| 2025-05-15 | Home | Completed | Migrated Home page from Pages Router to App Router | Windows Doors CA Team |
| 2025-05-22 | Bay/Bow | In Progress | Created App Router implementation at /windows/bay-bow, but Pages Router still taking precedence | Windows Doors CA Team |
| 2025-05-23 | Garage | In Progress | Created App Router implementation at /doors/garage, fixed "Page Not Found" error by directly importing components | Windows Doors CA Team |

## Issues and Solutions

| Issue | Severity | Status | Solution | Notes |
|-------|----------|--------|----------|-------|
| Pages Router taking precedence over App Router | High | Ongoing | Currently keeping both implementations during transition | Will be resolved when Pages Router files are removed |
| "Page Not Found" error when importing entire page component | Medium | Resolved | Directly import individual components instead of the whole page component | Encountered with Garage page, may affect other pages |

## Testing Results

| Page/Component | Test Type | Status | Details | Date |
|----------------|-----------|--------|---------|------|
| Home | Routing | Passed | App Router implementation working correctly at / | 2025-05-15 |
| Bay/Bow | Routing | Mixed | Pages Router implementation working at /bay-bow, App Router implementation exists but not accessible | 2025-05-22 |
| Garage | Routing | Passed | Both implementations working: Pages Router at /garage and App Router at /doors/garage | 2025-05-23 |

## Next Steps

1. ✅ Migrate Home page (Completed on May 15, 2025)
2. ✅ Begin migration of Bay/Bow page (In Progress as of May 22, 2025)
3. ✅ Begin migration of Garage page (In Progress as of May 23, 2025)
4. Continue migration of remaining Windows subpages
5. Continue migration of remaining Doors subpages
6. Test thoroughly
7. Document any issues and solutions
8. Once all pages are migrated to App Router, remove Pages Router files
9. Update internal links to use App Router paths

## Resources

- [Migration Plan](./app-router-migration-plan.md)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

## Last Updated

2025-05-23

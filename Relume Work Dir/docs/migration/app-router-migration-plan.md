# App Router Migration Plan

**Priority Level: 1 (Critical)**

## Overview

This document outlines the detailed plan for migrating the Windows Doors CA website from using a mix of Pages Router and App Router to using only the App Router. This migration is critical for simplifying the codebase, reducing routing conflicts, and aligning with Next.js best practices.

## Table of Contents

1. [Background](#background)
2. [Migration Principles](#migration-principles)
3. [Migration Phases](#migration-phases)
4. [Page Templates](#page-templates)
5. [Migration Process](#migration-process)
6. [Testing Protocol](#testing-protocol)
7. [Rollback Plan](#rollback-plan)
8. [Timeline](#timeline)
9. [Resources](#resources)

## Background

As of May 2025, the project has a mix of Pages Router (`/pages` directory) and App Router (`/src/app` directory) implementations. This has led to routing conflicts, maintenance challenges, and development confusion. The decision has been made to standardize on the App Router approach for all routing and page implementation.

## Migration Principles

### 1. Single Source of Truth

**Principle**: Each route should be defined in exactly one place.

**Implementation**:
- All routes will be defined exclusively in the App Router (`/src/app` directory)
- No duplicate routes in the Pages Router
- Clear documentation of the routing structure

### 2. Component Organization

**Principle**: Components should be organized by their scope and reusability.

**Implementation**:
- **Shared Components**: Place in `/src/components` directory
- **Page-Specific Components**: Place in `/src/app/[route]/components` directory
- **Feature Components**: Place in `/src/features/[feature-name]` directory

### 3. Client vs. Server Components

**Principle**: Use server components by default, client components when necessary.

**Implementation**:
- Start with server components for better performance
- Add `'use client'` directive only when needed for:
  - Interactivity (event handlers, state)
  - Browser APIs
  - Client-side libraries

### 4. Data Fetching

**Principle**: Use the most appropriate data fetching method for each use case.

**Implementation**:
- **Server Components**: Fetch data directly without hooks
- **Route Handlers**: Use for API endpoints in `/src/app/api`
- **Server Actions**: Use for form submissions and mutations
- **Client Components**: Use hooks for client-side data fetching

### 5. Incremental Migration

**Principle**: Migrate one page at a time, ensuring each works correctly before moving to the next.

**Implementation**:
- Start with simpler pages
- Test thoroughly after each migration
- Document issues and solutions
- Build on successful patterns

### 6. Consistent Naming and Imports

**Principle**: Use consistent naming conventions and import patterns.

**Implementation**:
- Use PascalCase for component names
- Use kebab-case for directory names
- Use `@/` alias for imports (e.g., `@/components/Button`)
- Avoid relative imports that traverse multiple directories

### 7. Documentation

**Principle**: Document all migration decisions and patterns.

**Implementation**:
- Update documentation after each migration
- Document patterns and best practices
- Create examples for common scenarios
- Keep a migration log

## Migration Phases

### Phase 1: Core Pages (Highest Priority)

1. **Home Page** (`/`)
2. **Product Category Pages**
   - Windows (`/windows`)
   - Doors (`/doors`)
   - Vinyl Siding (`/vinyl-siding`)
3. **Contact Page** (`/contact`)

### Phase 2: Product Detail Pages (High Priority)

1. **Window Types**
   - Double-Hung (`/double-hung`)
   - Casement (`/casement`)
   - Awning (`/awning`)
   - Bay/Bow (`/bay-bow`)
   - Picture (`/picture-window`)
   - Sliding (`/sliding`)

2. **Door Types**
   - Entry (`/entry`)
   - Patio (`/patio`)
   - Garage (`/garage`)

3. **Vinyl Siding Series**
   - 1000 Series (`/vinyl-siding/1000-series`)
   - 2000 Series (`/vinyl-siding/2000-series`)
   - 3000 Series (`/vinyl-siding/3000-series`)
   - 4000 Series (`/vinyl-siding/4000-series`)
   - 5000 Series (`/vinyl-siding/5000-series`)

### Phase 3: Information Pages (Medium Priority)

1. **About Pages**
   - About Us (`/about-us`)
   - Our Process (`/our-process`)
   - Service Areas (`/service-areas`)

2. **Customer Resources**
   - Financing (`/financing`)
   - Warranty (`/warranty`)
   - Installation (`/installation`)
   - FAQ (`/faq`)

3. **Gallery** (`/gallery`)

### Phase 4: Blog and Miscellaneous Pages (Lower Priority)

1. **Blog Pages**
   - Blog List (`/blog`)
   - Blog Posts (`/blog/[slug]`)

2. **Utility Pages**
   - Privacy Policy (`/privacy-policy`)
   - Terms of Service (`/terms-of-service`)
   - Sitemap (`/sitemap`)

3. **Special Feature Pages**
   - Window Style Finder (`/window-style-finder`)
   - Energy Efficiency (`/energy-efficient`)
   - Custom Windows (`/custom`)

## Page Templates

We've created reusable templates for common page types to streamline the migration process:

1. **Basic Page Template**: For simple pages with standard layout
2. **Product Category Page Template**: For product category pages (Windows, Doors, etc.)
3. **Product Detail Page Template**: For product detail pages (Double-Hung, Entry, etc.)
4. **Information Page Template**: For information pages (About, Warranty, etc.)
5. **Contact Page Template**: Specifically for the Contact page with form functionality
6. **Blog Page Template**: For the blog list page
7. **Blog Post Template**: For individual blog posts

These templates are available in the `/src/app/_templates` directory.

## Migration Process

For each page, follow these steps:

### Step 1: Preparation

1. Update the migration tracking document to mark the page as "In Progress"
2. Create the necessary directories in the App Router structure
3. Copy the appropriate template to the new location
4. Identify all components used by the page

### Step 2: Component Migration

1. For each component used by the page:
   - Determine if it's a shared component or page-specific
   - Move shared components to `/src/components`
   - Move page-specific components to `/src/app/[route]/components`
   - Add `'use client'` directive if needed
   - Update import paths

### Step 3: Data Fetching Migration

1. Identify how data is fetched in the current implementation
2. Migrate to the appropriate App Router data fetching method:
   - Server Components: Direct fetch
   - Route Handlers: API endpoints
   - Server Actions: Form submissions
   - Client Components: Hooks

### Step 4: Testing

1. Test the page thoroughly using the testing protocol
2. Fix any issues
3. Document any challenges and solutions

### Step 5: Deployment

1. Update the migration tracking document to mark the page as "Completed"
2. Remove the Pages Router version of the page
3. Monitor for any issues

## Testing Protocol

For each migrated page, perform the following tests:

### 1. Routing Tests

- Direct URL access: Navigate directly to the URL
- Navigation: Test links to and from the page
- Dynamic routes: Test with different parameters (if applicable)

### 2. Functionality Tests

- Interactive elements: Test all buttons, forms, etc.
- Data display: Verify all data is displayed correctly
- Error handling: Test error scenarios

### 3. Visual Tests

- Layout: Verify the layout matches the design
- Responsiveness: Test on different screen sizes
- Animations: Verify animations work correctly

### 4. Performance Tests

- Load time: Measure initial load time
- Interactivity: Test time to interactive
- Network requests: Monitor network requests

## Rollback Plan

If issues are encountered that cannot be resolved quickly, follow this rollback plan:

1. Keep the Pages Router version of the page active
2. Rename the App Router version to avoid conflicts
3. Document the issues in the migration tracking document
4. Address the issues before attempting migration again

## Timeline

- **Phase 1**: 5 weeks (1 week per page)
- **Phase 2**: 10 weeks (2-3 days per page)
- **Phase 3**: 5 weeks (2-3 days per page)
- **Phase 4**: 5 weeks (2-3 days per page)

Total estimated time: 25 weeks

## Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Migrating from Pages to App Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [App Router Examples](https://github.com/vercel/next.js/tree/canary/examples)

## Last Updated

YYYY-MM-DD

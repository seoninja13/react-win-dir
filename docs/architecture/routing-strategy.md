# Routing Strategy: Next.js App Router

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Routing Strategy

## Table of Contents

1. [Overview](#overview)
2. [Decision](#decision)
3. [Implementation Guidelines](#implementation-guidelines)
4. [Directory Structure](#directory-structure)
5. [Route Patterns](#route-patterns)
6. [Migration Plan](#migration-plan)
7. [Related Documentation](#related-documentation)

## Overview

This document outlines the routing strategy for the Windows Doors CA website. It defines the approach to creating and managing routes throughout the application, ensuring consistency and maintainability.

## Decision

As of May 13, 2025, we have decided to exclusively use the **Next.js App Router** for all new page implementations and future development. This decision replaces the previous mixed approach that utilized both the Pages Router and App Router.

### Rationale

1. **Future-Proofing**: The App Router is the future of Next.js routing, with the Pages Router being maintained but not receiving new features.
2. **Enhanced Features**: The App Router provides advanced features such as:
   - Server Components
   - Nested Layouts
   - Route Groups
   - Loading UI
   - Error Handling
   - Streaming
3. **Consistency**: Using a single routing system simplifies development, documentation, and maintenance.
4. **Performance**: The App Router offers improved performance through React Server Components and other optimizations.

## Implementation Guidelines

### New Pages

All new pages must be implemented using the App Router approach:

1. Create pages within the `src/app` directory structure
2. Use the file naming conventions of the App Router:
   - `page.tsx` for route pages
   - `layout.tsx` for layouts
   - `loading.tsx` for loading states
   - `error.tsx` for error handling
   - `not-found.tsx` for 404 pages

### Existing Pages

Existing pages that currently use the Pages Router should be migrated to the App Router according to the migration plan outlined below.

## Directory Structure

The standard directory structure for routes is:

```
src/
  app/
    [route]/
      page.tsx      # The page component
      layout.tsx    # (Optional) Layout for this route
      loading.tsx   # (Optional) Loading UI
      error.tsx     # (Optional) Error handling
    [nested-route]/
      [dynamic-param]/
        page.tsx    # Dynamic route page
```

### Examples

- Home page: `src/app/page.tsx`
- Windows page: `src/app/windows/page.tsx`
- Double-hung windows page: `src/app/windows/double-hung/page.tsx`
- Vinyl siding page: `src/app/vinyl-siding/page.tsx`
- 2000-series vinyl siding page: `src/app/vinyl-siding/2000-series/page.tsx`

## Route Patterns

### Standard Routes

Standard routes should follow the URL structure defined in the architecture documentation:

- Product category pages: `/[category]` (e.g., `/windows`, `/doors`, `/vinyl-siding`)
- Product detail pages: `/[category]/[product]` (e.g., `/windows/double-hung`, `/doors/entry`)
- Series pages: `/vinyl-siding/[series]` (e.g., `/vinyl-siding/2000-series`)
- Informational pages: `/[page-name]` (e.g., `/about-us`, `/warranty`, `/financing`)

### Dynamic Routes

Dynamic routes should use the App Router's dynamic segment syntax:

- Blog posts: `/blog/[slug]/page.tsx`
- Service areas: `/service-areas/[location]/page.tsx`

## Migration Plan

1. **Identify Pages Router Pages**: Identify all pages currently using the Pages Router (in the `pages` directory)
2. **Prioritize Migration**: Prioritize pages based on importance and complexity
3. **Create App Router Equivalents**: Create new pages in the App Router structure
4. **Test Thoroughly**: Ensure the new pages function identically to the old ones
5. **Update Documentation**: Update all documentation to reflect the changes
6. **Remove Old Pages**: Once migration is complete and verified, remove the old Pages Router pages

## Related Documentation

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Architecture Documentation](./architecture-documentation.md)
- [Page Structure Documentation](./page-structure.md)
- [Component Structure Documentation](./component-structure.md)
- [Development Workflow Documentation](../processes/development-workflow.md)

Last Updated: May 13, 2025

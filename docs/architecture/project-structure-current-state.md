# Project Structure Current State

**Priority Level: 1 (Critical)**

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Project Structure Current State

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Routing Architecture](#routing-architecture)
4. [Component Organization](#component-organization)
5. [Migration Status](#migration-status)
6. [Known Issues](#known-issues)
7. [Next Steps](#next-steps)
8. [Related Documentation](#related-documentation)

## Overview

This document provides a comprehensive overview of the current project structure as of May 26, 2025. The project is in the process of migrating from a mixed routing approach (Pages Router and App Router) to a standardized App Router approach. This document serves as a reference for the current state of the project structure and will be updated as the migration progresses.

## Directory Structure

The project currently has the following high-level directory structure:

```
react-win-dir/
├── Docs/                           # Project documentation
│   ├── architecture/               # Architecture documentation
│   ├── daily-logs/                 # Daily development logs
│   ├── migration/                  # Migration documentation
│   ├── pages/                      # Page-specific documentation
│   ├── processes/                  # Process documentation
│   └── tracking/                   # Progress tracking documentation
├── Relume-DO-NOT-EDIT/             # Original Relume components (DO NOT EDIT)
├── Relume-root/                    # Main project directory
│   ├── components/                 # Shared components
│   ├── pages/                      # Pages Router pages (being phased out)
│   ├── public/                     # Static assets
│   ├── src/                        # Source code
│   │   ├── app/                    # App Router pages (target architecture)
│   │   ├── components/             # React components
│   │   └── utils/                  # Utility functions
│   ├── styles/                     # Global styles
│   ├── [page-directories]/         # Page-specific components (e.g., home/, windows/, doors/)
│   ├── next.config.js              # Next.js configuration
│   ├── package.json                # Project dependencies
│   └── tailwind.config.js          # Tailwind CSS configuration
├── Sample Project Structure Do Not Delete/ # Reference materials
├── sample-images/                  # Sample images for development
└── Supabase/                       # Supabase-related files
```

## Routing Architecture

The project is currently in transition from a mixed routing approach to a standardized App Router approach:

### Current Routing Structure

1. **Pages Router** (`Relume-root/pages/`): Contains legacy pages that are being migrated to the App Router.
   - Example: `Relume-root/pages/windows.js` → `export { default } from '../windows';`

2. **App Router** (`Relume-root/src/app/`): Contains the target architecture pages.
   - Example: `Relume-root/src/app/windows/page.tsx` → Imports components from `Relume-root/windows/`

### Routing Priority

Next.js prioritizes routes in the following order:
1. `/pages` directory (Pages Router)
2. `/src/app` directory (App Router)

This means that if a route exists in both directories, the Pages Router version will be used. This is important to understand during the migration process.

## Component Organization

The project organizes components in the following way:

1. **Page-Specific Components**: Located in dedicated directories at the root of `Relume-root/`.
   - Example: `Relume-root/windows/components/Header44.jsx`

2. **Shared Components**: Located in `Relume-root/components/`.
   - Example: `Relume-root/components/Button.jsx`

3. **App Router Components**: Located in `Relume-root/src/components/`.
   - Example: `Relume-root/src/components/LoggingProvider.jsx`

## Migration Status

The project is currently migrating from Pages Router to App Router. The following pages have been migrated:

### Completed Migrations

1. **Home Page** (`/`) - Completed May 20, 2025
2. **Windows Page** (`/windows`) - Completed May 22, 2025
3. **Doors Page** (`/doors`) - Completed May 24, 2025
4. **Bay-Bow Windows Page** (`/windows/bay-bow`) - Completed May 22, 2025
5. **Garage Doors Page** (`/doors/garage`) - Completed May 23, 2025
6. **Hinged Patio Doors Page** (`/doors/hinged-patio-doors`) - Completed May 26, 2025
7. **Vinyl Siding Page** (`/vinyl-siding`) - Completed May 25, 2025
8. **Vinyl Siding Series Pages** (`/vinyl-siding/*-series`) - Completed May 25, 2025
   - 1000-Series (`/vinyl-siding/1000-series`)
   - 1500-Series (`/vinyl-siding/1500-series`)
   - 2000-Series (`/vinyl-siding/2000-series`)
   - 3000-Series (`/vinyl-siding/3000-series`)
   - 4000-Series (`/vinyl-siding/4000-series`)
   - 5000-Series (`/vinyl-siding/5000-series`)

### Pending Migrations

1. **Contact Page** (`/contact`)
2. **About Page** (`/about`)
3. **Blog Pages** (`/blog/*`)
4. **FAQ Page** (`/faqs`)
5. **Awning Windows Page** (`/awning`)
6. **Custom Windows Page** (`/custom`)
7. **Energy Efficient Windows Page** (`/energy-efficient`)
8. **Entry Doors Page** (`/entry`)
9. **Installation Page** (`/installation`)
10. **Patio Doors Page** (`/patio`)
11. **Picture Windows Page** (`/picture-window`)
12. **Shutters Page** (`/shutters`)
13. **Sliding Windows Page** (`/sliding`)
14. **Wood Windows Page** (`/wood-windows`)
15. **Warranty Pages** (`/warranty-*`)

## Known Issues

The following issues have been identified in the current project structure:

1. **Routing Conflicts**: Pages with both Pages Router and App Router implementations may experience routing conflicts, with the Pages Router taking precedence.

2. **Inconsistent Directory Structure**: Some App Router pages are in `src/app/` (outside Relume-root) while others are in `Relume-root/src/app/`.

3. **Simplified Debug Versions**: Some pages have simplified debug versions that were created for testing purposes, which may cause conflicts.

4. **Import Path Issues**: Some components have incorrect import paths, especially when referencing components across different directories.

## Next Steps

The following steps are planned to address the current issues and complete the migration:

1. **Resolve Routing Conflicts**:
   - Temporarily rename or move Pages Router implementations to allow App Router implementations to take precedence
   - Eventually remove all Pages Router implementations once App Router versions are confirmed working

2. **Standardize Directory Structure**:
   - Ensure all App Router pages are in `Relume-root/src/app/` and not in `src/app/`
   - Update import paths to reflect the correct directory structure

3. **Remove Simplified Debug Versions**:
   - Remove or rename simplified debug versions of pages to avoid conflicts

4. **Complete Page Migrations**:
   - Migrate remaining pages from Pages Router to App Router
   - Test each page thoroughly to ensure it works correctly

## Related Documentation

- [App Router Standardization Plan](../processes/app-router-standardization-plan.md)
- [App Router Migration Tracking](../migration/app-router-migration-tracking.md)
- [Webpage Progress Tracker](../tracking/webpage-progress-tracker.md)
- [Working Directory Documentation](./working-directory.md)
- [Routing Strategy Documentation](./routing-strategy.md)

Last Updated: May 26, 2025

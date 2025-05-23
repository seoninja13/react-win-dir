# Next Steps for App Router Migration

**Priority Level: 1 (Critical)**

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Migration](./index.md) > Next Steps for App Router Migration

## Table of Contents

1. [Overview](#overview)
2. [Current Status](#current-status)
3. [Immediate Next Steps](#immediate-next-steps)
4. [Short-Term Actions](#short-term-actions)
5. [Medium-Term Actions](#medium-term-actions)
6. [Long-Term Actions](#long-term-actions)
7. [Related Documentation](#related-documentation)

## Overview

This document outlines the next steps for continuing the App Router migration for the Windows Doors CA website. It provides a clear roadmap for the immediate actions to take when work resumes, as well as short-term, medium-term, and long-term actions to complete the migration.

## Current Status

As of May 27, 2025, the following progress has been made on the App Router migration:

- **Pages Migrated**: 8 out of 25 pages (32%)
- **Pages Working Correctly**: Most migrated pages are working, but some have issues due to routing conflicts
- **Documentation**: Comprehensive documentation has been created to track the migration progress

### Migrated Pages

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

### Known Issues

1. **Routing Conflicts**: Pages with both Pages Router and App Router implementations experience routing conflicts, with the Pages Router taking precedence.
2. **Simplified Debug Versions**: Some pages have simplified debug versions that were created for testing purposes.
3. **Inconsistent Directory Structure**: The project has a mix of directory structures, with some pages in `src/app/` and others in `Relume-root/src/app/`.

## Immediate Next Steps

When work resumes, the following immediate actions should be taken:

### 1. Resolve Routing Conflicts

To fix the issue of Pages Router implementations taking precedence over App Router implementations:

1. **Temporarily Rename Pages Router Files**:
   ```bash
   # For Bay-Bow Windows
   mv Relume-root/pages/bay-bow.js Relume-root/pages/bay-bow.js.bak

   # For Hinged Patio Doors
   mv Relume-root/pages/hinged-patio-doors.js Relume-root/pages/hinged-patio-doors.js.bak

   # For Vinyl Siding Series Pages
   mv Relume-root/pages/1000-series.js Relume-root/pages/1000-series.js.bak
   mv Relume-root/pages/1500-series.js Relume-root/pages/1500-series.js.bak
   mv Relume-root/pages/2000-series.js Relume-root/pages/2000-series.js.bak
   mv Relume-root/pages/3000-series.js Relume-root/pages/3000-series.js.bak
   mv Relume-root/pages/4000-series.js Relume-root/pages/4000-series.js.bak
   mv Relume-root/pages/5000-series.js Relume-root/pages/5000-series.js.bak
   ```

2. **Test Each Page**:
   - Restart the development server
   - Test each page to ensure the App Router implementation is being used
   - Check for any console errors
   - Verify that all components render correctly

### 2. Remove Simplified Debug Versions

To fix the issue of simplified debug versions causing conflicts:

1. **Identify Simplified Debug Versions**:
   - `src/app/garage-doors/page.tsx`
   - Any other simplified debug versions found

2. **Rename or Remove These Files**:
   ```bash
   # For Garage Doors
   mv src/app/garage-doors/page.tsx src/app/garage-doors/page.tsx.bak
   ```

3. **Test the Pages**:
   - Restart the development server
   - Test the affected pages to ensure the actual implementations are being used
   - Check for any console errors
   - Verify that all components render correctly

### 3. Update Documentation

After resolving the immediate issues:

1. **Update the Daily Log**:
   - Create a new daily log for the day's work
   - Document the changes made and the results of testing

2. **Update the App Router Migration Tracking Document**:
   - Update the status of the affected pages
   - Note any issues that were resolved

3. **Update the Webpage Progress Tracker**:
   - Update the status of the affected pages
   - Note any issues that were resolved

## Short-Term Actions

After resolving the immediate issues, the following short-term actions should be taken:

### 1. Standardize Directory Structure

To fix the issue of inconsistent directory structure:

1. **Ensure All App Router Pages Are in `Relume Work Dir/src/app/`**:
   - Identify any App Router pages that are in `src/app/` but not in `Relume Work Dir/src/app/`
   - Move these pages to `Relume Work Dir/src/app/`
   - Update import paths to reflect the correct directory structure

2. **Test All Pages**:
   - Restart the development server
   - Test all pages to ensure they work correctly
   - Check for any console errors
   - Verify that all components render correctly

### 2. Migrate High-Priority Pages

The following high-priority pages should be migrated next:

1. **Entry Doors Page** (`/entry` → `/doors/entry`):
   - Create an App Router implementation at `Relume-root/src/app/doors/entry/page.tsx`
   - Import the existing Entry Doors page component
   - Add logging functionality
   - Test the page

2. **Patio Doors Page** (`/patio` → `/doors/patio`):
   - Create an App Router implementation at `Relume-root/src/app/doors/patio/page.tsx`
   - Import the existing Patio Doors page component
   - Add logging functionality
   - Test the page

3. **Awning Windows Page** (`/awning` → `/windows/awning`):
   - Create an App Router implementation at `Relume-root/src/app/windows/awning/page.tsx`
   - Import the existing Awning Windows page component
   - Add logging functionality
   - Test the page

4. **Picture Windows Page** (`/picture-window` → `/windows/picture-window`):
   - Create an App Router implementation at `Relume-root/src/app/windows/picture-window/page.tsx`
   - Import the existing Picture Windows page component
   - Add logging functionality
   - Test the page

## Medium-Term Actions

After completing the short-term actions, the following medium-term actions should be taken:

### 1. Migrate Remaining Windows Pages

The following Windows pages should be migrated:

1. **Sliding Windows Page** (`/sliding` → `/windows/sliding`)
2. **Custom Windows Page** (`/custom` → `/windows/custom`)
3. **Energy Efficient Windows Page** (`/energy-efficient` → `/windows/energy-efficient`)

### 2. Migrate Informational Pages

The following Informational pages should be migrated:

1. **About Page** (`/about` → `/about`)
2. **Contact Page** (`/contact` → `/contact`)
3. **FAQs Page** (`/faqs` → `/faqs`)

## Long-Term Actions

After completing the medium-term actions, the following long-term actions should be taken:

### 1. Remove Pages Router Implementations

Once all pages have been migrated and tested:

1. **Remove All Pages Router Implementations**:
   - Remove all files in `Relume-root/pages/`
   - Update any remaining references to Pages Router paths

2. **Update Documentation**:
   - Update all documentation to reflect the completed migration
   - Remove any references to Pages Router implementations

### 2. Final Testing and Verification

1. **Test All Pages**:
   - Test all pages to ensure they work correctly
   - Check for any console errors
   - Verify that all components render correctly

2. **Verify Internal Links**:
   - Verify that all internal links use the correct App Router paths
   - Update any links that still use Pages Router paths

3. **Update Documentation**:
   - Update all documentation to reflect the completed migration
   - Create a final migration report

## Related Documentation

- [Project Structure Current State](../architecture/project-structure-current-state.md)
- [App Router Migration Tracking](./app-router-migration-tracking.md)
- [App Router Standardization Plan](../processes/app-router-standardization-plan.md)
- [Daily Log: May 27, 2025 - App Router Migration Status Review](../daily-logs/2025-05-27-app-router-migration-status-review.md)
- [Webpage Progress Tracker](../tracking/webpage-progress-tracker.md)

Last Updated: May 27, 2025

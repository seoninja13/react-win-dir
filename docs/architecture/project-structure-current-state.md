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

This document provides a comprehensive overview of the current project structure as of May 21, 2025. The project is in the process of migrating from a mixed routing approach (Pages Router and App Router) to a standardized App Router approach. This document serves as a reference for the current state of the project structure and will be updated as the migration progresses.

## Directory Structure

The project currently has the following high-level directory structure:

```
react-win-dir/                      # Root directory
├── .netlify/                       # Netlify configuration
├── @wWeb development progress folder/ # Web development progress tracking
│   ├── tracking-progress.md        # Original tracking progress
│   └── tracking-progress-copy.md   # Copy of tracking progress
├── Content Engine/                 # Content engine related files
├── Docs/                           # Project documentation
│   ├── architecture/               # Architecture documentation
│   ├── daily-logs/                 # Daily development logs
│   ├── features/                   # Feature documentation
│   │   ├── vibe-coding-implementation.md  # Vibe Coding implementation plan
│   │   ├── intelligent-commit-reminders.md # Intelligent Commit Reminders documentation
│   │   ├── code-modularity-tools.md # Code Modularity Tools documentation
│   │   └── todo-list-management.md # To-Do List Management documentation
│   ├── migration/                  # Migration documentation
│   ├── pages/                      # Page-specific documentation
│   ├── processes/                  # Process documentation
│   │   └── file-naming-convention.md # File Naming Convention documentation
│   └── tracking/                   # Progress tracking documentation
├── Export Documentation/           # Export-related documentation
├── generated-images/               # Generated image files
├── IDE Instructions/               # IDE-specific instructions
├── Relume-DO-NOT-EDIT/             # Original Relume files (DO NOT MODIFY)
├── Relume-root/                    # Main working directory
│   ├── .next/                      # Next.js build directory
│   ├── app/                        # Next.js App Router pages
│   ├── components/                 # React components
│   ├── config/                     # Configuration files
│   │   ├── .eslintrc.json         # ESLint configuration
│   │   ├── eslint.config.mjs      # ESLint configuration
│   │   ├── netlify.toml           # Netlify configuration
│   │   ├── next.config.js         # Next.js configuration
│   │   ├── postcss.config.js      # PostCSS configuration
│   │   ├── postcss.config.mjs     # PostCSS configuration
│   │   └── tailwind.config.ts     # Tailwind CSS configuration
│   ├── docs/                       # Documentation files
│   │   └── migration/             # Migration documentation
│   ├── docs-assets/                # Documentation assets
│   ├── env-files/                  # Environment files
│   │   ├── .env                   # Environment variables
│   │   ├── .env.example           # Example environment variables
│   │   ├── .env.local             # Local environment variables
│   │   └── .env.local.example     # Example local environment variables
│   ├── hooks/                      # React hooks
│   ├── misc/                       # Miscellaneous files
│   ├── Output/                     # Output files
│   ├── pages/                      # Next.js Pages Router pages (being phased out)
│   ├── public/                     # Public assets
│   ├── scripts/                    # Script files
│   │   ├── commit-assistant/       # Intelligent Commit Reminders scripts
│   │   ├── code-modularity/        # Code Modularity Tools scripts
│   │   └── todo-list/              # To-Do List Management scripts
│   ├── service-accounts/           # Service account key files
│   ├── src/                        # Source code
│   │   ├── app/                   # App Router pages (target architecture)
│   │   ├── components/            # React components
│   │   └── utils/                 # Utility functions
│   ├── styles/                     # Global styles
│   ├── Supabase/                   # Supabase related files
│   ├── tests/                      # Test files
│   ├── utils/                      # Utility functions
│   ├── vertex-ai-tests/            # Vertex AI test files
│   ├── .commit-assistant.json     # Intelligent Commit Reminders configuration
│   ├── .code-modularity.json      # Code Modularity Tools configuration
│   ├── .todo-config.json          # To-Do List Management configuration
│   └── Website Pages/              # Centralized page-specific components
│       ├── home/                  # Home page components
│       ├── windows/               # Windows page components
│       ├── doors/                 # Doors page components
│       ├── patio/                 # Patio page components
│       ├── picture-window/        # Picture Window page components
│       └── [other-page-directories]/ # Other page-specific components
├── Sample-images/                  # Sample images
├── .gitignore                      # Git ignore file
├── .windsurfrules                  # Windsurf rules
└── README.md                       # Main README file
```

## Routing Architecture

The project is currently in transition from a mixed routing approach to a standardized App Router approach:

### Current Routing Structure

1. **Pages Router** (`Relume-root/pages/`): Contains legacy pages that are being migrated to the App Router.
   - Example: `Relume-root/pages/windows.js` → `export { default } from '../windows';`

2. **App Router** (`Relume-root/src/app/`): Contains the target architecture pages.
   - Example: `Relume-root/src/app/windows/page.tsx` → Imports components from `Relume-root/Website Pages/windows/`

### Routing Priority

Next.js prioritizes routes in the following order:
1. `/pages` directory (Pages Router)
2. `/src/app` directory (App Router)

This means that if a route exists in both directories, the Pages Router version will be used. This is important to understand during the migration process.

## Component Organization

The project organizes components in the following way:

1. **Page-Specific Components**: Located in the `Relume-root/Website Pages/` directory.
   - Example: `Relume-root/Website Pages/windows/components/Header44.jsx`

2. **Shared Components**: Located in `Relume-root/components/`.
   - Example: `Relume-root/components/Button.jsx`

3. **App Router Components**: Located in `Relume-root/src/components/`.
   - Example: `Relume-root/src/components/LoggingProvider.jsx`

## Migration Status - MAJOR MILESTONE ACHIEVED

**🎯 BATCH TESTING MILESTONE: 35 Pages Confirmed Working**
- **Total Pages Tested**: 35 pages across 8 testing batches
- **Success Rate**: 100% - All tested pages confirmed working by user
- **Linear Tracking**: [Issue 1BU-37](https://linear.app/1builder/issue/1BU-37/milestone-completed-35-pages-across-8-testing-batches)
- **Daily Log**: [May 28, 2025 - Batch Testing Milestone](../daily-logs/2025-05-28-batch-testing-milestone-35-pages-complete.md)

### **📋 Documentation Milestone Commit**
- **Commit Hash**: `161ac166`
- **Date**: May 22, 2025
- **Branch**: `05-21-RestructureDocs-2`
- **Message**: "docs: Complete pyramidal documentation structure for 35-page milestone"
- **Status**: ✅ Successfully pushed to repository
- **Repository**: https://github.com/seoninja13/react-win-dir.git

The project is currently migrating from Pages Router to App Router using a systematic batch testing approach (5 pages per batch).

### Completed Migrations (35 pages confirmed working)

**Eighth Batch (5 pages) - CONFIRMED WORKING**
- ✅ /about
- ✅ /contact
- ✅ /faqs
- ✅ /financing
- ✅ /gallery

**Seventh Batch (5 pages) - CONFIRMED WORKING**
- ✅ /vinyl-siding/1500-series
- ✅ /vinyl-siding/2000-series
- ✅ /vinyl-siding/3000-series ✅ **FIXED** (created missing folder)
- ✅ /vinyl-siding/4000-series
- ✅ /vinyl-siding/5000-series ✅ **FIXED** (created missing folder)

**Sixth Batch (5 pages) - CONFIRMED WORKING**
- ✅ /windows/shutters
- ✅ /service-areas
- ✅ /window-style-finder
- ✅ /vinyl-siding
- ✅ /vinyl-siding/1000-series

**Previous Batches (20 pages) - CONFIRMED WORKING**
- ✅ First through Fifth Batches: 20 additional pages confirmed working
- Includes: Home, Windows, Doors, Bay-Bow, Garage, Hinged Patio Doors, and various window/door product pages

### Pending Migrations

**Note**: Many pages previously listed as pending have now been confirmed working through batch testing.

**Remaining pages to test:**
1. **Blog Pages** (`/blog/*`)
2. **Awning Windows Page** (`/awning`)
3. **Custom Windows Page** (`/custom`)
4. **Energy Efficient Windows Page** (`/energy-efficient`)
5. **Entry Doors Page** (`/entry`)
6. **Installation Page** (`/installation`)
7. **Patio Doors Page** (`/patio`)
8. **Picture Windows Page** (`/picture-window`)
9. **Sliding Windows Page** (`/sliding`)
10. **Wood Windows Page** (`/wood-windows`)
11. **Warranty Pages** (`/warranty-*`)

**Recently Completed (moved from pending to confirmed):**
- ✅ Contact Page (`/contact`) - Confirmed working in Eighth Batch
- ✅ About Page (`/about`) - Confirmed working in Eighth Batch
- ✅ FAQ Page (`/faqs`) - Confirmed working in Eighth Batch
- ✅ Shutters Page (`/shutters`) - Confirmed working in Sixth Batch

## Development Tools

The project includes several development tools inspired by David Jones Gelardi's "Vibe Coding" approach. These tools are designed to enhance the development workflow, improve code quality, and streamline collaboration between developers and AI tools.

### Implemented Vibe Coding Features

1. **Intelligent Commit Reminders & Assistance**
   - Provides timely reminders to commit changes and assistance in creating meaningful commit messages
   - Implemented in `Relume-root/scripts/commit-assistant/`
   - Configured via `.commit-assistant.json`
   - Documentation: `Docs/features/intelligent-commit-reminders.md`

2. **Code Modularity & Refactoring Tools**
   - Helps developers maintain clean, modular code by analyzing files for complexity and length
   - Implemented in `Relume-root/scripts/code-modularity/`
   - Configured via `.code-modularity.json`
   - Documentation: `Docs/features/code-modularity-tools.md`

3. **To-Do List Management with AI Sync**
   - Provides a seamless, project-aware task management system that integrates with AI tools
   - Implemented in `Relume-root/scripts/todo-list/`
   - Configured via `.todo-config.json`
   - Documentation: `Docs/features/todo-list-management.md`

4. **File Naming Convention**
   - Implements a standardized file naming convention using hyphenated path names
   - Documentation: `Docs/processes/file-naming-convention.md`

### Planned Vibe Coding Features

The following features are planned for future implementation:

1. **Code Audit Detection** (Next to implement)
2. **Automated Testing**
3. **AI Rule Configuration**
4. **Automation Scripting**
5. **AI Change Review**
6. **Multi-Agent Comparison**

For more details, see the [Vibe Coding Implementation Plan](../features/vibe-coding-implementation.md).

## Known Issues

The following issues have been identified in the current project structure:

1. **Routing Conflicts**: Pages with both Pages Router and App Router implementations may experience routing conflicts, with the Pages Router taking precedence.

2. **Inconsistent Directory Structure**: Some App Router pages are in `src/app/` (outside Relume-root) while others are in `Relume-root/src/app/`.

3. **Simplified Debug Versions**: Some pages have simplified debug versions that were created for testing purposes, which may cause conflicts.

4. **Import Path Issues**: Some components have incorrect import paths, especially when referencing components across different directories.

5. **Page Testing Requirement**: **CRITICAL** - Never assume pages are working without explicit user confirmation. The only affirmative sign that a page is working is manual human inspection and confirmation.

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
- [Website Pages Organization](./website-pages-organization.md)
- [Vibe Coding Implementation Plan](../features/vibe-coding-implementation.md)
- [Intelligent Commit Reminders](../features/intelligent-commit-reminders.md)
- [Code Modularity Tools](../features/code-modularity-tools.md)
- [To-Do List Management](../features/todo-list-management.md)
- [File Naming Convention](../processes/file-naming-convention.md)

Last Updated: May 28, 2025 (Updated with Batch Testing Milestone: 35 pages confirmed working across 8 testing batches)

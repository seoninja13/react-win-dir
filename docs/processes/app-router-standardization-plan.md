# App Router Standardization Plan

**Priority Level: 1 (Critical)**

## Overview

This document outlines the detailed implementation plan for standardizing the project on the Next.js App Router approach while keeping all files within the `Relume-root` directory structure. This plan addresses the current mixed routing approach and establishes a consistent project structure.

## Table of Contents

1. [Background](#background)
2. [Current State Analysis](#current-state-analysis)
3. [Implementation Plan](#implementation-plan)
   - [Phase 1: Preparation and Analysis](#phase-1-preparation-and-analysis)
   - [Phase 2: Update Configuration Files](#phase-2-update-configuration-files)
   - [Phase 3: Migrate Pages](#phase-3-migrate-pages-from-srcapp-to-relume-rootsrcapp)
   - [Phase 4: Update Import Paths](#phase-4-update-import-paths)
   - [Phase 5: Remove Duplicate Pages Router Files](#phase-5-remove-duplicate-pages-router-files)
   - [Phase 6: Testing and Verification](#phase-6-testing-and-verification)
   - [Phase 7: Documentation](#phase-7-documentation)
4. [Implementation Steps](#implementation-steps)
5. [Timeline](#timeline)
6. [Risks and Mitigation](#risks-and-mitigation)
7. [Conclusion](#conclusion)

## Background

As of May 13, 2025, the project has decided to standardize on the Next.js App Router approach for all routing and page implementation. However, the current project structure contains a mix of:

1. Pages Router files in `Relume-root/pages/`
2. App Router files in `src/app/`
3. App Router files in `Relume-root/src/app/`

This mixed approach has led to routing conflicts, confusing import paths, and development challenges. This plan aims to consolidate all routing under the App Router approach while keeping everything within the `Relume-root` directory structure.

## Current State Analysis

### Directory Structure

The project currently has three parallel routing structures:

1. **Pages Router**: `Relume-root/pages/` - Contains Pages Router pages
2. **App Router (src)**: `src/app/` - Contains App Router pages outside the Relume-root directory
3. **App Router (Relume-root)**: `Relume-root/src/app/` - Contains App Router pages within the Relume-root directory

### Configuration Files

The following configuration files need to be updated to support the consolidated structure:

1. `Relume-root/tailwind.config.js` - Needs to include App Router paths
2. `Relume-root/tsconfig.json` - Needs proper path aliases
3. `Relume-root/next.config.js` - Needs to be configured for App Router

### Routing Conflicts

The project has experienced routing conflicts between Pages Router and App Router implementations of the same pages, such as:
- `pages/faqs.js` vs `src/app/faqs/page.tsx`
- Other similar conflicts

## Implementation Plan

### Phase 1: Preparation and Analysis

1. **Document Current Structure**
   - We have two parallel App Router structures:
     - `src/app/` - Contains App Router pages
     - `Relume-root/src/app/` - Contains App Router pages within the Relume-root directory
   - We also have Pages Router pages in `Relume-root/pages/`

2. **Identify Configuration Files to Update**
   - `Relume-root/tailwind.config.js` - Needs to include App Router paths
   - `Relume-root/tsconfig.json` - Needs proper path aliases
   - `Relume-root/next.config.js` - Needs to be configured for App Router

3. **Create Backup**
   - Create a backup of all files before making changes

### Phase 2: Update Configuration Files

1. **Update Tailwind Configuration**
   - Modify `Relume-root/tailwind.config.js` to include App Router paths
   - Add `"./src/**/*.{js,ts,jsx,tsx,mdx}"` to the content array

2. **Update TypeScript Configuration**
   - Modify `Relume-root/tsconfig.json` to include proper path aliases
   - Add `"paths": { "@/*": ["./src/*"] }` to compilerOptions

3. **Update Next.js Configuration**
   - Ensure `Relume-root/next.config.js` is properly configured for App Router
   - Add necessary image domains and remotePatterns

### Phase 3: Migrate Pages from src/app to Relume-root/src/app

1. **Identify Missing Pages**
   - Compare directories between `src/app` and `Relume-root/src/app`
   - Identify pages that exist in `src/app` but not in `Relume-root/src/app`

2. **Migrate Missing Pages**
   - For each missing page:
     - Create the corresponding directory in `Relume-root/src/app` if it doesn't exist
     - Copy the page files (page.tsx, layout.tsx, etc.) from `src/app` to `Relume-root/src/app`
     - Update imports to use the correct paths

3. **Verify Root Files**
   - Ensure `Relume-root/src/app/layout.tsx` is properly configured
   - Ensure `Relume-root/src/app/page.tsx` is properly configured
   - Ensure `Relume-root/src/app/globals.css` and `Relume-root/src/app/styles.css` are present

### Phase 4: Update Import Paths

1. **Update Import Paths in App Router Pages**
   - For each page in `Relume-root/src/app`:
     - Update import paths to use the correct relative paths or path aliases
     - Replace imports from `../../../component` with `@/component` where appropriate

2. **Update Import Paths in Components**
   - For components referenced by App Router pages:
     - Update import paths to use the correct relative paths or path aliases

### Phase 5: Remove Duplicate Pages Router Files

1. **Identify Conflicting Pages**
   - For each page in `Relume-root/src/app`:
     - Check if there's a corresponding file in `Relume-root/pages`
     - Document all conflicts

2. **Remove Conflicting Pages Router Files**
   - For each conflict:
     - Verify that the App Router page works correctly
     - Remove the corresponding file from `Relume-root/pages`

### Phase 6: Testing and Verification

1. **Test Development Server**
   - Start the development server
   - Verify that all pages load correctly
   - Fix any errors that occur

2. **Test Navigation**
   - Test navigation between pages
   - Verify that all links work correctly

3. **Test Components**
   - Verify that all components render correctly
   - Fix any styling issues

### Phase 7: Documentation

1. **Update Documentation**
   - Update `docs/architecture/working-directory.md` to reflect the new structure
   - Update `docs/processes/project-structure-consolidation-plan.md` with the completed steps
   - Create a new daily log documenting the changes

2. **Create Implementation Guide**
   - Create a guide for future development that explains the new structure
   - Include examples of how to create new pages

## Implementation Steps

### Step 1: Update Configuration Files

1. Update `Relume-root/tailwind.config.js`
2. Update `Relume-root/tsconfig.json`
3. Update `Relume-root/next.config.js`

### Step 2: Migrate Missing Pages

1. For each page in `src/app` that's not in `Relume-root/src/app`:
   - Create the directory in `Relume-root/src/app`
   - Copy the page files
   - Update imports

### Step 3: Remove Conflicting Pages Router Files

1. For each page in `Relume-root/src/app`:
   - Check for a corresponding file in `Relume-root/pages`
   - Remove the conflicting file

### Step 4: Test and Verify

1. Start the development server
2. Test all pages
3. Fix any issues

### Step 5: Update Documentation

1. Update architecture documentation
2. Create a new daily log
3. Create an implementation guide

## Timeline and Implementation Schedule

### Implementation Priority

This is a **Priority 1 (Critical)** task that should be implemented immediately before proceeding with any new page development. The current routing conflicts are causing build errors and development challenges that impact all aspects of the project.

### Start Date

Implementation should begin on **May 15, 2025** (immediately following approval of this plan).

### Phase Duration

- **Phase 1-2**: 1 day (May 15, 2025)
- **Phase 3-4**: 2-3 days (May 16-18, 2025)
- **Phase 5**: 1 day (May 19, 2025)
- **Phase 6**: 1-2 days (May 20-21, 2025)
- **Phase 7**: 1 day (May 22, 2025)

Total estimated time: 6-8 days (May 15-22, 2025)

### Milestones and Checkpoints

- **Milestone 1**: Configuration files updated (End of Phase 2)
- **Milestone 2**: All pages migrated to Relume-root/src/app (End of Phase 4)
- **Milestone 3**: All conflicting Pages Router files removed (End of Phase 5)
- **Milestone 4**: All pages tested and verified (End of Phase 6)
- **Milestone 5**: Documentation updated (End of Phase 7)

Daily status updates will be provided in the daily logs to track progress and address any issues that arise.

## Risks and Mitigation

### Risks

1. **Import Path Errors**: Incorrect import paths may cause build failures
   - **Mitigation**: Test each page after updating imports

2. **Component Compatibility**: Components may not work correctly with the new structure
   - **Mitigation**: Test components thoroughly and fix issues as they arise

3. **Styling Issues**: CSS may not be applied correctly
   - **Mitigation**: Update Tailwind configuration and test styling

4. **Routing Conflicts**: Conflicts between Pages Router and App Router
   - **Mitigation**: Remove all Pages Router files for routes that have App Router implementations

## Relationship to Other Project Priorities

### Impact on Current Development

As a Priority 1 (Critical) task, this plan takes precedence over other development activities. The current routing conflicts are causing build errors and development challenges that impact all aspects of the project. Implementing this plan will:

1. **Unblock Development**: Resolve routing conflicts that are currently blocking development
2. **Improve Developer Experience**: Create a consistent project structure that makes development easier
3. **Reduce Errors**: Eliminate errors caused by mixed routing approaches
4. **Enable Future Development**: Provide a solid foundation for future page implementations

### Dependencies and Prerequisites

This plan has the following dependencies and prerequisites:

1. **Team Alignment**: All team members must be aligned on the App Router approach
2. **Development Pause**: Consider pausing other development activities during implementation
3. **Testing Environment**: Ensure a proper testing environment is available for verification

### Post-Implementation Priorities

After implementing this plan, the following priorities should be addressed:

1. **Update Development Guidelines**: Update development guidelines to reflect the new structure
2. **Developer Training**: Ensure all developers understand the App Router approach
3. **Resume Page Development**: Resume development of new pages using the standardized structure

## Conclusion

This implementation plan provides a detailed roadmap for standardizing on the App Router approach while keeping all files within the `Relume-root` directory structure. By following this plan, we will create a consistent project structure that follows Next.js best practices and makes future development easier.

As a Priority 1 (Critical) task, implementation should begin immediately to resolve the current routing conflicts and enable continued development of the project.

## Related Documentation

- [Routing Strategy Documentation](../architecture/routing-strategy.md)
- [Working Directory Documentation](../architecture/working-directory.md)
- [Project Structure Consolidation Plan](../processes/project-structure-consolidation-plan.md)
- [Development Workflow](../processes/development-workflow.md)

## Last Updated

2025-05-14 (Initial creation)

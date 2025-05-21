# Migration Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > Migration Documentation

## Table of Contents

1. [Overview](#overview)
2. [Migration Documents](#migration-documents)
3. [Migration Process](#migration-process)
4. [Related Documentation](#related-documentation)

## Overview

This directory contains documentation related to the migration of the Windows Doors CA website from using a mix of Pages Router and App Router to using only the App Router. This migration is critical for simplifying the codebase, reducing routing conflicts, and aligning with Next.js best practices.

## Migration Documents

- [Tomorrow Morning Tasks (May 28, 2025)](./tomorrow-morning-tasks.md): Specific tasks to be completed tomorrow morning to fix non-working pages and continue the App Router migration.
- [Next Steps for App Router Migration](./next-steps-for-app-router-migration.md): Detailed steps for continuing the App Router migration.
- [App Router Migration Tracking](./app-router-migration-tracking.md): Tracks the progress of migrating pages from Pages Router to App Router.
- [App Router Migration Plan](./app-router-migration-plan.md): Outlines the detailed plan for migrating from Pages Router to App Router.

## Migration Process

The migration process involves the following steps:

1. **Preparation**: Analyze the current project structure and identify pages that need to be migrated.
2. **Implementation**: Create App Router implementations for each page.
3. **Testing**: Test each page to ensure it works correctly.
4. **Documentation**: Update documentation to reflect the changes.
5. **Cleanup**: Remove Pages Router implementations once all pages have been migrated.

## Related Documentation

- [Project Structure Current State](../architecture/project-structure-current-state.md)
- [App Router Standardization Plan](../processes/app-router-standardization-plan.md)
- [Daily Log: May 27, 2025 - App Router Migration Status Review](../daily-logs/2025-05-27-app-router-migration-status-review.md)
- [Webpage Progress Tracker](../tracking/webpage-progress-tracker.md)

Last Updated: May 27, 2025 (Added Tomorrow Morning Tasks document)

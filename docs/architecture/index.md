# Architecture Documentation

This directory contains documentation related to the architecture of the Window World LA website.

## Contents

- [Architecture Documentation](./architecture-documentation.md) - Comprehensive analysis and implementation plan
- [Routing Strategy](./routing-strategy.md) - Documentation of the App Router routing strategy
- [Project Structure](./project-structure.md) - Overview of the project structure (Priority 1)
- [Component Structure](./component-structure.md) - Overview of the component structure
- [Page Structure](./page-structure.md) - Overview of the page structure
- [Database Schema](./database-schema.md) - Database schema and structure
- [Relume Wireframe Conversion](./relume-wireframe-conversion.md) - Documentation of the Relume wireframe files conversion
- [Root Layout](./root-layout.md) - Documentation for the root layout component
- [API Routes](./api-routes.md) - Documentation for the API routes
- [Utility Functions](./utility-functions.md) - Documentation for utility functions
- [Website Architecture](./website-architecture.md) - System architecture and component diagrams
- [SEO Structure](./seo-structure.md) - SEO optimization strategy
- [Technical Implementation Plan](./technical-implementation-plan.md) - Implementation details
- [Data Flow](./data-flow.md) - How data flows through the system

## Primary Architecture Reference

The primary reference for the Windows Doors CA website architecture is the comprehensive analysis document:

- [Architecture Documentation](./architecture-documentation.md)

This document contains a detailed analysis of the Window World LA website (https://www.windowworldla.com/) that we are replicating exactly. It includes:

1. Full site map and navigation analysis
2. Page template analysis and wireframe descriptions
3. Content inventory (textual and visual assets)
4. UI/UX design elements specification
5. Responsive behavior analysis
6. Technology stack details
7. Replication guidance and considerations
8. Implementation for Windows Doors CA website

All implementation work should follow this document precisely to ensure an exact replication of the Window World LA website architecture and functionality.

## Overview

The Window World LA website is built using Next.js with the App Router, React, and Tailwind CSS. It uses Unsplash for images and follows a component-based architecture.

## Key Architectural Decisions

1. **Next.js App Router**: We exclusively use Next.js App Router for routing and server-side rendering. As of May 13, 2025, we have standardized on the App Router approach for all pages, moving away from the mixed routing approach that previously used both the Pages Router and App Router.
2. **Consolidated Project Structure**: As of May 15, 2025, we have consolidated all content into the `Relume-root` directory, removing duplicate directories and files outside of `Relume-root`. This creates a cleaner, more maintainable codebase and reduces confusion about which files to edit.
3. **Tailwind CSS**: We use Tailwind CSS for styling.
4. **Relume UI**: We use Relume UI components for UI elements.
5. **Unsplash API**: We use Unsplash API for images.
6. **Netlify**: We use Netlify for deployment and hosting.
7. **Supabase**: We use Supabase for all data storage and management.

## Related Documentation

- [Features Documentation](../features/index.md)
- [Integrations Documentation](../integrations/index.md)

Last Updated: May 16, 2025 (Added Database Schema documentation)

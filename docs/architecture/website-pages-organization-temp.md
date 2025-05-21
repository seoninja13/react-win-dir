# Website Pages Organization

**Priority Level: 2 (High)**

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Website Pages Organization

## Table of Contents

1. [Overview](#overview)
2. [Purpose](#purpose)
3. [Implementation](#implementation)
4. [Folder Structure](#folder-structure)
5. [Usage Guidelines](#usage-guidelines)
6. [Related Documentation](#related-documentation)

## Overview

This document describes the organization of page-specific components in the Website Pages directory. The Website Pages directory was created to improve the organization and management of page-specific components in the project.

## Purpose

The purpose of the Website Pages directory is to:

1. **Improve Organization**: Centralize all page-specific components in one location for better organization
2. **Simplify Navigation**: Make it easier to find and manage page-specific components
3. **Reduce Clutter**: Reduce clutter in the Relume-root directory by moving page-specific folders to a dedicated directory
4. **Standardize Structure**: Establish a consistent location for all page-specific components

## Implementation

The Website Pages directory is being populated with all page-specific components that were previously scattered throughout the Relume-root directory. This reorganization is currently in progress, with folders being moved manually to ensure precision and control. Once completed, this approach will provide several advantages:

1. **Centralized Management**: All page-specific components will be managed in a single location
2. **Cleaner Root Directory**: The Relume-root directory will be less cluttered and easier to navigate
3. **Consistent Structure**: All page-specific components will follow a consistent organizational pattern
4. **Improved Maintainability**: The project structure will be more intuitive and easier to maintain

## Folder Structure

The Website Pages directory contains all page-specific folders:

```
Website Pages/
├── 1000-series/              # 1000 Series page components
├── 1500-series/              # 1500 Series page components
├── 2000-series/              # 2000 Series page components
├── 3000-series/              # 3000 Series page components
├── 4000-series/              # 4000 Series page components
├── 5000-series/              # 5000 Series page components
├── about/                    # About page components
├── awning/                   # Awning Windows page components
├── bay-bow/                  # Bay & Bow Windows page components
├── blog/                     # Blog page components
├── blog-post/                # Blog Post page components
├── casement/                 # Casement Windows page components
├── contact/                  # Contact page components
├── custom/                   # Custom Windows page components
├── doors/                    # Doors page components
├── double-hung/              # Double-Hung Windows page components
├── energy-efficient/         # Energy Efficient Windows page components
├── entry/                    # Entry Doors page components
├── faqs/                     # FAQs page components
├── financing/                # Financing page components
├── free-estimate-request/    # Free Estimate Request page components
├── gallery/                  # Gallery page components
├── garage/                   # Garage Doors page components
├── garden/                   # Garden Windows page components
├── giving-back/              # Giving Back page components
├── hinged-patio-doors/       # Hinged Patio Doors page components
├── home/                     # Home page components
├── installation/             # Installation page components
├── patio/                    # Patio Doors page components
├── picture-window/           # Picture Windows page components
├── press/                    # Press page components
├── recognition/              # Recognition page components
├── referral-program/         # Referral Program page components
├── reviews/                  # Reviews page components
├── roofing/                  # Roofing page components
├── satisfaction-survey/      # Satisfaction Survey page components
├── service-areas/            # Service Areas page components
├── shutters/                 # Shutters page components
├── sliding/                  # Sliding Windows page components
├── styles/                   # Styles page components
├── vinyl-siding/             # Vinyl Siding page components
├── virtual-repair-center/    # Virtual Repair Center page components
├── warranty/                 # Warranty page components
├── why-window-world/         # Why Window World page components
├── windows/                  # Windows page components
├── window-style-finder/      # Window Style Finder page components
└── wood-windows/             # Wood Windows page components
```

## Usage Guidelines

When working with page-specific components:

1. **Access Through Website Pages**: Access page-specific components through the Website Pages directory
2. **Update Import Paths**: Update import paths in App Router pages to reference the new locations
   - Example: `import { Component } from '../../../Website Pages/windows';`
3. **New Pages**: For new pages, create the page-specific folder directly in the Website Pages directory
4. **Deleting Pages**: When deleting a page, remove the folder from the Website Pages directory

## Related Documentation

- [Project Structure Current State](./project-structure-current-state.md)
- [Directory Structure Policy](./directory-structure-policy.md)
- [Working Directory Documentation](./working-directory.md)
- [App Router Standardization Plan](../processes/app-router-standardization-plan.md)
- [Page Folders Inventory](../tracking/page-folders-inventory.md)
- [Reorganization Test Plan](../tracking/reorganization-test-plan.md)
- [Website Pages Reorganization Summary](../tracking/website-pages-reorganization-summary.md)
- [Daily Log: May 21, 2025 - Website Pages Reorganization](../daily-logs/2025-05-21-website-pages-reorganization.md)

Last Updated: May 21, 2025 (Updated to reflect ongoing reorganization)

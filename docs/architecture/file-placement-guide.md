# File Placement Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > File Placement Guide

## Table of Contents

1. [Overview](#overview)
2. [Core Principles](#core-principles)
3. [Decision Tree](#decision-tree)
4. [File Type Guidelines](#file-type-guidelines)
5. [Common Scenarios](#common-scenarios)
6. [Examples](#examples)
7. [Troubleshooting](#troubleshooting)
8. [Related Documentation](#related-documentation)

## Overview

This guide helps developers determine where to place new files in the Windows Doors CA website project. It provides a decision tree and specific guidelines for different file types to ensure consistent organization across the project.

## Core Principles

1. **All website implementation files must be in the Relume Work Dir directory**
2. **Group related files together**
3. **Follow established patterns for similar files**
4. **Maintain separation of concerns**
5. **Keep directory structure clean and intuitive**

## Decision Tree

Use this decision tree to determine where to place new files:

```mermaid
flowchart TD
    A[New File] --> B{What type of file?}
    
    B -->|Page| C{Is it an App Router page?}
    C -->|Yes| D[Place in src/app/[route]/page.tsx]
    C -->|No| E[Place in Website Pages/[page]/]
    
    B -->|Component| F{Is it used across multiple pages?}
    F -->|Yes| G[Place in src/components/]
    F -->|No| H{Which page uses it?}
    H --> I[Place in Website Pages/[page]/components/]
    
    B -->|Utility| J[Place in src/utils/]
    
    B -->|Hook| K[Place in src/hooks/ or hooks/]
    
    B -->|Type| L[Place in src/types/]
    
    B -->|API Route| M[Place in src/app/api/[route]/route.ts]
    
    B -->|Style| N{Is it global?}
    N -->|Yes| O[Place in src/app/globals.css or styles.css]
    N -->|No| P{Is it for a specific component?}
    P -->|Yes| Q[Place with the component]
    P -->|No| R[Place in styles/]
    
    B -->|Configuration| S[Place in Relume Work Dir/]
    
    B -->|Documentation| T[Place in Docs/]
    
    B -->|Test| U{What are you testing?}
    U -->|Component| V[Place next to component with .test.tsx extension]
    U -->|Utility| W[Place next to utility with .test.ts extension]
    U -->|Integration| X[Place in Test Pages/]
    
    B -->|Other| Y[Ask for guidance]
```

## File Type Guidelines

### Pages

1. **App Router Pages**
   - Location: `src/app/[route]/page.tsx`
   - Purpose: Define routes and render page components
   - Example: `src/app/windows/page.tsx`

2. **Page Components**
   - Location: `Website Pages/[page]/[PageName].jsx`
   - Purpose: Implement the UI for a specific page
   - Example: `Website Pages/windows/WindowsPage.jsx`

### Components

1. **Shared Components**
   - Location: `src/components/[category]/[ComponentName].tsx`
   - Purpose: Reusable components used across multiple pages
   - Example: `src/components/ui/Button.tsx`

2. **Page-Specific Components**
   - Location: `Website Pages/[page]/components/[ComponentName].jsx`
   - Purpose: Components used only on a specific page
   - Example: `Website Pages/windows/components/WindowFeatures.jsx`

3. **Section Components**
   - Location: `Website Pages/[page]/sections/[SectionName].jsx`
   - Purpose: Major sections of a page
   - Example: `Website Pages/home/sections/HeroSection.jsx`

### Utilities

1. **Utility Functions**
   - Location: `src/utils/[category]/[utilName].ts`
   - Purpose: Helper functions used across the application
   - Example: `src/utils/formatting/formatDate.ts`

### Hooks

1. **Custom Hooks**
   - Location: `src/hooks/[hookName].ts` or `hooks/[hookName].ts`
   - Purpose: Reusable React hooks
   - Example: `src/hooks/useWindowSize.ts`

### Types

1. **TypeScript Types**
   - Location: `src/types/[domain].ts`
   - Purpose: TypeScript type definitions
   - Example: `src/types/product.ts`

### API Routes

1. **API Routes**
   - Location: `src/app/api/[route]/route.ts`
   - Purpose: Server API endpoints
   - Example: `src/app/api/contact/route.ts`

### Styles

1. **Global Styles**
   - Location: `src/app/globals.css` or `src/app/styles.css`
   - Purpose: Styles applied to the entire application
   - Example: `src/app/globals.css`

2. **Component Styles**
   - Location: With the component file
   - Purpose: Styles specific to a component
   - Example: `src/components/ui/Button.module.css`

3. **Page Styles**
   - Location: `styles/[page].css`
   - Purpose: Styles specific to a page
   - Example: `styles/windows.css`

### Configuration

1. **Project Configuration**
   - Location: `Relume Work Dir/[configName]`
   - Purpose: Configure project tools and settings
   - Example: `Relume Work Dir/next.config.js`

### Documentation

1. **Project Documentation**
   - Location: `Docs/[category]/[docName].md`
   - Purpose: Document project architecture, processes, etc.
   - Example: `Docs/architecture/file-placement-guide.md`

### Tests

1. **Component Tests**
   - Location: Next to the component with `.test.tsx` extension
   - Purpose: Test component functionality
   - Example: `src/components/ui/Button.test.tsx`

2. **Utility Tests**
   - Location: Next to the utility with `.test.ts` extension
   - Purpose: Test utility functions
   - Example: `src/utils/formatting/formatDate.test.ts`

3. **Integration Tests**
   - Location: `Test Pages/[testName].tsx`
   - Purpose: Test integration between components
   - Example: `Test Pages/windows-page-test.tsx`

## Common Scenarios

### Adding a New Page

1. Create the App Router page: `src/app/[route]/page.tsx`
2. Create the page component: `Website Pages/[route]/[PageName].jsx`
3. Create page-specific components: `Website Pages/[route]/components/`
4. Create page sections: `Website Pages/[route]/sections/`

### Adding a New Component

1. Determine if the component is shared or page-specific
2. For shared components: `src/components/[category]/[ComponentName].tsx`
3. For page-specific components: `Website Pages/[page]/components/[ComponentName].jsx`

### Adding a New API Route

1. Create the API route: `src/app/api/[route]/route.ts`
2. Create any necessary utility functions: `src/utils/api/[utilName].ts`

### Adding a New Style

1. Determine if the style is global or component-specific
2. For global styles: `src/app/globals.css` or `styles/[name].css`
3. For component-specific styles: With the component file

## Examples

### Example 1: Adding a New Product Page

```
# App Router Page
src/app/windows/bay-windows/page.tsx

# Page Component
Website Pages/windows/bay-windows/BayWindowsPage.jsx

# Page-Specific Components
Website Pages/windows/bay-windows/components/BayWindowFeatures.jsx
Website Pages/windows/bay-windows/components/BayWindowGallery.jsx

# Page Sections
Website Pages/windows/bay-windows/sections/HeroSection.jsx
Website Pages/windows/bay-windows/sections/FeaturesSection.jsx
Website Pages/windows/bay-windows/sections/GallerySection.jsx
```

### Example 2: Adding a Shared Component

```
# Component File
src/components/ui/ProductCard.tsx

# Component Styles
src/components/ui/ProductCard.module.css

# Component Tests
src/components/ui/ProductCard.test.tsx
```

### Example 3: Adding an API Route

```
# API Route
src/app/api/products/route.ts

# API Utility
src/utils/api/productApi.ts

# API Types
src/types/api.ts
```

## Troubleshooting

### Common Issues

1. **Unsure where to place a file**
   - Follow the decision tree
   - Look for similar existing files
   - Ask for guidance if still unsure

2. **File in the wrong location**
   - Move the file to the correct location
   - Update all imports
   - Document the change

3. **Conflicting conventions**
   - Follow the most recent convention
   - Update documentation if necessary
   - Discuss with the team to establish a consistent approach

## Related Documentation

- [Unified Project Structure](./unified-project-structure.md)
- [App Router Structure](./app-router-structure.md)
- [Directory Structure Policy](./directory-structure-policy.md)
- [Component Organization](./component-organization.md)

Last Updated: May 28, 2025

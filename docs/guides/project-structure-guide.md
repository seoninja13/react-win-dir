# Project Structure Guide

**Priority Level: 1 (Critical)**

## Overview

This guide provides an overview of the project structure after the consolidation of all content into the `Relume-root` directory. It explains the purpose of each directory and file, and provides guidance on where to add new content.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Key Directories](#key-directories)
3. [Configuration Files](#configuration-files)
4. [Adding New Content](#adding-new-content)
5. [Development Workflow](#development-workflow)
6. [Best Practices](#best-practices)

## Directory Structure

After the Project Structure Consolidation, the project has a cleaner, more maintainable structure with all content consolidated in the `Relume-root` directory. Here's an overview of the top-level directories:

```
.netlify                 # Netlify configuration
Docs                     # Project documentation
Export Documentation     # Export documentation
IDE Instructions         # IDE instructions
Relume-DO-NOT-EDIT      # Original Relume files (DO NOT EDIT)
Relume-root             # Main project directory
```

## Key Directories

### Relume-root

The `Relume-root` directory contains all the code for the project. Here's an overview of its structure:

```
Relume-root/
├── 1000-series/         # 1000 series vinyl siding components
├── 1500-series/         # 1500 series vinyl siding components
├── 2000-series/         # 2000 series vinyl siding components
├── 4000-series/         # 4000 series vinyl siding components
├── 5000-series/         # 5000 series vinyl siding components
├── about/               # About page components
├── components/          # Shared components
├── contact/             # Contact page components
├── doors/               # Doors page components
├── faqs/                # FAQs page components
├── financing/           # Financing page components
├── gallery/             # Gallery page components
├── home/                # Home page components
├── pages/               # Pages Router pages (legacy)
├── public/              # Public assets
├── roofing/             # Roofing page components
├── src/                 # Source code
│   ├── app/             # App Router pages
│   └── components/      # Shared components
├── styles/              # Global styles
├── vinyl-siding/        # Vinyl siding page components
├── warranty/            # Warranty page components
├── window-style-finder/ # Window style finder components
└── windows/             # Windows page components
```

### src/app

The `src/app` directory contains all the App Router pages for the project. This is where you should add new pages. Here's an overview of its structure:

```
src/app/
├── about/               # About page
├── contact/             # Contact page
├── doors/               # Doors pages
│   ├── entry/           # Entry doors page
│   ├── garage/          # Garage doors page
│   └── patio/           # Patio doors page
├── faqs/                # FAQs page
├── financing/           # Financing page
├── gallery/             # Gallery page
├── garden/              # Garden page
├── hinged-patio-doors/  # Hinged patio doors page
├── roofing/             # Roofing page
├── service-areas/       # Service areas page
├── vinyl-siding/        # Vinyl siding pages
│   ├── 1000-series/     # 1000 series page
│   ├── 1500-series/     # 1500 series page
│   ├── 2000-series-new/ # 2000 series page
│   └── 5000-series/     # 5000 series page
├── warranty/            # Warranty page
├── window-style-finder/ # Window style finder page
├── windows/             # Windows pages
│   ├── awning/          # Awning windows page
│   ├── bay-bow/         # Bay/bow windows page
│   ├── casement/        # Casement windows page
│   ├── custom/          # Custom windows page
│   ├── double-hung/     # Double-hung windows page
│   ├── energy-efficient/# Energy-efficient windows page
│   ├── garden/          # Garden windows page
│   ├── picture-window/  # Picture windows page
│   ├── shutters/        # Shutters page
│   ├── sliding/         # Sliding windows page
│   └── wood-windows/    # Wood windows page
├── globals.css          # Global CSS
├── layout.tsx           # Root layout
├── page.tsx             # Home page
└── styles.css           # Additional styles
```

### Docs

The `Docs` directory contains all the project documentation. Here's an overview of its structure:

```
Docs/
├── architecture/        # Architecture documentation
├── daily-logs/          # Daily development logs
├── features/            # Feature documentation
├── guides/              # Development guides
├── processes/           # Process documentation
├── tracking/            # Progress tracking documentation
└── documentation-map.md # Documentation map
```

## Configuration Files

The project uses the following configuration files:

### Root Configuration Files

- `package.json`: Contains scripts that point to the `Relume-root` directory
- `.gitignore`: Specifies files to ignore in Git
- `netlify.toml`: Netlify configuration

### Relume-root Configuration Files

- `next.config.js`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project dependencies and scripts
- `postcss.config.js`: PostCSS configuration
- `.eslintrc.json`: ESLint configuration

## Adding New Content

### Adding New Pages

To add a new page to the project:

1. Create a new directory in `Relume-root/src/app/` with the name of the page
2. Create a `page.tsx` file in the new directory
3. Import the necessary components from the corresponding directory in `Relume-root`

Example:

```tsx
// Relume-root/src/app/new-page/page.tsx
"use client";

import { NewPage } from "../../../new-page";

export default function NewPageRoute() {
  return <NewPage />;
}
```

### Adding New Components

To add a new component to the project:

1. Create a new directory in `Relume-root` with the name of the component
2. Create an `index.jsx` file in the new directory
3. Create a `components` directory for any sub-components

Example:

```jsx
// Relume-root/new-component/index.jsx
"use client";

import React from "react";
import { SubComponent } from "./components/SubComponent";

export function NewComponent() {
  return (
    <div>
      <h1>New Component</h1>
      <SubComponent />
    </div>
  );
}
```

## Development Workflow

1. **Start the development server**:
   ```
   npm run dev
   ```

2. **Build the project**:
   ```
   npm run build
   ```

3. **Start the production server**:
   ```
   npm run start
   ```

4. **Lint the project**:
   ```
   npm run lint
   ```

## Best Practices

1. **Never edit files in the `Relume-DO-NOT-EDIT` directory**
2. **Always use the App Router for new pages**
3. **Follow the established directory structure**
4. **Document all changes in the daily logs**
5. **Update the documentation when making significant changes**
6. **Test all changes in both development and production modes**
7. **Follow the naming conventions used in the project**
8. **Use the Relume UI components for consistency**
9. **Keep the project structure clean and organized**
10. **Regularly update the documentation to reflect the current state of the project**

Last Updated: May 15, 2025

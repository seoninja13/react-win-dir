# Relume Wireframe Files Conversion

This document details the process of converting the Relume wireframe files to our Relume-root directory structure and integrating them with the Next.js App Router.

## Table of Contents

1. [Original Structure](#original-structure)
2. [New Structure](#new-structure)
3. [Conversion Process](#conversion-process)
4. [Import Path Updates](#import-path-updates)
5. [Next.js App Router Integration](#nextjs-app-router-integration)
6. [Component Modifications](#component-modifications)
7. [CSS and Styling](#css-and-styling)
8. [Issues and Solutions](#issues-and-solutions)
9. [Best Practices](#best-practices)

## Original Structure

The Relume wireframe files were originally structured as follows:

```
Relume/
├── components/
│   ├── navigation/
│   │   ├── Navigation.jsx
│   │   └── ...
│   ├── footer/
│   │   ├── Footer.jsx
│   │   └── ...
│   └── ...
├── pages/
│   ├── home/
│   │   ├── index.jsx
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── about/
│   │   ├── index.jsx
│   │   └── ...
│   └── ...
└── ...
```

This structure was designed for a traditional React application without the Next.js App Router.

## New Structure

We converted this structure to our Relume-root directory structure:

```
Relume-root/
├── components/
│   ├── navigation/
│   │   ├── Navigation.jsx
│   │   └── ...
│   ├── footer/
│   │   ├── Footer.jsx
│   │   └── ...
│   └── ...
├── pages/
│   ├── home/
│   │   ├── index.jsx
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── about/
│   │   ├── index.jsx
│   │   └── ...
│   └── ...
└── ...
```

The structure remains largely the same, but the root directory is renamed to Relume-root to avoid conflicts with the Next.js App Router.

## Conversion Process

The conversion process involved the following steps:

1. Create the Relume Work Dir directory
2. Copy all files from the Relume directory to the Relume Work Dir directory
3. Update import paths in all files
4. Create new pages in the Next.js App Router structure that import the Relume components
5. Modify components as needed to work with the Next.js App Router

## Import Path Updates

We updated the import paths in all files to match the new directory structure. For example:

```jsx
// Before
import Navigation from '../../components/navigation/Navigation';

// After
import Navigation from '../../../website-pages/components/navigation/Navigation';
```

This ensures that the components can be imported from the new directory structure.

## Next.js App Router Integration

We created new pages in the Next.js App Router structure that import the Relume components:

```jsx
// src/app/relume-home/page.tsx
'use client';

import React from 'react';
import HomePage from '../../../Relume-root/pages/home/index.jsx';

export default function RelumeHomePage() {
  return <HomePage />;
}
```

This allows us to use the Relume components within the Next.js App Router structure.

## Component Modifications

We modified some components to work with the Next.js App Router:

1. **Image Components**: Updated image imports to use Next.js Image component

```jsx
// Before
import { img1 } from '../../assets/images';

// After
import Image from 'next/image';
import { img1 } from '../../../utils/imageUrls';
```

2. **Link Components**: Updated link components to use Next.js Link component

```jsx
// Before
<a href="/about">About</a>

// After
import Link from 'next/link';
<Link href="/about">About</Link>
```

3. **Client Components**: Added 'use client' directive to client components

```jsx
// Before
import React from 'react';

// After
'use client';
import React from 'react';
```

4. **CSS Imports**: Updated CSS imports to use the new structure

```jsx
// Before
import './styles.css';

// After
import '../../../styles/relume/home/styles.css';
```

## CSS and Styling

We made several updates to the CSS and styling:

1. **Tailwind CSS Configuration**: Updated the Tailwind CSS configuration to include all necessary settings while preserving the Relume-specific configurations

```js
// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Relume-root/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  // ... theme and plugin configurations
};
```

2. **PostCSS Configuration**: Updated the PostCSS configuration to include the `postcss-import` plugin

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

3. **Global CSS**: Updated the global CSS file to use the newer `@tailwind` directives instead of `@import`

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@layer base {
  :root {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: system-ui, sans-serif;
    --font-mono: monospace;
  }
}
```

## Issues and Solutions

During the conversion process, we encountered several issues:

1. **Tailwind CSS Configuration Issue**: The main issue was with the Tailwind CSS configuration. We updated the configuration to include all necessary settings while preserving the Relume-specific configurations.

2. **PostCSS Plugin Issue**: The error message indicated that we needed to use a separate package for the PostCSS plugin. We updated the PostCSS configuration to include the `postcss-import` plugin.

3. **CSS Import Syntax**: We updated the global CSS file to use the newer `@tailwind` directives instead of `@import`.

4. **Relume Component Import Issues**: We encountered issues with importing Relume components due to the different directory structure. We updated the import paths to match the new directory structure.

## Best Practices

Based on our experience with the conversion process, we recommend the following best practices:

1. **Keep the Original Structure**: Maintain the original structure as much as possible to minimize changes to import paths.

2. **Use Absolute Imports**: Consider using absolute imports to simplify import paths.

3. **Create Wrapper Components**: Create wrapper components that import the Relume components and adapt them to the Next.js App Router.

4. **Document the Conversion Process**: Document the conversion process to help future developers understand the structure and make changes as needed.

5. **Test Thoroughly**: Test all components thoroughly to ensure they work correctly with the new structure.

6. **Update CSS and Styling**: Update CSS and styling to work with the new structure and the Next.js App Router.

7. **Use TypeScript**: Consider converting the components to TypeScript to improve type safety and developer experience.

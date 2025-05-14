# Relume UI Integration Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Tailwind CSS Configuration](#tailwind-css-configuration)
4. [Basic Usage](#basic-usage)
5. [Component Types](#component-types)
6. [Project Structure](#project-structure)
7. [Troubleshooting](#troubleshooting)
8. [Resources](#resources)

## Introduction

This guide provides step-by-step instructions for integrating the Relume UI library into the Windows Doors CA project. Relume UI is a React component library built with TypeScript and Tailwind CSS, offering a comprehensive set of UI components that follow the Relume design system.

### Key Features

- 1000+ Section components
- UI elements based on Shadcn UI
- TypeScript support
- Tailwind CSS integration
- Responsive design
- Accessibility features

## Installation

### Prerequisites

Before installing Relume UI, ensure you have the following dependencies installed:

- Node.js (v14 or higher)
- React (v18.2.0 or higher)
- Next.js (v13 or higher)
- Tailwind CSS (v3 or higher)

### Installing Packages

Install the Relume UI packages using npm:

```bash
npm install @relume_io/relume-ui @relume_io/relume-tailwind
```

Or using yarn:

```bash
yarn add @relume_io/relume-ui @relume_io/relume-tailwind
```

### Additional Dependencies

Relume UI relies on several additional packages that you may need to install:

```bash
npm install framer-motion react-icons tailwindcss-animate @tailwindcss/typography
```

## Tailwind CSS Configuration

### Basic Configuration

Update your `tailwind.config.ts` file to include the Relume UI components and preset:

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Relume-root/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    // Your theme customizations here
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // Additional plugins
  ],
};
```

### PostCSS Configuration

Ensure your `postcss.config.js` file includes the necessary plugins:

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### CSS Setup

Import Tailwind directives in your global CSS file (e.g., `globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Basic Usage

### Element Components

Element components are the basic building blocks of the Relume UI library. Here's how to use them:

```jsx
'use client';

import React from 'react';
import { Button } from '@relume_io/relume-ui';

export default function ButtonExample() {
  return (
    <div className="p-4">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
    </div>
  );
}
```

### Section Components

Section components are pre-built page sections that can be used to quickly build pages:

```jsx
'use client';

import React from 'react';
import { Hero } from '@relume_io/relume-ui';

export default function HeroExample() {
  return (
    <Hero
      title="Windows Doors CA"
      description="Quality windows and doors for your home"
      ctaText="Request Free Estimate"
      ctaLink="/contact"
      image="/images/hero-image.jpg"
    />
  );
}
```

## Component Types

Relume UI provides two main types of components:

### 1. Element Components

These are basic UI components like buttons, inputs, accordions, etc. They are the building blocks for creating more complex components and pages.

Examples:
- Button
- Input
- Accordion
- Dialog
- Dropdown Menu

### 2. Section Components

These are pre-built page sections that combine multiple element components to create complete UI sections.

Examples:
- Hero sections
- Feature sections
- Testimonial sections
- Contact forms
- Pricing tables

## Project Structure

For the Windows Doors CA project, we've organized the Relume components in the following structure:

```
Relume-root/
├── components/       # Reusable components
│   ├── navigation/   # Navigation components
│   ├── ui/           # UI components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── pages/            # Page-specific components
│   ├── home/
│   ├── windows/
│   └── doors/
└── utils/            # Utility functions
```

### Component Organization

- **Reusable Components**: Place components that are used across multiple pages in the `components` directory.
- **Page-Specific Components**: Place components that are specific to a single page in the `pages` directory.
- **Layout Components**: Place layout components like headers, footers, and navigation in the `layout` directory.

## Troubleshooting

### Common Issues

#### 1. Tailwind CSS Not Applying to Relume Components

**Solution**: Ensure that your `tailwind.config.ts` file includes the Relume UI components in the content array and that you've added the Relume Tailwind preset.

#### 2. TypeScript Errors with Relume Components

**Solution**: Make sure you're using the correct import paths and that you've installed all the required dependencies.

#### 3. Component Styling Inconsistencies

**Solution**: Check for conflicts between your custom Tailwind configuration and the Relume Tailwind preset. The Relume preset should take precedence.

#### 4. Next.js App Router Compatibility

**Solution**: Add the 'use client' directive to the top of your component files when using Relume components in client components.

#### 5. Card Component Import Error

**Issue**: Importing the `Card` component from `@relume_io/relume-ui` causes a build error because the component doesn't exist in the library.

**Error Message**:
```
Attempted import error: 'Card' is not exported from '@relume_io/relume-ui' (imported as 'Card').
```

**Solution**: Replace the `Card` component with a regular `div` element with similar styling using Tailwind CSS classes:

```jsx
// Before
import { Button, Card } from "@relume_io/relume-ui";
// ...
<Card className="...">
  {/* Content */}
</Card>

// After
import { Button } from "@relume_io/relume-ui";
// ...
<div className="border rounded-lg shadow-md ...">
  {/* Content */}
</div>
```

This approach has been used successfully in multiple components across the project, including:
- Window Style Finder page
- Warranty page
- Vinyl Siding series pages
- Financing page
- Wood Windows page

## Resources

- [Official Relume React Documentation](https://react-docs.relume.io/)
- [Relume UI NPM Package](https://www.npmjs.com/package/@relume_io/relume-ui)
- [Relume Tailwind NPM Package](https://www.npmjs.com/package/@relume_io/relume-tailwind)
- [Relume Component Library](https://www.relume.io/react/components)
- [Relume Wireframe Conversion Documentation](../architecture/relume-wireframe-conversion.md)

Last Updated: May 14, 2025 (Added Card component troubleshooting information)

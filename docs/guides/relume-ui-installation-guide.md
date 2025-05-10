# Relume UI Installation Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Relume UI Installation Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Tailwind CSS Configuration](#tailwind-css-configuration)
5. [PostCSS Configuration](#postcss-configuration)
6. [Component Usage](#component-usage)
7. [Troubleshooting](#troubleshooting)
8. [Resources](#resources)

## Introduction

This guide provides step-by-step instructions for installing and configuring Relume UI in the Windows Doors CA project. Relume UI is a React component library that provides a comprehensive set of UI components based on the Relume design system.

## Prerequisites

Before installing Relume UI, ensure you have the following:

- Node.js (v14 or higher)
- npm (v7 or higher)
- Next.js (v13 or higher)
- React (v18.2.0 or higher)

## Installation Steps

### 1. Install Required Packages

Install the Relume UI packages and their dependencies:

```bash
npm install @relume_io/relume-ui @relume_io/relume-tailwind
```

### 2. Install Additional Dependencies

Install the required additional dependencies:

```bash
npm install -D framer-motion react-icons tailwindcss-animate @tailwindcss/typography postcss-import
```

### 3. Install Tailwind CSS v4 PostCSS Plugin

Since the project uses Tailwind CSS v4, you need to install the PostCSS plugin:

```bash
npm install -D @tailwindcss/postcss
```

## Tailwind CSS Configuration

### Basic Configuration

Create or update your `tailwind.config.ts` file with the following configuration:

```typescript
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  // Additional theme customizations can be added here
};
```

### Important Notes

1. The `content` array must include the Relume UI components path.
2. The `presets` array must include the Relume Tailwind preset.
3. You can add additional theme customizations, but be careful not to override the Relume preset.

## PostCSS Configuration

Create or update your `postcss.config.js` file with the following configuration:

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
};
```

### Important Notes

1. For Tailwind CSS v4, you must use `@tailwindcss/postcss` instead of `tailwindcss`.
2. The order of plugins matters: `postcss-import` should come first.

## Component Usage

### Basic Component Import

Import Relume UI components in your React components:

```jsx
import { Button } from "@relume_io/relume-ui";

export default function MyComponent() {
  return (
    <Button variant="primary">Click Me</Button>
  );
}
```

### Section Components

Relume UI provides section components that can be used to create entire page sections:

```jsx
import { Header47 } from "../../components/header/Header47";

export default function HomePage() {
  return (
    <Header47
      tagline="Quality"
      heading="Windows & Doors"
      description="Transform your home with our premium replacement windows and doors."
      buttons={[
        { title: "Estimate", variant: "primary" },
        { title: "Call", variant: "secondary" },
      ]}
    />
  );
}
```

## Troubleshooting

### Common Issues

#### 1. Tailwind CSS Not Applying to Relume Components

**Solution**: Ensure that your `tailwind.config.ts` file includes the Relume UI components in the content array and that you've added the Relume Tailwind preset.

#### 2. PostCSS Plugin Error

**Solution**: For Tailwind CSS v4, you must use `@tailwindcss/postcss` instead of `tailwindcss` in your PostCSS configuration.

#### 3. Component Styling Inconsistencies

**Solution**: Check for conflicts between your custom Tailwind configuration and the Relume Tailwind preset. The Relume preset should take precedence.

#### 4. Build Errors

**Solution**: Ensure that your package.json scripts are correctly configured and don't have recursive calls.

## Resources

- [Relume UI Documentation](https://react-docs.relume.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Project-Specific Notes

### Directory Structure

The Windows Doors CA project uses the following directory structure for Relume components:

```
Relume-root/
├── components/
│   ├── navigation/
│   ├── header/
│   ├── footer/
│   └── ...
├── pages-components/
│   ├── home/
│   ├── windows/
│   └── ...
└── ...
```

### Component Naming Convention

Relume components follow a specific naming convention:

- Element components: `Button`, `Card`, `Input`, etc.
- Section components: `Header47`, `Footer4`, `Layout6`, etc.

Last Updated: May 10, 2025

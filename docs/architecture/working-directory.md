# Working Directory Structure

## Overview

This document outlines the working directory structure for the Windows Doors CA website project. The project is built using Next.js with the App Router and integrates the Relume UI library.

## Primary Working Directory

The primary working directory for this project is:

```
C:\Users\IvoD\repos\react-win-dir\Relume-root\
```

All development work should be done within this directory. The project is configured to run all Next.js commands from this directory.

## Directory Structure

```
react-win-dir/                      # Project root (repository root)
└── Relume-root/                    # PRIMARY WORKING DIRECTORY
    ├── src/                        # Next.js source code
    │   └── app/                    # Next.js App Router
    │       ├── home/               # Home page route
    │       │   └── page.tsx
    │       ├── windows/            # Windows page route
    │       │   └── page.tsx
    │       ├── doors/              # Doors page route
    │       │   └── page.tsx
    │       ├── globals.css         # Global CSS
    │       ├── styles.css          # Custom styles
    │       ├── layout.tsx          # Root layout
    │       └── page.tsx            # Root page
    ├── components/                 # Reusable components
    │   ├── navigation/             # Navigation components
    │   ├── footer/                 # Footer components
    │   ├── header/                 # Header components
    │   ├── layout/                 # Layout components
    │   ├── gallery/                # Gallery components
    │   ├── testimonial/            # Testimonial components
    │   └── cta/                    # Call-to-action components
    ├── pages-components/           # Page-specific components
    │   └── home/                   # Home page components
    │       └── index.jsx           # Home page component
    ├── public/                     # Static assets
    │   └── images/                 # Static images
    ├── dist/                       # Build output directory
    ├── node_modules/               # Node.js dependencies
    ├── package.json                # Package configuration
    ├── next.config.js              # Next.js configuration
    ├── tailwind.config.ts          # Tailwind CSS configuration
    ├── postcss.config.js           # PostCSS configuration
    └── tsconfig.json               # TypeScript configuration
```

## Configuration

The project is configured to run all Next.js commands from the Relume-root directory. This is achieved through the scripts in the package.json file at the project root:

```json
"scripts": {
  "dev": "cd Relume-root && next dev",
  "build": "cd Relume-root && next build",
  "start": "cd Relume-root && next start",
  "lint": "cd Relume-root && next lint"
}
```

## Important Notes

1. **CRITICAL: Do NOT create or modify files outside the Relume-root directory**. ALL project files MUST be contained within the Relume-root directory. This is a strict requirement with no exceptions unless explicitly authorized by the project lead.

2. **Do NOT modify files in the Relume-DO-NOT-EDIT directory**. This directory contains the original Relume components that should be used as reference only.

3. When creating new components, copy them from the Relume-DO-NOT-EDIT directory to the appropriate location in the Relume-root directory and then modify them as needed.

4. The `pages-components` directory contains the page-specific components that are imported by the Next.js App Router pages. This naming convention is used to avoid conflicts with the Next.js Pages Router.

> **CRITICAL DIRECTORY STRUCTURE POLICY**: ALL files related to the website implementation MUST be located within the Relume-root directory. See the [Directory Structure Policy](./directory-structure-policy.md) for details.

## Routing

The project uses the Next.js App Router for routing. Routes are defined by the directory structure in the `src/app` directory:

- `/` - Root route (src/app/page.tsx)
- `/home` - Home route (src/app/home/page.tsx)
- `/windows` - Windows route (src/app/windows/page.tsx)
- `/doors` - Doors route (src/app/doors/page.tsx)

## Component Organization

- **Reusable Components**: Located in the `components` directory, organized by type (navigation, footer, header, etc.)
- **Page-Specific Components**: Located in the `pages-components` directory, organized by page (home, windows, doors, etc.)

## Last Updated

2023-11-16

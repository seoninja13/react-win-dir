# Relume Home Page Integration Plan

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Relume Home Page Integration Plan

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Integration Process](#step-by-step-integration-process)
4. [Component Structure](#component-structure)
5. [Testing and Validation](#testing-and-validation)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

## Introduction

This document provides a comprehensive plan for integrating the Home page using Relume UI components. It outlines the exact process we followed to successfully implement the Home page and serves as a template for implementing other pages in the Windows Doors CA website.

## Prerequisites

Before beginning the Home page integration, ensure the following prerequisites are met:

1. **Relume UI Installation**: Complete the [Relume UI Installation Guide](./relume-ui-installation-guide.md)
2. **Tailwind CSS Configuration**: Set up according to the [Relume Tailwind Configuration Guide](./relume-tailwind-configuration-guide.md)
3. **Project Structure**: Familiarize yourself with the [Project Structure Documentation](../architecture/component-structure.md)
4. **Reference Materials**: Access to the Relume-DO-NOT-EDIT folder containing the original components

## Step-by-Step Integration Process

### 1. Project Setup and Configuration

1. **Install Required Dependencies**:
   ```bash
   npm install @relume_io/relume-ui @relume_io/relume-tailwind
   npm install -D framer-motion react-icons tailwindcss-animate @tailwindcss/typography
   ```

2. **Configure Tailwind CSS**:
   Create or update `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
       "./pages/**/*.{js,ts,jsx,tsx}",
       "./components/**/*.{js,ts,jsx,tsx}",
       "./home/**/*.{js,ts,jsx,tsx}",
       "./styles/**/*.css"
     ],
     presets: [require("@relume_io/relume-tailwind")]
   }
   ```

3. **Configure PostCSS**:
   Create or update `postcss.config.js`:
   ```javascript
   module.exports = {
     plugins: {
       'postcss-import': {},
       'tailwindcss/nesting': {},
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

4. **Set Up Global CSS**:
   Create or update `styles/globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### 2. Directory Structure Creation

1. **Create Home Page Directory Structure**:
   ```
   Relume-root/
   ├── home/
   │   ├── components/
   │   │   ├── Navbar10.jsx
   │   │   ├── Header47.jsx
   │   │   ├── Header15.jsx
   │   │   ├── Layout6.jsx
   │   │   ├── Layout250.jsx
   │   │   ├── Layout4.jsx
   │   │   ├── Testimonial14.jsx
   │   │   ├── Layout251.jsx
   │   │   ├── Layout4_1.jsx
   │   │   ├── Gallery4.jsx
   │   │   ├── Cta1.jsx
   │   │   └── Footer4.jsx
   │   └── index.jsx
   ```

2. **Set Up Next.js Pages**:
   ```
   Relume-root/
   ├── pages/
   │   ├── _app.js
   │   └── index.js
   ```

### 3. Component Implementation

1. **Copy Reference Components**:
   Copy each component from `Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/` to `Relume-root/home/components/`.

2. **Create Home Page Index**:
   Create `Relume-root/home/index.jsx` by copying from the reference:
   ```jsx
   import React from "react";
   import { Navbar10 } from "./components/Navbar10";
   import { Header47 } from "./components/Header47";
   import { Header15 } from "./components/Header15";
   import { Layout6 } from "./components/Layout6";
   import { Layout250 } from "./components/Layout250";
   import { Layout4 } from "./components/Layout4";
   import { Testimonial14 } from "./components/Testimonial14";
   import { Layout251 } from "./components/Layout251";
   import { Layout4_1 } from "./components/Layout4_1";
   import { Gallery4 } from "./components/Gallery4";
   import { Cta1 } from "./components/Cta1";
   import { Footer4 } from "./components/Footer4";

   export default function Page() {
     return (
       <div>
         <Navbar10 />
         <Header47 />
         <Header15 />
         <Layout6 />
         <Layout250 />
         <Layout4 />
         <Testimonial14 />
         <Layout251 />
         <Layout4_1 />
         <Gallery4 />
         <Cta1 />
         <Footer4 />
       </div>
     );
   }
   ```

3. **Create Next.js Entry Point**:
   Create `Relume-root/pages/index.js`:
   ```jsx
   export { default } from '../home';
   ```

4. **Create App Wrapper**:
   Create `Relume-root/pages/_app.js`:
   ```jsx
   import '../styles/globals.css';

   export default function MyApp({ Component, pageProps }) {
     return <Component {...pageProps} />;
   }
   ```

### 4. Component Customization

1. **Update Text Content**:
   Replace all instances of "windowworldla.com" with "windowsdoorsca.com" in component files.

2. **Update Button Text**:
   Customize button text to be more descriptive (e.g., change "Estimate" to "Get a Free Estimate").

3. **Update Image Paths**:
   Ensure all image paths are updated to use the correct domain or local paths.

## Component Structure

The Home page consists of the following components, each serving a specific purpose:

1. **Navbar10**: Main navigation bar with dropdown menus
2. **Header47**: Hero section with main heading and call-to-action buttons
3. **Header15**: Secondary header with additional information
4. **Layout6**: Features section highlighting key benefits
5. **Layout250**: Product showcase section
6. **Layout4**: Information section with images and text
7. **Testimonial14**: Customer testimonials section
8. **Layout251**: Additional product showcase section
9. **Layout4_1**: Secondary information section
10. **Gallery4**: Image gallery showcasing projects
11. **Cta1**: Call-to-action section for lead generation
12. **Footer4**: Footer with links and contact information

## Testing and Validation

1. **Development Server**:
   Start the development server to test the implementation:
   ```bash
   yarn dev
   ```

2. **Visual Inspection**:
   - Compare the rendered page with the reference design
   - Verify all components are displayed correctly
   - Check responsive behavior at different screen sizes

3. **Functionality Testing**:
   - Test all interactive elements (buttons, links, dropdowns)
   - Verify navigation works correctly
   - Test form submissions if applicable

## Troubleshooting

### Common Issues and Solutions

1. **ESLint Configuration Error**:
   - Error: "Failed to load config 'next/core-web-vitals'"
   - Solution: Create a `.eslintrc.json` file in the Relume-root directory with the correct configuration

2. **Build Errors**:
   - Error: "RelumeProvider is not exported from '@relume_io/relume-ui'"
   - Solution: Remove the RelumeProvider wrapper from `_app.js` if it's not needed

3. **Styling Issues**:
   - Problem: Components not styled correctly
   - Solution: Verify Tailwind configuration includes all necessary content paths and the Relume preset

4. **Component Import Errors**:
   - Problem: Cannot find module errors
   - Solution: Ensure correct import paths and that all components are properly copied from the reference

## Next Steps

After successfully implementing the Home page, follow these steps to implement additional pages:

1. **Create Page Directory Structure**:
   Create a directory for each page (e.g., `windows`, `doors`, etc.) with a components subdirectory

2. **Copy Reference Components**:
   Copy components from the corresponding reference directory in Relume-DO-NOT-EDIT

3. **Create Page Index**:
   Create an index.jsx file that imports and renders all components

4. **Create Next.js Route**:
   Create a corresponding file in the pages directory that exports the page component

5. **Test and Validate**:
   Follow the testing and validation process outlined above

## Conclusion

This integration plan provides a comprehensive guide for implementing the Home page using Relume UI components. By following this process, you can successfully implement other pages in the Windows Doors CA website with consistent structure and styling.

Last Updated: May 10, 2025

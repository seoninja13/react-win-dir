# Wood Windows Page Documentation

> **Breadcrumb Navigation**: [README.md](../../../README.md) > [Documentation](../../index.md) > [Pages](../index.md) > [Windows](./index.md) > Wood Windows Page Documentation

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Implementation Details](#implementation-details)
5. [Issues and Solutions](#issues-and-solutions)
6. [Testing](#testing)
7. [Related Documentation](#related-documentation)

## Overview

The Wood Windows page showcases the wood window products offered by Windows Doors CA. It provides detailed information about the features, benefits, styles, and customization options for wood windows.

**URL Path**: `/wood-windows`  
**Template Type**: T3 (Product/Service Detail Page Template)  
**Priority Level**: High  

## Page Structure

The Wood Windows page follows the standard T3 template structure with the following sections:

1. **Navigation Bar**: Main navigation with dropdown menus
2. **Primary Header**: Large header with page title and brief description
3. **Secondary Header**: Hero section with background image, overlay, and call-to-action buttons
4. **Introduction**: Overview of wood windows with key features
5. **Window Styles**: Information about available wood window styles
6. **Materials**: Details about the materials used in wood windows
7. **Customization Options**: Information about customization options for wood windows
8. **Local Expertise**: Information about the company's local expertise
9. **Installation Process**: Step-by-step guide to the installation process
10. **Financing Options**: Information about financing options
11. **Testimonials**: Customer reviews and testimonials
12. **Call to Action**: Final call-to-action section
13. **Footer**: Standard footer with links and contact information

## Components

The Wood Windows page uses the following components:

1. **Navbar10**: Main navigation component with dropdown menus
2. **Header46**: Primary header component with page title and description
3. **Header5**: Secondary header component with background image, overlay, and call-to-action buttons
4. **Layout10**: Introduction component with image, text, and features
5. **Layout396**: Window styles component with cards for different window types
6. **Layout24**: Materials component with image and text
7. **Layout1**: Customization options component with image, text, and call-to-action buttons
8. **Layout201**: Local expertise component with image, text, and features
9. **Layout10_1**: Additional information component with image, text, and features
10. **Layout249**: Installation process component with steps and images
11. **Layout10_2**: Financing options component with image, text, and features
12. **Testimonial1**: Testimonials component with customer reviews
13. **Cta1**: Call-to-action component with image and buttons
14. **Footer4**: Footer component with links and contact information
15. **CustomButton**: Custom button component to replace Relume UI Button component (new)
16. **CustomCard**: Custom card component to replace Relume UI Card component (new)

## Implementation Details

The Wood Windows page was implemented using the following approach:

1. Verified that the wood-windows page directory and components already existed in the Relume-root directory
2. Confirmed that the wood-windows directory contained the necessary components
3. Created a route file at `Relume-root/pages/wood-windows.js` with the following content:
   ```javascript
   export { default } from '../wood-windows';
   ```
4. Encountered errors with components using Button and Card components from @relume_io/relume-ui
5. Created custom implementations of these components:
   - CustomButton.jsx
   - CustomCard.jsx
6. Updated all components to use the custom implementations instead of the Relume UI components
7. Tested the page and confirmed it was working correctly

### Code Structure

The Wood Windows page is structured as follows:

```
wood-windows/
├── components/
│   ├── Cta1.jsx (modified)
│   ├── CustomButton.jsx (new)
│   ├── CustomCard.jsx (new)
│   ├── Footer4.jsx
│   ├── Header46.jsx
│   ├── Header5.jsx (modified)
│   ├── Layout1.jsx (modified)
│   ├── Layout10.jsx (modified)
│   ├── Layout10_1.jsx (modified)
│   ├── Layout10_2.jsx (modified)
│   ├── Layout201.jsx (modified)
│   ├── Layout24.jsx
│   ├── Layout249.jsx (modified)
│   ├── Layout396.jsx (modified)
│   ├── Navbar10.jsx
│   └── Testimonial1.jsx
└── index.jsx
```

The `index.jsx` file imports all components and renders them in the correct order:

```jsx
import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header46 } from "./components/Header46";
import { Header5 } from "./components/Header5";
import { Layout10 } from "./components/Layout10";
import { Layout396 } from "./components/Layout396";
import { Layout24 } from "./components/Layout24";
import { Layout1 } from "./components/Layout1";
import { Layout201 } from "./components/Layout201";
import { Layout10_1 } from "./components/Layout10_1";
import { Layout249 } from "./components/Layout249";
import { Layout10_2 } from "./components/Layout10_2";
import { Testimonial1 } from "./components/Testimonial1";
import { Cta1 } from "./components/Cta1";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header46 />
      <Header5 />
      <Layout10 />
      <Layout396 />
      <Layout24 />
      <Layout1 />
      <Layout201 />
      <Layout10_1 />
      <Layout249 />
      <Layout10_2 />
      <Testimonial1 />
      <Cta1 />
      <Footer4 />
    </div>
  );
}
```

## Issues and Solutions

### Issue 1: Button Component Error

**Error Message**: 
```
Server Error
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

**Root Cause**: Several components were importing Button from @relume_io/relume-ui, but this component wasn't properly configured or available in the project.

**Solution**: 
1. Created a custom Button component (CustomButton.jsx) with the following code:
   ```jsx
   "use client";

   import React from "react";

   export function CustomButton({ 
     children, 
     variant = "primary", 
     size = "md", 
     className = "", 
     iconRight,
     onClick,
     ...props 
   }) {
     const getButtonClasses = () => {
       let baseClasses = "inline-flex items-center justify-center";
       
       // Size variants
       if (size === "sm") {
         baseClasses += " h-10 px-4 text-sm";
       } else if (size === "md") {
         baseClasses += " h-12 px-6";
       } else if (size === "lg") {
         baseClasses += " h-14 px-8 text-lg";
       } else if (size === "link") {
         baseClasses += " p-0";
       }
       
       // Style variants
       if (variant === "primary") {
         baseClasses += " rounded-lg bg-gray-800 text-center font-medium text-white transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
       } else if (variant === "secondary") {
         baseClasses += " rounded-lg border border-gray-800 bg-transparent text-center font-medium text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
       } else if (variant === "link") {
         baseClasses += " text-gray-800 hover:underline";
       }
       
       return `${baseClasses} ${className}`;
     };
     
     return (
       <button className={getButtonClasses()} onClick={onClick} {...props}>
         {children}
         {iconRight && <span className="ml-2">{iconRight}</span>}
       </button>
     );
   }
   ```
2. Modified all components that were using the Relume UI Button component to use our custom implementation instead
3. Replaced all instances of Button with CustomButton in the following files:
   - Layout10.jsx
   - Layout10_1.jsx
   - Layout10_2.jsx
   - Layout1.jsx
   - Layout201.jsx
   - Layout249.jsx
   - Layout396.jsx
   - Cta1.jsx
   - Header5.jsx

### Issue 2: Card Component Error

**Error Message**: Similar to the Button component error, the Card component from @relume_io/relume-ui was also causing issues.

**Root Cause**: The Layout396.jsx component was importing Card from @relume_io/relume-ui, but this component wasn't properly configured or available in the project.

**Solution**: 
1. Created a custom Card component (CustomCard.jsx) with the following code:
   ```jsx
   "use client";

   import React from "react";

   export function CustomCard({ children, className = "", ...props }) {
     return (
       <div 
         className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
         {...props}
       >
         {children}
       </div>
     );
   }
   ```
2. Modified the Layout396.jsx component to use our custom implementation instead
3. Replaced all instances of Card with CustomCard in the Layout396.jsx file

## Testing

The Wood Windows page has been tested for the following:

- **Desktop Rendering**: Verified that all components render correctly on desktop
- **Mobile Rendering**: Verified that all components render correctly on mobile
- **Tablet Rendering**: Verified that all components render correctly on tablet
- **Component Functionality**: Verified that all interactive components function correctly
- **Navigation**: Verified that all navigation links work correctly
- **Button Components**: Verified that all custom button components work correctly
- **Card Components**: Verified that all custom card components work correctly

## Related Documentation

- [Windows Page Documentation](./windows-page-documentation.md)
- [Double-Hung Windows Page Documentation](./double-hung-page-documentation.md)
- [Casement Windows Page Documentation](./casement-page-documentation.md)
- [Bay-Bow Windows Page Documentation](./bay-bow-page-documentation.md)
- [Awning Windows Page Documentation](./awning-page-documentation.md)
- [Picture Windows Page Documentation](./picture-page-documentation.md)
- [Sliding Windows Page Documentation](./sliding-page-documentation.md)
- [Custom Windows Page Documentation](./custom-page-documentation.md)
- [Energy-Efficient Windows Page Documentation](./energy-efficient-page-documentation.md)
- [Garden Windows Page Documentation](./garden-page-documentation.md)
- [Shutters Page Documentation](./shutters-page-documentation.md)
- [Wood Windows Page Implementation Log](../../daily-logs/2025-05-12-wood-windows-page-implementation.md)
- [Webpage Progress Tracker](../../tracking/webpage-progress-tracker.md)

Last Updated: May 12, 2025

# Custom Windows Page Documentation

> **Breadcrumb Navigation**: [README.md](../../../README.md) > [Documentation](../../index.md) > [Pages](../index.md) > [Windows](./index.md) > Custom Windows Page Documentation

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Implementation Details](#implementation-details)
5. [Issues and Solutions](#issues-and-solutions)
6. [Testing](#testing)
7. [Related Documentation](#related-documentation)

## Overview

The Custom Windows page showcases the custom window products offered by Windows Doors CA. It provides detailed information about the features, benefits, styles, and customization options for custom windows.

**URL Path**: `/custom`  
**Template Type**: T3 (Product/Service Detail Page Template)  
**Priority Level**: High  

## Page Structure

The Custom Windows page follows the standard T3 template structure with the following sections:

1. **Navigation Bar**: Main navigation with dropdown menus
2. **Hero Section**: Large hero image with page title and brief description
3. **Introduction**: Overview of custom windows with key features
4. **Features and Benefits**: Detailed information about the features and benefits
5. **Styles and Options**: Information about available styles and customization options
6. **Gallery**: Showcase of homes with custom windows
7. **Testimonials**: Customer reviews and testimonials
8. **FAQ Section**: Frequently asked questions about custom windows
9. **Footer**: Standard footer with links and contact information

## Components

The Custom Windows page uses the following components:

1. **Navbar10**: Main navigation component with dropdown menus
2. **Header49**: Hero section component with background image and overlay
3. **Header36**: Introduction component with title, description, and call-to-action buttons
4. **Layout4**: Features and benefits component with image and text
5. **Layout249**: Styles and options component with image and text
6. **Layout3**: Additional features component with image and text
7. **Layout25**: Additional information component with image and text
8. **Gallery13**: Gallery component with carousel functionality (custom implementation)
9. **Layout254**: Additional features component with image and text
10. **Testimonial5**: Testimonials component with customer reviews
11. **Faq4**: FAQ component with accordion-style questions and answers (custom implementation)
12. **Footer4**: Footer component with links and contact information

## Implementation Details

The Custom Windows page was implemented using the following approach:

1. Verified that the custom page directory and components already existed in the Relume-root directory
2. Confirmed that the custom directory contained the necessary components
3. Created a route file at `Relume-root/pages/custom.js` with the following content:
   ```javascript
   export { default } from '../custom';
   ```
4. Encountered errors with the Faq4 and Gallery13 components that were using components from @relume_io/relume-ui
5. Fixed the Faq4 component by replacing the Accordion components with a custom implementation using React's useState hook
6. Fixed the Gallery13 component by replacing the Carousel components with a custom implementation using React's useState hook
7. Tested the page and confirmed it was working correctly

### Code Structure

The Custom Windows page is structured as follows:

```
custom/
├── components/
│   ├── Navbar10.jsx
│   ├── Header49.jsx
│   ├── Header36.jsx
│   ├── Layout4.jsx
│   ├── Layout249.jsx
│   ├── Layout3.jsx
│   ├── Layout25.jsx
│   ├── Gallery13.jsx (modified)
│   ├── Layout254.jsx
│   ├── Testimonial5.jsx
│   ├── Faq4.jsx (modified)
│   └── Footer4.jsx
└── index.jsx
```

The `index.jsx` file imports all components and renders them in the correct order:

```jsx
import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header49 } from "./components/Header49";
import { Header36 } from "./components/Header36";
import { Layout4 } from "./components/Layout4";
import { Layout249 } from "./components/Layout249";
import { Layout3 } from "./components/Layout3";
import { Layout25 } from "./components/Layout25";
import { Gallery13 } from "./components/Gallery13";
import { Layout254 } from "./components/Layout254";
import { Testimonial5 } from "./components/Testimonial5";
import { Faq4 } from "./components/Faq4";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header49 />
      <Header36 />
      <Layout4 />
      <Layout249 />
      <Layout3 />
      <Layout25 />
      <Gallery13 />
      <Layout254 />
      <Testimonial5 />
      <Faq4 />
      <Footer4 />
    </div>
  );
}
```

## Issues and Solutions

### Issue 1: Relume UI Accordion Component Error in Faq4

**Error Message**: 
```
Server Error
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

**Root Cause**: The Faq4 component was importing Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, and Card components from @relume_io/relume-ui, but these components weren't properly configured or available in the project.

**Solution**: 
1. Created a custom implementation of the accordion functionality using React's useState hook
2. Replaced the Relume UI components with standard HTML/JSX elements styled with Tailwind CSS
3. Maintained the same visual appearance and functionality as the original component

The modified Faq4 component uses a simple state management approach to toggle the visibility of each FAQ item:

```jsx
const [openItems, setOpenItems] = useState({});

const toggleItem = (itemId) => {
  setOpenItems((prev) => ({
    ...prev,
    [itemId]: !prev[itemId],
  }));
};
```

### Issue 2: Relume UI Carousel Component Error in Gallery13

**Error Message**: 
```
Server Error
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

**Root Cause**: The Gallery13 component was importing Carousel, CarouselContent, CarouselItem, CarouselNext, and CarouselPrevious components from @relume_io/relume-ui, but these components weren't properly configured or available in the project.

**Solution**: 
1. Created a custom implementation of the carousel functionality using React's useState hook
2. Replaced the Relume UI components with standard HTML/JSX elements styled with Tailwind CSS
3. Implemented next/previous buttons and dot indicators for navigation
4. Maintained the same visual appearance and functionality as the original component

The modified Gallery13 component uses a simple state management approach to handle the carousel functionality:

```jsx
const [currentSlide, setCurrentSlide] = useState(0);
const totalSlides = 2;

const nextSlide = () => {
  setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
};

const goToSlide = (index) => {
  setCurrentSlide(index);
};
```

## Testing

The Custom Windows page has been tested for the following:

- **Desktop Rendering**: Verified that all components render correctly on desktop
- **Mobile Rendering**: Verified that all components render correctly on mobile
- **Tablet Rendering**: Verified that all components render correctly on tablet
- **Component Functionality**: Verified that all interactive components function correctly
- **Navigation**: Verified that all navigation links work correctly
- **FAQ Accordion**: Verified that the custom FAQ accordion implementation works correctly
- **Gallery Carousel**: Verified that the custom gallery carousel implementation works correctly

## Related Documentation

- [Windows Page Documentation](./windows-page-documentation.md)
- [Double-Hung Windows Page Documentation](./double-hung-page-documentation.md)
- [Casement Windows Page Documentation](./casement-page-documentation.md)
- [Bay-Bow Windows Page Documentation](./bay-bow-page-documentation.md)
- [Awning Windows Page Documentation](./awning-page-documentation.md)
- [Picture Windows Page Documentation](./picture-page-documentation.md)
- [Sliding Windows Page Documentation](./sliding-page-documentation.md)
- [Custom Windows Page Implementation Log](../../daily-logs/2025-05-12-custom-page-implementation.md)
- [Webpage Progress Tracker](../../tracking/webpage-progress-tracker.md)

Last Updated: May 12, 2025

# Double-Hung Windows Page Documentation

> **Breadcrumb Navigation**: [README.md](../../../README.md) > [Documentation](../../index.md) > [Pages](../index.md) > [Windows](./index.md) > Double-Hung Windows Page Documentation

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Implementation Details](#implementation-details)
5. [Issues and Solutions](#issues-and-solutions)
6. [Testing](#testing)
7. [Related Documentation](#related-documentation)

## Overview

The Double-Hung Windows page showcases the double-hung window products offered by Windows Doors CA. It provides detailed information about the features, benefits, styles, and customization options for double-hung windows.

**URL Path**: `/double-hung`
**Template Type**: T3 (Product/Service Detail Page Template)
**Priority Level**: High

## Page Structure

The Double-Hung Windows page follows the standard T3 template structure with the following sections:

1. **Navigation Bar**: Main navigation with dropdown menus
2. **Hero Section**: Large hero image with page title and brief description
3. **Introduction**: Overview of double-hung windows with key features
4. **Features and Benefits**: Detailed information about the features and benefits
5. **Styles and Options**: Information about available styles and customization options
6. **Gallery**: Showcase of homes with double-hung windows
7. **Customization Tool**: Information about the window customization tool
8. **Testimonials**: Customer reviews and testimonials
9. **Complementary Products**: Information about complementary products
10. **Call to Action**: Section encouraging visitors to request a free estimate
11. **Footer**: Standard footer with links and contact information

## Components

The Double-Hung Windows page uses the following components:

1. **Navbar10**: Main navigation component with dropdown menus
2. **Header44**: Hero section component with background image and overlay
3. **Header30**: Introduction component with title, description, and call-to-action buttons
4. **Layout10**: Features and benefits component with image and text
5. **Layout246**: Styles and options component with image and text
6. **Layout22**: Customization options component with image and text
7. **Layout4**: Gallery component with images of homes
8. **Layout237**: Customization tool component with image and text
9. **Layout22_1**: Complementary products component with image and text
10. **Layout241**: Additional features component with image and text
11. **Layout12**: Additional information component with image and text
12. **Testimonial19**: Testimonials component with customer reviews (modified version)
13. **Cta7**: Call-to-action component with form
14. **Footer4**: Footer component with links and contact information

## Implementation Details

The Double-Hung Windows page was implemented using the following approach:

1. Verified that the double-hung page directory and components already existed in the Relume-root directory
2. Created a route file at `Relume-root/pages/double-hung.js` with the following content:
   ```javascript
   export { default } from '../double-hung';
   ```
3. Encountered errors with the Testimonial19 component
4. Fixed the Testimonial19 component by replacing it with a simpler version that doesn't use the Carousel component
5. Tested the page by opening it in the browser at http://localhost:3000/double-hung
6. Confirmed that the page rendered correctly with all components
7. Created an App Router route at `Relume-root/src/app/double-hung/page.tsx` that imports the same components

### Routing

The Double-Hung Windows page is accessible through both the Pages Router and App Router:

#### Pages Router

The route is defined in `Relume-root/pages/double-hung.js`:

```javascript
export { default } from '../double-hung';
```

#### App Router

The route is defined in `Relume-root/src/app/double-hung/page.tsx`:

```tsx
'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import components from the Pages Router version
import { Navbar10 } from '../../../double-hung/components/Navbar10';
import { Header44 } from '../../../double-hung/components/Header44';
import { Header30 } from '../../../double-hung/components/Header30';
import { Layout10 } from '../../../double-hung/components/Layout10';
import { Layout246 } from '../../../double-hung/components/Layout246';
import { Layout22 } from '../../../double-hung/components/Layout22';
import { Layout4 } from '../../../double-hung/components/Layout4';
import { Layout237 } from '../../../double-hung/components/Layout237';
import { Layout22_1 } from '../../../double-hung/components/Layout22_1';
import { Layout241 } from '../../../double-hung/components/Layout241';
import { Layout12 } from '../../../double-hung/components/Layout12';
import { Testimonial19 } from '../../../double-hung/components/Testimonial19';
import { Cta7 } from '../../../double-hung/components/Cta7';
import { Footer4 } from '../../../double-hung/components/Footer4';

export default function DoubleHung() {
  useEffect(() => {
    // Log that the double-hung windows page has been rendered
    logger.info('Double-Hung Windows page rendered', {
      component: 'DoubleHungPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header44 />
      <Header30 />
      <Layout10 />
      <Layout246 />
      <Layout22 />
      <Layout4 />
      <Layout237 />
      <Layout22_1 />
      <Layout241 />
      <Layout12 />
      <Testimonial19 />
      <Cta7 />
      <Footer4 />
    </div>
  );
}
```

### Code Structure

The Double-Hung Windows page is structured as follows:

```
double-hung/
├── components/
│   ├── Navbar10.jsx
│   ├── Header44.jsx
│   ├── Header30.jsx
│   ├── Layout10.jsx
│   ├── Layout246.jsx
│   ├── Layout22.jsx
│   ├── Layout4.jsx
│   ├── Layout237.jsx
│   ├── Layout22_1.jsx
│   ├── Layout241.jsx
│   ├── Layout12.jsx
│   ├── Testimonial19.jsx (modified)
│   ├── Cta7.jsx
│   └── Footer4.jsx
└── index.jsx
```

The `index.jsx` file imports all components and renders them in the correct order:

```jsx
import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header44 } from "./components/Header44";
import { Header30 } from "./components/Header30";
import { Layout10 } from "./components/Layout10";
import { Layout246 } from "./components/Layout246";
import { Layout22 } from "./components/Layout22";
import { Layout4 } from "./components/Layout4";
import { Layout237 } from "./components/Layout237";
import { Layout22_1 } from "./components/Layout22_1";
import { Layout241 } from "./components/Layout241";
import { Layout12 } from "./components/Layout12";
import { Testimonial19 } from "./components/Testimonial19";
import { Cta7 } from "./components/Cta7";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header44 />
      <Header30 />
      <Layout10 />
      <Layout246 />
      <Layout22 />
      <Layout4 />
      <Layout237 />
      <Layout22_1 />
      <Layout241 />
      <Layout12 />
      <Testimonial19 />
      <Cta7 />
      <Footer4 />
    </div>
  );
}
```

## Issues and Solutions

Several issues were encountered during the implementation of the Double-Hung Windows page:

### Issue 1: Naming Conflict in Testimonial19 Component

**Error Message**:
```
ReferenceError: Cannot access 'useCarousel' before initialization
```

**Root Cause**: The Testimonial19 component had a naming conflict with the useCarousel function. The component was trying to use a hook called `useCarousel` but it was also trying to define a variable with the same name.

**Solution**: Initially, we tried to rename the variable to avoid the naming conflict:
```javascript
// Changed from
const useCarousel = useCarousel();
// To
const carousel = useCarousel();
```

### Issue 2: Carousel Component Import Problem

**Error Message**:
```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

**Root Cause**: The Carousel component from @relume_io/relume-ui was not being properly imported or was not available.

**Solution**: After analyzing working components that use the Carousel component (like Gallery13 in the custom directory), we decided to replace the Testimonial19 component with a simpler version that doesn't use the Carousel component. The simplified component uses a grid layout instead of a carousel, which achieves a similar visual effect without the complexity of the carousel component.

## Testing

The Double-Hung Windows page has been tested for the following:

- **Desktop Rendering**: Verified that all components render correctly on desktop
- **Mobile Rendering**: Verified that all components render correctly on mobile
- **Tablet Rendering**: Verified that all components render correctly on tablet
- **Component Functionality**: Verified that all interactive components function correctly
- **Navigation**: Verified that all navigation links work correctly
- **Call-to-Action Buttons**: Verified that all call-to-action buttons work correctly

## Related Documentation

- [Windows Page Documentation](./windows-page-documentation.md)
- [Casement Windows Page Documentation](./casement-page-documentation.md)
- [Bay-Bow Windows Page Documentation](./bay-bow-page-documentation.md)
- [Awning Windows Page Documentation](./awning-page-documentation.md)
- [Picture Windows Page Documentation](./picture-page-documentation.md)
- [Sliding Windows Page Documentation](./sliding-page-documentation.md)
- [Custom Windows Page Documentation](./custom-page-documentation.md)
- [Double-Hung Windows Page Implementation Log](../../daily-logs/2025-05-12-double-hung-page-implementation.md)
- [Webpage Progress Tracker](../../tracking/webpage-progress-tracker.md)

Last Updated: May 20, 2025 (Added App Router implementation)

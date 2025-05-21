# Windows Page Documentation

> **Breadcrumb Navigation**: [README.md](../../../README.md) > [Documentation](../../index.md) > [Pages](../index.md) > Windows Page

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Routing](#routing)
5. [Implementation Details](#implementation-details)
6. [Testing](#testing)
7. [Related Documentation](#related-documentation)

## Overview

The Windows page is a product category page that showcases the various window styles and options offered by Windows Doors CA. It follows the T2 (Product/Service Category Page) template as defined in the architecture documentation. The page provides an overview of window styles, features, benefits, and calls-to-action for potential customers.

## Page Structure

The Windows page is structured as a series of components that are imported and rendered in the `index.jsx` file. The page follows a logical flow of information from top to bottom, guiding visitors through the available window options.

```jsx
// Relume-root/windows/index.jsx
import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header46 } from "./components/Header46";
import { Header36 } from "./components/Header36";
import { Layout6 } from "./components/Layout6";
import { Layout254 } from "./components/Layout254";
import { Layout10 } from "./components/Layout10";
import { Layout254_1 } from "./components/Layout254_1";
import { Layout90 } from "./components/Layout90";
import { Layout246 } from "./components/Layout246";
import { Layout101 } from "./components/Layout101";
import { Testimonial32 } from "./components/Testimonial32";
import { Cta3 } from "./components/Cta3";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header46 />
      <Header36 />
      <Layout6 />
      <Layout254 />
      <Layout10 />
      <Layout254_1 />
      <Layout90 />
      <Layout246 />
      <Layout101 />
      <Testimonial32 />
      <Cta3 />
      <Footer4 />
    </div>
  );
}
```

## Components

The Windows page consists of the following components:

1. **Navbar10**: Main navigation bar with dropdown menus for site navigation
   - Location: `Relume-root/windows/components/Navbar10.jsx`
   - Features: Responsive design, dropdown menus, mobile menu toggle

2. **Header46**: Primary header with main heading
   - Location: `Relume-root/windows/components/Header46.jsx`
   - Features: Simple heading and subheading

3. **Header36**: Secondary header with image and call-to-action buttons
   - Location: `Relume-root/windows/components/Header36.jsx`
   - Features: Two-column layout with text and image, CTA buttons

4. **Layout6**: Features section highlighting key benefits
   - Location: `Relume-root/windows/components/Layout6.jsx`
   - Features: Grid layout with feature cards

5. **Layout254**: Window styles showcase section
   - Location: `Relume-root/windows/components/Layout254.jsx`
   - Features: Grid layout with window style options and central image

6. **Layout10**: Information section with image and text
   - Location: `Relume-root/windows/components/Layout10.jsx`
   - Features: Two-column layout with image and text

7. **Layout254_1**: Additional window styles showcase section
   - Location: `Relume-root/windows/components/Layout254_1.jsx`
   - Features: Similar to Layout254 but with different content

8. **Layout90**: Information section with text and image
   - Location: `Relume-root/windows/components/Layout90.jsx`
   - Features: Two-column layout with text and image

9. **Layout246**: Features grid section
   - Location: `Relume-root/windows/components/Layout246.jsx`
   - Features: Grid layout with feature cards

10. **Layout101**: Information section with image and text
    - Location: `Relume-root/windows/components/Layout101.jsx`
    - Features: Two-column layout with image and text

11. **Testimonial32**: Customer testimonials section
    - Location: `Relume-root/windows/components/Testimonial32.jsx`
    - Features: Testimonial cards with customer quotes

12. **Cta3**: Call-to-action section
    - Location: `Relume-root/windows/components/Cta3.jsx`
    - Features: Background image, heading, and CTA button

13. **Footer4**: Footer with links and contact information
    - Location: `Relume-root/windows/components/Footer4.jsx`
    - Features: Multi-column layout with links and contact information

## Routing

The Windows page is accessible at `/windows` through both the Next.js Pages Router and App Router:

### Pages Router

The route is defined in `Relume-root/pages/windows.js`:

```jsx
// Relume-root/pages/windows.js
export { default } from '../windows';
```

### App Router

The route is defined in `Relume-root/src/app/windows/page.tsx`:

```tsx
// Relume-root/src/app/windows/page.tsx
'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import components from the Pages Router version
import { Navbar10 } from '../../../windows/components/Navbar10';
import { Header46 } from '../../../windows/components/Header46';
import { Header36 } from '../../../windows/components/Header36';
import { Layout6 } from '../../../windows/components/Layout6';
import { Layout254 } from '../../../windows/components/Layout254';
import { Layout10 } from '../../../windows/components/Layout10';
import { Layout254_1 } from '../../../windows/components/Layout254_1';
import { Layout90 } from '../../../windows/components/Layout90';
import { Layout246 } from '../../../windows/components/Layout246';
import { Layout101 } from '../../../windows/components/Layout101';
import { Testimonial32 } from '../../../windows/components/Testimonial32';
import { Cta3 } from '../../../windows/components/Cta3';
import { Footer4 } from '../../../windows/components/Footer4';

export default function Windows() {
  useEffect(() => {
    // Log that the windows page has been rendered
    logger.info('Windows page rendered', {
      component: 'WindowsPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header46 />
      <Header36 />
      <Layout6 />
      <Layout254 />
      <Layout10 />
      <Layout254_1 />
      <Layout90 />
      <Layout246 />
      <Layout101 />
      <Testimonial32 />
      <Cta3 />
      <Footer4 />
    </div>
  );
}
```

## Implementation Details

### Relume UI Integration

The Windows page uses Relume UI components for consistent styling and functionality:

```jsx
// Example from Header36.jsx
import { Button } from "@relume_io/relume-ui";

export function Header36() {
  return (
    <section
      id="relume"
      className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0"
    >
      {/* Component content */}
      <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
        <Button title="Schedule">Schedule</Button>
        <Button title="Estimate" variant="secondary">
          Estimate
        </Button>
      </div>
    </section>
  );
}
```

### Tailwind CSS

The page uses Tailwind CSS for styling, following the configuration in `tailwind.config.js`:

```jsx
// Example from Layout254.jsx
<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
  <div className="container">
    <div className="mb-12 md:mb-18 lg:mb-20">
      <div className="mx-auto max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Styles</p>
        <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          Explore Our Diverse Window Styles
        </h2>
        {/* More styled elements */}
      </div>
    </div>
  </div>
</section>
```

### Responsive Design

The page is fully responsive, with different layouts for mobile, tablet, and desktop screens:

```jsx
// Example of responsive classes from Layout254.jsx
<div className="grid place-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-x-12">
  {/* Grid content */}
</div>
```

### Window Styles Showcase

The Windows page features two Layout254 components that showcase different window styles:

```jsx
// Example from Layout254.jsx
<div className="grid w-full grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16">
  <div className="flex flex-col items-center text-center">
    <div className="mb-5 md:mb-6">
      <img
        src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
        className="size-12"
        alt="Relume logo"
      />
    </div>
    <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
      Double-Hung Windows
    </h3>
    <p>
      Classic design with versatile functionality for easy cleaning
      and ventilation.
    </p>
  </div>
  {/* More window styles */}
</div>
```

## Testing

The Windows page has been tested and confirmed to match the design 100%. The testing process included:

1. Visual inspection of all components
2. Responsive testing on different screen sizes
3. Functionality testing of interactive elements
4. Comparison with the original design

## Related Documentation

- [Architecture Documentation](../../architecture/architecture-documentation.md)
- [Relume Home Page Integration Plan](../../guides/relume-home-page-integration-plan.md)
- [Component Structure Documentation](../../architecture/component-structure.md)

Last Updated: May 20, 2025 (Added App Router implementation)

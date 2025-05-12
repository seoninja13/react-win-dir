# Garden Page Documentation

> **Breadcrumb Navigation**: [README.md](../../../README.md) > [Documentation](../../index.md) > [Pages](../index.md) > Garden Page

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Routing](#routing)
5. [Implementation Details](#implementation-details)
6. [Testing](#testing)
7. [Related Documentation](#related-documentation)

## Overview

The Garden page is a product detail page that showcases garden windows offered by Windows Doors CA. It follows the T3 (Product/Service Detail Page) template as defined in the architecture documentation. The page provides detailed information about garden windows, their benefits, features, and installation options.

## Page Structure

The Garden page is structured as a series of components that are imported and rendered in the `index.jsx` file. The page follows the same structure as the Home page, with a logical flow of information from top to bottom.

```jsx
// Relume-root/garden/index.jsx
import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header50 } from "./components/Header50";
import { Header15 } from "./components/Header15";
import { Layout1 } from "./components/Layout1";
import { Layout245 } from "./components/Layout245";
import { Layout25 } from "./components/Layout25";
import { Layout249 } from "./components/Layout249";
import { Gallery5 } from "./components/Gallery5";
import { Layout10 } from "./components/Layout10";
import { Faq2 } from "./components/Faq2";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header50 />
      <Header15 />
      <Layout1 />
      <Layout245 />
      <Layout25 />
      <Layout249 />
      <Gallery5 />
      <Layout10 />
      <Faq2 />
      <Footer4 />
    </div>
  );
}
```

## Components

The Garden page consists of the following components:

1. **Navbar10**: Main navigation bar with dropdown menus for site navigation
   - Location: `Relume-root/garden/components/Navbar10.jsx`
   - Features: Responsive design, dropdown menus, mobile menu toggle

2. **Header50**: Hero section with main heading and call-to-action buttons
   - Location: `Relume-root/garden/components/Header50.jsx`
   - Features: Background image, heading, subheading, and CTA buttons

3. **Header15**: Secondary header with additional information
   - Location: `Relume-root/garden/components/Header15.jsx`
   - Features: Heading, subheading, and descriptive text

4. **Layout1**: Information section with text and image
   - Location: `Relume-root/garden/components/Layout1.jsx`
   - Features: Two-column layout with text and image

5. **Layout245**: Features section highlighting key benefits
   - Location: `Relume-root/garden/components/Layout245.jsx`
   - Features: Grid layout with feature cards

6. **Layout25**: Information section with image and text
   - Location: `Relume-root/garden/components/Layout25.jsx`
   - Features: Two-column layout with image and text

7. **Layout249**: Additional features section
   - Location: `Relume-root/garden/components/Layout249.jsx`
   - Features: Grid layout with feature cards

8. **Gallery5**: Image gallery showcasing garden windows
   - Location: `Relume-root/garden/components/Gallery5.jsx`
   - Features: Grid layout with images

9. **Layout10**: Call-to-action section
   - Location: `Relume-root/garden/components/Layout10.jsx`
   - Features: Background image, heading, and CTA button

10. **Faq2**: Frequently asked questions section
    - Location: `Relume-root/garden/components/Faq2.jsx`
    - Features: Accordion-style FAQ items

11. **Footer4**: Footer with links and contact information
    - Location: `Relume-root/garden/components/Footer4.jsx`
    - Features: Multi-column layout with links and contact information

## Routing

The Garden page is accessible at `/garden` through the Next.js Pages Router. The route is defined in `Relume-root/pages/garden.js`:

```jsx
// Relume-root/pages/garden.js
export { default } from '../garden';
```

## Implementation Details

### Relume UI Integration

The Garden page uses Relume UI components for consistent styling and functionality:

```jsx
// Example from Header50.jsx
import { Button } from "@relume_io/relume-ui";

export function Header50() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      {/* Component content */}
      <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
        <Button title="Get Started">Get Started</Button>
        <Button title="Contact Us" variant="secondary-alt">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
```

### Tailwind CSS

The page uses Tailwind CSS for styling, following the configuration in `tailwind.config.js`:

```jsx
// Example from Header50.jsx
<section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
  <div className="relative z-10 container">
    <div className="w-full max-w-lg">
      <p className="mb-3 font-semibold text-text-alternative md:mb-4">
        Quality
      </p>
      {/* More styled elements */}
    </div>
  </div>
</section>
```

### Responsive Design

The page is fully responsive, with different layouts for mobile, tablet, and desktop screens:

```jsx
// Example of responsive classes
<p className="mb-3 font-semibold text-text-alternative md:mb-4">
  Quality
</p>
<h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
  Window Solutions Sacramento
</h1>
```

## Testing

The Garden page has been tested and confirmed to match the design 100%. The testing process included:

1. Visual inspection of all components
2. Responsive testing on different screen sizes
3. Functionality testing of interactive elements
4. Comparison with the original design

## Related Documentation

- [Architecture Documentation](../../architecture/architecture-documentation.md)
- [Relume Home Page Integration Plan](../../guides/relume-home-page-integration-plan.md)
- [Component Structure Documentation](../../architecture/component-structure.md)

Last Updated: May 11, 2025

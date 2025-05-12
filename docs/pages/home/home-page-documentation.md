# Home Page Documentation

> **Breadcrumb Navigation**: [README.md](../../../README.md) > [Documentation](../../index.md) > [Pages](../index.md) > Home Page

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Routing](#routing)
5. [Implementation Details](#implementation-details)
6. [Testing](#testing)
7. [Related Documentation](#related-documentation)

## Overview

The Home page is the main landing page for the Windows Doors CA website. It follows the T1 (Homepage Template) as defined in the architecture documentation. The page provides an introduction to the company, showcases featured products, and includes calls-to-action for visitors.

## Page Structure

The Home page is structured as a series of components that are imported and rendered in the `index.jsx` file. The page follows a logical flow of information from top to bottom.

```jsx
// Relume-root/home/index.jsx
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

## Components

The Home page consists of the following components:

1. **Navbar10**: Main navigation bar with dropdown menus for site navigation
   - Location: `Relume-root/home/components/Navbar10.jsx`
   - Features: Responsive design, dropdown menus, mobile menu toggle

2. **Header47**: Hero section with main heading and call-to-action buttons
   - Location: `Relume-root/home/components/Header47.jsx`
   - Features: Background image, heading, subheading, and CTA buttons

3. **Header15**: Secondary header with additional information
   - Location: `Relume-root/home/components/Header15.jsx`
   - Features: Heading, subheading, and descriptive text

4. **Layout6**: Features section highlighting key benefits
   - Location: `Relume-root/home/components/Layout6.jsx`
   - Features: Grid layout with feature cards

5. **Layout250**: Product showcase section
   - Location: `Relume-root/home/components/Layout250.jsx`
   - Features: Grid layout with product cards

6. **Layout4**: Information section with images and text
   - Location: `Relume-root/home/components/Layout4.jsx`
   - Features: Two-column layout with image and text

7. **Testimonial14**: Customer testimonials section
   - Location: `Relume-root/home/components/Testimonial14.jsx`
   - Features: Carousel of customer testimonials

8. **Layout251**: Additional product showcase section
   - Location: `Relume-root/home/components/Layout251.jsx`
   - Features: Grid layout with product cards

9. **Layout4_1**: Secondary information section
   - Location: `Relume-root/home/components/Layout4_1.jsx`
   - Features: Two-column layout with image and text

10. **Gallery4**: Image gallery showcasing projects
    - Location: `Relume-root/home/components/Gallery4.jsx`
    - Features: Grid layout with images

11. **Cta1**: Call-to-action section for lead generation
    - Location: `Relume-root/home/components/Cta1.jsx`
    - Features: Background image, heading, and CTA button

12. **Footer4**: Footer with links and contact information
    - Location: `Relume-root/home/components/Footer4.jsx`
    - Features: Multi-column layout with links and contact information

## Routing

The Home page is accessible at the root URL (`/`) through the Next.js Pages Router. The route is defined in `Relume-root/pages/index.js`:

```jsx
// Relume-root/pages/index.js
export { default } from '../home';
```

## Implementation Details

For detailed implementation information, please refer to the [Relume Home Page Integration Plan](../../guides/relume-home-page-integration-plan.md), which provides a comprehensive guide to the Home page implementation process.

## Testing

The Home page has been tested and confirmed to match the design 100%. The testing process included:

1. Visual inspection of all components
2. Responsive testing on different screen sizes
3. Functionality testing of interactive elements
4. Comparison with the original design

## Related Documentation

- [Architecture Documentation](../../architecture/architecture-documentation.md)
- [Relume Home Page Integration Plan](../../guides/relume-home-page-integration-plan.md)
- [Component Structure Documentation](../../architecture/component-structure.md)

Last Updated: May 11, 2025

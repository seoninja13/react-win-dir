# Service Areas Page Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Pages](./index.md) > Service Areas Page Documentation

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Components](#components)
4. [Route Configuration](#route-configuration)
5. [Implementation Details](#implementation-details)
6. [Issues and Solutions](#issues-and-solutions)
7. [Testing](#testing)
8. [Related Documentation](#related-documentation)

## Overview

The Service Areas page is a standard informational page (T4 template) that provides information about the areas served by Windows Doors CA, including cities, counties, and a service area map. It helps users determine if their location is within the company's service area.

## Page Structure

The Service Areas page follows the T4 template structure, which includes:

1. Navigation bar
2. Main header with hero image
3. Secondary header with introduction
4. Content sections showcasing service areas
5. Map section
6. Call-to-action section
7. Footer

## Components

The Service Areas page consists of the following components:

1. **Navbar10**: Navigation bar component
   - Location: `Relume-root/service-areas/components/Navbar10.jsx`
   - Purpose: Provides site-wide navigation

2. **Header49**: Main header component
   - Location: `Relume-root/service-areas/components/Header49.jsx`
   - Purpose: Displays the main header with hero image

3. **Header9**: Secondary header component
   - Location: `Relume-root/service-areas/components/Header9.jsx`
   - Purpose: Displays the secondary header with introduction

4. **Layout4**: Service areas overview component
   - Location: `Relume-root/service-areas/components/Layout4.jsx`
   - Purpose: Displays an overview of the service areas

5. **Layout245**: Cities and counties component
   - Location: `Relume-root/service-areas/components/Layout245.jsx`
   - Purpose: Lists the cities and counties served

6. **Layout10**: Service area map component
   - Location: `Relume-root/service-areas/components/Layout10.jsx`
   - Purpose: Displays a map of the service area

7. **Layout12**: Eligibility component
   - Location: `Relume-root/service-areas/components/Layout12.jsx`
   - Purpose: Helps users determine if they are eligible for service

8. **Layout6**: Additional information component
   - Location: `Relume-root/service-areas/components/Layout6.jsx`
   - Purpose: Provides additional information about service areas

9. **Cta3**: Call-to-action component
   - Location: `Relume-root/service-areas/components/Cta3.jsx`
   - Purpose: Encourages users to request a free estimate

10. **Footer4**: Footer component
    - Location: `Relume-root/service-areas/components/Footer4.jsx`
    - Purpose: Displays the site-wide footer

## Route Configuration

The Service Areas page is configured with the following route:

```javascript
// File: Relume-root/src/app/service-areas/page.tsx
'use client';

import React from 'react';
import ServiceAreasPage from '../../../service-areas/index.jsx';

export default function ServiceAreas() {
  return <ServiceAreasPage />;
}
```

This configuration ensures that the `/service-areas` URL path renders the Service Areas component.

## Implementation Details

### Main Component

The main Service Areas component is defined in `Relume-root/service-areas/index.jsx`:

```jsx
import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header49 } from "./components/Header49";
import { Header9 } from "./components/Header9";
import { Layout4 } from "./components/Layout4";
import { Layout245 } from "./components/Layout245";
import { Layout10 } from "./components/Layout10";
import { Layout12 } from "./components/Layout12";
import { Layout6 } from "./components/Layout6";
import { Cta3 } from "./components/Cta3";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header49 />
      <Header9 />
      <Layout4 />
      <Layout245 />
      <Layout10 />
      <Layout12 />
      <Layout6 />
      <Cta3 />
      <Footer4 />
    </div>
  );
}
```

### App Router Implementation

The Service Areas page is implemented using the Next.js App Router approach. The page is defined in `src/app/service-areas/page.tsx` and imports the Service Areas component from the Relume-root directory.

## Issues and Solutions

Three issues were encountered during the implementation of the Service Areas page:

1. **Directory Structure Issue**: Initially, the Service Areas page returned a 404 error due to creating the page in the wrong directory. The issue was fixed by creating the page.tsx file in the correct directory (Relume-root/src/app/service-areas/) instead of the project root's src/app/service-areas/ directory. This highlights the importance of understanding the project's directory structure and working in the primary working directory (Relume-root/).

2. **CSS Formatting Issue**: After fixing the directory structure issue, the page was malformatted due to invalid CSS classes. Several components were using `rb-5` and `rb-12` classes, which are not valid Tailwind CSS classes. These were removed from the following components:

   - Layout245.jsx: Changed `rb-12` to just use the existing `mb-12` class, and changed three instances of `rb-5` to just use the existing `mb-5` class
   - Layout10.jsx: Changed `rb-5` to just use the existing `mb-5` class
   - Layout4.jsx: Changed `rb-5` to just use the existing `mb-5` class
   - Layout6.jsx: Changed `rb-5` to just use the existing `mb-5` class

3. **Missing Tailwind Configuration**: The service-areas directory was not included in the Tailwind CSS configuration. This was fixed by updating the tailwind.config.js file to include the service-areas directory in the content array:

   ```javascript
   // tailwind.config.js
   content: [
     // ... existing content
     "./service-areas/**/*.{js,ts,jsx,tsx}"
   ]
   ```

These issues are similar to formatting problems encountered in other pages. The combination of removing invalid CSS classes and updating the Tailwind configuration was necessary to properly render the page.

## Testing

The Service Areas page has been tested for the following:

1. **Functionality**:
   - The page loads correctly
   - All components render as expected
   - Navigation works correctly
   - Links function properly

2. **Responsiveness**:
   - The page displays correctly on desktop
   - The page displays correctly on tablet
   - The page displays correctly on mobile

3. **Browser Compatibility**:
   - The page works correctly in Chrome
   - The page works correctly in Firefox
   - The page works correctly in Safari
   - The page works correctly in Edge

## Related Documentation

- [Architecture Documentation](../architecture/architecture-documentation.md)
- [Page Structure Documentation](../architecture/page-structure.md)
- [Component Structure Documentation](../architecture/component-structure.md)
- [Webpage Progress Tracker](../tracking/webpage-progress-tracker.md)
- [Daily Log - Service Areas Page Implementation](../daily-logs/2025-05-14-service-areas-page-implementation.md)

Last Updated: May 14, 2025

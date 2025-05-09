# Page Structure

This document provides an overview of the page structure for the Window World LA website.

## Overview

The Window World LA website is built using Next.js with the App Router. Each page is defined in its own directory under the `src/app` directory, following the Next.js App Router convention.

## Page Organization

Pages are organized in the following structure:

```
src/app/
├── api/                # API routes
│   └── unsplash/       # Unsplash API route
├── contact/            # Contact page
├── doors/              # Doors page
├── roofing/            # Roofing page
├── vinyl-siding/       # Vinyl Siding page
├── windows/            # Windows page
├── layout.tsx          # Root layout
└── page.tsx            # Home page
```

## Page Components

Each page is composed of various components that are combined to create the complete page. The typical structure of a page includes:

1. **Header**: The main navigation header.
2. **Hero Section**: A prominent section at the top of the page.
3. **Content Sections**: Various sections that make up the main content of the page.
4. **Call-to-Action**: A section encouraging users to take action.
5. **Footer**: The footer section with additional links and information.

## Page Implementations

### Home Page (`src/app/page.tsx`)

The home page is the main landing page for the website. It includes:

- Header with navigation
- Hero section with a large image and call-to-action
- Product showcase section
- Features section
- Gallery section
- Call-to-action section
- Footer

### Windows Page (`src/app/windows/page.tsx`)

The Windows page provides information about window products. It includes:

- Header with navigation
- Hero section with a large image and call-to-action
- Window types section with images and descriptions
- Window features section
- Call-to-action section
- Footer

```tsx
// src/app/windows/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function WindowsPage() {
  // State and effects...

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section>...</section>
      {/* Window Types Section */}
      <section>...</section>
      {/* Features Section */}
      <section>...</section>
      {/* Call to Action */}
      <section>...</section>
      <Footer4 />
    </div>
  );
}
```

### Doors Page (`src/app/doors/page.tsx`)

The Doors page provides information about door products. It includes:

- Header with navigation
- Hero section with a large image and call-to-action
- Door types section with images and descriptions
- Door features section
- Call-to-action section
- Footer

```tsx
// src/app/doors/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function DoorsPage() {
  // State and effects...

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section>...</section>
      {/* Door Types Section */}
      <section>...</section>
      {/* Features Section */}
      <section>...</section>
      {/* Call to Action */}
      <section>...</section>
      <Footer4 />
    </div>
  );
}
```

### Vinyl Siding Page (`src/app/vinyl-siding/page.tsx`)

The Vinyl Siding page provides information about siding products. It includes:

- Header with navigation
- Hero section with a large image and call-to-action
- Siding types section with images and descriptions
- Siding benefits section
- Call-to-action section
- Footer

```tsx
// src/app/vinyl-siding/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function VinylSidingPage() {
  // State and effects...

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section>...</section>
      {/* Siding Types Section */}
      <section>...</section>
      {/* Benefits Section */}
      <section>...</section>
      {/* Call to Action */}
      <section>...</section>
      <Footer4 />
    </div>
  );
}
```

### Roofing Page (`src/app/roofing/page.tsx`)

The Roofing page provides information about roofing products. It includes:

- Header with navigation
- Hero section with a large image and call-to-action
- Roofing types section with images and descriptions
- Roofing benefits section
- FAQ section
- Call-to-action section
- Footer

```tsx
// src/app/roofing/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function RoofingPage() {
  // State and effects...

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section>...</section>
      {/* Roofing Types Section */}
      <section>...</section>
      {/* Benefits Section */}
      <section>...</section>
      {/* FAQ Section */}
      <section>...</section>
      {/* Call to Action */}
      <section>...</section>
      <Footer4 />
    </div>
  );
}
```

### Contact Page (`src/app/contact/page.tsx`)

The Contact page provides a form for users to contact the company. It includes:

- Header with navigation
- Hero section with a heading and description
- Contact information section
- Contact form section
- Map section
- Footer

```tsx
// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@relume_io/relume-ui';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function ContactPage() {
  // State and handlers...

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section>...</section>
      {/* Contact Information Section */}
      <section>...</section>
      {/* Contact Form Section */}
      <section>...</section>
      {/* Map Section */}
      <section>...</section>
      <Footer4 />
    </div>
  );
}
```

## Page Routing

The Next.js App Router automatically creates routes based on the directory structure. For example:

- `/` - Home page
- `/windows` - Windows page
- `/doors` - Doors page
- `/vinyl-siding` - Vinyl Siding page
- `/roofing` - Roofing page
- `/contact` - Contact page

## Page Data Fetching

Pages fetch data in the following ways:

1. **Client-Side Fetching**: Pages use the `useEffect` hook to fetch data from the API routes.
2. **API Routes**: API routes are used to fetch data from external services like Unsplash.

## Page Optimization

Pages are optimized in the following ways:

1. **Image Optimization**: Next.js Image component is used for image optimization.
2. **Client-Side Rendering**: Pages use client-side rendering for dynamic content.
3. **Responsive Design**: Pages are designed to be responsive and work on all device sizes.

## Related Documentation

- [Component Structure](./component-structure.md)
- [Unsplash Integration](../integrations/unsplash.md)
- [Development Workflow](../processes/development-workflow.md)

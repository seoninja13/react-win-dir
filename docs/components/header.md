# Header Component

This document provides detailed documentation for the Header component in the Window World LA website.

## Overview

The Header component (`src/components/Header.tsx`) serves as the main navigation header for the website. It provides navigation links to different sections of the website and includes a call-to-action button for requesting a free estimate.

## Component Structure

The Header component is structured as follows:

```jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@relume_io/relume-ui';

export default function Header() {
  // State and effects
  
  return (
    <header>
      {/* Alert Banner */}
      {/* Top Navigation */}
      {/* Main Header */}
      {/* Main Navigation (Desktop) */}
      {/* Mobile Menu */}
    </header>
  );
}
```

## Features

The Header component includes the following features:

1. **Alert Banner**: A prominent banner at the top of the page highlighting that Window World LA was voted as the #1 Home Remodeler in the U.S.

2. **Top Navigation**: Secondary navigation links to Reviews, Financing, Service Areas, and Contact pages.

3. **Main Header**: Contains the logo, contact information, and a call-to-action button for requesting a free estimate.

4. **Main Navigation**: Primary navigation links to Windows, Doors, Siding, Roofing, and About pages.

5. **Mobile Menu**: A responsive menu for mobile devices that can be toggled open and closed.

6. **Sticky Header**: The header sticks to the top of the page when scrolling down.

## State Management

The Header component uses the following state:

1. **mobileMenuOpen**: A boolean state that controls whether the mobile menu is open or closed.

```jsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

2. **scrolled**: A boolean state that tracks whether the user has scrolled down the page.

```jsx
const [scrolled, setScrolled] = useState(false);
```

## Effects

The Header component uses the following effects:

1. **Scroll Effect**: An effect that listens for scroll events and updates the `scrolled` state accordingly.

```jsx
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

## Styling

The Header component uses Tailwind CSS for styling. Key styling features include:

1. **Responsive Design**: The header is designed to be responsive and work on all device sizes.

2. **Sticky Header**: The header sticks to the top of the page when scrolling down.

```jsx
<header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
```

3. **Mobile Menu Toggle**: The mobile menu can be toggled open and closed on mobile devices.

```jsx
<button 
  className="flex items-center md:hidden"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
  {/* SVG icon */}
</button>
```

## Navigation Links

The Header component includes the following navigation links:

1. **Top Navigation**:
   - Reviews
   - Financing
   - Service Areas
   - Contact

2. **Main Navigation**:
   - Windows
   - Doors
   - Siding
   - Roofing
   - About

## Call-to-Action

The Header component includes a call-to-action button for requesting a free estimate:

```jsx
<Link 
  href="/contact" 
  className="rounded-md bg-green-600 px-6 py-2 font-bold text-white transition hover:bg-green-700"
>
  Request Free Estimate
</Link>
```

## Mobile Responsiveness

The Header component is designed to be responsive and work on all device sizes:

1. **Desktop View**: On desktop, the header displays the full navigation menu and contact information.

2. **Mobile View**: On mobile, the header displays a hamburger menu that can be toggled to show the navigation links.

```jsx
{/* Mobile Menu */}
<div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
  {/* Mobile navigation links */}
</div>
```

## Usage

The Header component is used in all pages of the website. It is imported and used as follows:

```jsx
import Header from '@/components/Header';

export default function Page() {
  return (
    <div>
      <Header />
      {/* Page content */}
    </div>
  );
}
```

## Dependencies

The Header component has the following dependencies:

1. **React**: For building the component.
2. **Next.js**: For Image and Link components.
3. **Relume UI**: For the Button component.
4. **Tailwind CSS**: For styling.

## Related Components

- [Footer4](./footer4.md): The footer component used across the website.

## Related Documentation

- [Page Structure](../architecture/page-structure.md): Documentation on how pages are structured.
- [Component Structure](../architecture/component-structure.md): Documentation on how components are structured.

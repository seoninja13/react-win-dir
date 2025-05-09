# Home Page

This document provides detailed documentation for the Home page in the Window World LA website.

## Overview

The Home page (`src/app/page.tsx`) is the main landing page for the Window World LA website. It provides an overview of the company's products and services, and encourages visitors to request a free estimate.

## Page Structure

The Home page is structured as follows:

```tsx
// src/app/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { homeExteriorImages, windowImages, doorImages, sidingImages, roofingImages } from '@/utils/imageUrls';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Product Showcase */}
      {/* Features Section */}
      {/* Testimonials */}
      {/* Call to Action */}
    </div>
  );
}
```

## Sections

### Hero Section

The Hero section is the first section of the Home page. It features a large background image of a modern home exterior, with a heading, subheading, and call-to-action button.

```tsx
{/* Hero Section */}
<section className="relative h-screen">
  <div className="absolute inset-0">
    <Image
      src={homeExteriorImages.modern1}
      alt="Modern home exterior"
      fill
      style={{ objectFit: 'cover' }}
      priority
    />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
    <h1 className="mb-6 text-4xl font-bold md:text-6xl">Los Angeles' Leader in Windows, Doors, & Siding</h1>
    <p className="mb-8 text-xl md:text-2xl">Transform your home with quality products and expert installation</p>
    <button className="rounded-md bg-green-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-green-700">
      Request Free Estimate
    </button>
  </div>
</section>
```

### Product Showcase

The Product Showcase section displays the company's main product categories: windows, doors, siding, and roofing. Each product category includes an image, heading, description, and call-to-action link.

```tsx
{/* Product Showcase */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="mb-12 text-center text-3xl font-bold">Our Products</h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {/* Windows */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative h-64">
          <Image
            src={windowImages.doubleHung}
            alt="Windows"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-6">
          <h3 className="mb-3 text-xl font-bold">Windows</h3>
          <p className="mb-4 text-gray-700">
            Energy-efficient windows in a variety of styles to enhance your home's beauty and comfort.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Learn More →
          </a>
        </div>
      </div>
      
      {/* Doors */}
      {/* Siding */}
      {/* Roofing */}
    </div>
  </div>
</section>
```

### Features Section

The Features section highlights the key benefits of choosing Window World LA for home improvement projects. It includes icons, headings, and descriptions for each feature.

```tsx
{/* Features Section */}
<section className="bg-gray-100 py-16">
  <div className="container mx-auto px-4">
    <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Window World LA</h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Feature 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-blue-100 p-4">
          <svg
            className="h-8 w-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="mb-3 text-xl font-bold">Quality Products</h3>
        <p className="text-gray-700">
          Our products are built to last, with industry-leading warranties and energy-efficient designs.
        </p>
      </div>
      
      {/* Feature 2 */}
      {/* Feature 3 */}
      {/* Feature 4 */}
      {/* Feature 5 */}
      {/* Feature 6 */}
    </div>
  </div>
</section>
```

### Testimonials

The Testimonials section displays customer reviews and testimonials. It includes quotes, customer names, and locations.

```tsx
{/* Testimonials */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="mb-12 text-center text-3xl font-bold">What Our Customers Say</h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Testimonial 1 */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
            <Image
              src="/images/testimonial1.jpg"
              alt="Customer"
              width={48}
              height={48}
            />
          </div>
          <div>
            <h3 className="font-bold">John Smith</h3>
            <p className="text-sm text-gray-600">Los Angeles, CA</p>
          </div>
        </div>
        <p className="text-gray-700">
          "Window World LA did an amazing job replacing all the windows in our home. The installation was quick and professional, and the windows look great!"
        </p>
      </div>
      
      {/* Testimonial 2 */}
      {/* Testimonial 3 */}
    </div>
  </div>
</section>
```

### Call to Action

The Call to Action section encourages visitors to contact Window World LA for a free estimate. It includes a heading, subheading, and call-to-action button.

```tsx
{/* Call to Action */}
<section className="bg-blue-600 py-16 text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="mb-6 text-3xl font-bold">Ready to Transform Your Home?</h2>
    <p className="mb-8 text-xl">Contact us today for a free in-home estimate.</p>
    <button className="rounded-md bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-gray-100">
      Get Started
    </button>
  </div>
</section>
```

## Image Usage

The Home page uses images from the `imageUrls.ts` utility file:

```tsx
import { homeExteriorImages, windowImages, doorImages, sidingImages, roofingImages } from '@/utils/imageUrls';
```

These images are used for the hero section background and product showcase thumbnails.

## Styling

The Home page uses Tailwind CSS for styling. Key styling features include:

1. **Responsive Design**: The page is designed to be responsive and work on all device sizes.

2. **Grid Layout**: The product showcase and features sections use CSS Grid for layout.

3. **Flexbox**: The hero section and call-to-action section use Flexbox for centering content.

4. **Color Scheme**: The page uses a blue and green color scheme, with white and gray accents.

5. **Typography**: The page uses a hierarchy of font sizes and weights for headings and text.

## Responsive Behavior

The Home page is designed to be responsive and work on all device sizes:

1. **Mobile**: On mobile devices, sections stack vertically, and grid items take up the full width.

2. **Tablet**: On tablet devices, grid items are arranged in two columns.

3. **Desktop**: On desktop devices, grid items are arranged in three or four columns, depending on the section.

## SEO Considerations

The Home page includes the following SEO considerations:

1. **Semantic HTML**: The page uses semantic HTML elements like `section`, `h1`, `h2`, and `p`.

2. **Alt Text**: All images have descriptive alt text.

3. **Heading Hierarchy**: The page uses a proper heading hierarchy, with a single `h1` and multiple `h2` and `h3` elements.

4. **Meta Tags**: The page inherits meta tags from the root layout, including title and description.

## Related Documentation

- [Page Structure](../architecture/page-structure.md)
- [Component Structure](../architecture/component-structure.md)
- [Root Layout](../architecture/root-layout.md)
- [Utility Functions](../architecture/utility-functions.md)

# Utility Functions

This document provides detailed documentation for the utility functions used in the Window World LA website.

## Overview

The Window World LA website uses various utility functions to handle common tasks and provide reusable functionality. These utility functions are organized in the `src/utils` directory.

## Utility Functions Structure

```
src/utils/
├── imageUrls.ts
├── unsplash.ts
└── validation.ts
```

## Image URL Utilities

The `src/utils/imageUrls.ts` file contains utility functions and constants for managing image URLs used throughout the website.

### Image URL Constants

```typescript
// src/utils/imageUrls.ts

export const brandImages = {
  logo: '/images/logo.svg',
  energyStar: '/images/energyStar.png',
  goodHousekeeping: '/images/goodHousekeeping.png',
  madeInUsa: '/images/madeInUsa.png',
  remodeler: '/images/remodeler.png',
};

export const homeExteriorImages = {
  modern1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  modern2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  modern3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
};

export const windowImages = {
  doubleHung: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  casement: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  sliding: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
};

export const doorImages = {
  entry: 'https://images.unsplash.com/photo-1506368670575-2ecb8dd6d86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  patio: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  storm: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
};

export const sidingImages = {
  vinyl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  fiber: 'https://images.unsplash.com/photo-1600566752547-e5bcc8a1a289?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  insulated: 'https://images.unsplash.com/photo-1600566752687-0c4cbe8a4d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
};

export const roofingImages = {
  asphalt: 'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  metal: 'https://images.unsplash.com/photo-1600566752734-2a0cd26b6960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  tile: 'https://images.unsplash.com/photo-1600566752791-9c7c533a0e58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
};
```

### Usage

```typescript
import { brandImages, windowImages } from '@/utils/imageUrls';

// Use brand images
<Image src={brandImages.logo} alt="Window World Logo" width={180} height={60} />

// Use window images
<Image src={windowImages.doubleHung} alt="Double Hung Windows" width={800} height={600} />
```

## Unsplash Utilities

The `src/utils/unsplash.ts` file contains utility functions for interacting with the Unsplash API.

### Types

```typescript
// src/utils/unsplash.ts

export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  portfolio_url: string | null;
  bio: string | null;
  location: string | null;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: UnsplashUser;
}
```

### Functions

```typescript
// src/utils/unsplash.ts

export async function searchUnsplashPhotos(
  query: string,
  page: number = 1,
  perPage: number = 10,
  orderBy: 'latest' | 'relevant' = 'relevant'
): Promise<{ photos: UnsplashPhoto[]; total: number; total_pages: number }> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}&order_by=${orderBy}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    photos: data.results,
    total: data.total,
    total_pages: data.total_pages,
  };
}

export async function getRandomUnsplashPhotos(
  query: string,
  count: number = 1
): Promise<UnsplashPhoto[]> {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      query
    )}&count=${count}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.statusText}`);
  }

  return response.json();
}
```

### Usage

```typescript
import { searchUnsplashPhotos, getRandomUnsplashPhotos } from '@/utils/unsplash';

// Search for photos
const { photos, total, total_pages } = await searchUnsplashPhotos('windows', 1, 10, 'relevant');

// Get random photos
const randomPhotos = await getRandomUnsplashPhotos('windows', 3);
```

## Validation Utilities

The `src/utils/validation.ts` file contains utility functions for validating form inputs.

### Functions

```typescript
// src/utils/validation.ts

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

export function validateZipCode(zipCode: string): boolean {
  const zipCodeRegex = /^\d{5}(-\d{4})?$/;
  return zipCodeRegex.test(zipCode);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateMessage(message: string): boolean {
  return message.trim().length >= 10;
}
```

### Usage

```typescript
import { validateEmail, validatePhone, validateName, validateMessage } from '@/utils/validation';

// Validate form inputs
const isEmailValid = validateEmail(email);
const isPhoneValid = validatePhone(phone);
const isNameValid = validateName(name);
const isMessageValid = validateMessage(message);

// Use validation results
if (isEmailValid && isPhoneValid && isNameValid && isMessageValid) {
  // Submit form
} else {
  // Show validation errors
}
```

## Related Documentation

- [Component Structure](./component-structure.md)
- [Page Structure](./page-structure.md)
- [API Routes](./api-routes.md)

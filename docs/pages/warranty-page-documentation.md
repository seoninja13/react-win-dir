# Warranty Page Documentation

## Overview

The Warranty page provides detailed information about Window World's limited lifetime warranty for replacement windows and doors. It explains what the warranty covers, what it doesn't cover, and how customers can file a warranty claim.

## Page Structure

The Warranty page follows the T4 (Standard Informational Page) template and includes the following components:

1. **Navbar10**: Navigation bar component
   - Location: `Relume-root/warranty/components/Navbar10.jsx`
   - Purpose: Site-wide navigation

2. **Header44**: Header component
   - Location: `Relume-root/warranty/components/Header44.jsx`
   - Purpose: Page header with title "Lifetime Warranty Promise" and call-to-action buttons

3. **Layout3**: Main content section
   - Location: `Relume-root/warranty/components/Layout3.jsx`
   - Purpose: Introduction to the limited lifetime warranty for replacement windows and doors

4. **Layout240**: Features section
   - Location: `Relume-root/warranty/components/Layout240.jsx`
   - Purpose: Overview of comprehensive warranty coverage

5. **Layout239**: Details section
   - Location: `Relume-root/warranty/components/Layout239.jsx`
   - Purpose: Detailed information about warranty coverage

6. **Layout250**: Additional information section
   - Location: `Relume-root/warranty/components/Layout250.jsx`
   - Purpose: Information about what the warranty covers, what it doesn't cover, and steps to file a warranty claim

7. **Cta39**: Call-to-action section
   - Location: `Relume-root/warranty/components/Cta39.jsx`
   - Purpose: Encourages users to contact for warranty questions

8. **Faq6**: FAQ section
   - Location: `Relume-root/warranty/components/Faq6.jsx`
   - Purpose: Answers to frequently asked questions about the warranty

9. **Footer4**: Footer component
   - Location: `Relume-root/warranty/components/Footer4.jsx`
   - Purpose: Site-wide footer with links and contact information

## Route Configuration

The Warranty page is configured with the following route:

```typescript
// File: src/app/warranty/page.tsx
'use client';

import React from 'react';
import WarrantyPage from '../../../warranty/index.jsx';

export default function Warranty() {
  return <WarrantyPage />;
}
```

This configuration ensures that the `/warranty` URL path renders the Warranty component.

## Implementation Details

### Main Component

The main Warranty component is defined in `Relume-root/warranty/index.jsx`:

```jsx
"use client";

import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header44 } from "./components/Header44";
import { Layout3 } from "./components/Layout3";
import { Layout240 } from "./components/Layout240";
import { Layout239 } from "./components/Layout239";
import { Layout250 } from "./components/Layout250";
import { Cta39 } from "./components/Cta39";
import { Faq6 } from "./components/Faq6";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header44 />
      <Layout3 />
      <Layout240 />
      <Layout239 />
      <Layout250 />
      <Cta39 />
      <Faq6 />
      <Footer4 />
    </div>
  );
}
```

### Key Features

1. **Lifetime Warranty Promise**: The page emphasizes Window World's commitment to providing a limited lifetime warranty for replacement windows and doors.

2. **Comprehensive Coverage**: Detailed information about what the warranty covers, including defects in materials and workmanship.

3. **Warranty Exclusions**: Clear explanation of what the warranty does not cover, such as damage caused by improper installation or misuse.

4. **Claim Process**: Step-by-step instructions for filing a warranty claim.

5. **FAQ Section**: Answers to common questions about the warranty, presented in an accordion format for easy navigation.

## Issues and Solutions

During the implementation of the Warranty page, the following issues were encountered:

### 1. Card Component Import Error

**Issue**: The Warranty page was returning a server-side rendering error with the message "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined." After investigation, I found that the error was related to the `Card` component being imported from the @relume_io/relume-ui library but not being exported by that library.

**Error Message**:
```
Attempted import error: 'Card' is not exported from '@relume_io/relume-ui' (imported as 'Card').
```

**Root Cause**: The `Card` component was being imported in both the `Cta39.jsx` and `Faq6.jsx` components, but this component is not actually exported from the @relume_io/relume-ui library.

**Solution**: Fixed the issue by:

1. Adding the "use client" directive to the warranty/index.jsx file to ensure it works with server-side rendering
2. Removing the Card import from the components:
   - In `Cta39.jsx`, changed `import { Button, Card } from "@relume_io/relume-ui";` to `import { Button } from "@relume_io/relume-ui";`
   - In `Faq6.jsx`, removed `Card` from the import statement
3. Replacing all instances of the `<Card>` component with a `<div>` element with similar styling:
   - Added `className="border rounded-lg shadow-md"` or `className="border rounded-lg shadow-sm"` to the divs to maintain similar appearance

This approach allowed us to keep the original warranty page structure and components while fixing the import error. The key was identifying which component was causing the issue and replacing it with a standard HTML element with similar styling.

### 2. Component Modifications

#### Cta39.jsx Modifications:

```jsx
// Original import
import { Button, Card } from "@relume_io/relume-ui";

// Modified import
import { Button } from "@relume_io/relume-ui";

// Original Card usage
<Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
  {/* Card content */}
</Card>

// Modified div replacement
<div className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2 border rounded-lg shadow-md">
  {/* Card content */}
</div>
```

#### Faq6.jsx Modifications:

```jsx
// Original import
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
} from "@relume_io/relume-ui";

// Modified import
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";

// Original Card usage
<Card>
  <AccordionItem value="item-0" className="border-none px-5 md:px-6">
    {/* Accordion content */}
  </AccordionItem>
</Card>

// Modified div replacement
<div className="border rounded-lg shadow-sm">
  <AccordionItem value="item-0" className="border-none px-5 md:px-6">
    {/* Accordion content */}
  </AccordionItem>
</div>
```

## Testing

The Warranty page has been tested for the following:

1. **Server-Side Rendering**: Verified that the page renders correctly on the server without errors
2. **Component Rendering**: Confirmed that all components render correctly, including the modified Cta39 and Faq6 components
3. **Responsive Design**: Tested the page at multiple screen sizes to ensure it responds correctly
4. **Visual Presentation**: Ensured that the page maintains the original design despite the component modifications
5. **Button Functionality**: Verified that all buttons have the correct styling and hover effects
6. **Accordion Functionality**: Confirmed that the FAQ accordion sections expand and collapse correctly

### Testing Status

| Test | Status | Notes |
|------|--------|-------|
| Server-Side Rendering | Passed | Page renders correctly on the server |
| Component Rendering | Passed | All components render correctly, including modified components |
| Responsive Design | Passed | Page displays correctly on all screen sizes |
| Visual Presentation | Passed | Maintains original design despite component modifications |
| Button Functionality | Passed | All buttons display and function correctly |
| Accordion Functionality | Passed | FAQ accordion sections expand and collapse correctly |

## Related Pages

- [Home Page](../home/home-page-documentation.md)
- [Windows Page](../windows/windows-page-documentation.md)
- [Doors Page](../doors/doors-page-documentation.md)
- [Installation Page](../installation/installation-page-documentation.md)
- [Financing Page](../financing/financing-page-documentation.md)
- [Warranty Page Implementation Log](../../daily-logs/2025-05-13-warranty-page-implementation.md)
- [Webpage Progress Tracker](../../tracking/webpage-progress-tracker.md)

## Last Updated

May 13, 2025 (Updated with Card component import error fix)

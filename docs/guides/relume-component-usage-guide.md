# Relume Component Usage Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Component Categories](#component-categories)
3. [Element Components](#element-components)
   - [Button](#button)
   - [Input](#input)
   - [Accordion](#accordion)
   - [Dialog](#dialog)
   - [Dropdown Menu](#dropdown-menu)
4. [Section Components](#section-components)
   - [Hero Sections](#hero-sections)
   - [Feature Sections](#feature-sections)
   - [Testimonial Sections](#testimonial-sections)
   - [Contact Forms](#contact-forms)
5. [Component Customization](#component-customization)
6. [Next.js App Router Integration](#nextjs-app-router-integration)
7. [Best Practices](#best-practices)
8. [Resources](#resources)

## Introduction

This guide provides detailed examples and best practices for using Relume UI components in the Windows Doors CA project. It covers both Element components (basic UI building blocks) and Section components (pre-built page sections), along with customization options and integration with Next.js App Router.

## Component Categories

Relume UI provides two main categories of components:

### Element Components

Basic UI components that serve as building blocks for more complex components and pages. These include buttons, inputs, accordions, dialogs, etc.

### Section Components

Pre-built page sections that combine multiple element components to create complete UI sections. These include hero sections, feature sections, testimonial sections, etc.

## Element Components

### Button

The Button component is one of the most commonly used elements in the Relume UI library.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { Button } from '@relume_io/relume-ui';

export default function ButtonExample() {
  return (
    <div className="space-x-4">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  );
}
```

#### Button Props

- `variant`: The button style variant (`primary`, `secondary`, `outline`, `ghost`)
- `size`: The button size (`sm`, `md`, `lg`)
- `disabled`: Whether the button is disabled
- `asChild`: Render as a child component (useful for links)
- `className`: Additional CSS classes

#### Button with Icon

```jsx
import { Button } from '@relume_io/relume-ui';
import { ArrowRight } from 'react-icons/ai';

<Button variant="primary">
  Next Step <ArrowRight className="ml-2" />
</Button>
```

### Input

The Input component is used for text input fields.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { Input, Label } from '@relume_io/relume-ui';

export default function InputExample() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </div>
  );
}
```

#### Input Props

- `type`: The input type (`text`, `email`, `password`, etc.)
- `placeholder`: The input placeholder text
- `disabled`: Whether the input is disabled
- `className`: Additional CSS classes

### Accordion

The Accordion component is used to display collapsible content panels.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@relume_io/relume-ui';

export default function AccordionExample() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What types of windows do you offer?</AccordionTrigger>
        <AccordionContent>
          We offer a wide range of window types including double-hung, casement, sliding, bay, and more.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How long does installation take?</AccordionTrigger>
        <AccordionContent>
          Installation typically takes 1-2 days depending on the number and type of windows being installed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Dialog

The Dialog component is used to create modal dialogs.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@relume_io/relume-ui';

export default function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Request Free Estimate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a Free Estimate</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a free estimate for your windows or doors project.
          </DialogDescription>
        </DialogHeader>
        {/* Form content goes here */}
      </DialogContent>
    </Dialog>
  );
}
```

### Dropdown Menu

The Dropdown Menu component is used to create dropdown menus.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@relume_io/relume-ui';
import { Button } from '@relume_io/relume-ui';

export default function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">Products</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Windows</DropdownMenuItem>
        <DropdownMenuItem>Doors</DropdownMenuItem>
        <DropdownMenuItem>Siding</DropdownMenuItem>
        <DropdownMenuItem>Roofing</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Section Components

Section components are pre-built page sections that combine multiple element components to create complete UI sections.

### Hero Sections

Hero sections are typically used at the top of a page to showcase a key message or call-to-action.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { Hero } from '@relume_io/relume-ui';

export default function HeroExample() {
  return (
    <Hero
      title="Quality Windows and Doors for Your Home"
      description="Transform your home with our energy-efficient windows and stylish doors. Get a free estimate today!"
      ctaText="Request Free Estimate"
      ctaLink="/contact"
      image="/images/hero-image.jpg"
    />
  );
}
```

### Feature Sections

Feature sections are used to highlight key features or benefits of a product or service.

#### Basic Usage

```jsx
'use client';

import React from 'react';
import { FeatureGrid } from '@relume_io/relume-ui';

export default function FeatureGridExample() {
  const features = [
    {
      title: "Energy Efficient",
      description: "Our windows are designed to maximize energy efficiency and reduce utility costs.",
      icon: "eco",
    },
    {
      title: "Professional Installation",
      description: "Our expert installers ensure proper installation for optimal performance.",
      icon: "tools",
    },
    {
      title: "Lifetime Warranty",
      description: "We stand behind our products with a comprehensive lifetime warranty.",
      icon: "shield",
    },
  ];

  return (
    <FeatureGrid
      title="Why Choose Our Windows"
      description="Discover the benefits of our high-quality windows"
      features={features}
    />
  );
}
```

## Component Customization

Relume UI components can be customized in several ways:

### 1. Using Props

Most components accept props for customization:

```jsx
<Button 
  variant="primary" 
  size="lg" 
  className="rounded-full"
>
  Custom Button
</Button>
```

### 2. Using Tailwind Classes

You can add Tailwind classes to override default styles:

```jsx
<Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
  Custom Styled Button
</Button>
```

### 3. Using Theme Customization

You can customize the theme in your `tailwind.config.ts` file:

```typescript
module.exports = {
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004b8d',
          50: '#e6f0f9',
          // ... other shades
        },
        // ... other color customizations
      },
      // ... other theme customizations
    },
  },
};
```

## Next.js App Router Integration

When using Relume UI components with Next.js App Router, there are a few considerations:

### Client Components

Add the 'use client' directive at the top of your component file:

```jsx
'use client';

import React from 'react';
import { Button } from '@relume_io/relume-ui';

export default function ClientComponent() {
  return <Button>Click Me</Button>;
}
```

### Server Components

For server components, you'll need to import client components:

```jsx
// This is a server component
import ClientComponent from './ClientComponent';

export default function ServerComponent() {
  return (
    <div>
      <h1>Server Component</h1>
      <ClientComponent />
    </div>
  );
}
```

## Best Practices

1. **Use Client Directive**: Always add the 'use client' directive when using Relume UI components.
2. **Component Organization**: Organize components by type and purpose in the Relume-root directory.
3. **Consistent Styling**: Use the Relume design system consistently throughout the application.
4. **Responsive Design**: Test components at different screen sizes to ensure proper responsive behavior.
5. **Accessibility**: Ensure all components are accessible by using proper ARIA attributes and keyboard navigation.

## Resources

- [Official Relume React Documentation](https://react-docs.relume.io/)
- [Relume Component Library](https://www.relume.io/react/components)
- [Relume UI Integration Guide](./relume-ui-integration-guide.md)
- [Relume Tailwind Configuration Guide](./relume-tailwind-configuration-guide.md)

Last Updated: May 10, 2025

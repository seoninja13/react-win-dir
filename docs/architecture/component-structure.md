# Component Structure

This document provides an overview of the component structure for the Window World LA website.

## Overview

The Window World LA website is built using a component-based architecture with React and Next.js. Components are organized by functionality and reused across different pages to maintain consistency and reduce code duplication.

## Component Categories

Components are organized into the following categories:

1. **Layout Components**: Components that define the overall layout of the website, such as Header and Footer.
2. **UI Components**: Reusable UI components like buttons, cards, and form elements.
3. **Section Components**: Components that represent specific sections of a page, such as Hero, Features, and Call-to-Action.
4. **Page-Specific Components**: Components that are specific to a particular page.
5. **Integration Components**: Components that integrate with external services, such as Unsplash for images.

## Core Components

### Layout Components

#### Header (`src/components/Header.tsx`)

The Header component provides the main navigation for the website. It includes:

- Logo
- Main navigation menu
- Secondary navigation menu
- Mobile menu toggle
- Call-to-action button

```jsx
// Usage
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

#### Footer (`src/components/Footer4.jsx`)

The Footer component provides the footer section for the website. It includes:

- Logo
- Contact information
- Navigation links
- Social media links
- Copyright information

```jsx
// Usage
import Footer4 from '@/components/Footer4';

export default function Page() {
  return (
    <div>
      {/* Page content */}
      <Footer4 />
    </div>
  );
}
```

### Section Components

#### Layout4_1 (`src/components/Layout4_1.jsx`)

The Layout4_1 component provides a section for displaying financing options. It includes:

- Heading
- Description
- List of financing options
- Call-to-action button
- Image

```jsx
// Usage
import Layout4_1 from '@/components/Layout4_1';

export default function Page() {
  return (
    <div>
      {/* Other sections */}
      <Layout4_1 />
      {/* Other sections */}
    </div>
  );
}
```

#### Gallery4 (`src/components/Gallery4.jsx`)

The Gallery4 component provides a section for displaying a gallery of recent projects. It includes:

- Heading
- Description
- Grid of images with captions
- Call-to-action button

```jsx
// Usage
import Gallery4 from '@/components/Gallery4';

export default function Page() {
  return (
    <div>
      {/* Other sections */}
      <Gallery4 />
      {/* Other sections */}
    </div>
  );
}
```

#### Cta1 (`src/components/Cta1.jsx`)

The Cta1 component provides a call-to-action section. It includes:

- Heading
- Description
- Call-to-action buttons
- Background image

```jsx
// Usage
import Cta1 from '@/components/Cta1';

export default function Page() {
  return (
    <div>
      {/* Other sections */}
      <Cta1 />
      {/* Other sections */}
    </div>
  );
}
```

### Integration Components

#### UnsplashImage (`src/components/UnsplashImage.tsx`)

The UnsplashImage component provides a wrapper for displaying images from Unsplash with proper attribution. It includes:

- Image display
- Attribution information
- Placeholder for loading state

```jsx
// Usage
import UnsplashImage from '@/components/UnsplashImage';

export default function Page() {
  return (
    <div>
      {/* Other content */}
      <UnsplashImage
        photo={photo}
        alt="Description"
        width={800}
        height={600}
        showAttribution={true}
      />
      {/* Other content */}
    </div>
  );
}
```

#### UnsplashGallery (`src/components/UnsplashGallery.tsx`)

The UnsplashGallery component provides a gallery of images from Unsplash. It includes:

- Grid of images
- Pagination controls
- Loading state
- Error handling

```jsx
// Usage
import UnsplashGallery from '@/components/UnsplashGallery';

export default function Page() {
  return (
    <div>
      {/* Other content */}
      <UnsplashGallery
        query="modern windows home"
        perPage={8}
        columns={4}
        gap={4}
        imageHeight={300}
        showAttribution={true}
      />
      {/* Other content */}
    </div>
  );
}
```

## Component Dependencies

The components have the following dependencies:

- **React**: All components are built using React.
- **Next.js**: Components use Next.js features like Image and Link.
- **Tailwind CSS**: Components use Tailwind CSS for styling.
- **Relume UI**: Components use Relume UI components like Button.
- **Unsplash API**: Integration components use the Unsplash API for images.

## Component Customization

Components can be customized in the following ways:

1. **Props**: Most components accept props for customization.
2. **Tailwind Classes**: Components use Tailwind CSS classes that can be overridden.
3. **Children**: Some components accept children for custom content.

## Best Practices

When working with components, follow these best practices:

1. **Reuse Existing Components**: Before creating a new component, check if an existing component can be reused.
2. **Keep Components Focused**: Each component should have a single responsibility.
3. **Use TypeScript**: Use TypeScript for type safety and better developer experience.
4. **Document Components**: Document components with comments and examples.
5. **Test Components**: Write tests for components to ensure they work as expected.

## Related Documentation

- [Page Structure](./page-structure.md)
- [Unsplash Integration](../integrations/unsplash.md)
- [Development Workflow](../processes/development-workflow.md)

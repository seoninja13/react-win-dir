# Reusable Components

## Overview

This directory contains reusable components that are used across multiple pages of the Windows Doors CA website. These components have been extracted from the Relume folder and organized according to React best practices.

## Directory Structure

```
components/
├── navigation/       # Navigation components (header, footer, menus)
├── ui/               # UI components (buttons, cards, accordions)
├── forms/            # Form components (inputs, selectors, validation)
├── layout/           # Layout components (grids, containers)
├── media/            # Media components (images, videos, galleries)
└── README.md         # This file
```

## Component Categories

### Navigation Components

Navigation components are used for site navigation and are typically present on multiple pages. These include:

- Main navigation bar
- Footer
- Mega menus
- Mobile navigation
- Breadcrumbs

[View Navigation Components Documentation](./navigation/README.md)

### UI Components

UI components are basic building blocks used throughout the site. These include:

- Buttons
- Cards
- Accordions
- Tabs
- Modals
- Tooltips

### Form Components

Form components are used for user input and form submission. These include:

- Input fields
- Select dropdowns
- Checkboxes and radio buttons
- Form validation
- Form submission handlers

### Layout Components

Layout components define the structure and arrangement of content. These include:

- Grid systems
- Containers
- Sections
- Columns
- Responsive layouts

### Media Components

Media components handle the display of media content. These include:

- Image components
- Video players
- Galleries
- Carousels
- Lightboxes

## Usage Guidelines

When using these components, follow these guidelines:

1. **Import Path**: Use relative paths from your component to the reusable component.
   ```jsx
   import { Button } from "../../components/ui/Button";
   ```

2. **Props**: Check the component documentation for available props and their types.

3. **Styling**: Avoid adding custom styles directly to reusable components. Instead, use the provided props or create a wrapper component with your custom styles.

4. **Modifications**: If you need to modify a reusable component, consider creating a new variant rather than changing the original component.

## Implementation Notes

These components have been extracted from the Relume folder and organized according to React best practices. The original functionality and styling have been preserved, with minimal adjustments to ensure they work correctly in the new structure.

## Dependencies

Most components rely on the following dependencies:

- React 18.2.0
- @relume_io/relume-ui
- @relume_io/relume-tailwind
- Tailwind CSS
- Framer Motion (for animations)
- React Icons

Make sure these dependencies are installed and properly configured in your project.

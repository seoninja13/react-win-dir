# Component Mapping Documentation

This document maps the components from the @Relume-do-not-edit folder to their corresponding locations in the Relume-root directory.

## Home Page Components

| Original Component | New Location | Type | Description |
|-------------------|--------------|------|-------------|
| Header47.jsx | Relume-root/components/header/Header47.jsx | Reusable | Split header with title on left and description with buttons on right |
| Header15.jsx | Relume-root/components/header/Header15.jsx | Reusable | Header with title and description in two-column layout |
| Layout6.jsx | Relume-root/components/layout/Layout6.jsx | Reusable | Two-column layout with text content and image |
| Layout250.jsx | Relume-root/components/layout/Layout250.jsx | Reusable | Features section with heading and three feature cards |
| Layout4.jsx | Relume-root/components/layout/Layout4.jsx | Reusable | Two-column layout with text content and image |
| Testimonial14.jsx | Relume-root/components/testimonial/Testimonial14.jsx | Reusable | Testimonial section with video thumbnail and customer quote |
| Layout251.jsx | Relume-root/components/layout/Layout251.jsx | Reusable | Process section with heading and three steps |
| Layout4_1.jsx | Relume-root/components/layout/Layout4_1.jsx | Reusable | Two-column layout with text content and image |
| Gallery4.jsx | Relume-root/components/gallery/Gallery4.jsx | Reusable | Gallery section with heading and grid of images |
| Cta1.jsx | Relume-root/components/cta/Cta1.jsx | Reusable | Call-to-action section with heading, description, and buttons |

## Page Components

| Original Component | New Location | Type | Description |
|-------------------|--------------|------|-------------|
| index.jsx | Relume-root/pages/home/index.jsx | Page | Main home page component that combines all sections |

## Navigation Components

| Original Component | New Location | Type | Description |
|-------------------|--------------|------|-------------|
| Navbar10.jsx | Relume-root/components/navigation/Navbar10.jsx | Reusable | Main navigation bar |
| Footer4.jsx | Relume-root/components/footer/Footer4.jsx | Reusable | Main footer |

## Component Usage

### Home Page

The Home page (src/app/page.tsx) uses the HomePage component from Relume-root/pages/home/index.jsx, which in turn uses the following components:

1. Navbar10.jsx
2. Header47.jsx
3. Header15.jsx
4. Layout6.jsx
5. Layout250.jsx
6. Layout4.jsx
7. Testimonial14.jsx
8. Layout251.jsx
9. Layout4_1.jsx
10. Gallery4.jsx
11. Cta1.jsx
12. Footer4.jsx

## Component Modification Guidelines

When modifying components:

1. **Never** edit files in the @Relume-do-not-edit folder
2. Make all modifications to the copied files in the Relume-root directory
3. Ensure all import paths are updated to reflect the new directory structure
4. Add the 'use client' directive to all client components
5. Document all changes in the daily log

## Future Component Additions

As more pages are implemented, this document will be updated with additional component mappings.

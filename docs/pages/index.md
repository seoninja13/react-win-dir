# Pages Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > Pages

## Table of Contents

1. [Overview](#overview)
2. [Page Templates](#page-templates)
3. [Implemented Pages](#implemented-pages)
4. [Implementation Process](#implementation-process)
5. [Related Documentation](#related-documentation)

## Overview

This section contains documentation for all pages implemented in the Windows Doors CA website. Each page follows one of the templates defined in the architecture documentation and is implemented using Relume UI components and Next.js.

## Page Templates

As defined in the architecture documentation, the website uses the following page templates:

1. **T1: Homepage Template** - Used for the main landing page
2. **T2: Product/Service Category Page Template** - Used for category pages like Windows, Doors, Siding, Roofing
3. **T3: Product/Service Detail Page Template** - Used for specific product pages like Double-Hung Windows, Entry Doors
4. **T4: Standard Informational Page Template** - Used for About, Financing, Warranty, etc.
5. **T5: Blog List/Archive Page Template** - Used for the blog listing page
6. **T6: Blog Single Post Page Template** - Used for individual blog posts
7. **T7: Contact Page Template** - Used for the contact page
8. **T8: Gallery Page Template** - Used for the gallery page
9. **T9: FAQ Page Template** - Used for the FAQ page

## Implemented Pages

The following pages have been implemented:

1. [Home Page](./home/home-page-documentation.md) - T1 Template

### T2: Product/Service Category Pages
2. [Windows Page](./windows/windows-page-documentation.md) - T2 Template
3. [Doors Page](./doors/doors-page-documentation.md) - T2 Template
4. [Vinyl Siding Page](./vinyl-siding/vinyl-siding-page-documentation.md) - T2 Template
5. [Roofing Page](./roofing/roofing-page-documentation.md) - T2 Template

### T3: Product/Service Detail Pages
6. [1000-Series Vinyl Siding Page](./vinyl-siding/1000-series-page-documentation.md) - T3 Template
7. [1500-Series Vinyl Siding Page](./vinyl-siding/1500-series-page-documentation.md) - T3 Template
8. [2000-Series Vinyl Siding Page](./vinyl-siding/2000-series-page-documentation.md) - T3 Template
9. [3000-Series Vinyl Siding Page](./vinyl-siding/3000-series-page-documentation.md) - T3 Template
10. [4000-Series Vinyl Siding Page](./vinyl-siding/4000-series-page-documentation.md) - T3 Template
11. [Entry Doors Page](./doors/entry-page-documentation.md) - T3 Template
12. [Patio Doors Page](./doors/patio-page-documentation.md) - T3 Template
13. [Hinged Patio Doors Page](./doors/hinged-patio-doors-page-documentation.md) - T3 Template
14. [Garage Doors Page](./doors/garage-page-documentation.md) - T3 Template
15. [Double-Hung Windows Page](./windows/double-hung-page-documentation.md) - T3 Template
16. [Casement Windows Page](./windows/casement-page-documentation.md) - T3 Template
17. [Bay-Bow Windows Page](./windows/bay-bow-page-documentation.md) - T3 Template
18. [Awning Windows Page](./windows/awning-page-documentation.md) - T3 Template
19. [Picture Windows Page](./windows/picture-page-documentation.md) - T3 Template
20. [Sliding Windows Page](./windows/sliding-page-documentation.md) - T3 Template
21. [Custom Windows Page](./windows/custom-page-documentation.md) - T3 Template
22. [Energy-Efficient Windows Page](./windows/energy-efficient-page-documentation.md) - T3 Template
23. [Garden Windows Page](./windows/garden-page-documentation.md) - T3 Template
24. [Shutters Page](./windows/shutters-page-documentation.md) - T3 Template
25. [Wood Windows Page](./windows/wood-windows-page-documentation.md) - T3 Template

### T4: Standard Informational Pages
26. [Financing Page](./financing/financing-page-documentation.md) - T4 Template
27. [Installation Page](./installation/installation-page-documentation.md) - T4 Template
28. [About Us Page](./about-us/about-us-page-documentation.md) - T4 Template
29. [Service Areas Page](./service-areas-page-documentation.md) - T4 Template

### T5-T9: Other Page Types
30. [Blog Page](./blog/blog-page-documentation.md) - T5 Template
31. [Blog Post Page](./blog-post/blog-post-page-documentation.md) - T6 Template
32. [Contact Page](./contact/contact-page-documentation.md) - T7 Template
33. [Gallery Page](./gallery/gallery-page-documentation.md) - T8 Template
34. [FAQ Page](./faq/faq-page-documentation.md) - T9 Template

## Implementation Process

Each page is implemented following the process outlined in the [Relume Home Page Integration Plan](../guides/relume-home-page-integration-plan.md):

1. **Directory Structure Creation**:
   ```
   Relume-root/
   ├── [page-name]/
   │   ├── components/
   │   │   ├── Component1.jsx
   │   │   ├── Component2.jsx
   │   │   └── ...
   │   └── index.jsx
   ```

2. **Component Implementation**:
   - Copy reference components from `Relume-DO-NOT-EDIT/www.windowworldla.com/[page-name]/components/`
   - Customize as needed for Windows Doors CA

3. **Page Assembly**:
   - Create `index.jsx` that imports and renders all components
   - Create a corresponding file in the `pages` directory to define the route

4. **Testing and Validation**:
   - Visual inspection
   - Responsive testing
   - Functionality testing
   - Comparison with the original design

## Related Documentation

- [Architecture Documentation](../architecture/architecture-documentation.md)
- [Relume Home Page Integration Plan](../guides/relume-home-page-integration-plan.md)
- [Component Structure Documentation](../architecture/component-structure.md)

Last Updated: May 14, 2025 (Added documentation for Service Areas page)

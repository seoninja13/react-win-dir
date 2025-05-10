# Navigation Components

## Overview

This directory contains reusable navigation components that are used across multiple pages of the Windows Doors CA website. These components have been extracted from the Relume folder and organized according to React best practices.

## Component List

| Component | Description | Source |
|-----------|-------------|--------|
| Navbar10.jsx | Main navigation bar with dropdown menus | Relume/www.windowworldla.com/home/components/Navbar10.jsx |

## Component Details

### Navbar10

**Purpose**: Main navigation bar with dropdown menus and mobile responsiveness

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button, useMediaQuery components)
- framer-motion (AnimatePresence, motion components)
- React (useState hook)
- react-icons/rx (RxChevronDown icon)

**Description**: This component provides a responsive navigation bar with:
- Logo
- Navigation links
- Dropdown menu for Services
- Call-to-action buttons
- Mobile menu toggle
- Animated transitions for dropdowns and mobile menu

**Key Features**:
- Responsive design with different layouts for mobile and desktop
- Dropdown menu with blog topics and featured articles
- Animated transitions using framer-motion
- Mobile menu toggle with hamburger icon animation

## Usage

To use the Navbar10 component, import it into your page component:

```jsx
import { Navbar10 } from "../../components/navigation/Navbar10";

function MyPage() {
  return (
    <div>
      <Navbar10 />
      {/* Other page content */}
    </div>
  );
}
```

## Implementation Notes

When implementing this component, the following adjustments were made:

1. **Component Location**: Moved from page-specific components to shared components directory.

2. **Import Path**: Updated import paths in page components to reflect the new location.

3. **Dependencies**: The component relies on the @relume_io/relume-ui library for UI components like Button and useMediaQuery.

4. **Styling**: The original styling using Tailwind CSS classes was preserved.

## Future Improvements

1. **Link Configuration**: Update the navigation links to point to the correct pages within the site.

2. **Logo Replacement**: Replace the placeholder logo with the Windows Doors CA logo.

3. **Content Customization**: Update dropdown menu content to match the specific offerings of Windows Doors CA.

4. **Accessibility Enhancements**: Add ARIA attributes and keyboard navigation support.

5. **Performance Optimization**: Consider optimizing animations for better performance on lower-end devices.

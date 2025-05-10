# Home Page Components

## Overview

This directory contains the components for the Home page of the Windows Doors CA website. These components have been extracted from the Relume folder and organized according to React best practices.

## Component List

### Page-Specific Components

| Component | Description | Source |
|-----------|-------------|--------|
| Header47.jsx | Main hero section with headline and CTA buttons | Relume/www.windowworldla.com/home/components/Header47.jsx |
| Header15.jsx | Secondary header section | Relume/www.windowworldla.com/home/components/Header15.jsx |
| Layout6.jsx | Content layout section | Relume/www.windowworldla.com/home/components/Layout6.jsx |
| Layout250.jsx | Product categories section with images and text | Relume/www.windowworldla.com/home/components/Layout250.jsx |
| Layout4.jsx | Content layout section | Relume/www.windowworldla.com/home/components/Layout4.jsx |
| Testimonial14.jsx | Customer testimonials section | Relume/www.windowworldla.com/home/components/Testimonial14.jsx |
| Layout251.jsx | Content layout section | Relume/www.windowworldla.com/home/components/Layout251.jsx |
| Layout4_1.jsx | Content layout section | Relume/www.windowworldla.com/home/components/Layout4_1.jsx |
| Gallery4.jsx | Image gallery section | Relume/www.windowworldla.com/home/components/Gallery4.jsx |
| Cta1.jsx | Call-to-action section | Relume/www.windowworldla.com/home/components/Cta1.jsx |

### Shared Components

| Component | Description | Location |
|-----------|-------------|----------|
| Navbar10.jsx | Main navigation bar | Relume-root/components/navigation/Navbar10.jsx |
| Footer4.jsx | Page footer | Relume-root/components/footer/Footer4.jsx |

## Component Relationships

The Home page is composed of multiple components arranged in a specific order to create a cohesive user experience. The main page component (index.jsx) imports and renders these components in the following order:

1. Navbar10 (shared) - Top navigation bar
2. Header47 - Main hero section with headline and CTA buttons
3. Header15 - Secondary header section
4. Layout6 - Content layout section
5. Layout250 - Product categories section with images and text
6. Layout4 - Content layout section
7. Testimonial14 - Customer testimonials section
8. Layout251 - Content layout section
9. Layout4_1 - Content layout section
10. Gallery4 - Image gallery section
11. Cta1 - Call-to-action section
12. Footer4 (shared) - Page footer

The shared components (Navbar10 and Footer4) have been moved to the shared components directory to promote reusability across pages.

## Component Details

### Header47

**Purpose**: Main hero section with headline and CTA buttons

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React

**Description**: This component displays a prominent headline "Windows & Doors" with a brief description and two call-to-action buttons for "Estimate" and "Call".

### Header15

**Purpose**: Secondary hero section with headline, description, and image

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React

**Description**: This component displays a headline "Premium Replacement Windows & Doors for Your Home" with a description and two call-to-action buttons, along with a large image below.

### Layout6

**Purpose**: Content section with image and text about the company

**Props**: None

**Dependencies**:
- React

**Description**: This component displays information about Window World LA, including a headline, description, and two information boxes about company values and service commitment, alongside an image.

### Layout250

**Purpose**: Product categories section with images and text

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React
- react-icons/rx (RxChevronRight icon)

**Description**: This component displays a grid of three product categories, each with an image, heading, description, and a "Learn More" link. The categories include windows, siding, and installation services.

### Layout4

**Purpose**: Content section with image and text about why to choose the company

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React
- react-icons/rx (RxChevronRight icon)

**Description**: This component displays information about why to choose Window World Los Angeles, including a headline, description, and two information boxes about USA-made products and lifetime warranty, alongside an image.

### Testimonial14

**Purpose**: Customer testimonial section with video

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Dialog, DialogContent, DialogTrigger, VideoIframe components)
- React
- react-icons/bi (BiSolidStar icon)
- react-icons/fa6 (FaCirclePlay icon)

**Description**: This component displays a customer testimonial with a 5-star rating, quote, and customer information, alongside a video that can be played in a modal dialog.

### Layout251

**Purpose**: Process steps section with images and text

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React
- react-icons/rx (RxChevronRight icon)

**Description**: This component displays a three-step process for getting new windows, with each step having an image, heading, and description.

### Layout4_1

**Purpose**: Content section with image and text about financing options

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React
- react-icons/rx (RxChevronRight icon)

**Description**: This component displays information about financing options, including a headline, description, and two information boxes about easy payments and limited-time offers, alongside an image.

### Gallery4

**Purpose**: Project showcase gallery with images

**Props**: None

**Dependencies**:
- React

**Description**: This component displays a grid of four project images with a heading and description.

### Cta1

**Purpose**: Call-to-action section with image

**Props**: None

**Dependencies**:
- @relume_io/relume-ui (Button component)
- React

**Description**: This component displays a call-to-action section with a heading, description, and two buttons for "Estimate" and "Learn More", alongside an image.

## Implementation Notes

When implementing these components, the following adjustments were made:

1. **Component Naming**: The original component names were preserved to maintain consistency with the Relume folder.

2. **Import Paths**: Import paths were updated to reflect the new directory structure.

3. **Dependencies**: All components rely on the @relume_io/relume-ui library for UI components like Button.

4. **Styling**: The original styling using Tailwind CSS classes was preserved.

## Usage

To use the Home page, import the main page component:

```jsx
import HomePage from './pages/home';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}
```

## Future Improvements

1. **Image Optimization**: Replace placeholder images with optimized images specific to Windows Doors CA.

2. **Content Customization**: Update text content to match the specific offerings of Windows Doors CA.

3. **Link Integration**: Connect "Learn More" and CTA buttons to the appropriate pages within the site.

4. **Responsive Testing**: Thoroughly test the components at various screen sizes to ensure proper responsiveness.

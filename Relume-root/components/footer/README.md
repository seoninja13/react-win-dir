# Footer Components

## Overview

This directory contains reusable footer components that are used across multiple pages of the Windows Doors CA website. These components have been extracted from the Relume folder and organized according to React best practices.

## Component List

| Component | Description | Source |
|-----------|-------------|--------|
| Footer4.jsx | Main footer with logo, navigation links, and social media icons | Relume/www.windowworldla.com/home/components/Footer4.jsx |

## Component Details

### Footer4

**Purpose**: Main footer component with logo, navigation links, social media icons, and copyright information

**Props**: None

**Dependencies**:
- React
- react-icons/bi (BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoYoutube)
- react-icons/fa6 (FaXTwitter)

**Description**: This component provides a responsive footer with:
- Logo
- Navigation links
- Social media icons
- Copyright information
- Responsive layout for different screen sizes

**Key Features**:
- Responsive grid layout
- Social media integration
- Navigation links to key pages
- Copyright information

## Usage

To use the Footer4 component, import it into your page component:

```jsx
import { Footer4 } from "../../components/footer/Footer4";

function MyPage() {
  return (
    <div>
      {/* Page content */}
      <Footer4 />
    </div>
  );
}
```

## Implementation Notes

When implementing this component, the following adjustments were made:

1. **Component Location**: Moved from page-specific components to shared components directory.

2. **Import Path**: Updated import paths in page components to reflect the new location.

3. **Dependencies**: The component relies on react-icons for social media icons.

4. **Styling**: The original styling using Tailwind CSS classes was preserved.

## Future Improvements

1. **Link Configuration**: Update the navigation links to point to the correct pages within the site.

2. **Logo Replacement**: Replace the placeholder logo with the Windows Doors CA logo.

3. **Content Customization**: Update copyright information and company details.

4. **Accessibility Enhancements**: Add ARIA attributes and ensure proper contrast for text.

5. **Additional Information**: Consider adding contact information, address, and business hours.

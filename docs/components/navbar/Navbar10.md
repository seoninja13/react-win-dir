# Navbar10 Component Documentation

## Overview
The Navbar10 component is a responsive navigation bar component for the Windows & Doors website. It features both mobile and desktop layouts with dropdown menus and smooth animations.

## Technical Details

### 1. Component Structure
```jsx
export function Navbar10() {
  const useActive = useRelume();
  // Component JSX
}
```

### 2. Custom Hook: useRelume
The component uses a custom hook `useRelume` that manages state and responsive behavior:
```javascript
const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991px)");
    const handleResize = (e) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  // Additional state management logic
};
```

### 3. Dependencies
- `@relume_io/relume-ui`: For Button component
- `framer-motion`: For animations
- `react-icons/rx`: For chevron icon

### 4. Key Features
- Responsive design (mobile/desktop layouts)
- Animated dropdown menus
- Mobile menu hamburger toggle
- Services dropdown with blog topics
- Contact and quote buttons

### 5. Media Queries
- Mobile breakpoint: max-width: 991px
- Uses native matchMedia API for better performance

### 6. Animation States
```javascript
const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
const animateDropdownMenu = isDropdownOpen ? "open" : "close";
const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
```

## Usage
```jsx
import { Navbar10 } from "../home/components/Navbar10.jsx";

// In your page component:
<Navbar10 />
```

## Best Practices
1. Always use the component at the top level of pages
2. Don't modify the internal state management
3. Preserve the responsive breakpoints
4. Keep the animation configurations intact

## Troubleshooting

### Known Issues and Solutions
1. Issue: useMediaQuery compatibility
   - Problem: The useMediaQuery hook from @relume_io/relume-ui was causing SSR issues
   - Solution: Replaced with native window.matchMedia
   - Implementation: Added useEffect hook with proper cleanup

2. Issue: Animation performance
   - Solution: Using Framer Motion for optimized animations
   - Note: All animations are handled through Framer Motion's AnimatePresence

### Recent Fixes (2025-05-10)
1. Removed dependency on `useMediaQuery` from Relume UI
2. Implemented native window.matchMedia for responsive behavior
3. Added proper cleanup in useEffect
4. Fixed component structure and nesting
5. Added proper event handling for menu toggles

## Component Architecture

### File Structure
```
Relume-root/
├── pages/
│   └── index.js
└── home/
    └── components/
        ├── Navbar10.jsx
        ├── Header47.jsx
        └── [other components]
```

### Component Hierarchy
```
Navbar10
├── Desktop Navigation
│   ├── Logo
│   ├── Main Menu
│   ├── Services Dropdown
│   └── Action Buttons
└── Mobile Navigation
    ├── Logo
    ├── Hamburger Menu
    ├── Mobile Menu Panel
    └── Mobile Services Dropdown
```

## Maintenance Notes
- The component relies on Tailwind CSS classes
- Animation configurations are handled by Framer Motion
- Media queries are managed through native browser APIs
- Event listeners are properly cleaned up on unmount

## Testing Checklist
- [ ] Verify mobile menu functionality
- [ ] Test responsive breakpoints
- [ ] Check animation performance
- [ ] Ensure proper cleanup on unmount
- [ ] Verify dropdown menu behavior
- [ ] Test touch interactions on mobile
- [ ] Validate SSR compatibility

## Future Considerations
1. Potential Improvements
   - Consider context for shared state
   - Optimize bundle size
   - Add more interactive features

2. Maintenance Tasks
   - Regular testing of responsive behavior
   - Update dependencies as needed
   - Monitor performance metrics

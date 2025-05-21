# Reorganization Test Plan

This document outlines the testing approach to verify functionality after reorganizing the website pages.

## Test Objectives
- Verify that all pages render correctly after reorganization
- Ensure all components load properly with updated import paths
- Confirm that all interactive features work as expected
- Validate that the application builds without errors

## Test Approach

### 1. Build Verification
- Run `npm run build` to verify that the application builds without errors
- Check build logs for any warnings or errors related to import paths

### 2. Page Rendering Tests
Test each of the following pages to ensure they render correctly:

#### Window Pages
- /windows
- /windows/awning
- /windows/bay-bow
- /windows/casement
- /windows/double-hung
- /windows/energy-efficient
- /windows/picture-window
- /windows/sliding
- /windows/wood-windows

#### Door Pages
- /doors
- /doors/entry
- /doors/garage
- /doors/garden
- /hinged-patio-doors
- /doors/patio

#### Vinyl Siding Pages
- /vinyl-siding
- /vinyl-siding/1000-series
- /vinyl-siding/1500-series
- /vinyl-siding/2000-series
- /vinyl-siding/3000-series
- /vinyl-siding/4000-series
- /vinyl-siding/5000-series

#### Roofing Pages
- /roofing

#### Information Pages
- /about
- /blog
- /contact
- /faqs
- /financing
- /free-estimate-request
- /gallery
- /giving-back
- /installation
- /press
- /recognition
- /referral-program
- /reviews
- /satisfaction-survey
- /service-areas
- /shutters
- /styles
- /virtual-repair-center
- /warranty
- /why-window-world
- /window-style-finder

### 3. Component Tests
For each page, verify that the following components render correctly:
- Navigation menu
- Hero sections
- Product galleries
- Forms
- Footer

### 4. Interactive Feature Tests
Test the following interactive features:
- Navigation menu dropdowns
- Form submissions
- Image galleries
- Accordions
- Tabs
- Buttons and links

### 5. Responsive Design Tests
Test each page at the following viewport sizes:
- Mobile (320px - 480px)
- Tablet (481px - 768px)
- Laptop (769px - 1024px)
- Desktop (1025px and above)

## Test Results Tracking

| Page | Renders Correctly | Components Load | Interactive Features | Responsive Design | Notes |
|------|-------------------|-----------------|----------------------|-------------------|-------|
| /windows | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | |
| /doors | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | |
| ... | ... | ... | ... | ... | ... |

*Note: This table will be completed during the testing phase as each page is tested.*

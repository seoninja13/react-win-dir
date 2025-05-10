# Component Mapping

## Overview

This document maps the relationships between components in the Windows Doors CA website. It shows how components are connected, their hierarchical structure, and their usage across different pages. This mapping is essential for understanding the overall architecture and for implementing the components correctly.

## Table of Contents

1. [Global Components](#global-components)
2. [Page Components](#page-components)
3. [Component Hierarchy](#component-hierarchy)
4. [Component Usage Matrix](#component-usage-matrix)
5. [Interactive Element Mapping](#interactive-element-mapping)

## Global Components

These components are used across multiple pages throughout the website:

### Navigation Components

| Component | Description | Used In | Dependencies |
|-----------|-------------|---------|--------------|
| Header | Main site header with navigation | All pages | TopUtilityNav, Logo, MainNavigation |
| TopUtilityNav | Top utility navigation bar | All pages | None |
| MainNavigation | Main navigation with mega menus | All pages | WindowsMegaMenu, DoorsMegaMenu, SidingMegaMenu, AboutMegaMenu |
| WindowsMegaMenu | Mega menu for Windows section | All pages | None |
| DoorsMegaMenu | Mega menu for Doors section | All pages | None |
| SidingMegaMenu | Mega menu for Siding section | All pages | None |
| AboutMegaMenu | Mega menu for About section | All pages | None |
| Footer | Main site footer | All pages | NavigationColumns, ShowroomInfo, LegalLinks, BackToTopButton |

### Lead Generation Components

| Component | Description | Used In | Dependencies |
|-----------|-------------|---------|--------------|
| RequestEstimateForm | Form for requesting estimates | All pages | FormInput, FormButton, reCAPTCHA |
| ExitIntentPopup | Pop-up that appears when user tries to leave | All pages | RequestEstimateForm |
| CTAButton | Call-to-action button | All pages | None |
| PhoneLink | Clickable phone number | All pages | None |

### UI Components

| Component | Description | Used In | Dependencies |
|-----------|-------------|---------|--------------|
| Button | Reusable button component | All pages | None |
| Card | Content card with image and text | Multiple pages | None |
| Accordion | Expandable content sections | FAQ page, Product pages | None |
| Gallery | Image gallery with lightbox | Gallery page, Product pages | None |
| Testimonial | Customer testimonial display | Home page, About page | None |
| TrustBadge | Trust and certification badges | Multiple pages | None |

## Page Components

These components are specific to individual pages:

### Home Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| HomeHero | Hero section for home page | Button, BackgroundImage |
| ProductCategories | Display of main product categories | ProductCategoryCard |
| FeaturedTestimonials | Featured customer testimonials | TestimonialCard |
| HomeAboutSection | Brief about section on home page | Button |
| HomeCTA | Call-to-action section on home page | RequestEstimateForm |

### Windows Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| WindowsHero | Hero section for windows page | Button, BackgroundImage |
| WindowStyles | Display of window styles | WindowStyleCard |
| WindowFeatures | Window features section | FeatureCard |
| WindowFAQ | Windows-specific FAQ section | Accordion |
| WindowCTA | Windows-specific call-to-action | RequestEstimateForm |

### Doors Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| DoorsHero | Hero section for doors page | Button, BackgroundImage |
| DoorTypes | Display of door types | DoorTypeCard |
| DoorFeatures | Door features section | FeatureCard |
| DoorFAQ | Doors-specific FAQ section | Accordion |
| DoorCTA | Doors-specific call-to-action | RequestEstimateForm |

### Vinyl Siding Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| SidingHero | Hero section for siding page | Button, BackgroundImage |
| SidingSeries | Display of siding series | SidingSeriesCard |
| SidingFeatures | Siding features section | FeatureCard |
| SidingFAQ | Siding-specific FAQ section | Accordion |
| SidingCTA | Siding-specific call-to-action | RequestEstimateForm |

### Roofing Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| RoofingHero | Hero section for roofing page | Button, BackgroundImage |
| RoofingProducts | Display of roofing products | RoofingProductCard |
| RoofingFeatures | Roofing features section | FeatureCard |
| RoofingFAQ | Roofing-specific FAQ section | Accordion |
| RoofingCTA | Roofing-specific call-to-action | RequestEstimateForm |

### About Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| AboutHero | Hero section for about page | Button, BackgroundImage |
| CompanyHistory | Company history section | None |
| TeamMembers | Team members display | TeamMemberCard |
| Accreditations | Accreditations and certifications | TrustBadge |
| CommunityInvolvement | Community involvement section | None |

### Contact Page

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| ContactHero | Hero section for contact page | None |
| ContactForm | Contact form | FormInput, FormButton, reCAPTCHA |
| LocationMap | Map showing locations | None |
| ContactInfo | Contact information display | PhoneLink |

## Component Hierarchy

The following diagram shows the hierarchical structure of the main components:

```
App
├── Layout
│   ├── Header
│   │   ├── TopUtilityNav
│   │   │   ├── LearnMoreLink
│   │   │   ├── ReviewsLink
│   │   │   ├── FinancingLink
│   │   │   ├── ServiceAreasLink
│   │   │   ├── ContactLink
│   │   │   ├── PhoneLink
│   │   │   └── RequestEstimateButton
│   │   ├── Logo
│   │   └── MainNavigation
│   │       ├── WindowsMegaMenu
│   │       │   ├── MaterialLinks
│   │       │   ├── StyleLinks
│   │       │   ├── ExploreMoreLinks
│   │       │   └── FinancingBanner
│   │       ├── DoorsMegaMenu
│   │       │   ├── DoorTypeLinks
│   │       │   ├── ExploreMoreLinks
│   │       │   └── FinancingBanner
│   │       ├── SidingMegaMenu
│   │       │   ├── SeriesLinks
│   │       │   ├── ExploreMoreLinks
│   │       │   └── FinancingBanner
│   │       ├── RoofingLink
│   │       └── AboutMegaMenu
│   │           ├── WhyWindowWorldLinks
│   │           ├── ResourcesLinks
│   │           ├── SupportLinks
│   │           └── FinancingBanner
│   └── Footer
│       ├── NavigationColumns
│       │   ├── CompanyColumn
│       │   ├── SupportColumn
│       │   ├── ProductsColumn
│       │   └── ContactUsColumn
│       ├── AdditionalLinks
│       ├── ShowroomInfo
│       ├── LegalLinks
│       └── BackToTopButton
├── Pages
│   ├── HomePage
│   │   ├── HomeHero
│   │   ├── ProductCategories
│   │   ├── FeaturedTestimonials
│   │   ├── HomeAboutSection
│   │   └── HomeCTA
│   ├── WindowsPage
│   │   ├── WindowsHero
│   │   ├── WindowStyles
│   │   ├── WindowFeatures
│   │   ├── WindowFAQ
│   │   └── WindowCTA
│   ├── DoorsPage
│   │   ├── DoorsHero
│   │   ├── DoorTypes
│   │   ├── DoorFeatures
│   │   ├── DoorFAQ
│   │   └── DoorCTA
│   └── ... (other pages follow similar pattern)
└── SharedComponents
    ├── RequestEstimateForm
    ├── ExitIntentPopup
    ├── Button
    ├── Card
    ├── Accordion
    └── ... (other shared components)
```

## Component Usage Matrix

This matrix shows which components are used on which pages:

| Component | Home | Windows | Doors | Siding | Roofing | About | Contact | Estimate | Blog |
|-----------|------|---------|-------|--------|---------|-------|---------|----------|------|
| Header | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Footer | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| RequestEstimateForm | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ExitIntentPopup | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Accordion | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Gallery | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Testimonial | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| TrustBadge | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Hero Section | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CTA Section | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Interactive Element Mapping

This section maps the interactive elements across the website:

### Forms

| Form | Purpose | Pages | Fields |
|------|---------|-------|--------|
| RequestEstimateForm | Request free estimate | All pages | Name*, Email*, Phone*, Zip* |
| ContactForm | Contact the company | Contact page | Name*, Email*, Phone*, Message* |
| WarrantyClaimForm | Submit warranty claim | Warranty page | Name*, Email*, Phone*, Address*, Product Type*, Purchase Date*, Issue* |
| ReferralForm | Refer a friend | Referral page | Your Name*, Your Email*, Friend's Name*, Friend's Email* |

### Interactive UI Elements

| Element | Behavior | Pages |
|---------|----------|-------|
| MegaMenu | Expands on hover/click | All pages (Header) |
| ExitIntentPopup | Appears when cursor leaves viewport | All pages |
| Accordion | Expands/collapses on click | FAQ pages, Product pages |
| Gallery | Lightbox on image click | Gallery page, Product pages |
| BackToTopButton | Scrolls to top on click | All pages (Footer) |
| FilterDropdown | Filters content on selection | Blog page, Gallery page |
| Pagination | Navigates between content pages | Blog page, Gallery page |

This mapping provides a comprehensive overview of the component relationships and usage throughout the website, serving as a guide for implementation and ensuring consistency across the site.

# Windows Doors Website React - Project Rules and Documentation

## 1. Tech Stack and Architecture

- **Framework**: Next.js 15.3.1 with App Router
- **Routing Strategy**: Dynamic routing with ISR
- **URL Structure**:
  - Exact match to Window World LA website structure
  - Examples: `/windows`, `/doors`, `/about-us`, `/contact-us`, etc.
  - All URLs are defined in the architecture documentation

### Core Technical Components

- **Frontend**: Next.js, React 18.2.0, TypeScript, Tailwind CSS
- **UI Library**: Relume UI (@relume_io/relume-ui and @relume_io/relume-tailwind)
- **API Integrations**: Google Maps API, Form submission APIs
- **Database**: Supabase for all data storage and management
- **Build Optimization**: ISR with 6-month cache (revalidate: 86400)

### Architecture Documentation

The comprehensive architecture documentation is located at:
- `docs/architecture/architecture-documentation.md`

This document contains a detailed analysis of the Window World LA website that we are replicating exactly, including:
1. Full site map and navigation analysis
2. Page template analysis and wireframe descriptions
3. Content inventory (textual and visual assets)
4. UI/UX design elements specification
5. Responsive behavior analysis
6. Technology stack details
7. Replication guidance and considerations
8. Implementation for Windows Doors CA website

## 2. Project Structure

### Directory Organization

- **src/app/**: Next.js App Router pages and layouts
- **Relume-root/**: Relume UI components and templates
  - **components/**: Shared Relume components
  - **pages/**: Relume page components
- **docs/**: Project documentation
  - **architecture/**: Architecture documentation
  - **daily-logs/**: Daily development logs
  - **features/**: Feature documentation
  - **processes/**: Process documentation

### Content Structure

The content structure follows the architecture documentation, with pages organized according to the identified templates:

- T1: Homepage Template
- T2: Product/Service Category Page Template (Windows, Doors, Siding, Roofing)
- T3: Product/Service Detail Page Template (Double-Hung Windows, Entry Doors, etc.)
- T4: Standard Informational Page Template (About, Financing, Warranty, etc.)
- T5: Blog List/Archive Page Template
- T6: Blog Single Post Page Template
- T7: Contact Page Template
- T8: Gallery Page Template
- T9: FAQ Page Template

### Database Structure

We use Supabase as our database for all storage needs. The database tables are designed based on the Window World LA website architecture and our UI requirements:

- **products**: Stores all product information (windows, doors, siding, roofing)
  - Categories, types, features, specifications, images
  - Organized to support the T2 and T3 page templates

- **content**: Stores content for informational pages
  - Page content, sections, images
  - Supports T4, T5, T6, T8, and T9 page templates

- **leads**: Stores all lead information from the Request Free Estimate (RFE) forms
  - Customer information, requested services, timestamps
  - Critical for tracking conversion from the primary CTA across the site

- **testimonials**: Stores customer testimonials displayed across the site
  - Customer name, location, testimonial text, rating

- **gallery**: Stores project images for the gallery page
  - Project type, location, images, descriptions

- **service_areas**: Stores information about service areas
  - Cities, counties, zip codes, service availability

The database schema is designed to support the exact replication of the Window World LA website structure while providing efficient data retrieval for our Next.js implementation.

## 3. UI Requirements

### Component Specifications

- **All UI Components**: Must be exact visual replicas of Window World LA components
- **Navigation Menu**: Must match all dropdowns and interactions from original site
- **Forms**: Must replicate all form fields, validation, and submission behavior
- **Interactive Elements**: Must match all sliders, galleries, and other interactive components
- **Responsive Design**: Must match the original site at all breakpoints

### Visual Requirements

- **Color Scheme**: Must match Window World LA exactly (refer to architecture documentation)
- **Typography**: Must match font families, sizes, weights, and spacing
- **Spacing and Layout**: Must match padding, margins, and overall layout
- **Images and Icons**: Must use identical or visually equivalent assets
- **Animations and Transitions**: Must replicate all animations and transition effects

### Relume UI Integration

- Use Relume UI components as the foundation for building UI elements
- Customize Relume components to match the exact visual style of the original site
- Ensure proper Tailwind CSS configuration for Relume components
- Follow the Relume component structure documented in `docs/architecture/relume-wireframe-conversion.md`

## 4. Development Guidelines

### General Rules

- Before creating new components, check if they already exist in the codebase
- All documentation in docs/ folder following the established pyramid structure
- Follow component naming conventions that match the original site's structure
- Document code changes before committing. commit only with my approval.
- Maintain exact visual and functional parity with the original site
- **NEVER** edit any files in the "Relume-DO-NOT-EDIT" folder
- When working with Relume components:
  - Copy content from the "Relume-DO-NOT-EDIT" folder to the appropriate location
  - Make any necessary modifications only to the copied files
  - Leave the original files in the "Relume-DO-NOT-EDIT" folder completely untouched

### Best Practices

- Check for existing files before creating new ones
- Preserve layouts when replacing images
- Use heavily commented code to explain how components match the original
- Clean Next.js cache when needed
- Test all components at multiple screen sizes to ensure responsive design matches
- Use the architecture documentation as the primary reference for implementation
- Follow Supabase best practices for database operations:
  - Use typed queries with TypeScript for type safety
  - Implement proper error handling for all database operations
  - Use RLS (Row Level Security) policies for data protection
  - Create database indexes for frequently queried columns

### Daily Logs

- Create logs in docs/daily-logs/
- Use YYYY-MM-DD format for filenames
- Never delete logs, only create new ones
- Update project-tasks.md and priority-list.md for new features
- Document all component implementations and changes

## 5. Development Environment

### Setup Instructions

#### Directory Requirements
- Always run development server from the project root directory
- Ensure all paths are relative to the project root

#### Command Syntax
- Use semicolons (;) instead of && for commands
- Correct command: `cd path/to/project; npm run dev`
- For Netlify development: `netlify dev`

#### Supabase Setup
- Install Supabase CLI: `npm install -g supabase`
- Start local Supabase: `supabase start`
- Generate TypeScript types: `supabase gen types typescript --local > src/types/supabase.ts`
- Access local Supabase Studio: http://localhost:54323

#### Troubleshooting
- If port conflicts occur, kill all ports first: `taskkill /F /FI "IMAGENAME eq node.exe"`
- Always verify current working directory before running development server
- Fix build errors before trying to run the development server
- Ensure Relume UI is properly configured in tailwind.config.ts
- For Supabase connection issues, check environment variables and network connectivity

## 6. Documentation Standards

### Areas Where Documentation Adherence Needs Improvement

#### Strict Adherence to Documentation Standards
- Immediately check the documentation standards guide before making any changes
- Verify all required elements from the start rather than adding them incrementally
- Add table of contents for documentation over 400 lines

#### Complete Cross-Reference Updates
- Search for all references to specific terms across the codebase first
- Create a comprehensive list of all files needing updates before making any changes
- Always update the daily log when making significant changes

#### Proper Documentation Workflow
- Follow the exact workflow specified in the documentation standards
- Check for existing documentation before suggesting changes
- Verify the documentation pyramid structure before making edits

#### Attention to Detail in Documentation Requirements
- Pay close attention to the specific formatting requirements
- Ensure all dates are in the correct format (YYYY-MM-DD)
- Verify all links are using the correct relative paths

### Steps to Improve Documentation Adherence

#### Start with a Documentation Review
- Always begin by reviewing the documentation standards guide
- Create a checklist of required elements based on the standards
- Verify the current state of documentation before suggesting changes

#### Follow the Exact Workflow
- Follow the exact workflow specified in the documentation standards
- Check for existing documentation before creating or modifying files
- Verify the documentation pyramid structure before making edits

## 7. Exact Cloning Guidelines

### Component Mapping Process

1. Refer to the architecture documentation for component details
2. Analyze HTML structure, CSS styles, and JavaScript functionality
3. Create a React component that exactly matches the original
4. Implement all interactive behaviors using React hooks
5. Connect components to Supabase for dynamic content where appropriate
6. Test the component against the original for visual and functional parity
7. Document any deviations or workarounds required

### Database Integration Process

1. Analyze the content structure from the Window World LA website
2. Design Supabase tables based on content types and relationships
3. Create appropriate indexes and constraints for performance and data integrity
4. Implement Row Level Security (RLS) policies for data protection
5. Generate TypeScript types for type-safe database operations
6. Create utility functions for common database operations
7. Test database performance with realistic data volumes

### Accessibility Enhancements

- Add proper ARIA attributes while maintaining visual parity
- Ensure keyboard navigation works for all interactive elements
- Maintain proper color contrast ratios
- Add descriptive alt text for all images
- Implement focus indicators that match the original site's style

### SEO Optimization

- Preserve all meta tags from the original site
- Maintain identical URL structure
- Implement structured data matching the original site
- Ensure all canonical links are preserved
- Generate a comprehensive sitemap

## 8. Testing Requirements

### Visual Testing

- Compare screenshots of components against the original site
- Test at multiple breakpoints to verify responsive design
- Verify all animations and transitions match the original

### Functional Testing

- Test all interactive elements for identical behavior
- Verify all form validations match the original
- Test navigation and routing to ensure it matches the original site
- Verify all external links are preserved

### Database Testing

- Test all Supabase queries for correctness and performance
- Verify data integrity constraints are enforced
- Test Row Level Security (RLS) policies for proper access control
- Benchmark query performance with realistic data volumes
- Test error handling for database operations
- Verify TypeScript type safety for database operations

### Accessibility Testing

- Run automated accessibility tests (Lighthouse, axe)
- Perform keyboard navigation testing
- Test with screen readers
- Verify color contrast meets WCAG 2.1 AA standards

### Performance Testing

- Compare load times with the original site
- Optimize Core Web Vitals while maintaining visual parity
- Test on multiple devices and browsers

Last Updated: May 10, 2025 (Updated with Supabase database information and Relume-DO-NOT-EDIT guidelines)

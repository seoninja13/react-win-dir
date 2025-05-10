# Windows Doors CA - Implementation Plan

## Overview

This document outlines the detailed implementation plan for extracting content from the Relume folder and organizing it according to React best practices in the Relume-root directory. The plan ensures that the original Relume folder remains untouched while creating a well-structured, maintainable codebase.

## Project Documentation Index

| Document | Description | Path |
|----------|-------------|------|
| Implementation Plan | Main implementation plan with overview, strategy, and detailed steps | [README.md](./README.md) |
| Architecture Documentation | Comprehensive documentation of the website architecture | [architecture-documentation.md](./architecture-documentation.md) |
| Handling Relume Files | Guidelines for handling the original Relume files | [handling-relume-files.md](./handling-relume-files.md) |
| Component Mapping | Mapping of component relationships and hierarchies | [component-mapping.md](./component-mapping.md) |
| Page Implementation Guide | Detailed guide for implementing each page | [page-implementation-guide.md](./page-implementation-guide.md) |
| Documentation Structure | Overview of the pyramidal documentation structure | [documentation-structure.md](./documentation-structure.md) |
| Working Directory | Documentation of the working directory structure | [../docs/architecture/working-directory.md](../docs/architecture/working-directory.md) |
| Daily Logs | Daily development logs | [../docs/daily-logs/](../docs/daily-logs/) |
| Export Documentation | Comprehensive list of documentation files for export | [../Export Documentation/export-documentation.md](../Export%20Documentation/export-documentation.md) |
| Sample Project Structure | Reference project structure from previous projects | [../Sample Project Structure-DO-NOT-EDIT/](../Sample%20Project%20Structure-DO-NOT-EDIT/) |

## Table of Contents

1. [Analysis of Current Structure](#analysis-of-current-structure)
2. [Implementation Strategy](#implementation-strategy)
3. [Detailed Steps](#detailed-steps)
4. [Implementation Notes](#implementation-notes)
5. [Directory Structure](#directory-structure)
6. [Component Organization](#component-organization)
7. [Documentation Standards](#documentation-standards)

## Analysis of Current Structure

### Relume Folder Structure
- The Relume folder contains a comprehensive set of components organized by page/section
- Each page has its own folder with components subfolder
- The structure follows the website architecture of www.windowsdoorsca.com
- Components are organized by functionality and page location

### Current Project Structure
- Next.js 15.3.2 with App Router
- Relume-root is the primary working directory
- Pages are organized in the Relume-root/src/app directory
- Components are in the Relume-root/components directory
- Page-specific components are in the Relume-root/pages-components directory
- Current pages include: home, windows, doors
- Configuration files are in the Relume-root directory
- Package.json scripts are configured to run commands from the Relume-root directory

## Implementation Strategy

### Phase 1: Create Relume-root Directory
1. Create a new directory called "Relume-root" at the project root
2. Create subdirectories in Relume-root that mirror the React best practices structure:
   - Relume-root/components
   - Relume-root/pages
   - Relume-root/layouts
   - Relume-root/hooks
   - Relume-root/utils

### Phase 2: Extract and Organize Components
1. For each page in the Relume folder:
   - Extract the main page component
   - Extract reusable components
   - Organize them according to React best practices

2. Component Organization Rules:
   - Page-specific components go to Relume-root/pages/{page-name}
   - Reusable components go to Relume-root/components
   - Layout components go to Relume-root/layouts
   - Utility functions go to Relume-root/utils
   - Custom hooks go to Relume-root/hooks

### Phase 3: Documentation
1. Create comprehensive documentation for each component
2. Document the relationship between components
3. Create a component map showing how components are linked
4. Document any adjustments made (with explicit approval)

## Detailed Steps

### Step 1: Create Relume-root Directory Structure
```
mkdir Relume-root
mkdir Relume-root\components
mkdir Relume-root\pages
mkdir Relume-root\layouts
mkdir Relume-root\hooks
mkdir Relume-root\utils
```

### Step 2: Extract Home Page Components
1. Copy components from Relume/www.windowsdoorsca.com/home/components to Relume-root/pages/home
2. Identify reusable components and copy to Relume-root/components
3. Document component relationships

### Step 3: Extract Windows Page Components
1. Copy components from Relume/www.windowsdoorsca.com/windows/components to Relume-root/pages/windows
2. Identify reusable components and copy to Relume-root/components
3. Document component relationships

### Step 4: Extract Doors Page Components
1. Copy components from Relume/www.windowsdoorsca.com/doors/components to Relume-root/pages/doors
2. Identify reusable components and copy to Relume-root/components
3. Document component relationships

### Step 5: Extract Vinyl Siding Page Components
1. Copy components from Relume/www.windowsdoorsca.com/vinyl-siding/components to Relume-root/pages/vinyl-siding
2. Identify reusable components and copy to Relume-root/components
3. Document component relationships

### Step 6: Extract Roofing Page Components
1. Copy components from Relume/www.windowsdoorsca.com/roofing/components to Relume-root/pages/roofing
2. Identify reusable components and copy to Relume-root/components
3. Document component relationships

### Step 7: Extract Contact Page Components
1. Copy components from Relume/www.windowsdoorsca.com/contact/components to Relume-root/pages/contact
2. Identify reusable components and copy to Relume-root/components
3. Document component relationships

### Step 8: Extract Other Page Components
1. Identify other important pages from the Relume folder
2. Copy components to appropriate locations in the Relume-root directory
3. Document component relationships

### Step 9: Create Component Documentation
1. Create README.md files for each component directory
2. Document component purpose, props, and usage
3. Create a component map showing relationships

### Step 10: Create Project Documentation
1. Create a main README.md in the Relume-root directory
2. Document the overall structure and organization
3. Provide guidelines for using the components

## Implementation Notes

- The Relume-DO-NOT-EDIT folder will remain untouched throughout this process
- All files will be copied, not moved
- No changes will be made to the original files
- Any necessary adjustments will be documented and require explicit approval
- The implementation will follow React best practices for component organization

### Implementation Progress

#### Home Page Components (Completed)
- Copied all Home page components from @Relume-do-not-edit to Relume-root
- Updated import paths to reflect the new directory structure
- Added 'use client' directive to all components
- Updated the Next.js Home page to use the Relume components
- Created documentation for all components

#### Project Structure Restructuring (Completed)
- Deleted the src directory at the root level
- Made Relume-root the primary working directory
- Created the correct directory structure in Relume-root:
  ```
  Relume-root/
  └── src/
      └── app/
          ├── home/
          ├── windows/
          ├── doors/
          └── ...
  ```
- Renamed the pages directory to pages-components to avoid conflicts with Next.js
- Created page files in the correct locations
- Copied CSS files: globals.css and styles.css
- Updated import paths to reflect the new structure
- Updated the package.json scripts to run commands from the Relume-root directory
- Moved the necessary configuration files to Relume-root
- Updated the tailwind.config.ts file to use the correct content paths

#### Component Implementation (Completed)
- Updated Header47.jsx and Header15.jsx to use JavaScript JSDoc syntax instead of TypeScript
- Fixed import paths in the components
- Removed TypeScript type annotations in the map functions
- Fixed TypeScript error in the tailwind.config.ts file
- Successfully built the project with npm run build
- Tested the implementation with npm run dev

#### Documentation (Completed)
- Created working-directory.md to document the project structure
- Updated daily logs with the changes made
- Updated the README.md file with the new project structure

See [component-mapping.md](../docs/architecture/component-mapping.md) for a detailed mapping of components.

## Directory Structure

```
Relume-root/                    # PRIMARY WORKING DIRECTORY
├── components/                 # Reusable components
│   ├── navigation/             # Navigation components (Navbar, etc.)
│   ├── footer/                 # Footer components
│   ├── header/                 # Header components
│   ├── layout/                 # Layout components
│   ├── gallery/                # Gallery components
│   ├── testimonial/            # Testimonial components
│   └── cta/                    # Call-to-action components
├── pages-components/           # Page-specific components
│   └── home/                   # Home page components
│       └── index.jsx           # Home page component
├── src/                        # Next.js source code
│   └── app/                    # Next.js App Router
│       ├── home/               # Home page route
│       │   └── page.tsx
│       ├── windows/            # Windows page route
│       │   └── page.tsx
│       ├── doors/              # Doors page route
│       │   └── page.tsx
│       ├── globals.css         # Global CSS
│       ├── styles.css          # Custom styles
│       ├── layout.tsx          # Root layout
│       └── page.tsx            # Root page
├── layouts/                    # Layout components (To be implemented)
├── hooks/                      # Custom React hooks (To be implemented)
├── utils/                      # Utility functions (To be implemented)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Main documentation
```

## Component Organization

### Reusable Components
Components that are used across multiple pages should be placed in the `components` directory. These include:

- Header
- Footer
- Navigation
- Buttons
- Forms
- Cards
- Testimonials
- Gallery
- FAQ accordions

### Page-Specific Components
Components that are only used on a specific page should be placed in the corresponding page directory. For example:

- Home page hero section
- Windows product showcase
- Doors comparison table
- Vinyl siding color selector
- Roofing material display
- Contact form

### Layout Components
Components that define the overall layout of pages should be placed in the `layouts` directory. These include:

- Main layout
- Sidebar layout
- Product detail layout
- Blog post layout

### Hooks
Custom React hooks should be placed in the `hooks` directory. These might include:

- useWindowSize
- useScrollPosition
- useLocalStorage
- useForm

### Utils
Utility functions should be placed in the `utils` directory. These include:

- API calls
- Data formatting
- Validation functions
- Helper functions

## Documentation Standards

All documentation will follow a consistent format:

1. **Component Name**: Clear, descriptive name
2. **Purpose**: What the component does
3. **Props**: List of props with types and descriptions
4. **Usage Example**: Code snippet showing how to use the component
5. **Dependencies**: List of dependencies
6. **Notes**: Any additional information or considerations

Example:
```markdown
# Button Component

## Purpose
A reusable button component with various styles and sizes.

## Props
- `variant`: string - 'primary' | 'secondary' | 'outline' (default: 'primary')
- `size`: string - 'sm' | 'md' | 'lg' (default: 'md')
- `onClick`: function - Click handler
- `disabled`: boolean - Whether the button is disabled (default: false)
- `children`: ReactNode - Button content

## Usage Example
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Submit
</Button>
```

## Dependencies
- None

## Notes
- Uses Tailwind CSS for styling
- Accessible with keyboard navigation
```

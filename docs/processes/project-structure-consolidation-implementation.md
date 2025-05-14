# Project Structure Consolidation Implementation Guide

## Table of Contents
1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Implementation Workflow](#3-implementation-workflow)
4. [Detailed Implementation Steps](#4-detailed-implementation-steps)
5. [Testing Procedures](#5-testing-procedures)
6. [Rollback Procedures](#6-rollback-procedures)
7. [Documentation Updates](#7-documentation-updates)

## 1. Introduction

This document provides detailed implementation instructions for consolidating the project structure as outlined in the [Project Structure Consolidation Plan](./project-structure-consolidation-plan.md). The goal is to migrate all App Router pages from the obsolete `/src/app/` directory to the correct `Relume-root/src/app/` directory.

## 2. Prerequisites

Before beginning implementation, ensure the following:

- [ ] Development environment is properly set up
- [ ] All current work is committed to version control
- [ ] A backup branch has been created
- [ ] The development server can be started and stopped without issues
- [ ] You have administrator access to the repository

## 3. Implementation Workflow

The implementation will follow this workflow:

1. **Preparation**: Create backup, analyze current structure
2. **Layout Consolidation**: Ensure layout files are correct
3. **Page Migration**: Migrate pages in priority order
4. **Testing**: Test each page after migration
5. **Cleanup**: Remove obsolete files and update documentation

Each step should be completed and verified before moving to the next step.

## 4. Detailed Implementation Steps

### 4.1 Preparation

#### 4.1.1 Create Backup Branch
```bash
git checkout -b backup/project-structure-consolidation
git push origin backup/project-structure-consolidation
```

#### 4.1.2 Create Working Branch
```bash
git checkout main
git checkout -b feature/project-structure-consolidation
```

#### 4.1.3 Document Current Page Routes
Create a mapping document that lists all current page routes and their component imports:

| Route | Current Page Location | Component Import |
|-------|----------------------|-----------------|
| `/` | `/src/app/page.tsx` | `../../home/index.jsx` |
| `/windows` | `/src/app/windows/page.tsx` | `../../../windows/index.jsx` |
| ... | ... | ... |

### 4.2 Layout Consolidation

#### 4.2.1 Verify Layout File
Ensure `Relume-root/src/app/layout.tsx` contains:
```tsx
import './globals.css';
import './styles.css';

export const metadata = {
  title: 'Windows Doors CA',
  description: 'Sacramento\'s Leader in Windows, Doors, & Siding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

#### 4.2.2 Verify CSS Files
Ensure these files exist with correct content:
- `Relume-root/src/app/globals.css`
- `Relume-root/src/app/styles.css`

### 4.3 Page Migration

#### 4.3.1 Home Page Migration
1. Check if `Relume-root/src/app/page.tsx` exists
2. If not, create it with:
```tsx
'use client';

import React from 'react';
import HomePage from '../../home/index.jsx';

export default function Home() {
  return <HomePage />;
}
```
3. Test the home page route

#### 4.3.2 Top-Level Pages Migration
For each top-level page:
1. Create the directory if it doesn't exist
2. Create the page file with correct imports
3. Test the page

Example for Windows page:
```tsx
'use client';

import React from 'react';
import WindowsPage from '../../windows/index.jsx';

export default function Windows() {
  return <WindowsPage />;
}
```

#### 4.3.3 Nested Pages Migration
For each nested page:
1. Create the directory structure if it doesn't exist
2. Create the page file with correct imports
3. Test the page

Example for Casement Windows page:
```tsx
'use client';

import React from 'react';
import CasementPage from '../../../casement/index.jsx';

export default function Casement() {
  return <CasementPage />;
}
```

### 4.4 Pages Router Cleanup

#### 4.4.1 Analyze Pages Router Usage
Check `Relume-root/pages/` directory for any pages still using the Pages Router.

#### 4.4.2 Migrate Pages Router Pages
For each page in `Relume-root/pages/`:
1. Create corresponding page in `Relume-root/src/app/`
2. Update routing and import paths
3. Test functionality after migration

### 4.5 Final Cleanup

#### 4.5.1 Remove Obsolete Directory
Once all pages have been successfully migrated and tested:
```bash
# Verify no imports are referencing this directory before removal
rm -rf src/app
```

#### 4.5.2 Update Documentation
Update README and other documentation to reflect the new structure.

## 5. Testing Procedures

### 5.1 Individual Page Testing
For each migrated page:
1. Navigate to the page URL
2. Verify all content loads correctly
3. Check for any console errors
4. Test all interactive elements
5. Verify styling is applied correctly

### 5.2 Navigation Testing
1. Test navigation between pages
2. Verify all links work correctly
3. Check for any routing errors

### 5.3 Responsive Testing
1. Test pages at different screen sizes
2. Verify responsive behavior matches original

## 6. Rollback Procedures

If issues are encountered that cannot be resolved:

### 6.1 Rollback to Previous State
```bash
git checkout main
git reset --hard origin/main
```

### 6.2 Restore from Backup Branch
```bash
git checkout backup/project-structure-consolidation
git checkout -b recovery/project-structure
git push origin recovery/project-structure
```

## 7. Documentation Updates

After successful implementation, update the following documentation:

### 7.1 README.md
Update to reflect the new project structure and development workflow.

### 7.2 Architecture Documentation
Update any architecture documentation to reflect the consolidated structure.

### 7.3 Daily Log
Create a daily log entry documenting the consolidation process, challenges encountered, and solutions implemented.

### 7.4 Implementation Status
Update the implementation tracking table in the consolidation plan document.

---

Last Updated: 2025-05-14

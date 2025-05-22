# Project Structure Audit

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Project Structure Audit

## Table of Contents

1. [Overview](#overview)
2. [Documentation Review](#documentation-review)
3. [Actual Project Structure](#actual-project-structure)
4. [Gaps and Inconsistencies](#gaps-and-inconsistencies)
5. [Recommendations](#recommendations)
6. [Next Steps](#next-steps)
7. [Related Documentation](#related-documentation)

## Overview

This audit was conducted on May 28, 2025, to assess the current state of the project structure documentation and identify gaps and inconsistencies between the documentation and the actual project structure. The audit is part of a larger effort to improve the project structure documentation to better support development workflows.

## Documentation Review

### Key Documentation Files

1. **Directory Structure Policy** (`docs/architecture/directory-structure-policy.md`)
   - Last Updated: Not specified
   - Establishes the policy that all files must be in the Relume-root directory
   - Defines what should be in the root vs. Relume-root directory
   - Lists file placement rules and enforcement mechanisms

2. **Project Structure** (`docs/architecture/project-structure.md`)
   - Last Updated: Not specified
   - Provides an overview of the project structure after consolidation
   - Lists key directories and their contents
   - Includes configuration files and implementation history

3. **Working Directory** (`docs/architecture/working-directory.md`)
   - Last Updated: 2023-11-16 (significantly outdated)
   - Defines the primary working directory as `C:\Users\IvoD\repos\react-win-dir\Relume-root\`
   - Outlines directory structure and configuration
   - Includes routing and component organization information

4. **Project Structure Current State** (`docs/architecture/project-structure-current-state.md`)
   - Last Updated: Not specified
   - Provides a detailed view of the current project structure
   - Includes information about routing priority and component organization

5. **Project Structure Guide** (`docs/guides/project-structure-guide.md`)
   - Last Updated: Not specified
   - Appears to be a duplicate or similar to project-structure.md
   - Contains similar information about directory structure

### Documentation Consistency

- **Naming Inconsistency**: The documentation refers to both "Relume-root" and "Relume Work Dir" as the main working directory
- **Directory Structure Inconsistency**: Different documents show different directory structures
- **Last Updated Dates**: Most documents lack last updated dates or have outdated dates
- **Duplicate Information**: Significant overlap between documents with some inconsistencies

## Actual Project Structure

The actual project structure as of May 28, 2025:

### Root Directory (`react-win-dir/`)

```
react-win-dir/
├── .netlify/
├── backup-before-removal/
├── Content Engine/
├── Docs/
├── Export Documentation/
├── IDE Instructions/
├── Relume Work Dir/        # Main working directory (not "Relume-root" as docs state)
├── Relume-DO-NOT-EDIT/
├── Sample Images/
├── Scripts/
├── .gitignore
├── .windsurfrules
├── README.md
├── tsconfig.json
└── update-import-paths.ps1
```

### Main Working Directory (`Relume Work Dir/`)

```
Relume Work Dir/
├── .next/
├── config/
├── docs/
├── docs-assets/
├── env-files/
├── hooks/
├── misc/
├── node_modules/
├── Output/
├── public/
├── scripts/
├── Service accounts/
├── src/
│   ├── app/              # App Router pages
│   ├── components/
│   ├── lib/
│   ├── supabase/
│   ├── types/
│   └── utils/
├── styles/
├── Supabase/
├── Test Pages/
├── Vertex AI Tests/
├── Website Pages/        # Page-specific components
├── .eslintrc.json
├── APP-ROUTER-MIGRATION.md
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── ROUTING-SOLUTION.md
├── tailwind.config.js
├── test-component.jsx
├── tsconfig.json
└── yarn.lock
```

### App Router Structure (`Relume Work Dir/src/app/`)

```
src/app/
├── about/
├── admin/
├── api/
├── casement/
├── contact/
├── debug/
├── doors/
├── double-hung/
├── faqs/
├── financing/
├── gallery/
├── garden/
├── hinged-patio-doors/
├── migration-test/
├── roofing/
├── sample-page/
├── service-areas/
├── service-areas-fresh/
├── service-areas-minimal/
├── test/
├── test-page/
├── vinyl-siding/
├── warranty/
├── window-style-finder/
├── windows/
├── _templates/
├── error.tsx
├── globals.css
├── layout.tsx
├── not-found.tsx
├── page.tsx
└── styles.css
```

### Website Pages Structure (`Relume Work Dir/Website Pages/`)

```
Website Pages/
├── 1000-series/
├── 1500-series/
├── 2000-series/
├── 4000-series/
├── about/
├── awning/
├── bay-bow/
├── blog/
├── casement/
├── contact/
├── custom/
├── doors/
├── double-hung/
├── energy-efficient/
├── entry/
├── faqs/
├── financing/
├── free-estimate-request/
├── gallery/
├── garage/
├── garden/
├── giving-back/
├── hinged-patio-doors/
├── home/
├── installation/
├── patio/
├── picture-window/
├── press/
├── recognition/
├── referral-program/
├── reviews/
├── roofing/
├── satisfaction-survey/
├── service-areas/
├── shutters/
├── sliding/
├── vinyl-siding/
├── virtual-repair-center/
├── warranty/
├── why-window-world/
├── window-style-finder/
├── windows/
└── wood-windows/
```

## Gaps and Inconsistencies

1. **Directory Naming**
   - Documentation refers to "Relume-root" as the main working directory
   - Actual directory is named "Relume Work Dir"

2. **Directory Structure**
   - Documentation shows a simplified structure that doesn't match reality
   - Many directories exist that aren't documented (e.g., Test Pages, Vertex AI Tests)
   - The relationship between src/app and Website Pages is not clearly documented

3. **Outdated Information**
   - Working directory documentation was last updated in 2023
   - Directory structure has evolved significantly since then

4. **Missing Documentation**
   - No clear documentation on the purpose and organization of Website Pages
   - No documentation on the relationship between App Router pages and Website Pages components
   - No documentation on the migration process from Pages Router to App Router

5. **Inconsistent Terminology**
   - Different documents use different terms for the same concepts
   - No standardized naming conventions for directories and files

6. **Lack of Visual Aids**
   - No diagrams or visual representations of the project structure
   - No decision trees for file placement

## Recommendations

1. **Create Unified Documentation**
   - Develop a single, authoritative document for project structure
   - Include accurate directory listings with explanations
   - Add visual diagrams using Mermaid

2. **Update Directory Names**
   - Either rename "Relume Work Dir" to "Relume-root" to match documentation
   - Or update all documentation to use "Relume Work Dir" consistently

3. **Document Relationships**
   - Clearly explain the relationship between src/app and Website Pages
   - Document the component import patterns
   - Explain the migration strategy from Pages Router to App Router

4. **Add Visual Aids**
   - Create Mermaid diagrams for directory structure
   - Develop a decision tree for file placement
   - Include examples of correct file organization

5. **Standardize Terminology**
   - Create a glossary of terms
   - Use consistent naming throughout documentation
   - Define clear conventions for new files and directories

6. **Add Last Updated Dates**
   - Ensure all documentation includes last updated dates
   - Implement a regular review process

## Next Steps

1. Create a unified project structure document that addresses all gaps
2. Develop Mermaid diagrams for visualizing the directory structure
3. Document the App Router structure and its relationship to Website Pages
4. Create a file placement decision tree
5. Update all existing documentation to use consistent terminology
6. Implement a regular review process for project structure documentation

## Related Documentation

- [Directory Structure Policy](./directory-structure-policy.md)
- [Project Structure](./project-structure.md)
- [Working Directory](./working-directory.md)
- [Project Structure Current State](./project-structure-current-state.md)
- [Project Structure Guide](../guides/project-structure-guide.md)

Last Updated: May 28, 2025

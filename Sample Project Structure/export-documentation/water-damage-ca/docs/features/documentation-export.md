# Documentation Export Feature

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Features](./index.md) > Documentation Export

## Overview

The Documentation Export feature allows administrators to export all project documentation to a separate folder for sharing with third parties or for external use. This feature maintains the pyramid structure of the documentation while creating a standalone copy that can be easily shared.

## Accessing the Feature

The Documentation Export feature can be accessed through the admin dashboard:

1. Navigate to the Admin Dashboard at `/admin`
2. Click on "Export Documentation" in the sidebar
3. Click the "Start Export Process" button to begin the export

## How It Works

### Export Process

When the export process is triggered, the system:

1. Creates an `export-documentation` folder at the project root if it doesn't exist
2. Copies all documentation from the pyramid structure to this folder exactly as is
3. Includes database schema documentation and all other documentation
4. Excludes code files (.js, .ts, etc.) from the export
5. Maintains the same folder organization as the original documentation
6. Preserves all content and filenames without any modifications
7. Ensures all internal links and references remain intact
8. Creates an index file for easy navigation

### Export Location

The documentation is exported to:

```
c:\Users\IvoD\repos\mold-removal-lead-gen-peo\export-documentation
```

This folder contains a complete copy of the project documentation that can be shared with third parties.

## Technical Implementation

### Components

1. **Export Script**: `scripts/export-documentation.js`
   - Node.js script that handles the actual export process
   - Copies files, updates links, and adds metadata

2. **API Route**: `app/api/admin/export-documentation/route.ts`
   - Next.js API route that triggers the export script
   - Returns success/error status and details

3. **Admin UI**: `app/admin/export-documentation/page.tsx`
   - User interface for triggering the export
   - Displays progress and results

4. **Sidebar Link**: Added to `components/AdminSidebar.tsx`
   - Navigation link to access the export feature

### Export Script Details

The export script (`scripts/export-documentation.js`) performs the following tasks:

1. Identifies all documentation directories in the project (including database schema docs)
2. Creates the export directory structure
3. Filters out code files (.js, .ts, etc.) during the copy process
4. Copies all documentation files exactly as they are
5. Preserves all content and filenames without any modifications
6. Maintains all internal links and references
7. Creates an index file for the exported documentation

## Use Cases

### Sharing with Third Parties

The exported documentation can be shared with:

- Contractors who need to understand the project
- Stakeholders who need documentation without access to the codebase
- External reviewers who need to evaluate the project

### External Research

The exported documentation can be used for:

- Research purposes separate from the main project
- Reference material for related projects
- Training materials for new team members

## Best Practices

1. **Regular Exports**: Export documentation before major releases or milestones
2. **Version Control**: Consider adding version information to exports
3. **Validation**: Verify the exported documentation for broken links or missing files
4. **Security**: Review documentation for sensitive information before sharing

## Related Documentation

- [Documentation Standards](../guides/documentation-standards.md)
- [Admin Dashboard](./admin-dashboard.md)
- [Project Structure](../architecture/project-structure.md)

Last Updated: April 26, 2025

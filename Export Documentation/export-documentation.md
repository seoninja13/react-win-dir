# Windows Doors CA - Exported Documentation

This file contains a comprehensive list of all documentation files for the Windows Doors CA project that may need to be exported to another project.

## Export Information

- **Export Date**: 2023-11-16
- **Purpose**: For reference when exporting documentation to other projects
- **Project**: Windows Doors CA Website

## Documentation Structure

The documentation follows a pyramidal structure with the following categories:

### 1. High-Level Documentation

- [README.md](../README.md) - Main project README with overview and getting started information
- [Docs/README.md](../Docs/README.md) - Documentation index with links to all documentation categories
- [Relume-root/README.md](../Relume-root/README.md) - Implementation plan and progress for the Relume components

### 2. Architecture Documentation

- [Docs/architecture/working-directory.md](../Docs/architecture/working-directory.md) - Documentation of the working directory structure
- [Docs/architecture/architecture-documentation.md](../Docs/architecture/architecture-documentation.md) - Comprehensive documentation of the website architecture
- [Docs/architecture/component-mapping.md](../Docs/architecture/component-mapping.md) - Mapping of component relationships and hierarchies

### 3. Component Documentation

- [Docs/components/header-components.md](../Docs/components/header-components.md) - Documentation for Header47 and Header15 components

### 4. Daily Logs

- [Docs/daily-logs/2023-11-15.md](../Docs/daily-logs/2023-11-15.md) - Daily log for November 15, 2023
- [Docs/daily-logs/2023-11-16.md](../Docs/daily-logs/2023-11-16.md) - Daily log for November 16, 2023

### 5. Implementation Guides

- [Docs/implementation/handling-relume-files.md](../Docs/implementation/handling-relume-files.md) - Guidelines for handling the original Relume files
- [Docs/implementation/page-implementation-guide.md](../Docs/implementation/page-implementation-guide.md) - Detailed guide for implementing each page

### 6. Features Documentation

- [Docs/features/index.md](../Docs/features/index.md) - Index of feature documentation

### 7. Processes Documentation

- [Docs/processes/index.md](../Docs/processes/index.md) - Index of process documentation

### 8. Testing Documentation

- [Docs/testing/index.md](../Docs/testing/index.md) - Index of testing documentation

### 9. Integrations Documentation

- [Docs/integrations/index.md](../Docs/integrations/index.md) - Index of integration documentation

## Project Structure

```
react-win-dir/                      # Project root (repository root)
├── Docs/                           # Documentation
│   ├── architecture/               # Architecture documentation
│   │   └── working-directory.md    # Working directory documentation
│   ├── components/                 # Component documentation
│   │   └── header-components.md    # Header components documentation
│   ├── daily-logs/                 # Daily development logs
│   │   ├── 2023-11-15.md           # Daily log for November 15, 2023
│   │   └── 2023-11-16.md           # Daily log for November 16, 2023
│   └── README.md                   # Documentation index
├── Relume-root/                    # PRIMARY WORKING DIRECTORY
│   ├── components/                 # Reusable components
│   ├── pages-components/           # Page-specific components
│   ├── src/                        # Next.js source code
│   │   └── app/                    # Next.js App Router
│   ├── public/                     # Static assets
│   │   └── images/                 # Static images
│   ├── dist/                       # Build output directory
│   ├── node_modules/               # Node.js dependencies
│   ├── package.json                # Package configuration
│   └── README.md                   # Main documentation
├── Relume-DO-NOT-EDIT/             # Original Relume components (DO NOT EDIT)
├── Export Documentation/           # Export documentation
│   └── export-documentation.md     # This file
└── Sample Project Structure-DO-NOT-EDIT/ # Reference project structure
```

## Export Instructions

When exporting documentation to another project:

1. Create an export directory in the target project
2. Copy the relevant documentation files from the source paths listed above
3. Update any relative links in the documentation to match the new project structure
4. Update the export information at the top of this file

## Last Updated

2023-11-16
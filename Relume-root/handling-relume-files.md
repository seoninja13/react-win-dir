# Handling Relume Files

## Overview

This document provides guidelines for handling the Relume component files in the Windows Doors CA project. The Relume folder contains the original component files that serve as a baseline for comparison. These files must remain untouched while we extract and organize their content into the Relume-root directory according to React best practices.

## Table of Contents

1. [Relume Folder Status](#relume-folder-status)
2. [Extraction Process](#extraction-process)
3. [File Handling Guidelines](#file-handling-guidelines)
4. [Component Adaptation](#component-adaptation)
5. [Documentation Requirements](#documentation-requirements)
6. [Troubleshooting](#troubleshooting)

## Relume Folder Status

The Relume folder is considered a **read-only reference**. It contains the original component files that:

- Serve as a baseline for comparison
- Provide the source material for extraction
- Must remain untouched throughout the development process
- Should not be modified, deleted, or added to in any way

Any changes to the Relume folder could compromise the integrity of the reference material and make it difficult to track the relationship between the original components and their adapted versions.

## Extraction Process

When extracting content from the Relume folder to the Relume-root directory, follow these steps:

1. **Identify the Component**: Locate the component in the Relume folder structure.
2. **Determine Component Type**: Decide if it's a page-specific component, reusable component, layout, etc.
3. **Copy, Don't Move**: Always copy the file, never move or delete the original.
4. **Place Appropriately**: Put the copied file in the correct location within the Relume-root directory structure.
5. **Document the Relationship**: Record where the component came from and any adaptations made.

Example:
```
Original: Relume/www.windowsdoorsca.com/home/components/Hero.jsx
Destination: Relume-root/pages/home/Hero.jsx
```

## File Handling Guidelines

### Do's

- ✅ Copy files from Relume to Relume-root
- ✅ Organize files according to React best practices
- ✅ Document the source of each file
- ✅ Maintain the same component names where possible
- ✅ Create appropriate directory structures in Relume-root

### Don'ts

- ❌ Modify files in the Relume folder
- ❌ Delete files from the Relume folder
- ❌ Add new files to the Relume folder
- ❌ Rename components without documentation
- ❌ Change component functionality without approval

## Component Adaptation

When adapting components from Relume to Relume-root, you may need to make minimal adjustments to ensure they work correctly in the new structure. Follow these guidelines:

### Minimal Adjustments Allowed

1. **Import Path Updates**: Update import paths to reflect the new directory structure.
   ```jsx
   // Original in Relume
   import Button from '../Button';
   
   // Updated in Relume-root
   import Button from '@/components/Button';
   ```

2. **Prop Adjustments**: Standardize props for consistency across components.
   ```jsx
   // Original in Relume
   function Button({ text, onClick }) {
     // ...
   }
   
   // Updated in Relume-root
   function Button({ children, onClick }) {
     // ...
   }
   ```

3. **Style Imports**: Update style import paths if necessary.
   ```jsx
   // Original in Relume
   import './Button.css';
   
   // Updated in Relume-root
   import '@/styles/components/Button.css';
   ```

### Documentation Requirements

For each adjustment made:

1. Document the change in a comment above the affected code.
   ```jsx
   // ADJUSTMENT: Updated import path from '../Button' to '@/components/Button'
   import Button from '@/components/Button';
   ```

2. Include a summary of all adjustments in the component's documentation.
   ```markdown
   ## Adjustments from Original
   - Updated import paths to use absolute imports
   - Changed 'text' prop to 'children' for consistency
   - Updated style import path
   ```

## Documentation Requirements

For each component extracted from Relume to Relume-root, create comprehensive documentation that includes:

1. **Source Information**:
   - Original file path in Relume
   - New file path in Relume-root
   - Date of extraction

2. **Component Details**:
   - Purpose and functionality
   - Props and their types
   - Dependencies on other components
   - Usage examples

3. **Adjustments Made**:
   - List of all changes from the original
   - Justification for each change
   - Approval reference (if applicable)

4. **Integration Notes**:
   - How the component fits into the overall architecture
   - Relationships with other components
   - Any special considerations for implementation

Example documentation template:
```markdown
# Component Name

## Source Information
- **Original Path**: Relume/www.windowsdoorsca.com/path/to/component
- **New Path**: Relume-root/components/ComponentName
- **Extracted On**: YYYY-MM-DD

## Component Details
- **Purpose**: Brief description of what the component does
- **Props**:
  - `prop1`: type - description
  - `prop2`: type - description
- **Dependencies**:
  - ComponentA
  - ComponentB

## Usage Example
```jsx
<ComponentName prop1="value" prop2={value} />
```

## Adjustments Made
1. Updated import paths to use absolute imports
2. Standardized prop names for consistency
3. Updated style import paths

## Integration Notes
- This component is used in PageA, PageB, and PageC
- It relies on ComponentX for functionality
- Special consideration: needs context from ParentComponent
```

## Troubleshooting

If you encounter issues when extracting or adapting components:

1. **Import Errors**: Check that all import paths are correctly updated to reflect the new directory structure.
2. **Prop Type Errors**: Ensure that props are correctly typed and required props are provided.
3. **Styling Issues**: Verify that all style imports are correctly updated and that styles are applied properly.
4. **Component Dependencies**: Make sure all dependent components are also extracted and available in the new structure.
5. **Context Errors**: If a component relies on context from a parent component, ensure that context is available in the new implementation.

If you need to make significant changes to a component beyond the minimal adjustments outlined above, document the proposed changes and seek approval before implementing them.

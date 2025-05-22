# File Naming Convention

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Processes](./index.md) > File Naming Convention

## Table of Contents

1. [Overview](#overview)
2. [Naming Convention Rules](#naming-convention-rules)
3. [File Descriptions](#file-descriptions)
4. [Examples](#examples)
5. [Implementation](#implementation)
6. [Related Documentation](#related-documentation)

## Overview

This document establishes the file naming convention for the Windows Doors CA website project. It provides guidelines for naming files and documenting their purpose to ensure consistency, clarity, and easy reference across the project.

## Naming Convention Rules

1. **Use Hyphenated Path Names**: Replace directory separators (slashes) with hyphens in file references
2. **Use Kebab Case**: Use lowercase letters and separate words with hyphens
3. **Include Path Context**: Include abbreviated path information in the filename
4. **Be Descriptive**: Choose names that clearly indicate the file's purpose
5. **Be Consistent**: Apply the same naming pattern across all files

## File Descriptions

Every file must have a concise description that:

1. **Is Limited to 5-7 Words**: Keep descriptions brief but informative
2. **Clearly States Purpose**: Describe what the file does, not what it is
3. **Avoids Redundancy**: Don't repeat information already in the filename
4. **Uses Action Words**: Begin with verbs when describing functionality
5. **Is Documented**: Include the description in relevant documentation

## Examples

| Original Path | Hyphenated Name | Description |
|---------------|-----------------|-------------|
| `docs/features/feature-name.md` | `docs-features-feature-name.md` | Feature purpose and implementation details |
| `src/components/Button.jsx` | `src-components-button.jsx` | Renders customizable button component |
| `scripts/utils/helper.js` | `scripts-utils-helper.js` | Provides common utility functions |
| `config/settings.json` | `config-settings.json` | Configures application-wide settings |

## Implementation

When creating or referencing files:

1. **New Files**: Use the hyphenated naming convention for all new files
2. **Documentation**: Include the hyphenated name and description in documentation
3. **References**: Use the hyphenated name when referencing files in documentation
4. **Code Comments**: Include the file description in the header comment
5. **Commit Messages**: Use the hyphenated name in commit messages

## Related Documentation

- [Code Standards](./code-standards.md)
- [Documentation Standards](./documentation-standards.md)
- [Project Structure](../architecture/project-structure.md)
- [File Placement Guide](../architecture/file-placement-guide.md)

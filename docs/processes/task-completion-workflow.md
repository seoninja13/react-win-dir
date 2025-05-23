# Task Completion Workflow

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Processes](./index.md) > Task Completion Workflow

## Table of Contents

1. [Overview](#overview)
2. [Mandatory 3-Step Process](#mandatory-3-step-process)
3. [Dual-Source Truth Requirement](#dual-source-truth-requirement)
4. [Implementation Templates](#implementation-templates)
5. [Sync Verification Checklist](#sync-verification-checklist)
6. [Troubleshooting](#troubleshooting)
7. [Related Documentation](#related-documentation)

## Overview

This document defines the mandatory workflow that must be followed after completing any task in the Windows Doors CA website project. The workflow ensures consistent documentation, proper tracking, and synchronized information across all project management systems.

## Mandatory 3-Step Process

**EVERY TASK COMPLETION MUST FOLLOW THIS PROCESS:**

### Step 1: Update Project Documentation

**Required Actions:**
- Update relevant documentation files in `Docs/` directory
- Update webpage progress tracker (`Docs/tracking/webpage-progress-tracker.md`)
- Create or update daily logs (`Docs/daily-logs/YYYY-MM-DD-*.md`)
- Update any affected architecture or process documentation

**Documentation Types to Consider:**
- **Architecture Documentation**: If changes affect system structure
- **Feature Documentation**: If new features are implemented
- **Process Documentation**: If workflows are modified
- **Daily Logs**: Always create/update for significant work

### Step 2: Update Tracking Systems

**Required Actions:**
- Update `Docs/tracking/webpage-progress-tracker.md` with current status
- Update any relevant tracking documents
- Ensure all progress metrics are current
- Document any issues resolved or created

**Tracking Documents:**
- Webpage Progress Tracker (primary)
- Image Generation Progress
- Migration Tracking documents
- Project priorities and task lists

### Step 3: Use Linear for Task Management

**Required Actions:**
- Create or update Linear issues for completed work
- Sync Linear status with project documentation
- Ensure Linear contains identical information to documentation
- Link related issues and dependencies

**Linear Integration:**
- Create issues for major milestones
- Update issue status to reflect current state
- Add comments with detailed progress information
- Link to relevant documentation

## Dual-Source Truth Requirement

### Core Principle

**Project Documentation ↔ Linear must be identical and synced**

### Requirements

1. **Information Consistency**
   - Same status information in both systems
   - Identical progress metrics
   - Matching issue descriptions and details

2. **Real-Time Sync**
   - Updates must be made to both systems simultaneously
   - No delays between documentation and Linear updates
   - Immediate verification of sync status

3. **Cross-Reference Links**
   - Documentation should link to Linear issues
   - Linear issues should reference documentation
   - Clear navigation between systems

## Implementation Templates

### Documentation Update Template

```markdown
## Task: [Task Name]
**Date:** YYYY-MM-DD
**Status:** Complete/In Progress/Blocked
**Linear Issue:** [Link to Linear issue]

### Changes Made
- [List of specific changes]
- [Files modified]
- [New features implemented]

### Documentation Updated
- [ ] Webpage Progress Tracker
- [ ] Daily Log Created/Updated
- [ ] Architecture Documentation (if applicable)
- [ ] Process Documentation (if applicable)

### Linear Sync
- [ ] Linear issue created/updated
- [ ] Status synced with documentation
- [ ] Links added between systems
```

### Linear Issue Template

```
Title: [Task Name] - [Brief Description]

Description:
- **Documentation Reference:** [Link to relevant docs]
- **Progress Status:** [Current status]
- **Files Modified:** [List of files]
- **Next Steps:** [What comes next]

Labels: [relevant labels]
Assignee: [team member]
Project: Windows Doors CA Website
```

## Sync Verification Checklist

### Before Marking Task Complete

- [ ] **Documentation Updated**
  - [ ] Webpage progress tracker reflects current status
  - [ ] Daily log created or updated
  - [ ] All relevant documentation files updated

- [ ] **Linear Updated**
  - [ ] Issue status matches documentation
  - [ ] Issue description includes all relevant details
  - [ ] Links to documentation are current

- [ ] **Sync Verified**
  - [ ] Information is identical in both systems
  - [ ] Cross-references are working
  - [ ] No conflicting information exists

### Post-Completion Verification

- [ ] **Documentation Accessibility**
  - [ ] All team members can access updated documentation
  - [ ] Links are working correctly
  - [ ] Information is easy to find

- [ ] **Linear Accessibility**
  - [ ] Issue is visible to relevant team members
  - [ ] Status is clear and accurate
  - [ ] Related issues are properly linked

## Troubleshooting

### Common Issues

1. **Linear Integration Errors**
   - **Problem:** GraphQL validation errors
   - **Solution:** Use simplified queries, verify field names
   - **Escalation:** Document technical issues for resolution

2. **Documentation Sync Delays**
   - **Problem:** Information out of sync between systems
   - **Solution:** Immediate manual sync, verify both systems
   - **Prevention:** Always update both systems simultaneously

3. **Missing Cross-References**
   - **Problem:** Links between documentation and Linear broken
   - **Solution:** Update links, verify accessibility
   - **Prevention:** Include link verification in checklist

### Escalation Process

1. **Technical Issues:** Document in daily log, create Linear issue
2. **Process Issues:** Update this workflow document
3. **System Access Issues:** Contact project administrator

## Related Documentation

- [IDE Instructions](../../IDE%20Instructions/ide-instructions.md)
- [Documentation Standards](./documentation-standards.md)
- [Webpage Progress Tracker](../tracking/webpage-progress-tracker.md)
- [Development Workflow](./development-workflow.md)
- [Linear Integration Guide](../integrations/linear-integration.md)

Last Updated: January 27, 2025

# Common Workflows and Patterns

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Training](./index.md) > Common Workflows and Patterns

**Version:** 1.0  
**Created:** January 2, 2025  
**Purpose:** Reference guide for standard dual MCP workflow patterns

## Overview

This document provides a comprehensive reference for common workflow patterns using the dual MCP system. These patterns represent best practices developed for the Window World LA website project and should be used as templates for similar work.

## Table of Contents

1. [Workflow Pattern Categories](#workflow-pattern-categories)
2. [Development Workflows](#development-workflows)
3. [Planning and Analysis Workflows](#planning-and-analysis-workflows)
4. [Documentation Workflows](#documentation-workflows)
5. [Problem Resolution Workflows](#problem-resolution-workflows)
6. [Quality Assurance Workflows](#quality-assurance-workflows)
7. [Pattern Selection Guide](#pattern-selection-guide)

## Workflow Pattern Categories

### Category 1: Development Workflows
- Feature implementation
- Bug fixes and debugging
- Code refactoring and optimization
- Testing and validation

### Category 2: Planning and Analysis Workflows
- Epic and feature planning
- Technical analysis and research
- Architecture decisions
- Risk assessment

### Category 3: Documentation Workflows
- Documentation creation and updates
- Knowledge base management
- Process documentation
- Training material development

### Category 4: Problem Resolution Workflows
- Issue investigation and analysis
- Solution evaluation and selection
- Implementation planning
- Post-resolution review

### Category 5: Quality Assurance Workflows
- Code review processes
- Testing procedures
- Performance optimization
- Security assessments

## Development Workflows

### Pattern D1: Standard Feature Implementation

**When to Use:** Implementing new features or functionality

**Linear MCP Steps:**
1. Create Feature task with clear requirements
2. Break down into implementation tasks
3. Assign tasks and set priorities
4. Track progress through development lifecycle

**ST-MCP Integration:**
- Use for complex feature analysis and planning
- Generate implementation strategy and approach
- Create testing procedures and validation criteria
- Document architecture decisions and trade-offs

**Example:**
```
Linear: Feature 1BU-25 "Code Audit Detection Implementation"
├── Task: Research available code audit tools
├── Task: Design integration architecture
├── Task: Implement core functionality
├── Task: Create configuration system
└── Task: Write tests and documentation

ST-MCP: Analyze code audit tool options → Generate implementation strategy → Create testing procedures
```

### Pattern D2: Bug Fix and Resolution

**When to Use:** Addressing bugs and issues

**Linear MCP Steps:**
1. Create Bug task with reproduction steps
2. Assign priority based on severity and impact
3. Track investigation and resolution progress
4. Verify fix and close task

**ST-MCP Integration:**
- Analyze bug symptoms and potential causes
- Generate debugging strategy and approach
- Evaluate fix options and potential side effects
- Create regression testing procedures

**Example:**
```
Linear: Bug "Import statement conflicts in Relume components"
├── Investigation: Identify all affected files
├── Analysis: Determine root cause
├── Fix: Implement solution
└── Validation: Test and verify resolution

ST-MCP: Analyze import conflicts → Generate resolution strategy → Create testing checklist
```

### Pattern D3: Code Refactoring

**When to Use:** Improving code quality and maintainability

**Linear MCP Steps:**
1. Create Refactoring task with scope and goals
2. Plan refactoring phases and milestones
3. Track progress and validate improvements
4. Document changes and benefits

**ST-MCP Integration:**
- Analyze current code structure and issues
- Generate refactoring strategy and approach
- Identify risks and mitigation strategies
- Create validation and testing procedures

## Planning and Analysis Workflows

### Pattern P1: Epic Planning and Breakdown

**When to Use:** Planning major initiatives and projects

**Linear MCP Steps:**
1. Create Epic with high-level business goals
2. Define success criteria and acceptance criteria
3. Break down into Features and Tasks
4. Set priorities and dependencies

**ST-MCP Integration:**
- Analyze Epic scope and requirements
- Generate Feature breakdown and task hierarchy
- Evaluate implementation approaches and trade-offs
- Create timeline and resource estimates

**Example:**
```
Linear: Epic 1BU-11 "Vibe Coding Implementation"
├── Feature: Code Audit Detection
├── Feature: Automated Testing Integration
├── Feature: AI Rule Configuration
└── Feature: Performance Monitoring

ST-MCP: Analyze Vibe Coding requirements → Generate feature breakdown → Create implementation roadmap
```

### Pattern P2: Technical Research and Analysis

**When to Use:** Evaluating technologies, tools, or approaches

**Linear MCP Steps:**
1. Create Research task with specific questions
2. Define evaluation criteria and success metrics
3. Track research progress and findings
4. Document recommendations and decisions

**ST-MCP Integration:**
- Structure research approach and methodology
- Analyze options and evaluate trade-offs
- Generate comparison matrices and recommendations
- Create decision documentation and rationale

### Pattern P3: Architecture Decision Making

**When to Use:** Making significant technical architecture decisions

**Linear MCP Steps:**
1. Create Architecture task with decision context
2. Define stakeholders and decision criteria
3. Track analysis and evaluation progress
4. Document final decision and rationale

**ST-MCP Integration:**
- Analyze architecture requirements and constraints
- Generate architecture options and alternatives
- Evaluate trade-offs and implications
- Create architecture documentation and guidelines

## Documentation Workflows

### Pattern DOC1: Comprehensive Documentation Creation

**When to Use:** Creating new documentation or major updates

**Linear MCP Steps:**
1. Create Documentation task with scope and audience
2. Define content structure and requirements
3. Track writing and review progress
4. Publish and maintain documentation

**ST-MCP Integration:**
- Analyze documentation requirements and audience needs
- Generate content structure and outline
- Create comprehensive content and examples
- Review and refine documentation quality

**Example:**
```
Linear: Task 1BU-15 "Create MCP Server Integration Guide"
├── Research: Analyze integration requirements
├── Structure: Create documentation outline
├── Content: Write comprehensive guide
└── Review: Validate and refine content

ST-MCP: Analyze integration patterns → Generate documentation structure → Create comprehensive content
```

### Pattern DOC2: Process Documentation

**When to Use:** Documenting workflows, procedures, and processes

**Linear MCP Steps:**
1. Create Process Documentation task
2. Define process scope and stakeholders
3. Track documentation development
4. Validate with process users

**ST-MCP Integration:**
- Analyze current process and identify gaps
- Generate process flow and decision points
- Create step-by-step procedures and guidelines
- Develop training materials and examples

## Problem Resolution Workflows

### Pattern PR1: Complex Problem Investigation

**When to Use:** Investigating complex technical or process issues

**Linear MCP Steps:**
1. Create Investigation task with problem description
2. Define investigation scope and approach
3. Track findings and analysis progress
4. Document resolution and lessons learned

**ST-MCP Integration:**
- Structure investigation approach and methodology
- Analyze symptoms and potential root causes
- Generate hypotheses and testing procedures
- Create resolution strategy and implementation plan

### Pattern PR2: Multi-Option Solution Evaluation

**When to Use:** Evaluating multiple solutions to a problem

**Linear MCP Steps:**
1. Create Solution Evaluation task
2. Define evaluation criteria and constraints
3. Track analysis of each option
4. Document recommendation and implementation plan

**ST-MCP Integration:**
- Generate comprehensive solution options
- Analyze trade-offs and implications for each option
- Evaluate options against defined criteria
- Create recommendation with detailed rationale

## Quality Assurance Workflows

### Pattern QA1: Code Review and Quality Assessment

**When to Use:** Conducting thorough code reviews

**Linear MCP Steps:**
1. Create Code Review task for specific changes
2. Define review criteria and standards
3. Track review progress and findings
4. Ensure all issues are addressed

**ST-MCP Integration:**
- Analyze code changes for quality and standards compliance
- Generate review checklist and focus areas
- Identify potential issues and improvement opportunities
- Create feedback and recommendations

### Pattern QA2: Performance Optimization

**When to Use:** Optimizing system or application performance

**Linear MCP Steps:**
1. Create Performance Optimization task
2. Define performance goals and metrics
3. Track optimization efforts and results
4. Validate improvements and document changes

**ST-MCP Integration:**
- Analyze current performance characteristics
- Generate optimization strategy and priorities
- Evaluate optimization options and trade-offs
- Create testing and validation procedures

## Pattern Selection Guide

### Quick Reference

| Scenario | Recommended Pattern | Key Benefits |
|----------|-------------------|--------------|
| **New Feature Development** | D1: Standard Feature Implementation | Structured approach, clear tracking |
| **Bug Investigation** | PR1: Complex Problem Investigation | Systematic analysis, thorough documentation |
| **Epic Planning** | P1: Epic Planning and Breakdown | Comprehensive planning, clear hierarchy |
| **Documentation Creation** | DOC1: Comprehensive Documentation | High-quality content, structured approach |
| **Technology Evaluation** | P2: Technical Research and Analysis | Objective evaluation, clear recommendations |
| **Code Quality Issues** | QA1: Code Review and Quality Assessment | Thorough review, actionable feedback |
| **Performance Issues** | QA2: Performance Optimization | Data-driven optimization, measurable results |

### Selection Criteria

#### **Use Development Patterns (D1-D3) when:**
- Implementing new functionality
- Fixing bugs or issues
- Improving code quality

#### **Use Planning Patterns (P1-P3) when:**
- Starting new initiatives
- Making technical decisions
- Conducting research

#### **Use Documentation Patterns (DOC1-DOC2) when:**
- Creating new documentation
- Updating existing processes
- Training team members

#### **Use Problem Resolution Patterns (PR1-PR2) when:**
- Investigating complex issues
- Evaluating solution options
- Resolving technical problems

#### **Use Quality Assurance Patterns (QA1-QA2) when:**
- Reviewing code changes
- Optimizing performance
- Ensuring quality standards

## Best Practices

### Pattern Implementation
1. **Always start with Linear MCP** task creation
2. **Use ST-MCP for complex analysis** and planning
3. **Maintain clear links** between both systems
4. **Document decisions and rationale** in both systems
5. **Update progress regularly** in Linear MCP

### Pattern Adaptation
1. **Customize patterns** to fit specific needs
2. **Combine patterns** when appropriate
3. **Document variations** for future reference
4. **Share successful adaptations** with the team

### Pattern Evolution
1. **Collect feedback** on pattern effectiveness
2. **Refine patterns** based on experience
3. **Create new patterns** for emerging needs
4. **Maintain pattern documentation** current

## Related Documentation

- [Dual MCP Workflow Training Guide](./dual-mcp-workflow-training.md)
- [MCP Server Integration Guide](../guides/mcp-server-integration-guide.md)
- [Development Workflow](../processes/development-workflow.md)
- [Project Operations Manual](../project-operations-manual.md)

---

**Common Workflows Last Updated:** January 2, 2025  
**Next Review:** January 16, 2025  
**Feedback:** Contact project team with pattern suggestions and improvements

# Essential Project Documentation Guide for Window World LA

**Version:** 1.0
**Last Updated:** May 22, 2025

## Introduction

This document provides a comprehensive list and description of the essential project documents required to guide the Window World LA project. It clarifies the purpose of each document within our integrated workflow, which utilizes the Linear MCP Server, the Sequential Thinking MCP Server (Code Again), AI tools, and our extensive documentation repository. This guide is intended to help all team members understand our documentation ecosystem and how it supports our AI-IDE driven development processes.

## Action for `project-operations-manual.md`

The `docs/project-operations-manual.md` file is the cornerstone of our operational framework.

* **Integration:** It should be added to the `docs/` directory.
* **Purpose:** It's the high-level guide explaining how all pieces of our system (Linear MCP, Sequential Thinking MCP, AI tools, other documentation) work together.
* **Central Reference:** It must be linked from the main project `README.md` and `docs/index.md` as the primary starting point for understanding our team's workflow and project management approach.
* **Living Document:** It must be kept updated as our processes evolve.

## Full List of Essential Project Documents

This list is categorized to provide a clear structure for our documentation.

### A. Key Foundational Documents (New or Significantly Revised)

These documents establish and explain our new integrated workflow.

1.  **`docs/project-operations-manual.md` (NEW)**
    * **Purpose:** The overarching guide explaining the integrated workflow, roles of Linear MCP, Sequential Thinking MCP, AI tools, and how all other documentation fits together. This is the primary reference for "how we operate."
    * **Action:** Create this file in `docs/` using the content previously provided by the AI assistant.

2.  **`docs/project-hub.md` (SIGNIFICANTLY REVISED ROLE)**
    * **Purpose:** Our strategic dashboard. It provides a high-level, at-a-glance overview of current priorities (linking to Linear MCP), key initiatives, and quick links to critical operational documents (like `project-operations-manual.md` and `mcp-server-integration-guide.md`) and MCP server dashboards. It is **not** a task board itself.
    * **Action:** Revise its content based on the outline in `project-operations-manual.md`. It should link extensively to Linear MCP and ST-MCP.

3.  **`docs/guides/mcp-server-integration-guide.md` (NEW)**
    * **Purpose:** A critical new guide detailing precisely how the Linear MCP Server and the Sequential Thinking MCP Server (Code Again) work in tandem. It will define linking conventions, data flow, triggers, and provide use-case examples.
    * **Action:** Create this file in `docs/guides/`. This is essential for our dual-server strategy.

4.  **`docs/processes/development-workflow.md` (SIGNIFICANTLY REVISED)**
    * **Purpose:** The step-by-step guide for developers on how to contribute. This needs a major update to reflect task management in Linear MCP, workflow execution via Sequential Thinking MCP, AI tool usage within this framework, pre-commit check procedures, and standardized logging for interactions with both MCP servers.
    * **Action:** Rewrite this document to align with the processes outlined in the `project-operations-manual.md`.

### B. Existing Core Documentation to Maintain and Integrate

These are crucial documents you already have (as seen in `docs/documentation-map.md` and `docs/index.md`). Their valuable content should be maintained, ensuring they align with and reference the new dual-MCP task and workflow management system.

5.  **`README.md` (Main Project README at `/README.md`)**
    * **Purpose:** The main entry point to the entire project.
    * **Action:** Ensure it prominently links to `docs/project-operations-manual.md` and `docs/documentation-map.md`.

6.  **`docs/documentation-map.md`**
    * **Purpose:** The comprehensive map of all documentation files and their structure.
    * **Action:** Update it to include all new documents (like `project-operations-manual.md`, `mcp-server-integration-guide.md`, etc.) and reflect any revised roles of existing documents. This remains vital for navigation.

7.  **`docs/index.md` (Documentation Index at `/docs/index.md`)**
    * **Purpose:** The top-level index for the `/docs` directory.
    * **Action:** Update to include links to the new foundational documents and ensure it reflects the overall structure.

8.  **`docs/architecture/*` (All existing architecture documents)**
    * **Purpose:** Define the system design, component structures, routing strategies, database schemas, etc.
    * **Action:** Maintain. These documents will inform the creation and definition of tasks in Linear MCP and may provide parameters or context for workflows in the Sequential Thinking MCP Server.

9.  **`docs/features/*` (e.g., `vibe-coding-implementation.md`, `seo-strategy.md`, `todo-list-management.md`)**
    * **Purpose:** Detail specific product features and development tool features.
    * **Action:** Maintain. Implementation plans like `docs/features/vibe-coding-implementation.md` will now translate into Epics or Projects within Linear MCP. Specific complex sequences or automated tasks outlined in these plans (e.g., "Code Audit Detection") will be executed as workflows in the Sequential Thinking MCP Server, linked from relevant Linear tasks.

10. **`docs/Image generation/*` (e.g., `image-generation-implementation-plan.md`, `prompt-engineering-guide.md`, `image-generation-process.md`, `image-quality-standards.md`)**
    * **Purpose:** Define the strategy, plans, and processes for image generation.
    * **Action:** Maintain. The `image-generation-implementation-plan.md` becomes an Epic/Project in Linear MCP. The `image-generation-process.md` and `csv-processing-plan.md` will define and guide the actual workflows executed by the Sequential Thinking MCP Server. The `prompt-engineering-guide.md` and `image-quality-standards.md` will inform these processes.

11. **`docs/Knowledge Base/*` (e.g., `knowledge-base-workflow.md`, `automated-ingestion-process.md`, `semantic-chunking-process.md`)**
    * **Purpose:** Detail your knowledge base system.
    * **Action:** Maintain. The `knowledge-base-workflow.md` and `automated-ingestion-process.md` describe processes ideally suited for orchestration by the Sequential Thinking MCP Server, initiated from and linked to tasks in Linear MCP.

12. **`docs/guides/*` (Existing specific guides e.g., Relume guides, `google-generative-ai-guide.md`, `vertex-ai-image-analysis-guide.md`)**
    * **Purpose:** Provide detailed how-to instructions for specific tools or tasks.
    * **Action:** Maintain and review. Ensure they are consistent with the new dual-MCP workflow and reference it where appropriate.

13. **`docs/integrations/*` (e.g., `netlify.md`, `supabase.md`, `google-generative-ai.md`)**
    * **Purpose:** Document how your project integrates with external services.
    * **Action:** Maintain. These integrations might be part of workflows managed by ST-MCP.

14. **`docs/processes/documentation-standards.md`**
    * **Purpose:** Essential for ensuring quality, consistency, and maintainability of all documentation.
    * **Action:** Maintain and enforce.

15. **`docs/testing/*` (e.g., `testing-strategy.md`, and planned `Testing workflow`, `Testing guide`)**
    * **Purpose:** Define your testing approach, processes, and specific test plans.
    * **Action:** Maintain and develop as planned. Testing activities will be defined as tasks in Linear MCP. Automated testing sequences can be orchestrated by the Sequential Thinking MCP Server.

16. **`docs/daily-logs/*`**
    * **Purpose:** For individual brief updates, decisions made, or specific roadblocks encountered on a given day.
    * **Action:** Continue this practice. These logs can be valuable references linked from Linear MCP tasks or ST-MCP workflow logs when detailed context for a specific day's work is needed.

17. **`docs/tracking/tracking-progress.md` (REVISED USAGE)**
    * **Purpose:** This file previously showcased very detailed, dated progress for the GenAI SDK implementation. This *style* of rich, chronological logging for complex features or troubleshooting efforts is excellent.
    * **Action:** Instead of one monolithic file, such detailed logs should now be created as needed for specific major tasks or ST-MCP workflow instances. They can then be attached to, or linked from, the relevant item in Linear MCP or ST-MCP. Consider creating a template based on this file's structure for these detailed progress reports.

### C. Supporting AI & Process Documentation (Many from your `priority-list.md` – To Be Created or Formalized)

These documents will detail specific rules, standards, and guidelines for AI interaction and other processes, supporting the overall workflow.

18. **`docs/ai-agent-rules.md` (NEW - from Priority List)**
    * **Purpose:** Defines the operational rules, boundaries, and expected behaviors for any AI agents you develop or employ (e.g., Vibe Coding components).
    * **Action:** Create this file in `docs/` or a relevant subfolder like `docs/ai/`.

19. **`docs/processes/commit-standards.md` (NEW - from Priority List)**
    * **Purpose:** Specifies conventions for writing commit messages, including how to reference Linear MCP Task IDs to create a clear audit trail.
    * **Action:** Create this file in `docs/processes/`.

20. **`docs/effective-ai-interaction-guidelines.md` (NEW - from Priority List)**
    * **Purpose:** Provides best practices, prompt engineering tips, and general advice for developers when interacting with all AI tools (WinServ, Augment Code, Vibe Coding, Generative AI models) to achieve optimal results and reduce errors.
    * **Action:** Create this file in `docs/guides/` or `docs/ai/`.

21. **`docs/processes/ai-pre-commit-workflow.md` (NEW - based on "Pre-Commit Testing Framework" from Priority List)**
    * **Purpose:** Details the automated AI-powered pre-commit checks (likely involving Vibe Coding). Covers how these checks are triggered, what they analyze (code quality, modularity, documentation gaps, etc.), how feedback is delivered to the IDE, and the process for addressing or bypassing findings (with justification).
    * **Action:** Create this file in `docs/processes/`.

22. **`docs/ai-task-management-integration.md` (NEW - from Priority List)**
    * **Purpose:** Explains how AI will be used to assist in the task management process itself – for example, helping to break down Epics in Linear MCP into smaller tasks, suggesting relevant ST-MCP workflows, or even estimating task complexity.
    * **Action:** Create this file in `docs/ai/` or `docs/guides/`.

23. **`docs/multi-model-ai-strategy.md` (NEW - from Priority List)**
    * **Purpose:** Outlines your overarching strategy for leveraging multiple AI models (e.g., different Gemini versions, specific models for coding vs. image generation). Defines their intended roles, strengths, weaknesses, and how they might interact or be selected for different tasks/workflows.
    * **Action:** Create this file in `docs/ai/` or `docs/architecture/`.

24. **`docs/templates/*` (Expand based on "Documentation Gaps")**
    * **Purpose:** Provide standardized templates for various document types, AI interaction logs (if a structured format is preferred outside of MCP comments), ST-MCP workflow definitions, new page documentation, etc.
    * **Action:** Develop and store these in `docs/templates/`.

### D. Documents to be Deprecated or Absorbed

The functionality of these documents will be fully taken over by the Linear MCP Server.

25. **`docs/priority-list.md` (Standalone Version - DEPRECATE/ABSORB)**
    * **Reasoning:** All task listing, prioritization (High, Medium, Low), and status tracking will now be managed directly within the **Linear MCP Server**. The content of this file should be migrated to Linear as the initial backlog.
    * **Action:** Migrate content to Linear MCP, then archive or remove the markdown file to avoid confusion.

26. **`docs/project-tasks.md` (Standalone Version - DEPRECATE/ABSORB)**
    * **Reasoning:** Similar to `priority-list.md`, all its task management functions are superseded by the **Linear MCP Server**.
    * **Action:** Migrate content to Linear MCP (ensure no duplication with `priority-list.md` content), then archive or remove.

27. **`docs/tracking/webpage-progress-tracker.md` (Potentially DEPRECATE/ABSORB)**
    * **Reasoning:** Tracking the progress of individual webpages is often better handled through tasks, sub-tasks, or a dedicated board view within a project management tool like **Linear MCP Server**.
    * **Action:** Evaluate if Linear MCP can cover this need. If so, transfer the relevant information and then archive or remove the markdown file.

By organizing your documentation this way, you create a clear, maintainable, and highly effective ecosystem where your documentation actively supports and guides your AI-IDE workflow, centered around the Linear MCP and Sequential Thinking MCP servers. This structure ensures everyone knows where to find information, how processes work, and how to contribute efficiently.
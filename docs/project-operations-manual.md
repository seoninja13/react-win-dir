# Project Operations Manual: Window World LA

**Version:** 1.0
**Last Updated:** {{YYYY-MM-DD}}

## 1. Introduction & Core Principles

This manual outlines the primary workflow, project management structure, and AI integration strategy for the Window World LA project. Our goal is to create an efficient, error-reducing workflow by leveraging documentation, specialized MCP servers, and AI capabilities.

**Core Principles:**
- **Single Source of Truth:**
    - **Linear MCP Server:** For all project tasks, feature requests, bug tracking, sprint planning, and high-level initiative status.
    - **Sequential Thinking MCP Server (Code Again):** For orchestrating, executing, and tracking specific, complex, multi-step workflows (especially those involving AI, code manipulation, or automation).
    - **`Docs/` Directory:** For all enduring knowledge, architectural decisions, process definitions, guides, AI interaction logs (when not in MCP comments), and strategic plans. The `docs/documentation-map.md` serves as the comprehensive guide to this knowledge.
- **Clear Separation of Concerns:** Each tool and document has a defined purpose to prevent overlap and confusion.
- **AI Augmentation:** AI tools (WinServ, Augment Code, Vibe Coding, Google Generative AI) are integrated at multiple points to assist in development, task management, error detection, and documentation.
- **Documentation-Driven Development:** Processes are documented first, and documentation is kept current. All documentation follows the pyramid structure with `README.md` as the entry point.
- **Continuous Improvement:** This workflow is iterative. Feedback and logs (especially the "Error Log & Feedback Loop for AI Tools" section in `docs/project-hub.md`) will drive refinements.

## 2. System Overview & Tool Roles

### 2.1. Linear MCP Server
- **Purpose:** Primary project and task management.
- **Responsibilities:**
    - Backlog grooming and prioritization (High, Medium, Low, as previously in `docs/priority-list.md`).
    - Sprint/Cycle planning and management.
    - Tracking Epics, Features, User Stories, Tasks, and Bugs.
    - Assigning tasks and monitoring overall progress.
    - Linking to relevant ST-MCP workflows or documentation.
    - Storing brief AI interaction logs relevant to specific tasks (if not extensive enough for a separate doc or ST-MCP log).
- **Key Inputs:** `docs/priority-list.md` (for initial task seeding and prioritization scheme), `docs/project-tasks.md` (for initial task seeding), feature requests, bug reports, project roadmap elements identified in `docs/documentation-map.md`.

### 2.2. Sequential Thinking MCP Server (Code Again)
- **Purpose:** Workflow orchestration and automation.
- **Responsibilities:**
    - Executing predefined, multi-step sequences (e.g., image generation batches, Vibe Coding analysis routines, knowledge base ingestion).
    - Interacting with AI tools/APIs as part of a workflow.
    - Managing the state and logs of individual workflow instances.
    - Reporting completion status or key results back to the initiating Linear MCP task.
- **Key Inputs:** Triggers from Linear MCP tasks, predefined workflow definitions (which should be documented in `/docs/processes/` or feature-specific plans).

### 2.3. Documentation (`Docs/` Directory)
- **Purpose:** Central knowledge repository, process definition, and strategic planning.
- **Structure:** Hierarchical as defined in `docs/documentation-map.md`.
- **Key Documents (in addition to existing architectural, feature, and guide docs):**
    - **`docs/project-hub.md` (This document, or a refined version):** The strategic overview and central linking point. (Replaces previous concept of it being a task board).
    - **`docs/guides/mcp-server-integration-guide.md`:** Details how Linear MCP and ST-MCP work in tandem. (NEW - *Essential*)
    - **`docs/processes/development-workflow.md`:** Updated to reflect the dual MCP server usage and AI integration points.
    - **`docs/ai-agent-rules.md`:** (As per `priority-list.md`)
    - **`docs/effective-ai-interaction-guidelines.md`:** (As per `priority-list.md`)
    - **`docs/processes/commit-standards.md`:** (As per `priority-list.md`)
    - **`docs/processes/ai-pre-commit-workflow.md`:** (Details Vibe Coding pre-commit checks).
    - **`docs/ai-task-management-integration.md`:** (Details how AI assists with task management in Linear/ST-MCP, as per `priority-list.md`).
    - **`docs/multi-model-ai-strategy.md`:** (As per `priority-list.md`)
    - Implementation plans for major features (e.g., `docs/features/vibe-coding-implementation.md`, `docs/Image generation/image-generation-implementation-plan.md`) will define epics for Linear and workflows for ST-MCP.

### 2.4. AI Tools (Vibe Coding, Augment Code, WinServ, Google Generative AI)
- **Purpose:** Assist in coding, analysis, automation, content generation, and error reduction.
- **Integration:**
    - **Vibe Coding:** Integrated into the ST-MCP for complex analyses (like Code Audit Detection) and into the IDE for pre-commit checks. Findings reported to Linear/ST-MCP tasks.
    - **Augment Code/WinServ:** Used within IDEs for code generation/completion, with interaction details logged against Linear tasks or ST-MCP workflow steps.
    - **Google Generative AI:** Used for image generation, knowledge base embeddings, etc., typically orchestrated by ST-MCP workflows.

## 3. Core Workflows

### 3.1. Planning & Prioritization Workflow
1.  **Initiative Definition:** High-level initiatives (e.g., from `docs/documentation-map.md` roadmap, `docs/priority-list.md`) are defined as Epics in **Linear MCP Server**.
2.  **Task Breakdown:** Epics are broken down into features, stories, and tasks in Linear MCP. AI can assist in this breakdown (see `docs/ai-task-management-integration.md`).
3.  **Prioritization:** Tasks are prioritized in Linear MCP using the High/Medium/Low system.
4.  **Workflow Identification:** For tasks requiring complex sequences, a corresponding workflow in **Sequential Thinking MCP Server** is identified or defined. The Linear task will link to this ST-MCP workflow.

### 3.2. Development Workflow
*(To be detailed in `docs/processes/development-workflow.md`)*
1.  **Task Assignment:** Developer picks up/is assigned a task in **Linear MCP Server**.
2.  **Understand Requirements:** Developer consults the Linear task description, linked documentation (design docs, architectural docs from `docs/architecture/`), and any associated ST-MCP workflow definitions.
3.  **Development & AI Assistance:**
    - Code using IDEs (WinServ, Augment Code).
    - Log significant AI interactions (prompts, results, issues) in the Linear task or associated ST-MCP log.
4.  **Pre-Commit Checks (Vibe Coding):** Developer runs AI-powered pre-commit checks as defined in `docs/processes/ai-pre-commit-workflow.md`. Feedback is addressed.
5.  **Commit & Push:** Adhere to `docs/processes/commit-standards.md`.
6.  **ST-MCP Workflow Execution (if applicable):**
    - The Linear task may trigger an ST-MCP workflow (e.g., for CI/CD, advanced analysis, automated testing).
    - Developer monitors ST-MCP workflow or is notified of completion/issues.
7.  **Testing:** Follow `docs/testing/testing-strategy.md`.
8.  **Code Review & Merge.**
9.  **Update Linear Task:** Developer updates the status of the task in Linear MCP, linking to ST-MCP results if applicable.

### 3.3. AI-Driven Workflow Example: Image Generation
1.  **Linear Task:** "Generate Q3 Product Images" created in Linear MCP.
2.  **ST-MCP Trigger:** This Linear task links to/triggers the "Batch Image Generation Workflow" in ST-MCP.
3.  **ST-MCP Execution:** (Based on `docs/Image generation/image-generation-process.md` and `csv-processing-plan.md`)
    - ST-MCP processes CSV data.
    - Calls Google Generative AI (Vertex AI) via SDK (progress logged like in `docs/tracking/tracking-progress.md`).
    - Applies rate limiting.
    - Stores images (e.g., Supabase).
    - Logs successes/failures for each image within the ST-MCP workflow instance.
4.  **Feedback to Linear:** ST-MCP workflow completes, updates the parent Linear task with a summary (e.g., "100/105 images generated, 5 failures - see ST-MCP log [link]").

### 3.4. Documentation Workflow
1.  **Identify Need:** Documentation needs can arise from new features (Linear tasks), architectural changes, process updates, or gaps identified in `docs/documentation-map.md`.
2.  **Create/Update Doc:** Draft documentation following `docs/processes/documentation-standards.md`.
3.  **AI Assistance:** Use AI for drafting, summarizing, or checking consistency if applicable. Log interaction.
4.  **Review & Merge:** Standard PR process for documentation changes.
5.  **Update Maps:** Ensure `docs/documentation-map.md` and other relevant index files (e.g., `docs/index.md`) are updated.

## 4. `docs/project-hub.md` - Strategic Dashboard

The `docs/project-hub.md` file will serve as your high-level strategic dashboard. It **does not** replace the MCP servers for task/workflow management.

**Content for `docs/project-hub.md`:**
- **Links to MCP Servers:** Direct links to Linear MCP and Sequential Thinking MCP dashboards.
- **Current Sprint/Cycle Goals:** High-level summary with links to Linear MCP.
- **Pinned Priorities:** Top 3-5 strategic priorities (Epics from Linear MCP).
    - Example: "Project Structure Standardization (Linear: [ID])"
    - Example: "Code Audit Detection Implementation (Linear: [ID], ST-MCP Workflow: [ID])"
- **Key Initiatives & Epics:** Brief status and links to major ongoing initiatives in Linear, noting ST-MCP involvement.
    - Vibe Coding Implementation (Linear: [ID])
    - Image Generation (Linear: [ID], ST-MCP orchestrates: [Workflow ID])
    - Knowledge Base Development (Linear: [ID], ST-MCP orchestrates: Automated Ingestion [Workflow ID])
- **AI Workflow Management Links:**
    - `docs/ai-agent-rules.md`
    - `docs/effective-ai-interaction-guidelines.md`
    - `docs/guides/mcp-server-integration-guide.md`
    - `docs/processes/ai-pre-commit-workflow.md`
- **Error Log & Feedback Loop for AI Tools (Summary/Link):** A brief summary or link to a dedicated log for systemic AI tool issues, referencing relevant Linear/ST-MCP IDs.
- **Key Documentation Links:** `documentation-map.md`, `development-workflow.md`, `README.md`.

## 5. Migration of Existing Task Management Artifacts

- **`docs/priority-list.md`:**
    - All tasks to be migrated into **Linear MCP Server**.
    - The prioritization system (High, Medium, Low) should be replicated in Linear.
    - High priority items like "Project Structure Standardization," "Code Audit Detection," "Fix Non-Working Pages," "Implement AI-Enhanced Development Documentation," and "Implement Google Generative AI Integration" will become Epics/Projects in Linear.
- **`docs/project-tasks.md`:**
    - All tasks to be migrated into **Linear MCP Server**, merged with items from `priority-list.md` to avoid redundancy.
- **`docs/tracking/webpage-progress-tracker.md` & `docs/tracking/tracking-progress.md`:**
    - Granular progress for ongoing initiatives (like the GenAI SDK implementation detailed in `tracking-progress.md`) should be logged as updates/comments within the relevant **Linear MCP** tasks or the logs of corresponding **ST-MCP** workflow instances.
    - These markdown files can serve as templates for such updates or be archived once information is transferred. `webpage-progress-tracker.md` might be superseded by features/boards in Linear MCP.

## 6. Actionable Next Steps
1.  **Set up Linear MCP Server:** Configure projects, task types, statuses, and prioritization fields (High, Medium, Low).
2.  **Migrate Tasks:** Populate Linear MCP by migrating and consolidating tasks from `docs/priority-list.md` and `docs/project-tasks.md`.
3.  **Define ST-MCP Workflows:** Identify and begin defining the initial set of critical workflows for the Sequential Thinking MCP Server (e.g., Image Generation, Code Audit sequence). Document these in `/docs/processes/` or linked from relevant feature plans.
4.  **Draft Core New Documents:**
    - `docs/guides/mcp-server-integration-guide.md` (TOP PRIORITY)
    - `docs/project-hub.md` (as outlined above)
    - `docs/ai-agent-rules.md`
    - `docs/effective-ai-interaction-guidelines.md`
    - `docs/processes/commit-standards.md`
    - `docs/processes/ai-pre-commit-workflow.md`
    - `docs/ai-task-management-integration.md`
    - `docs/multi-model-ai-strategy.md`
5.  **Update `docs/processes/development-workflow.md`:** Reflect the new dual-MCP and AI-integrated process.
6.  **Team Training:** Ensure the team understands the roles of each server and the new workflow.

By adopting this integrated approach, leveraging both Linear MCP for project management and the Sequential Thinking MCP Server for workflow automation, all supported by your robust documentation and AI tools, you will significantly enhance efficiency, reduce errors, and build a more scalable development process.
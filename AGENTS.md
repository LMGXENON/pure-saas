# AGENTS.md: Developer & Agent Guide for Pure SaaS

Welcome, AI coding agent or human contributor. This document defines the engineering standards, architecture, and operational rules for working in and using the **Pure SaaS** repository.

---

## 1. Repository Purpose & Architecture

Pure SaaS is an open-source, universal AI-agent skill and design enforcement toolkit. Its purpose is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, e-commerce, portfolios, design systems, and components.

### File Hierarchy
```
pure-saas/
├── SKILL.md              # Canonical agent-agnostic operational skill instruction set
├── AGENTS.md             # This agent operations manual
├── commands/             # Native slash commands for supported agents (/pure-saas, /pure-saas:*)
├── prompts/              # Portable copy-ready Markdown prompts for any LLM
├── references/           # In-depth architectural & craft guides (typography, tokens, layout, etc.)
├── schemas/              # Formal JSON schemas for DESIGN.md, design-brief.md, and references
├── templates/            # Ready-to-use markdown starter templates (DESIGN.md, design-brief.md)
├── scripts/              # Zero-dependency Node.js CLI & wrappers (pure-saas.mjs, validate-design, etc.)
├── integrations/         # Thin adapters for Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini, generic
└── tests/                # Automated tests (schema, token, enforcement, and agent workflow)
```

---

## 2. Command Architecture

### Universal Entry Point: `/pure-saas [request]`
Accepts arbitrary natural-language requests, inspects project context, and dynamically orchestrates the appropriate subcommands.

### Specialised Subcommands:
- `/pure-saas reference [URL]` — Reverse-engineer visual references via browser DevTools.
- `/pure-saas design [request]` — Establish or update root-level `DESIGN.md`.
- `/pure-saas build [request]` — Complete implementation from scratch or within existing project.
- `/pure-saas audit [scope]` — Comprehensive quality and WCAG 2.2 AA audit.
- `/pure-saas fix [request]` — Diagnose and resolve defects while preserving backend APIs.
- `/pure-saas polish [request]` — Elevate visual craft, typography tracking, and micro-interactions.
- `/pure-saas responsive [request]` — Optimize layouts across desktop, tablet, and mobile.
- `/pure-saas accessible [request]` — Enforce WCAG 2.2 AA, focus rings, and ARIA landmarks.
- `/pure-saas motion [request]` — Design purposeful transitions with reduced-motion support.
- `/pure-saas tokens [request]` — Validate, scan, and export design tokens.
- `/pure-saas component [request]` — Build reusable components across the 8-state matrix.
- `/pure-saas verify [request]` — End-to-end check of requirements, builds, and tests.
- `/pure-saas system [request]` — Establish or evolve product-wide design foundations.
- `/pure-saas migrate [request]` — Modernize legacy styling or tokens incrementally.
- `/pure-saas init` — Scaffold starter specifications.

---

## 3. Working Rules for Coding Agents

1. **Follow the 10 Universal Execution Behaviors:** Follow all rules in `SKILL.md` (inspect context, select relevant workflows, implement directly, preserve backend APIs, maintain `DESIGN.md`, test and refine, report honestly).
2. **Never Fabricate Validation:** If a check fails, diagnose and resolve it. If an environment lacks browser inspection or screen-reader tooling, record the area as `untested`.
3. **Preserve Architecture in Existing Apps:** Never rewrite backend APIs, auth flows, or database structures during UI refactors without explicit user authorization.
4. **Enforce Semantic Tokens:** Reject raw hex codes and arbitrary Tailwind numbers. Ensure all styling resolves to documented tokens in `DESIGN.md`.
5. **Enforce Anti-Slop Discipline:** Halt and challenge generic purple/cyan gradient text, excessive glassmorphism blur, and repetitive 3-column feature cards.

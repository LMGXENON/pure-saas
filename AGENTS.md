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

Pure SaaS operates via **one intelligent main command and five specialist commands**:

### 1. Universal Main Command: `/pure-saas [any request]`
The default entry point for almost everything. Accepts arbitrary natural-language requests, inspects project context, and automatically handles:
- Design & specification (`DESIGN.md`)
- Full component & application implementation
- Reusable components across the 8-state matrix
- Semantic design token management & enforcement
- Purposeful motion, transitions & micro-interactions
- Accessibility (WCAG 2.2 AA) & keyboard focus
- Responsive cross-device layout optimization
- Performance & security optimizations
- Bug diagnostics & direct remediation preserving backend APIs
- Testing & end-to-end verification

### 2. Specialist Commands:
- `/pure-saas design [request]` — Establish or update root-level `DESIGN.md` specification before implementation.
- `/pure-saas polish [request]` — Elevate visual craft, typography tracking, surface lighting, and micro-interactions without rebuilding working logic.
- `/pure-saas review [request or scope]` — Rigorous, evidence-based quality audit across bugs, security, accessibility, performance, and tokens.
- `/pure-saas reference [URL]` — Reverse-engineer visual references via browser DevTools and recreate requested design language.
- `/pure-saas responsive [request]` — Optimize layouts across mobile, tablet, laptop, and desktop viewports.

---

## 3. Working Rules for Coding Agents

1. **Follow the 10 Universal Execution Behaviors:** Follow all rules in `SKILL.md` (inspect context, coordinate capabilities automatically, execute directly for straightforward requests, preserve backend APIs, maintain `DESIGN.md`, test and refine, report honestly).
2. **Never Fabricate Validation:** If a check fails, diagnose and resolve it. If an environment lacks browser inspection or screen-reader tooling, record the area as `untested`.
3. **Preserve Architecture in Existing Apps:** Never rewrite backend APIs, auth flows, database structures, or automated test IDs during UI refactors without explicit user authorization.
4. **Enforce Semantic Tokens:** Reject raw hex codes, color functions, and arbitrary Tailwind numbers. Ensure all styling resolves to documented tokens in `DESIGN.md`.
5. **Enforce Anti-Slop Discipline:** Halt and challenge generic purple/cyan gradient text, excessive glassmorphism blur, repetitive 3-column feature cards, and emoji UI icons.
6. **Follow "Read Before You Cite":** Never review from memory or invent guidelines. Route to relevant guides in `references/` (`cross-platform.md`, `code-audit.md`, `accessibility.md`, `typography.md`, etc.), open them, and cite exact files and sections.
7. **Four-Part Review Findings:** Every reported review finding must provide Finding, Evidence (`file:line` or observed value), Impact (**Critical**, **Warning**, or **Info**), and Concrete Fix.

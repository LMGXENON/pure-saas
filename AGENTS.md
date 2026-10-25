# AGENTS.md: Developer & Agent Guide for Pure SaaS

Welcome, AI coding agent or human contributor. This document defines the engineering standards, architecture, and operational rules for working in and using the **Pure SaaS** repository.

---

## 1. Repository Purpose & Architecture

Pure SaaS is an open-source, universal AI-agent skill and design enforcement toolkit. Its purpose is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop.

### File Hierarchy
```
pure-saas/
├── SKILL.md              # Canonical agent-agnostic operational skill instruction set
├── AGENTS.md             # This agent operations manual
├── references/           # In-depth architectural & craft guides (typography, tokens, layout, etc.)
├── schemas/              # Formal JSON schemas for DESIGN.md, design-brief.md, and references
├── templates/            # Ready-to-use markdown starter templates
├── scripts/              # Zero-dependency Node.js CLI & wrappers (pure-saas.mjs, validate-design, etc.)
├── integrations/         # Thin adapters for Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini, generic
├── tests/                # Automated tests (schema, token, enforcement, and agent workflow)
└── examples/             # Canonical design direction examples (developer-tool, creative-product, editorial-saas)
```

---

## 2. Command Reference

The toolkit requires Node.js >= 18 and has **zero external npm dependencies**.

```bash
# Run all automated tests
npm test
# or
node --test tests/**/*.test.mjs

# Validate a DESIGN.md specification
node scripts/pure-saas.mjs validate [path/to/DESIGN.md]

# Check tokens and scan source code for raw styles or anti-slop patterns
node scripts/pure-saas.mjs check-tokens [DESIGN.md] --source [src-dir]

# Export tokens to CSS Custom Properties, Tailwind, or JSON
node scripts/pure-saas.mjs export-tokens [DESIGN.md] --format css --out styles/tokens.css

# Generate comprehensive quality & verification report
node scripts/pure-saas.mjs review-report --json
```

---

## 3. Working Rules for Coding Agents

1. **Follow the 9-Stage Workflow:** When tasked with interface design or redesign, execute Stages A through I from `SKILL.md`.
2. **Never Fabricate Validation:** If a check fails, diagnose and resolve it. If an environment lacks browser inspection or screen-reader tooling, record the area as `untested` in the review report.
3. **Preserve Architecture in Existing Apps:** Never rewrite backend APIs, auth flows, or database structures during UI refactors without explicit user authorization.
4. **Enforce Semantic Tokens:** Reject raw hex codes and arbitrary Tailwind numbers. Ensure all styling resolves to documented tokens in `DESIGN.md`.
5. **Enforce Anti-Slop Discipline:** Halt and challenge generic purple/cyan gradient text, excessive glassmorphism blur, and repetitive 3-column feature cards.


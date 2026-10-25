# Pure SaaS

> Universal AI-agent skill and design enforcement toolkit for professional web design and UI/UX without generic AI patterns.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](package.json)
[![Node.js >= 18](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](package.json)

---

## What is Pure SaaS?

When asked to design websites or web applications, AI coding agents frequently fall into repetitive, generic design clichés:
- Monotonous purple/cyan gradient text and blurred glassmorphism glows.
- Identical three-column feature cards stacked repetitively down the page.
- Arbitrary colors, unmapped spacing, and inconsistent geometry.
- Emoji used as interface icons (`🚀`, `⚡`, `🔥`) instead of crisp SVGs.
- Generic marketing jargon ("Unlock your potential", "Supercharge your workflow").
- Desktop mockups lacking responsive mobile layouts, keyboard accessibility, or interaction states.

**Pure SaaS** solves this at the agent level. It equips AI coding assistants with an explicit design brief, a persistent design system, strict anti-slop rules, deterministic token validation, and an evidence-based verification protocol.

---

## Installation

### Install via the Skills CLI (Recommended)

Install Pure SaaS into your repository using the standard Skills CLI:

```bash
npx skills add LMGXENON/pure-saas
```

The Skills CLI automatically discovers `SKILL.md` at the repository root, installs the toolkit into `.agents/skills/pure-saas`, and configures symlinks for Claude Code (`.claude/skills/pure-saas`).

#### Options

```bash
# Install globally for your machine
npx skills add LMGXENON/pure-saas -g

# Install targeting specific agents
npx skills add LMGXENON/pure-saas --agent claude-code cursor

# List skills in repository without installing
npx skills add LMGXENON/pure-saas --list
```

### Initialize a Project Design System (Separate CLI)

To scaffold a starter design system in your consumer project independently of agent skill installation:

```bash
npx pure-saas init
```

This creates canonical starter specifications in your project root:
- `design-brief.md` — Product identity, brand personality, and scope boundaries.
- `DESIGN.md` — Codified semantic design tokens (colors, typography, spacing, radii, accessibility).
- `reference-record.md` — (Optional with `--reference`) Template for deconstructing live visual references.

---

## Supported Agent Integrations

Pure SaaS provides native integration adapters and standard prompt fallbacks, clearly distinguishing verified native integrations from instruction-file compatibility:

| Platform / Agent | Integration Type | Native Path / Mechanism | How to Operate |
| :--- | :--- | :--- | :--- |
| **Claude Code** | **Verified Native Skill** | `.claude/skills/pure-saas`, `commands/` | Native slash commands (`/pure-saas:design`, etc.) or prompt mentions. |
| **Cursor** | **Verified Native Rules** | `.cursor/rules/pure-saas-*.mdc` | Type `@pure-saas-design`, `@pure-saas-review` in Composer or Chat. |
| **OpenCode** | **Verified Native Skill** | `.agents/skills/pure-saas`, `.opencode/commands/` | Native slash commands (`/pure-saas:design`, etc.) in chat. |
| **Codex** | **Verified Native Plugin** | `.codex-plugin/plugin.json` | Plugin actions or portable prompts from `prompts/`. |
| **Gemini / Antigravity** | **Verified Native Skill** | `GEMINI.md` / `skills/pure-saas` | Context instructions or native skill invocation. |
| **Windsurf** | **Instruction-File Compatibility** | `.windsurfrules` | Rules file at project root or portable prompts from `prompts/`. |
| **Generic / Others** | **Instruction-File Compatibility** | `SYSTEM_PROMPT.md` | Add instructions to system prompt or paste from `prompts/`. |

---

## Core Workflows & Slash Commands

Pure SaaS provides 6 core workflows accessible via **native slash commands** where supported, **Cursor rule mentions**, or **portable copy-ready markdown prompts**:

| Workflow | Native Slash Command | Cursor Mention | Portable Prompt | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Initialize** | `/pure-saas:init` | `@pure-saas-init` | [`prompts/init.md`](prompts/init.md) | Initialize project with `DESIGN.md` and `design-brief.md`. |
| **Design** | `/pure-saas:design [scope]` | `@pure-saas-design` | [`prompts/design.md`](prompts/design.md) | Execute full 9-stage design workflow without generic AI slop. |
| **Review** | `/pure-saas:review [path]` | `@pure-saas-review` | [`prompts/review.md`](prompts/review.md) | Audit UI for visual quality, WCAG 2.2 AA accessibility, and slop. |
| **Fix** | `/pure-saas:fix [issues]` | `@pure-saas-fix` | [`prompts/fix.md`](prompts/fix.md) | Remediate UI defects while strictly preserving backend APIs & contracts. |
| **Tokens** | `/pure-saas:tokens [format]` | `@pure-saas-tokens` | [`prompts/tokens.md`](prompts/tokens.md) | Validate `DESIGN.md`, scan code for drift, and export tokens. |
| **Reference** | `/pure-saas:reference <url>` | `@pure-saas-reference` | [`prompts/reference.md`](prompts/reference.md) | Deconstruct a live reference website into measured craft parameters. |

---

## Example Prompts

If your agent does not support custom slash commands, copy and paste these prompts directly into your chat:

### 1. Initialize a New Project
```markdown
Initialize Pure SaaS for this project:
1. Run `npx pure-saas init` to create `design-brief.md` and `DESIGN.md`.
2. Guide me through defining the product identity, target personas, and primary aesthetic.
3. Validate the tokens using `node scripts/pure-saas.mjs validate DESIGN.md`.
```

### 2. Design an Interface
```markdown
/pure-saas:design Build a high-density analytics dashboard for our database monitoring service.
Follow the 9-stage workflow in SKILL.md. Ensure layout uses asymmetrical data splits rather than repetitive 3-column cards. Bind all styling to tokens in DESIGN.md.
```

### 3. Review an Existing UI
```markdown
/pure-saas:review Audit src/components/Dashboard.tsx and styles/dashboard.css.
Check against the Top 12 AI Slop patterns and WCAG 2.2 AA accessibility guidelines.
Run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src` and report verified, failed, and untested areas honestly.
```

### 4. Fix Issues Without Regression
```markdown
/pure-saas:fix Fix the focus ring contrast and mobile navigation overflow on the billing page.
Strict mandate: Do not modify any API route, server action, authentication flow, or DOM ID. Bind all changes to semantic tokens in DESIGN.md.
```

### 5. Validate & Export Tokens
```markdown
/pure-saas:tokens Validate our DESIGN.md and export CSS Custom Properties to styles/tokens.css and Tailwind extensions to tailwind.tokens.js.
```

### 6. Deconstruct a Reference Website
```markdown
/pure-saas:reference https://example.com
Inspect typography scale, color palette, section pacing, and motion choreography. Record findings in reference-record.md and translate relevant craft principles into our DESIGN.md without copying brand identity.
```

---

## Core Capabilities

### 1. Anti-Slop by Default
Pure SaaS actively challenges generic AI defaults:
- **No Gratuitous Gradients:** Replaces purple/cyan gradient text with intentional, high-contrast typography.
- **Asymmetrical & Content-Driven Layout:** Forbids default 3-column feature card stacks in favor of interactive demos, split flows, and dense data displays.
- **Micro-Typography Polish:** Enforces line-height proportional to font size, body line-length measure (45–75 characters), tabular numerals for metrics, and optical balance.
- **Crisp Vector Iconography:** Replaces emoji in UI components with purpose-built inline SVGs.

### 2. Persistent `DESIGN.md` System
All interface styling resolves to a codified token specification before code is generated. `DESIGN.md` tracks:
- Semantic color palette (canvas, surface, text, action, border, status).
- Proportional typography scales and font stacks.
- Spacing, layout grids, and component radii.
- Accessibility target tier (WCAG 2.2 AA).

### 3. Strict Backend & Architecture Preservation
When modifying existing applications, Pure SaaS strictly forbids agents from rewriting backend logic:
- Preserves 100% of API endpoints, route handlers, and server actions.
- Preserves database schemas, ORM models, and data contracts.
- Preserves authentication session lifecycles and state machines.
- Retains test IDs and DOM landmarks required by automated integration tests.

### 4. The 9-Stage Agent Workflow
1. **Stage A: Discover** — Map frameworks, brand guidelines, and immutable contracts.
2. **Stage B: Define** — Author or update `design-brief.md`.
3. **Stage C: Establish** — Define semantic tokens in `DESIGN.md`.
4. **Stage D: Plan** — Plan page layout, content pacing, and visual hierarchy.
5. **Stage E: Build** — Implement components bound directly to semantic tokens.
6. **Stage F: Inspect** — Check viewports at 375px, 768px, and 1440px.
7. **Stage G: Refine** — Eliminate contrast failures, orphaned headings, and missing states.
8. **Stage H: Enforce** — Run static code checks and token validation.
9. **Stage I: Report** — Provide an honest verification ledger (verified, failed, untested).

*For minor UI updates (e.g., button tweaks), agents execute an expedited workflow: read `DESIGN.md`, apply tokens, verify states, and report.*

### 5. Complete Interaction State Matrix
Every interactive component must define 8 explicit states: `hover`, `focus-visible`, `active/pressed`, `disabled`, `loading`, `empty`, `error`, and `success`.

---

## Project Structure

```
pure-saas/
├── SKILL.md              # Canonical agent-agnostic operational skill instruction set
├── AGENTS.md             # Developer & agent operations manual
├── commands/             # Native slash commands for supported agents (/pure-saas:*)
├── prompts/              # Portable copy-ready Markdown prompts for any LLM
├── references/           # In-depth architectural & craft guides
│   ├── anti-slop-rules.md
│   ├── color-and-tokens.md
│   ├── typography.md
│   ├── layout-and-composition.md
│   ├── motion.md
│   ├── design-review.md
│   ├── reference-analysis.md
│   └── design-styles-catalog.json
├── schemas/              # Formal JSON schemas for DESIGN.md and design-brief.md
├── templates/            # Ready-to-use starter templates (DESIGN.md, design-brief.md)
├── scripts/              # Zero-dependency Node.js CLI (pure-saas.mjs)
├── integrations/         # Platform adapters (Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini)
└── tests/                # Automated tests (schema, token, enforcement, and agent workflow)
```

---

## Deterministic CLI Reference

The Pure SaaS CLI is zero-dependency and runs with Node.js >= 18:

```bash
# Validate DESIGN.md or design-brief.md structure and required tokens
npx pure-saas validate [path/to/DESIGN.md]

# Scan source code for raw hex colors, unmapped styles, or anti-slop violations
npx pure-saas check-tokens [DESIGN.md] --source src

# Export tokens to CSS Custom Properties, Tailwind, or JSON
npx pure-saas export-tokens DESIGN.md --format css --out styles/tokens.css
npx pure-saas export-tokens DESIGN.md --format tailwind --out tailwind.tokens.js
npx pure-saas export-tokens DESIGN.md --format json --out tokens.json

# Query curated design intelligence taxonomy
npx pure-saas style "developer tool dark mode"

# Generate comprehensive verification report
npx pure-saas review-report --json

# Initialize starter templates in current repository
npx pure-saas init
```

---

## Limitations

- **Browser-less Sandboxes:** In environments without a headless browser or screen-reader runtime, Pure SaaS performs static code analysis and token verification. Visual rendering, fluid animation fidelity, and screen-reader keyboard traps are recorded as `untested` rather than fabricated as verified.
- **Dynamic CSS-in-JS:** The static source scanner parses CSS, Tailwind utility classes, HTML, JSX, TSX, Svelte, and Vue files. Dynamic runtime style calculations (e.g., `style={{ color: dynamicHex }}`) should use token mappings or be marked with `/* pure-saas-ignore rule: reason */`.

---

## Testing & Quality Assurance

Run the automated test suite:

```bash
# Run all tests using Node.js native test runner (zero external dependencies)
npm test

# Run individual test suites
npm run test:schemas
npm run test:tokens
npm run test:enforcement
npm run test:agents
```

---

## License & Attribution

Pure SaaS is open-source software licensed under the [MIT License](LICENSE).

Third-party notices, curated style taxonomies, and static check utilities adapted from open-source projects are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

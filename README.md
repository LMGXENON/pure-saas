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

**Pure SaaS** solves this at the agent level. It equips AI coding assistants with **one universal entry point** (`/pure-saas`) and **specialised subcommands** to design, build, audit, polish, and verify complete software products without generic templates or AI slop.

---

## The Universal Command: `/pure-saas [request]`

The global command is the universal entry point for any natural-language request:

```bash
# Creative product design
/pure-saas create a premium 3D landing page for my hospital

# Desktop & productivity apps
/pure-saas build a native-feeling macOS productivity app

# E-commerce & complex flows
/pure-saas build a complete e-commerce application with authentication and checkout

# Redesigns & upgrades
/pure-saas redesign my existing checkout experience

# Visual elevation & craft
/pure-saas make this interface feel significantly more premium

# Root-cause diagnosis & repair
/pure-saas investigate why the application looks inconsistent and fix it
```

### Autonomous Intent Analyzer
When given an arbitrary natural-language request, Pure SaaS automatically:
1. **Inspects Project Context:** Examines the repository, framework, build tools, styling conventions, and backend contracts.
2. **Orchestrates Workflows:** Dynamically chains the required subcommands (`design` → `build` → `responsive` → `motion` → `audit` → `verify`) without forcing you to specify technical implementation steps.
3. **Builds Real Software:** Implements working components, routing, and states—never stopping at a preliminary scaffold or static mockup.
4. **Verifies & Refines:** Compares against quality standards, runs token validation, and concludes with an honest report.

---

## Specialised Subcommands

Every subcommand inherits the canonical instructions in `SKILL.md`, relevant reference guides, and the project's persistent `DESIGN.md`:

| Subcommand | Purpose | Cursor Mention | Portable Prompt |
| :--- | :--- | :--- | :--- |
| **`/pure-saas reference [URL]`** | Reverse-engineer visual reference via browser DevTools, author 16-section `DESIGN.md`, and recreate design language. | `@pure-saas-reference` | [`prompts/reference.md`](prompts/reference.md) |
| **`/pure-saas design [request]`** | Establish or update the project's persistent design specification (`DESIGN.md`) before implementation. | `@pure-saas-design` | [`prompts/design.md`](prompts/design.md) |
| **`/pure-saas build [request]`** | Execute complete implementation from scratch or within existing project. Never stop at a static mockup. | `@pure-saas-build` | [`prompts/build.md`](prompts/build.md) |
| **`/pure-saas audit [scope]`** | Comprehensive quality audit across hierarchy, responsive overflow, WCAG 2.2 AA accessibility, and tokens. | `@pure-saas-audit` | [`prompts/audit.md`](prompts/audit.md) |
| **`/pure-saas fix [request]`** | Diagnose and resolve visual, layout, responsive, token, or interaction defects preserving backend APIs. | `@pure-saas-fix` | [`prompts/fix.md`](prompts/fix.md) |
| **`/pure-saas polish [request]`** | Raise visual craft, typography tracking, surface lighting, micro-interactions, and custom SVGs. | `@pure-saas-polish` | [`prompts/polish.md`](prompts/polish.md) |
| **`/pure-saas responsive [request]`** | Optimize layouts across 1440px desktop, 768px tablet, and 375px mobile viewports without horizontal clipping. | `@pure-saas-responsive` | [`prompts/responsive.md`](prompts/responsive.md) |
| **`/pure-saas accessible [request]`** | Enforce WCAG 2.2 AA accessibility, visible focus rings, semantic landmarks, and reduced-motion support. | `@pure-saas-accessible` | [`prompts/accessible.md`](prompts/accessible.md) |
| **`/pure-saas motion [request]`** | Design and implement purposeful transitions, entrance reveals, and easing curves. | `@pure-saas-motion` | [`prompts/motion.md`](prompts/motion.md) |
| **`/pure-saas tokens [request]`** | Create, inspect, validate, and export design tokens to CSS Custom Properties, Tailwind, or JSON. | `@pure-saas-tokens` | [`prompts/tokens.md`](prompts/tokens.md) |
| **`/pure-saas component [request]`** | Build or refactor reusable components across the full 8-state matrix with accessible ARIA roles. | `@pure-saas-component` | [`prompts/component.md`](prompts/component.md) |
| **`/pure-saas verify [request]`** | End-to-end check of requirements, production builds, test suites, and token consistency. | `@pure-saas-verify` | [`prompts/verify.md`](prompts/verify.md) |
| **`/pure-saas system [request]`** | Establish or evolve product-wide design foundations for incremental adoption across an organization. | `@pure-saas-system` | [`prompts/system.md`](prompts/system.md) |
| **`/pure-saas migrate [request]`** | Modernize legacy styling or tokens incrementally with zero backend or testing regressions. | `@pure-saas-migrate` | [`prompts/migrate.md`](prompts/migrate.md) |
| **`/pure-saas init`** | Scaffold starter `DESIGN.md` and `design-brief.md`. | `@pure-saas-init` | [`prompts/init.md`](prompts/init.md) |

---

## Universal Execution Behaviour

All Pure SaaS commands adhere to 10 strict operational principles:

1. **Read Canonical Skill:** Read `SKILL.md` and relevant reference documents in `references/`.
2. **Understand Context:** Parse current request and conversation history without repeating resolved questions.
3. **Inspect Architecture:** Inspect existing frameworks, styling systems, and immutable backend contracts.
4. **Select Only Relevant Workflows:** Run only the subcommands required for the task.
5. **Implement Directly:** Build the full working product rather than stopping at preliminary advice.
6. **Preserve Architecture & APIs:** Never overwrite backend endpoints, database schemas, authentication, or test IDs.
7. **Maintain `DESIGN.md`:** Establish and update the persistent design system before writing styles.
8. **Check & Refine:** Run token scanners, viewport checks, and linters; correct discovered defects.
9. **Report Honestly:** Produce an evidence-backed ledger of verified achievements, fixes, and untested areas.
10. **Never Fabricate Validation:** Never claim tests, DevTools inspections, or screen-reader checks that were not run.

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
To scaffold a starter design system in your project independently of agent skill installation:

```bash
npx pure-saas init
```

---

## Supported Agent Integrations

| Platform / Agent | Integration Type | Native Path / Mechanism | How to Operate |
| :--- | :--- | :--- | :--- |
| **Claude Code** | **Verified Native Skill** | `.claude/skills/pure-saas`, `commands/` | `/pure-saas [request]` or `/pure-saas <subcommand>` in chat. |
| **Cursor** | **Verified Native Rules** | `.cursor/rules/pure-saas*.mdc` | Type `@pure-saas` or `@pure-saas-<subcommand>` in Composer. |
| **OpenCode** | **Verified Native Skill** | `.agents/skills/pure-saas`, `.opencode/commands/` | Native slash commands (`/pure-saas`, `/pure-saas build`, etc.). |
| **Codex** | **Verified Native Plugin** | `.codex-plugin/plugin.json` | Plugin actions or portable prompts from `prompts/`. |
| **Gemini / Antigravity** | **Verified Native Skill** | `GEMINI.md` / `skills/pure-saas` | Context instructions or native skill invocation. |
| **Windsurf** | **Instruction-File Compatibility** | `.windsurfrules` | Rules file at project root or portable prompts from `prompts/`. |
| **Generic / Others** | **Instruction-File Compatibility** | `SYSTEM_PROMPT.md` | Add instructions to system prompt or paste from `prompts/`. |

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

# Run comprehensive quality audit & verification report
npx pure-saas audit --json

# Query curated design intelligence taxonomy
npx pure-saas style "developer tool dark mode"

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
npm test
```

---

## License & Attribution

Pure SaaS is open-source software licensed under the [MIT License](LICENSE). Third-party notices and attributions are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

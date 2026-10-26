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

**Pure SaaS** solves this at the agent level. It equips AI coding assistants with **one intelligent main command** and **five specialist commands** to design, build, polish, review, and optimize software products without generic templates or AI slop.

---

## The Intelligent Main Command: `/pure-saas [any request]`

The global command is the default entry point for almost everything:

```bash
# Creative product design & complete implementation
/pure-saas create a premium 3D landing page for my hospital

# Desktop & productivity apps
/pure-saas build a native-feeling macOS productivity app

# E-commerce with authentication & checkout
/pure-saas build a complete e-commerce application with authentication and checkout

# Targeted feature additions with animation
/pure-saas add a beautiful animated pricing section

# Visual elevation & craft
/pure-saas make this interface feel significantly more premium

# Bug diagnostics & direct fixes
/pure-saas fix the mobile navigation

# Accessibility remediation
/pure-saas make this page more accessible

# Security & code audit
/pure-saas find security issues and fix them

# Reusable component engineering
/pure-saas create a reusable button component
```

### Autonomous Capability Coordination
When given an arbitrary natural-language request, Pure SaaS automatically:
1. **Understands Intent & Project Context:** Inspects the repository, framework, build tools, styling conventions, and backend contracts.
2. **Integrates All Capabilities:** Automatically handles design, implementation, components, design tokens, animations/motion, accessibility, responsiveness, performance, security, and verification.
3. **Executes Proportionately:** For a straightforward request, executes it directly. For complex work, coordinates necessary steps automatically without forcing a rigid multi-stage sequence.
4. **Optimises for User Time:** Avoids redundant analysis, unnecessary planning documents, repeated confirmations, and excessive output. Does not ask questions when the answer can reasonably be inferred.
5. **Verifies & Refines:** Compares against quality standards, runs token validation, and concludes with an honest report.

---

## Five Specialist Commands

When you need a focused workflow, use one of the 5 specialist commands. Each inherits canonical instructions from `SKILL.md` and the project's persistent `DESIGN.md`:

| Command | Purpose | Cursor Command | Command Definition |
| :--- | :--- | :--- | :--- |
| **`/pure-saas design [request]`** | Establish or update the project's persistent design specification (`DESIGN.md`) before implementation. | `/pure-saas design` | [`commands/design.md`](commands/design.md) |
| **`/pure-saas polish [request]`** | Improve visual hierarchy, spacing, typography, surface lighting, micro-interactions, and custom SVGs without rebuilding working logic. | `/pure-saas polish` | [`commands/polish.md`](commands/polish.md) |
| **`/pure-saas review [request or scope]`** | Conduct a rigorous, evidence-based quality audit across concrete bugs, security weaknesses, accessibility problems, performance issues, and token drift. | `/pure-saas review` | [`commands/review.md`](commands/review.md) |
| **`/pure-saas reference [URL]`** | Reverse-engineer a visual reference via browser DevTools (DOM, computed styles, assets, typography, motion) and recreate requested design language. | `/pure-saas reference` | [`commands/reference.md`](commands/reference.md) |
| **`/pure-saas responsive [request]`** | Focus on responsive layouts across mobile, tablet, laptop, and desktop. Fix layout failures, horizontal overflow, touch targets, and navigation. | `/pure-saas responsive` | [`commands/responsive.md`](commands/responsive.md) |

---

## Universal Execution Behaviour

All Pure SaaS commands adhere to 10 strict operational principles:

1. **Read Canonical Skill:** Read `SKILL.md` and relevant reference documents in `references/`.
2. **Understand Context:** Parse current request and conversation history without asking questions that can reasonably be inferred.
3. **Inspect Architecture:** Inspect existing frameworks, styling systems, and immutable backend contracts.
4. **Select Only Relevant Workflows:** Coordinate only the capabilities required for the task.
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

| Platform / Agent | Integration Mechanism | Entry Point File | How to Operate |
| :--- | :--- | :--- | :--- |
| **Claude Code** | **Native Skill & Commands** | `SKILL.md`, `commands/` | `/pure-saas [request]` or specialist commands (`/pure-saas design`, etc.). |
| **Cursor** | **Root Rules Architecture** | `.cursorrules`, `SKILL.md` | `/pure-saas` or specialist commands in Chat / Composer. |
| **Gemini / Antigravity** | **Root Skill Entry Point** | `GEMINI.md`, `SKILL.md` | Context instructions or native `/pure-saas` invocation. |
| **OpenCode** | **Native Commands** | `SKILL.md`, `commands/` | Native slash commands (`/pure-saas`, `/pure-saas polish`, etc.). |
| **Windsurf** | **Root Rules Compatibility** | `.cursorrules`, `SKILL.md` | Rules file at project root or slash commands. |
| **Codex / Generic** | **Skill System Prompt** | `SKILL.md`, `commands/` | Load `SKILL.md` into workspace or invoke commands directly. |

---

## Deterministic CLI Reference

The Pure SaaS CLI is zero-dependency and runs with Node.js >= 18:

```bash
# Search reference library (Apple HIG, 22 frameworks, craft guidelines)
npx pure-saas ref "modal"
npx pure-saas ref "button"
npx pure-saas ref "react"

# Query multi-domain design intelligence (colors, UX heuristics, landing patterns, charts, typography, motion)
npx pure-saas query color "fintech"
npx pure-saas query ux "scroll"
npx pure-saas query landing "saas hero"
npx pure-saas style "developer tool dark mode"

# Generate complete DESIGN.md based on product archetype and design dials
npx pure-saas design-system --product fintech --variance 8 --motion 9 --density 8 --out DESIGN.md

# Validate DESIGN.md structure, required tokens, and open unresolved questions
npx pure-saas validate [path/to/DESIGN.md]

# Audit color contrast against WCAG 2.2 AA (4.5:1 text, 3.0:1 UI) and AAA (7.0:1)
npx pure-saas contrast [path/to/DESIGN.md]

# Diff design tokens across revisions or commits
npx pure-saas diff DESIGN.before.md DESIGN.md

# Detect design drift between expected tokens and live measured observations
npx pure-saas drift DESIGN.md observations.json

# Scan source code for raw styling violations with known technical debt baseline
npx pure-saas check DESIGN.md --source src --known known-defects.json

# Export tokens to CSS Custom Properties, Tailwind v3/v4, DTCG 2025.10, or JSON
npx pure-saas export-tokens DESIGN.md --format css --out styles/tokens.css
npx pure-saas export-tokens DESIGN.md --format tailwind-v4 --out styles/theme.css
npx pure-saas export-tokens DESIGN.md --format tailwind --out tailwind.tokens.js
npx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json

# Run comprehensive quality audit & verification report
npx pure-saas review-report --json

# Initialize starter specifications in current repository
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

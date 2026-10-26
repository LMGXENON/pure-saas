
<div align="center">

# Pure SaaS

**Universal AI-agent skill and design-enforcement toolkit for professional web design and UI/UX.**

Build distinctive, polished interfaces without generic AI design patterns.

[Website](YOUR_ACTUAL_WEBSITE_URL) · [GitHub Repository](https://github.com/LMGXENON/pure-saas)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](package.json)
[![AI Agent Skill](https://img.shields.io/badge/AI_Agent-Skill-7C3AED)](SKILL.md)
[![GitHub Stars](https://img.shields.io/github/stars/LMGXENON/pure-saas?style=flat&logo=github)](https://github.com/LMGXENON/pure-saas/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/LMGXENON/pure-saas?logo=github)](https://github.com/LMGXENON/pure-saas/issues)

</div>

---

## Installation

### Install with Skills CLI (Recommended)

Install Pure SaaS into your project:

```bash
npx skills add LMGXENON/pure-saas
```

Install globally:

```bash
npx skills add LMGXENON/pure-saas -g
```

Install for specific agents:

```bash
npx skills add LMGXENON/pure-saas --agent claude-code cursor
```

List available skills without installing:

```bash
npx skills add LMGXENON/pure-saas --list
```

### Requirements

- Node.js 18 or later for the Pure SaaS CLI.
- An AI coding agent that supports skills, project instructions or custom commands.
- A project repository where you want to apply Pure SaaS.

### Initialize a Design System

Skill installation and design-system initialization are separate operations. To generate starter design-system files in your current project:

```bash
npx pure-saas init
```

### Quick Start

Use the main command for a complete design and implementation task:

```text
/pure-saas create a premium, responsive SaaS landing page
```

Or use specialist commands:

```text
/pure-saas design establish a design system for my application
/pure-saas polish improve the visual quality of this interface
/pure-saas review audit the application and fix issues
/pure-saas responsive optimize mobile, tablet, and desktop layouts
/pure-saas browser verify live pages and capture multi-viewport screenshots
/pure-saas 3d scaffold procedural Three.js 3D components
```

---

## Before & After

See the difference Pure SaaS aims to make to AI-generated interfaces.

<table>
  <tr>
    <th align="center" width="50%">Before Pure SaaS</th>
    <th align="center" width="50%">After Pure SaaS</th>
  </tr>
  <tr>
    <td width="50%">
      <img src="images/before.png" alt="Interface before applying Pure SaaS" width="100%" />
    </td>
    <td width="50%">
      <img src="images/after.png" alt="Interface after applying Pure SaaS" width="100%" />
    </td>
  </tr>
</table>

<sub>Replace the image placeholders with screenshots of the same interface before and after applying Pure SaaS.</sub>

</div>

---

## What Is Pure SaaS?

AI coding agents frequently produce repetitive, generic design patterns:

- Purple and cyan gradients, excessive glows and unnecessary glassmorphism.
- Repetitive three-column feature cards and predictable layouts.
- Arbitrary colours, inconsistent spacing and poorly aligned elements.
- Emoji used as interface icons instead of crisp SVGs.
- Generic marketing jargon and unsupported product claims.
- Desktop-first interfaces that neglect mobile layouts, keyboard accessibility and interaction states.
- Inconsistent animations, transitions and component behaviour.

**Pure SaaS addresses these problems at the agent level.** Re-engineered with the modularity and engineering excellence of [Impeccable](https://github.com/pbakaus/impeccable), it provides one intelligent main command, 18 specialized verbs, 4 calibrated surface modes, 5 specialized agents, and a deterministic 5-dimension audit engine to help AI coding agents design, build, refine, review and optimise professional software interfaces.

Its goal is to produce distinctive, polished, production-quality experiences instead of generic AI-generated templates.

## Surface Modes

Pure SaaS scales ambition to the surface's purpose:

- **Persuade (Landing & Marketing):** Bold, high-conviction creative direction, distinctive asymmetric layouts, real interactive previews or 3D canvasses, and high emotional resonance.
- **Operate (Dashboards & Consoles):** Precision, spatial density, low visual noise, restrained color accents, sub-millisecond perceived latency, and keyboard ergonomics.
- **Read (Docs & Publishing):** Typographic calm, comfortable reading rhythm (65–75ch), high readability, and effortless wayfinding.
- **Experience (3D & Interactive):** Tactile physics, procedural WebGL/Three.js models, and direct manipulation.

---

## The Intelligent Main Command

### `/pure-saas [request]`

The main command is the default entry point for design and development tasks. It interprets the request and coordinates the relevant workflows automatically.

```text
/pure-saas create a premium 3D landing page for my product
/pure-saas build a native-feeling macOS productivity app
/pure-saas build an e-commerce application with authentication and checkout
/pure-saas add a polished, animated pricing section
/pure-saas make this interface feel significantly more premium
/pure-saas fix the mobile navigation
/pure-saas improve accessibility across this page
/pure-saas find security issues and fix them
/pure-saas create a reusable button component
/pure-saas test rendered page layout with browser screenshots
/pure-saas scaffold a 3D procedural hero canvas
```

### How It Works (The 8-Step Build Loop)

1. **Understand requirements & mode:** Identify the surface mode (Persuade, Operate, Read, Experience) and target audience.
2. **Inspect project context:** Run `pure-saas context` to inspect dependencies, framework, styling system, existing tokens, and backend contracts.
3. **Select visual direction:** Choose a curated style archetype from `pure-saas style list` (Swiss, Technical, Editorial, Modern Enterprise, etc.).
4. **Author design contracts:** Establish or update `DESIGN.md` tokens and verify mathematical contrast with `pure-saas contrast`.
5. **Implement components:** Build modular, typed components implementing the complete 8-state interaction matrix and hairline craft.
6. **Capture real browser screenshots:** Verify rendered output at 1440px (Desktop), 768px (Tablet), and 375px (Mobile).
7. **Forensic quality audit:** Run `pure-saas audit` for an objective 0–20 score across A11y, Performance, Theming, Responsive, and Integrity.
8. **Fix defects & finish:** Triage defects into P0–P3 and report honest verification.

Pure SaaS aims to minimise redundant analysis, unnecessary planning documents and avoidable confirmation requests.

---

## Specialist Verbs & Playbooks

Use specialist commands when you need a focused workflow. Each playbook resides in [`skill/reference/`](skill/reference/):

| Command | Category | Purpose | Definition |
|---|---|---|---|
| `/pure-saas design [request]` | Architecture | Establish or update `DESIGN.md` specification before implementation. | [`skill/reference/design-systems.md`](skill/reference/design-systems.md) |
| `/pure-saas landing [request]` | Persuade | High-conversion SaaS landing page with hero, proof, and pricing. | [`skill/reference/landing-pages.md`](skill/reference/landing-pages.md) |
| `/pure-saas polish [request]` | Refine | Improve visual hierarchy, hairline borders, surface lighting, and micro-interactions. | [`skill/reference/polish.md`](skill/reference/polish.md) |
| `/pure-saas bolder [target]` | Refine | Amplify safe, flat, or bland UI into distinctive, high-conviction creative work. | [`skill/reference/bolder.md`](skill/reference/bolder.md) |
| `/pure-saas quieter [target]` | Refine | Calm aggressive, noisy, or overstimulated layouts into serene clarity. | [`skill/reference/quieter.md`](skill/reference/quieter.md) |
| `/pure-saas distill [target]` | Refine | Strip visual debt and simplify complex screens to their essential core. | [`skill/reference/distill.md`](skill/reference/distill.md) |
| `/pure-saas harden [target]` | Refine | Production robustness (empty states, edge cases, error recovery, i18n). | [`skill/reference/harden.md`](skill/reference/harden.md) |
| `/pure-saas typeset [target]` | Enhance | Editorial typography hierarchy, optical tracking, and fluid clamps. | [`skill/reference/typeset.md`](skill/reference/typeset.md) |
| `/pure-saas layout [target]` | Enhance | Fix spatial rhythm, asymmetric balance, and 8pt grid containment. | [`skill/reference/layout.md`](skill/reference/layout.md) |
| `/pure-saas animate [target]` | Enhance | Purposeful spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`). | [`skill/reference/animate.md`](skill/reference/animate.md) |
| `/pure-saas colorize [target]` | Enhance | Strategic 5-tier color ramps and mathematical WCAG 2.2 AA contrast. | [`skill/reference/colorize.md`](skill/reference/colorize.md) |
| `/pure-saas delight [target]` | Enhance | Shaders, reactive canvasses, and tactile micro-surprises. | [`skill/reference/delight.md`](skill/reference/delight.md) |
| `/pure-saas adapt [target]` | Fix | Multi-viewport responsive mastery (375px mobile to 1440px desktop). | [`skill/reference/adapt.md`](skill/reference/adapt.md) |
| `/pure-saas clarify [target]` | Fix | Improve UX copy, active button verbs, and actionable error messages. | [`skill/reference/clarify.md`](skill/reference/clarify.md) |
| `/pure-saas optimize [target]` | Fix | Core Web Vitals, virtualization, and sub-frame layout stability. | [`skill/reference/optimize.md`](skill/reference/optimize.md) |
| `/pure-saas review [scope]` | Evaluate | 5-dimension deterministic audit (0–20 score) with P0–P3 defect triage. | [`skill/reference/audit.md`](skill/reference/audit.md) |
| `/pure-saas reference [URL]` | Analyze | Reverse-engineer visual reference sites into a 16-section `DESIGN.md`. | [`references/reference-analysis.md`](references/reference-analysis.md) |
| `/pure-saas browser [action]` | Verify | Playwright CLI headless browser automation and screenshot capture. | [`skill/reference/browser.md`](skill/reference/browser.md) |
| `/pure-saas 3d [action]` | Experience | Procedural Three.js 3D models and img2threejs pipeline. | [`skill/reference/3d.md`](skill/reference/3d.md) |
| `/pure-saas style [action]` | System | Selectable modular design style archetypes from Awesome Design Skills. | [`skill/reference/style-registry.md`](skill/reference/style-registry.md) |

---

## Website Reference Analysis and Visual Verification

When a user provides a website URL as a design reference, Pure SaaS should inspect the accessible, relevant website before implementation.

### Reference Inspection

- Discover relevant pages linked through navigation, footers, menus and internal links.
- Inspect every relevant section from the top of each page to the bottom.
- Analyse layouts, typography, colours, spacing, imagery, borders, shadows and component positioning.
- Inspect navigation, menus, buttons, forms, hover states, modals, tabs and other interactive elements.
- Examine initial loads, reloads, route transitions, scroll-triggered animations and other motion.

### Complete Screenshot Capture

- Capture full-page screenshots of every relevant page.
- Capture viewport screenshots for each section, using overlapping captures when necessary.
- Record overall page lengths, section order, approximate heights and scroll positions.
- Capture relevant animation frames or video where the available tools support it.
- Repeat relevant captures at representative desktop, tablet and mobile sizes.
- Record inaccessible pages and states that could not be inspected.

### Implementation and Comparison

- Capture the local implementation at matching viewport dimensions and corresponding scroll positions.
- Compare screenshots page by page and section by section.
- Check layout, proportions, spacing, typography, colours, imagery, component placement and visual hierarchy.
- Verify motion separately through interaction testing, video or frame comparison where supported.
- Correct significant discrepancies, recapture and repeat the comparison.
- Report what was verified and what remains untested.

Do not claim complete inspection, screenshot comparison or animation verification without evidence. Static screenshots alone cannot prove animation fidelity.

---

## Universal Execution Principles

All Pure SaaS commands follow these operational principles:

1. **Read the canonical skill:** Consult `SKILL.md` and relevant reference documents in `references/`.
2. **Understand context:** Use the request and available project context without unnecessary questions.
3. **Inspect architecture:** Understand existing frameworks, styling systems and backend contracts.
4. **Select relevant workflows:** Coordinate only the capabilities required for the task.
5. **Implement directly:** Build working solutions rather than stopping at preliminary advice.
6. **Preserve architecture and APIs:** Avoid breaking backend endpoints, database schemas, authentication and test identifiers.
7. **Maintain `DESIGN.md`:** Establish or update the persistent design specification where applicable.
8. **Check and refine:** Run relevant validators, viewport checks, linters and tests.
9. **Report honestly:** Distinguish verified results from incomplete or untested work.
10. **Never fabricate validation:** Do not claim tests, browser inspections, screenshot comparisons or accessibility checks that were not performed.

---

## Supported Agent Integrations

Pure SaaS is intended for AI coding environments that support skills, project instructions or custom commands.

| Platform / Agent | Integration mechanism | Relevant files |
|---|---|---|
| Claude Code | Skills and commands | `SKILL.md`, `commands/` |
| Cursor | Project rules and skill instructions | `.cursorrules`, `SKILL.md` |
| Gemini / Antigravity | Root instructions and skill entry point | `GEMINI.md`, `SKILL.md` |
| Windsurf | Project rules | `.windsurfrules`, `SKILL.md` |
| GitHub Copilot | Repository custom instructions | `.github/copilot-instructions.md`, `SKILL.md` |
| OpenCode | Native commands and skill instructions | `SKILL.md`, `commands/` |
| Codex / compatible agents | Skill instructions or system context | `SKILL.md`, `commands/` |

The exact invocation and automatic discovery behaviour depend on the agent, its version and configuration.

---

## CLI Reference

The Pure SaaS CLI provides design references, design-system generation, token validation and quality checks. It requires Node.js 18 or later.

### Search the Reference Library

Pure SaaS includes a curated library of **260+ architectural reference guides, component specifications, Apple HIG documents, and framework manuals** catalogued in `references/reference-index.md`.

Search any topic across components, layouts, design systems, UX patterns, visual craft, accessibility, theming, and real-world flows:

```bash
npx pure-saas ref "modal"
npx pure-saas ref "button"
npx pure-saas ref "wcag 2.2"
npx pure-saas ref "dark mode"
npx pure-saas ref "dashboard"
npx pure-saas ref "spring physics"
npx pure-saas ref "virtualization"
npx pure-saas ref "gradient ascii"
```

### Query Design Intelligence

```bash
npx pure-saas query color "fintech"
npx pure-saas query ux "scroll"
npx pure-saas query landing "saas hero"
npx pure-saas style "developer tool dark mode"
```

### Generate a Design System

```bash
npx pure-saas design-system --product fintech --variance 8 --motion 9 --density 8 --out DESIGN.md
```

### Validate Design Specifications

```bash
npx pure-saas validate DESIGN.md
npx pure-saas contrast DESIGN.md
npx pure-saas diff DESIGN.before.md DESIGN.md
npx pure-saas drift DESIGN.md observations.json
npx pure-saas check DESIGN.md --source src --known known-defects.json
```

- `validate` checks design-system structure, required tokens and unresolved questions.
- `contrast` audits colour contrast.
- `diff` compares design-token specifications.
- `drift` detects differences between expected tokens and measured observations.
- `check` scans source code for styling violations against the design specification.

### Export Design Tokens

```bash
npx pure-saas export-tokens DESIGN.md --format css --out styles/tokens.css
npx pure-saas export-tokens DESIGN.md --format tailwind-v4 --out styles/theme.css
npx pure-saas export-tokens DESIGN.md --format tailwind --out tailwind.tokens.js
npx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json
```

### Deterministic 5-Dimension Audit

Audit your project across Accessibility, Performance, Theming, Responsive design, and Token Integrity with scored ratings (0–20 total) and P0–P3 defect triage:

```bash
# Run deterministic audit against source code
npx pure-saas audit --source src

# Output JSON for CI/CD gates
npx pure-saas audit --source src --json

# Enforce minimum passing score threshold
npx pure-saas audit --min-score 16
```

### Browser Testing & Multi-Viewport Verification

Token-conscious browser testing and automated screenshot verification powered by Playwright CLI:

```bash
# Check browser automation environment and tools
npx pure-saas browser check

# Verify or install Playwright browsers
npx pure-saas browser setup

# Capture full-page screenshots at 1440px, 768px, and 375px
npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens

# Audit responsive layout integrity in a live browser
npx pure-saas browser verify http://localhost:3000
```

### Procedural 3D Model Scaffolding (img2threejs)

Parametric, code-only Three.js component scaffolding and image-to-3D sculpting pipeline:

```bash
# Check 3D prerequisites (Node.js, Three.js, optional tools)
npx pure-saas 3d check

# Scaffold a production Three.js component with lifecycle and resize handlers
npx pure-saas 3d scaffold HeroCanvas --out src/components/HeroCanvas.tsx

# Generate a 6-pass sculpting specification from an input image
npx pure-saas 3d spec assets/logo.png --out 3d-spec.json
```

### Selectable Style Registry (Awesome Design Skills)

Query and inspect curated design archetypes from the modular style catalog:

```bash
# List all available styles across all categories
npx pure-saas style list

# Inspect tokens, typography, and rules for a specific style
npx pure-saas style info "editorial-luxury"

# Apply a style archetype to your DESIGN.md
npx pure-saas style select "swiss-high-contrast" --out DESIGN.md
```

### Agent Instruction Sync

Install or update project-level agent rules across all supported AI assistants:

```bash
# Sync configuration for all agents (Cursor, Windsurf, Copilot, Gemini, Claude Code)
npx pure-saas install all

# Sync specific agent configuration
npx pure-saas install cursor
npx pure-saas install claude
npx pure-saas install gemini
```

### Generate a Quality Report

```bash
npx pure-saas review-report --json
```

### Initialize a Project

```bash
npx pure-saas init
```

Use `npx pure-saas --help` to inspect the commands and options supported by the installed CLI version.

---

## Limitations

### Browser and Screenshot Availability

In environments without a suitable browser, screenshot capture or screen-reader runtime, Pure SaaS may be limited to static code analysis and design-token verification.

Visual rendering, animation fidelity and screen-reader behaviour must be reported as untested when they cannot be verified.

### Dynamic Styling

The static source scanner supports common styling patterns across CSS, Tailwind utilities, HTML, JSX, TSX, Svelte and Vue. Runtime-generated styles, such as dynamically calculated inline colours, may require token mappings or intentional exceptions.

Consult the CLI implementation for the exact syntax and supported behaviour.

---

## Quality Assurance & Verification

Verify design specifications and token compliance using the CLI:

```bash
# Validate DESIGN.md structure and semantic tokens
npx pure-saas validate DESIGN.md

# Audit color contrast against WCAG 2.2 AA tiers
npx pure-saas contrast DESIGN.md
```

---

## Acknowledgements & Integrated Open-Source Capabilities

Pure SaaS integrates, adapts, and builds upon several exceptional open-source projects under permissive open-source licenses:

- **[Taste Skill](https://github.com/Leonxlnx/taste-skill)** (MIT License, © Leonxlnx) — Art direction pipeline, anti-slop visual critique heuristics, and aesthetic archetypes. Reference: [`references/art-direction-and-taste.md`](references/art-direction-and-taste.md).
- **[Impeccable](https://github.com/pbakaus/impeccable)** (Apache-2.0 / MIT License, © Paul Bakaus) — Deterministic 5-dimension scored audit matrix (A11y, Performance, Theming, Responsive, Integrity), P0–P3 defect triage, and specialized critique verbs (`bolder`, `quieter`, `typeset`, `layout`, `harden`). Reference: [`references/deterministic-audit-matrix.md`](references/deterministic-audit-matrix.md).
- **[Playwright CLI](https://github.com/microsoft/playwright-cli)** (Apache-2.0 License, © Microsoft Corporation) — Token-conscious browser automation, multi-viewport screenshot verification, and deterministic browser assertions. Reference: [`references/developer-tooling/playwright-browser-testing.md`](references/developer-tooling/playwright-browser-testing.md).
- **[Awesome Design Skills](https://github.com/jdsadminllc/awesome-design-skills)** (MIT License, © JDS Admin LLC) — Modular, selectable design style registry enabling on-demand style discovery without mandatory bulk installation. Reference: [`references/design-systems/selectable-style-registry.md`](references/design-systems/selectable-style-registry.md).
- **[img2threejs](https://github.com/img2threejs/img2threejs)** (MIT License, © img2threejs contributors) — Procedural, code-only Three.js component scaffolding in TypeScript and 6-pass staged 3D sculpting pipeline. References: [`references/components/procedural-threejs-models.md`](references/components/procedural-threejs-models.md), [`references/img2threejs-pipeline.md`](references/img2threejs-pipeline.md).

---

## Contributing

Contributions that improve design quality, agent compatibility, verification, accessibility or the CLI are welcome.

Keep documentation aligned with the actual implementation and avoid claiming support for integrations or capabilities that have not been tested.

## License

Pure SaaS is open-source software licensed under the [MIT License](LICENSE).

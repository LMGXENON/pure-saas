
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

**Pure SaaS addresses these problems at the agent level.** It provides one intelligent main command and five specialist commands to help AI coding agents design, build, refine, review and optimise professional software interfaces.

Its goal is to produce distinctive, polished, production-quality experiences instead of generic AI-generated templates.

## The Intelligent Main Command

### `/pure-saas [request]`

The main command is the default entry point for design and development tasks. It interprets the request and coordinates the relevant workflows automatically.

```text
/pure-saas create a premium 3D landing page for my hospital
/pure-saas build a native-feeling macOS productivity app
/pure-saas build an e-commerce application with authentication and checkout
/pure-saas add a polished, animated pricing section
/pure-saas make this interface feel significantly more premium
/pure-saas fix the mobile navigation
/pure-saas improve accessibility across this page
/pure-saas find security issues and fix them
/pure-saas create a reusable button component
```

### How It Works

1. **Understand the project:** Inspect the repository, framework, build tools, styling conventions and relevant backend contracts.
2. **Coordinate capabilities:** Handle design, implementation, components, design tokens, motion, accessibility, responsiveness, performance and security as needed.
3. **Execute proportionately:** Complete straightforward tasks directly and coordinate complex work without unnecessary stages.
4. **Preserve functionality:** Respect existing architecture, APIs, database schemas, authentication and test identifiers.
5. **Verify and refine:** Run relevant checks, inspect rendered output when possible, correct issues and report what was actually verified.

Pure SaaS aims to minimise redundant analysis, unnecessary planning documents and avoidable confirmation requests.

---

## Specialist Commands

Use one of the five specialist commands when you need a focused workflow. Each inherits the canonical instructions from `SKILL.md` and should follow the project's persistent `DESIGN.md` where applicable.

| Command | Purpose | Definition |
|---|---|---|
| `/pure-saas design [request]` | Establish or update the project's persistent design specification before implementation. | [`commands/design.md`](commands/design.md) |
| `/pure-saas polish [request]` | Improve visual hierarchy, spacing, typography, surfaces, micro-interactions and SVGs without unnecessarily rebuilding working logic. | [`commands/polish.md`](commands/polish.md) |
| `/pure-saas review [scope]` | Audit bugs, security weaknesses, accessibility, performance and design-token consistency. | [`commands/review.md`](commands/review.md) |
| `/pure-saas reference [URL]` | Analyse a website reference and recreate its relevant design language and behaviour. | [`commands/reference.md`](commands/reference.md) |
| `/pure-saas responsive [request]` | Improve mobile, tablet, laptop and desktop layouts, including overflow, touch targets and navigation. | [`commands/responsive.md`](commands/responsive.md) |

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

## Contributing

Contributions that improve design quality, agent compatibility, verification, accessibility or the CLI are welcome.

Keep documentation aligned with the actual implementation and avoid claiming support for integrations or capabilities that have not been tested.

## License

Pure SaaS is open-source software licensed under the [MIT License](LICENSE).

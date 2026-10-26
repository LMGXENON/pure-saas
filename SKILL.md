---
name: pure-saas
description: Universal AI-agent skill and design enforcement toolkit for professional web design and UI/UX without generic AI patterns. Install via `npx skills add LMGXENON/pure-saas`.
license: MIT
compatibility: "Requires Node.js >= 18.0.0. Compatible with Claude Code, Cursor, Gemini, Antigravity, Windsurf, OpenCode, and GitHub Copilot."
metadata:
  version: "1.0.0"
  author: "Pure SaaS Contributors"
triggers:
  - "/pure-saas"
  - "/pure-saas design"
  - "/pure-saas polish"
  - "/pure-saas review"
  - "/pure-saas reference"
  - "/pure-saas responsive"
  - "@pure-saas"
  - "create a website"
  - "design a website"
  - "build a landing page"
  - "build a web app"
  - "build a mobile app"
  - "build a dashboard"
  - "redesign"
  - "ui/ux"
  - "frontend design"
  - "make this interface feel significantly more premium"
  - "polish UI"
  - "review UI"
  - "responsive layout"
  - "accessibility review"
---

# Pure SaaS: Universal Agent Design & Implementation Skill

You are an expert product designer, art director, and senior frontend engineer following the **Pure SaaS** design standard.

Pure SaaS is a universal UI/UX design and implementation skill operating via **one intelligent main command** (`/pure-saas`) and **five specialist commands** (`design`, `polish`, `review`, `reference`, `responsive`). It works across websites, web applications, dashboards, mobile apps, desktop apps, e-commerce, portfolios, design systems, individual components, and other supported software projects.

---

## 1. Global Command: `/pure-saas [any request]`

The universal entry point and intelligent default for almost everything.

### Natural-Language Examples:
- `/pure-saas create a premium 3D landing page for my hospital`
- `/pure-saas build a native-feeling macOS productivity app`
- `/pure-saas build a complete e-commerce application with authentication and checkout`
- `/pure-saas redesign my existing checkout experience`
- `/pure-saas make this interface feel significantly more premium`
- `/pure-saas add a beautiful animated pricing section`
- `/pure-saas fix the mobile navigation`
- `/pure-saas make this page more accessible`
- `/pure-saas create a reusable button component`
- `/pure-saas find security issues and fix them`
- `/pure-saas recreate this reference's visual style`

### Autonomous Capability Coordination:
When invoked with an arbitrary natural-language request, `/pure-saas` automatically:
1. **Understands Intent & Context:** Inspects the existing repository, project files, framework, build tools, styling conventions, and backend contracts.
2. **Coordinates Capabilities Autonomously:** Automatically integrates design, implementation, components, design tokens, animations/motion, accessibility, responsiveness, performance, security, and testing as relevant.
3. **Executes Proportionately:** Does not force a rigid `design → build → polish → review` sequence for every small request. For a straightforward request, executes it directly. For complex work, coordinates necessary steps automatically.
4. **Optimises for User Time:** Avoids redundant analysis, unnecessary planning documents, repeated confirmations, duplicate checks, and excessive output. Reuses project knowledge and previous findings. Does not ask questions when the answer can reasonably be inferred.
5. **Verifies & Refines:** Checks results across viewports, runs token scanners and tests, corrects discovered problems, and concludes with an evidence-backed report.

---

## 2. Five Specialist Commands

Every specialist command inherits this canonical `SKILL.md`, relevant reference guides, conversation context, project instructions, and `DESIGN.md` where applicable:

| Command | Purpose | Key Actions |
| :--- | :--- | :--- |
| **`/pure-saas design [request]`** | **Design direction & system definition** | For substantial design work, create or update a root-level `DESIGN.md` before implementation. Specify page/section structure, layout, spacing, typography, colours, tokens, components, assets, interactions, motion, responsive behaviour, and accessibility. Ground decisions in actual project needs. Distinguish observed facts, inferences, and unknowns. |
| **`/pure-saas polish [request]`** | **Visual & tactile craft elevation** | Improve the quality of an existing implementation without unnecessarily rebuilding it. Inspect the actual result and refine visual hierarchy, spacing, typography, alignment, component consistency, micro-interactions, animation, accessibility, and responsive details. Preserve working functionality. |
| **`/pure-saas review [request or scope]`** | **Evidence-based quality audit** | Conduct a rigorous, evidence-based review. Identify concrete bugs, security weaknesses, accessibility problems, performance issues, visual inconsistencies, and missing requirements. Prioritise findings by severity and provide file references/evidence. Do not modify files by default. |
| **`/pure-saas reference [URL]`** | **Reverse-engineer visual reference** | Deep inspection via browser DevTools (rendered pages, DOM, computed styles, assets, typography, spacing, responsive layouts, motion, network resources). Translate relevant findings into requested implementation without necessarily copying the entire site. Report inspection limitations honestly. |
| **`/pure-saas responsive [request]`** | **Cross-device layout optimization** | Focus on responsive layouts across mobile, tablet, laptop, and desktop. Inspect existing implementation, identify actual layout failures, and fix breakpoints, overflow, navigation, typography, spacing, grids, images, touch targets, and component behaviour. Preserve desktop design and functionality. |

---

## 3. Universal Execution Behaviour

All commands must follow these 10 mandatory operational rules:

1. **Read Canonical Skill:** Read `SKILL.md` and relevant reference documents in `references/`.
2. **Understand Context:** Parse the current user request and relevant conversation history without asking questions that can reasonably be inferred.
3. **Inspect Existing Architecture:** Inspect existing project instructions, files, frameworks, build tools, and backend contracts.
4. **Select Only Relevant Workflows:** Coordinate only the capabilities required for the task.
5. **Implement Directly:** When implementation is requested, implement the complete working product rather than stopping at a plan or snippet.
6. **Preserve Architecture & APIs:** Never overwrite backend endpoints, database schemas, authentication, or automated test IDs without explicit user authorization.
7. **Maintain `DESIGN.md`:** Create or update root-level `DESIGN.md` when establishing or revising visual standards.
8. **Check & Refine:** Run relevant validators, linters, and viewport checks; refine visual and interaction defects.
9. **Report Honestly:** Produce an evidence-backed ledger documenting verified achievements, failed checks, and untested areas.
10. **Never Fabricate Validation:** Never claim tests, browser DevTools inspections, or screen-reader verifications that were not performed.

---

## 4. Reference Routing Architecture & The "Read Before You Cite" Rule

Pure SaaS separates high-level agent instructions from deep architectural craft guides.
Always keep core instructions focused; route specific questions to the relevant reference guide in `references/`.

### The Reference Search & Intelligence Engine
Before performing design or implementation work, retrieve exact reference documents and design intelligence for the topic:
```bash
# Search reference documents (Apple HIG, Frameworks, Craft Guides)
npx pure-saas ref "<component, framework, platform, or topic>"

# Query multi-domain design intelligence (styles, products, colors, typography, UX heuristics, landing, charts, motion)
npx pure-saas query [domain] "<keyword or query>"
npx pure-saas style "<query>" --product "<type>" --stack "<stack>"

# Programmatically generate an approved DESIGN.md tailored to product archetype and design dials
npx pure-saas design-system --product "<type>" --variance <1-10> --motion <1-10> --density <1-10> --out DESIGN.md
```
Examples:
- `npx pure-saas ref "modal"` -> retrieves `references/hig/modality.md`, `references/hig/sheets.md`
- `npx pure-saas ref "button"` -> retrieves `references/hig/buttons.md`, `references/frameworks/html-tailwind.md`
- `npx pure-saas ref "react"` -> retrieves `references/frameworks/react.md`, `references/cross-platform.md`
- `npx pure-saas ref "accessibility"` -> retrieves `references/accessibility.md`, `references/hig/accessibility.md`
- `npx pure-saas query color "fintech"` -> retrieves verified financial color palettes
- `npx pure-saas query ux "smooth scroll"` -> retrieves UX heuristic with Do/Don't and good/bad code examples
- `npx pure-saas query landing "b2b saas"` -> retrieves conversion-optimized section order and CTA placement

### Reference Collections
1. **Apple Human Interface Guidelines (`references/hig/` — 124 Documents):**
   Full individual reference documents covering 57 UI components, interaction patterns (modality, sheets, notifications, widgets, Apple Pay), foundations (color, typography, layout, materials), inputs, and platform conventions (`designing-for-ios.md`, `designing-for-macos.md`, `liquid-glass.md`).
2. **Framework Engineering Guides (`references/frameworks/` — 22 Frameworks):**
   Actionable guidelines with Do/Don't patterns, severity ratings, and code examples for React, Next.js, Vue, Nuxt, Svelte, Tailwind, Shadcn, SwiftUI, React Native, Flutter, Electron, Angular, Astro, and more.
3. **Curated Design Intelligence (`references/design-intelligence.json` & `design-styles-catalog.json`):**
   88 visual styles, 192 product archetypes, 192 semantic color systems, 74 typography pairings, 34 landing page patterns, 119 UX heuristics, 25 chart guides, 17 motion patterns, and 32 app UI patterns.
4. **Core Craft Guides (`references/*.md`):**
   `design-principles.md`, `typography.md`, `color-and-tokens.md`, `layout-and-composition.md`, `anti-slop-rules.md`, `interaction-states.md`, `accessibility.md`, `responsive-design.md`, `cross-platform.md`, `code-audit.md`, `motion.md`, `platform-guidelines.md`, `design-review.md`.
5. **Interactive Backgrounds & Shaders (`references/backgrounds/` — 15 Components & `backgrounds.md`):**
   Full source code, CSS, props, WebGL/canvas shaders, and integration recipes from React Bits (`gradient-ascii.md`, `pattern-waves.md`, `prism.md`, `aurora.md`, `liquid-chrome.md`, `iridescence.md`, `plasma.md`, `particles.md`, `hyperspeed.md`, `dither.md`, `dot-grid.md`, `ballpit.md`, `waves.md`, `threads.md`, `topography.md`).

### The "Read Before You Cite" Rule
- **Read before making claims:** Never invent guideline numbers, token values, or measurements from memory. Open the matching reference file in `references/` and cite both file and heading.
- **Actionable Findings Format:** Every review finding must include:
  1. **Finding:** The concrete defect.
  2. **Evidence:** Exact file and line (`path/file.tsx:42`), plus code snippet or measured value.
  3. **Impact:** Severity (**Critical**, **Warning**, or **Info**) and user impact.
  4. **Fix:** Framework-appropriate replacement code.

---

## 5. Shared Quality Standards

Pure SaaS enforces high-craft engineering across all project types:

### Visual Identity & Layout
- **Anti-Slop Enforcement & Discipline:** Reject arbitrary purple/cyan gradient meshes, excessive glassmorphism blur, repetitive 3-column card grids, emoji as interface icons, and vague marketing clichés.
- **Content-Driven Composition:** Pair headlines with tangible proof (interactive code terminals, live data tables, asymmetrical splits).
- **Surface Elevation:** Establish coherent depth using layered surfaces (`color-bg-canvas`, `color-bg-surface`, `color-bg-surface-elevated`) with subtle hairline borders (`1px solid var(--color-border-subtle)`).

### Typography Hierarchy
- **Personality & Ratios:** Match typeface personality to domain (e.g. Geist for Technical, Newsreader for Editorial, Inter for Swiss Modern).
- **Proportional Line-Height:** Tight line-height on large headings (`1.05`–`1.15`), comfortable line-height on body text (`1.5`–`1.65`).
- **Measure Control:** Restrict body copy line-length to 45–75 characters (`max-width: 65ch`).
- **Tabular Numerals:** Use `font-variant-numeric: tabular-nums` for timers, financial metrics, and telemetry data.

### Interaction State Matrix (The 8 States)
Every interactive element must explicitly account for:
1. `default`
2. `hover`
3. `focus-visible` (high-contrast focus ring with offset)
4. `active` / `pressed`
5. `disabled`
6. `loading` / `pending`
7. `empty`
8. `error` / `success`

### Accessibility (WCAG 2.2 AA)
- Contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text and UI components.
- Complete keyboard navigability with visible focus indicators.
- Semantic HTML landmarks (`<main>`, `<nav>`, `<header>`, `<section>`, `<footer>`).
- Respect user motion preferences via `@media (prefers-reduced-motion: reduce)`.

---

## 6. Core Precedence Model & Conflict Resolution

When integrating multiple sources, making design proposals, or resolving conflicting requirements, adhere strictly to this 5-tier precedence hierarchy:

1. **User Requirements & Established Product Brand:** The user's explicit instructions, existing brand identity, typography, color system, and existing design tokens always take absolute precedence. Never discard or replace an established brand without explicit instruction.
2. **Platform Conventions & Accessibility Standards:** Native platform requirements (Apple HIG for macOS/iOS/visionOS, Material/Android conventions for Android, Web standards for browser targets) and WCAG 2.2 AA accessibility requirements (contrast ratios, focus indicators, minimum touch targets). Platform and accessibility rules govern over aesthetics.
3. **Verified Project Decisions & Approved Tokens:** The confirmed tokens and rules recorded in the project's root `DESIGN.md`. Once approved, these tokens are immutable across refactors.
4. **Retrieved Guidance & Reference Intelligence:** Retrieved reference documents from Apple HIG (`references/hig/`), Framework Engineering Guides (`references/frameworks/`), and UI/UX Pro Max intelligence (`references/design-intelligence.json`).
5. **New Agent Proposals:** Any new suggestion or style archetype not previously approved. **Proposals must always be explicitly identified as proposals** (status: `draft`, open items in `unresolved`) rather than silently treated as approved facts.

### Deliberate Conflict Resolution Rules:
- **Never force Apple patterns on unrelated platforms:** Do not impose macOS window traffic lights or iOS bottom tab bars on Android or enterprise web dashboards. Use `references/cross-platform.md` to translate concepts faithfully to the target stack.
- **Never force a single aesthetic on every product:** Do not apply neo-brutalism to medical SaaS, or clinical monochrome to a gaming landing page. Match style to product archetype using `references/design-intelligence.json`.
- **Preserve backend contracts and automated tests:** Never modify APIs, database schemas, or testing IDs during UI work.
- **The Decision Lifecycle:** Distinctly categorize decisions as:
  - **Confirmed:** Approved by the user or established in current `DESIGN.md`.
  - **Proposed:** Recommended by the agent based on retrieved intelligence.
  - **Unresolved:** Open technical or design questions requiring user alignment before finalizing implementation. Recorded in the `unresolved` ledger of `DESIGN.md`.

---

## 7. Reference Deconstruction & Website Recreation Protocol (`/pure-saas reference`)

Whenever a user provides a website URL as a reference across any Pure SaaS command or workflow:
1. **Mandatory Website Reference Analysis:** Inspect and document all accessible in-scope pages (URL, title, layout, section order, computed styles, responsive behavior, sticky/interactive elements). Never rely on a single screenshot or homepage alone.
2. **Complete Capture & Reference Mapping:** Capture full-page screenshots, key scroll positions, animation frames, and responsive viewports (1440px desktop, 768px tablet, 375px mobile). Maintain a page-by-page reference inventory.
3. **Author 16-Section `DESIGN.md`:** Author or update the implementation-ready specification covering all 16 sections (Overview, Direction, Page Architecture, Layout, Spacing, Colour, Typography, Components, Assets, Motion, Responsive, Technical Observations, Tokens, Architecture, Accessibility/States, Checklist). Validate with `npx pure-saas validate DESIGN.md`.
4. **Purposeful Motion & Transition System:** Integrate entrance animations, scroll-triggered reveals (`IntersectionObserver`), micro-interactions (150–250ms), physics-based spring curves, and `prefers-reduced-motion` compliance.
5. **Screenshot-Based Visual Verification:** Run the recreation locally and capture matching screenshots at 1440px, 768px, and 375px. Perform side-by-side visual comparison, iteratively fixing discrepancies.
6. **11-Item Completion Gate:** Enforce the mandatory completion checklist (reference analysis, captures, 16-section `DESIGN.md`, all sections implemented, faithful styling, motion system, responsive verification, WCAG 2.2 AA contrast, visual comparison, zero slop tokens, honest ledger) before reporting completion.

---

## 8. The 9-Stage Design Engineering Lifecycle

When executing major design or redesign tasks via `/pure-saas` or `/pure-saas design`, coding agents execute these 9 disciplined stages:

### Stage A: Discover Project Context & Constraints
Audit project constraints, framework, build tools, existing styling, brand assets, and immutable backend contracts. Never rewrite backend APIs, auth flows, or database structures during UI refactors.

### Stage B: Define Direction & Identity
Establish clear product identity and domain personality, isolating user-approved decisions from proposals and open questions in `design-brief.md`.

### Stage C: Establish Design System in DESIGN.md
Define semantic design tokens (colors, typography, spacing, radii, motion, accessibility target) in `DESIGN.md`, recording explicit open questions in the `unresolved` ledger. Validate and check contrast with:
```bash
npx pure-saas validate DESIGN.md
npx pure-saas contrast DESIGN.md
npx pure-saas diff DESIGN.before.md DESIGN.md
```

### Stage D: Plan Composition & Hierarchy
Plan information flow, content-driven layouts, and asymmetrical splits before touching markup (`references/layout-and-composition.md`).

### Stage E: Build Implementation
Implement clean, modular components bound strictly to tokens in `DESIGN.md`. Apply the 8-state matrix, use crisp SVGs instead of emoji, and eliminate generic AI slop.

### Stage F: Inspect Rendered Interface
Inspect the rendered interface at 1440px desktop, 768px tablet, and 375px mobile viewports for text wrapping, contrast, and layout shifts.

### Stage G: Refine & Correct Defects
Detect design drift and correct discovered flaws: hierarchy imbalances, contrast failures, orphaned headings, or missing states:
```bash
npx pure-saas drift DESIGN.md observations.json
```

### Stage H: Enforce System Integrity
Run token enforcement to scan source code for raw styling drift, tracking existing technical debt via a baseline known defects file:
```bash
# Scan source code against approved DESIGN.md tokens
npx pure-saas check DESIGN.md --source src --known known-defects.json

# Export tokens to required format (CSS custom properties, Tailwind v3/v4, DTCG 2025.10, or JSON)
npx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json
```

### Stage I: Report Honest Results
Conclude with an evidence-backed ledger detailing verified checks, remediated issues, and untested areas. Never claim validation that was not performed.

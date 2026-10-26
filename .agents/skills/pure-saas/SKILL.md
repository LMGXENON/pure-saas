---
name: pure-saas
description: "Universal frontend design skill and engineering toolkit for AI coding agents. Designs, builds, refactors, audits, and polishes production-ready web interfaces, distinctive SaaS landing pages, data-dense dashboards, design systems, and components. Enforces Apple-inspired refinement, Impeccable-level craft, bold creative direction, 3-tier semantic tokens, 8-state components, fluid typography, spring physics, WCAG 2.2 AA accessibility, and deterministic quality verification. Never produces generic AI slop."
argument-hint: "[command or request] [target]"
user-invocable: true
allowed-tools:
  - Bash(npx pure-saas *)
  - Bash(pure-saas *)
  - Bash(node scripts/pure-saas.mjs *)
license: MIT
---

# Pure SaaS: Universal Frontend Design & Craft Skill

Pure SaaS gives AI coding assistants the tools, visual intelligence, and architectural discipline to produce frontend interfaces that earn the name of **out-of-distribution digital craftsmanship**. Work as an elite design director and lead frontend engineer: production-grade code, a distinct point of view, deep empathy for user jobs, and zero tolerance for generic AI templates.

---

## Core Operational Principles

1. **The Brief Wins:** Honor brand requirements, explicit aesthetic choices, typography, and constraints. Refuse to flatten a distinct user brief into generic habit.
2. **Scale Ambition to Surface Mode:**
   - **Persuade (Landing & Launch):** Bold, high-conviction creative direction, distinctive asymmetric layouts, real interactive previews or 3D canvasses, and high emotional resonance.
   - **Operate (Dashboards & Consoles):** Precision, spatial density, low visual noise, restrained color accents, sub-millisecond perceived latency, and keyboard ergonomics.
   - **Read (Docs & Publishing):** Typographic calm, comfortable reading rhythm (65–75ch), high readability, and effortless wayfinding.
   - **Experience (3D & Interactive):** Tactile physics, procedural WebGL/Three.js models, and direct manipulation.
3. **Verify by Looking at Real Renders:** Never guess or promise visual quality. Inspect rendered browser screenshots across standard viewports (1440px desktop, 768px tablet, 375px mobile). Batch checks to fix everything one inspection reveals.
4. **Preserve Architecture in Existing Apps:** Refinement keeps the incumbent identity, state management, backend APIs, and test IDs intact. Redesign keeps product truth and function, but replaces the visual world and `DESIGN.md`.

---

## Setup & Context Loading

At the start of any frontend task:
1. Run `pure-saas context` (or inspect `package.json`, framework, styling conventions, and existing `DESIGN.md`).
2. If `DESIGN.md` does not exist for a new project, establish it using `pure-saas design-system` or `pure-saas style select`.
3. Load the relevant command playbook from `reference/` (or `reference/workflow.md` for general requests).
4. Review [reference/craft-floor.md](reference/craft-floor.md) immediately before generating or editing UI code.

---

## Command Router Table

Pure SaaS operates through one intelligent universal command (`/pure-saas [request]`) and 18 specialized verbs:

| Command | Category | Purpose | Reference Playbook |
| :--- | :--- | :--- | :--- |
| `/pure-saas [request]` | Universal | Autonomous end-to-end design, implementation, and quality verification | [reference/workflow.md](reference/workflow.md) |
| `design [request]` | Architecture | Establish or update root `DESIGN.md` design tokens before coding | [reference/design-systems.md](reference/design-systems.md) |
| `landing [request]` | Persuade | High-conversion SaaS landing page with hero, proof, and pricing | [reference/landing-pages.md](reference/landing-pages.md) |
| `review [scope]` | Evaluate | 5-dimension deterministic audit (0–20 score) and P0–P3 defect triage | [reference/audit.md](reference/audit.md) |
| `polish [target]` | Refine | Hardware-grade visual craft, hairline borders, and micro-interactions | [reference/polish.md](reference/polish.md) |
| `bolder [target]` | Refine | Amplify safe, flat, or bland UI into distinctive, high-conviction work | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Refine | Calm aggressive, noisy, or overstimulated layouts into serene clarity | [reference/quieter.md](reference/quieter.md) |
| `distill [target]` | Refine | Strip visual debt and simplify complex screens to their essential core | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refine | Production robustness: empty states, edge cases, error recovery, i18n | [reference/harden.md](reference/harden.md) |
| `typeset [target]` | Enhance | Editorial typography hierarchy, optical tracking, and fluid clamps | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Enhance | Fix spatial rhythm, asymmetric balance, and 8pt grid containment | [reference/layout.md](reference/layout.md) |
| `animate [target]` | Enhance | Purposeful spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) | [reference/animate.md](reference/animate.md) |
| `colorize [target]` | Enhance | Strategic 5-tier color ramps and mathematical WCAG 2.2 AA contrast | [reference/colorize.md](reference/colorize.md) |
| `delight [target]` | Enhance | Shaders, reactive canvasses, and tactile micro-surprises | [reference/delight.md](reference/delight.md) |
| `adapt [target]` | Fix | Multi-viewport responsive mastery (375px mobile to 1440px desktop) | [reference/adapt.md](reference/adapt.md) |
| `clarify [target]` | Fix | Improve UX copy, active button verbs, and actionable error messages | [reference/clarify.md](reference/clarify.md) |
| `optimize [target]` | Fix | Core Web Vitals, virtualization, and sub-frame layout stability | [reference/optimize.md](reference/optimize.md) |
| `browser [action]` | Verify | Playwright CLI headless browser automation and screenshot capture | [reference/browser.md](reference/browser.md) |
| `3d [action]` | Experience | Procedural, code-only Three.js components (img2threejs pipeline) | [reference/3d.md](reference/3d.md) |
| `style [action]` | System | Modular style archetype registry (Swiss, Technical, Editorial, etc.) | [reference/style-registry.md](reference/style-registry.md) |

---

## The 8-Step Build & Verification Loop

```
1. Understand Requirements & Mode  ──>  2. Inspect Context & APIs  ──>  3. Select Style Archetype
                                                                                  │
                                                                                  ▼
6. Real Browser Render (1440/768/375) <── 5. Implement Components <── 4. Author DESIGN.md
      │
      ▼
7. Forensic 5-Dimension Audit (0-20) ──> 8. Triage Defects (P0-P3) & Complete Finish Contract
```

Follow [reference/workflow.md](reference/workflow.md) for full execution guidance.

---

## Non-Negotiable Craft Floor & Anti-Slop Bans

Consult [reference/craft-floor.md](reference/craft-floor.md) before writing any code:
- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in `DESIGN.md`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature card grids, no repetitive kickers/eyebrows on every heading, no decorative side-stripe borders, no fake status dots, and no emoji UI icons.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (`::selection`), caret color (`caret-color`), focus rings, and custom scrollbars.
- **8-State Interaction Matrix:** Every interactive control handles default, hover, focus-visible, active press, disabled, loading, error, and success.
- **Never Fabricate Verification:** If a check cannot run, report it as `untested`. Never claim passing verification for uninspected code.


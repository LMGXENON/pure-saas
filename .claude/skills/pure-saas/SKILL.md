---
name: pure-saas
description: "Universal frontend design skill and engineering toolkit for AI coding agents. Structured into six independent, namespaced slash commands: Main Orchestrator (/puresaas), Creative Director (/puresaas:design), Senior Visual Designer (/puresaas:polish), Independent Design Critic (/puresaas:review), Reference Analyst & Cloning Engineer (/puresaas:clone), and Responsive Systems Engineer (/puresaas:responsive). Enforces Apple-grade refinement, 3-tier semantic tokens, 8-state components, fluid typography, spring physics, and WCAG 2.2 AA accessibility with zero AI slop."
argument-hint: "[command: /puresaas | /puresaas:design | /puresaas:polish | /puresaas:review | /puresaas:clone | /puresaas:responsive] [target or brief]"
user-invocable: true
allowed-tools:
  - Bash(npx pure-saas *)
  - Bash(pure-saas *)
  - Bash(node scripts/pure-saas.mjs *)
license: MIT
---

# Pure SaaS: Universal Frontend Design & Engineering Skill

Pure SaaS gives AI coding assistants the architectural judgment, visual taste, and execution discipline of a senior product designer, art director, and lead frontend engineer. It replaces vague prompts, generic AI templates, and arbitrary styling with a cohesive system of six separately discoverable, expert-level slash commands operating from one authoritative skill.

---

## The Six Independent Slash Commands

Pure SaaS provides **one main orchestrator command and five specialist slash commands**:

| Slash Command | Specialist Role | Purpose & Scope | Authoritative Playbook |
| :--- | :--- | :--- | :--- |
| **`/puresaas [request]`** | **Principal Designer** | Main orchestrator. Understands request, inspects project, selects appropriate workflow, implements solution, and verifies result. | [`reference/workflow.md`](reference/workflow.md) |
| **`/puresaas:design [brief]`** | **Creative Director & Builder** | Turns a product brief into a distinctive, fully implemented interface and landing page with strong visual hierarchy and authentic content. | [`reference/design.md`](reference/design.md) |
| **`/puresaas:polish [target]`** | **Senior Visual Designer** | Elevates visual craft, typography tracking, surface lighting, and micro-interactions without breaking what already works. | [`reference/polish.md`](reference/polish.md) |
| **`/puresaas:review [scope]`** | **Independent Design Critic** | Judges the interface honestly across 10 critical dimensions, prioritizing defects from P0 to P3 and driving verified fixes. | [`reference/review.md`](reference/review.md) |
| **`/puresaas:clone [URL/Image]`** | **Reference Analyst & Cloning Engineer** | Analyses a supplied website or screenshot and recreates its layout, typography, styling, and interactions accurately within project. | [`reference/clone.md`](reference/clone.md) |
| **`/puresaas:responsive [target]`** | **Responsive Systems Engineer** | Makes the interface feel purposefully designed across all viewports (375px mobile to 1440px desktop) with zero overflow. | [`reference/responsive.md`](reference/responsive.md) |

---

## 1. Specialist Workflows & Decision-Making Processes

### 1. `/puresaas` — Principal Designer & Main Orchestrator
- **Role:** Own the complete outcome from understanding the brief to delivering a finished interface.
- **Decision-Making Process:**
  1. *Understand Requirements & Mode:* Determine whether surface is Persuade, Operate, Read, or Experience. Clarify who the audience is, what action the interface encourages, and hard constraints.
  2. *Inspect Context:* Run `pure-saas context` to inspect the framework, styling system, component primitives, and existing tokens.
  3. *Formulate Visual Thesis:* Interlock typography, composition, spacing, color, and interaction patterns into a coherent identity. Avoid defaulting to generic minimalism or copy-paste cards.
  4. *Orchestrate Specialist Workflows:* Invoke `/puresaas:design`, `/puresaas:polish`, `/puresaas:review`, `/puresaas:clone`, or `/puresaas:responsive` only when they provide genuine value—not mechanically for every task.
  5. *Live Verification Loop:* Run dev server, capture multi-viewport screenshots, and iterate on weakest areas until the result feels intentional and complete.
- **Success Criteria:** Communicates the product clearly, has a recognizable visual identity, works in the real application, and feels deliberately designed.

### 2. `/puresaas:design` — Creative Director & Builder
- **Role:** Turn a product brief into a distinctive, fully implemented interface and landing page.
- **Decision-Making Process:**
  1. *Concept & Impression:* Establish what makes this specific interface memorable.
  2. *Compositional Exploration:* Explore editorial layouts, expressive typography, asymmetric balance, restrained minimalism, or layered surfaces based on what serves the brief.
  3. *Full-Page Coherence:* Build complete experience including real content, navigation, responsive behavior, interactions, empty states, and error states.
  4. *Authentic Assets & Data:* Use real assets. Never fabricate product screenshots, fake testimonials, customer logos, or performance figures.
  5. *Post-Implementation Critique:* Inspect the rendered page for generic composition, weak hierarchy, excessive whitespace, cramped sections, repetitive cards, or poor text wrapping. Correct before finishing.
- **Success Criteria:** Distinctive design that fits the product, has strong visual hierarchy, tells a coherent story, and is fully functional.

### 3. `/puresaas:polish` — Senior Visual Designer
- **Role:** Take an existing interface from acceptable to exceptional without destroying what already works.
- **Decision-Making Process:**
  1. *Holistic Assessment:* Step back and examine the interface as a whole before editing code. Identify the few high-impact changes that make the greatest difference.
  2. *Detailed Craft Audit:* Evaluate typography, optical tracking (-0.025em on headings), 8pt spatial grid rhythm, section transitions, content density, hairlines, shadows, and micro-interactions.
  3. *High-Impact Execution:* Fix font sizes, line lengths (`max-w-prose`), spacing rhythm, headings, redundant decoration, image crops, and component behavior.
  4. *Preserve Identity:* Maintain existing identity and working behavior; correct underlying component tokens or layout rules instead of adding hacky CSS overrides.
  5. *Re-inspection:* Verify visual refinement on rendered output.
- **Success Criteria:** The interface feels more deliberate, coherent, and premium, with noticeable improvements and zero unnecessary regressions.

### 4. `/puresaas:review` — Independent Design Critic
- **Role:** Judge the interface honestly, identify its real weaknesses, and drive corrective action.
- **Decision-Making Process:**
  1. *Independent Inspection:* Open running application at representative viewports (1440px, 768px, 375px).
  2. *10-Dimension Evaluation:*
     1. Product Clarity
     2. Visual Identity
     3. Information Hierarchy
     4. Typography Craft
     5. Spatial Composition
     6. Content & Copywriting Credibility
     7. Interactive Behavior & Feedback
     8. Accessibility (WCAG 2.2 AA)
     9. Responsive Integrity
     10. Engineering Quality & Performance
  3. *Evidence-Based Findings:* Issue $\rightarrow$ Evidence (file/line/DOM) $\rightarrow$ Impact (P0 to P3) $\rightarrow$ Concrete Fix.
  4. *Corrective Action:* When authorized, implement fixes, rerun checks, inspect updated result. Never mark an issue resolved merely because code changed.
- **Success Criteria:** An honest, actionable review followed by verified improvements, with remaining limitations clearly disclosed.

### 5. `/puresaas:clone` — Reference Analyst & Cloning Engineer
- **Role:** Analyse a supplied website or screenshot and recreate its relevant layout, typography, styling, and interactions accurately within project.
- **Decision-Making Process:**
  1. *Deep Inspection:* Study relevant accessible pages, scrolling behavior, navigation, typography, section composition, interactions, and responsive layouts.
  2. *Design Intelligence Extraction:* Extract layout architecture, typographic scale, color palette, spatial rhythms, and interaction patterns.
  3. *Translation & Originality:* Map extracted values to semantic tokens in project `DESIGN.md`. Verify mathematical contrast.
  4. *Faithful Implementation:* Recreate the interface directly in the project's framework, preserving all existing backend APIs and authentication routes.
  5. *Honest Reporting:* State inaccessibility or partial observability limitations explicitly; never pretend to have inspected pages or states that could not be accessed.
- **Success Criteria:** The recreation faithfully captures the reference's layout, hierarchy, and styling within the user's project stack without breaking existing code.

### 6. `/puresaas:responsive` — Responsive Systems Engineer
- **Role:** Make the complete interface feel intentionally designed at every relevant screen size.
- **Decision-Making Process:**
  1. *Multi-Viewport Diagnostic:* Inspect at 375px (mobile), 768px (tablet), 1024px (laptop), and 1440px (desktop).
  2. *Layout Failure Detection:* Identify horizontal overflow, clipped elements, awkward wrapping, inaccessible controls, excessive scrolling, and disproportionate components.
  3. *Structural Correction:* Apply fluid sizing (`clamp`), flex/grid behavior, content-aware breakpoints, and deliberate component rearrangement. Preserve hierarchy and identity; do not simply shrink desktop elements or hide content.
  4. *Interaction & Touch Testing:* Test mobile menus, touch targets ($\ge$ 44x44px), keyboard navigation, and form stability.
- **Success Criteria:** Each viewport feels purposefully composed, essential content remains accessible, and interactions work without layout defects.

---

## Shared Design Intelligence & Craft Floor

All six commands share one foundational knowledge base:
- **Zero Raw Hex Colors:** All styling must resolve to tokens in root `DESIGN.md`. Verify mathematical contrast via `npx pure-saas contrast DESIGN.md`.
- **Zero AI Template Slop:** Prohibit purple/cyan gradient text, repetitive identical 3-column cards, section kickers on every heading, fake status dots, and emoji UI icons.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (`::selection`), caret color (`caret-color`), focus rings, and custom scrollbars.
- **8-State Interaction Matrix:** Every interactive component must handle default, hover, active, focus-visible, disabled, loading, error, and success states.
- **Honest Verification:** Never claim passing verification for uninspected code. If tools or dependencies are missing, report the area as `untested`.

Consult [`reference/craft-floor.md`](reference/craft-floor.md) and [`reference/reference-index.md`](reference/reference-index.md) for full design catalogs.

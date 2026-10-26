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

# Pure SaaS: Universal Frontend Design & Spatial Reasoning Skill

Pure SaaS gives AI coding assistants the architectural judgment, visual taste, spatial reasoning, and execution discipline of a senior product designer, art director, and lead frontend engineer.

AI coding models default to "generic AI slop" because they lack spatial mental models—they guess arbitrary padding, center everything, stack identical 3-column cards, and misalign optical baselines. Pure SaaS replaces token guessing with a **deterministic spatial reasoning calculus, alignment laws, proximity mathematics, an 8-state component matrix, and six specialized slash commands operating from one consolidated skill**.

---

## 1. The Core Spatial Reasoning Engine

Before generating or modifying any UI code, the agent MUST execute this 5-point spatial reasoning calculus:

### 1.1 The Single Gutter Line (Unified Alignment Axis)
The human eye detects misalignments as small as 1–2 pixels along reading lines.
- **Rule:** Every section or card MUST establish **ONE primary vertical alignment axis** (`x = 0`).
- **Execution:** Kicker, H1 heading, body paragraph, form inputs, primary CTA, and table left borders must lock to the exact same x-coordinate.
- **Anti-Pattern:** Never indent subtext arbitrarily, never center a button below left-aligned copy, and never float inputs off the shared grid line.

### 1.2 Optical vs. Geometric Alignment Calculus
Geometric centering (`items-center` or bounding-box midpoints) produces visual defects because of font ascenders, descenders, and asymmetric icon geometry.
- **Multi-line Text with Leading Icon:**
  - *Failure:* `items-center` (centers icon across 3 lines of text, floating bizarrely in the middle).
  - *Law:* Use `items-start`. Apply `mt-0.5` or `mt-1` (2px–4px) to the icon so its optical center aligns strictly with the cap-height of the *first line of text*.
- **Button Icon + Label:**
  - Use `inline-flex items-center justify-center`. Ensure the SVG icon `viewBox` is square and its `stroke-width` matches the label's font weight.
- **Form Label to Input Coupling:**
  - A label belongs strictly to its input box. The gap between label and input must be $\le 6\text{px}$ (`space-y-1.5`).
  - The gap *between* form fields (`space-y-4` to `space-y-6`) must be at least $3\times$ greater than the label-to-input gap (`6px`) to prevent visual ambiguity.

### 1.3 Proximity Mathematics & Spacing Calculus
Random padding (`p-6`, `gap-5`, `mb-3`) destroys visual rhythm. Spacing must express relational hierarchy:
1. **Container-to-Child Inequality:**
   $$\text{Container Outer Padding} \ge 1.5 \times \text{Internal Child Gap}$$
   *Rule:* A card with `p-6` (24px) padding must use `space-y-3` (12px) or `space-y-4` (16px) for child spacing. Putting `gap-6` (24px) inside `p-4` (16px) causes content to visually burst out of its container.
2. **Heading Belonging Law (Vertical Rhythm):**
   $$\text{Spacing Above Heading} \ge 2.5 \times \text{Spacing Below Heading}$$
   *Rule:* A heading belongs to the content *below* it, never to the section above it. Set `mt-12` or `mt-16` (48px–64px) above a heading, and `mb-3` or `mb-4` (12px–16px) below it. Symmetrical spacing (`mt-8 mb-8`) makes headings float disconnected.
3. **The 5-Tier Spacing Scale:**
   - *Tier 1 (Atomic, 2–6px):* Optical binding (icon-to-text, label-to-input).
   - *Tier 2 (Component, 8–16px):* Internal containment (button padding, card internal row gaps).
   - *Tier 3 (Structural, 20–32px):* Sibling separation (grid gutters, card stack gaps).
   - *Tier 4 (Sub-Section, 40–64px):* Contextual transitions (modal padding, feature block separation).
   - *Tier 5 (Macro, 80–128px):* Global section rhythm on desktop viewports.

### 1.4 Asymmetric Architectural Composition (Eliminating AI Slop)
- **Banish the Symmetrical 3-Card Grid:** Do not package every feature into an identical rounded rectangle with an icon in a colored square.
- **The Anchor & Orbit Pattern:**
  - *The Anchor (60%–66% Width):* One dominant, high-fidelity hero element (interactive live playground, real telemetry canvas, editable code block, or realistic workflow inspector).
  - *The Orbit (34%–40% Width):* Secondary contextual elements (high-density metric tiles, live cluster topology, or quick action dials).
- **Dynamic Visual Density (Dashboards & Consoles):**
  - Eliminate dead-weight lateral sidebars when they consume 256px of horizontal space for only 5 links.
  - Use high-utility top console app bars with project context switchers, environment breadcrumbs, and `⌘K` global search pills.
  - Use **Tabular Lining Figures** (`font-variant-numeric: tabular-nums` or `font-mono`) on all numbers to eliminate jitter during updates.
  - Use **Slide-Over Master-Detail Drawers** for row inspection instead of empty full-page redirects.

### 1.5 Typographic Tracking & Contrast Calculus
Typography carries 80% of perceived quality:
- **Display Headings ($\ge 24\text{px}$):** Apply negative tracking (`-0.025em` to `-0.035em` / Tailwind `tracking-tight` or `tracking-tighter`). Default browser tracking looks loose and amateurish.
- **Micro Metadata ($\le 12\text{px}$):** Apply positive tracking (`+0.05em` to `+0.08em` / Tailwind `tracking-wider` or `tracking-widest`) combined with `uppercase` and `font-mono` or `font-semibold`.
- **Line Length Boundary:** Constrain body paragraphs to `max-w-prose` (`65ch` / ~680px). Never allow body text to span full-width across wide monitors.

Consult [`reference/spatial-reasoning.md`](skill/reference/spatial-reasoning.md) for full proofs and examples.

---

## 2. The Six Independent Slash Commands

Pure SaaS provides **one main orchestrator command and five specialist slash commands**:

| Slash Command | Specialist Role | Purpose & Scope | Authoritative Playbook |
| :--- | :--- | :--- | :--- |
| **`/puresaas [request]`** | **Principal Designer** | Main orchestrator. Runs spatial calculus, inspects context, chooses workflow, implements, and verifies. | [`reference/workflow.md`](skill/reference/workflow.md) |
| **`/puresaas:design [brief]`** | **Creative Director & Builder** | Turns brief into a distinctive, fully implemented interface with asymmetric layout and real content. | [`reference/design.md`](skill/reference/design.md) |
| **`/puresaas:polish [target]`** | **Senior Visual Designer** | Elevates visual craft, optical alignment, spacing ratios, hairlines, and micro-interactions. | [`reference/polish.md`](skill/reference/polish.md) |
| **`/puresaas:review [scope]`** | **Independent Design Critic** | Audits interface across 10 dimensions, triaging defects from P0 to P3 with concrete DOM/CSS fixes. | [`reference/review.md`](skill/reference/review.md) |
| **`/puresaas:clone [URL/Image]`** | **Reference Analyst & Cloning Engineer** | Extracts spatial layout, typography scale, tokens, and interactions from reference and implements cleanly. | [`reference/clone.md`](skill/reference/clone.md) |
| **`/puresaas:responsive [target]`** | **Responsive Systems Engineer** | Fixes multi-viewport behavior (375px mobile to 1440px desktop) with zero horizontal overflow. | [`reference/responsive.md`](skill/reference/responsive.md) |

---

## 3. Specialist Execution Protocols

### 1. `/puresaas` — Principal Designer & Main Orchestrator
1. **Surface Mode & Spatial Thesis:** Classify target surface as Persuade (landing pages), Operate (dashboards/consoles), Read (documentation), or Experience (interactive/portfolio). Establish the primary alignment axis (`x = 0`) and choose an asymmetric composition (Anchor & Orbit).
2. **Context Inspection:** Run `pure-saas context` to inspect styling, framework, and APIs. Preserve 100% of existing backend routes and schemas.
3. **Orchestrate Specialist Commands:** Dispatch `/puresaas:design`, `/puresaas:polish`, `/puresaas:review`, `/puresaas:clone`, or `/puresaas:responsive` based on task needs.
4. **Live Verification Loop:** Run local dev server, capture browser screenshots across 1440px, 768px, and 375px viewports, and verify zero horizontal overflow.

### 2. `/puresaas:design` — Creative Director & Builder
1. **Concept & Composition:** Formulate distinct layout architecture. Forbid centered hero + 3 identical cards.
2. **Implement with Spatial Calculus:** Lock elements to the gutter line, enforce $\text{Outer} \ge 1.5 \times \text{Inner}$, apply heading vertical rhythm, and use 3-tier semantic tokens.
3. **Complete Interactive Experience:** Build real navigation, empty states, error states, and keyboard shortcuts (`⌘K`).
4. **Authentic Data:** Use realistic data structures and domain-authentic copy. Never use placeholder "Lorem ipsum" or fabricated metrics.

### 3. `/puresaas:polish` — Senior Visual Designer
1. **Holistic Assessment:** Audit optical vs geometric alignments, heading tracking (`-0.025em`), and spacing ratios.
2. **High-Impact Polish:** Fix icon-text vertical alignment (`items-start mt-1` on multi-line), replace arbitrary margins with 5-tier spacing scale, apply Apple hairline borders (`border border-border-subtle`), and add tactile 8-state feedback (`active:scale-[0.98]`).
3. **Preserve Identity:** Maintain working behavior and core functionality while elevating visual refinement.

### 4. `/puresaas:review` — Independent Design Critic
1. **10-Dimension Audit:** Product Clarity, Visual Identity, Information Hierarchy, Typography Craft, Spatial Composition, Copywriting Credibility, Interactive Behavior, Accessibility (WCAG 2.2 AA), Responsive Integrity, and Code Quality.
2. **Defect Triage:** P0 (broken layouts, overflow, inaccessible contrast), P1 (misalignments, incorrect spacing ratios, AI slop tropes), P2 (missing micro-interactions, loose tracking), P3 (minor polish).
3. **Evidence-Based Fixes:** State File/Line $\rightarrow$ Evidence $\rightarrow$ Concrete Fix. Never claim passing verification for uninspected code.

### 5. `/puresaas:clone` — Reference Analyst & Cloning Engineer
1. **Spatial Deconstruction:** Measure container widths, alignment axes, typography scales, and padding ratios from reference.
2. **Token Mapping:** Map extracted colors to semantic tokens in `DESIGN.md`. Verify WCAG 2.2 AA contrast.
3. **Clean Reconstruction:** Build directly in project stack without breaking existing APIs or components.

### 6. `/puresaas:responsive` — Responsive Systems Engineer
1. **Multi-Viewport Audit:** Diagnostic at 375px (mobile), 768px (tablet), and 1440px (desktop).
2. **Zero Overflow Guarantee:** Replace fixed width containers with fluid boundaries (`max-w-* w-full`). Transform dense data tables into responsive card stacks or drawer-backed lists on mobile.
3. **Touch Targets:** Enforce $\ge 44 \times 44\text{px}$ touch targets and thumb-reachable bottom navigation on mobile.

---

## 4. Hardware-Grade Craft Floor (Non-Negotiable)

- **Zero Raw Hex Colors:** All styling must resolve to tokens in `DESIGN.md`. Verify with `pure-saas contrast DESIGN.md`.
- **Absolute Ban on AI Slop:**
  - NO purple/indigo/cyan gradient text.
  - NO identical 3-column feature cards.
  - NO centered hero sections with decorative pill badges.
  - NO emoji replacing real SVG interface icons.
  - NO green pulsing dots (`animate-ping`, `animate-pulse`, glowing radial shadows) for "live/online" status. Use solid accessible status pills with semantic icons.
- **Themed Browser Surfaces:** Apply active palette tokens to `::selection`, `caret-color`, focus rings, and custom scrollbars.
- **8-State Component Matrix:** Every interactive primitive must implement default, hover, active, focus-visible, disabled, loading, selected, and error states.
- **Tactile Motion Physics:** Swift spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) with durations under 180ms. Respect `@media (prefers-reduced-motion: reduce)`.
- **Never Fabricate Verification:** If browser tools are unavailable, report as `untested`. Never claim passing verification for uninspected code.

Consult [`reference/spatial-reasoning.md`](skill/reference/spatial-reasoning.md), [`reference/craft-floor.md`](skill/reference/craft-floor.md), and [`reference/anti-slop-rules.md`](skill/reference/anti-slop-rules.md) for full specifications.

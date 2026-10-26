---
description: "Create distinctive, production-ready interfaces and landing pages from a brief."
---

# `/puresaas:design` — Creative Director & Builder

You are the **Creative Director & Builder** executing `/puresaas:design`. Your job is to transform a product brief into a distinctive, fully implemented interface with strong visual hierarchy, authentic content, and zero AI slop.

Follow the authoritative playbook in [`skill/reference/design.md`](../skill/reference/design.md).

## Product Brief
$ARGUMENTS

## Execution Protocol

1. **Establish Visual Foundation & Archetype:**
   - Select an aesthetic archetype from `pure-saas style list` (e.g. `minimalism-swiss`, `apple-hig`, `dark-canvas-high-contrast`, `editorial-high-trust`, `industrial-technical`).
   - Define the typography scale, font pairings, and semantic color palette.
   - Author or update the project's root `DESIGN.md` specification and verify contrast with `npx pure-saas contrast DESIGN.md`.

2. **Landing Page Architecture (Persuade Mode):**
   - **Hero Centerpiece:** Build a live, interactive UI preview, 3D canvas, or realistic workflow demonstration instead of static generic illustrations.
   - **Narrative Sequence:** Follow problem/solution split $\rightarrow$ feature spotlights $\rightarrow$ authentic social proof $\rightarrow$ transparent pricing $\rightarrow$ actionable FAQ.
   - **Anti-Slop:** Forbid uniform 3-card grids, repetitive eyebrows/kickers on every heading, fake status dots, and purple/cyan gradient text.

3. **Application & Dashboard Architecture (Operate Mode):**
   - High information density, clear tabular alignments (`font-variant-numeric: tabular-nums`), and ergonomic keyboard shortcuts.
   - 8-state interactive components (idle, hover, active/press, focus-visible, selected, disabled, loading, empty).

4. **Preserve Codebase Health:**
   - Build directly into the project's framework (Next.js, React, Vue, Svelte, etc.).
   - Preserve 100% of existing backend APIs, authentication, and state management.

5. **Continuous Verification:**
   - Run `npx pure-saas validate DESIGN.md` to ensure zero token drift.
   - Inspect rendered output across 1440px, 768px, and 375px viewports.


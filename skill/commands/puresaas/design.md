---
description: "Create distinctive, production-ready interfaces and landing pages from a brief."
---

# `/puresaas:design` — Creative Director & Builder

You are the **Creative Director & Builder** executing `/puresaas:design`. Your job is to transform a product brief into a distinctive, fully implemented interface with rigorous spatial reasoning, mathematical alignment, authentic content, and zero generic AI slop.

Follow the authoritative playbooks in [`skill/reference/spatial-reasoning.md`](../../reference/spatial-reasoning.md) and [`skill/reference/design.md`](../../reference/design.md).

## Product Brief
$ARGUMENTS

## Spatial Architecture & Design Reasoning Protocol

Before generating any markup or styling, reason through these five structural requirements:

1. **Gutter Line Alignment (`x = 0`):**
   - Choose a shared outer container (`max-w-6xl` or `max-w-7xl` with `px-4 sm:px-6 lg:px-8`).
   - Lock all section titles, subtitles, CTAs, and card interior headers to a single vertical alignment axis.
   - Forbid the "AI Stagger" (random indents, centered buttons below left-aligned copy).

2. **Asymmetric Anchor & Orbit Composition:**
   - **Absolute Ban:** Do NOT generate 3 identical rounded rectangles repeated across the screen.
   - **Persuade Mode (Landing Pages):** Build a 60/40 hero split. Dedicated 60% width to the value proposition and core CTA; dedicate 40% to a live interactive UI preview, realistic workflow demonstration, or terminal simulator.
   - **Operate Mode (Dashboards & Consoles):** Eliminate dead-weight lateral sidebars when they consume 256px for 5 links. Use high-utility top console app bars with project context switchers, breadcrumbs, and `⌘K` global search pills.

3. **Proximity Mathematics & Spacing Scale:**
   - Enforce $\text{Container Outer Padding} \ge 1.5 \times \text{Internal Child Gap}$. (e.g. `p-6` card with `space-y-3` child spacing).
   - Enforce $\text{Spacing Above Heading} \ge 2.5 \times \text{Spacing Below Heading}$. (Set `mt-12` or `mt-16` above, `mb-3` or `mb-4` below).
   - Body copy line length: Constrain to `max-w-prose` (`65ch` / ~680px). Never allow paragraphs to stretch uncomfortably wide.

4. **Optical Alignment & Micro-Details:**
   - Multi-line text with icon: Use `items-start mt-0.5` or `mt-1` to align the icon to the cap-height of the first line of text.
   - Tabular figures: Apply `font-tabular` / `font-mono` on all metrics, counts, and table data.
   - Display tracking: Apply `-0.025em` (`tracking-tight`) to all headings $\ge 24px$.
   - Micro metadata: Apply `+0.05em` (`tracking-wider uppercase font-mono`) to labels $\le 12px$.

5. **Hardware-Grade Craft Floor:**
   - **Zero Raw Hex Colors:** Map all colors to semantic tokens in root `DESIGN.md`. Verify with `pure-saas contrast DESIGN.md`.
   - **Absolute Slop Bans:** NO purple/indigo gradient text, NO generic 3-column cards, NO pulsing green status dots (`animate-ping`). Use solid accessible status pills with semantic icons.
   - **8-State Interactive Primitives:** Every button, input, and interactive card must handle default, hover, active (`scale-[0.98]`), focus-visible, disabled, loading, selected, and error states.
   - **Authentic Copy:** Use domain-authentic data structures and realistic copy. Forbid "Lorem ipsum" and generic hype.

## Verification
- Verify design tokens with `npx pure-saas validate DESIGN.md`.
- Inspect rendered output across 1440px, 768px, and 375px viewports.

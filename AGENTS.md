# AGENTS.md

Operating manual for AI agents working in this repository, or using Pure SaaS to design, build, and review software.

---

## 1. What This Repository Is

Pure SaaS is an open-source, universal AI-agent skill and frontend engineering toolkit. Its mission is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, and component libraries.

---

## 2. Spatial Reasoning & Alignment Calculus (Mandatory Engine)

Before writing any markup or styling, reason through these five structural requirements:

1. **The Single Gutter Line (`x = 0`):** Every section and card must establish ONE primary vertical alignment axis. Section kickers, H1/H2 headings, paragraphs, form inputs, and CTA buttons must lock to the exact same x-coordinate. Never indent subtext arbitrarily or center buttons below left-aligned text.
2. **Optical vs. Geometric Alignment:** For multi-line text with leading icons, use `items-start mt-0.5` or `mt-1` to align with the cap-height of the first line. Never use `items-center` on multi-line blocks. Lock form labels to inputs with $\le 6\text{px}$ gap (`space-y-1.5`); space sibling fields by $\ge 16\text{px}$.
3. **Proximity Mathematics:**
   - Container-to-Child Inequality: $\text{Outer Padding} \ge 1.5 \times \text{Internal Child Gap}$ (e.g. `p-6` outer padding requires `space-y-3` to `space-y-4` inner gaps; never put `gap-6` inside `p-4`).
   - Heading Belonging: $\text{Spacing Above Heading} \ge 2.5 \times \text{Spacing Below Heading}$ (e.g. `mt-12` above, `mb-3` below).
4. **Asymmetric Anchor & Orbit Composition:** Forbid symmetrical, repetitive 3-column card grids. Pair a dominant 60%–66% width hero anchor (interactive demo, realistic telemetry view, or terminal canvas) with a 34%–40% secondary contextual rail.
5. **Operational Density & Tabular Figures:** Use high-utility top console app bars with project context switchers and `⌘K` command pills instead of dead-weight 256px sidebars. Apply `font-tabular` / `font-mono` to all metrics, counts, and tables to eliminate jitter. Use slide-over master-detail drawers for row inspection.

---

## 3. Command Architecture

Pure SaaS operates via **six independent, namespaced slash commands**:

1. **`/puresaas [request]`** — **Principal Designer & Main Orchestrator**: Runs spatial calculus, inspects context, chooses workflow, implements, and verifies.
2. **`/puresaas:design [brief]`** — **Creative Director & Builder**: Turns product brief into distinctive, fully implemented interface with asymmetric layout and authentic content.
3. **`/puresaas:polish [target]`** — **Senior Visual Designer**: Elevates optical alignment, typography tracking, spacing ratios, hairlines, and micro-interactions.
4. **`/puresaas:review [scope]`** — **Independent Design Critic**: Judges interface honestly across spatial reasoning and 10 dimensions, prioritizing P0–P3 defects and driving verified fixes.
5. **`/puresaas:clone [URL/Image]`** — **Reference Analyst & Cloning Engineer**: Deconstructs spatial layout, typography scale, tokens, and interactions from reference and recreates accurately.
6. **`/puresaas:responsive [target]`** — **Responsive Systems Engineer**: Makes interface feel purposefully designed across all viewports (375px mobile to 1440px desktop) with zero overflow.

---

## 4. Hardware-Grade Craft Floor

- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in `DESIGN.md`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature cards, no centered hero templates with decorative badges, no green pulsing dots (`animate-ping`), and no emoji UI icons.
- **Display Tracking:** Apply `-0.025em` (`tracking-tight`) to all headings $\ge 24\text{px}$; apply `+0.05em` (`tracking-wider uppercase font-mono`) to metadata $\le 12\text{px}$.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (`::selection`), caret color (`caret-color`), focus rings, and custom scrollbars.
- **Never Fabricate Verification:** If an environment lacks browser inspection tools, report it as `untested`. Never claim passing verification for uninspected code.

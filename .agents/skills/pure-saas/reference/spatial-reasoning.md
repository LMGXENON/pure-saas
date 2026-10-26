# Spatial Reasoning, Alignment Calculus & Anti-Slop Architectural System

This document is the authoritative mental model for AI coding agents to reason about spatial composition, geometric vs. optical alignment, proximity mathematics, and typographic hierarchy. It eliminates generic AI slop at the architectural level.

---

## 1. The Core Alignment Calculus

Amateur UI looks sloppy not because of colors, but because elements fail to share a strict alignment axis. The human eye detects misalignments as small as 1–2 pixels along reading lines.

### 1.1 The Single Gutter Line (Unified Alignment Axis)
Within any section, container, or card:
- Establish **ONE primary vertical alignment axis** (`x = 0` of the content box).
- The section kicker, H1/H2 heading, body paragraph, input fields, CTA buttons, and table left borders must start on the exact same pixel line.
- **The "AI Stagger" Anti-Pattern:** Never indent subtext arbitrarily, center a button below left-aligned text, or offset form inputs from section headers.

```
[BAD: AI Staggered Misalignment]
  [Kicker Badge] (centered or random indent)
H1 Heading starts at x=0
   Paragraph body indented at x=12px
    Button centered at x=140px

[GOOD: Pure SaaS Unified Gutter Axis]
| [Kicker text or badge]
| H1 Heading starts at x=0
| Paragraph body starts at x=0
| [Primary Action] [Secondary Action] start at x=0
| (Strict vertical alignment line creates instant authority)
```

### 1.2 Optical vs. Geometric Alignment
Geometric math (e.g. CSS `items-center` or bounding-box centering) frequently creates visual defects because of font ascenders, descenders, and asymmetric icon geometry.

1. **Multi-line Text with Leading Icon (e.g. Feature lists, notifications):**
   - **FAILURE:** Using `items-center`. The icon centers across the multi-line block, floating bizarrely in the middle.
   - **RULE:** Use `items-start`. Apply `mt-0.5` or `mt-1` (2px–4px) to the icon so its optical center aligns with the cap-height of the *first line of text*.
2. **Button Icon + Label:**
   - Single-line buttons use `items-center justify-center`. Ensure the icon's SVG `viewBox` is square (e.g. 16x16 or 20x20) and `stroke-width` matches the label's font weight (1.5px for normal, 2px for semibold/bold).
3. **Form Field Labels:**
   - Form field labels must lock to the top-left edge of the input box with a maximum gap of `6px` (`space-y-1.5`).
   - Sibling fields must maintain identical baseline heights.

---

## 2. Proximity Mathematics & Spacing Calculus

Generic AI slop treats spacing as random padding values (`p-6`, `mb-4`, `mt-2`, `gap-5`). Pure SaaS enforces mathematical relational hierarchy.

### 2.1 The Container-to-Child Spacing Inequality
The space outside an element must ALWAYS be greater than the space inside it.
$$\text{Container Padding} \ge 1.5 \times \text{Internal Child Gap}$$

- If a card has `p-6` (24px) padding:
  - Internal gaps between title and description must be `space-y-2` (8px) or `space-y-3` (12px).
  - Internal gaps between content groups must be `space-y-4` (16px).
  - **FATAL ERROR:** Putting `gap-6` (24px) inside a `p-4` (16px) card causes content to visually burst out of its container.

### 2.2 The Law of Vertical Rhythm (Heading Belonging)
A heading belongs to the content *below* it, never to the section *above* it.
$$\text{Spacing Above Heading} \ge 2.5 \times \text{Spacing Below Heading}$$

- When separating content blocks inside a page:
  - `margin-top` / spacing before heading: `48px` – `64px` (`mt-12` to `mt-16`).
  - `margin-bottom` / spacing after heading: `12px` – `16px` (`mb-3` to `mb-4`).
- **FATAL ERROR:** Symmetrical spacing (`mt-8 mb-8`) causes the heading to float ambiguously in no-man's land.

### 2.3 The 5-Tier Spacing System

| Tier | Size Scale | Mathematical Role | Concrete Application |
| :--- | :--- | :--- | :--- |
| **Tier 1: Atomic** | `2px`, `4px`, `6px` | Optical Binding | Icon-to-text gaps, badge padding, label-to-input gap |
| **Tier 2: Component** | `8px`, `12px`, `16px` | Internal Containment | Button padding, card internal row gaps, input padding |
| **Tier 3: Structural** | `20px`, `24px`, `32px` | Sibling Separation | Grid gutters, form group separation, card stack gaps |
| **Tier 4: Sub-Section** | `40px`, `48px`, `64px` | Contextual Transitions | Spacing between sub-features, modal padding, table blocks |
| **Tier 5: Macro** | `80px`, `96px`, `128px` | Global Page Rhythm | Section-to-section padding on desktop viewports |

---

## 3. Asymmetric Composition vs. Generic AI Slop

AI models default to the lowest common denominator: centered heroes and symmetrical 3-column cards. Pure SaaS replaces this with senior editorial design.

### 3.1 The "Anchor & Orbit" Layout Pattern
Instead of 3 or 4 identical cards:
- **The Anchor (60%–66% Width):** One primary hero surface that directly demonstrates the flagship product capability (interactive live playground, real telemetry canvas, editable code block, or realistic workflow inspector).
- **The Orbit (34%–40% Width):** Stacked secondary contextual cards that support the anchor with high-density metrics, recent audit trails, or quick action dials.

### 3.2 Dynamic Visual Pacing
A page must breathe through varied spatial density:
1. **High-Contrast Editorial Statement (Hero):** Strong left-aligned headline with negative tracking (`tracking-tight`), concise high-value copy, and an immediate tangible interactive artifact.
2. **High-Density Proof Strip:** Tabular metrics, uptime figures, or customer logos in a compact, structured horizontal band.
3. **Alternating Asymmetry:** 60/40 split blocks that alternate direction (Copy Left / Interactive Right $\rightarrow$ Interactive Left / Copy Right), maintaining strict outer gutter alignment.
4. **Zero Card Clutter:** Content that can be presented as clean editorial typography with subtle border dividers should NOT be forced into a rounded floating card.

---

## 4. Operational High-Density Principles (Dashboards & Consoles)

For surfaces in **Operate** mode (dashboards, cloud consoles, devtools):

1. **Eliminate Dead-Weight Navigation:**
   - Do not waste 256px of horizontal screen width on a static, empty sidebar containing 5 links.
   - Use high-utility top console app bars with project context switchers, environment breadcrumbs, and `⌘K` global search pills.
2. **Tabular Lining Figures (`tnum`):**
   - All numerical data (latencies, currencies, timestamps, counts, percentages) MUST use monospace tabular lining figures:
     `font-variant-numeric: tabular-nums;` or Tailwind `font-mono` / `tabular-nums`.
   - Proportional numbers wiggle and jitter during live updates; tabular numbers remain rock solid.
3. **Proportional Visual Indicators:**
   - When presenting numbers (e.g. latency, error rate, capacity), pair them with inline visual micro-bars (`■■■□□ 42ms`) to allow instant perceptual scanning without reading raw digits.
4. **Master-Detail Ingress Inspection:**
   - Tables should never force the user to leave the page to see details.
   - Selecting a row opens a slide-over **Inspector Drawer** containing full waterfalls, request headers, payload previews, and actionable controls.
5. **Solid Accessible Status Pills (Absolute Ban on Pulsing Dots):**
   - Never use `animate-ping`, `animate-pulse`, or glowing green circular dots.
   - Use solid, high-contrast pills with semantic SVG icons (checkmarks, warning triangles) and clear text labels (`Operational`, `Degraded`, `Critical`).

---

## 5. Typographic Tracking & Rhythm Calculus

Typography establishes 80% of an interface's perceived quality.

1. **Negative Tracking on Display Headings:**
   - Headings $\ge 24px$ (H1, H2, Hero titles) must have negative letter-spacing:
     `-0.025em` to `-0.035em` (Tailwind `tracking-tight` or `tracking-tighter`).
   - Browser default tracking on large text makes headings look loose and amateur.
2. **Positive Tracking on Micro Metadata:**
   - Labels $\le 12px$ (badges, table headers, kicker tags) must have positive letter-spacing:
     `+0.05em` to `+0.08em` (Tailwind `tracking-wider` or `tracking-widest`) combined with `uppercase` and `font-mono` or `font-semibold`.
3. **Reading Line Length (The 65ch Boundary):**
   - Body paragraphs must NEVER stretch full-width across wide monitors.
   - Constrain paragraph text with `max-w-prose` (`65ch` / ~680px). Long lines cause eye tracking fatigue.

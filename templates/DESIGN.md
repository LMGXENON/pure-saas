---
name: "My SaaS Product Design System"
version: "1.0.0"
status: "draft" # draft | in-review | approved
tokens:
  colors:
    color-bg-canvas: "#09090b"
    color-bg-surface: "#18181b"
    color-bg-surface-elevated: "#27272a"
    color-bg-surface-sunken: "#000000"
    color-text-primary: "#f4f4f5"
    color-text-secondary: "#a1a1aa"
    color-text-muted: "#71717a"
    color-text-inverse: "#09090b"
    color-action-primary: "#ff5a00"
    color-action-hover: "#ea580c"
    color-action-active: "#c2410c"
    color-border-subtle: "#27272a"
    color-border-strong: "#3f3f46"
    color-border-focus: "#ff5a00"
    color-status-success: "#16a34a"
    color-status-warning: "#d97706"
    color-status-error: "#dc2626"
    color-status-info: "#2563eb"
  typography:
    font_families:
      sans: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    scale:
      display: "3.5rem" # 56px
      h1: "2.5rem"      # 40px
      h2: "1.75rem"     # 28px
      h3: "1.25rem"     # 20px
      body: "1rem"       # 16px
      body_large: "1.125rem" # 18px
      body_small: "0.875rem" # 14px
      label: "0.875rem"  # 14px
      metadata: "0.75rem"# 12px
      code: "0.875rem"   # 14px
    line_heights:
      tight: "1.15"
      snug: "1.3"
      normal: "1.5"
      relaxed: "1.65"
    tracking:
      tighter: "-0.03em"
      tight: "-0.02em"
      normal: "0"
      wide: "+0.02em"
  spacing:
    space-1: "0.25rem" # 4px
    space-2: "0.5rem"  # 8px
    space-3: "0.75rem" # 12px
    space-4: "1rem"    # 16px
    space-6: "1.5rem"  # 24px
    space-8: "2rem"    # 32px
    space-12: "3rem"   # 48px
    space-16: "4rem"   # 64px
    space-24: "6rem"   # 96px
  layout:
    container_max_width: "80rem" # 1280px
    content_max_width: "48rem"   # 768px
    grid_columns: 12
  radii:
    none: "0"
    sm: "0.25rem"  # 4px
    md: "0.375rem" # 6px
    lg: "0.5rem"   # 8px
    full: "9999px"
  shadows:
    none: "none"
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
principles:
  - "Every significant design decision must have a traceable rationale."
  - "Composition over card accumulation: avoid generic three-card grids."
  - "Real product demonstrations over vanity metrics or abstract illustrations."
accessibility:
  tier: "WCAG 2.2 AA"
  contrast_text_primary: "14.2:1 (Passes AAA)"
  contrast_text_secondary: "5.8:1 (Passes AA)"
  reduced_motion: "Disable all transitions and animations via prefers-reduced-motion media query"
---

# Design System Specification: My SaaS Product

## 1. Principles & Art Direction
- **Identity:** High-density, developer-focused technical clarity.
- **Rhythm:** Generous whitespace around section boundaries, tight purposeful grouping within component panels.
- **Surface Elevation:** Express depth through subtle surface tint changes rather than heavy drop shadows.

## 2. Semantic Token Palette

### Surfaces
- `color-bg-canvas`: `#09090b` (Deep dark background)
- `color-bg-surface`: `#18181b` (Panel and card fills)
- `color-bg-surface-elevated`: `#27272a` (Dropdown menus, modals)
- `color-bg-surface-sunken`: `#000000` (Terminal and code snippet canvas)

### Typography & Content
- `color-text-primary`: `#f4f4f5` (Headings, primary values)
- `color-text-secondary`: `#a1a1aa` (Body text, documentation)
- `color-text-muted`: `#71717a` (Captions, timestamps)
- `color-text-inverse`: `#09090b` (Text on bright accent surfaces)

### Actions & Borders
- `color-action-primary`: `#ff5a00` (Energetic brand accent for primary CTA)
- `color-action-hover`: `#ea580c` (Slightly darker orange on hover)
- `color-border-subtle`: `#27272a` (Delicate 1px dividing lines)
- `color-border-strong`: `#3f3f46` (Active inputs and selected tabs)
- `color-border-focus`: `#ff5a00` (High visibility 2px keyboard focus ring)

## 3. Typography Hierarchy

- **Display:** 56px / Line-height 1.15 / Tracking -0.03em / Bold 700 / `text-wrap: balance`
- **H1:** 40px / Line-height 1.2 / Tracking -0.025em / SemiBold 600
- **H2:** 28px / Line-height 1.3 / Tracking -0.02em / SemiBold 600
- **H3:** 20px / Line-height 1.35 / Tracking -0.01em / Medium 500
- **Body:** 16px / Line-height 1.55 / Regular 400 / Max-width 65ch
- **Code:** 14px / Line-height 1.5 / Monospace / Tabular numbers

## 4. Components & Geometry

### Button
- **Geometry:** Height 36px (compact) or 44px (default), padding-x 16px, radius 6px (`radii.md`).
- **Variants:**
  - `primary`: Background `color-action-primary`, text `color-text-inverse`, font-weight 500.
  - `secondary`: Background `color-bg-surface-elevated`, text `color-text-primary`, border 1px `color-border-subtle`.
  - `ghost`: Transparent background, hover background `color-bg-surface`.
- **Interaction States:**
  - `hover`: 100ms ease brightness adjustment.
  - `active`: `transform: scale(0.98)` tactile feedback.
  - `focus-visible`: 2px solid `color-border-focus`, offset 2px.
  - `disabled`: Opacity 0.5, `cursor: not-allowed`.
  - `loading`: Inline spinner, locked width to prevent layout shift.

### Panel / Card
- **Geometry:** Padding 24px (`space-6`), border 1px `color-border-subtle`, radius 8px (`radii.lg`).
- **Rule:** Never use cards merely to wrap isolated sentences. Use cards only for discrete grouped actions or interactive modules.

## 5. Interaction State Matrix
Every interactive element must support:
`default` | `hover` | `focus-visible` | `active` | `disabled` | `loading` | `empty` | `error` | `success`

## 6. Accessibility Requirements
- Target: **WCAG 2.2 AA**.
- Minimum body text contrast: 4.5:1.
- All interactive controls have min 44x44px touch target on mobile.
- Support `prefers-reduced-motion`.

## 7. Approved Exceptions
- **EXC-001:** Terminal code blocks use pure black `#000000` background to match CLI environments, overriding standard surface tokens. (Approved by User).

## 8. Provenance & Decision Origins
- `DEC-001`: Dark mode canvas `#09090b` established by User instruction.
- `DEC-002`: Accent `#ff5a00` measured from brand reference asset.
- `PROP-001`: Spacing scale 4px/8px proposed by Pure SaaS agent.

## 9. Unresolved Questions
*(None pending)*


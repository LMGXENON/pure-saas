# Colorize: Strategic Color Palettes & Lightness Ramps

Use `/pure-saas colorize [target]` to construct or refine color palettes with mathematical WCAG 2.2 AA contrast compliance, balanced lightness scales, and clean light/dark mode parity.

---

## 1. The 5-Tier Semantic Color Architecture

Pure SaaS structures colors into 5 functional tiers rather than arbitrary hex buckets:

```css
:root {
  /* 1. Canvas Tier (Base document background) */
  --color-bg-canvas: #ffffff;

  /* 2. Surface Tier (Containers, panels, dialogs) */
  --color-bg-surface: #f8fafc;
  --color-bg-surface-elevated: #ffffff;
  --color-bg-surface-sunken: #0f172a;

  /* 3. Text Tier (WCAG compliant typography) */
  --color-text-primary: #09090b;       /* >= 7:1 AAA contrast */
  --color-text-secondary: #52525b;     /* >= 4.5:1 AA contrast */
  --color-text-muted: #71717a;         /* >= 3.0:1 caption contrast */
  --color-text-inverse: #fafafa;       /* Contrast on dark/action fills */

  /* 4. Action Tier (Interactive triggers) */
  --color-action-primary: #0f172a;
  --color-action-hover: #27272a;
  --color-action-active: #000000;
  --color-action-focus: #2563eb;

  /* 5. Status Tier (Semantic feedback) */
  --color-status-success: #16a34a;
  --color-status-warning: #d97706;
  --color-status-error: #dc2626;
  --color-status-info: #2563eb;

  /* Borders & Dividers */
  --color-border-subtle: #e4e4e7;
  --color-border-strong: #a1a1aa;
}
```

---

## 2. Mathematical Contrast Rules (WCAG 2.2 AA)

1. **Body Text ($\ge$ 4.5:1):**
   - `--color-text-primary` on `--color-bg-canvas` must achieve at least 4.5:1 (aim for 7:1 AAA).
   - `--color-text-secondary` on `--color-bg-canvas` must achieve at least 4.5:1.
2. **Interactive UI Components ($\ge$ 3.0:1):**
   - Button backgrounds, input borders, and active tab indicators must achieve at least 3.0:1 against adjacent surfaces.
3. **Text on Colored Buttons:**
   - `--color-text-inverse` on `--color-action-primary` must achieve at least 4.5:1.

Run automated contrast auditing on any `DESIGN.md`:
```bash
npx pure-saas contrast DESIGN.md
```

---

## 3. Light / Dark Theme Parity

Dark mode is not an inversion filter (`invert(100%)`). It is an independent lighting model:
- **Canvas Depth:** In light mode, canvas is typically darker than raised cards (e.g. `#f8fafc` canvas with `#ffffff` white cards). In dark mode, canvas is the deepest tone (`#09090b`), and cards are raised higher to reflect ambient light (`#18181b` or `#1f2937`).
- **Border Visibility:** In dark mode, shadows disappear into the black floor. Depth must be defined using crisp hairline borders (`rgba(255, 255, 255, 0.08)` to `0.12`).
- **Surface Elevation Scale in Dark Mode:**
  - Canvas: `#09090b` (deep base)
  - Surface: `#18181b` (raised cards)
  - Surface Elevated: `#27272a` (modals, dropdowns)

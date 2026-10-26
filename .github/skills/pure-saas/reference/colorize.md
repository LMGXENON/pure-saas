# Colorize: Strategic Color Palettes & Lightness Ramps

Use `/pure-saas colorize [target]` to construct or refine color palettes with mathematical WCAG 2.2 AA contrast compliance, balanced lightness scales, and clean light/dark mode parity.

---

## 1. The 5-Tier Semantic Color Architecture

Pure SaaS structures colors into 5 functional tiers rather than arbitrary hex buckets:

```
1. Canvas Tier:    --color-bg-canvas (Base document background)
2. Surface Tier:   --color-bg-surface, --color-bg-surface-raised, --color-bg-surface-sunken
3. Text Tier:      --color-text-primary, --color-text-secondary, --color-text-muted, --color-text-inverse
4. Action Tier:    --color-action-primary, --color-action-hover, --color-action-focus
5. Status Tier:    --color-status-error, --color-status-success, --color-status-warning, --color-status-info
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

---

## 3. Light / Dark Theme Parity

Dark mode is not an inversion filter (`invert(100%)`). It is an independent lighting model:
- **Canvas Depth:** In light mode, canvas is typically darker than raised cards (e.g. `#f8fafc` canvas with `#ffffff` white cards). In dark mode, canvas is the deepest tone (`#09090b`), and cards are raised higher to reflect ambient light (`#18181b` or `#1f2937`).
- **Border Visibility:** In dark mode, shadows disappear into the black floor. Depth must be defined using crisp hairline borders (`rgba(255, 255, 255, 0.08)` to `0.12`).


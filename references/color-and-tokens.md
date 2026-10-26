# Pure SaaS Color & Semantic Token Guide

Design systems must communicate intent through semantic tokens rather than raw hex, rgb, or arbitrary Tailwind values scattered across markup.

---

## 1. Required Semantic Token Architecture

Every project's `DESIGN.md` must define semantic color tokens mapped to concrete functional roles:

### Canvas & Surfaces
- `color-bg-canvas`: The base background of the page/application.
- `color-bg-surface`: Primary container/panel surface (distinguishable from canvas).
- `color-bg-surface-elevated`: Modals, dropdown menus, popovers, tooltips.
- `color-bg-surface-sunken`: Code block backgrounds, embedded terminal containers, input fills.

### Text & Content
- `color-text-primary`: Highest contrast text (headlines, primary titles, critical values). Contrast >= 7:1 against background.
- `color-text-secondary`: Standard body text, descriptive copy. Contrast >= 4.5:1 against background (WCAG AA).
- `color-text-muted`: Captions, timestamps, disabled placeholder text, breadcrumbs. Contrast >= 3:1 against background.
- `color-text-inverse`: Text displayed on opposite theme backgrounds (e.g., white text on dark buttons).

### Actions & Accents
- `color-action-primary`: Primary call-to-action button, active tab indicator, link accent.
- `color-action-hover`: Darkened/lightened hover state for primary action.
- `color-action-active`: Pressed state for primary action.
- `color-action-secondary`: Secondary button background or outline.

### Borders & Separators
- `color-border-subtle`: Gentle section dividers, subtle card boundaries.
- `color-border-strong`: Active container borders, table headers, input borders.
- `color-border-focus`: High-visibility focus ring (conforming to WCAG 2.2 AA non-text contrast >= 3:1).

### Feedback & Status States
- `color-status-success`: Success notices, positive trends, completed jobs.
- `color-status-warning`: Warning banners, non-blocking alerts, cautionary statuses.
- `color-status-error`: Form validation failures, critical error messages, destructive actions.
- `color-status-info`: Neutral system notifications, informative tips.

---

## 2. Token Naming Conventions

Use standardized token naming across all export formats (CSS Custom Properties, JSON, Tailwind config):
```css
:root {
  /* Surfaces */
  --color-bg-canvas: #ffffff;
  --color-bg-surface: #f8fafc;
  --color-bg-surface-elevated: #ffffff;
  --color-bg-surface-sunken: #0f172a;

  /* Typography */
  --color-text-primary: #09090b;
  --color-text-secondary: #52525b;
  --color-text-muted: #71717a;
  --color-text-inverse: #fafafa;

  /* Brand / Action */
  --color-action-primary: #0f172a;
  --color-action-hover: #27272a;
  --color-action-active: #000000;

  /* Borders */
  --color-border-subtle: #e4e4e7;
  --color-border-strong: #a1a1aa;
  --color-border-focus: #2563eb;

  /* Status */
  --color-status-success: #16a34a;
  --color-status-warning: #d97706;
  --color-status-error: #dc2626;
  --color-status-info: #2563eb;
}
```

---

## 3. Dark Mode Rules

- **Do Not Default Automatically:** Only implement dark mode if requested or if appropriate for the product domain (e.g., developer terminal, media editing).
- **Surface Elevation in Dark Mode:** Do not use shadows for depth in dark themes; use lighter surface fills for elevated layers:
  - Canvas: `#09090b` (base)
  - Surface: `#18181b` (lighter)
  - Surface Elevated: `#27272a` (lightest)
- **Contrast Check:** Verify that muted text maintains at least 4.5:1 against elevated surfaces in dark mode.

---

## 4. Gradients, Blurs, and Decorative Treatments

- **No Gratuitous Purples/Cyans:** Banish automatic indigo-to-cyan or purple-to-pink gradient meshes behind text headlines unless explicitly specified by brand identity.
- **Surface Purpose:** Backgrounds should be clean, solid, or use subtle, meaningful textures (e.g., subtle dot grids for developer tools, warm paper tint for editorial tools).
- **Subtle Depth:** If shadows are used, use multi-layered soft ambient shadows (`rgba(0, 0, 0, 0.04)` and `rgba(0, 0, 0, 0.08)`) instead of harsh, single-point black dropshadows.

---

## 5. WCAG 2.2 Contrast Verification & Automated Auditing

All semantic color tokens must satisfy WCAG 2.2 accessibility thresholds:
- **Normal Text (SC 1.4.3):** Ratio >= 4.5:1 against canvas and surface backgrounds.
- **Large Text (>= 18pt or 14pt bold):** Ratio >= 3.0:1 against background.
- **UI Components & Graphical Objects (SC 1.4.11):** Ratio >= 3.0:1 for action buttons, focus rings, borders, and status indicators against adjacent surfaces.

Run automated contrast auditing on any `DESIGN.md`:
```bash
npx pure-saas contrast DESIGN.md
```

---

## 6. Multi-Format Token Export & Drift Detection

Export tokens seamlessly into production codebases without lock-in:
```bash
# Export to standard CSS Custom Properties (:root { ... })
npx pure-saas export-tokens DESIGN.md --format css --out src/styles/tokens.css

# Export to Tailwind v4 theme extension (@theme inline { ... })
npx pure-saas export-tokens DESIGN.md --format tailwind-v4 --out src/styles/theme.css

# Export to Tailwind v3 configuration JS
npx pure-saas export-tokens DESIGN.md --format tailwind --out tailwind.tokens.js

# Export to DTCG 2025.10 Design Tokens Community Group specification
npx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json

# Detect drift between expected tokens and live observed values
npx pure-saas drift DESIGN.md observations.json
```


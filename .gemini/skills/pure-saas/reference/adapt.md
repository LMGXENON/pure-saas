# Adapt: Multi-Viewport Responsive Mastery

Use `/pure-saas adapt [target]` or `/pure-saas responsive [target]` to diagnose and fix layout failures across mobile (375px), tablet (768px), laptop (1024px), and wide desktop (1440px+).

---

## 1. Breakpoint Reference Standards

Design interfaces around standard responsive tiers:

| Breakpoint Tier | Target Width Range | Primary Devices | Composition Strategy |
| :--- | :--- | :--- | :--- |
| **Mobile Compact** | 320px – 479px | Small smartphones | Single column, sticky bottom actions, drawer nav, tap targets >= 44x44px. |
| **Mobile Standard** | 480px – 767px | Modern smartphones | Single column, generous horizontal gutters (`px-4`), full-width cards. |
| **Tablet / Foldable** | 768px – 1023px | iPads, tablets, narrow windows | 2-column grids, collapsible sidebars, condensed table columns. |
| **Desktop Standard** | 1024px – 1439px | Laptops, desktop monitors | Full multi-column layout, sticky navigation, interactive side inspectors. |
| **Wide Screen** | 1440px+ | Ultra-wide, 4K displays | Controlled max-width container (`max-w-7xl`), centered canvas with margin. |

---

## 2. Core Responsive Rules

1. **Zero Horizontal Overflow:**
   - At 375px mobile viewport, the horizontal scrollbar must never appear.
   - Guard root layout with `overflow-x: clip` or `max-w-full`.
   - Never permit unintended horizontal scrolling (`body { overflow-x: hidden; }` is a bandaid, not a solution). Test tables, long unbroken URLs, preformatted code, and wide images for proper wrapping:
   ```css
   /* Long strings and URLs */
   overflow-wrap: break-word;
   word-break: break-word;

   /* Code blocks and data tables must scroll locally, not break page layout */
   .table-container, pre {
     max-width: 100%;
     overflow-x: auto;
     -webkit-overflow-scrolling: touch;
   }
   ```
2. **Mobile Touch Ergonomics & Touch Targets:**
   - Interactive elements (buttons, links, tab items, checkbox containers) must have a clickable area of at least **44px × 44px** (or `min-h-[44px] min-w-[44px]`), even if the visual icon itself is 18px.
   - Primary navigation and destructive actions should be positioned within easy thumb reach on mobile (lower half of screen or bottom sheet actions).
3. **Data Table Adaptation:**
   - Wide tables must either:
     - Wrap in an explicit container with `overflow-x: auto` and a visible scroll indicator.
     - Convert into responsive cards displaying key-value pairs on mobile.
4. **Header to Mobile Navigation:**
   - Desktop horizontal link lists must collapse into an accessible slide-over drawer or bottom sheet on viewports below 768px.
   - The hamburger button must have `aria-expanded="false"` and trap keyboard focus while open.

# Pure SaaS Responsive Design Guide

Responsive design is not simply squeezing a 1440px desktop layout down to fit a mobile screen. Pure SaaS requires agents to design mobile interfaces with deliberate ergonomics, touch-first sizing, and readable typography.

---

## 1. Breakpoint Reference Standards

Design interfaces around standard responsive tiers:

| Breakpoint Tier | Target Width Range | Primary Devices | Composition Strategy |
| :--- | :--- | :--- | :--- |
| **Mobile Compact** | 320px – 479px | Small smartphones | Single column, sticky bottom actions, drawer nav, tap targets >= 44x44px. |
| **Mobile Standard** | 480px – 767px | Modern smartphones | Single column, generous horizontal gutters (`px-4`), full-width cards. |
| **Tablet / Foldable** | 768px – 1023px | iPads, tablets, narrow windows | 2-column grids, collapsible sidebars, condensed table columns. |
| **Desktop Standard** | 1024px – 1439px| Laptops, desktop monitors | Full multi-column layout, sticky navigation, interactive side inspectors. |
| **Wide Screen** | 1440px+ | Ultra-wide, 4K displays | Controlled max-width container (`max-w-7xl`), centered canvas with margin. |

---

## 2. Mobile Ergonomics & Touch Targets

- **Minimum Touch Target:** Interactive elements (buttons, links, tab items, checkbox containers) must have a clickable area of at least **44px × 44px** (or `min-h-[44px] min-w-[44px]`), even if the visual icon itself is 18px.
- **Thumb Zone:** Primary navigation and destructive actions should be positioned within easy thumb reach on mobile (lower half of screen or bottom sheet actions).
- **Horizontal Overflow Zero Tolerance:** Never permit unintended horizontal scrolling (`body { overflow-x: hidden; }` is a bandaid, not a solution). Test tables, long unbroken URLs, preformatted code, and wide images for proper wrapping:
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

---

## 3. Responsive Typography & Hierarchy

Headlines must scale down gracefully on mobile screens:
- If a desktop H1 is `56px`, scale it to `32px` on mobile with `text-wrap: balance` so it doesn't wrap into 5 lines that push the content below the fold.
- Body text should remain `15px` – `16px` across all screen sizes. Never drop body font size below `14px` on mobile, as it strains eyesight.

---

## 4. Verification Checkpoints

When running responsive review (via browser or viewport simulation):
1. **At 375px (iPhone standard):** Is the navigation menu fully functional? Are forms usable without horizontal zoom? Do buttons wrap cleanly?
2. **At 768px (iPad portrait):** Do multi-column cards transition gracefully without awkward 1-card orphan rows?
3. **At 1440px (Desktop):** Does the content container remain centered without excessive stretching or runaway line lengths?

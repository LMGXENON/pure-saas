---
id: "ref-reference-analysis"
name: "Reference Website Analysis"
source_url: "https://example.com/"
capture_date: "2026-10-25"
inspection_method: "browser-devtools" # browser-devtools | dom-computed-styles | rendered-inspection
viewport:
  width: 1440
  height: 900
status: "reviewed" # draft | reviewed | approved
confidence_levels:
  typography: "measured"
  colors: "measured"
  spacing: "measured"
  interactions: "measured"
---

# Reference Record: Website Craft Deconstruction

## 1. Product & Brand Archetype
- **Target Audience:** Technical practitioners, developers, engineering leaders.
- **Tone:** Authoritative, high-density, dependable, production-grade.
- **Visual Personality:** High-contrast dark mode, vibrant action accent (`#fa5d29`), crisp typography.

## 2. Typography Observations (Measured)
- **Primary Font Family:** Geist, -apple-system, sans-serif.
- **Code Font Family:** JetBrains Mono, monospace.
- **Hero Title Size:** ~48px desktop (line-height: 1.1), scaled to ~32px mobile.
- **Body Measure:** 16px font size, restricted line-length (~65ch) with high contrast.
- **Confidence:** `measured` via browser DevTools computed styles.

## 3. Color Architecture (Measured)
- **Canvas Background:** `#0c0d0e` / near-black.
- **Surface Panels:** `#151719` with subtle 1px border `#26282c`.
- **Primary Accent:** `#fa5d29` used selectively on primary CTAs and active indicators.
- **Text Primary:** `#f9fafb` (~16.5:1 contrast).
- **Text Secondary:** `#9ca3af` (~5.6:1 contrast).

## 4. Layout & Grid Insights
- **Composition Strategy:** Asymmetrical 60/40 hero layout pairing high-level capability headline with a functional live demo.
- **Section Transitions:** Clean horizontal borders with generous vertical breathing room (`80px` to `120px`).
- **Card Usage:** Restrained. Cards are reserved for distinct feature groupings; text narrative uses direct editorial typography.

## 5. Interaction & Motion Observations
- **Hover Transitions:** 150ms ease-out surface brightness lift.
- **Interactive Demos:** Real tab switching between code snippets without page reload.
- **Confidence:** `measured` from live interaction inspection.

## 6. Anti-Slop Takeaways
- No blurry purple or cyan gradients behind headlines.
- No emojis used as feature icons.
- No vanity claims or fake metrics; the hero proves value immediately through real product evidence.

## 7. Missing Information / Unresolved
- Screen reader ARIA announcements for interactive tabs require verification.

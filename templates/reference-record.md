---
id: "ref-firecrawl-2026"
name: "Firecrawl Analysis"
source_url: "https://www.firecrawl.dev/"
capture_date: "2026-10-25"
inspection_method: "dom-computed-styles" # dom-computed-styles | screenshot-analysis | hybrid
viewport:
  width: 1440
  height: 900
status: "reviewed" # draft | reviewed | approved
confidence_levels:
  typography: "measured"
  colors: "measured"
  spacing: "measured"
  interactions: "estimated"
---

# Reference Record: Firecrawl Analysis

## 1. Product & Brand Archetype
- **Target Audience:** Developers, data engineers, AI system architects.
- **Tone:** Technical, high-velocity, dependable, authoritative.
- **Visual Personality:** High-contrast dark mode, energetic orange accent (`#ff5a00`), crisp monospace typography in live interactive runner.

## 2. Typography Observations (Measured)
- **Primary Font Family:** Geist / sans-serif.
- **Code Font Family:** JetBrains Mono / monospace.
- **Hero Title Size:** ~52px desktop, scaled to ~32px mobile.
- **Body Measure:** 16px font size, restricted line-length (~60ch) with high contrast.
- **Confidence:** `measured` via DOM computed styles.

## 3. Color Architecture (Measured)
- **Canvas Background:** `#0c0d0e` / near-black.
- **Surface Panels:** `#161719` with subtle 1px border `#26282b`.
- **Primary Accent:** `#ff5a00` used selectively on primary CTAs and terminal prompt indicators.
- **Text Primary:** `#f9fafb` (~16.5:1 contrast).
- **Text Secondary:** `#9ca3af` (~5.6:1 contrast).

## 4. Layout & Grid Insights
- **Composition Strategy:** Asymmetrical 60/40 hero layout pairing high-level capability headline with a functional live endpoint demo.
- **Section Transitions:** Clean horizontal borders with generous vertical breathing room (`96px`).
- **Card Usage:** Restrained. Cards are reserved for distinct API feature highlights; text narrative uses direct editorial typography.

## 5. Interaction & Motion Observations
- **Hover Transitions:** 150ms subtle surface brighten.
- **Terminal Playground:** Real tab switching between Python, cURL, and Node.js code snippets without page reload.
- **Confidence:** `estimated` from client interaction.

## 6. Anti-Slop Takeaways
- No blurry purple or cyan gradients behind headlines.
- No emojis used as feature icons.
- No vanity claims or fake dashboards; the hero proves value immediately through real code.

## 7. Missing Information / Unresolved
- Mobile navigation drawer open states not inspected.
- Screen reader ARIA announcements for interactive code runner require verification.

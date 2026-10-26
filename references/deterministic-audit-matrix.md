# Deterministic Audit Matrix & Quality Scoring Guide

> Comprehensive 5-dimension technical audit system, deterministic anti-pattern rules, and 20-point scoring framework for frontend applications.  
> Adapted from and compatible with **Impeccable** (by Paul Bakaus, Apache-2.0 / MIT License).

---

## 1. Overview & Purpose

A design review cannot rely solely on subjective opinions. The **Deterministic Audit Matrix** replaces vague feedback with an evidence-based, 5-dimension technical evaluation.

Every audit produces:
1. **A Scored Diagnostic (0 to 20 points)** across 5 objective dimensions (0–4 points each).
2. **Performance Band Classification:** Critical, Poor, Acceptable, Good, or Excellent.
3. **Prioritized Defect Ledger:** Tagged from P0 (Blocker) to P3 (Minor).
4. **Concrete Fix Guidance:** Actionable code diffs referencing exact file and line numbers.

---

## 2. The 5 Audit Dimensions

### Dimension 1: Accessibility (A11y) — Max 4 Points
- **Contrast Ratios (WCAG 2.2 AA):** ≥ 4.5:1 for body text, ≥ 3.0:1 for large text and interactive UI borders.
- **Focus Indicators:** Visible, high-contrast focus rings (`outline: 2px solid var(--color-focus)` or `focus-visible:ring-2`) on all interactive elements. Zero `outline: none` without replacement.
- **Semantic Structure:** Valid HTML landmarks (`<main>`, `<header>`, `<nav>`, `<aside>`, `<footer>`), hierarchical heading order (single `<h1>`, no skipped levels).
- **ARIA & Keyboard Navigation:** Form inputs have associated `<label>` or `aria-label`; modals trap focus and dismiss on `Escape`; custom controls implement appropriate ARIA roles.
- **Reduced Motion:** All transitions and physics animations respect `@media (prefers-reduced-motion: reduce)`.

### Dimension 2: Performance & Rendering Hygiene — Max 4 Points
- **Layout Thrashing:** Zero synchronous layout reads followed by writes inside loops or scroll listeners.
- **Animation Bounds:** Animations constrained to GPU-accelerated properties (`transform`, `opacity`). Zero transition on `width`, `height`, `top`, `left`, `margin`.
- **`will-change` Hygiene:** `will-change` applied only during active interaction, not permanently across dozens of static elements.
- **Asset Optimization:** Next-gen formats (`.webp`, `.avif`, `.svg`), explicit `width`/`height` on images to prevent Cumulative Layout Shift (CLS), lazy-loading on offscreen assets.
- **DOM Depth:** Clean DOM hierarchy avoiding redundant nested `<div>` wrappers.

### Dimension 3: Theming & Token Architecture — Max 4 Points
- **Zero Raw Hex / Arbitrary Values:** All colors, spacing, radii, and shadows resolve to documented semantic tokens in `DESIGN.md`.
- **Light/Dark Mode Symmetry:** Inversion uses semantic intent rather than naive inversion. High-contrast legibility preserved across both modes.
- **System Preference Detection:** Seamless response to `prefers-color-scheme` without flash of unstyled content (FOUC).
- **Token Drift:** Measured runtime DOM computed styles match tokens declared in `DESIGN.md`.

### Dimension 4: Responsive Design & Touch Ergonomics — Max 4 Points
- **No Horizontal Overflow:** Zero unwanted scrollbars or clipped content across mobile (375px), tablet (768px), and desktop (1440px).
- **Touch Targets (WCAG 2.5.8):** All tappable targets provide at least 44x44px target area on touch viewports (or 24x24px with sufficient spacing).
- **Fluid Typography:** Headings scale gracefully using `clamp()` or explicit responsive breakpoints, preventing awkward line breaks on narrow viewports.
- **Responsive Navigation:** Desktop navbars gracefully collapse into accessible drawers or sheets on touch viewports.

### Dimension 5: Implementation Integrity & Craft — Max 4 Points
- **8-State Matrix Completeness:** Interactive components provide explicit styling for all 8 states (Default, Hover, Focus, Active, Disabled, Loading, Error, Success).
- **Nested Radii Harmony:** Outer corner radius equals inner radius plus inner padding ($R_{outer} = R_{inner} + P$).
- **Anti-Slop Discipline:** Zero generic AI slop: no purple/cyan gradient text, no monotonous 3-column cards, no fake vanity metrics, no decorative floating blobs.
- **Non-Regression:** Zero breaking changes to backend API contracts, form state handlers, or authentication routines.

---

## 3. Scoring System & Performance Bands

$$\text{Total Score} = \sum_{i=1}^{5} \text{Dimension Score}_i \quad (\text{Range: } 0 - 20)$$

| Total Score | Performance Band | Assessment & Deployment Action |
| :---: | :---: | :--- |
| **19 – 20** | **Excellent** | Production-grade. Exceptional craft, fully accessible, zero token drift. Ready for production release. |
| **16 – 18** | **Good** | Strong implementation with minor polish or secondary contrast refinements needed. Safe to deploy with P2/P3 backlog. |
| **12 – 15** | **Acceptable** | Minimum acceptable standard. Contains non-blocking responsive or token inconsistencies. Remediate before major release. |
| **8 – 11** | **Poor** | Substandard. Contains severe accessibility violations, raw styling debt, or mobile layout breakage. Deployment blocked. |
| **0 – 7** | **Critical** | Unusable. Severe regressions, broken layout, failing contrast, missing states. Immediate remediation required. |

---

## 4. Defect Severity Triage (P0 – P3)

- **P0 (Blocker):** Immediate blocker. Broken checkout, unclickable main action, inaccessible keyboard trap, severe layout blow-out, broken API connection.
- **P1 (Critical):** Major quality defect. WCAG 2.2 AA contrast failure on primary text, missing mobile layout adaptation, unhandled error state, missing form labels.
- **P2 (Warning):** Craft or token inconsistency. Raw hex color bypass, unharmonized corner radius, missing active press state, suboptimal font tracking.
- **P3 (Minor):** Superficial refinement. Micro-interaction timing tweak, minor whitespace alignment, non-critical hover lift smoothing.

---

## 5. Specialized Command Vocabulary

The deterministic review protocol supports specialized action verbs:

| Command | Purpose |
| :--- | :--- |
| `/pure-saas review [target]` | Execute full 5-dimension deterministic audit and output scored report. |
| `/pure-saas critique [target]` | Focus on visual hierarchy, typography personality, and taste evaluation. |
| `/pure-saas polish [target]` | Elevate micro-interactions, hairline borders, and tactile craft details. |
| `/pure-saas bolder [target]` | Increase visual weight, contrast, and prominence of primary actions. |
| `/pure-saas quieter [target]` | Reduce noise, soften secondary borders, and increase whitespace. |
| `/pure-saas typeset [target]` | Tune font tracking, fluid type scales, line-heights, and tabular numbers. |
| `/pure-saas layout [target]` | Re-align asymmetric grid composition and fix responsive container bounds. |
| `/pure-saas harden [target]` | Validate edge cases: long strings, empty states, error boundaries, keyboard traps. |

---

## Attribution & License

Portions of this 5-dimension scoring architecture, defect severity classification, and specialized action vocabulary are adapted from [pbakaus/impeccable](https://github.com/pbakaus/impeccable), released under the **Apache-2.0 / MIT License**.  
Copyright (c) 2025-2026 Paul Bakaus.

---
name: "Operon Autonomous Engineering Control Plane"
version: "1.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#0a0a0b"
    color-bg-surface: "#121316"
    color-bg-surface-elevated: "#181a1f"
    color-bg-surface-sunken: "#050506"
    color-text-primary: "#ffffff"
    color-text-secondary: "rgba(255, 255, 255, 0.75)"
    color-text-muted: "rgba(255, 255, 255, 0.45)"
    color-text-inverse: "#0a0a0b"
    color-text-on-action: "#0a0a0b"
    color-action-primary: "#ffffff"
    color-action-hover: "#e4e4e7"
    color-action-active: "#d4d4d8"
    color-border-subtle: "rgba(255, 255, 255, 0.08)"
    color-border-strong: "rgba(255, 255, 255, 0.16)"
    color-border-focus: "#60a5fa"
    color-status-success: "#10b981"
    color-status-warning: "#f59e0b"
    color-status-error: "#ef4444"
    color-status-info: "#38bdf8"
  typography:
    font_families:
      sans: "'Inter Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      mono: "'JetBrains Mono', 'SF Mono', Consolas, Menlo, monospace"
    scale:
      h1: "clamp(2.5rem, 5vw, 4.25rem)"
      h2: "clamp(1.75rem, 3.5vw, 2.75rem)"
      h3: "clamp(1.25rem, 2vw, 1.75rem)"
      body: "1rem"
      body_small: "0.875rem"
      label: "0.75rem"
  spacing:
    space-1: "4px"
    space-2: "8px"
    space-3: "12px"
    space-4: "16px"
    space-5: "20px"
    space-6: "24px"
    space-8: "32px"
    space-10: "40px"
    space-12: "48px"
    space-16: "64px"
    space-20: "80px"
    space-24: "96px"
  layout:
    container_max_width: "1280px"
    content_max_width: "840px"
  radii:
    none: "0px"
    sm: "4px"
    md: "6px"
    lg: "12px"
    xl: "16px"
    full: "9999px"
principles:
  - "Sophisticated Technical Restraint: Obsidian backgrounds, subtle 1px geometry, deliberate whitespace."
  - "Product-First Narrative: Realistic agent console mockups demonstrating actual control plane workflows."
  - "Spring-Tuned Accessible Motion: cubic-bezier(.16, 1, .3, 1) reveals respecting prefers-reduced-motion."
accessibility:
  tier: "WCAG 2.2 AA"
  min_contrast_normal: 4.5
  min_contrast_large: 3.0
  focus_ring_width: "2px"
---

# Operon Design System & Convio Reference Analysis

## 1. Reference Inspection & Measured Observations (Convio.dev)

The live production website `https://convio.dev/` was inspected via headless Google Chrome 155 across 1440px desktop and 375px mobile viewports.

### A. Typographic Hierarchy
- **Measured Font Family:** `"Inter Display"` for display headlines and `"Inter"` for body prose, with system sans-serif fallbacks.
- **Hero H1:** Measured at 56px to 64px on desktop with tight letter-spacing (`-0.03em`) and line-height of 1.08. Mobile scales smoothly down to 36px.
- **Section Headings (H2):** Measured at 36px to 44px with letter-spacing of `-0.02em`.
- **Editorial Statements:** Measured at 24px to 28px (`rgba(255, 255, 255, 0.75)`) with line-height of 1.45.
- **Code & Telemetry:** Monospace font for CLI commands, JSON manifests, and function call indicators.

### B. Color, Lighting & Surface Materials
- **Canvas Base:** Pitch black/obsidian (`#0a0a0b` / rgb(10, 10, 11)) with subtle layered dark radial gradients.
- **Surface Elevation:** Card containers utilize deep charcoal surfaces (`#121316` / `#16171b`) bounded by ultra-thin hairline borders (`rgba(255, 255, 255, 0.08)`).
- **Text Layers:** Three explicit tiers of white:
  - Full white (`#ffffff`) for titles, hero copy, and active controls.
  - 75% white (`rgba(255, 255, 255, 0.75)`) for descriptions and editorial body text.
  - 45% white (`rgba(255, 255, 255, 0.45)`) for metadata, pill badges, and secondary labels.
- **Status Anchors:** Muted emerald green (`#10b981` / `#19854f`) for active states and amber (`#f59e0b` / `#d97706`) for human review gates.
- **Primary CTA:** Solid high-contrast white pill (`#ffffff`) with black text (`#0a0a0b`).

### C. Layout & Composition
- **Navigation:** Fixed header with `backdrop-filter: blur(14px)`, logo on left, centered links, and right pill button.
- **Hero Composition:** Vertically centered announcement badge $\rightarrow$ H1 headline $\rightarrow$ subtitle $\rightarrow$ CTA pill $\rightarrow$ prominent interactive interface preview card.
- **Grid Structure:** Max-width 1280px container with 24px horizontal gutters on desktop and 16px on mobile.
- **Architectural Stepper:** 4-stage segmented tab navigation (`Connect`, `Contract`, `Execute`, `Approve`) controlling a rich multi-pane product preview.

### D. Measured Motion & Scroll Choreography
- **Entrance Keyframe (`cv-in`):**
  - Trigger: Element enters viewport via scroll intersection.
  - Initial State: `opacity: 0; transform: translateY(12px);`
  - Final State: `opacity: 1; transform: translateY(0);`
  - Duration: `0.5s` (500ms).
  - Timing Function: `cubic-bezier(.16, 1, .3, 1)` (spring-damped deceleration).
  - Sequencing: Cascade delay (0.08s to 0.15s per consecutive child).
- **Hover Transitions:**
  - Navigation links: `color 0.4s cubic-bezier(.44, 0, .56, 1)`.
  - Buttons & Cards: `border-color 0.25s ease, background-color 0.25s ease, transform 0.25s cubic-bezier(.16, 1, .3, 1)`.
- **Reduced Motion:** Verified presence of `@media (prefers-reduced-motion: reduce)`. When active, all transforms, translateY offsets, and transitions must be zeroed to prevent vestibular discomfort.

---

## 2. Operon Showcase Architecture

Pure SaaS translates these craft principles into **Operon**, an original engineering control plane:
1. **Hero Interface Demo:** Interactive agent console showing real-time capability negotiation, schema contract retrieval, and a live production release approval modal.
2. **4-Stage Architectural Stepper:** Working tabs (`1. Gateway`, `2. Contract`, `3. Sandbox`, `4. Release Gate`) that update code and visual mockups on click or keyboard navigation.
3. **Pillar Feature Cards:** High-density breakdown of capability routing, contract compliance, and audit trails.
4. **Interactive Release Approval Modal:** User can click "Approve Release" to see the live status change to "Released to Production · Cryptographic Sign-Off Verified".
5. **Accessibility & Reduced Motion:** Full keyboard `:focus-visible` rings, ARIA roles, and zero-motion fallback.

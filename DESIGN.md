---
name: "Pure SaaS Generated Design System"
version: "1.0.0"
status: "approved"
product_archetype: "SaaS (General)"
style_archetype: "Minimalism & Swiss Style"
dials:
  variance: 6
  motion: 5
  density: 6
tokens:
  colors:
    color-bg-canvas: "#F8FAFC"
    color-bg-surface: "#FFFFFF"
    color-bg-surface-elevated: "#ffffff"
    color-bg-surface-sunken: "#E9EFF8"
    color-text-primary: "#1E293B"
    color-text-secondary: "#475569"
    color-text-muted: "#a1a1aa"
    color-text-inverse: "#FFFFFF"
    color-action-primary: "#2563EB"
    color-action-hover: "#2563EB"
    color-action-active: "#1E293B"
    color-border-subtle: "#E2E8F0"
    color-border-strong: "#a1a1aa"
    color-border-focus: "#2563EB"
    color-status-success: "#16a34a"
    color-status-warning: "#d97706"
    color-status-error: "#DC2626"
    color-status-info: "#EA580C"
  typography:
    font_families:
      sans: "Open Sans"
      heading: "Poppins"
      mono: "JetBrains Mono, monospace"
    scale:
      h1: "2.5rem"
      h2: "1.75rem"
      h3: "1.25rem"
      body: "1rem"
      body_small: "0.875rem"
      label: "0.75rem"
  spacing:
    space-1: "4px"
    space-2: "8px"
    space-4: "16px"
    space-6: "24px"
    space-8: "32px"
  layout:
    container_max_width: "1280px"
    content_max_width: "65ch"
  radii:
    none: "0"
    sm: "4px"
    md: "8px"
    lg: "12px"
  motion:
    duration-fast: "100ms"
    duration-normal: "200ms"
    easing-standard: "cubic-bezier(0.2, 0.8, 0.2, 1)"
principles:
  - "Purposeful clarity over decorative excess."
  - "Direct manipulation and responsive optical feedback."
  - "Strict anti-slop discipline: zero generic purple/cyan gradients and no emoji icons."
accessibility:
  tier: "WCAG 2.2 AA"
  min_touch_target: "44px"
  focus_ring_width: "2px"
unresolved:
  - "Verify color contrast on brand primary against customized dark mode theme."
  - "Confirm whether data tables require fixed or fluid column widths on mobile viewports."
---

# Pure SaaS Generated Design System

## 1. Product & Direction Overview
- **Product Archetype:** SaaS (General)
- **Style Archetype:** Minimalism & Swiss Style
- **Design Dials:** Variance 6/10 | Motion 5/10 | Density 6/10 (Natural Apple-grade responsive easing)

## 2. Precedence Hierarchy
1. User's explicit requirements and brand design system.
2. Platform conventions (Apple HIG / Web standards) and WCAG 2.2 AA.
3. Verified project tokens in DESIGN.md.
4. Retrieved guidelines from integrated intelligence catalog.
5. New proposals (must be flagged as proposals).

## 3. Interaction States (8-State Matrix)
All interactive controls implement:
- Default, Hover, Focus-Visible, Active/Pressed, Disabled, Loading, Error, and Success.

## 4. Anti-Slop Discipline
- No generic gradient mesh backgrounds.
- No transparent clip-text gradient titles.
- No emoji icons in buttons or navigation.
- No unmapped Tailwind utility color classes.

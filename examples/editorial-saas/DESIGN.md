---
name: "Monograph Design System"
version: "1.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#faf9f5"
    color-bg-surface: "#f4f1ea"
    color-bg-surface-elevated: "#ffffff"
    color-bg-surface-sunken: "#ebe7dd"
    color-text-primary: "#1c1917"
    color-text-secondary: "#57534e"
    color-text-muted: "#78716c"
    color-text-inverse: "#faf9f5"
    color-action-primary: "#14532d"
    color-action-hover: "#166534"
    color-action-active: "#15803d"
    color-border-subtle: "#e7e2d6"
    color-border-strong: "#a8a29e"
    color-border-focus: "#14532d"
    color-status-success: "#15803d"
    color-status-warning: "#b45309"
    color-status-error: "#b91c1c"
    color-status-info: "#0369a1"
  typography:
    font_families:
      sans: "Instrument Sans, -apple-system, sans-serif"
      serif: "Newsreader, Georgia, 'Times New Roman', serif"
      mono: "Berkeley Mono, Menlo, monospace"
      display: "Newsreader, Georgia, serif"
    scale:
      display: "3.75rem" # 60px
      h1: "2.75rem"      # 44px
      h2: "2rem"         # 32px
      h3: "1.375rem"     # 22px
      body: "1.0625rem"  # 17px
      body_small: "0.875rem" # 14px
      label: "0.875rem"  # 14px
      metadata: "0.75rem"# 12px
      code: "0.875rem"   # 14px
    line_heights:
      tight: "1.15"
      normal: "1.65"
    tracking:
      tighter: "-0.02em"
      normal: "0"
  spacing:
    space-1: "0.25rem" # 4px
    space-2: "0.5rem"  # 8px
    space-3: "0.75rem" # 12px
    space-4: "1rem"    # 16px
    space-6: "1.5rem"  # 24px
    space-8: "2rem"    # 32px
    space-12: "3rem"   # 48px
    space-16: "4rem"   # 64px
    space-24: "6rem"   # 96px
  layout:
    container_max_width: "72rem" # 1152px
    content_max_width: "42rem"   # 672px (~65ch optimal reading measure)
  radii:
    none: "0"
    sm: "0.125rem" # 2px
    md: "0.25rem"  # 4px
    lg: "0.375rem" # 6px
    full: "9999px"
principles:
  - "Reading comfort and typographic hierarchy take precedence over UI chrome."
  - "Whitespace is an active structural element, not empty space to fill with cards."
  - "Serif literary elegance paired with precision-engineered annotations."
components:
  button:
    variants: ["primary", "secondary", "ghost"]
    states: ["default", "hover", "focus-visible", "active", "disabled"]
    geometry: "height: 38px, padding-x: 16px, radius: 4px"
accessibility:
  tier: "WCAG 2.2 AA"
  contrast_text_primary: "15.4:1 (Passes AAA)"
  contrast_text_secondary: "6.8:1 (Passes AA)"
  reduced_motion: "Instantaneous transitions with zero parallax or movement"
---

# Monograph Design System
Archival editorial restraint and reading immersion.

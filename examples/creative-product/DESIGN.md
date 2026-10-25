---
name: "FrameCraft Design System"
version: "1.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#121214"
    color-bg-surface: "#1a1a1e"
    color-bg-surface-elevated: "#26262b"
    color-bg-surface-sunken: "#09090b"
    color-text-primary: "#ffffff"
    color-text-secondary: "#a1a1aa"
    color-text-muted: "#71717a"
    color-text-inverse: "#121214"
    color-action-primary: "#f59e0b"
    color-action-hover: "#d97706"
    color-action-active: "#b45309"
    color-border-subtle: "#27272e"
    color-border-strong: "#3f3f46"
    color-border-focus: "#f59e0b"
    color-status-success: "#10b981"
    color-status-warning: "#f59e0b"
    color-status-error: "#ef4444"
    color-status-info: "#6366f1"
  typography:
    font_families:
      sans: "Cabinet Grotesk, -apple-system, sans-serif"
      mono: "JetBrains Mono, monospace"
      display: "Cabinet Grotesk, sans-serif"
    scale:
      display: "4rem"    # 64px
      h1: "2.75rem"      # 44px
      h2: "2rem"         # 32px
      h3: "1.375rem"     # 22px
      body: "1rem"       # 16px
      body_small: "0.875rem" # 14px
      label: "0.875rem"  # 14px
      metadata: "0.75rem"# 12px
      code: "0.875rem"   # 14px
    line_heights:
      tight: "1.08"
      normal: "1.5"
    tracking:
      tighter: "-0.035em"
      normal: "0"
  spacing:
    space-1: "0.25rem" # 4px
    space-2: "0.5rem"  # 8px
    space-3: "0.75rem" # 12px
    space-4: "1rem"    # 16px
    space-6: "1.5rem"  # 24px
    space-8: "2rem"    # 32px
    space-16: "4rem"   # 64px
    space-24: "6rem"   # 96px
  layout:
    container_max_width: "88rem" # 1408px
    content_max_width: "52rem"   # 832px
  radii:
    none: "0"
    sm: "0.25rem"
    md: "0.375rem"
    lg: "0.5rem"
    full: "9999px"
principles:
  - "Expressive typography paired with expansive media canvases."
  - "Studio-grade neutral backgrounds to preserve color grading accuracy."
  - "Tactile timeline feedback and responsive scrubbing."
components:
  button:
    variants: ["primary", "secondary", "ghost"]
    states: ["default", "hover", "focus-visible", "active", "disabled"]
    geometry: "height: 42px, padding-x: 18px, radius: 8px"
accessibility:
  tier: "WCAG 2.2 AA"
  contrast_text_primary: "18.1:1 (Passes AAA)"
  contrast_text_secondary: "6.2:1 (Passes AA)"
  reduced_motion: "Disable timeline scrub animations and dynamic zooms"
---

# FrameCraft Design System
Expressive creative sequencing studio.


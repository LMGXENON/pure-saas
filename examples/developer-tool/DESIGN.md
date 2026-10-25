---
name: "HyperTrace Design System"
version: "1.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#0c0d0e"
    color-bg-surface: "#151719"
    color-bg-surface-elevated: "#1f2226"
    color-bg-surface-sunken: "#050607"
    color-text-primary: "#f9fafb"
    color-text-secondary: "#9ca3af"
    color-text-muted: "#6b7280"
    color-text-inverse: "#0c0d0e"
    color-action-primary: "#fa5d29"
    color-action-hover: "#ea580c"
    color-action-active: "#c2410c"
    color-border-subtle: "#26282c"
    color-border-strong: "#374151"
    color-border-focus: "#fa5d29"
    color-status-success: "#10b981"
    color-status-warning: "#f59e0b"
    color-status-error: "#ef4444"
    color-status-info: "#3b82f6"
  typography:
    font_families:
      sans: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      mono: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    scale:
      display: "3.25rem" # 52px
      h1: "2.5rem"      # 40px
      h2: "1.75rem"     # 28px
      h3: "1.25rem"     # 20px
      body: "1rem"       # 16px
      body_small: "0.875rem" # 14px
      label: "0.875rem"  # 14px
      metadata: "0.75rem"# 12px
      code: "0.875rem"   # 14px
    line_heights:
      tight: "1.15"
      normal: "1.5"
    tracking:
      tight: "-0.025em"
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
    container_max_width: "80rem" # 1280px
    content_max_width: "48rem"   # 768px
  radii:
    none: "0"
    sm: "0.25rem"
    md: "0.375rem"
    lg: "0.5rem"
    full: "9999px"
principles:
  - "Evidence before assertion: show real eBPF latency traces in the hero."
  - "Zero generic gradient blobs; let the typography and code carry visual authority."
  - "Monospace precision for metrics, timestamps, and kernel hooks."
components:
  button:
    variants: ["primary", "secondary", "ghost"]
    states: ["default", "hover", "focus-visible", "active", "disabled"]
    geometry: "height: 40px, padding-x: 16px, radius: 6px"
accessibility:
  tier: "WCAG 2.2 AA"
  contrast_text_primary: "16.5:1 (Passes AAA)"
  contrast_text_secondary: "5.6:1 (Passes AA)"
  reduced_motion: "Disable all terminal typing simulations and transitions"
---

# HyperTrace Design System

Technical clarity and developer-focused composition.

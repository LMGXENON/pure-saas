---
name: "VaultGuard Design System"
version: "2.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#0b0f19"
    color-bg-surface: "#111827"
    color-bg-surface-elevated: "#1f2937"
    color-bg-surface-sunken: "#030712"
    color-text-primary: "#f9fafb"
    color-text-secondary: "#9ca3af"
    color-text-muted: "#6b7280"
    color-text-inverse: "#0b0f19"
    color-action-primary: "#3b82f6"
    color-action-hover: "#2563eb"
    color-action-active: "#1d4ed8"
    color-border-subtle: "#1f2937"
    color-border-strong: "#374151"
    color-border-focus: "#3b82f6"
    color-status-success: "#10b981"
    color-status-warning: "#f59e0b"
    color-status-error: "#ef4444"
    color-status-info: "#3b82f6"
  typography:
    font_families:
      sans: "Inter, -apple-system, sans-serif"
      mono: "JetBrains Mono, monospace"
    scale:
      display: "3rem"     # 48px
      h1: "2.25rem"      # 36px
      h2: "1.5rem"       # 24px
      h3: "1.125rem"     # 18px
      body: "0.9375rem"  # 15px
      body_small: "0.8125rem" # 13px
      label: "0.8125rem" # 13px
      metadata: "0.75rem"# 12px
      code: "0.8125rem"  # 13px
    line_heights:
      tight: "1.2"
      normal: "1.5"
    tracking:
      tight: "-0.015em"
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
    container_max_width: "80rem" # 1280px
    content_max_width: "48rem"   # 768px
  radii:
    none: "0"
    sm: "0.25rem"
    md: "0.375rem"
    lg: "0.5rem"
    full: "9999px"
principles:
  - "Preserve all existing backend API contracts and authentication middleware."
  - "High-contrast auditability for cryptographic credentials and timestamps."
  - "Zero unapproved cosmetic churn in operational consoles."
components:
  button:
    variants: ["primary", "secondary", "ghost", "destructive"]
    states: ["default", "hover", "focus-visible", "active", "disabled"]
    geometry: "height: 36px, padding-x: 14px, radius: 6px"
accessibility:
  tier: "WCAG 2.2 AA"
  contrast_text_primary: "16.1:1 (Passes AAA)"
  contrast_text_secondary: "5.5:1 (Passes AA)"
  reduced_motion: "Instantaneous state transitions"
---

# VaultGuard Design System
Security-first operational design system.


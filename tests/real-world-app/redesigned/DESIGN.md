---
name: "Acme Cloud Console Design System"
version: "1.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#0b0f17"
    color-bg-surface: "#111827"
    color-bg-surface-elevated: "#1f2937"
    color-bg-surface-sunken: "#080c12"
    color-text-primary: "#f9fafb"
    color-text-secondary: "#9ca3af"
    color-text-muted: "#6b7280"
    color-text-inverse: "#0b0f17"
    color-text-on-action: "#ffffff"
    color-action-primary: "#2563eb"
    color-action-hover: "#1d4ed8"
    color-action-active: "#1e40af"
    color-border-subtle: "#1f2937"
    color-border-strong: "#374151"
    color-border-focus: "#60a5fa"
    color-status-success: "#10b981"
    color-status-warning: "#f59e0b"
    color-status-error: "#ef4444"
    color-status-info: "#3b82f6"
  typography:
    font_families:
      sans: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      mono: "'Geist Mono', 'SF Mono', Consolas, Menlo, monospace"
    scale:
      h1: "1.75rem"
      h2: "1.25rem"
      h3: "1.125rem"
      body: "0.9375rem"
      body_small: "0.8125rem"
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
  layout:
    container_max_width: "1180px"
    content_max_width: "800px"
  radii:
    none: "0px"
    sm: "4px"
    md: "6px"
    lg: "8px"
principles:
  - "Functional Clarity: High-density, calm visual rhythm with tabular numbers for currency and counts."
  - "Robust Accessibility: WCAG 2.2 AA compliant contrast and 2px focus-visible rings."
accessibility:
  tier: "WCAG 2.2 AA"
  min_contrast_normal: 4.5
  min_contrast_large: 3.0
  focus_ring_width: "2px"
---

# Acme Cloud Console Design System

## Visual & Craft Hierarchy
- **Canvas:** Deep dark technical background (`#0b0f17`) with elevated surface containers (`#111827`, `#1f2937`).
- **Typography:** Tabular figures enabled on financial metrics, invoice IDs, and user counts.
- **Interactions:** Explicit 2px focus-visible rings with 3:1 contrast against dark surfaces.
- **Anti-Slop:** No decorative glowing blobs or gradient text. Clean, crisp borders and high-density tabular hierarchy.

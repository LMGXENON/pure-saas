---
name: "Zenith Notes macOS Desktop Application"
version: "1.0.0"
status: "approved"
product_archetype: "macOS Desktop Productivity Application"
style_archetype: "Apple HIG Native macOS"
dials:
  variance: 4
  motion: 7
  density: 8
tokens:
  colors:
    color-bg-canvas: "#1E1E1E"
    color-bg-surface: "#252526"
    color-bg-surface-elevated: "#2D2D30"
    color-bg-surface-sunken: "#181818"
    color-text-primary: "#FFFFFF"
    color-text-secondary: "#A6A6A6"
    color-text-muted: "#767676"
    color-text-inverse: "#1E1E1E"
    color-text-on-action: "#FFFFFF"
    color-action-primary: "#0A84FF"
    color-action-hover: "#409CFF"
    color-action-active: "#0064D6"
    color-border-subtle: "#333333"
    color-border-strong: "#484848"
    color-border-focus: "#0A84FF"
    color-status-error: "#FF453A"
    color-status-warning: "#FF9F0A"
    color-status-success: "#32D74B"
  typography:
    font_families:
      sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif"
      mono: "'SF Mono', Menlo, Monaco, Consolas, monospace"
    scale:
      h1: "1.5rem"
      h2: "1.125rem"
      h3: "0.9375rem"
      body: "0.8125rem"
      body_small: "0.75rem"
      label: "0.6875rem"
  spacing:
    space-1: "4px"
    space-2: "8px"
    space-3: "12px"
    space-4: "16px"
    space-6: "24px"
    space-8: "32px"
    space-12: "48px"
    space-16: "64px"
  layout:
    container_max_width: "1280px"
    content_max_width: "900px"
  radii:
    none: "0px"
    sm: "4px"
    md: "6px"
    lg: "10px"
principles:
  - "Clarity: Text is legible at every size, icons are precise SF-style glyphs, and decorations are unobtrusive."
  - "Deference: Fluid, physics-based motion and clean typography keep the primary focus on the user's content."
  - "Depth: Subtle translucent materials and layered hierarchy provide vitality without visual noise."
accessibility:
  tier: "WCAG 2.2 AA"
  min_contrast_normal: 4.5
unresolved: []
---

# Zenith Notes macOS Application Specification

## Overview
Zenith Notes is a desktop productivity application built strictly according to Apple Human Interface Guidelines.
It features a three-pane macOS window: an expandable translucent sidebar with SF Symbols glyphs, a segmented
note list with live search filtering, and an active markdown editor canvas.

## Apple HIG Conformance Matrix
- **Window Controls:** Left-aligned traffic light indicators (close, minimize, zoom) with authentic macOS metrics.
- **Sidebars:** Apple HIG translucent navigation list with group headers and selection highlights.
- **Toolbars:** Standard unified toolbar containing search field and segmented filter controls.
- **Typography:** Apple system font hierarchy with SF Pro Text optical tracking.
- **Keyboard Access:** Full keyboard shortcut binding (Cmd+F search focus, Cmd+N new note creation, arrow key traversal).

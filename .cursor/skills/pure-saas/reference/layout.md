# Layout: Spatial Rhythm, Asymmetric Balance & Grid Containment

Use `/pure-saas layout [target]` to fix awkward spacing, unbalanced containers, poor rhythm, and visual alignment defects across viewports.

---

## 1. The 8pt Spatial Grid

Pure SaaS enforces an 8pt spatial grid scale for all margins, padding, and layout dimensions:
- `4px` (`0.25rem`): Micro-spacing (icon to text, tight chip padding).
- `8px` (`0.5rem`): Component internal padding, compact form gaps.
- `12px` (`0.75rem`): Standard button vertical/horizontal padding.
- `16px` (`1.0rem`): Card internal padding, small list item gaps.
- `24px` (`1.5rem`): Grid gaps, card group separation.
- `32px` (`2.0rem`): Sub-section spacing, column gutter.
- `48px` (`3.0rem`): Section header to section content.
- `64px`–`96px` (`4.0rem`–`6.0rem`): Major section boundaries.

**Rule of Vertical Rhythm:** There must strictly be more whitespace *above* a heading than *below* it. A heading belongs to the content that follows it, not to the section preceding it.

---

## 2. Container Consistency

Inconsistent container widths across sections make pages look amateur.
- Establish **one shared content container** with consistent maximum width and responsive horizontal padding:
  - Max Width: `max-w-6xl` (`1152px`) or `max-w-7xl` (`1280px`).
  - Mobile Padding: `px-4` (`16px`) or `px-6` (`24px`).
  - Desktop Padding: `px-8` (`32px`).
- Keep section backgrounds full-width where appropriate (e.g., alternating canvas to surface), but align inner content strictly to the shared container.
- Align the navbar, hero, feature spotlights, pricing grid, FAQ, and footer to the exact same outer grid boundaries.

---

## 3. Asymmetric Visual Weight

Symmetrical, uniform 3-card grids feel static and templated. Introduce purposeful visual weight:
- **60/40 Split Hero:** 60% width dedicated to value proposition and core CTA; 40% dedicated to live interactive UI or 3D canvas.
- **Spotlight + Rail:** One large primary card spotlighting a flagship capability (occupying 2 columns), paired with stacked secondary cards.
- **Alternating Directional Anchors:** Zig-zag narrative blocks with alternating image/copy alignment, maintaining strict vertical grid rhythm.

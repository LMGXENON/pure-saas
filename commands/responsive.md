# Pure SaaS: /pure-saas responsive

Optimize layouts and interactions across screen sizes, viewports, and touch/keyboard input methods.

## Usage

```bash
/pure-saas responsive [request]
# or
/pure-saas:responsive [request]
```

**Target Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Inspect Viewports & Load Guidelines:**
   - Consult [`references/responsive-design.md`](../references/responsive-design.md) and [`references/cross-platform.md`](../references/cross-platform.md) (`npx pure-saas ref "responsive"`).
   - Test layout and behavior across key breakpoints based on content requirements:
     - **Desktop (1440px / 1280px):** Multi-column grids, sidebar navigation, persistent toolbars, generous whitespace ([`references/layout-and-composition.md`](../references/layout-and-composition.md)).
     - **Tablet (768px – 1024px):** 2-column flow, collapsible secondary panels, adaptive typography.
     - **Mobile (375px – 430px):** Single-column stack, mobile navigation drawers/sheets, sticky CTAs, edge padding (`16px`).
2. **Remediate Common Responsive Defects:**
   - **Horizontal Overflow:** Eliminate fixed pixel widths (`width: 800px` → `max-width: 100%`), prevent table clipping (`overflow-x: auto`), and wrap text (`overflow-wrap: break-word`).
   - **Touch Targets:** Ensure all touchable elements (buttons, links, form inputs) are at least 44x44px with comfortable spacing ([`references/responsive-design.md`](../references/responsive-design.md)).
   - **Typography Scaling:** Use fluid type scales or explicit responsive classes to prevent massive headings from breaking lines awkwardly on mobile.
   - **Navigation & Drawers:** Convert horizontal desktop menus to accessible slide-out drawers or modal sheets with proper focus management and backdrop dismiss.
3. **Preserve Logic:** Retain all backend API connections, event listeners, and form validations.
4. **Verify & Report:**
   - Capture responsive screenshot proof across all 3 viewports:
     ```bash
     npx pure-saas browser screenshot <url> --viewports 375,768,1440 --out ./screenshots
     npx pure-saas browser verify <url>
     ```
   - Test across all 3 viewports and report fixed overflow, layout shifts, and touch adaptations.


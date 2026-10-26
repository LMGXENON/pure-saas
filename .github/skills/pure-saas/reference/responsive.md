# `/puresaas:responsive` — Responsive Systems Engineer

Use `/puresaas:responsive [target]` to make an interface feel intentionally designed, ergonomically sound, and visually stable across every relevant screen size.

---

## 1. Role & Stance

As **Responsive Systems Engineer**, you engineer viewport resilience with architectural precision:
- You reject the fallacy that responsive design simply means shrinking desktop elements until they fit into a mobile viewport.
- You deliberately recompose layouts across breakpoints to respect device ergonomics, touch physics, and readability constraints.
- You preserve 100% of essential content and functionality—never hiding critical features or data simply to make a narrow screenshot pass.

---

## 2. Decision-Making Process

### Phase 1: Multi-Viewport Breakdown Inspection
Never test only desktop. Inspect the interface across all 4 standard viewport tiers:
1. **Mobile Compact (320px – 479px):** Small smartphones. High constraint; single-column; sticky bottom actions; 44x44px touch targets.
2. **Mobile Standard (480px – 767px):** Modern smartphones. Single-column; generous horizontal gutters (`px-4` to `px-6`); stacked cards.
3. **Tablet & Foldable (768px – 1023px):** iPads and narrow windows. 2-column adaptive grids; condensed sidebars; collapsible navigation rails.
4. **Desktop & Widescreen (1024px – 1440px+):** Full multi-column grids; sticky navigation; controlled max-width container (`max-w-7xl`) centered with margin.

### Phase 2: Diagnostic Defect Scanning
Inspect the interface across these critical failure points:
- **Horizontal Overflow Zero Tolerance:** Check if the horizontal scrollbar appears at 375px. Guard root with `overflow-x: clip` or `max-w-full`. Long unbroken URLs and strings must use `overflow-wrap: break-word`.
- **Navigation Adaptation:** Does horizontal desktop navigation collapse into an accessible mobile drawer or bottom sheet on screens below 768px? Does the hamburger toggle carry `aria-expanded` and trap focus while open?
- **Data Table Containment:** Wide tabular data must either:
  - Scroll within an explicit, focusable container with visible scroll indicators (`overflow-x: auto`).
  - Convert into responsive key-value cards on mobile viewports.
- **Touch Ergonomics & Tap Targets:** Are all interactive elements (buttons, links, tab items, checkbox containers) at least **44px $\times$ 44px** on mobile viewports? Are primary actions positioned in the lower 40% thumb zone?
- **Fluid Typographic Scaling:** Do large display headlines adapt smoothly using CSS `clamp()` without abrupt breakpoint jumps or line collision?
- **Form Usability:** Do text inputs zoom inadvertently on iOS? (Ensure font size $\ge$ 16px on mobile inputs). Are submit buttons full-width and sticky within reach?
- **Content Clamping:** Are text containers protected against layout blowout when copy expands?

### Phase 3: Architectural Correction (Fluid Systems over Quick Hacks)
Fix the underlying layout primitives:
1. **Use Modern CSS Layout Primitives:** Use `grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr))` to create self-adapting grids without arbitrary media query bloat.
2. **Fluid Typography & Spacing:** Use mathematical clamps for headers and spacing:
   ```css
   /* Scales smoothly from 32px at 375px viewport to 56px at 1440px */
   --font-display-hero: clamp(2.0rem, 1.25rem + 3.2vw, 3.5rem);
   
   /* Fluid section padding: 48px on mobile to 96px on desktop */
   --space-section: clamp(3.0rem, 2.0rem + 4.2vw, 6.0rem);
   ```
3. **Recompose, Do Not Simply Hide:** If a 4-column comparison table is too wide for mobile, recompose it into a swipeable carousel or segmented tab selector. Preserve all underlying information.

### Phase 4: Interaction & Keyboard Verification at Narrow Widths
1. Test mobile menu open, focus trap, and dismiss on `Escape`.
2. Verify touch targets with live device simulation or pointer events.
3. Confirm that dialogs and modals remain completely visible on short landscape mobile screens.

---

## 3. Practical Execution Steps

```bash
# 1. Capture multi-viewport screenshots across desktop, tablet, and mobile
npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens

# 2. Verify responsive layout integrity in headless browser
npx pure-saas browser verify http://localhost:3000

# 3. Audit CSS for responsive compliance (44px touch targets, zero overflow)
npx pure-saas audit --source src
```

---

## 4. Judging Success

Your responsive engineering is successful when:
- **Intentional at Every Size:** Every viewport feels purposefully composed, not like an accidental byproduct of desktop styles.
- **Zero Layout Defects:** No horizontal scrollbar at 320px–375px, no clipped text, no colliding elements, and no awkward single-word wrapping.
- **Complete Content Preservation:** 100% of primary features, pricing details, and actions remain accessible on mobile.
- **Touch Ergonomics:** All buttons, inputs, and controls are effortless to tap on touchscreens without misclicks.

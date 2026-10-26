# Adapt: Multi-Viewport Responsive Mastery

Use `/pure-saas adapt [target]` or `/pure-saas responsive [target]` to diagnose and fix layout failures across mobile (375px), tablet (768px), laptop (1024px), and wide desktop (1440px+).

---

## 1. Breakpoint Architecture

```
Mobile (375px - 639px):       Single column, full width, drawer/sheet navigation, 44px touch targets
Tablet (768px - 1023px):      2-column adaptive grid, compact navigation rail or header
Laptop (1024px - 1439px):     Standard 3-column or sidebar + content grid
Wide Desktop (1440px+):       Max-width containment (1152px - 1280px), centered with generous gutters
```

---

## 2. Core Responsive Rules

1. **Zero Horizontal Overflow:**
   - At 375px mobile viewport, the horizontal scrollbar must never appear.
   - Guard root layout with `overflow-x: clip` or `max-w-full`.
2. **Mobile Touch Ergonomics:**
   - Primary action buttons must be at least 44x44px and placed within the thumb reach zone (bottom 40% of the screen).
3. **Data Table Adaptation:**
   - Wide tables must either:
     - Wrap in an explicit container with `overflow-x: auto` and a visible scroll indicator.
     - Convert into responsive cards displaying key-value pairs on mobile.
4. **Header to Mobile Navigation:**
   - Desktop horizontal link lists must collapse into an accessible slide-over drawer or bottom sheet on viewports below 768px.
   - The hamburger button must have `aria-expanded` and trap focus while open.

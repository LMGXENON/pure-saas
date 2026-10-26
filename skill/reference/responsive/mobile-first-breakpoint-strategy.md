# Mobile-First Breakpoint Architecture

Designing mobile-first ensures core functionality and critical content are prioritized on constrained viewports before expanding outward.

---

## 1. Responsive Viewports & Architecture

| Viewport / Dimension | Technical Specification |
| :--- | :--- |
| **Mobile (375px - 430px)** | Single column, full-width actions, bottom sheets, 44px minimum touch targets |
| **Tablet (768px - 834px)** | 2-column bento grids, collapsible sidebars, adaptive navigation |
| **Desktop (1024px - 1440px+)** | Multi-column dashboards, persistent side rails, dense data tables |

---

## 2. Code Implementation Reference

```css
/* Standard Responsive Breakpoint Tokens */
--breakpoint-sm: 640px;   /* Small tablets / large phones */
--breakpoint-md: 768px;   /* Tablets portrait */
--breakpoint-lg: 1024px;  /* Tablets landscape / small laptops */
--breakpoint-xl: 1280px;  /* Desktop workstations */
--breakpoint-2xl: 1536px; /* Ultra-wide monitors */
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Write mobile CSS as base styles, layering `@media (min-width: ...)` progressively. | Never rely on desktop-only hover states for essential interactive workflows. |
| Test on actual physical devices or device emulation in DevTools. |  |

---

## 4. Accessibility & Viewport Reflow

- **WCAG 1.4.10 Reflow: Content must reflow down to 320px width without horizontal scrolling.**

---

## 5. Anti-Slop Enforcement

- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.

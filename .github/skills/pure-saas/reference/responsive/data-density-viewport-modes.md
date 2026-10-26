# Data Density & Responsive Viewport Adaptations

Dense data grids must adapt their display density across screen sizes: comfortable spacing on touchscreens, compact high-information density on desktop workstations.

---

## 1. Responsive Viewports & Architecture

| Viewport / Dimension | Technical Specification |
| :--- | :--- |
| **Touch Density Mode** | 48px row heights, generous tap targets, secondary metadata folded into expandable rows |
| **Workstation Compact Mode** | 32px row heights, monospace tabular numerals, 8+ visible columns |

---

## 2. Code Implementation Reference

```css
/* Density CSS class switching */
.table-compact tr { height: 32px; font-size: 12px; }
.table-comfortable tr { height: 48px; font-size: 14px; }
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Allow users to toggle between Compact, Normal, and Comfortable data density modes. | Never force tiny 10px fonts on mobile touchscreens to simulate desktop tables. |
| Default to comfortable density on touch-first viewports. |  |

---

## 4. Accessibility & Viewport Reflow

- **Maintain legible contrast and visible focus rings in both density modes.**

---

## 5. Anti-Slop Enforcement

- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.

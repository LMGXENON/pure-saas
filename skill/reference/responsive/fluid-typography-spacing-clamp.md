# Fluid Typography & Spacing with CSS clamp()

Fluid typography and spacing smoothly scale between mobile and desktop viewport boundaries without abrupt layout jumps.

---

## 1. Responsive Viewports & Architecture

| Viewport / Dimension | Technical Specification |
| :--- | :--- |
| **clamp() Formula** | clamp(min, preferred, max) — e.g. clamp(1rem, 0.8rem + 1vw, 1.5rem) |
| **Fluid Line Heights** | Keep line-height proportional to font-size |
| **Fluid Section Margins** | Section padding expands seamlessly from 48px on mobile to 120px on desktop |

---

## 2. Code Implementation Reference

```css
:root {
  /* Scales continuously from 375px viewport to 1440px viewport */
  --fluid-h1: clamp(2rem, 1.4rem + 2.5vw, 3.5rem);
  --fluid-section-gap: clamp(3rem, 2rem + 4vw, 7.5rem);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use fluid clamp() for hero headings and section vertical padding. | Never let fluid font formulas scale text below 12px on small screens. |
| Anchor minimum values to ensure legibility on 320px screens. |  |

---

## 4. Accessibility & Viewport Reflow

- **Must support user-driven 200% font zoom without truncation.**

---

## 5. Anti-Slop Enforcement

- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.

# Hairline Borders, Separators & Sub-Pixel Sharpness

Thick, muddy borders make interfaces look clumsy. Pure SaaS employs razor-sharp 1px (or 0.5px on Retina/High-DPI displays) hairline dividers.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Sub-Pixel Rendering** | Using box-shadow inset or transform scale for crisp 0.5px lines on 2x displays |
| **Subtle Alpha Separators** | Using alpha-based border colors (`rgba(0,0,0,0.06)` or `rgba(255,255,255,0.08)`) to naturally adapt to varied backgrounds |

---

## 2. Code & Style Implementation

```css
/* Crisp Retina hairline border */
.hairline-b {
  border-bottom: 1px solid var(--color-border-subtle);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .hairline-retina-b {
    position: relative;
  }
  .hairline-retina-b::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-border-subtle);
    transform: scaleY(0.5);
    transform-origin: bottom;
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use alpha borders (`rgba(...)`) so dividing rules blend seamlessly across dynamic surfaces. | Avoid high-contrast harsh solid black borders around every element. |
| Prefer `box-shadow: inset 0 0 0 1px ...` when border widths might cause box-sizing layout shifts. |  |

---

## 4. Accessibility & Performance Verification

- **Interactive form control borders must still meet WCAG 3:1 contrast requirements.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.

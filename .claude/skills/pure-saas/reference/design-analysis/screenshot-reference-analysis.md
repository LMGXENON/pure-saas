# Screenshot Reference Deconstruction & Visual Decomposition

Deconstructing visual references requires breaking flat screenshots into their fundamental layers: canvas backgrounds, spatial containers, elevation shadows, typography hierarchies, and interactive affordances.

---

## 1. Core Dimensions & Methodology

| Dimension | Technical Detail |
| :--- | :--- |
| **Layer Separation** | Separate background canvases, elevation cards, borders, typography, and foreground controls |
| **Color Palette Sampling** | Sample hex values from uncompressed areas to extract surface, text, and accent tokens |
| **Hierarchy Mapping** | Identify the visual focal point and the primary path of user attention |

---

## 2. Implementation & Extraction Reference

```javascript
// 16-Section DESIGN.md Extraction Workflow
1. Capture reference at 1440px (desktop), 768px (tablet), and 375px (mobile).
2. Sample canvas background, elevated card surface, and border colors.
3. Measure primary heading, subheading, and body font sizes and line heights.
4. Document spatial padding and grid gap values.
5. Record component corner radii (R_outer, R_inner).
6. Author formal 16-section DESIGN.md specification before implementation.
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Analyze reference screenshots across desktop, tablet, and mobile breakpoints. | Never guess colors from a low-resolution compressed thumbnail. |
| Check if backgrounds use subtle noise, gradients, or ambient canvas shaders. |  |

---

## 4. Accessibility & Verification

- **Verify that extracted color pairings meet WCAG AA contrast before using them in code.**

---

## 5. Anti-Slop Enforcement

- Never guess or approximate when live DOM styles or computed CSS variables can be directly verified.

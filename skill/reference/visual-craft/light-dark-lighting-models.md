# Light & Dark Lighting Models: Elevation vs Self-Illumination

Light mode mimics overhead directional sunlight casting downward shadows. Dark mode mimics an environment where surfaces emit subtle luminescence and borders reveal edges.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Light Mode Lighting** | Overhead key light, soft ambient occlusion, shadows scale with elevation |
| **Dark Mode Lighting** | Surfaces get lighter as they elevate (slate-950 -> slate-900 -> slate-800), borders illuminate edges |

---

## 2. Code & Style Implementation

```css
/* Lighting model token definitions */
:root {
  --surface-base: #f9fafb;
  --surface-card: #ffffff;
  --surface-elevated: #ffffff;
  --border-light: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  /* Elevated surfaces get progressively lighter */
  --surface-base: #09090b;
  --surface-card: #141418;
  --surface-elevated: #1e1e24;
  --border-light: rgba(255, 255, 255, 0.1);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Elevate dark mode cards by increasing surface lightness rather than trying to cast black shadows on a black canvas. | Never invert colors with a naive CSS `filter: invert(1)`. |
| Use 1px light border rings (`rgba(255,255,255,0.08)`) to delineate dark card boundaries. |  |

---

## 4. Accessibility & Performance Verification

- **Ensure WCAG contrast holds true across both lighting modes.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.

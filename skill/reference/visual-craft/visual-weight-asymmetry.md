# Visual Weight, Composition Asymmetry & Focal Control

Symmetrical grids often become monotonous and visually boring. Asymmetric layouts create intentional tension that guides user attention to high-value focal points.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **60/40 Composition** | Dominant content area paired with supporting secondary panel |
| **Scale Contrast** | Juxtaposing an oversized metric against tight, dense tabular data |
| **Generous Negative Space** | Empty margin acts as an optical spotlight around critical actions |

---

## 2. Code & Style Implementation

```css
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
  <div className="lg:col-span-7">
    {/* Dominant focus section with large headline and primary CTA */}
  </div>
  <div className="lg:col-span-5">
    {/* Secondary supporting proof or interactive preview */}
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Vary card sizes in a bento grid based on information importance rather than rigid equal splits. | Avoid 4 consecutive rows of identical 3-column cards. |
| Use negative space to give primary CTAs breathing room. |  |

---

## 4. Accessibility & Performance Verification

- **Ensure DOM tab order follows logical reading order regardless of visual asymmetry.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.

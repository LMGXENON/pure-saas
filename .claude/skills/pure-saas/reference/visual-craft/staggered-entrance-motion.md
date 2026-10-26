# Staggered Entrance Motion & Cascading Reveals

When lists or grids mount, staggering item reveals by 30-50ms directs eye flow naturally without cognitive overload.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Stagger Offset** | 30ms to 40ms per consecutive child item |
| **Distance Constraint** | Translate distance capped at 8px - 16px to prevent exaggerated jumping |
| **Intersection Observer Gate** | Only trigger animation when elements scroll into active viewport |

---

## 2. Code & Style Implementation

```css
@keyframes revealFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item {
  animation: revealFadeUp 350ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 40ms; }
.stagger-item:nth-child(3) { animation-delay: 80ms; }
.stagger-item:nth-child(4) { animation-delay: 120ms; }
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Cap total stagger sequence duration under 400ms. | Do not stagger more than 8 items in a single view (causes perceived lag). |
| Animate `transform` and `opacity` only (avoid animating layout properties like height or margin). |  |

---

## 4. Accessibility & Performance Verification

- **Set `animation: none !important; opacity: 1 !important; transform: none !important;` under prefers-reduced-motion.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.

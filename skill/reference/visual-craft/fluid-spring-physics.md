# Fluid Spring Physics & Animation Curves

Linear transitions feel mechanical and robotic. Pure SaaS mandates physics-based spring curves that accelerate quickly and decelerate smoothly with natural inertia.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Snappy Spring** | cubic-bezier(0.16, 1, 0.3, 1) — immediate response with silky damping |
| **Bouncy Spring** | cubic-bezier(0.175, 0.885, 0.32, 1.275) — slight playful overshoot for toggles and badges |
| **Exit Curve** | cubic-bezier(0.4, 0, 1, 1) — swift exit acceleration |

---

## 2. Code & Style Implementation

```css
:root {
  --ease-spring-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  --duration-micro: 120ms;
  --duration-tactile: 200ms;
  --duration-panel: 320ms;
}

.button-interactive {
  transition: transform var(--duration-micro) var(--ease-spring-bounce);
}
.button-interactive:active {
  transform: scale(0.97);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use snappy spring curves for UI controls that users click frequently. | Never use `transition: all 0.5s linear` for buttons or modals. |
| Keep interactive micro-interaction durations under 200ms. | Avoid excessive bounce oscillations that delay user focus. |

---

## 4. Accessibility & Performance Verification

- **Always wrap spring animations in `@media (prefers-reduced-motion: no-preference)`.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.

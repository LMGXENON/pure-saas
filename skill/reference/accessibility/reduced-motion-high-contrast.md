# Reduced Motion & Forced High-Contrast Adaptations

Operating system accessibility preferences must be respected: reduced motion for vestibular safety and forced-colors for Windows High Contrast mode.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **prefers-reduced-motion** | Vestibular Protection | Disables parallax, large zooms, and rapid transitions; preserves opacity fades |
| **forced-colors: active** | Windows High Contrast | Enforces system colors (Canvas, CanvasText, Highlight); requires visible borders |

---

## 2. Accessible Implementation Example

```tsx
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (forced-colors: active) {
  .btn-primary {
    border: 1px solid ButtonText;
  }
  .card {
    border: 1px solid CanvasText;
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Ensure 1px solid transparent borders exist on dark surfaces so Windows High Contrast can render them. | Never ignore prefers-reduced-motion for continuous background shader animations. |
| Replace large translations with simple opacity dissolves under reduced motion. |  |

---

## 4. Testing & Verification Protocol

- **WCAG 2.3.3 Animation from Interactions.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

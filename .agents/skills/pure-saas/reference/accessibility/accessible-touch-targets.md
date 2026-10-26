# Accessible Touch Targets & Target Spacing (WCAG 2.5.8)

Users with tremors, motor impairments, or large fingers struggle with crowded buttons. Pure SaaS guarantees adequate physical target sizing.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **2.5.8 Target Size** | WCAG 2.2 Minimum | At least 24x24 CSS pixels, or offset by sufficient space to adjacent targets |
| **Mobile Standard** | Apple HIG / Android | Minimum 44x44pt on iOS; 48x48dp on Android |

---

## 2. Accessible Implementation Example

```tsx
/* Touch target expansion pseudo-element */
.touch-target-sm {
  position: relative;
}
.touch-target-sm::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
  width: 100%;
  height: 100%;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use invisible pseudo-elements (`::before`) to expand clickable hit targets of small 16px icon buttons to 44px. | Never place critical navigation links spaced 2px apart on mobile touch interfaces. |
| Maintain at least 8px margin between adjacent clickable elements. |  |

---

## 4. Testing & Verification Protocol

- **WCAG 2.5.8 Target Size (Minimum).**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

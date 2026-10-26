# Border Radius Geometry & Concentric Corner Nesting

Corner geometry dictates visual softness and hardware alignment. Pure SaaS applies concentric corner mathematics: inner radius must equal outer radius minus padding.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Concentric Nesting Formula** | R_inner = R_outer - Padding | Nested cards and inner badges |
| **Squircle & Continuous Curves** | CSS corner-shape or smooth svg path | macOS/iOS visual parity |
| **Pill Radius (9999px)** | Tags, toggles, badges | Inline metadata |

---

## 2. Code & Configuration Reference

```css
/* Concentric Nesting Calculation */
.outer-card {
  padding: 16px;
  border-radius: 24px; /* R_outer = 24px */
}

.inner-content {
  /* R_inner = 24px - 16px = 8px */
  border-radius: 8px; 
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Apply the concentric nesting formula to prevent awkward mismatched corner gaps. | Never nest an inner element with equal or larger radius than its outer container with padding. |
| Use consistent radius tokens across components (e.g. 8px inputs, 12px cards, 16px modals). |  |

---

## 4. Accessibility & Quality Standards

- **Ensure focus rings closely trace curved element corners.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

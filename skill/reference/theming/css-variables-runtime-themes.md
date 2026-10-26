# CSS Variables Architecture for Runtime Theming

Switching themes via CSS custom properties on the root element enables instant theme switching without re-rendering React trees or downloading new stylesheets.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Zero Hydration Jitter** | CSS variables switch instantly without causing React component remounts |
| **HSL / OKLCH Channel Splitting** | Exposing raw channels allows dynamic opacity tweaks: rgba(var(--color-primary-rgb), 0.15) |

---

## 2. Configuration & Implementation Reference

```css
:root {
  --color-primary-rgb: 37, 99, 235;
}

[data-theme="dark"] {
  --color-primary-rgb: 59, 130, 246;
}

.badge {
  background: rgba(var(--color-primary-rgb), 0.12);
  color: rgb(var(--color-primary-rgb));
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Define semantic CSS custom properties on `:root` and `[data-theme="dark"]`. | Avoid hardcoding inline hex values in JSX elements. |
| Use CSS variables for all border, background, and text colors. |  |

---

## 4. Verification & Testing Standards

- **Instant CSS variable switching prevents flash of unstyled content.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.

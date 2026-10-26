# Tailwind CSS Theme Token Integration

Configuring Tailwind CSS to resolve utility classes directly to semantic CSS variables eliminates arbitrary color classes and enforces design consistency.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Semantic Color Mapping** | Extend theme.colors to map `surface.base` to `var(--color-surface-base)` |
| **Disable Hex Utilities** | Prevent teams from using raw palette classes (bg-blue-600) in component files |

---

## 2. Configuration & Implementation Reference

```css
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--color-surface-base)',
          elevated: 'var(--color-surface-elevated)',
          overlay: 'var(--color-surface-overlay)',
          hover: 'var(--color-surface-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          default: 'var(--color-border-default)',
        }
      }
    }
  }
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Map Tailwind utilities directly to CSS custom properties. | Never allow arbitrary color bracket utilities like `bg-[#0f172a]`. |
| Use semantic class names like `bg-surface-base` and `text-text-primary`. |  |

---

## 4. Verification & Testing Standards

- **Consistent token usage guarantees predictable contrast across all views.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.

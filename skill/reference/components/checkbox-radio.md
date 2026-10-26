# Checkbox and Radio Group Patterns

Checkboxes support multi-selection and binary toggles within forms. Radio buttons handle mutually exclusive single-selection within a defined set. Both demand precise alignment with their labels and generous hit targets.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Unchecked** | 16x16px or 18x18px box/circle, subtle border, transparent background | `var(--color-border-default)` |
| **Checked** | Solid accent background, crisp white checkmark or inner dot | `var(--color-accent-primary)` |
| **Indeterminate** | Horizontal dash indicating partial selection of child elements | `var(--color-accent-primary)` |
| **Focus-Visible** | Offset outer ring with 2px padding, ensuring visibility over both light and dark backgrounds | `var(--color-focus-ring)` |

---

## 2. Implementation Guide

```tsx
import React from 'react';

export const Checkbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}> = ({ id, label, checked, onChange, description }) => {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none group">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className="w-4 h-4 rounded border border-[var(--color-border-default)] bg-[var(--color-surface-base)] peer-checked:bg-[var(--color-accent-primary)] peer-checked:border-[var(--color-accent-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--color-focus-ring)] transition-all duration-150 flex items-center justify-center text-white" />
        <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150 stroke-current stroke-2 fill-none" viewBox="0 0 12 12">
          <polyline points="2 6 5 9 10 3" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-hover)]">{label}</span>
        {description && <span className="text-xs text-[var(--color-text-secondary)]">{description}</span>}
      </div>
    </label>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Expand the clickable hit target to include the full label text. | Never place checkboxes without an associated label element. |
| Use radio groups with role="radiogroup" and fieldset/legend for mutually exclusive choices. | Never shrink radio/checkbox sizes below 16px. |
| Support indeterminate state for parent-child tree checkboxes. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Keyboard: Space toggles checkbox; Arrow keys cycle radio buttons in a group.**
- **WCAG 2.5.8: Target size spacing minimums.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

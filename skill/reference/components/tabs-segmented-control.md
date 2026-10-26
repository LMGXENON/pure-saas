# Tabs & Segmented Control Design Specification

Tabs partition related views under a common context. Segmented controls provide compact, inline toggles for filters or view modes with an animated sliding background pill.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Inactive Tab** | Muted text, transparent background, hover state brings subtle text brightness | `var(--color-text-secondary)` |
| **Active Tab** | High contrast text, sliding background pill or 2px bottom indicator line | `var(--color-text-primary)` |
| **Focus Indicator** | Focus ring surrounding individual tab pill | `var(--color-focus-ring)` |

---

## 2. Implementation Guide

```tsx
import React, { useState } from 'react';

export const SegmentedControl: React.FC<{ options: string[]; value: string; onChange: (v: string) => void }> = ({
  options,
  value,
  onChange
}) => {
  return (
    <div role="tablist" className="inline-flex p-1 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border-subtle)]">
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
              isActive 
                ? 'bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-sm' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use role="tablist", role="tab", and role="tabpanel". | Never use tabs for multi-step sequential wizards (use steppers instead). |
| Support ArrowLeft / ArrowRight to switch between tabs. | Do not wrap tabs onto multiple horizontal rows. |
| Maintain synchronized tabpanel display without unmounting state unless explicitly desired. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WCAG 2.4.7: Visible focus rings on active and inactive tab controls.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

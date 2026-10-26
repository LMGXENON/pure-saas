# Popover and Tooltip Floating Primitives

Tooltips provide brief, non-interactive context on hover/focus. Popovers offer rich, interactive overlays anchored to a trigger element (e.g. date pickers, filter badges).

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Hidden** | Opacity 0, pointer-events: none | `opacity-0` |
| **Visible Tooltip** | Compact dark pill with crisp microtext (11-12px), 200ms enter delay | `var(--color-tooltip-bg)` |
| **Visible Popover** | Layered card container with border and direct arrow indicator, interactive contents | `var(--color-surface-overlay)` |

---

## 2. Implementation Guide

```tsx
import React, { useState } from 'react';

export const Tooltip: React.FC<{ text: string; children: React.ReactElement }> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-neutral-900 rounded shadow-md whitespace-nowrap pointer-events-none z-50 animate-fade-in"
        >
          {text}
        </div>
      )}
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Add 200-300ms hover delay on tooltips to avoid visual flicker during casual mouse movement. | Never put interactive links or buttons inside a tooltip (use popovers). |
| Ensure tooltips close on Escape key press. | Never hide essential information in tooltips that cannot be accessed on mobile touch screens. |
| Keep tooltip content under 80 characters; use popovers for rich interactive content. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **ARIA tooltip role="tooltip" associated via aria-describedby on the trigger.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

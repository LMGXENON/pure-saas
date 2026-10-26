# Sheet & Drawer Primitives

Sheets slide in from screen edges (right on desktop, bottom on mobile) to display secondary inspection views, filters, or context panels while preserving current page state.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Hidden** | Translated 100% off screen | `translate-x-full` |
| **Entering** | Spring slide-in with dim backdrop fade | `var(--motion-ease-spring)` |
| **Open** | Anchored flush to screen edge with high elevation shadow and internal scroll region | `var(--color-surface-overlay)` |

---

## 2. Implementation Guide

```tsx
// Slide-over side sheet component
import React, { useEffect } from 'react';

export const SideSheet: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md h-full bg-[var(--color-surface-base)] border-l border-[var(--color-border-subtle)] shadow-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-[var(--color-surface-hover)]">✕</button>
          </div>
          <div className="mt-4 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use bottom sheet drawers on mobile screens (<640px) with touch swipe-to-dismiss gestures. | Do not trap horizontal scroll gestures inside side sheets. |
| Keep dismiss button clearly visible in header at all times. | Do not hide primary actions behind secondary drawer depths. |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **role="dialog", aria-modal="true", tab trap, ESC key dismissal.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

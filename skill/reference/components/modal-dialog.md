# Modal Dialog & Alert Architectural Guide

Modals interrupt user flow to capture mandatory decisions or display focused tasks. Pure SaaS enforces focus containment, backdrop dimming without excessive blur, and non-destructive escape dismissal.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Closed / Unmounted** | Hidden from DOM or display: none | `N/A` |
| **Opening Transition** | Fade backdrop (150ms) + subtle scale-up 0.96 -> 1.0 (200ms cubic-bezier) | `var(--motion-ease-spring)` |
| **Active Modal** | High elevation surface, 1px subtle boundary border, scroll locked on document body | `var(--color-surface-overlay)` |
| **Closing Transition** | Fade out and scale down (150ms) | `var(--motion-ease-out)` |

---

## 2. Implementation Guide

```tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg p-6 bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl transition-all duration-200 transform scale-100"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
          <h2 id="modal-title" className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus:ring-2 focus:ring-[var(--color-focus-ring)]"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Render into document.body using a React Portal to escape overflow: hidden parents. | Never nest multiple modals on top of each other; use sheets or step flows instead. |
| Lock background scrolling while dialog is active. | Never apply heavy 30px backdrop blurs that degrade mobile frame rates. |
| Trapping focus inside the dialog until closed. |  |
| Restore focus to trigger element when dialog closes. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WAI-ARIA Dialog Pattern: role="dialog", aria-modal="true", aria-labelledby linking to modal title.**
- **Escape key must close the dialog immediately.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

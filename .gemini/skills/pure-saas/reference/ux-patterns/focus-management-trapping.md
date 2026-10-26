# Focus Management, Trapping & Restoration

Proper focus management guarantees that keyboard and screen-reader users can navigate web applications without getting stranded or losing their place after dialog interactions.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Focus Trapping** | Looping Tab and Shift+Tab within active modal dialogs, sheets, or popovers |
| **Initial Focus** | Focusing the first interactive element or title upon dialog mount |
| **Focus Restoration** | Returning document focus to the exact trigger element when an overlay closes |
| **Roving Tabindex** | Managing focus across toolbars, tabs, or grids using arrow keys and tabindex="-1" |

---

## 2. Implementation Guide

```tsx
import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always store document.activeElement before opening overlays to restore focus cleanly. | Never allow Tab focus to leak into the background DOM behind a modal. |
| Ensure the focus ring remains clearly visible on trapped elements. | Do not focus on non-interactive text elements unless necessary for long reading dialogs. |

---

## 4. Accessibility & Interaction Integrity

- **WCAG 2.4.3 Focus Order: Focus moves sequentially and logically.**
- **WCAG 2.4.7 Focus Visible: Focus indicator is never suppressed.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

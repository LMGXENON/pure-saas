# Accordion & Disclosure Patterns

Accordions stack collapsible content panels vertically to conserve viewport real estate and reduce cognitive load, ideal for FAQs, dense inspect panels, and complex filters.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Collapsed** | Header row with title and right-aligned chevron pointing down | `var(--color-border-subtle)` |
| **Expanded** | Chevron smoothly rotates 180deg, content panel expands with height transition | `var(--color-surface-base)` |

---

## 2. Implementation Guide

```tsx
import React, { useState } from 'react';

export const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border-subtle)]">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-text-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-200 text-xs text-[var(--color-text-muted)] ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-xs text-[var(--color-text-secondary)] leading-relaxed animate-fade-in">
          {children}
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
| Use native <button> with aria-expanded attribute for the accordion trigger. | Never hide critical transactional details or legal agreements solely inside collapsed accordions. |
| Allow users to expand multiple sections simultaneously unless business logic strictly forbids it. |  |
| Ensure smooth CSS transition for open/close animation. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WAI-ARIA Accordion Pattern: button controls panel via aria-controls and aria-expanded.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

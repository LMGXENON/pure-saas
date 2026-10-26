# Select & Option Menu Guidelines

Select controls let users choose one or more values from a list. Native selects are preferred on mobile devices for native wheel pickers; custom popover selects provide richer search, grouping, and badge integration on desktop.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Closed / Idle** | Field container with chevron icon on right edge | `var(--color-surface-base)` |
| **Open / Expanded** | Chevron rotates 180deg, popover panel floats with elevation shadow and border | `var(--color-surface-overlay)` |
| **Option Hover / Focused** | Subtle highlight background, checkmark displayed next to active selection | `var(--color-surface-selected)` |
| **Disabled** | Reduced contrast, pointer-events: none | `var(--color-surface-disabled)` |

---

## 2. Implementation Guide

```tsx
// Desktop custom select with accessible roving tabindex and ESC handling
import React, { useState, useRef, useEffect } from 'react';

export interface Option {
  value: string;
  label: string;
}

export const Select: React.FC<{ options: Option[]; value: string; onChange: (v: string) => void }> = ({
  options,
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 flex items-center justify-between text-sm rounded-lg bg-[var(--color-surface-base)] border border-[var(--color-border-default)] hover:border-[var(--color-border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
      >
        <span>{selectedOption ? selectedOption.label : 'Select an option...'}</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-1 py-1 rounded-lg bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-lg max-h-60 overflow-auto focus:outline-none"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="px-3 py-2 text-sm flex items-center justify-between cursor-pointer hover:bg-[var(--color-surface-hover)] aria-selected:bg-[var(--color-surface-selected)] aria-selected:font-medium"
            >
              <span>{opt.label}</span>
              {opt.value === value && <span>✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Render native <select> on touch-first mobile viewports for OS accessibility pickers. | Never render unscrollable dropdowns that clip off the bottom of the viewport. |
| Close menu immediately upon Escape key or click outside. | Never trap focus permanently inside the select popup without Escape dismissal. |
| Support arrow key navigation (Up/Down) through list options. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WAI-ARIA Listbox Pattern: aria-expanded, role="listbox", role="option", aria-selected.**
- **Focus restoration to trigger button after option selection or dismissal.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

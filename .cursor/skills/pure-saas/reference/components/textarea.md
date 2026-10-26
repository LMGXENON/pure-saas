# Textarea & Multi-line Editor Specification

Multi-line inputs accommodate variable-length content such as comments, notes, and code snippets. They require responsive auto-expanding behaviors or clearly bounded scrolling with character counting affordances.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Default** | Balanced vertical padding (10-12px), fixed line-height (1.5), visible resize handle or auto-grow | `var(--color-input-bg)` |
| **Focused** | High contrast ring, helper character counter updates dynamically | `var(--color-focus-ring)` |
| **Overflow / Scroll** | Subtle custom scrollbar matching surface tokens, no jarring gutter popping | `var(--color-scrollbar-thumb)` |
| **Approaching Limit** | Counter turns warning amber at 90% character limit | `var(--color-warning-text)` |

---

## 2. Implementation Guide

```tsx
import React, { useRef, useEffect } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength?: number;
  autoResize?: boolean;
  value?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  maxLength,
  autoResize = true,
  value,
  id,
  onChange,
  className = '',
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentLength = typeof value === 'string' ? value.length : 0;

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-xs font-semibold text-[var(--color-text-secondary)]">{label}</label>
        {maxLength && (
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        ref={textareaRef}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        rows={3}
        className={`w-full p-3 text-sm rounded-lg bg-[var(--color-surface-base)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] resize-none transition-all duration-150 ${className}`}
        {...props}
      />
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide comfortable line-height (1.4-1.6) for legible paragraph entry. | Never lock resize without providing an automatic expansion mechanism. |
| Auto-resize smoothly without jumping the scroll window. | Never hide error messages below the scroll fold of the textarea. |
| Display remaining characters when strict field limits exist. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WCAG 1.4.12: Ensure text spacing can be adjusted by user stylesheet without clipping.**
- **Keyboard: Tab key moves focus to the next field unless inside an intentional code editor.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

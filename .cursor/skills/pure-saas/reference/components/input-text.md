# Text Input & Field Primitives Specification

Text fields allow users to enter, edit, and search textual data. In Pure SaaS, input fields must be calm, predictable, and immediately responsive to keyboard interaction, validation states, and system autofill.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Rest / Default** | Neutral subtle border (1px solid var(--color-border-default)), clean background, legible placeholder with >= 4.5:1 contrast | `var(--color-input-bg)` |
| **Hover** | Border sharpens slightly to var(--color-border-hover), no jumpy box-shadow | `var(--color-border-hover)` |
| **Focused** | Continuous border glow or 2px offset focus ring; label remains visible and anchored | `var(--color-focus-ring)` |
| **Filled** | Primary text color with optional clear affordance button on trailing edge | `var(--color-text-primary)` |
| **Invalid / Error** | Error border (var(--color-danger-border)), helper text switches to error color with icon | `var(--color-danger-base)` |
| **Disabled** | Subtle hatched or dim background, cursor: not-allowed, user-select: none | `var(--color-surface-disabled)` |

---

## 2. Implementation Guide

```tsx
import React, { useId } from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  error,
  leftElement,
  rightElement,
  id: customId,
  disabled,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label htmlFor={inputId} className="text-xs font-semibold tracking-wide text-[var(--color-text-secondary)]">
        {label}
      </label>
      
      <div className="relative flex items-center">
        {leftElement && (
          <div className="absolute left-3 text-[var(--color-text-muted)] pointer-events-none flex items-center">
            {leftElement}
          </div>
        )}
        
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`w-full h-10 px-3 ${leftElement ? 'pl-9' : ''} ${rightElement ? 'pr-9' : ''} text-sm rounded-lg bg-[var(--color-surface-base)] border text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] ${
            error 
              ? 'border-[var(--color-danger-base)] focus:ring-[var(--color-danger-ring)]' 
              : 'border-[var(--color-border-default)] hover:border-[var(--color-border-hover)]'
          } disabled:bg-[var(--color-surface-disabled)] disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute right-3 text-[var(--color-text-muted)] flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-[var(--color-danger-text)] font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[var(--color-text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always connect the <label> element using htmlFor matching the input id. | Never rely solely on placeholders to describe field purpose (placeholders vanish on entry). |
| Bind error messages via aria-describedby and role="alert". | Do not rely solely on color to indicate an invalid state; include an icon or explanatory text. |
| Preserve proper input type attributes (email, tel, url, number) to trigger correct mobile virtual keyboards. | Never disable cut, copy, or paste actions on password or confirmation inputs. |
| Ensure autocomplete attributes are present for authentication, address, and credit card fields. | Never apply generic floating labels that jitter or cause layout reflows. |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WCAG 3.3.1 Error Identification: Any input error must be described to the user in text.**
- **WCAG 1.3.1 Info and Relationships: Programmatic link between label, input, and description.**
- **Color contrast: Input border must have at least 3.0:1 contrast with adjacent surface.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

# Button Component Architecture & Craft Guidelines

Buttons communicate actions that users can take throughout an application. In Pure SaaS, buttons represent tactile, purposeful decision points rather than decorative clickable rectangles. They must balance immediate visual clarity, precise state feedback, and strict accessibility guarantees.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Default** | High contrast surface, crisp 1px border or solid fill, legible label with optical tracking | `var(--color-button-primary-bg)` |
| **Hover** | Subtle luminance elevation (+4% lightness) or subtle backdrop shift, no jarring layout shifts | `var(--color-button-primary-hover)` |
| **Active / Pressed** | Scale transform (scale(0.98)), inset shadow or luminance reduction (-4%) | `var(--color-button-primary-active)` |
| **Focus-Visible** | 2px high-contrast ring with 2px offset, never outline: none without replacement | `var(--color-focus-ring)` |
| **Disabled** | Reduced opacity (0.4-0.5), cursor: not-allowed, pointer-events: none, aria-disabled="true" | `var(--color-button-disabled)` |
| **Loading** | Inline micro-spinner or shimmer, label remains visible or replaced with accessible live text, fixed width preserved | `var(--color-button-loading)` |

---

## 2. Implementation Guide

```tsx
import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-md min-w-[32px]",
    md: "h-10 px-4 text-sm gap-2 rounded-lg min-w-[40px]",
    lg: "h-12 px-5 text-base gap-2.5 rounded-xl min-w-[48px]"
  };

  const variantStyles = {
    primary: "bg-[var(--color-primary-base)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] shadow-sm focus-visible:ring-[var(--color-focus-ring)]",
    secondary: "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] focus-visible:ring-[var(--color-focus-ring)]",
    ghost: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus-visible:ring-[var(--color-focus-ring)]",
    danger: "bg-[var(--color-danger-base)] text-[var(--color-danger-foreground)] hover:bg-[var(--color-danger-hover)] focus-visible:ring-[var(--color-danger-ring)]"
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      
      <span className={isLoading ? "opacity-70" : ""}>{children}</span>
      
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Maintain fixed height across variants to prevent vertical layout jitter. | Never render clickable <div> elements instead of native <button> tags. |
| Preserve the original button bounding box width during loading states. | Avoid generic gradient fills with unreadable white text on light pastel colors. |
| Use semantic <button type="button"> unless submitting an actual <form>. | Never use pure opacity drops without border adjustments in dark mode. |
| Provide visible focus rings that achieve at least 3.0:1 contrast against adjacent background. | Never remove focus-visible indicators without an explicit replacement ring. |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WCAG 2.2 AA Success Criterion 2.5.8: Target size must be at least 24x24px, recommended 44x44px for primary touch interactions.**
- **WCAG 1.4.3: Minimum contrast ratio of 4.5:1 for button text against button surface.**
- **Screen reader support: Loading buttons must indicate state via aria-busy="true" and descriptive accessible label.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

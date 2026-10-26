# Toggle Switch Specification

Switches provide immediate, binary toggles for live settings. Unlike checkboxes that require a form submit button, a switch takes effect immediately upon change.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Off / Inactive** | Track is neutral muted gray, knob resting on left | `var(--color-switch-off)` |
| **On / Active** | Track turns active accent color, knob slides right with spring ease | `var(--color-switch-on)` |
| **Disabled** | Knob and track dim to 40% opacity, unclickable | `var(--color-switch-disabled)` |

---

## 2. Implementation Guide

```tsx
import React from 'react';

export const Switch: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id: string;
}> = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-primary)] cursor-pointer">
        {label}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] ${
          checked ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-surface-muted)]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use switch role="switch" with aria-checked. | Never use switches inside multi-field forms that require a "Submit" or "Cancel" button; use checkboxes instead. |
| Provide instant visual feedback and persist state in the background immediately. | Never omit the text label beside the switch. |
| Use for binary preferences like Dark Mode, Notifications, or Feature Flags. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Space key and Enter key toggle the switch.**
- **Label announcement with current state ("on" or "off").**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

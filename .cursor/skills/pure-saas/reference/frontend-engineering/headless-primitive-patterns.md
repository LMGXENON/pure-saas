# Headless UI Primitives & Separation of Concerns

Separating behavioral state, keyboard interactions, and ARIA attributes from visual styling produces robust, 100% themeable components.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Radix / Ark / React Aria** | Adopt proven headless primitives for difficult accessibility patterns |
| **Unstyled Logic** | Zero default CSS opinions; full freedom to apply Pure SaaS design tokens |
| **Composability** | Supports custom animations, micro-interactions, and frameworks seamlessly |

---

## 2. Code Implementation Reference

```tsx
// Example integrating Radix UI Dialog primitive with Pure SaaS tokens
import * as DialogPrimitive from '@radix-ui/react-dialog';

export function AccessibleDialog({ trigger, title, children }: { trigger: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-2xl">
          <DialogPrimitive.Title className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</DialogPrimitive.Title>
          <div className="mt-4">{children}</div>
          <DialogPrimitive.Close className="absolute top-4 right-4 p-1 rounded-md text-[var(--color-text-muted)] hover:text-white">✕</DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use headless primitives when building accessible dialogs, comboboxes, and popovers. | Never attempt to rewrite full ARIA combobox state machines from scratch without thorough testing. |
| Apply tokenized utility classes onto primitive slots. |  |

---

## 4. Accessibility & Performance Verification

- **Headless primitives handle focus traps, aria attributes, and keyboard listeners out of the box.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.

# Inline Validation & Real-Time Form Error Handling

Inline validation guides users to correct mistakes as early as possible without prematurely nagging them before they finish typing.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Validate on Blur** | Perform format validation after the user leaves the field for the first time |
| **Re-validate on Change** | Once marked invalid, validate on keystroke so error clears immediately upon resolution |
| **Specific Microcopy** | Explain how to fix the issue (e.g., "Must be at least 8 characters with 1 number") |

---

## 2. Implementation Guide

```tsx
<div className="flex flex-col gap-1.5">
  <label htmlFor="user-slug" className="text-xs font-semibold text-[var(--color-text-secondary)]">Workspace Slug</label>
  <input
    id="user-slug"
    aria-invalid="true"
    aria-describedby="user-slug-error"
    defaultValue="invalid slug!"
    className="h-10 px-3 rounded-lg border border-[var(--color-danger-base)] bg-[var(--color-surface-base)] text-sm focus:ring-2 focus:ring-[var(--color-danger-ring)]"
  />
  <div id="user-slug-error" role="alert" className="flex items-center gap-1.5 text-xs text-[var(--color-danger-text)] font-medium">
    <span>⚠️</span>
    <span>Slug may only contain lowercase letters, numbers, and hyphens.</span>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Connect error text to the input using aria-describedby. | Never show aggressive red errors while the user is typing their very first character. |
| Use role="alert" so screen readers speak the error message. | Never clear user-entered values upon form validation failure. |

---

## 4. Accessibility & Interaction Integrity

- **WCAG 3.3.1 Error Identification & 3.3.3 Error Suggestion.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

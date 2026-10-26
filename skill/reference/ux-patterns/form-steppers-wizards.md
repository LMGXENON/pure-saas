# Form Steppers & Multi-Step Progress Flows

Steppers divide long, complex forms into bite-sized, logical milestones, lowering cognitive fatigue and drop-off rates.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Completed Steps** | Visual checkmark, clickable to return and edit previous answers |
| **Current Step** | Highlighted step number with high-contrast text and aria-current="step" |
| **Future Steps** | Muted indicator, non-interactive until preceding steps are validated |

---

## 2. Implementation Guide

```tsx
<ol className="flex items-center w-full max-w-2xl mx-auto mb-8">
  <li className="flex items-center text-[var(--color-accent-primary)] font-medium text-xs">
    <span className="w-6 h-6 rounded-full bg-[var(--color-accent-primary)] text-white flex items-center justify-center mr-2">✓</span>
    <span>Account</span>
    <div className="w-12 h-0.5 bg-[var(--color-accent-primary)] mx-4" />
  </li>
  <li className="flex items-center text-[var(--color-text-primary)] font-medium text-xs" aria-current="step">
    <span className="w-6 h-6 rounded-full border-2 border-[var(--color-accent-primary)] flex items-center justify-center mr-2 font-bold">2</span>
    <span>Workspace</span>
    <div className="w-12 h-0.5 bg-[var(--color-border-subtle)] mx-4" />
  </li>
  <li className="flex items-center text-[var(--color-text-muted)] text-xs">
    <span className="w-6 h-6 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center mr-2">3</span>
    <span>Billing</span>
  </li>
</ol>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Validate current step inputs before permitting transition to the next step. | Never prevent users from navigating backward to check earlier inputs. |
| Autosave draft progress in local storage or database. |  |

---

## 4. Accessibility & Interaction Integrity

- **Use <ol> and aria-current="step" for programmatic state.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

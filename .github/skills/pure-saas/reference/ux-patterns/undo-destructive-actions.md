# Undo Patterns vs Destructive Confirmation Dialogs

Modern UX favors forgiving interfaces with instantaneous "Undo" over intrusive confirmation modals that induce dialog fatigue.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Soft Deletion** | Move items to a "Trash" or mark as deleted with a 5-second undo toast window |
| **Confirmation Modal Exception** | Reserve modal popups strictly for irreversible data destruction (e.g. workspace deletion) |
| **Type-to-Confirm** | Require typing the exact entity name for catastrophic operations |

---

## 2. Implementation Guide

```tsx
<div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-lg">
  <span className="text-xs text-[var(--color-text-primary)]">Item deleted.</span>
  <button 
    onClick={handleUndo} 
    className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline"
  >
    Undo (5s)
  </button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use toast undo for email archiving, list item deletion, and status changes. | Never pop up a confirmation modal for trivial actions like dismissing a notification. |
| Implement soft-deletes in backend schemas. |  |

---

## 4. Accessibility & Interaction Integrity

- **Ensure the Undo toast has adequate display time (minimum 5000ms).**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

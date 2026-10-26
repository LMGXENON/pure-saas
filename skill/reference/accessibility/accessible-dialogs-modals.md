# Accessible Modal Dialogs & Alert Dialogs

Dialogs demand strict focus containment, background inertness, and appropriate role semantics.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **role="dialog"** | Standard Dialog | Interactive modal window with focus trap and title labeling |
| **role="alertdialog"** | Alert Dialog | Used for critical confirmation prompts requiring immediate user attention |
| **aria-modal="true"** | Modal Flag | Signals assistive technology that content outside the dialog is inert |

---

## 2. Accessible Implementation Example

```tsx
<div
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-desc"
  className="p-6 bg-[var(--color-surface-overlay)] rounded-2xl shadow-2xl"
>
  <h2 id="alert-title" className="text-base font-bold text-red-500">Delete production cluster?</h2>
  <p id="alert-desc" className="text-xs text-neutral-400 mt-2">This action is permanent and cannot be undone.</p>
  <div className="flex justify-end gap-3 mt-6">
    <button className="px-3 py-1.5 text-xs">Cancel</button>
    <button className="px-3 py-1.5 text-xs bg-red-600 text-white rounded">Delete</button>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use `aria-labelledby` linked to the heading inside the dialog. | Do not allow background elements to be focusable or clickable while dialog is open. |
| Restore focus to trigger button upon close. |  |

---

## 4. Testing & Verification Protocol

- **ESC key must close the dialog immediately.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

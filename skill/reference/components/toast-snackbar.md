# Toast & Snackbar Notification System

Toasts provide brief, non-intrusive feedback on completed background operations (e.g., "Saved changes", "Link copied"). They float over screen corners and dismiss automatically.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Entering** | Slide and fade in from viewport corner (translate-y-2 -> 0) | `var(--motion-ease-spring)` |
| **Persistent Display** | High contrast card, semantic icon, brief message, optional Action button | `var(--color-surface-overlay)` |
| **Exiting** | Fade and slide out after 4000ms delay or manual close | `var(--motion-ease-out)` |

---

## 2. Implementation Guide

```tsx
<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
  <div role="status" aria-live="polite" className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-xl text-xs font-medium text-[var(--color-text-primary)] animate-slide-up">
    <span className="text-[var(--color-accent-primary)] font-semibold text-xs" aria-hidden="true">✓</span>
    <span>Deployment initiated successfully.</span>
    <button className="ml-2 text-[var(--color-accent-primary)] hover:underline font-semibold">View</button>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use aria-live="polite" for standard confirmations and aria-live="assertive" for critical alerts. | Never use toasts for fatal errors that require immediate user action. |
| Allow users to dismiss toasts manually. | Do not spam more than 3 visible stacked toasts at once. |
| Pause auto-dismiss timer on mouse hover or keyboard focus. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Screen readers announce text automatically via aria-live regions without stealing focus.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

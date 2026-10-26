# Settings & Profile Management Layout

Settings pages organize account, team, billing, and security preferences into structured master-detail panels.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Settings Navigation** | Horizontal tabs or left-hand category list | `var(--color-surface-base)` |
| **Form Section Cards** | Grouped settings blocks with descriptive headers and save action footer | `var(--color-surface-base)` |
| **Danger Zone** | Isolated red-bordered section for destructive account actions | `var(--color-danger-subtle)` |

---

## 2. Layout Implementation Example

```tsx
<div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
  <div className="p-6 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
    <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Public Profile</h3>
    <p className="text-xs text-[var(--color-text-secondary)] mb-6">This information is displayed publicly on your workspace.</p>
    <div className="space-y-4">
      <TextInput label="Display Name" defaultValue="Alex Morgan" />
      <TextInput label="Contact Email" defaultValue="alex@company.com" />
    </div>
    <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] flex justify-end">
      <button className="h-9 px-4 text-xs font-medium rounded-lg bg-[var(--color-accent-primary)] text-white">Save Changes</button>
    </div>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Isolate destructive deletion actions into an explicit Danger Zone. | Never place a single global save button at the very bottom of a 20-field settings page. |
| Show clear success notifications when settings are saved. |  |

---

## 4. Accessibility & Layout Semantics

- **Group related inputs inside semantic <fieldset> with <legend>.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

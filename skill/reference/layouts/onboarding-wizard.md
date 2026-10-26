# Onboarding Multi-Step Wizard Layout

Onboarding wizards guide new users through critical configuration steps without overwhelming cognitive bandwidth.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Progress Indicator** | Step pills or percentage bar showing current step and total | `h-1 bg-accent` |
| **Focused Card Container** | Centered single-purpose card (max-w-lg) | `shadow-2xl` |
| **Action Footer** | Back button, Skip option, and Primary Continue CTA | `flex justify-between` |

---

## 2. Layout Implementation Example

```tsx
<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--color-surface-canvas)]">
  <div className="w-full max-w-md">
    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-3">
      <span>Step 2 of 4</span>
      <span>Configure Workspace</span>
    </div>
    <div className="w-full h-1 bg-[var(--color-surface-muted)] rounded-full mb-8">
      <div className="h-full bg-[var(--color-accent-primary)] rounded-full w-1/2 transition-all duration-300" />
    </div>
    <div className="p-8 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] shadow-xl">
      <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Name your workspace</h2>
      <p className="text-xs text-[var(--color-text-secondary)] mt-1 mb-6">Choose a unique domain identifier for your team.</p>
      <TextInput label="Workspace Name" placeholder="acme-corp" />
      <div className="mt-8 flex items-center justify-between">
        <button className="text-xs text-[var(--color-text-secondary)] hover:underline">Back</button>
        <button className="h-10 px-5 text-xs font-semibold rounded-lg bg-[var(--color-accent-primary)] text-white">Continue →</button>
      </div>
    </div>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Allow users to return to previous steps to edit answers. | Do not lock the user out from skipping non-essential steps. |
| Preserve entered state in drafts/storage during wizard flow. |  |

---

## 4. Accessibility & Layout Semantics

- **Announce step transitions to screen readers using aria-live="polite".**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

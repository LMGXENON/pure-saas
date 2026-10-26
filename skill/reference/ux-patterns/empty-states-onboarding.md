# Empty States, Zero-Data Fallbacks & Starter Guidance

Empty states are prime educational real estate. Rather than presenting dead ends, Pure SaaS designs empty states that celebrate potential, explain the value, and offer immediate one-click initiation.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Illustrative Anchor** | Calm, minimal SVG illustration or icon reflecting the entity (no generic clip art) |
| **Clear Heading** | Action-oriented headline (e.g. "No webhooks configured yet") |
| **Educational Microcopy** | One concise sentence explaining what webhooks do and why they matter |
| **Primary Call to Action** | Prominent button to create the first item or load demo template data |

---

## 2. Implementation Guide

```tsx
<div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-surface-base)]">
  <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-muted)] flex items-center justify-center text-xl text-[var(--color-text-secondary)] mb-4">
    📦
  </div>
  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">No deployments found</h3>
  <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mt-1 mb-6">
    Connect your GitHub repository to trigger your first autonomous edge deployment.
  </p>
  <button className="h-9 px-4 rounded-lg bg-[var(--color-accent-primary)] text-white text-xs font-medium hover:opacity-90 transition-opacity">
    + Create First Deployment
  </button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide an option to load sample or sandbox data so users can explore the UI immediately. | Never show a raw blank table with no rows and zero explanation. |
| Differentiate between "first-time empty" and "no search results found". |  |

---

## 4. Accessibility & Interaction Integrity

- **Ensure the empty state has a clear heading level that screen readers can discover.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

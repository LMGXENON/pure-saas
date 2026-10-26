# Pricing Matrix & Tier Comparison Layout

Pricing layouts must communicate feature differences and subscription economics clearly, eliminating hidden caveats.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Billing Frequency Toggle** | Monthly vs Annual switch with annual discount badge | `var(--color-surface-muted)` |
| **Tier Cards** | Starter, Pro (Recommended/Highlighted), Enterprise | `grid-cols-1 md:grid-cols-3` |
| **Feature Comparison Matrix** | Detailed checkbox breakdown across categories | `divide-y border` |

---

## 2. Layout Implementation Example

```tsx
<div className="w-full max-w-7xl mx-auto px-4 py-16">
  <div className="text-center max-w-2xl mx-auto mb-12">
    <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Simple, transparent pricing</h2>
    <p className="text-sm text-[var(--color-text-secondary)] mt-2">Scale as you grow. No hidden bandwidth charges.</p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
    {/* Tier cards */}
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Highlight exactly one recommended plan with subtle elevation or border accent. | Never hide currency denomination or billing renewal frequency. |
| Clarify monthly equivalent pricing when annual billing is active. |  |

---

## 4. Accessibility & Layout Semantics

- **Ensure plan selection radio buttons or CTA buttons have clear unique accessible names ("Select Pro Plan").**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

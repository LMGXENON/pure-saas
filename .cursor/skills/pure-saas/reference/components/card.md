# Card Container Architecture

Cards group related information and actions into bounded visual units. Pure SaaS avoids generic card-vomit by enforcing deliberate contrast, purposeful padding, and subtle hairline borders.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Static Card** | Subtle 1px border, neutral surface, crisp corner radius (8-16px) | `var(--color-surface-base)` |
| **Interactive Card Hover** | Subtle upward lift (-2px translateY) or surface highlight, border turns var(--color-border-hover) | `var(--color-surface-hover)` |
| **Selected Card** | Accent border ring (2px) and selected badge/icon | `var(--color-accent-primary)` |

---

## 2. Implementation Guide

```tsx
<div className="group relative p-5 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-hover)] transition-all duration-200 hover:shadow-md flex flex-col justify-between">
  <div>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Analytics</span>
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">Live</span>
    </div>
    <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">Weekly Active Workspaces</h3>
    <p className="text-xs text-[var(--color-text-secondary)]">Aggregated across production clusters.</p>
  </div>
  <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
    <span className="text-lg font-bold font-mono text-[var(--color-text-primary)]">14,280</span>
    <span className="text-xs font-medium text-emerald-500">+12.4%</span>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Establish consistent internal padding tokens (p-4, p-5, or p-6). | Avoid wrapping every single isolated sentence into its own card. |
| Use hairline borders instead of thick muddy drop shadows in dark mode. | Never place multiple conflicting primary buttons inside a single card container. |
| Provide nested button hit targets with stopPropagation. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **When an entire card is clickable, use a single pseudo-element link overlay or clear button.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

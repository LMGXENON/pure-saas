# Pagination & Page Navigation Primitives

Pagination divides large record sets into discrete pages. It provides direct access to numbered pages, previous/next steps, and total count summaries.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Page Number Idle** | Neutral button with number label, 32x32px minimum | `var(--color-surface-base)` |
| **Current Page** | Solid accent background or high contrast border with aria-current="page" | `var(--color-accent-primary)` |
| **Disabled Step** | Opacity 40%, disabled attribute present on Prev/Next buttons | `disabled:opacity-40` |

---

## 2. Implementation Guide

```tsx
<nav aria-label="Pagination" className="flex items-center justify-between py-4">
  <span className="text-xs text-[var(--color-text-secondary)]">
    Showing <span className="font-medium text-[var(--color-text-primary)]">1</span> to <span className="font-medium text-[var(--color-text-primary)]">25</span> of <span className="font-medium text-[var(--color-text-primary)]">240</span> results
  </span>
  <div className="flex items-center gap-1">
    <button disabled aria-label="Previous page" className="h-8 px-2.5 text-xs rounded-lg border border-[var(--color-border-subtle)] disabled:opacity-40">Previous</button>
    <button aria-current="page" className="w-8 h-8 text-xs font-semibold rounded-lg bg-[var(--color-accent-primary)] text-white">1</button>
    <button className="w-8 h-8 text-xs rounded-lg hover:bg-[var(--color-surface-hover)]">2</button>
    <button className="w-8 h-8 text-xs rounded-lg hover:bg-[var(--color-surface-hover)]">3</button>
    <span className="w-8 h-8 flex items-center justify-center text-xs text-[var(--color-text-muted)]">…</span>
    <button className="w-8 h-8 text-xs rounded-lg hover:bg-[var(--color-surface-hover)]">10</button>
    <button aria-label="Next page" className="h-8 px-2.5 text-xs rounded-lg border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)]">Next</button>
  </div>
</nav>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide descriptive aria-labels on Previous and Next icon buttons. | Never hide total page count when dealing with bounded database queries. |
| Show current page and total available pages clearly. |  |
| Preserve pagination query state in the URL (`?page=2`). |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **aria-current="page" on the active button; keyboard tab order across buttons.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

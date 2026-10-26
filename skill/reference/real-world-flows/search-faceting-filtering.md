# Faceted Search & Multi-Dimensional Filtering

Faceted search combines full-text queries with discrete category, price, date, and status filters, accompanied by active filter chips.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Text Query Entry** | Instant or debounced search with highlighted matching terms |
| **2. Facet Sidebar Selection** | Checkboxes and range sliders with real-time matching result count badges |
| **3. Active Chip Stack** | Dismissible pills displaying active filters with a "Clear all" button |
| **4. URL State Synchronization** | Serialize filter state to query params: `?status=active&tag=rust` |

---

## 2. Implementation Guide

```tsx
// Active filter chip row
<div className="flex flex-wrap items-center gap-2 mb-4">
  <span className="text-xs text-[var(--color-text-muted)]">Active filters:</span>
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]">
    Status: Active
    <button onClick={() => removeFilter('status')} className="text-[var(--color-text-muted)] hover:text-white" aria-label="Remove status filter">✕</button>
  </span>
  <button onClick={clearAllFilters} className="text-xs text-[var(--color-accent-primary)] hover:underline ml-2">Clear all</button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Synchronize all active filters to URL search parameters for shareable links. | Never reset the user’s search pagination to page 1 without preserving active filters. |
| Show instant counts beside facet checkboxes. |  |

---

## 4. Accessibility & Verification Checklist

- **Screen readers must announce updated result counts upon filter toggle.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.

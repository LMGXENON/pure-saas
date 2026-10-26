# E-commerce & Product Catalog Layout

Product catalogs balance high-density image grids with robust facet filters and instantaneous sorting.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Facet Filter Rail** | Category trees, price sliders, color swatches, availability | `w-64 hidden md:block` |
| **Product Grid Stage** | 2 to 4 responsive columns with aspect-ratio locked product imagery | `grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| **Quick View Overlay** | Accessible modal for instant preview without navigating away | `var(--color-surface-overlay)` |

---

## 2. Layout Implementation Example

```tsx
<div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
  <aside className="w-64 shrink-0 hidden md:block">
    <ProductFilters />
  </aside>
  <main className="flex-1">
    <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)] mb-6">
      <span className="text-xs text-[var(--color-text-secondary)]">Showing 48 products</span>
      <select className="h-8 text-xs bg-transparent border border-[var(--color-border-subtle)] rounded-md px-2">
        <option>Sort by: Newest</option>
        <option>Price: Low to High</option>
      </select>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard />
    </div>
  </main>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Lock product image aspect ratios to prevent Cumulative Layout Shift (CLS). | Never hide price or stock availability from the main grid card. |
| Offer mobile filter modal on small viewports. |  |

---

## 4. Accessibility & Layout Semantics

- **Descriptive alt text for all product images.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

# Analytics & KPI Dashboard Grid

Analytics boards present high-density metrics, trend lines, and data comparisons. They demand clear visual hierarchy and consistent card padding.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Metric Summary Cards** | 3-4 top KPI cards displaying total, delta %, and mini sparkline | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| **Primary Chart Canvas** | Main timeline area chart (aspect-ratio 16/7 or fixed 380px) | `col-span-12 lg:col-span-8` |
| **Distribution Breakdown** | Donut chart or bar distribution breakdown | `col-span-12 lg:col-span-4` |

---

## 2. Layout Implementation Example

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
    <span className="text-xs text-[var(--color-text-secondary)]">Total ARR</span>
    <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] mt-1">$2.48M</div>
    <div className="text-xs text-emerald-500 mt-2 flex items-center gap-1">↑ 18.2% vs last month</div>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use tabular numbers (`font-mono` or `font-feature-settings: "tnum"`) for KPI values. | Do not use misleading zero-suppressed chart axes that exaggerate small fluctuations. |
| Show positive/negative delta indicators with both color and directional glyphs. |  |

---

## 4. Accessibility & Layout Semantics

- **Provide textual data table fallbacks for visual charts.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

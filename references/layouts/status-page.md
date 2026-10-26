# System Status & Incident Timeline Layout

Public status pages broadcast uptime, service health, and incident resolution progress, inspiring customer confidence during downtime.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Global Status Banner** | Prominent green/amber/red banner stating overall operational status | `p-4 rounded-xl` |
| **Component Matrix** | List of individual systems (API, Web, Database) with 90-day uptime bars | `divide-y` |
| **Incident Timeline** | Chronological updates (Investigating, Identified, Monitoring, Resolved) | `border-l-2` |

---

## 2. Layout Implementation Example

```tsx
<div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium text-sm flex items-center gap-3">
    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
    <span>All Systems Operational</span>
  </div>
  <div className="rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] divide-y divide-[var(--color-border-subtle)]">
    <div className="p-4 flex items-center justify-between text-xs font-medium">
      <span>API Services</span>
      <span className="text-emerald-500">Operational</span>
    </div>
    <div className="p-4 flex items-center justify-between text-xs font-medium">
      <span>Database Clusters</span>
      <span className="text-emerald-500">Operational</span>
    </div>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use 90-day interactive uptime tick bars with hover tooltips. | Never obscure incident reports behind vague euphemisms. |
| Include timestamps with explicit timezone abbreviations. |  |

---

## 4. Accessibility & Layout Semantics

- **Color status must always be accompanied by text status ("Operational", "Degraded").**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

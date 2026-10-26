# SaaS App Dashboard Shell & Grid Layout

The dashboard shell provides the persistent frame for productivity applications: side navigation, global header bar, and flexible content workspace.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Persistent Sidebar** | Workspace switcher, main navigation, account footer | `w-64 border-r` |
| **Global Header** | Breadcrumbs, search trigger (Cmd+K), notification center | `h-14 border-b` |
| **Main Stage** | Responsive multi-column grid with auto-fitting widgets | `flex-1 overflow-y-auto` |

---

## 2. Layout Implementation Example

```tsx
<div className="flex h-screen bg-[var(--color-surface-canvas)] overflow-hidden">
  <aside className="w-64 shrink-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-base)]">
    <SidebarContent />
  </aside>
  <div className="flex-1 flex flex-col min-w-0">
    <header className="h-14 shrink-0 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] px-6 flex items-center justify-between">
      <HeaderControls />
    </header>
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <MetricCardsRow />
        <MainChartGrid />
        <RecentActivityTable />
      </div>
    </main>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Prevent horizontal body scrolling when sidebar is open. | Never hardcode fixed pixel widths that break tablet or split-screen views. |
| Ensure content stage can scroll independently of sidebar and header. |  |

---

## 4. Accessibility & Layout Semantics

- **Ensure skip-link bypasses sidebar directly to main stage.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

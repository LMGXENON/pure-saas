# Technical Documentation & Knowledge Base Layout

Documentation requires a distraction-free 3-column architecture: navigation tree on the left, formatted markdown in the center, and on-page table of contents on the right.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Navigation Tree** | Collapsible folders and doc topics | `w-64 border-r` |
| **Content Column** | Prose typography, code blocks, alerts | `max-w-3xl px-8` |
| **Table of Contents** | Active scroll-spy h2/h3 links | `w-56 hidden xl:block` |

---

## 2. Layout Implementation Example

```tsx
<div className="flex max-w-8xl mx-auto">
  <nav className="w-64 shrink-0 border-r border-[var(--color-border-subtle)] p-6 hidden lg:block">
    <DocNavTree />
  </nav>
  <article className="flex-1 max-w-3xl px-8 py-10 prose prose-invert">
    <DocMarkdownRenderer />
  </article>
  <aside className="w-56 shrink-0 p-6 hidden xl:block">
    <TableOfContents />
  </aside>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Maintain an active scroll-spy on the right table of contents. | Do not crowd code snippets with microscopic fonts; maintain 13-14px code legibility. |
| Provide one-click copy buttons on all code blocks. |  |

---

## 4. Accessibility & Layout Semantics

- **Ensure high contrast syntax highlighting (WCAG 4.5:1 on background).**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

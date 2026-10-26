# Breadcrumb Navigation Hierarchy

Breadcrumbs communicate nested position within an application hierarchy, enabling users to retrace their steps upwards through parent levels.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Parent Link** | Muted text color, underlines or brightens on hover | `var(--color-text-secondary)` |
| **Separator** | Subtle slash or chevron glyph (aria-hidden="true") | `var(--color-text-muted)` |
| **Current Page** | Active primary text color, aria-current="page", unclickable | `var(--color-text-primary)` |

---

## 2. Implementation Guide

```tsx
<nav aria-label="Breadcrumbs">
  <ol className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
    <li>
      <a href="/projects" className="hover:text-[var(--color-text-primary)] transition-colors">Projects</a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <a href="/projects/acme" className="hover:text-[var(--color-text-primary)] transition-colors">Acme Corp</a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li aria-current="page" className="font-semibold text-[var(--color-text-primary)]">
      Production Settings
    </li>
  </ol>
</nav>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use an ordered list `<ol>` inside a `<nav aria-label="Breadcrumb">` wrapper. | Never make the active (last) breadcrumb an interactive link that reloads the current page. |
| Mark the leaf item with aria-current="page". |  |
| Truncate middle crumbs with an overflow menu when path exceeds 4 levels. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **WCAG 2.4.8 Location: Aids user orientation within deep hierarchical sites.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

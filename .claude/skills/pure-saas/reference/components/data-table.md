# Data Table & Virtualized List Guidelines

Data tables organize dense tabular information for fast scanning, sorting, and inline modification. Pure SaaS requires sticky column headers, clean zebra striping or dividers, and fluid horizontal overflow.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Header Row** | Sticky top-0, uppercase tracking, sort indicator arrows on interactive columns | `var(--color-surface-muted)` |
| **Row Hover** | Subtle highlight across the entire row without layout shifting | `var(--color-surface-hover)` |
| **Selected Row** | Accent background tint with checked row selection checkbox | `var(--color-surface-selected)` |

---

## 2. Implementation Guide

```tsx
<div className="w-full overflow-x-auto rounded-xl border border-[var(--color-border-subtle)]">
  <table className="w-full text-left border-collapse text-xs">
    <thead className="bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] font-semibold border-b border-[var(--color-border-subtle)]">
      <tr>
        <th scope="col" className="p-3 w-10"><input type="checkbox" aria-label="Select all rows" /></th>
        <th scope="col" className="p-3">User</th>
        <th scope="col" className="p-3">Role</th>
        <th scope="col" className="p-3">Status</th>
        <th scope="col" className="p-3 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-[var(--color-border-subtle)] bg-[var(--color-surface-base)] text-[var(--color-text-primary)]">
      <tr className="hover:bg-[var(--color-surface-hover)] transition-colors">
        <td className="p-3"><input type="checkbox" aria-label="Select user Alex Morgan" /></td>
        <td className="p-3 font-medium">Alex Morgan</td>
        <td className="p-3 text-[var(--color-text-secondary)]">Admin</td>
        <td className="p-3"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-500 font-medium">Active</span></td>
        <td className="p-3 text-right"><button className="text-[var(--color-text-muted)] hover:text-white">•••</button></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always include scope="col" on <th> elements and scope="row" on header cells. | Never allow table content to overflow outside its container without an accessible scrollbar. |
| Provide sticky headers for tables with more than 15 rows. | Do not rely solely on tiny font sizes (<11px) to squeeze columns in. |
| Align numeric data to the right and text data to the left. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Accessible scroll container: tabindex="0" on table overflow wrapper so keyboard users can scroll horizontally.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

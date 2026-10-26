# Dropdown Context & Action Menus

Dropdown menus provide grouped command lists triggered by buttons or context actions. They must support swift keyboard navigation, visual dividers, and shortcut indicator labels.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Trigger Idle** | Standard button or icon button with aria-haspopup="menu" | `var(--color-surface-base)` |
| **Menu Open** | Floating panel with 1px border, shadow-lg, and vertical item stack | `var(--color-surface-overlay)` |
| **Item Hover / Focus** | Subtle background tint, icon sharpens, shortcut glyphs remain aligned | `var(--color-surface-hover)` |

---

## 2. Implementation Guide

```tsx
// Dropdown Menu Item Structure
<div role="menu" aria-orientation="vertical" className="w-56 p-1 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-xl">
  <button role="menuitem" className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]">
    <span>Edit Item</span>
    <kbd className="text-[10px] text-[var(--color-text-muted)] font-mono">⌘E</kbd>
  </button>
  <button role="menuitem" className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]">
    <span>Duplicate</span>
    <kbd className="text-[10px] text-[var(--color-text-muted)] font-mono">⌘D</kbd>
  </button>
  <div className="h-px my-1 bg-[var(--color-border-subtle)]" role="separator" />
  <button role="menuitem" className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-[var(--color-danger-subtle)] text-[var(--color-danger-text)]">
    <span>Delete</span>
    <kbd className="text-[10px] opacity-70 font-mono">⌫</kbd>
  </button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Support ArrowDown / ArrowUp navigation between menu items. | Do not let dropdown menus extend beyond viewport edges (implement flip/collision detection). |
| Differentiate destructive items with danger tokens and confirmation prompts. | Never render menus without role="menu" and role="menuitem". |
| Close menu immediately upon selecting an item or pressing Escape. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Keyboard roving focus, Escape to dismiss, focus returned to trigger.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

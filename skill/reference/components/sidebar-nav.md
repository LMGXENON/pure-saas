# Sidebar Navigation Pattern

Sidebar navigation structures hierarchical application spaces. It must gracefully collapse between expanded rail and icon-only modes while clearly communicating the active route.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Item Default** | Muted icon and text, subtle hover surface change | `var(--color-text-secondary)` |
| **Item Active** | Solid background fill, high-contrast icon and label, left accent pill indicator | `var(--color-surface-selected)` |
| **Collapsed Mode** | Labels hidden, icons centered, tooltips displayed on hover | `w-16 transition-width` |

---

## 2. Implementation Guide

```tsx
<nav aria-label="Main Navigation" className="w-64 h-screen bg-[var(--color-surface-base)] border-r border-[var(--color-border-subtle)] p-4 flex flex-col justify-between">
  <div className="flex flex-col gap-1">
    <div className="px-3 py-2 mb-4 flex items-center gap-2.5">
      <div className="w-6 h-6 rounded-md bg-[var(--color-accent-primary)]" />
      <span className="font-semibold text-sm tracking-tight text-[var(--color-text-primary)]">Acme Cloud</span>
    </div>
    
    <a href="/dashboard" aria-current="page" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium bg-[var(--color-surface-selected)] text-[var(--color-text-primary)]">
      <span>📊</span>
      <span>Overview</span>
    </a>
    <a href="/deployments" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]">
      <span>🚀</span>
      <span>Deployments</span>
    </a>
  </div>
  
  <div className="pt-4 border-t border-[var(--color-border-subtle)]">
    <div className="flex items-center gap-3 px-3 py-2">
      <div className="w-7 h-7 rounded-full bg-neutral-700" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-[var(--color-text-primary)]">Jane Doe</span>
        <span className="text-[10px] text-[var(--color-text-muted)]">Pro Plan</span>
      </div>
    </div>
  </div>
</nav>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use aria-current="page" on the currently selected route. | Never hide user profile and sign-out controls off the bottom of the viewport. |
| Group links logically into clear section blocks with uppercase category labels. | Avoid loud, clashing background colors for active states. |
| Transition to an off-canvas drawer on viewport widths below 1024px. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **<nav> landmark with aria-label to differentiate from top navigation.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

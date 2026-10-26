# Top Navigation Bar Architecture

Top bars provide persistent product branding, global search, notifications, and primary user controls. They must remain stable across scroll positions without visual stutter.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Top / Unscrolled** | Transparent or flush background matching page surface | `bg-transparent` |
| **Scrolled / Sticky** | Subtle backdrop blur, hairline bottom border, elevated shadow | `backdrop-blur-md border-b` |

---

## 2. Implementation Guide

```tsx
<header className="sticky top-0 z-40 w-full h-14 bg-[var(--color-surface-base)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)] px-6 flex items-center justify-between">
  <div className="flex items-center gap-6">
    <a href="/" className="font-bold text-sm tracking-tight text-[var(--color-text-primary)]">Acme</a>
    <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-[var(--color-text-secondary)]">
      <a href="/features" className="hover:text-[var(--color-text-primary)]">Features</a>
      <a href="/pricing" className="hover:text-[var(--color-text-primary)]">Pricing</a>
      <a href="/docs" className="hover:text-[var(--color-text-primary)]">Documentation</a>
    </nav>
  </div>
  <div className="flex items-center gap-3">
    <button className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-white">Sign In</button>
    <button className="h-8 px-3 text-xs font-medium rounded-lg bg-[var(--color-accent-primary)] text-white hover:opacity-90">Get Started</button>
  </div>
</header>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use semantic <header> landmark. | Never fill top navbars with decorative banners that push content below the fold. |
| Keep height compact (52px - 64px) to preserve vertical workspace. |  |
| Provide clear skip links before the header for screen reader and keyboard navigation. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Keyboard navigation must flow naturally through logo, links, search, and user actions.**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.

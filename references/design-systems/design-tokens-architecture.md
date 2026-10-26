# Design Tokens Architecture & 3-Tier Hierarchy

Design tokens are the atomic building blocks of a maintainable UI system. Pure SaaS enforces a strict 3-tier hierarchy: Global/Raw, Semantic/System, and Component-scoped tokens.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Tier 1: Global / Raw Tokens** | Context-agnostic primitive values (e.g., color-blue-500: #3b82f6, space-4: 16px) | Never referenced directly in UI component styles |
| **Tier 2: Semantic / System Tokens** | Intent-driven aliases that change with theme context (e.g., color-surface-base, color-text-primary) | Primary styling layer for all layout and component surfaces |
| **Tier 3: Component-Scoped Tokens** | Component-specific overrides (e.g., button-primary-bg, modal-backdrop-blur) | Used for fine-grained component micro-adjustments |

---

## 2. Code & Configuration Reference

```css
:root {
  /* Tier 1: Primitives */
  --raw-slate-900: #0f172a;
  --raw-slate-50:  #f8fafc;
  --raw-blue-600:  #2563eb;
  --raw-blue-500:  #3b82f6;

  /* Tier 2: Semantic Tokens (Light Default) */
  --color-surface-base:    var(--raw-slate-50);
  --color-surface-elevated: #ffffff;
  --color-text-primary:    var(--raw-slate-900);
  --color-text-secondary:  #475569;
  --color-border-subtle:   #e2e8f0;
  --color-accent-primary:  var(--raw-blue-600);
}

[data-theme="dark"] {
  /* Tier 2: Semantic Tokens (Dark Inversion) */
  --color-surface-base:    var(--raw-slate-900);
  --color-surface-elevated: #1e293b;
  --color-text-primary:    var(--raw-slate-50);
  --color-text-secondary:  #94a3b8;
  --color-border-subtle:   #334155;
  --color-accent-primary:  var(--raw-blue-500);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Bind 100% of component styles to Tier 2 semantic tokens. | Never allow hardcoded hex values (#1a1a1a) or arbitrary Tailwind values (bg-[#fff]) in production templates. |
| Group tokens by role: surface, text, border, accent, feedback. | Do not name tokens after visual appearances (e.g. --color-blue); use semantic roles (e.g. --color-primary). |
| Maintain automated contrast validation across all light/dark token pairings. |  |

---

## 4. Accessibility & Quality Standards

- **Ensure semantic token pairs meet WCAG 2.2 AA 4.5:1 text contrast and 3:1 non-text contrast.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

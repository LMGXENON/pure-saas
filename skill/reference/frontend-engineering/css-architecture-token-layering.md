# CSS Architecture, Cascade Layers (@layer) & Token Scoping

Modern CSS uses `@layer` to declare explicit cascade precedence, ending specificity wars and eliminating `!important` overrides.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Layer Order** | @layer reset, tokens, base, components, utilities; |
| **Scoped Variables** | Defining component-level custom properties that inherit from global tokens |
| **Predictable Overrides** | Utilities in the utilities layer always supersede component styles |

---

## 2. Code Implementation Reference

```tsx
@layer reset, tokens, base, components, utilities;

@layer tokens {
  :root {
    --color-surface-base: #ffffff;
    --color-accent: #2563eb;
  }
}

@layer components {
  .btn {
    background-color: var(--color-accent);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
}

@layer utilities {
  .p-0 { padding: 0 !important; }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Organize global stylesheets with explicit @layer ordering. | Avoid high-specificity ID selectors (#main-nav .menu-item.active). |
| Keep component classes free of hardcoded !important. |  |

---

## 4. Accessibility & Performance Verification

- **Ensure high-contrast mode media queries properly override component styling layers.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.

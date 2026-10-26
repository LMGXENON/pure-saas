# Multi-Brand & Tenant Token Scoping

Enterprise SaaS products often serve multiple customer brands or sub-brands from a single unified codebase.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Tenant Scope Class** | Wrap tenant workspace containers in a scoped class: `.theme-acme`, `.theme-globex` |
| **Token Variable Overrides** | Override semantic brand tokens (--color-accent, --font-family-brand) within tenant classes |

---

## 2. Configuration & Implementation Reference

```css
.theme-acme {
  --color-accent-primary: #e11d48;
  --font-family-brand: 'Inter', sans-serif;
}

.theme-enterprise {
  --color-accent-primary: #0284c7;
  --font-family-brand: 'SF Pro Display', sans-serif;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Scope brand overrides strictly to CSS variables. | Never duplicate entire CSS stylesheets or component libraries for each tenant. |
| Validate that all tenant brand accent colors meet WCAG AA requirements. |  |

---

## 4. Verification & Testing Standards

- **Enforce contrast limits during custom tenant color configuration.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.

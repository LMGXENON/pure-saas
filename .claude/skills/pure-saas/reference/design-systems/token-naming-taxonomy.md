# Token Naming Taxonomy & Structured Conventions

A standardized naming taxonomy prevents token collisions, accelerates developer onboarding, and enables automated tooling transforms.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Namespace** | Identifies brand or system prefix (e.g., --sys-, --pure-) | System isolation |
| **Domain / Category** | Property category (e.g., color, font, space, radius, shadow, motion) | Fast IDE autocomplete |
| **Property / Object** | UI element role (e.g., surface, text, border, button, input) | Identifies affected surface |
| **Variant / Modifier** | Intent or state (e.g., primary, muted, subtle, hover, active, error) | Differentiates intent |

---

## 2. Code & Configuration Reference

```css
/* Standard Formula: --sys-[domain]-[property]-[variant]-[state] */

/* Surfaces */
--sys-color-surface-base: #ffffff;
--sys-color-surface-elevated: #f9fafb;
--sys-color-surface-overlay: #ffffff;
--sys-color-surface-hover: #f3f4f6;

/* Typography */
--sys-font-size-heading-xl: 2.25rem;
--sys-font-line-height-heading-xl: 1.15;
--sys-font-weight-bold: 700;

/* Spacing */
--sys-space-inset-sm: 8px;
--sys-space-inset-md: 16px;
--sys-space-inset-lg: 24px;

/* Radius */
--sys-radius-sm: 6px;
--sys-radius-md: 10px;
--sys-radius-lg: 16px;
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Follow kebab-case with consistent hierarchical token segments. | Do not mix camelCase and kebab-case within the token namespace. |
| Make token names self-documenting for both designers and engineers. |  |

---

## 4. Accessibility & Quality Standards

- **Explicitly designate high-contrast and state variants in the taxonomy.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

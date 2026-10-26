# Contrast Preservation Across Theme Variants

When supporting multiple themes (e.g. Light, Dark, Midnight, High-Contrast), semantic tokens must maintain WCAG 2.2 contrast compliance in every variation.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Luminance Bracket Testing** | Every theme must define explicit min/max lightness values for text and background pairs |
| **Automated Token Audit** | Run programmatic contrast checkers across every registered theme before deployment |

---

## 2. Configuration & Implementation Reference

```css
// Pure SaaS token contrast verification
// scripts/pure-saas.mjs contrast
const ratio = getContrastRatio(theme.surfaceBase, theme.textPrimary);
if (ratio < 4.5) {
  throw new Error(`Contrast failure in theme "${theme.name}": ratio ${ratio}:1 < 4.5:1`);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Automate theme contrast testing in continuous integration. | Do not assume that an accent color compliant on white is automatically compliant on dark gray. |
| Ensure interactive focus rings achieve 3:1 contrast against all theme surfaces. |  |

---

## 4. Verification & Testing Standards

- **WCAG 1.4.3 Contrast (Minimum).**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.

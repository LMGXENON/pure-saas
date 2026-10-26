# Stylelint Configuration for Strict Token Enforcement

Stylelint rules prevent arbitrary CSS declarations, enforcing the use of CSS custom properties for colors, spacing, and font sizes.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **stylelint-declaration-strict-value** | Enforces that properties like `color`, `background-color`, and `border-color` must resolve to CSS variables |
| **Disallow Hex & RGB** | Throws fatal build errors on `#hex`, `rgb()`, or `hsl()` in `.css` files |

---

## 2. Configuration & Execution Reference

```bash
// .stylelintrc.json
{
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "background-color", "border-color"],
      {
        "ignoreValues": ["transparent", "inherit", "currentColor"]
      }
    ]
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Enforce CSS custom properties for all color declarations. | Never allow raw color values in CSS component stylesheets. |
| Allow common safe exceptions (transparent, inherit, currentColor). |  |

---

## 4. Verification & Quality Gates

- **Guarantees all component colors update cleanly during theme switches.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.

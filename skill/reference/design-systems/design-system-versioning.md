# Design System Versioning & Deprecation Lifecycle

Predictable versioning ensures consuming teams can adopt updates safely without breaking existing customer interfaces.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Patch (1.0.x)** | Bug fixes, contrast corrections, zero API changes | Safe auto-upgrade |
| **Minor (1.x.0)** | New components, backward-compatible prop additions | Feature updates |
| **Major (x.0.0)** | Breaking token renames, removed components or DOM structures | Scheduled migration |

---

## 2. Code & Configuration Reference

```css
// Deprecation warning in development mode
export function Button({ variant, ...props }: ButtonProps) {
  if (process.env.NODE_ENV !== 'production' && variant === 'legacy-outline') {
    console.warn(
      '[Pure SaaS Deprecation]: Button variant "legacy-outline" is deprecated and will be removed in v2.0. Please use "secondary" instead.'
    );
  }
  return <button {...props} />;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Maintain automated codemods for major token migrations. | Never silently rename or delete tokens in minor or patch releases. |
| Provide at least one minor release cycle with deprecation warnings before breaking changes. |  |

---

## 4. Accessibility & Quality Standards

- **Audit accessibility compliance on every release tag.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

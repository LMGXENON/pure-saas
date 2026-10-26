# Automated Contrast Ratio CI Pipelines

Automating contrast validation checks mathematical WCAG luminance formulas on every build without requiring manual eyedropper checks.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **Automated Token Audit** | Parses DESIGN.md and computes contrast between all defined surface and text tokens |
| **Axe-core Browser Audits** | Scans the live DOM during end-to-end tests to catch background image contrast failures |

---

## 2. Configuration & Execution Reference

```bash
// Programmatic contrast checker
$ npx pure-saas contrast DESIGN.md
// Output:
// PASS: --color-surface-base on --color-text-primary: 14.2:1 (>= 4.5:1)
// PASS: --color-button-primary-bg on --color-button-primary-fg: 5.1:1 (>= 4.5:1)
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Integrate contrast checking directly into pre-push git hooks. | Never skip testing dark mode token pairs. |
| Block CI pipelines if any text token pair falls below 4.5:1. |  |

---

## 4. Verification & Quality Gates

- **WCAG 2.2 Level AA compliance verification.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.

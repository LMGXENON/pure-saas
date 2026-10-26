# Arbitrary Tailwind Class Prevention & ESLint Rules

Arbitrary Tailwind brackets (`w-[327px]`, `bg-[#1a1a1a]`, `text-[13.5px]`) re-introduce rogue styling chaos into codebases. Pure SaaS enforces strict ESLint rules to ban them.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **eslint-plugin-tailwindcss** | Flags class names containing bracket notation `[...]` |
| **Design Dial Alignment** | Forces developers to configure design dials in tailwind.config.js rather than inventing arbitrary numbers in JSX |

---

## 2. Configuration & Execution Reference

```bash
// .eslintrc.json
{
  "plugins": ["tailwindcss"],
  "rules": {
    "tailwindcss/no-arbitrary-value": "error",
    "tailwindcss/no-custom-classname": "warn"
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Configure Tailwind spacing and typography scales to cover valid product requirements. | Never allow `bg-[#hex]` or `m-[number]` in production code. |
| Reject PRs with arbitrary color or spacing brackets. |  |

---

## 4. Verification & Quality Gates

- **Ensures all font sizes and line heights originate from vetted accessible scales.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.

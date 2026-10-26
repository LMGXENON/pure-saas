# Lighthouse CI Auditing & Performance Budgets

Lighthouse CI automatically benchmarks performance, accessibility, SEO, and best practices on every pull request.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **Performance Budget** | JavaScript bundle < 150kB gzipped, LCP < 2.5s, CLS < 0.05 |
| **Accessibility Score Gate** | Require 100/100 accessibility score in CI |
| **Median Runs** | Execute 3 runs per URL to discard transient network anomalies |

---

## 2. Configuration & Execution Reference

```bash
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start"
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:performance": ["error", { "minScore": 0.9 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }]
      }
    }
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Set hard failure gates on accessibility (<100) and CLS (>0.05). | Never disable Lighthouse CI checks to bypass failing scores. |
| Track historical metric trends across release branches. |  |

---

## 4. Verification & Quality Gates

- **Catches missing alt tags, invalid ARIA roles, and low-contrast elements before release.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.

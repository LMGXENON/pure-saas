# Pure SaaS: /pure-saas fix

Diagnose and resolve problems across visual defects, layout, responsiveness, accessibility, interactions, and tokens.

## Usage

```bash
/pure-saas fix [request]
# or
/pure-saas:fix [request]
```

**Target Issue / Context:** `$ARGUMENTS`

---

## Operational Instructions

1. **Identify the Issue:**
   - Use current prompt, previous findings, test failures, or project context to identify the defect.
   - If no explicit issue is supplied, inspect recent changes, run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`, and review unverified areas.
2. **Remediate Directly:**
   - Support visual defects, responsiveness/overflow bugs, accessibility errors, broken transitions, or inconsistent design tokens.
   - Bind all changes to semantic tokens in `DESIGN.md`.
3. **Strict Non-Regression Mandate:**
   - **Preserve Unrelated Work:** Never mutate backend APIs, server routes, database queries, authentication flows, or unrelated component markup.
   - **Preserve DOM IDs & Tests:** Never rename or remove `id`, `data-testid`, or form action attributes relied on by existing tests.
4. **Verify Resolution:**
   - Test affected viewports (1440px desktop, 768px tablet, 375px mobile).
   - Verify interaction states and re-run linters/tests.
5. **Report:** Document what was fixed, files modified, tokens applied, and verification results.

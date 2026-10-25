# Pure SaaS: /pure-saas:fix

Remediate identified design and anti-slop issues while strictly preserving existing business logic, APIs, and database models.

## Issues to Fix: $ARGUMENTS

Execute the remediation workflow:
1. Review findings from $ARGUMENTS (or run `/pure-saas:review` first).
2. **The Preservation Mandate:** NEVER alter backend routes, API contracts, auth logic, or DOM element IDs used by JavaScript event listeners.
3. Map all raw hex colors and arbitrary spacing values to semantic tokens in `DESIGN.md`.
4. Eliminate anti-slop patterns (restore solid high-contrast typography, remove unnecessary glassmorphism blur, add `:focus-visible` rings).
5. Verify code with `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`.
6. Run existing tests (`npm test`) to confirm zero regressions in application logic.


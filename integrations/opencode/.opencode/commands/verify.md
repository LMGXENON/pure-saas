# Pure SaaS: /pure-saas verify

Verify the finished implementation against requirements, design specifications, and quality standards.

## Usage

```bash
/pure-saas verify [request]
# or
/pure-saas:verify [request]
```

**Target Scope / Criteria:** `$ARGUMENTS`

---

## Operational Instructions

1. **Execute Available Verification Checks:**
   - **Static Token & Style Enforcement:** Run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src` to confirm 0 raw styling violations or drift.
   - **Design Document Schema:** Run `node scripts/pure-saas.mjs validate DESIGN.md` to ensure structural validity.
   - **Type Checking & Linting:** Run project typecheck (`tsc --noEmit`, `npm run typecheck`, or equivalent) and linter if configured in the repository.
   - **Test Suites & Production Build:** Run existing unit/integration tests (`npm test`) and execute production build (`npm run build`) to ensure 0 build breaks.
   - **Viewport & Visual Checks:** Inspect desktop (1440px), tablet (768px), and mobile (375px) viewports for text wrapping, overflow, and layout shifts.
   - **Accessibility Checks:** Verify visible focus rings, color contrast ratios, keyboard accessibility, and absence of console errors.
2. **Remediate Within Scope:**
   - If failures occur within the task scope, diagnose root causes and fix them directly.
   - Re-run affected verification checks to confirm clean resolution.
3. **Honest Evidence-Backed Reporting:**
   - Explicitly list **Verified Checks** (with passing outputs).
   - Explicitly list **Remediated Issues** (what was fixed).
   - Honestly disclose **Untested Areas** (e.g., screen reader audio or real device touch interactions if browser tooling was constrained).
   - Never claim an interface is verified if checks were skipped.

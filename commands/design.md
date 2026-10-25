# Pure SaaS: /pure-saas:design

Design or redesign a web page or SaaS product using the complete 9-stage Pure SaaS workflow (`SKILL.md`) without generic AI slop.

## Target / Requirements: $ARGUMENTS

Execute the 9-stage workflow:
1. **Stage A (Discover):** Audit project constraints, framework, and styles. Preserve all backend APIs in existing code.
2. **Stage B (Define Direction):** Update `design-brief.md` with requirements from $ARGUMENTS.
3. **Stage C (Establish Design System):** Define semantic design tokens in `DESIGN.md`. Validate with `node scripts/pure-saas.mjs validate DESIGN.md`.
4. **Stage D (Plan Layout):** Consult `references/layout-and-composition.md`. Plan asymmetric layout, typography hierarchy, and rhythm before writing components.
5. **Stage E (Build Interface):** Implement clean semantic HTML and styles. Strictly bind styles to tokens in `DESIGN.md`. Reject all raw hex colors and arbitrary spacing.
6. **Stage F (Inspect):** Inspect 1440px desktop and 375px mobile layouts for text wrapping and overflow.
7. **Stage G (Critique & Refine):** Fix high/critical issues following `references/design-review.md`.
8. **Stage H (Enforce System):** Run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`. Ensure 0 violations.
9. **Stage I (Report Honest Results):** Report verified vs untested areas honestly.


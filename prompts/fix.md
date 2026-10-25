# Pure SaaS: Regression-Free Design Remediation

You are a senior frontend engineer and accessibility specialist following the **Pure SaaS** remediation workflow.

Remediate design defects and anti-slop violations while strictly preserving all existing application business logic, backend APIs, and functional contracts.

---

## Remediation Scope
- **Findings to Resolve:** [Specify review findings, audit items, or run `/pure-saas:review` first]
- **Target Source:** [Specify source directory or files]

---

## Remediation Rules & Protocol

1. **The Preservation Mandate (Non-Negotiable):**
   - **Do NOT rewrite backend routes:** Preserve all Express, Fastify, Next.js, or server API route definitions.
   - **Do NOT mutate authentication or session handlers:** Leave cookie, token, and auth logic untouched.
   - **Do NOT alter database schemas:** Keep ORM models, SQL queries, and data interfaces intact.
   - **Preserve all DOM Contract IDs and Event Handlers:** Retain all element IDs, form names, data attributes, and class hooks relied upon by frontend JavaScript event listeners.

2. **Map Raw Styles to Semantic Tokens:**
   - Replace raw hex colors (`#1a1a1a`, `#3b82f6`) with approved tokens from `DESIGN.md` (e.g. `var(--color-bg-surface)`, `var(--color-action-primary)`).
   - If an unlisted color is essential to brand identity, add it to `DESIGN.md` first and run `pure-saas validate DESIGN.md`.
   - Replace arbitrary Tailwind brackets (`p-[19px]`, `rounded-[13px]`) with standardized token classes.

3. **Eliminate Anti-Slop Patterns:**
   - Remove decorative gradient text fills; restore high-contrast solid headings with `text-wrap: balance`.
   - Remove redundant glassmorphism blurs on opaque surfaces.
   - Replace emojis with clean, consistent SVG icons.
   - Fix missing `:focus-visible` outlines with high-contrast focus rings.

4. **Verify Remediation Quality:**
   Run the static token scanner to ensure zero violations:
   ```bash
   node scripts/pure-saas.mjs check-tokens DESIGN.md --source [source-dir]
   ```

5. **Functional Verification:**
   Run the project test suite (`npm test` or equivalent) to confirm 100% of business logic and API contracts remain unbroken.

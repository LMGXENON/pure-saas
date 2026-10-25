# Pure SaaS: /pure-saas build

Execute a complete implementation from scratch or continue an existing project.

## Usage

```bash
/pure-saas build [request]
# or
/pure-saas:build [request]
```

**Target Request:** `$ARGUMENTS`

---

## Operational Instructions

1. **Inspect Codebase:** Inspect existing project files, framework (React, Next.js, Vue, Svelte, Astro, HTML/CSS), component conventions, and backend contracts.
2. **Consult or Author `DESIGN.md`:** Use the existing `DESIGN.md` specification or establish one if the scope warrants it. Validate with `node scripts/pure-saas.mjs validate DESIGN.md`.
3. **Implement Complete Functionality:**
   - Create clean, modular, accessible components with proper TypeScript types where applicable.
   - Bind all styling to semantic tokens in `DESIGN.md` (colors, spacing, typography, radii). Reject raw hex values and arbitrary Tailwind values.
   - Implement functional logic, user interactions, routing, and form handling.
   - **Do not stop at a plan, scaffold, hero section, or static mockup** when the request calls for a functioning product.
4. **Preserve Architecture & APIs:** Never overwrite backend endpoints, database schemas, authentication, or component libraries without explicit user authorization.
5. **Verify & Refine:** Check responsive behavior at 1440px desktop and 375px mobile, verify interaction states, and run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`.
6. **Report:** Provide an honest summary of implemented components, working interactions, verified checks, and untested areas.

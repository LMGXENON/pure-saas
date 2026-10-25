# Pure SaaS: /pure-saas migrate

Modernize or migrate an existing interface, styling architecture, or design system incrementally without regressions.

## Usage

```bash
/pure-saas migrate [request]
# or
/pure-saas:migrate [request]
```

**Target Migration / Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Map Current State & Target:**
   - Inspect existing stylesheets (CSS Modules, Styled Components, Sass, Vanilla CSS, or Tailwind).
   - Identify targets to modernize: e.g., mapping hardcoded hex codes to semantic `DESIGN.md` tokens, converting legacy class-based utilities to modern semantic tokens, or migrating legacy components to new system components.
2. **Strict Non-Regression Mandate:**
   - **Preserve All Backend APIs & Routing:** Never modify backend API contracts, server routes, database queries, or authentication session flows.
   - **Preserve Automated Test IDs:** Retain `data-testid`, `id`, and landmark roles relied on by unit and end-to-end test suites.
   - **Do Not Change Frameworks:** Do not rewrite React to Vue or introduce heavyweight runtime dependencies unless the request explicitly commands it.
3. **Incremental Migration Plan:**
   - Execute migration in safe, incremental passes (e.g., token export → foundation component replacement → surface updates → responsive polish).
   - Maintain backward compatibility where needed through CSS aliases or token fallbacks.
4. **Verify & Enforce:**
   - Run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src` to confirm clean token migration.
   - Run existing test suites (`npm test`) and production builds (`npm run build`) to prove zero regressions.
5. **Report:** Provide an honest migration report documenting migrated files, replaced legacy styles, backward-compatibility measures, and verified test results.

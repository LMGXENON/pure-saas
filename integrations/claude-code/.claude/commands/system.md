# Pure SaaS: /pure-saas system

Establish or evolve a coherent, product-wide design system supporting incremental adoption.

## Usage

```bash
/pure-saas system [request]
# or
/pure-saas:system [request]
```

**Target Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Audit Existing Foundations:** Inspect existing codebase styles, components, and brand assets. Identify color variations, conflicting spacing, font stacks, and component duplication.
2. **Establish or Evolve `DESIGN.md`:**
   - Define semantic foundations: canvas background, elevated surfaces, primary text, muted text, action accents, borders, and status roles.
   - Establish fluid or modular typography scale with strict body measure control (45–75 characters) and tabular numbers.
   - Define 4px/8px-based spacing rhythm (`space-1` to `space-16`) and unified radius scale.
   - Validate system with `node scripts/pure-saas.mjs validate DESIGN.md`.
3. **Export Foundations to Code:**
   - Export tokens to CSS Custom Properties (`styles/tokens.css`), Tailwind configuration (`tailwind.tokens.js`), or JSON using `node scripts/pure-saas.mjs export-tokens DESIGN.md`.
4. **Architect Reusable Foundations:**
   - Define core foundation components (Button, Input, Card, Badge, Modal, Navigation) following the 8-state matrix.
   - Provide clear usage guidelines and token mapping documentation.
5. **Support Incremental Adoption:**
   - Never require an application-wide rewrite. Enable existing pages to adopt new tokens and components incrementally without breaking legacy layouts or backend APIs.
6. **Report:** Output a design system adoption summary detailing established tokens, generated files, and migration paths.

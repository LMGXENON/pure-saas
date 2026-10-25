# Pure SaaS: /pure-saas tokens

Manage the design token system: create, inspect, extract, validate, refactor, and export tokens.

## Usage

```bash
/pure-saas tokens [request]
# or
/pure-saas:tokens [request]
```

**Target Request / Format:** `$ARGUMENTS`

---

## Operational Instructions

1. **Token Scope & Alignment:**
   - Manage semantic tokens in `DESIGN.md`: colors, typography, spacing, sizing, radii, borders, shadows, transitions, and breakpoints.
   - Respect existing project conventions and keep tokens aligned with `DESIGN.md`.
2. **Validation & Source Scanning:**
   - Validate `DESIGN.md` required tokens (18 semantic colors, typography scale, spacing, accessibility):
     ```bash
     node scripts/pure-saas.mjs validate DESIGN.md
     ```
   - Scan source directory for raw styling drift, hardcoded hex values, or arbitrary Tailwind numbers:
     ```bash
     node scripts/pure-saas.mjs check-tokens DESIGN.md --source src
     ```
3. **Exporting Tokens:**
   - CSS Custom Properties: `node scripts/pure-saas.mjs export-tokens DESIGN.md --format css --out styles/tokens.css`
   - Tailwind Configuration: `node scripts/pure-saas.mjs export-tokens DESIGN.md --format tailwind --out tailwind.tokens.js`
   - JSON Tokens: `node scripts/pure-saas.mjs export-tokens DESIGN.md --format json --out tokens.json`
4. **Report:** Output token verification status, scan findings, and exported file paths.

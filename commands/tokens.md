# Pure SaaS: /pure-saas:tokens

Validate `DESIGN.md`, enforce token consistency across source files, and export tokens to CSS custom properties, Tailwind configuration, or JSON.

## Options: $ARGUMENTS

Execute token management workflow:
1. Validate `DESIGN.md` required tokens (18 semantic colors, typography scale, spacing):
   ```bash
   node scripts/pure-saas.mjs validate DESIGN.md
   ```
2. Scan source directory for raw styling drift:
   ```bash
   node scripts/pure-saas.mjs check-tokens DESIGN.md --source src
   ```
3. If export requested (or matching arguments):
   - CSS: `node scripts/pure-saas.mjs export-tokens DESIGN.md --format css --out styles/tokens.css`
   - Tailwind: `node scripts/pure-saas.mjs export-tokens DESIGN.md --format tailwind --out tailwind.config.tokens.js`
   - JSON: `node scripts/pure-saas.mjs export-tokens DESIGN.md --format json --out tokens.json`
4. Report token verification status and exported file paths.


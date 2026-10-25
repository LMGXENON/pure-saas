# Pure SaaS: Design Token Validation & Export

You are a design systems tooling engineer operating under the **Pure SaaS** token management standard.

Validate `DESIGN.md`, scan the codebase for unapproved styling, and export tokens into the target format.

---

## Input Options
- **Action Required:** [Validate | Scan Source | Export Tokens]
- **Export Format (if exporting):** `css` | `tailwind` | `json` (Default: `css`)
- **Output Destination:** [e.g. `styles/tokens.css` or `tailwind.tokens.js`]

---

## Operational Steps

1. **Validate `DESIGN.md` Structure & Completeness:**
   Run the Pure SaaS validator:
   ```bash
   node scripts/pure-saas.mjs validate DESIGN.md
   ```
   Ensure the following are verified:
   - Status is `draft`, `in-review`, or `approved`.
   - All 18 required semantic color tokens exist (canvas, surface, text, action, border, status).
   - Typography font families and scale hierarchy are defined.
   - Proportional spacing scale (4px/8px increments) is declared.
   - Accessibility target tier (e.g. `WCAG 2.2 AA`) is declared.

2. **Scan Source Code for Token Drift:**
   Scan all styling and component files:
   ```bash
   node scripts/pure-saas.mjs check-tokens DESIGN.md --source [source-dir]
   ```
   Confirm that:
   - Raw color violations count is zero.
   - Unresolved CSS token references count is zero.
   - Arbitrary bracket sizing (`p-[17px]`) count is zero.

3. **Export Design Tokens:**
   If exporting tokens to build assets:
   - **CSS Custom Properties:**
     ```bash
     node scripts/pure-saas.mjs export-tokens DESIGN.md --format css --out styles/tokens.css
     ```
   - **Tailwind Theme Configuration:**
     ```bash
     node scripts/pure-saas.mjs export-tokens DESIGN.md --format tailwind --out tailwind.config.tokens.js
     ```
   - **Machine-Readable JSON:**
     ```bash
     node scripts/pure-saas.mjs export-tokens DESIGN.md --format json --out tokens.json
     ```

4. **Report Results:**
   Summarize token validation status, number of scanned files, and output paths of exported artifacts.

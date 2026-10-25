# Pure SaaS: Initialize Project

You are operating under the **Pure SaaS** design standard (`SKILL.md`). Initialize this project by creating the persistent design specification files.

---

## Instructions

1. **Check for Existing Specifications:**
   Check if `DESIGN.md` or `design-brief.md` already exist in the project root. If either file exists, do not overwrite it without explicit permission.

2. **Initialize Starter Templates:**
   If the `pure-saas` CLI is available, run:
   ```bash
   npx pure-saas init --reference
   ```
   Alternatively, copy the starter templates directly from:
   - `templates/design-brief.md` -> `design-brief.md`
   - `templates/DESIGN.md` -> `DESIGN.md`
   - `templates/reference-record.md` -> `reference-record.md`

3. **Validate Initial Documents:**
   Run the Pure SaaS validator to verify document structural integrity:
   ```bash
   node scripts/pure-saas.mjs validate DESIGN.md
   node scripts/pure-saas.mjs validate design-brief.md
   ```
   Ensure both documents pass with zero fatal schema errors.

4. **Confirm Project Direction with User:**
   Prompt the user to define or confirm:
   - **Product Name & Value Proposition:** What does this software do?
   - **Target Audience:** Who are the primary users?
   - **Visual Archetype & Direction:** (e.g. Technical Terminal, Swiss Minimalism, High-Density Dashboard, Editorial). Consult `references/design-styles-catalog.json` for style intelligence.
   - **Accessibility Target:** Default is `WCAG 2.2 AA`.

Once initialized, guide the user to the next stage by recommending `/pure-saas:design` or `/pure-saas:reference`.

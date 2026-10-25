# Gemini Project Instructions: Pure SaaS Standard

When generating, designing, or refactoring user interfaces:
1. Always establish or update `DESIGN.md` in the project root before implementing visual components.
2. Follow the Pure SaaS anti-slop principles:
   - Challenge and avoid generic purple/cyan gradient backgrounds and text.
   - Restrain corner radii and eliminate unnecessary glassmorphism.
   - Avoid monotonous three-column cards; create varied, content-specific layouts.
   - Use clean SVG icons, never emojis.
3. Core Workflows:
   - `/pure-saas:init` (or `prompts/init.md`): Initialize `DESIGN.md` and `design-brief.md`.
   - `/pure-saas:design` (or `prompts/design.md`): Execute 9-stage design workflow.
   - `/pure-saas:review` (or `prompts/review.md`): Audit UI for accessibility and anti-slop compliance.
   - `/pure-saas:fix` (or `prompts/fix.md`): Remediate UI defects preserving backend APIs.
   - `/pure-saas:tokens` (or `prompts/tokens.md`): Validate and export tokens.
   - `/pure-saas:reference` (or `prompts/reference.md`): Deconstruct reference website into tokens.
4. Validate design system integrity with:
   ```bash
   node scripts/pure-saas.mjs validate DESIGN.md
   ```
5. Conclude design tasks with an honest verification report disclosing tested vs untested areas.


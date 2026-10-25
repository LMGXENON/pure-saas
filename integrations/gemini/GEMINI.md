# Gemini Project Instructions: Pure SaaS Standard

When generating, designing, or refactoring user interfaces:
1. Always establish or update `DESIGN.md` in the project root before implementing visual components.
2. Follow the Pure SaaS anti-slop principles:
   - Challenge and avoid generic purple/cyan gradient backgrounds and text.
   - Restrain corner radii and eliminate unnecessary glassmorphism.
   - Avoid monotonous three-column cards; create varied, content-specific layouts.
   - Use clean SVG icons, never emojis.
3. Validate design system integrity with:
   ```bash
   node scripts/pure-saas.mjs validate DESIGN.md
   ```
4. Conclude design tasks with an honest verification report disclosing tested vs untested areas.


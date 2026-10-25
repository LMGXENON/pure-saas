# Gemini Project Instructions: Pure SaaS Standard

When generating, designing, or refactoring user interfaces:
1. Universal Command: Use `/pure-saas [request]` for any UI/UX design, implementation, refactoring, or audit task across websites, web applications, dashboards, mobile apps, desktop apps, and components.
2. Specialized Subcommands:
   - `/pure-saas reference [URL]` (or `prompts/reference.md`): Reverse-engineer visual references using browser DevTools and recreate.
   - `/pure-saas design` (or `prompts/design.md`): Author or update `DESIGN.md`.
   - `/pure-saas build` (or `prompts/build.md`): Execute complete working implementation.
   - `/pure-saas audit` (or `prompts/audit.md`): Comprehensive quality and WCAG 2.2 AA audit.
   - `/pure-saas fix` (or `prompts/fix.md`): Remediate defects while preserving backend APIs.
   - `/pure-saas polish` (or `prompts/polish.md`): Elevate typography, surfaces, and micro-interactions.
   - `/pure-saas responsive` (or `prompts/responsive.md`): Cross-device ergonomics (1440px, 768px, 375px).
   - `/pure-saas accessible` (or `prompts/accessible.md`): Accessible interaction, focus rings, and landmarks.
   - `/pure-saas motion` (or `prompts/motion.md`): Purposeful motion and reduced-motion support.
   - `/pure-saas tokens` (or `prompts/tokens.md`): Token validation, scanning, and export.
   - `/pure-saas component` (or `prompts/component.md`): Reusable components across the 8-state matrix.
   - `/pure-saas verify` (or `prompts/verify.md`): End-to-end verification and testing.
   - `/pure-saas system` (or `prompts/system.md`): Evolve product design foundations.
   - `/pure-saas migrate` (or `prompts/migrate.md`): Modernize legacy styling without regressions.
3. Anti-Slop Discipline: Reject generic purple/cyan gradient text, monotonous 3-column cards, and emoji icons.
4. Persistent Tokens: Bind styling to semantic tokens in `DESIGN.md`. Validate with `node scripts/pure-saas.mjs validate DESIGN.md`.
5. Honest Verification: Report verified results and untested areas honestly.

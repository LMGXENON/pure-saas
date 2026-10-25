# Gemini Project Instructions: Pure SaaS Standard

When generating, designing, or refactoring user interfaces:
1. Universal Command: Use `/pure-saas [any request]` as the default entry point. It automatically handles design, implementation, components, tokens, motion, accessibility, responsiveness, performance, security, and verification.
2. Specialist Commands:
   - `/pure-saas design [request]` (or `prompts/design.md`): Author or update persistent `DESIGN.md`.
   - `/pure-saas polish [request]` (or `prompts/polish.md`): Elevate visual hierarchy, typography, and micro-interactions.
   - `/pure-saas review [request or scope]` (or `prompts/review.md`): Evidence-based quality audit across bugs, security, accessibility, and performance.
   - `/pure-saas reference [URL]` (or `prompts/reference.md`): Reverse-engineer visual reference via DevTools and recreate requested styles.
   - `/pure-saas responsive [request]` (or `prompts/responsive.md`): Optimize layouts across mobile, tablet, and desktop viewports.
3. Anti-Slop Discipline: Reject generic purple/cyan gradient text, monotonous 3-column cards, and emoji icons.
4. Persistent Tokens: Bind styling to semantic tokens in `DESIGN.md`. Validate with `node scripts/pure-saas.mjs validate DESIGN.md`.
5. Honest Verification: Report verified results and untested areas honestly.

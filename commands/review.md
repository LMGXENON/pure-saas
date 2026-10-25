# Pure SaaS: /pure-saas:review

Audit the existing UI for visual quality, usability, accessibility (WCAG 2.2 AA), responsiveness, and anti-slop compliance.

## Scope / Target: $ARGUMENTS

Execute the audit workflow:
1. Run automated token and slop scanner:
   ```bash
   node scripts/pure-saas.mjs check-tokens DESIGN.md --source ${ARGUMENTS:-src}
   node scripts/pure-saas.mjs review-report --json
   ```
2. Inspect codebase against the Top 12 AI Slop Patterns from `references/anti-slop-rules.md` (no purple gradients, no gratuitous blur, no 3-column card vomit, no emojis).
3. Evaluate WCAG 2.2 AA contrast ratios ($\ge 4.5:1$ body, $\ge 3.0:1$ secondary, 2px focus rings) from `references/accessibility.md`.
4. Output structured findings using the `Issue -> Impact -> Evidence -> Recommendation` model from `references/design-review.md`.
5. Explicitly declare any unverified browser/screen-reader areas as `untested`.


# Pure SaaS: /pure-saas:init

Initialize the project with Pure SaaS persistent design specifications (`DESIGN.md` and `design-brief.md`).

## Arguments: $ARGUMENTS

Execute the initialization workflow:
1. Run `npx pure-saas init --reference` or execute `node scripts/pure-saas.mjs init --reference`.
2. Verify that `DESIGN.md`, `design-brief.md`, and `reference-record.md` exist.
3. Validate initial files with `node scripts/pure-saas.mjs validate DESIGN.md`.
4. If arguments were provided ($ARGUMENTS), configure product name and archetype in `design-brief.md`. Otherwise, prompt the user for product direction.
5. Guide user to next workflow: `/pure-saas:design` or `/pure-saas:reference`.


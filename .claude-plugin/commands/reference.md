# Pure SaaS: /pure-saas:reference

Analyze a reference website, record measured craft and motion parameters, and translate structural principles into `DESIGN.md` without copying branding.

## Reference Target: $ARGUMENTS

Execute reference deconstruction workflow:
1. Inspect reference target ($ARGUMENTS) at desktop (1440px) and mobile (375px).
2. Measure and record craft parameters in `reference-record.md` (`templates/reference-record.md`):
   - Typography scales, weights, and tracking (`references/typography.md`).
   - Surface colors, canvas depth, borders, and ambient lighting (`references/color-and-tokens.md`).
   - Motion curves, durations, translations, and cascade delays (`references/motion.md`).
   - Layout composition, asymmetry, and responsive collapse (`references/layout-and-composition.md`).
3. Validate: `node scripts/pure-saas.mjs validate reference-record.md`.
4. Synthesize structural principles into `DESIGN.md` for the current project. Never duplicate branding, logos, or copy verbatim.
5. Validate resulting system: `node scripts/pure-saas.mjs validate DESIGN.md`.

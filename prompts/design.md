# Pure SaaS: Design / Redesign Product

You are operating as a product designer, art director, and senior frontend engineer under the **Pure SaaS** design standard.

Design or redesign the interface according to the specifications below while eliminating all generic AI-generated design patterns.

---

## Input Requirements
- **Target Page / Scope:** [Specify target view, e.g. landing page, dashboard, pricing table, settings]
- **Product Direction:** [Specify domain, brand identity, or key user workflows]

---

## Operational Mandates & Workflow

Follow the canonical 9-stage engineering workflow from `SKILL.md`:

1. **Stage A (Discover):** Audit project constraints, styling framework (Tailwind, CSS modules, vanilla), and existing primitives. If working on an existing app, preserve all backend endpoints, authentication, and state.
2. **Stage B (Define Direction):** Complete or update `design-brief.md` with product narrative, personas, and anti-slop rules.
3. **Stage C (Establish Design System):** Codify all design tokens in `DESIGN.md`. Ensure at least 18 semantic color tokens, typography scales, line heights, letter-spacing, and spacing tokens are defined. Validate with `node scripts/pure-saas.mjs validate DESIGN.md`.
4. **Stage D (Plan Layout & Hierarchy):** Consult `references/layout-and-composition.md`. Plan clear visual pacing, intentional asymmetry (e.g. 60/40 hero split), and reading focal points. Do not wrap every feature in a 3-column card grid.
5. **Stage E (Build Interface):** Implement semantic HTML, responsive CSS, and accessible interactions. Adhere strictly to tokens in `DESIGN.md`. Reject all raw hex colors and arbitrary spacing values.
6. **Stage F (Inspect & Measure):** Check desktop (1440px) and mobile (375px) viewports for text wrapping, layout overflow, and alignment anchors.
7. **Stage G (Critique & Refine):** Address any critical visual hierarchy, contrast (< 4.5:1), or responsive defects.
8. **Stage H (Enforce System):** Scan source files for styling drift:
   ```bash
   node scripts/pure-saas.mjs check-tokens DESIGN.md --source src
   ```
   Ensure zero unapproved raw colors, zero unresolved tokens, and zero anti-slop warnings.
9. **Stage I (Report Honest Results):** Summarize changes, token compliance, and explicitly list any unverified browser/screen-reader areas as `untested`.

### Anti-Slop Enforcement
Consult `references/anti-slop-rules.md`. Prohibit:
- Purple/cyan gradient meshes or text.
- Excessive glassmorphism blur.
- Repetitive 3-column cards ("card vomit").
- Emojis in place of interface icons.
- Generic marketing hype ("Supercharge your workflow").

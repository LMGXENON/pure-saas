# Pure SaaS: /pure-saas design

Establish or update the project's persistent design specification (`DESIGN.md`) before implementation.

## Usage

```bash
/pure-saas design [request]
# or
/pure-saas:design [request]
```

**Target Request:** `$ARGUMENTS`

---

## Operational Instructions

1. **Establish Root-Level `DESIGN.md`:**
   Create or update a comprehensive, implementation-ready `DESIGN.md` before coding when the task requires a new or substantially revised design. Document:
   - **Design direction:** Aesthetic archetype, visual identity, brand personality, and design principles.
   - **Page architecture & IA:** Complete page or application structure, section sequence, content hierarchy, dimensions, and spacing.
   - **Layout system:** Container widths, max widths, margins, grids, flex layouts, sticky positioning, and overflow behavior.
   - **Colour system:** Semantic colors (canvas, surface, text, action, border, status), gradients, and CSS variables.
   - **Typography:** Font families, weights, sources, sizing scale, line heights, letter spacing, responsive scaling, and body measure (45–75ch).
   - **Components & States:** Variants, geometry, radii, borders, shadows, layering, and full 8-state matrix.
   - **Design tokens:** Complete tokens in frontmatter and CSS custom properties.
   - **Assets & Icons:** SVGs, vector icons, imagery, and treatments.
   - **Motion & Interaction:** Timing, easing curves, transitions, triggers, and reduced-motion support.
   - **Responsive behaviour:** Breakpoints and cross-device adaptations.
   - **Accessibility & Constraints:** Contrast targets (WCAG 2.2 AA), focus rings, semantic HTML, and technical constraints.
   - **Implementation Architecture:** Component tree, file structure, implementation checklist, and verification criteria.
2. **Scope Discipline:**
   - Clearly distinguish observed facts, inferred values, and unknowns.
   - For small changes, update only the relevant specification instead of needlessly regenerating the entire document.
3. **Validate:**
   ```bash
   node scripts/pure-saas.mjs validate DESIGN.md
   ```
4. **Report:** Output a concise summary of the established or updated design specification.

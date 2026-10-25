# Pure SaaS: /pure-saas polish

Raise the visual and tactile craft quality of an existing implementation beyond basic functionality.

## Usage

```bash
/pure-saas polish [request]
# or
/pure-saas:polish [request]
```

**Target Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Inspect Existing UI:** Examine the rendered interface, components, and layout. Identify clunky typography, harsh borders, uneven margins, or missing micro-interactions.
2. **Elevate Craft Details:**
   - **Typography & Hierarchy:** Adjust line-heights, letter-spacing tracking (`-0.02em` on large headings), body measure (`max-width: 65ch`), and tabular numbers (`tabular-nums`) for metrics (`references/typography.md`).
   - **Surfaces & Lighting:** Refine background layers, elevated surface cards, subtle ambient shadows, and crisp 1px borders (`1px solid var(--color-border-subtle)`).
   - **Component Geometry & Radii:** Harmonize nested corner radii (outer radius = inner radius + padding) and padding scales (`references/layout-and-composition.md`).
   - **Micro-Interactions & Feel:** Add smooth, tactile hover lifts (150ms ease-out), active press scales, and smooth focus-visible rings.
   - **Vector Graphics & Icons:** Replace generic icons or emoji with crisp, purpose-built SVGs.
3. **Core Mandates:**
   - **Preserve Working Logic:** Do not rewrite backend APIs, state stores, or business logic.
   - **Avoid Unnecessary Redesigns:** Do not add gratuitous decorative gradients or clutter simply to look elaborate. Elevate the existing identity.
4. **Verify & Report:** Compare before/after appearance across viewports, run token validation, and report improvements made.


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

1. **Inspect Existing UI & Art Direction:** Examine the rendered interface, components, and layout. Identify clunky typography, harsh borders, uneven margins, or missing micro-interactions. Consult [`references/anti-slop-rules.md`](../references/anti-slop-rules.md) and [`references/art-direction-and-taste.md`](../references/art-direction-and-taste.md).
2. **Elevate Craft Details & Specialized Verbs:**
   - **polish:** Refine surfaces, 1px hairline borders (`1px solid var(--color-border-subtle)`), and tactile hover lifts (150ms ease-out).
   - **typeset:** Fine-tune line-heights, letter-spacing tracking (`-0.02em` on headings), body measure (45–75ch), and tabular numbers (`tabular-nums`) for metrics ([`references/typography.md`](../references/typography.md)).
   - **bolder:** Increase contrast, visual prominence, and hierarchy for primary calls-to-action without adding generic gradients.
   - **quieter:** Soften secondary borders, reduce visual noise, and increase negative whitespace by 1.5x.
   - **Component Geometry & Radii:** Harmonize nested corner radii ($R_{outer} = R_{inner} + P$) and padding scales ([`references/layout-and-composition.md`](../references/layout-and-composition.md)).
   - **Micro-Interactions & Feel:** Add tactile hover lifts, active press scales, and smooth focus-visible rings ([`references/motion.md`](../references/motion.md)).
   - **Vector Graphics & Icons:** Replace generic icons or emoji with crisp, purpose-built SVGs.
3. **Core Mandates:**
   - **Preserve Working Logic:** Do not rewrite backend APIs, state stores, or business logic.
   - **Avoid Unnecessary Redesigns:** Do not add gratuitous decorative gradients or clutter simply to look elaborate. Elevate the existing identity.
4. **Verify & Report:**
   - Run token validation, contrast check, and visual screenshot verification:
     ```bash
     npx pure-saas contrast DESIGN.md
     npx pure-saas check DESIGN.md --source src
     npx pure-saas browser screenshot http://localhost:3000 --viewports 375,768,1440
     ```
   - Compare before/after appearance across viewports and report improvements made.


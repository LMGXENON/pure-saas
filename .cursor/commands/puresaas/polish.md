---
description: "Refine existing interfaces, improving visual hierarchy, typography, spacing, interactions and detail."
---

# `/puresaas:polish` — Senior Visual Designer

You are the **Senior Visual Designer** executing `/puresaas:polish`. Your mission is to elevate the visual craft, optical typography, spatial balance, surface lighting, and micro-interactions of existing interfaces without breaking working application logic.

Follow the authoritative playbook in [`skill/reference/polish.md`](../../../skill/reference/polish.md).

## Target Scope
$ARGUMENTS

## Execution Protocol

1. **Typographic Refinement:**
   - Apply optical tracking: tighten large display headings (`-0.025em` to `-0.035em`) and loosen small uppercase captions (`+0.05em`).
   - Constrain reading line measure to 60–75 characters (`max-w-prose` / `max-w-[68ch]`).
   - Enforce `font-variant-numeric: tabular-nums` on all metrics, badges, pricing, and table data.

2. **Spatial System & Alignment:**
   - Align all margins, paddings, and gaps strictly to the 8pt spatial grid (4, 8, 12, 16, 24, 32, 48, 64px).
   - Ensure strictly more whitespace above section headings than below them to maintain visual grouping.

3. **Surface Lighting & Depth:**
   - Replace heavy opaque shadows with two-layer lighting: an ambient occluding floor shadow plus a directional overhead light.
   - Enforce 1px solid hairline borders with subtle opacity (`border-border-subtle`).
   - Add dark-mode elevation via layered surface tints rather than bright borders.

4. **Tactile Micro-Interactions:**
   - Add physical press feedback: `active:scale-[0.985]` or `active:translate-y-[0.5px]` on clickable controls.
   - Use swift cubic-bezier spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`) with durations under 180ms.
   - Respect user accessibility preferences via `@media (prefers-reduced-motion: reduce)`.

5. **Verification:**
   - Run `npx pure-saas audit` to confirm deterministic quality improvements.
   - Check rendered browser finish across dark and light modes.


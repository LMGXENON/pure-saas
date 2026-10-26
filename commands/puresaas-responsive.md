---
description: "Audit and fix responsive behaviour across mobile, tablet and desktop without compromising design quality."
---

# `/puresaas:responsive` — Responsive Systems Engineer

You are the **Responsive Systems Engineer** executing `/puresaas:responsive`. Your role is to ensure the interface functions purposefully and beautifully across every device from 375px mobile screens up to 1440px+ desktop monitors with zero layout overflow and complete content preservation.

Follow the authoritative playbooks in [`skill/reference/spatial-reasoning.md`](../skill/reference/spatial-reasoning.md) and [`skill/reference/responsive.md`](../skill/reference/responsive.md).

## Target Scope
$ARGUMENTS

## Responsive Spatial Engineering Protocol

1. **Multi-Viewport Audit:**
   - Audit the interface across three mandatory viewports:
     - **Desktop (1440px):** Full widescreen composition, 60/40 Anchor & Orbit layout, and multi-column alignment.
     - **Tablet (768px):** Transition points, sidebar collapsing, multi-column wrap adjustments.
     - **Mobile (375px / 320px):** Single-column flow, touch target sizes, zero horizontal scrollbar.

2. **Mobile Spatial Calculus (Preventing Mobile Blowout):**
   - **Outer Container Padding:** Scale outer container padding from `px-8` (desktop) to `px-4` or `px-6` (mobile).
   - **Card Padding Scaling:** Scale card outer padding from `p-6` (24px) on desktop to `p-4` (16px) on mobile. Scale inner child gaps from `space-y-4` to `space-y-2.5` to strictly maintain $\text{Outer} \ge 1.5 \times \text{Inner}$.
   - **Zero Horizontal Overflow:** Ensure no element exceeds `100vw`. Eliminate accidental fixed pixel widths (`w-[600px]` $\rightarrow$ `max-w-full`).
   - **Text Wrap Protection:** Prevent awkward single-word line wraps on titles using `text-wrap: balance` or `text-wrap: pretty`.

3. **Table & Data Grid Adaptation:**
   - On mobile viewports ($< 768px$), dense data tables must never simply clip or break the page width.
   - Either wrap tables in an accessible horizontal scroll container with shadow scroll-fades, OR transform rows into clean responsive card units with slide-over drawer inspection.

4. **Touch Ergonomics & Navigation:**
   - Ensure all tap targets (buttons, links, inputs, icons) meet the minimum $44 \times 44\text{px}$ touch bounding box.
   - Replace complex desktop headers with ergonomic slide-over mobile drawers or sticky bottom navigation bars.

5. **Live Verification:**
   - Capture live browser screenshots across viewports:
     ```bash
     npx pure-saas browser screenshot <url> --viewports 375,768,1440
     ```
   - Verify that all primary actions and features remain 100% accessible on mobile without horizontal scrolling.

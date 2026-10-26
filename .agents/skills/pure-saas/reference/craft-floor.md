# Hardware-Grade Craft Floor

Load this before any visual UI edit or code generation. A pinned brief or committed visual world overrides non-ban conventions; generic habit or lazy defaults do not. The craft floor defines the minimum quality threshold below which no Pure SaaS deliverable may ship.

---

## 1. Non-Negotiable Verification Checklist

Run these checks together on the rendered output across viewports (1440px, 768px, 375px), not as speculative promises:

- **Contrast:** Body and placeholder text $\ge$ 4.5:1 against canvas and surface; large text $\ge$ 3:1. On colored surfaces, tint secondary text from that hue or the foreground—never flat, muddy gray.
- **Depth & Lighting:** Shadows carry an offset and a soft blur (multi-stop ambient + directional bloom). A zero-offset colored halo or blurry glow is decoration, not lighting.
- **Spacing Rhythm:** 8pt spatial grid. Tight semantic groups (4–12px), generous section separation (48–96px), and strictly more vertical space above a heading than below it.
- **Typographic Scale:** Body measure 60–75ch, optical tracking on headings (-0.02em to -0.04em; never below -0.04em), balanced headline wrapping (`text-wrap: balance`), and obvious scale steps.
- **Authored Motion:** Exactly one authored hero moment per surface—never uniform entrance animations repeated on every scroll section. Spring physics (`cubic-bezier(0.16, 1, 0.3, 1)` or physical mass/stiffness/damping). Respect `prefers-reduced-motion`.
- **Complete Interaction Matrix:** Default, hover, focus-visible, active (press scale), disabled, loading, error, and success states for every interactive component.
- **Themed Browser Surfaces:** Do not leave unstyled browser defaults. Text selection (`::selection`), caret color (`caret-color`), custom scrollbars, keyboard focus rings (`outline-offset`), and tabular numbers (`font-variant-numeric: tabular-nums`) must be themed from the active palette.
- **Authentic Copy & Data:** Zero placeholder metrics ("99.9%", "10x", "Trusted by Fortune 500"). Real, domain-specific copy. Action controls explicitly name what happens; error states describe the recovery.
- **Responsive Integrity:** Zero horizontal overflow at any viewport down to 320px. Touch targets $\ge$ 44x44px on mobile viewports.

---

## 2. Absolute Category Bans (Anti-Slop)

These patterns represent lazy AI generation and are strictly forbidden:

1. **No Eyebrows or Kickers on Every Section:** A kicker (small uppercase tag above a heading) on every single card and section is the hallmark of AI templates. The heading must carry its own weight. Remove repetitive eyebrows.
2. **No Identical 3-Column Card Grids:** Same-sized cards containing [icon + heading + paragraph] across the entire page structure is prohibited. Use asymmetric visual weight, wide spotlights, interactive previews, and real product canvases.
3. **No Purple / Cyan Gradient Text:** Avoid linear gradient text in primary marketing copy. Emphasis comes from typographic scale, contrast, weight, or background materials.
4. **No Gratuitous Glassmorphism:** Backdrop blur (`backdrop-blur`) is permitted only on floating navigation or modal overlays where underlying content must remain subtly visible. Never use blur as a decorative background fill for content cards.
5. **No Decorative Side-Stripe Borders:** A thick colored `border-left` or `border-right` on cards or alerts is an obsolete template cliché. Use hairline borders (`1px solid var(--color-border)`) with elevation.
6. **No Fake Status Indicators:** Pulsing green circular dots, fake live counters, and simulated uptime badges are prohibited unless wired to real data streams.
7. **No Emoji as UI Icons:** Use crisp, optically balanced SVGs from Lucide, Heroicons, or custom paths. Never render emoji as functional interface icons.
8. **No Hardcoded Hex Values:** Zero arbitrary hex codes or arbitrary bracket numbers in code (`#1e293b`, `text-[#fa5d29]`). All styling must resolve to semantic tokens in `DESIGN.md`.
9. **No Ghost Elevation:** Never combine a thick border with a wide, soft box shadow on the same flat card. Declare depth through either a razor-sharp hairline border or an ambient shadow bloom.

---

## 3. Surface Mode Alignment

Ambitious craft does not mean loud visual noise on every screen. Scale ambition to the surface mode:

- **Persuade (Landing & Launch):** Full artistic commitment, bold visual identity, rich depth, interactive previews, and a singular visual thesis.
- **Operate (Dashboards & Consoles):** Precision, spatial density, low visual noise, restrained color accents, sub-millisecond perceived latency, and keyboard navigation.
- **Read (Docs & Publishing):** Typographic calm, comfortable reading rhythm, balanced margins, high readability, and predictable wayfinding.
- **Experience (3D & Interactive):** Tactile physics, procedural canvasses, shaders, and responsive manipulation.


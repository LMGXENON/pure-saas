# Pure SaaS Anti-Slop Design Rules

AI coding agents have trained extensively on generic modern templates, causing them to converge on identical visual tropes regardless of what product is being built.

Pure SaaS defines strict anti-slop review triggers. When an agent detects any of these patterns in its plan or code, it must halt, justify the design choice against the product's identity, or replace it with a superior architectural solution.

---

## The Top 12 AI Design Anti-Patterns

### 1. Purple, Indigo, & Cyan Gradient Blurs
- **The Slop:** Massive, blurry background blobs or gradient text (`bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500`) placed behind the main hero heading without brand justification.
- **The Fix:** Solid, high-contrast, confident background colors or subtle architectural grids. Let the product typography and layout carry the visual weight.
- **Permitted Exception:** The brand identity specifically requires radiant gradient accents, and the gradient is restrained to a specific visual mark.

### 2. Excessive Glassmorphism & Frost Effects
- **The Slop:** Slapping `backdrop-blur-md bg-white/10 border border-white/20` onto every navbar, card, modal, and button.
- **The Fix:** Opaque surfaces with crisp, subtle border dividers (`border-border-subtle`). Glassmorphism degrades readability, destroys contrast, and causes rendering performance hits on lower-end devices.
- **Permitted Exception:** Floating contextual toolbars overlaid over active canvas media (e.g., video player scrub controls, photo canvas).

### 3. "Card Vomit" & Repetitive 3-Column Grids
- **The Slop:** Turning every single piece of content into an identical rounded rectangle container, arranged into 3 columns repeated 4 times down the page.
- **The Fix:** Treat cards as containing units for discrete interactive items only. Use direct editorial layout, typography scale, generous whitespace, asymmetrical splits, and subtle dividing rules.
- **Permitted Exception:** A pricing matrix or a grid of homogeneous products where containment aids direct horizontal comparison.

### 4. Generic Centered Hero Sections
- **The Slop:** Centered badge pill -> massive centered heading -> 2 lines of generic subtext -> 2 centered buttons -> floating faux screenshot.
- **The Fix:** Explore left-aligned editorial compositions, split 60/40 layouts, live interactive playgrounds, immediate interactive product demos, or full-width headline statements with embedded micro-interactions.
- **Permitted Exception:** Intentional minimalist single-input utilities (e.g., search engines, URL shorteners, simple conversion calculators).

### 5. Decorative Badges & Unnecessary Pill Containers
- **The Slop:** Sticking a rounded pill container (`v2.0 is live! 🚀`, `✨ AI-Powered Magic`) above every headline with zero functional utility.
- **The Fix:** If there is an announcement, make it an informative text link with a clear affordance. Do not pad the top of every section with decorative pills.
- **Permitted Exception:** True changelog alert banners with a functional link to release notes.

### 6. Emoji Replacing Real Interface Icons
- **The Slop:** Using `🚀`, `⚡`, `🔥`, `💡`, `🎉` as section icons inside feature cards.
- **The Fix:** Use a clean, consistent SVG icon set (e.g., Lucide, Phosphor, Heroicons, Feather) with consistent stroke widths and sizing, or omit icons altogether if typography suffices.
- **Permitted Exception:** Consumer reaction pickers or chat messaging interfaces.

### 7. Fake Dashboards & Irrelevant Abstract Visuals
- **The Slop:** Rendering an SVG chart with fake squiggly lines labeled "Revenue +420%" or abstract 3D floating spheres that have nothing to do with the actual software.
- **The Fix:** Render real, functional product views, actual code samples, realistic terminal sessions, or real data structures that the software handles.
- **Permitted Exception:** None. Never fabricate fake metrics or misleading capabilities.

### 8. Generic Marketing Slogans ("Slop Copy")
- **The Slop:** "Unlock your potential", "Revolutionize your workflow", "The all-in-one AI platform for the future", "Supercharge your productivity".
- **The Fix:** State explicitly what the product does, who it is for, and how it works. Example: *"Crawl dynamic websites and convert any URL into clean markdown ready for LLM fine-tuning."*
- **Permitted Exception:** None. Marketing copy must be concrete, specific, and grounded in product truth.

### 9. Hyper-Rounded "Bubble" Radii Everywhere
- **The Slop:** Applying `rounded-3xl` or `rounded-full` to every card, container, input, and modal without an architectural relationship to the typeface.
- **The Fix:** Harmonize corner radii across the system:
  - Technical/Precision: 0px – 4px (`rounded-none` to `rounded-sm`).
  - Modern Product: 6px – 10px (`rounded-md` to `rounded-lg`).
  - Friendly/Consumer: 12px – 16px (`rounded-xl`).
  - Buttons/Badges: Match container radius or use subtle rounding, reserving `rounded-full` strictly for circular icon buttons or avatar chips.

### 10. Arbitrary Spacing & Lack of Grid Anchors
- **The Slop:** Mixing `mt-7`, `p-5`, `gap-11`, `space-y-13` indiscriminately across components.
- **The Fix:** Strict adherence to the 4px/8px design system tokens defined in `DESIGN.md`. Every gap and padding value must resolve to an approved token.

### 11. Gratuitous Scroll & Hover Animations
- **The Slop:** Fading in every paragraph on scroll with staggered delays, making buttons bounce, spin, or pulse continuously.
- **The Fix:** Keep motion functional: instant feedback on click, subtle 150ms ease transitions on hover, and instantaneous layout responses. Respect `prefers-reduced-motion`.

### 12. Incomplete Interactive States
- **The Slop:** Only styling the default state and assuming the job is finished. Missing hover, active/pressed, focus-visible rings, disabled states, and error handling.
- **The Fix:** Every interactive element must define its complete state machine.

---

## Anti-Slop Verification Checklist

Before declaring any design task complete, the agent must verify:
- [ ] Are all headlines devoid of generic gradient fills?
- [ ] Is background glassmorphism eliminated or strictly justified?
- [ ] Have redundant 3-column card layouts been re-composed into varied layouts?
- [ ] Are all icons professional SVGs from a single consistent family, not emojis?
- [ ] Are all corner radii systematically proportional to the brand geometry?
- [ ] Does all copy describe real product capabilities rather than generic hype?
- [ ] Is every color, space, and radius mapped to a semantic design token?


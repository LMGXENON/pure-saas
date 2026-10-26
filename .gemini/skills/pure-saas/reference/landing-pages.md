# Landing Pages: Architecture, High-Conversion Narrative & Craft

Landing pages represent the **Persuade** surface mode. A great landing page is not an assembly of generic templates; it is an authored narrative experience that builds immediate credibility, demonstrates product truth, and moves the visitor to action.

---

## 1. The Anatomy of an Outstanding SaaS Landing Page

A distinctive SaaS landing page follows a purposeful narrative sequence:

```
[1. Navigation Bar]        Minimalist, sticky/floating, high-contrast CTA
[2. Hero Section]          Singular value thesis + real interactive product preview / 3D canvas
[3. Social Proof Ledger]   Verifiable client logos, press badges, or live telemetry metrics
[4. Problem / Solution]    Asymmetric split layout showing the old painful way vs. modern workflow
[5. Interactive Feature]   Interactive feature showcase (tabbed workflows or kinetic demo)
[6. Technical Deep-Dive]   Code-first terminal, architecture diagram, or benchmark graph
[7. Customer Evidence]     Authentic customer case studies with real quotes, titles, and metrics
[8. Pricing Matrix]        Transparent, interactive tier cards with billing toggle (monthly/annual)
[9. Objections & FAQ]      Accordion FAQ resolving high-friction buyer doubts
[10. Final Call to Action] Direct, compelling closing argument with instant setup or sign-up
[11. Semantic Footer]      Clean navigation grid, legal links, theme toggle, and copyright
```

---

## 2. Hero Section Engineering

The hero is the first 800 pixels of the user journey. It must deliver clarity within 5 seconds.

### The 5 Elements of an Exceptional Hero
1. **The Core Headline:** Bold, specific, and confident (display font, `text-wrap: balance`, optical tracking -0.03em). Never use generic hype like "The Future of AI is Here". State exactly what the product does.
2. **The Supporting Thesis:** 2–3 sentences (body-large, 60ch max) elaborating the tangible benefit and target audience.
3. **Primary & Secondary Actions:**
   - Primary: High-contrast action button (`Start Free Trial`, `Get Started`, or `Book Demo`).
   - Secondary: Low-friction exploratory action (`Explore Showcase`, `Read Documentation`, or `View Live Demo`).
4. **Setup / Copy Control (Compact):**
   - For developer tools or CLI libraries, provide a compact, one-click copy command with clear feedback.
   - Never expand large raw text blocks or multi-line instructions inside the hero viewport.
5. **The Interactive Centerpiece:**
   - Real, functional interactive UI preview (e.g. interactive chart, drag-and-drop workspace, or live query builder), or a procedural Three.js 3D model.
   - Refuse flat raster screenshots embedded in tilted browser frames. Build live, rendered web components.

---

## 3. High-Conversion Pricing Architecture

Pricing sections frequently suffer from repetitive cards. Elevate them with these rules:

- **Billing Frequency Toggle:** Smooth animated toggle between Monthly and Annual billing (with "Save 20%" badge).
- **Popular Tier Spotlight:** Asymmetric visual elevation for the recommended tier (subtle border accent, elevation bloom, or "Most Popular" indicator without obscuring content).
- **Feature Comparison Matrix:** Grouped feature lists with clear checkmarks and tooltips explaining complex capabilities.
- **Price Metric Honesty:** State all billing terms, seats, and usage caps transparently without deceptive asterisks.

---

## 4. Anti-Slop Discipline for Landing Pages

- **Refuse Eyebrows on Every Section:** Do not place uppercase pill tags above every heading. Allow the section headline to command the space.
- **Refuse 3-Column Feature Grids:** Replace identical 3-column cards with an asymmetrical spotlight layout: one primary hero feature occupying 60% of the width, accompanied by two supporting modular capabilities on the right.
- **Refuse Fake Trust Logos:** Never render dummy company logos like "Acme Corp" or low-res PNG logos. Use monochrome SVG vectors with consistent height (24–32px) and muted opacity (50–70%).
- **Refuse Gradient Headline Text:** Gradient text looks dated and cheap. Use solid, high-contrast typography with deliberate weight contrasts.
- **Refuse Excessive Glassmorphism:** Avoid opaque frosted glass cards. Use crisp hairline borders (`1px solid var(--color-border)`) on sunken or raised surfaces.

---

## 5. Verification Gate for Landing Pages

Before shipping any landing page, verify:
- [ ] Viewport 1440px: Balanced spacing, zero horizontal scrollbar, clear hero hierarchy.
- [ ] Viewport 768px: Graceful wrapping, multi-column sections collapse into 2-column or stacked grids.
- [ ] Viewport 375px: Hamburger/drawer navigation replaces desktop links, touch targets $\ge$ 44px, zero horizontal overflow.
- [ ] Lighthouse Performance $\ge$ 90; zero layout shifts (`CLS < 0.1`).
- [ ] WCAG 2.2 AA Contrast passing on all copy, buttons, badges, and pricing cards.

# Pure SaaS: /pure-saas reference

Analyse the supplied website as a visual and technical reference, then recreate its design language and interaction patterns for the user's product.

## Usage

```bash
/pure-saas reference https://example.com
# or
/pure-saas:reference https://example.com
```

**Target URL:** `$ARGUMENTS`

---

## 1. Mandatory Website Reference Analysis

Whenever a user provides a website URL as a reference, inspect and document the accessible website before implementation. Do not rely on a single screenshot, the homepage alone, or assumptions about how the site works. Refer to [`references/reference-analysis.md`](../references/reference-analysis.md) for complete details.

1. **Discover all accessible, relevant pages:** Follow navigation, footers, menus, buttons, breadcrumbs, and internal links.
2. **Record page metadata:** Document URL, title, purpose, layout engine, and section composition.
3. **Scrape and analyse styles in depth:** Extract computed styles, typography hierarchies, colors, spacing scales, proportions, imagery, borders, shadows, components, and visual weight.
4. **Inspect interactive elements:** Test menus, dropdowns, hover states, buttons, forms, modals, tabs, expandable accordions, segmented controls, and popovers.
5. **Full top-to-bottom scroll inspection:** Scroll from the topmost header through the final footer section, including dynamic feeds and lazy-loaded media.
6. **Inspect sticky and dynamic behaviour:** Observe sticky elements, dynamic islands, parallax offsets, scroll-triggered reveals, route changes, loading states, reload behavior, and CSS keyframe animations.
7. **Analyze responsive ergonomics:** Test and document behavior across desktop (1440px / 1280px), tablet (768px - 834px), and mobile (375px - 430px).
8. **Evidence-based implementation:** Use measured findings as the implementation reference rather than guessing.

---

## 2. Complete Website Capture and Reference Mapping

Capture the entire accessible, in-scope website, including all relevant pages, sections, page lengths, scroll positions, and animation frames:

- **All Pages:** Capture full-page screenshots of every relevant, accessible page. Capture viewport screenshots at key scroll positions and interaction states.
- **All Sections & Full Page Length:** Scroll top to bottom, recording overall page height, section boundaries, heights, and scroll trigger offsets.
- **Animation Frames & States:** Capture initial, mid-animation, settled, hover, active, open, and closed states.
- **Responsive Coverage:** Capture desktop (1440px), tablet (768px), and mobile (375px) for every page and section.

---

## 3. Page-by-Page Reference Inventory Checklist

Before coding, maintain a complete inventory checklist for every in-scope page:
- Page URL and title.
- Full-page reference screenshot captured.
- Section-by-section breakdown documented (purpose, content, layout, styling).
- Interactive elements and states cataloged.
- Motion and transitions documented.
- Responsive behaviors recorded across desktop, tablet, and mobile.
- Open questions, ambiguities, or inaccessible elements recorded.

---

## 4. Mandatory 16-Section `DESIGN.md` Specification

Before writing or modifying code, author or update `DESIGN.md` at the project root covering all 16 required sections:

1. **Reference Overview:** URL, inspection date, pages inspected, viewports, tools, limitations, confidence level.
2. **Design Direction:** Aesthetic, visual identity, brand personality, design principles, visual hierarchy.
3. **Page Architecture:** Every section in order, purpose, content hierarchy, backgrounds, dimensions, padding, transitions.
4. **Layout System:** Container widths, max widths, margins, grid columns, gutters, alignment, flexbox, sticky elements.
5. **Spacing System:** Measured and inferred spacing scale for sections, containers, headings, body copy, buttons, cards.
6. **Colour System:** Semantic color architecture with hex/rgb values and CSS variable definitions (`--color-bg-canvas`, etc.).
7. **Typography:** Font families, weights, sources, display/heading/body sizes, line heights, letter-spacing tracking, measure.
8. **Component Inventory:** Nav, hero, buttons, cards, media frames, badges, forms, dropdowns, dialogs, footer, and states.
9. **Assets:** Images, SVGs, icons, videos, textures, illustrations, fonts (sources, formats, dimensions, reuse permission).
10. **Motion and Interaction:** Triggers, durations, delays, easing curves, transforms, transitions, scroll effects, reduced-motion.
11. **Responsive Behaviour:** Desktop, tablet, mobile layouts, breakpoints, drawer collapse, stacking rules, touch adaptations.
12. **Technical Observations:** DOM hierarchy, semantic HTML elements, CSS custom properties, pseudo-elements, dependencies.
13. **Design Tokens:** Complete token specification in frontmatter and CSS custom properties.
14. **Implementation Architecture:** Component tree, file structure, reusable component breakdown, styling approach.
15. **Accessibility and States:** Keyboard navigation, visible focus rings, WCAG 2.2 AA contrast, semantic landmarks, 8 states.
16. **Implementation Checklist:** Actionable checklist covering every section, component, responsive state, and animation.

---

## 5. Screenshot-Based Visual Verification

Visually verify the implementation against the reference screenshots using automated browser tooling (e.g. headless Chrome):

- **Side-by-Side Comparison:** Compare full-page and section screenshots of the implementation against reference captures at identical viewports (1440px desktop, 768px tablet, 375px mobile).
- **Inspect Key Elements:** Layout and alignment, typography (scale, weight, tracking, line height), colors, spacing, borders, shadows, elevation, component styling, image sizing, and interactive/hover states.
- **Document Discrepancies:** Note visual and behavioral differences with exact location, observed vs expected, and fix.
- **Iterative Refinement:** Fix discrepancies and re-verify until the recreation faithfully matches the reference.

---

## 6. Mandatory Motion and Transition System

Every recreated website must implement a purposeful motion and transition system:
- **Page Load & Entrance:** Staggered reveals for headers, hero titles, descriptions, and CTAs (e.g. `200-400ms cubic-bezier(0.16, 1, 0.3, 1)`).
- **Scroll-Triggered Reveals:** Sections and cards animate into view as user scrolls using `IntersectionObserver`.
- **Interactive State Transitions:** Smooth `150-250ms` transitions on buttons, cards, links, tabs, and toggles for hover, focus, active.
- **Dynamic & Sticky Elements:** Smooth transforms and transitions for sticky navbars, dynamic islands, and floating ribbons.
- **Physics-Based Spring Easing:** Natural feel (`cubic-bezier(0.175, 0.885, 0.32, 1.275)` or `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Accessibility:** Full `prefers-reduced-motion: reduce` compliance disabling non-essential motion.

---

## 7. 11-Step Implementation Workflow

1. **Discover & Catalog:** Map all accessible pages, sections, and routes from the reference URL.
2. **Capture Reference:** Capture full-page, viewport, animation, and responsive screenshots of all in-scope pages.
3. **Deep DevTools Inspection:** Extract exact computed styles, tokens, typography, colors, layout rules, and DOM hierarchy.
4. **Author `DESIGN.md`:** Write the 16-section implementation specification and validate with `pure-saas validate DESIGN.md`.
5. **Establish Design Tokens:** Export and apply tokens to `styles/tokens.css` or Tailwind configuration.
6. **Build Page Architecture:** Scaffold semantic HTML structure matching the reference's complete section hierarchy.
7. **Implement Component Details:** Build components with authentic styling, crisp SVGs, and responsive layouts.
8. **Implement Motion & Transitions:** Add entrance animations, scroll reveals, interactive transitions, and reduced-motion fallbacks.
9. **Capture Local Verification Screenshots:** Run locally and capture full-page and viewport screenshots matching reference viewports.
10. **Side-by-Side Visual Comparison & Refinement:** Compare captures, correct discrepancies in spacing, typography, and contrast.
11. **Run Verification & Quality Gate:** Execute automated contrast, token, code audit, and test suites.

---

## 8. Required Completion Gate (11 Items)

Before declaring completion of any website recreation:
1. [ ] Reference analysis performed across all accessible pages and recorded in `DESIGN.md`.
2. [ ] Complete reference screenshots captured (full-page, sections, responsive viewports).
3. [ ] 16-section `DESIGN.md` authored, validated, and passing all token checks.
4. [ ] All sections from the reference implemented from header through footer.
5. [ ] Typography, spacing, colors, borders, and shadows faithful to reference.
6. [ ] Motion and transition system implemented across entrances, scroll reveals, and hover states.
7. [ ] Responsive layouts verified at desktop (1440px), tablet (768px), and mobile (375px).
8. [ ] Accessibility verified: WCAG 2.2 AA contrast, visible focus rings, semantic HTML, reduced motion.
9. [ ] Local screenshots captured and compared side-by-side with reference captures.
10. [ ] Zero arbitrary colors, raw values, or AI slop patterns.
11. [ ] Honest verification report delivered with tested vs untested ledger.

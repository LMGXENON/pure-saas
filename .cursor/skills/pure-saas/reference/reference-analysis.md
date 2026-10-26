# Pure SaaS Reference Analysis & Deep Inspection Guide

This guide defines the mandatory engineering and design standard for `/pure-saas reference <url>` and **every command and workflow that uses Pure SaaS**. Whenever a user provides a website URL as a reference, inspect and document the accessible website before implementation. Do not rely on a single screenshot, the homepage alone, or assumptions about how the site works.

---

## 1. Mandatory Website Reference Analysis

Before coding, comprehensively inspect and analyse the reference website.

- **Discover all accessible, relevant pages:** Discover and follow all internal links connected through header navigation, footers, hamburger menus, buttons, breadcrumbs, and in-page CTAs.
- **Record page metadata:** Record each page's URL, title, purpose, layout engine, and section composition.
- **Scrape and analyse styles in depth:** Extract computed styles, typography hierarchies, colors, spacing scales, proportions, imagery, borders, shadows, components, and visual weight.
- **Inspect interactive elements:** Test menus, dropdowns, hover states, buttons, forms, modals, tabs, expandable accordions, segmented controls, and popovers wherever accessible.
- **Full top-to-bottom scroll inspection:** Scroll through each page from the topmost header through the final footer section, including lazy-loaded media, dynamic feeds, and content revealed by interaction.
- **Inspect sticky and dynamic behaviour:** Observe sticky and fixed elements, dynamic islands, parallax offsets, scroll-triggered reveals, route changes, loading states, reload behavior, and CSS keyframe animations.
- **Analyze responsive ergonomics:** Test and document behavior across desktop (1440px / 1280px), tablet (768px - 834px), and mobile (375px - 430px).
- **Evidence-based implementation:** Use measured findings as the implementation reference rather than guessing from the URL or a partial view.

If a page is inaccessible, blocked, rate-limited, or requires authentication, document the limitation explicitly. Never claim to have inspected inaccessible content.

---

## 2. Complete Website Capture and Reference Mapping

Capture the entire accessible, in-scope website, including all relevant pages, sections, page lengths, scroll positions, and animation frames.

### All Pages
- Capture a full-page screenshot of every relevant, accessible page.
- Capture viewport screenshots at important scroll positions and interaction states.
- Record the page URL, title, purpose, and complete section sequence.
- Ensure long pages are covered from the first visible content through the final section and footer.
- Do not treat a homepage screenshot as sufficient evidence of full-site coverage.

### All Sections and Full Page Length
For every page:
- Scroll from top to bottom and inspect every section.
- Record the overall page height and approximate section boundaries, heights, and scroll trigger offsets.
- Capture every section, using overlapping viewport screenshots where necessary to preserve visual continuity.
- Document section spacing, alignment, proportions, transitions, and relationships to adjacent sections.
- Inspect content that loads on scroll, sticky navigation, fixed elements, and elements that enter or leave the viewport.
- Account for repeated sections, hidden content, responsive rearrangements, and relevant footer content.

Use full-page captures and viewport captures together. Full-page screenshots alone may not reveal animations, sticky behavior, or interactive states.

### Frames and Animation States
Capture relevant visual states at key moments, including:
- Initial page load and settled page state.
- Reloads and page transitions.
- Scroll-triggered entrances, exits, and section transitions.
- Hover, focus, pressed, selected, and active states.
- Dropdowns, navigation menus, tabs, popovers, modals, and expandable accordions.
- Loading, success, error, and other relevant state changes.

For animated elements, capture enough frames to understand the start state, intermediate movement, and final state. Use video recording or frame-by-frame capture when available.

Document observable animation triggers, direction, duration, easing, stagger, distance, and exit behavior. Do not invent motion details that cannot be observed. Record any limitations where an animation or interaction cannot be captured.

### Responsive Coverage
Repeat the relevant capture process at representative desktop, tablet, and mobile viewport sizes:
- Full page lengths and section layouts.
- Navigation changes, desktop bars vs mobile hamburger drawers.
- Typography scaling formulas (`clamp`), wrapping, and line heights.
- Image sizing, object-fit, and responsive cropping.
- Component rearrangement, stacking, and visibility changes.
- Responsive interaction and animation differences.

---

## 3. Build a Reference Inventory Before Coding

Create a page-by-page reference inventory that serves as the implementation checklist before modifying code.

For every page, include:
- URL, title, and purpose.
- Ordered list of all sections.
- Overall page length and approximate section positions.
- Full-page screenshots and section-by-section viewport captures.
- Relevant animation frames and interaction-state screenshots.
- Layout, typography, color, imagery, spacing, and component details.
- Navigation, interaction, and transition behavior.
- Desktop, tablet, and mobile differences.
- Any inaccessible content or unverified behavior.

Organise screenshots and notes clearly in `reference-captures/` and in `DESIGN.md` so the implementation and review workflows can locate and compare the same pages, sections, and states.

---

## 4. Screenshot-Based Visual Verification

Before declaring any implementation complete:
1. Run the website locally.
2. Capture full-page and viewport screenshots of every implemented, in-scope page.
3. Match the reference viewport dimensions (1440px, 768px, 375px), scroll positions, and interaction states.
4. Compare the reference and implementation page by page and section by section.
5. Inspect layout, proportions, spacing, typography, colors, borders, shadows, imagery, cropping, component placement, and visual hierarchy.
6. Identify discrepancies and correct them.
7. Capture new screenshots and repeat the comparison after corrections.
8. Check important interactions, responsive layouts, and animated states in addition to static screenshots.

Do not mark a task complete based solely on code inspection, a successful build, passing tests, or the absence of console errors. Visual verification must actually be performed when browser and screenshot tools are available.

Static screenshots cannot prove animation fidelity. Verify motion separately through interaction testing, video, or frame comparison where supported.

If the necessary browser, screenshot, or recording tools are unavailable, state precisely what could not be verified. Never claim a comparison was performed without evidence.

---

## 5. Mandatory Motion and Transition System

Motion is a core part of Pure SaaS, not optional polish. Inspect the reference's behavior and implement a consistent, intentional motion system throughout the relevant product.

Include appropriate transitions for:
- Initial page load and reload.
- Page navigation and route changes.
- Scroll-triggered reveals and section transitions.
- Elements entering, leaving, or changing within the viewport.
- Sticky and fixed navigation behavior (e.g. pinned island dock, notch collapse).
- Dropdowns, popovers, modals, tabs, and expandable content.
- Hover, focus, active, pressed, and selected states.
- Buttons, cards, menus, and interactive components.
- Loading, success, error, and other meaningful state changes.

Match the reference's observable motion style using appropriate easing, duration, stagger, direction, distance, and timing.

### Consistency Across the Entire Product
- Apply motion throughout the relevant experience, not only to the hero or selected components.
- Ensure newly created pages and components follow the same motion system.
- Define reusable motion tokens, utilities, and components instead of creating disconnected animations.
- Ensure related components behave consistently across pages and interaction states.
- Make animations responsive to user actions and appropriate to the element's purpose.
- Avoid arbitrary animation, excessive movement, distracting effects, and unnecessary delays.

For reloads, use appropriate entrance transitions without delaying content unnecessarily or causing distracting flashes. Implement scroll effects using performant, viewport-aware techniques (`IntersectionObserver`, `prefers-reduced-motion`).

Respect `prefers-reduced-motion` and provide accessible alternatives that minimise or remove nonessential movement.

---

## 6. Implementation Workflow

Follow this sequence whenever Pure SaaS is used with a website reference:

1. **Inspect:** Discover and analyse all accessible, relevant pages and interactions.
2. **Capture:** Record full-page screenshots, section captures, page lengths, scroll positions, responsive layouts, and relevant animation frames.
3. **Document:** Build the reference inventory and implementation checklist.
4. **Design:** Establish the visual direction, design system, and motion system in `DESIGN.md` from the evidence.
5. **Implement:** Recreate the relevant pages, sections, interactions, and transitions.
6. **Capture locally:** Run the implementation and capture matching screenshots and interaction states.
7. **Compare:** Review every in-scope page and section against the reference.
8. **Correct:** Fix significant visual, responsive, functional, and motion discrepancies.
9. **Recheck:** Recapture and repeat visual comparisons after changes.
10. **Review:** Run `/pure-saas review`, explicitly checking reference fidelity, page and section coverage, visual quality, motion consistency, accessibility, responsiveness, and functionality.
11. **Verify:** Address significant review findings and perform the relevant checks again before reporting completion.

---

## 7. Required Completion Gate

A task using Pure SaaS must not be reported as complete until:
- [ ] All accessible, in-scope reference pages have been accounted for.
- [ ] Every relevant section and the full page length have been inspected.
- [ ] Required full-page and viewport screenshots have been captured where tooling permits.
- [ ] Relevant animation frames and interaction states have been inspected where supported.
- [ ] Desktop, tablet, and mobile behaviour have been checked as appropriate.
- [ ] The implementation has been visually compared against the reference.
- [ ] Significant visual discrepancies and broken interactions have been corrected.
- [ ] Motion and transitions have been checked across the relevant experience.
- [ ] Accessibility and reduced-motion behaviour have been verified.
- [ ] Build, tests, token validation, and contrast checks have passed.
- [ ] `/pure-saas review` has been completed and significant findings addressed.

Maintain an explicit checklist of inspected pages, sections, screenshots, frames, viewport sizes, interactions, and verification status.

If the website is too large to inspect completely, or access or tooling limitations prevent full verification, clearly report the exact scope completed and what remains unverified. Do not silently skip pages, imply complete coverage, or claim successful visual matching without evidence.

**Core rule: Inspect first. Capture and document everything accessible. Implement from evidence. Capture and compare the result. Correct discrepancies. Reverify. Only then report completion.**

---

## 8. Mandatory 16-Section `DESIGN.md` Specification

Before implementing or modifying code, author or update `DESIGN.md` at the project root covering these 16 implementation-ready sections:

1. **Reference Overview:** Source URL, inspection date, pages inspected, viewport sizes tested, inspection tools used, observed limitations, confidence level, and reference inventory.
2. **Design Direction:** Aesthetic archetype, visual identity, brand personality, design principles, and visual hierarchy.
3. **Page Architecture:** Every section in order, its specific purpose, content hierarchy, background treatment, layout dimensions, padding, and transitions between sections.
4. **Layout System:** Container widths, max widths, page margins, grid columns, gutters, alignment rules, flexbox configurations, sticky elements, and overflow behavior.
5. **Spacing System:** Measured and inferred spacing scale for sections, containers, headings, body copy, buttons, and cards.
6. **Colour System:** Semantic color architecture with hex/rgb values and CSS variable definitions (`--color-bg-canvas`, `--color-bg-surface`, `--color-text-primary`, `--color-text-secondary`, `--color-action-primary`, `--color-border-subtle`, `--color-status-*`).
7. **Typography:** Font families, weights, sources, display/heading/body sizes, line heights, letter-spacing tracking, responsive scaling, and measure restrictions (45–75 characters).
8. **Component Inventory:** Navigation bar, hero section, buttons, cards, feature sections, media frames, badges, forms, dropdowns, dialogs, footer, and other components with dimensions, padding, radii, borders, shadows, and states.
9. **Assets:** Images, SVGs, icons, videos, textures, illustrations, and webfonts with formats, dimensions, aspect ratios, intended roles, and reuse status.
10. **Motion and Interaction:** Animation triggers, durations, stagger delays, easing curves, transforms, transitions, scroll effects, sticky behavior, hover/focus/active states, and reduced-motion fallback.
11. **Responsive Behaviour:** Desktop, tablet, and mobile layouts, observed breakpoints, navigation drawer collapse, stacking rules, visibility changes, and touch adaptations.
12. **Technical Observations:** DOM hierarchy, semantic HTML elements, CSS custom properties, pseudo-elements, JavaScript behavior, and dependencies.
13. **Design Tokens:** Complete token specification in frontmatter and CSS custom properties covering colors, spacing, typography, radii, shadows, and breakpoints.
14. **Implementation Architecture:** Component tree, file structure, reusable component breakdown, styling approach, and asset organization.
15. **Accessibility and States:** Keyboard navigation, visible focus rings, contrast compliance (WCAG 2.2 AA), semantic landmarks, alt text, form validation, and interaction states (`hover`, `focus-visible`, `active`, `disabled`, `loading`, `empty`, `error`, `success`).
16. **Implementation Checklist:** Actionable checklist covering every section, component, responsive state, interaction, animation, and visual polish item that must be implemented and verified.

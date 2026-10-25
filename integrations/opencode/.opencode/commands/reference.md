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

## 1. Deep Reference Inspection: Browser DevTools

When a URL is provided, perform a thorough technical and visual inspection of the reference website before implementing anything:

1. **Open the website in a real browser:** Use available browser automation or computer-use tools. Open DevTools and inspect the rendered page, DOM, Styles, Computed Styles, loaded stylesheets, scripts, network requests, and console output.
2. **Inspect the HTML and DOM structure:** Identify page hierarchy, semantic elements, section boundaries, reusable components, navigation, layout containers, responsive wrappers, and content structure. Inspect relevant elements individually rather than relying only on initial HTML.
3. **Inspect CSS in depth:** Examine applicable CSS rules, computed styles, custom properties, typography, font files, spacing, dimensions, grids, flex layouts, positioning, breakpoints, backgrounds, gradients, borders, shadows, filters, transforms, and pseudo-elements. Identify design tokens and rules responsible for the visual appearance.
4. **Inspect JavaScript and animations:** Identify relevant scripts, libraries, event handlers, scroll-triggered effects, entrance animations, transitions, parallax, sticky sections, hover states, interactive navigation, and dynamic behavior. Use DevTools animation inspection, performance recording, and interaction testing when available.
5. **Inspect assets and network resources:** Identify publicly accessible fonts, images, SVGs, icons, video assets, and other resources. Inspect dimensions, formats, and intended roles. Reuse assets only when permitted; otherwise create original equivalents of equal craft.
6. **Inspect responsive behaviour:** Test desktop (1440px), tablet (768px), and mobile (375px) viewports. Observe breakpoint changes, section rearrangement, typography scaling, image cropping, and mobile navigation.

---

## 2. Mandatory Design Specification: `DESIGN.md`

Before writing or modifying the website, create or update a root-level `DESIGN.md` containing a comprehensive, implementation-ready specification of the reference website. Do not begin implementation until this document is complete to the extent permitted by available inspection tools.

The document must capture all 16 required sections:

1. **Reference overview:** URL, inspection date, pages inspected, viewport sizes, available tools, observed limitations, and confidence level of findings.
2. **Design direction:** Aesthetic, visual identity, brand personality, design principles, and overall visual hierarchy.
3. **Page architecture:** Every section in order, its purpose, content hierarchy, background, layout, dimensions, spacing, and transitions between sections.
4. **Layout system:** Container widths, maximum widths, page margins, columns, grids, gutters, alignment, flex layouts, positioning, sticky elements, and overflow behaviour.
5. **Spacing system:** Observed spacing values and inferred spacing tokens for sections, containers, headings, paragraphs, buttons, cards, and other elements. Clearly distinguish measured values from estimates.
6. **Colour system:** Background, foreground, text, muted text, accent, border, surface, hover, active, focus, overlay, and gradient colours. Record observed HEX, RGB, or available values and define semantic CSS variables.
7. **Typography:** Font families, available weights, font sources, sizes, line heights, letter spacing, text transformations, responsive scaling, and heading/body hierarchy.
8. **Component inventory:** Navigation, hero, buttons, cards, feature sections, media frames, badges, forms, menus, dialogs, footer, and every other relevant component. Document variants, dimensions, padding, radii, borders, shadows, and states.
9. **Assets:** Images, SVGs, icons, videos, textures, illustrations, and fonts. Record accessible source paths, formats, dimensions, aspect ratios, intended placement, and reuse permission.
10. **Motion and interaction:** Animation triggers, duration, delay, easing, transforms, transitions, scroll effects, parallax, sticky behaviour, hover/focus/active states, and reduced-motion behaviour.
11. **Responsive behaviour:** Desktop, tablet, and mobile layouts, observed breakpoints, navigation changes, stacking rules, visibility changes, image cropping, and touch behaviour.
12. **Technical observations:** Relevant DOM structure, semantic HTML, CSS architecture, custom properties, pseudo-elements, JavaScript behaviour, and dependencies without unnecessarily copying source code.
13. **Design tokens:** Complete, coherent token system for colours, spacing, typography, sizing, radii, borders, shadows, layering, containers, transitions, and breakpoints. Map tokens to observed values and label inferred values.
14. **Implementation architecture:** Recommended component tree, section hierarchy, reusable components, file structure, styling strategy, and asset organisation appropriate to the existing project's framework.
15. **Accessibility and states:** Keyboard navigation, visible focus, contrast considerations (WCAG 2.2 AA), semantic structure, alt text, form validation, loading/error/empty states, and reduced-motion support.
16. **Implementation checklist:** A concrete checklist covering every section, component, responsive state, interaction, animation, and visual detail that must be implemented and verified.

---

## 3. Required Execution Order

1. **Inspect:** DevTools inspection of reference URL across DOM, styles, motion, and viewports.
2. **Specify:** Create root-level `DESIGN.md` with all 16 sections. Validate: `node scripts/pure-saas.mjs validate DESIGN.md`.
3. **Plan:** Establish design tokens and implementation architecture.
4. **Build:** Implement full website adapting branding to user's product.
5. **Compare:** Inspect side-by-side with reference at 1440px, 768px, and 375px.
6. **Refine:** Fix visual and interaction differences; update `DESIGN.md`.
7. **Report:** Conclude with an honest verification report.

---

## 4. Expected Outcome & Acceptance Criterion

A technically informed, high-fidelity implementation based on both the reference's rendered appearance and its observable behaviour, not a generic imitation.

**Acceptance criterion:** A developer should be able to read `DESIGN.md` and understand the complete page structure, visual system, component specifications, spacing, colours, typography, assets, responsive behaviour, and motion well enough to reproduce the intended experience without guessing.

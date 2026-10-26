# Pure SaaS Design Principles

Every significant design decision in an interface must have a deliberate reason. Every established design rule must be followed. Every unresolved decision must remain visible rather than being silently replaced by an arbitrary default.

---

## 1. Intentionality Over Convention

Never choose a design pattern merely because it is common in AI-generated websites or current frontend templates.
- **Ask why:** Why does this specific product require this layout, container, or visual treatment?
- **Solve problems:** Select UI patterns that solve concrete communication, readability, or interaction problems for the user.
- **Reject defaults:** Do not fall back to purple/cyan gradient hero sections, three-column feature cards, or floating glassmorphism bars simply because no explicit alternative was requested.

---

## 2. Typography Is Structural

Typography is not decorative polish added at the end; it defines the architecture, hierarchy, and personality of the interface.
- **Visual rhythm:** The scale and relationship between display, headings, body, and metadata communicate importance before a user reads a single word.
- **Proportions:** Font size, line height, letter spacing, and maximum measure (line length) work together to govern reading speed and cognitive load.
- **Typeface personality:** Evaluate typefaces against the product's identity (e.g., technical precision, editorial restraint, creative expression) rather than defaulting to generic system fonts or ubiquitous AI staples.

---

## 3. Composition Over Component Accumulation

A great interface is composed as a unified spatial experience, not assembled by stacking unrelated cards and generic containers.
- **Direct layout:** Use whitespace, grid alignment, typographic scale, and subtle dividers before reaching for another boxed card.
- **Asymmetry and pace:** Introduce deliberate changes in visual density, layout asymmetry, and scale to guide the eye and prevent visual fatigue.
- **Card restraint:** A card or container surface should only be created when the underlying content genuinely benefits from containment (e.g., draggable items, independent interactive widgets, distinct pricing tiers).

---

## 4. Consistency Without Monotony

Shared tokens and design primitives create systemic coherence, but coherence does not require every section to be structurally identical.
- **Modular system:** Rely on consistent tokens for spacing, color semantics, typography, radii, and elevations across the entire application.
- **Varied composition:** Design each section specifically around its unique content—an interactive code playground, a technical comparison table, and a testimonial block each require distinct structural layouts while sharing the same design language.

---

## 5. Evidence Over Assumptions

Never claim that an interface is responsive, accessible, visually verified, or state-complete unless it has actually been tested or measured.
- **Traceable provenance:** Record whether tokens and decisions come from user instructions, established codebases, measured references, or agent proposals.
- **Honest status:** If an interaction state, responsive breakpoint, or color contrast ratio could not be verified in a real browser, flag it as unverified rather than claiming completion.

---

## 6. Originality Over Imitation

Reference websites (e.g., Firecrawl, Butter, Linear) are sources of design insight, not templates to clone.
- **Deconstruct principles:** Analyze how references handle density, contrast, typography scaling, and product storytelling.
- **Synthesize uniquely:** Apply those structural insights to create a distinct, bespoke identity tailored exclusively to the target product and audience.

---

## 7. The 5-Tier Precedence Hierarchy & Decision Lifecycle

When reconciling requirements or proposing new design patterns, follow this strict precedence:

1. **User Requirements & Established Brand System:** Explicit user instructions, existing brand assets, active typography rules, and existing tokens take absolute priority.
2. **Platform Conventions & Accessibility Standards:** Native platform requirements (Apple HIG on macOS/iOS, Web standards on browsers) and WCAG 2.2 AA accessibility requirements (contrast, focus indicators, minimum touch targets).
3. **Verified Project Decisions & Approved Tokens:** The immutable tokens and rules recorded in the root `DESIGN.md`.
4. **Retrieved Reference Intelligence:** Guidance retrieved from `reference/hig/`, `reference/frameworks/`, and `data/design-intelligence.json`.
5. **New Proposals:** Suggestions not previously approved, explicitly marked as proposals with open items tracked in the `unresolved` ledger.

### The Decision Lifecycle:
- **Confirmed Decisions:** Explicitly validated by the user or established in current `DESIGN.md`.
- **Proposed Decisions:** Generated based on design intelligence; status marked as `draft`.
- **Unresolved Questions:** Open technical or design trade-offs requiring user confirmation before finalizing implementation, recorded in the `unresolved` frontmatter list of `DESIGN.md`.


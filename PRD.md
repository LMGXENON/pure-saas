# Pure SaaS
## Product Requirements Document

**Version:** 1.0  
**Product type:** Universal AI-agent design skill and design enforcement toolkit  
**Primary purpose:** Build original, production-quality web interfaces without generic AI-generated design patterns  
**Target users:** Developers, founders, designers, coding agents and product teams  
**Primary platforms:** Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini CLI and other compatible coding agents

---

# 1. Executive Summary

Pure SaaS is a universal UI/UX design skill that combines design intelligence, anti-slop design rules, design-system documentation, platform-aware interface principles and automated design review into one coherent workflow.

Its purpose is to change how AI coding agents design websites and applications.

Instead of immediately generating JSX, CSS or components from a vague prompt, Pure SaaS requires the agent to understand the product, establish a visual direction, document design decisions, define typography and layout rules, build the interface, and verify the implementation against those decisions.

Pure SaaS must prevent agents from falling back to familiar, repetitive AI-generated layouts when requirements are incomplete.

It must prioritize:

- Exceptional typography and readable type hierarchies.
- Deliberate page composition and information architecture.
- Strong visual identity and original art direction.
- Consistent spacing, alignment, color and component geometry.
- Product-specific layouts rather than generic templates.
- Meaningful motion, interactions and feedback.
- Real product screenshots, purposeful illustrations and relevant assets.
- Responsive behavior and accessibility.
- Consistent implementation across every page and component.
- Measurable design quality through inspection and verification.

Pure SaaS is not a predefined visual theme. It must support editorial, minimalist, expressive, enterprise, technical, creative, luxury and other appropriate design directions without defaulting to one aesthetic.

**Core principle:** Every significant design decision must have a reason. Every established design rule must be followed. Every unresolved decision must remain visible instead of being silently replaced by an arbitrary default.

# 2. Problem Statement

AI coding agents can produce functional interfaces quickly, but often converge on the same visual patterns regardless of the product.

Common symptoms include:

- Oversized gradient headings with generic marketing copy.
- Repeated three-column feature cards.
- Excessive rounded cards, borders, shadows and glass effects.
- Purple, cyan or blue gradients selected without a brand rationale.
- Inter, Roboto or another familiar font selected without evaluating alternatives.
- Generic centered hero sections followed by predictable content blocks.
- Repetitive pill badges, floating navigation bars and decorative labels.
- Emoji or inconsistent icons used in place of proper iconography.
- Randomly introduced design tokens and inconsistent spacing.
- Overly rounded buttons and containers with no relationship to the brand.
- Excessive whitespace in some areas and cramped layouts in others.
- Fake dashboards, placeholder imagery and decorative elements that explain nothing.
- Animation that exists only to make the page appear sophisticated.
- Beautiful initial screenshots but incomplete responsive behavior.
- Missing hover, focus, disabled, loading, empty, error and success states.
- Inconsistent styling between pages because the agent forgets previous decisions.

The root problem is not that agents lack the ability to write CSS or build components.

The problem is that they frequently begin implementation without a sufficiently explicit design brief, a persistent design system, rules against generic defaults or a reliable review process.

Pure SaaS solves this by making design a documented, iterative and enforceable engineering process.

# 3. Product Vision

Make Pure SaaS the design-quality layer that sits between an AI coding agent and the interface it produces.

When a developer requests a website, the agent should:

1. Understand the product, users and business objectives.
2. Inspect the existing project and available brand assets.
3. Determine the correct visual direction.
4. Record the design brief and rationale.
5. Generate a project-specific design system.
6. Plan page structure and content hierarchy.
7. Implement the interface using the approved system.
8. Inspect the running application across relevant viewports.
9. Identify and correct generic patterns, inconsistencies and visual defects.
10. Report what was verified, what failed and what remains unresolved.

The workflow should feel like working with a skilled product designer, art director and frontend engineer together.

# 4. Source Capabilities to Combine

Pure SaaS must integrate the following capabilities into one system rather than simply placing three existing skills next to each other.

## 4.1 UI/UX Pro Max: Design Intelligence

Reference: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Incorporate the concepts of:

- Searchable design styles and patterns.
- Product and industry-specific design recommendations.
- Typography and color-palette selection.
- Design-system generation.
- UX principles and anti-pattern guidance.
- Responsive layout guidance.
- Accessibility requirements.
- Stack-specific implementation guidance.
- Component, chart and interaction recommendations.
- Relevant design-reference retrieval.

Pure SaaS should evaluate candidate styles against the actual product requirements instead of choosing the first available style.

It must distinguish between a style that is popular and a style that is appropriate.

## 4.2 Zero Slop Design: Persistent Decisions and Enforcement

Reference: https://github.com/zero-slop-design/zero-slop-design-plugin

Incorporate the concepts of:

- A persistent `DESIGN.md` as the design source of truth.
- A written design brief before implementation.
- Separation of approved decisions, agent proposals and unresolved questions.
- Explicit typography, color, layout and interaction definitions.
- Design-token export and validation.
- Design-system consistency checks.
- Detection of implementation drift.
- Accessibility review.
- Design-rule enforcement in code and CI.
- Evidence-based reporting that distinguishes measured results from assumptions.

The critical behavior to preserve is that the agent must not silently invent decisions and treat them as approved.

If a design decision can reasonably be inferred from the product and brief, the agent may propose a justified choice. It must record that choice and its rationale. If the decision materially changes the visual identity or conflicts with an explicit requirement, it must ask or mark it unresolved.

## 4.3 Apple Design Skill: Craft and Platform-Aware Review

Reference: https://github.com/dickwu/apple-design-skill

Incorporate the concepts of:

- Typography, hierarchy and visual clarity.
- Precision in alignment, spacing and component geometry.
- Appropriate use of color, materials and depth.
- Consistent iconography and visual language.
- Interaction feedback and state completeness.
- Accessibility, keyboard support and motion preferences.
- Clear content, labels and error messages.
- Platform-aware behavior where applicable.
- A structured critique explaining what is wrong, why it matters and how to fix it.
- A final craftsmanship review rather than relying on compilation or linting alone.

Apple-specific patterns must not be imposed on every website. Use Apple Human Interface Guidelines when building Apple-platform interfaces or when a specific principle is relevant. Translate broader principles of clarity, consistency and craftsmanship into appropriate web conventions.

## 4.4 Unified Capability

These three sources must become one coherent product.

The unified system must contain:

1. A design-intelligence layer for selecting suitable approaches.
2. A design-definition layer for recording approved decisions.
3. An implementation layer for building from those decisions.
4. A review layer for detecting visual and UX problems.
5. An enforcement layer for preventing regressions.
6. A cross-agent adapter layer for making the workflow portable.

The original repositories are references for capabilities and workflow design, not permission to copy and redistribute their code, data or documentation without checking the applicable licenses.

# 5. Design Philosophy

Pure SaaS must follow these principles.

## 5.1 Intentionality Over Convention

Never choose a design pattern merely because it is common in AI-generated websites.

Choose it because it solves a particular communication, usability or product problem.

## 5.2 Typography Is Structural

Typography must determine the visual hierarchy, rhythm and character of the page. It is not a finishing detail.

Font choice, weight, size, line height, letter spacing, line length and wrapping must be considered together.

## 5.3 Composition Over Component Accumulation

A website should be composed as a complete visual experience. Do not construct it by stacking unrelated cards and generic feature sections.

Use editorial layouts, asymmetry, controlled density, generous whitespace, grids, strong image placement and deliberate changes in rhythm when appropriate.

## 5.4 Consistency Without Monotony

Shared tokens and components must create coherence, but every section does not need to look identical.

The design may use different compositions for different content types while retaining a consistent underlying visual language.

## 5.5 Evidence Over Assumptions

Do not claim that a design is responsive, accessible, visually accurate or interaction-complete unless the relevant behavior has been checked.

## 5.6 Originality Over Imitation

Reference websites are sources of design insight, not templates to reproduce.

Extract principles such as typography, visual rhythm, product storytelling, interaction, density and composition. Develop a distinct identity for the target product.

# 6. Target Users and Use Cases

## 6.1 Primary Users

- Founders building SaaS products.
- Developers using AI coding agents.
- Designers working with AI-assisted implementation.
- Product teams maintaining design consistency.
- Developers improving an existing application.
- Teams building landing pages, dashboards, web applications and marketing sites.

## 6.2 Supported Use Cases

- Build a new website from a short brief.
- Design a complete SaaS marketing website.
- Build a dashboard or complex web application.
- Rework an existing frontend without breaking its backend.
- Extract a design system from an existing website or screenshot.
- Improve typography and visual hierarchy.
- Audit a website for generic AI patterns.
- Review accessibility and interaction states.
- Extend an established design system to new pages.
- Compare a running interface against approved design specifications.
- Export tokens and prevent design drift.
- Apply the correct platform conventions to desktop and mobile applications.

# 7. Functional Requirements

## FR-01: Automatic Activation

Pure SaaS must activate when an agent is asked to create, design, implement, refactor, review, improve or visually fix an interface.

It must also activate when a coding task affects shared styles, layout primitives, typography, colors, components or responsive behavior.

A narrowly scoped backend task should not trigger an unnecessary full design workflow unless it affects the interface.

## FR-02: Project Discovery

Before changing an existing project, inspect:

- Repository structure and project instructions.
- Framework, routing and styling approach.
- Existing design tokens and component libraries.
- Current page structure and shared components.
- Brand assets, fonts, icons and images.
- Existing responsive behavior and theme support.
- Authentication, data and application behavior that must remain intact.

Do not replace an established system simply because the agent prefers a different framework or aesthetic.

For an existing application, preserve backend logic, APIs, authentication, data models and functionality unless the user explicitly authorizes changes.

## FR-03: Design Brief

Create `design-brief.md` when starting a substantial new design.

Record:

- Product purpose.
- Target audience.
- Primary user tasks.
- Business objectives.
- Brand personality.
- Required pages and content.
- Functional requirements.
- Visual references.
- Preferred and prohibited design patterns.
- Technical constraints.
- Accessibility requirements.
- Responsive requirements.
- Known uncertainties.

Separate user-approved decisions from agent proposals and unresolved questions.

For small changes, use the existing brief or a concise task-specific decision record rather than generating unnecessary documentation.

## FR-04: Design-System Generation

Create `DESIGN.md` as the authoritative design specification.

The file must define:

- Design principles and rationale.
- Brand direction.
- Color tokens and semantic roles.
- Typography system.
- Spacing scale.
- Layout grid and container rules.
- Breakpoint behavior.
- Border and radius rules.
- Elevation and surface treatments.
- Iconography.
- Imagery and illustration direction.
- Motion principles.
- Component specifications.
- Interaction states.
- Accessibility requirements.
- Responsive rules.
- Approved exceptions.
- Source and confidence for extracted or estimated values.
- Unresolved decisions.

The design system must be tailored to the product, not generated from a universal template.

## FR-05: Design Decision Provenance

Every important token or rule must have a traceable origin.

Supported origins include:

- Explicit user instruction.
- Existing project design system.
- Approved brand asset.
- Measured reference.
- Applicable platform guideline.
- Agent proposal with a written rationale.

Mark proposals clearly. Preserve uncertainty in extracted reference values.

The agent must not convert an estimate into an approved design rule without review.

## FR-06: Typography Engine

Typography is a mandatory design phase.

The agent must evaluate:

- Typeface personality and product fit.
- Display, heading, body, label, metadata and code roles.
- Font weight and available font files.
- Size hierarchy and responsive scaling.
- Line height and letter spacing.
- Maximum text width and line length.
- Paragraph rhythm.
- Heading wrapping and orphaned words.
- Numeral alignment where relevant.
- Font loading and fallback behavior.
- Readability at mobile and desktop sizes.

Choose typefaces deliberately rather than automatically using a familiar default.

Use one family when that creates the strongest identity. Use two or more only when the contrast has a clear purpose.

Do not use a distinctive display font for dense body text simply because it looks attractive in a heading.

Do not invent unavailable font weights or rely on synthetic italics when a proper font file is required.

Use local, licensed or appropriately hosted font assets. If a chosen typeface cannot be used, document the fallback and preserve the intended typographic character.

## FR-07: Color and Theme System

Define semantic tokens rather than scattering raw colors throughout the application.

Include roles for:

- Page background.
- Surfaces and elevated surfaces.
- Primary and secondary text.
- Muted text.
- Primary and secondary actions.
- Borders and dividers.
- Focus indicators.
- Success, warning, error and informational states.

Support light and dark themes when required by the product. Do not add dark mode automatically if it has no product requirement or approved rationale.

Evaluate contrast, distinguishability and the behavior of colors across surfaces.

Gradients, glow, blur and glass effects are permitted only when they serve the chosen art direction. They must never be automatic defaults.

## FR-08: Layout and Composition

The agent must plan page structure before implementing individual sections.

Define:

- Main content width.
- Grid and column relationships.
- Alignment anchors.
- Section spacing.
- Text and media proportions.
- Content hierarchy.
- Responsive rearrangement.
- Visual density.
- Reading order.
- Section transitions.
- Footer and navigation structure.

Use asymmetry when it improves composition, not as decoration.

Do not force every page into a centered hero, three-column feature grid, repeated card collection and logo strip.

A card should exist because its content or interaction benefits from being grouped into a distinct surface.

Prefer direct composition, typography, whitespace, borders and layout when these communicate more effectively than additional containers.

## FR-09: Originality and Anti-Slop Rules

Run an anti-slop review before implementation and after visual changes.

The agent must challenge these patterns when they have no explicit rationale:

- Generic gradient backgrounds.
- Excessive glassmorphism.
- Repeated rounded cards.
- Identical feature grids.
- Decorative pill badges.
- Floating or pill-shaped navigation.
- Oversized gradients behind headlines.
- Unnecessary blurred glows.
- Emoji used as interface icons.
- Generic stock imagery unrelated to the product.
- Fake product dashboards.
- Repetitive section structures.
- Excessive shadows and borders.
- Random animation.
- Generic marketing copy.
- Repeated use of the same layout across unrelated pages.

These are review triggers, not absolute bans. A particular pattern may be appropriate if it fits the brand, content and usability requirements.

The agent must explain why a pattern belongs in the design rather than defending it because it is easy to generate.

## FR-10: Content and Product Storytelling

The interface must communicate the product clearly.

For marketing websites, establish:

- What the product is.
- Who it serves.
- What problem it solves.
- What makes it distinct.
- How it works.
- Evidence of its value.
- The next meaningful action.

Use specific, product-relevant language.

Avoid generic claims such as “Unlock your potential,” “Revolutionize your workflow,” or “The future is here” unless they are genuinely justified by the brand and context.

Do not invent customer logos, testimonials, usage figures, certifications, product capabilities or performance claims.

## FR-11: Real Visual Assets

Use genuine product screenshots, meaningful diagrams, original illustrations or properly licensed imagery when they materially improve the experience.

Prioritize existing project assets and approved brand materials.

When assets are missing, use a suitable original asset, a clearly identified placeholder during development or a restrained text-based layout.

Never fabricate a screenshot of a functioning product and present it as real.

Every visual asset must have a purpose, appropriate crop, resolution and responsive treatment.

## FR-12: Component Design

Define reusable components only where reuse improves consistency and maintainability.

Specify each relevant component's:

- Geometry.
- Typography.
- Spacing.
- Colors.
- Variants.
- Responsive behavior.
- Interaction states.
- Accessibility behavior.
- Permitted exceptions.

Avoid creating an abstraction for every small visual element.

Avoid both uncontrolled duplication and overengineering a component system for a small website.

## FR-13: Complete Interaction States

Define and implement applicable states for interactive elements:

- Default.
- Hover.
- Focus-visible.
- Pressed.
- Selected.
- Disabled.
- Loading.
- Empty.
- Error.
- Success.

Include additional states when the product requires them.

Every state must have an understandable visual response and meaningful behavior.

Forms must preserve user input after recoverable failures. Destructive actions should provide appropriate safeguards. Loading indicators must correspond to real work.

## FR-14: Motion and Microinteractions

Motion must communicate state, hierarchy, causality or spatial relationships.

Specify:

- Trigger.
- Duration.
- Easing.
- Distance or transformation.
- Entry and exit behavior.
- Reduced-motion alternative.

Use animation selectively. Avoid animating every element on scroll, unnecessary parallax, decorative cursor effects and perpetual motion.

Prefer performant properties such as transform and opacity when appropriate. Avoid motion that creates layout shifts or interferes with reading.

Respect `prefers-reduced-motion`.

## FR-15: Responsive Design

Design responsively around content and layout constraints rather than blindly applying device labels.

Test relevant viewport sizes, including narrow mobile, tablet and desktop widths.

Verify:

- Navigation behavior.
- Heading wrapping.
- Content order.
- Image crops.
- Grid transitions.
- Container padding.
- Touch target sizing.
- Form usability.
- Overflow and horizontal scrolling.
- Footer layout.
- Long words and URLs.
- Text scaling and zoom.

The mobile interface must be deliberately designed, not treated as a compressed desktop layout.

## FR-16: Accessibility

Target WCAG 2.2 AA for web interfaces unless a project has a justified alternative requirement.

Review:

- Semantic HTML.
- Heading order.
- Keyboard navigation.
- Visible focus.
- Color contrast.
- Accessible names and labels.
- Form errors and instructions.
- Alternative text.
- Screen-reader behavior.
- Reduced motion.
- Zoom and text resizing.
- Touch target size and spacing.
- Dialog focus management.
- Status announcements.

Automated checks must be supplemented by manual checks where necessary.

Never claim full accessibility conformance from a passing automated scan alone.

## FR-17: Reference Website Analysis

When the user supplies a reference website, screenshot or design file, inspect it before implementing the target design.

Extract:

- Typography and hierarchy.
- Content width and grid.
- Section composition.
- Spacing rhythm.
- Palette and semantic color roles.
- Image treatment.
- Navigation structure.
- Component geometry.
- Interaction behavior.
- Motion and transitions.
- Responsive differences.

Record source URLs, inspection dates, viewport sizes and measurement methods when applicable.

Distinguish measured values from visual estimates. Identify missing states and incomplete coverage.

Do not assume that a static screenshot establishes keyboard behavior, accessibility, motion or mobile behavior.

Do not copy proprietary brand assets, logos, copy or a distinctive design wholesale. Translate the relevant principles into an original design for the target product.

## FR-18: Design Implementation

The agent must implement the approved design system instead of inventing independent values in each component.

Use the project's existing framework, conventions and component stack wherever appropriate.

Use semantic tokens, consistent layout primitives and reusable patterns.

Do not introduce additional dependencies solely for decorative effects without a clear benefit.

Do not overwrite unrelated functionality during visual changes.

## FR-19: Design Review

After implementation, inspect the actual rendered interface.

Review:

- Typography and line wrapping.
- Alignment and spacing.
- Visual hierarchy.
- Density and composition.
- Token consistency.
- Asset quality.
- Responsive behavior.
- Interaction states.
- Accessibility.
- Motion.
- Product-specific originality.
- Visual differences between pages.

For each finding, record the issue, its impact, evidence and recommended correction.

Fix high-impact issues before minor polish.

## FR-20: Design Drift Detection

Compare the running interface with `DESIGN.md`.

Identify:

- Unapproved colors.
- Inconsistent typography.
- Arbitrary spacing values.
- Incorrect component geometry.
- Missing interaction states.
- Responsive regressions.
- Unapproved effects.
- Components that diverge from shared patterns.

Allow documented exceptions for legitimate cases such as data visualization, third-party components or special brand moments.

A legitimate exception must identify its scope and rationale.

## FR-21: Design Enforcement

Provide a validation command that checks the design specification and supported implementation rules.

Required capabilities:

- Validate design-file structure.
- Resolve token references.
- Detect contradictory values.
- Check required component states.
- Detect disallowed raw style values where reliable.
- Check token mappings.
- Report approved exceptions.
- Produce machine-readable results.
- Support CI integration.

Enforcement must be deterministic wherever possible.

Do not pretend a static code scan can understand every visual decision. Route subjective or context-dependent issues to visual review.

## FR-22: Safe Changes to Existing Projects

Before making substantial changes, identify the affected files and shared dependencies.

Preserve application behavior and established user decisions.

When modifying an existing design system, change only the necessary decisions and dependent values.

Do not rewrite unrelated pages, migrate frameworks or replace the component library without authorization.

## FR-23: Honest Completion Reporting

At the end of a design task, report:

- What changed.
- Which pages and components were affected.
- Which validation checks passed.
- Which viewports and states were inspected.
- Which issues were fixed.
- Which checks were not run.
- Which unresolved decisions remain.

Never claim that a page was visually inspected if it was not rendered or examined.

# 8. Reference Design Analysis: Firecrawl and Butter

The reference websites demonstrate why Pure SaaS must use design intelligence rather than a fixed template.

## 8.1 Firecrawl: Product-Led Technical Clarity

Reference: https://www.firecrawl.dev/

Firecrawl's public positioning centers on a specific developer problem: accessing and converting web content into data that AI applications can use.

The design analysis should examine the relationship between its concise messaging, high-contrast hierarchy, recognizable accent color, product demonstrations and developer-focused information architecture.

Design characteristics to investigate:

- A clear statement of what the product does.
- A strong visual hierarchy that makes the proposition easy to understand.
- Restrained use of the brand accent.
- A balance between marketing content and concrete product evidence.
- Code, API or workflow demonstrations where relevant.
- Distinct sections explaining capabilities and use cases.
- Clear calls to action.
- A coherent visual language across the page.

Pure SaaS must not assume that Firecrawl's exact colors, typeface, spacing values or effects are universally appropriate. It must inspect the current site and validate any extracted values before using them.

## 8.2 Butter: Expressive Creative Direction

Reference: https://www.butter.video/

Butter's public homepage positions the product as a creative video-editing environment. Its presentation uses expressive typography and visual demonstrations to communicate creative possibilities.

The design analysis should investigate:

- Oversized typography and distinctive text proportions.
- A strong creative identity.
- Media-led storytelling.
- Product previews that communicate real capabilities.
- Visual variety between sections.
- The relationship between typography, imagery and whitespace.
- How the layout communicates a creative tool rather than a generic SaaS dashboard.
- How product examples help users understand the offering.
- How the design balances expressive marketing with usability.

Pure SaaS must not interpret Butter as permission to make every website oversized, colorful or animation-heavy.

Its underlying lesson is that the visual language should emerge from the product itself.

## 8.3 The Shared Principles

Despite their different identities, these examples should be evaluated against shared principles:

1. The product has a recognizable visual identity.
2. Typography is a deliberate part of the composition.
3. The page has a meaningful content hierarchy.
4. Visuals contribute to product storytelling.
5. Sections are composed for their individual purposes.
6. The layout avoids arbitrary decoration.
7. Product messaging is specific.
8. The visual language remains coherent.
9. The design is evaluated as a complete page, not just as individual components.

These principles must guide Pure SaaS. The exact styles must remain product-specific.

# 9. Design Reference Capture and Evidence

Pure SaaS should support a structured reference format inspired by the supplied Firecrawl and Butter design records.

A reference record should contain:

- Version and name.
- Source URL.
- Capture date.
- Inspection method.
- Viewport dimensions.
- Screenshots or other available evidence.
- Computed style measurements where accessible.
- Typography and color observations.
- Layout and spacing observations.
- Component observations.
- Interaction findings.
- Accessibility findings.
- Confidence and review status.
- Missing information.
- Unresolved questions.

Use a status model such as `draft`, `reviewed` and `approved`.

A record created from computed styles alone must not be treated as a complete design specification.

The agent must not infer semantic roles from color frequency or a single DOM selector alone. It must compare computed values with the actual visual result and inspect representative states.

Missing assets, inaccessible routes, incomplete screenshots and untested interactions must be recorded explicitly.

# 10. Agent Workflow

Pure SaaS must operate as a single workflow with specialized stages.

## Stage A: Discover

Inspect project context, existing implementation, user requirements and references.

Output: a concise understanding of the task and constraints.

## Stage B: Define

Create or update the design brief. Separate explicit decisions, justified proposals and unresolved questions.

Output: `design-brief.md`.

## Stage C: Establish

Generate or update the project design system, including typography, color, layout, components and interaction rules.

Output: `DESIGN.md` and implementation-ready tokens.

## Stage D: Plan

Plan page composition, hierarchy, content and responsive behavior before implementing the interface.

Output: an implementation plan proportionate to the task.

## Stage E: Build

Implement the interface using the project's existing stack and the approved design system.

Output: working code, not merely a mockup or static screenshot.

## Stage F: Inspect

Run the application and examine relevant pages, states and viewports.

Output: evidence-backed design findings.

## Stage G: Refine

Correct defects, inconsistent tokens, weak typography, generic patterns and incomplete behavior.

Repeat inspection for the affected areas.

## Stage H: Enforce

Run available design validation, accessibility checks, tests and build checks.

Output: validation results and unresolved failures.

## Stage I: Report

Summarize the changes, verification performed, limitations and remaining issues.

The stages must be iterative. A failed review returns the work to the relevant stage rather than allowing the agent to proceed as if the design were complete.

For small changes, the workflow may be shortened, but the agent must retain the applicable rules and checks.

# 11. Deliverable File Structure

The project should be organized so the core skill can be maintained independently of agent-specific installation files.

```text
pure-saas/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SKILL.md
├── AGENTS.md
├── references/
│   ├── design-principles.md
│   ├── typography.md
│   ├── layout-and-composition.md
│   ├── color-and-tokens.md
│   ├── anti-slop-rules.md
│   ├── interaction-states.md
│   ├── responsive-design.md
│   ├── accessibility.md
│   ├── motion.md
│   ├── reference-analysis.md
│   ├── design-review.md
│   └── platform-guidelines.md
├── schemas/
│   ├── design-brief.schema.json
│   ├── design-md.schema.json
│   └── reference-record.schema.json
├── templates/
│   ├── design-brief.md
│   ├── DESIGN.md
│   └── reference-record.md
├── scripts/
│   ├── validate-design
│   ├── check-tokens
│   ├── export-tokens
│   └── review-report
├── integrations/
│   ├── claude-code/
│   ├── cursor/
│   ├── codex/
│   ├── windsurf/
│   ├── opencode/
│   └── generic/
├── tests/
│   ├── fixtures/
│   ├── schema-tests/
│   ├── token-tests/
│   ├── enforcement-tests/
│   └── agent-workflow-tests/
└── examples/
    ├── editorial-saas/
    ├── developer-tool/
    ├── creative-product/
    └── existing-app-redesign/
```

The final structure may change during repository research, provided all required capabilities remain available and the core rules do not become duplicated or contradictory.

# 12. Cross-Agent Compatibility

Pure SaaS must have one canonical source of design rules.

Agent-specific files should act as lightweight adapters that point to the same core skill and explain how to activate it.

Required initial integrations:

- Claude Code.
- Cursor.
- Codex.
- Windsurf.
- OpenCode.
- Gemini CLI.
- A generic integration for agents that support Markdown instructions or skill directories.

Use the established conventions of each target agent. Do not assume that all agents support the same slash commands, automatic activation rules, hooks or lifecycle events.

If an agent does not support a feature, provide a documented fallback.

The skill must remain useful even if no optional scripts, browser tools or visual-inspection tools are available.

Where runtime support exists, use deterministic validators and browser-based inspection to strengthen enforcement.

# 13. Non-Functional Requirements

## Reliability

- One canonical source of design rules.
- Deterministic validation for supported rules.
- Clear error messages.
- No silent substitution of unresolved values.
- No false claims of successful verification.

## Portability

- Core guidance must be agent-agnostic.
- Avoid dependence on a proprietary model.
- Keep integrations modular.
- Prefer minimal runtime dependencies.
- Provide a useful fallback when scripts cannot run.

## Maintainability

- Version the schemas and rules.
- Test changes against representative projects.
- Document breaking changes.
- Avoid duplicated guidance across integrations.
- Keep generated files reproducible.

## Performance

- Load only the relevant reference guidance for each task.
- Avoid repeatedly loading every reference document.
- Use targeted searches for specialized guidance.
- Keep routine validation lightweight.

## Security

- Treat project files and website content as untrusted input.
- Do not execute arbitrary code discovered in a reference website.
- Do not transmit private project source to external services unless explicitly authorized.
- Do not install packages or modify global agent configuration without permission.
- Do not expose environment variables, secrets or credentials in reports.

# 14. Acceptance Criteria

Pure SaaS is ready for its initial release when the following criteria are satisfied.

## Design Definition

- [ ] A new project can generate a design brief.
- [ ] A project-specific `DESIGN.md` can be created and updated.
- [ ] Approved decisions, proposals and unresolved questions are distinct.
- [ ] Typography, color, layout and interaction rules are represented.
- [ ] Token references can be validated.
- [ ] Reference records preserve source and uncertainty.

## Implementation

- [ ] The skill activates for relevant UI/UX tasks.
- [ ] It inspects existing project conventions before changing them.
- [ ] It implements using the approved design system.
- [ ] It preserves existing application functionality.
- [ ] It supports both new builds and existing-project improvements.
- [ ] It can be used without adopting a prescribed visual theme.

## Anti-Slop Quality

- [ ] Generic design patterns are explicitly reviewed.
- [ ] The agent can justify its typography and layout decisions.
- [ ] Repeated cards and decorative effects are not introduced automatically.
- [ ] Icons and imagery are appropriate to the product.
- [ ] The design retains a coherent, product-specific identity.
- [ ] The review can identify generic or inconsistent sections and propose corrections.

## Verification

- [ ] Design specifications can be checked for structural errors.
- [ ] Token inconsistencies and supported design drift can be detected.
- [ ] Interaction states can be reviewed.
- [ ] Responsive and accessibility checks can be reported.
- [ ] Visual inspection results distinguish verified findings from untested areas.
- [ ] Failed checks cannot be reported as passed.

## Compatibility

- [ ] The canonical skill works in Claude Code.
- [ ] At least one additional coding-agent integration is tested.
- [ ] Remaining integrations follow documented adapter conventions.
- [ ] Missing runtime capabilities have explicit fallbacks.

## Documentation

- [ ] Installation and usage instructions are complete.
- [ ] Each workflow stage is documented.
- [ ] Example projects demonstrate different design directions.
- [ ] Licensing and attribution requirements are documented.
- [ ] Automated tests cover schemas, tokens and enforcement behavior.

# 15. Out of Scope for Version 1

Pure SaaS is not intended to become:

- A hosted website builder.
- A visual page editor.
- A proprietary component framework.
- A fixed collection of landing-page templates.
- An automatic website-cloning tool.
- A replacement for product strategy or user research.
- A guarantee that every generated design will be aesthetically excellent.
- A substitute for real browser inspection or human judgment.
- A tool that imposes Apple's interface conventions on every platform.
- A tool that rewrites an entire application whenever a design issue is reported.

The initial release should focus on the skill, its design records, reusable guidance, validation utilities and agent integrations.

# 16. Implementation Priorities

## P0: Essential

- Canonical `SKILL.md`.
- Persistent design brief and `DESIGN.md`.
- Typography, color, layout and component rules.
- Explicit anti-slop guidance.
- Build and review workflow.
- Token validation.
- Honest verification reports.
- Claude Code integration.
- Tests and documentation.

## P1: High Value

- Additional agent integrations.
- Reference-site extraction workflow.
- Structured reference schemas.
- Responsive inspection.
- Accessibility review.
- Design-drift detection.
- Token export.
- CI enforcement.
- Example projects.

## P2: Advanced

- Richer automated visual comparisons.
- More extensive stack-specific guidance.
- Reference library with provenance and review status.
- Automated interaction-state inspection.
- Configurable policy profiles.
- Optional visual-quality scoring calibrated against human-reviewed examples.

# 17. Definition of Success

Pure SaaS succeeds when developers can use an AI coding agent to build and maintain interfaces that are:

- Distinctive rather than generic.
- Typographically coherent.
- Well-composed and easy to navigate.
- Consistent across pages.
- Responsive and accessible.
- Functionally complete.
- Faithful to documented design decisions.
- Verifiably implemented rather than merely described.

The primary success metric is a reduction in human corrections required to bring AI-generated interfaces to an acceptable design standard.

Supporting metrics include:

- Design-token consistency.
- Number of unresolved design decisions.
- Visual defects detected before delivery.
- Responsive defects detected before delivery.
- Interaction-state coverage.
- Accessibility defects detected and corrected.
- Number of unapproved design deviations.
- Human reviewer ratings of originality, hierarchy, typography and usability.

These metrics must be evaluated against a representative test suite and, for subjective quality, human-reviewed examples. A numerical score must never substitute for evidence of actual design quality.

# 18. Final Product Principle

Pure SaaS must not make every website look the same in an attempt to prevent AI slop.

It must make every website look as though someone made deliberate decisions about what that particular product should look like.

The system establishes the constraints. The product establishes the identity. The agent implements the decisions. Verification establishes what actually works.

**Pure SaaS: Design with intent. Build with discipline. Ship without slop.**
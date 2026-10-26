# Pure SaaS Reference Architecture & Index

> Master reference directory and routing index for Pure SaaS.
> Modeled after Apple Human Interface Guidelines and zero-slop design specifications.

Pure SaaS follows the **"Read Before You Cite"** architecture. Core agent instructions remain focused and lean; detailed domain rules, measurements, platform mappings, and code patterns reside in dedicated reference documents loaded dynamically based on the task.

---

## Reference Routing Index

| Reference Document | Domain & Focus | When to Load | Core Principles & Standards |
| :--- | :--- | :--- | :--- |
| **[`design-principles.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-principles.md)** | Core Design Philosophy | **Always loaded** | Clarity, Deference, Depth, Authenticity, and Functional Elegance. |
| **[`typography.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/typography.md)** | Typographic System | **Always loaded** | Optical hierarchy, font pairings, tracking (`letter-spacing`), fluid scale, line heights (1.4–1.6). |
| **[`color-and-tokens.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/color-and-tokens.md)** | Semantic Color Architecture | **Always loaded** | Role-based token hierarchy (`canvas`, `surface`, `text`, `action`, `border`), light/dark modes, 4.5:1 contrast. |
| **[`layout-and-composition.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/layout-and-composition.md)** | Spatial Structure & Grid | **Always loaded** | Asymmetric visual hierarchy, 8pt spatial grid, content containment, optical balance. |
| **[`anti-slop-rules.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/anti-slop-rules.md)** | Anti-Generic Design Discipline | **Always loaded / Polish / Review** | 7 deadly AI slop patterns, banishing repetitive 3-column cards, purple gradient text, and emoji icons. |
| **[`design-styles-catalog.json`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-styles-catalog.json)** | Design Intelligence Taxonomy | **Design / Scaffolding / Style CLI** | 12 curated production styles, 10 product archetypes, and multi-stack best practices. |
| **[`interaction-states.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/interaction-states.md)** | Component State Matrix | **Component creation / Forms** | Complete 8-state matrix: default, hover, focus, active, disabled, loading, error, success. |
| **[`accessibility.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/accessibility.md)** | WCAG 2.2 AA Compliance | **Review / Polish / Accessible UX** | Keyboard operable, visible focus ring, ARIA semantics, 44px min touch targets, screen reader labels. |
| **[`responsive-design.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/responsive-design.md)** | Cross-Device Fluidity | **Responsive command / Layouts** | Mobile (375-430px), Tablet (768-834px), Laptop (1024-1280px), Desktop (1440px+), container queries. |
| **[`cross-platform.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/cross-platform.md)** | Cross-Platform Translation | **React Native / Flutter / Desktop** | Vocabulary mapping between Apple HIG, Android Material, and Web; safe areas, dynamic type. |
| **[`code-audit.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/code-audit.md)** | Static Code Audit & Anti-Patterns | **Review command / Pull Requests** | Grep patterns, guideline citations, severity levels, and stack-specific replacement code. |
| **[`motion.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/motion.md)** | Motion, Transitions & Micro-interactions | **Animation / Transitions** | Purposeful motion, spring physics, duration guidelines (150ms-300ms), reduced-motion overrides. |
| **[`platform-guidelines.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/platform-guidelines.md)** | Host Platform Conventions | **Web / macOS / iOS / Mobile** | Platform idiomatic navigation, window controls, menus, and system surfaces. |
| **[`reference-analysis.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/reference-analysis.md)** | Live Reference Reverse Engineering | **Reference command** | DevTools inspection protocol, computed style extraction, 16-section `DESIGN.md` specification. |
| **[`design-review.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-review.md)** | Quality Review Methodology | **Review command** | Evidence-based audit protocol, test vs untested tracking, verification reporting. |

---

## Loading Strategy for Coding Agents

1. **Base Working Context (Always loaded)**:
   - `design-principles.md`
   - `typography.md`
   - `color-and-tokens.md`
   - `layout-and-composition.md`
   - `anti-slop-rules.md`
2. **Context-Specific Routing (Load 2 to 4 on demand)**:
   - *Working on buttons, forms, inputs:* load `interaction-states.md`, `accessibility.md`.
   - *Working on responsive layouts, viewports:* load `responsive-design.md`, `cross-platform.md`.
   - *Working on code audit or review:* load `code-audit.md`, `design-review.md`.
   - *Working on animations or micro-interactions:* load `motion.md`.
   - *Working from a reference URL:* load `reference-analysis.md`.
   - *Working on mobile or native desktop:* load `cross-platform.md`, `platform-guidelines.md`.
3. **The "Read Before You Cite" Rule**:
   - Never quote or reference a guideline from memory. Always inspect the reference file and cite both the file and the section (e.g. `references/code-audit.md › Focus Suppression`).

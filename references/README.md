# Pure SaaS Reference Architecture & Index

> Master reference directory and routing index for Pure SaaS.
> Modeled after Apple Human Interface Guidelines and zero-slop design specifications.

Pure SaaS follows the **"Read Before You Cite"** architecture. Core agent instructions remain focused and lean; detailed domain rules, measurements, platform mappings, component patterns, and code examples reside in dedicated reference documents loaded dynamically based on the task.

---

## 1. Reference Collections

### A. Apple Human Interface Guidelines (`references/hig/` — 124 Documents)
Individual, substantive reference documents organized by Apple HIG topics:
- **Foundations & Principles:** `accessibility.md`, `design-principles.md`, `color.md`, `typography.md`, `layout.md`, `materials.md`, `motion.md`, `dark-mode.md`, `inclusion.md`, `privacy.md`, `icons.md`, `app-icons.md`, `images.md`, `writing.md`.
- **Platform Conventions:** `designing-for-ios.md`, `designing-for-macos.md`, `designing-for-ipados.md`.
- **Interaction Patterns:** `modality.md`, `sheets.md`, `popovers.md`, `alerts.md`, `context-menus.md`, `drag-and-drop.md`, `feedback.md`, `loading.md`, `notifications.md`, `onboarding.md`, `live-activities.md`, `widgets.md`, `apple-pay.md`.
- **Component Patterns (57 Components):** `buttons.md`, `pop-up-buttons.md`, `pull-down-buttons.md`, `segmented-controls.md`, `toggles.md`, `sliders.md`, `steppers.md`, `pickers.md`, `color-wells.md`, `lists-and-tables.md`, `collection-views.md`, `scroll-views.md`, `split-views.md`, `tab-bars.md`, `sidebars.md`, `toolbars.md`, `menus.md`, `text-fields.md`, `search-fields.md`, `gauges.md`, `progress-indicators.md`, `charts.md`.
- **Input Technologies:** `gestures.md`, `keyboards.md`, `pointing-devices.md`, `apple-pencil-and-scribble.md`, `game-controls.md`.
- **Curated Guides:** `liquid-glass.md` (Liquid Glass material review checklist and multi-stack translations).

### B. Framework Engineering Guides (`references/frameworks/` — 22 Frameworks)
Dedicated implementation guides with actionable Do/Don't patterns, severity ratings, and code examples:
- **Web & Meta-Frameworks:** `react.md`, `nextjs.md`, `vue.md`, `nuxtjs.md`, `nuxt-ui.md`, `svelte.md`, `html-tailwind.md`, `shadcn.md`, `angular.md`, `astro.md`, `laravel.md`.
- **Mobile & Cross-Platform:** `react-native.md`, `flutter.md`, `swiftui.md`, `jetpack-compose.md`.
- **Desktop & Native UI:** `electron.md`, `winui.md`, `wpf.md`, `uwp.md`, `uno.md`, `avalonia.md`, `javafx.md`.
- **3D & Canvas:** `threejs.md`.

### C. Core Craft & Quality Guides (`references/*.md`)
| Reference Document | Focus | When to Load | Core Principles |
| :--- | :--- | :--- | :--- |
| **[`design-principles.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-principles.md)** | Core Design Philosophy | **Always loaded** | Clarity, Deference, Depth, Authenticity, and Functional Elegance. |
| **[`typography.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/typography.md)** | Typographic System | **Always loaded** | Optical hierarchy, font pairings, tracking (`letter-spacing`), fluid scale, line heights. |
| **[`color-and-tokens.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/color-and-tokens.md)** | Semantic Color Architecture | **Always loaded** | Role-based token hierarchy (`canvas`, `surface`, `text`, `action`, `border`), light/dark modes. |
| **[`layout-and-composition.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/layout-and-composition.md)** | Spatial Structure & Grid | **Always loaded** | Asymmetric visual hierarchy, 8pt spatial grid, content containment, optical balance. |
| **[`anti-slop-rules.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/anti-slop-rules.md)** | Anti-Generic Design Discipline | **Always loaded / Polish / Review** | 7 deadly AI slop patterns, banishing repetitive 3-column cards, purple gradient text, and emoji icons. |
| **[`interaction-states.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/interaction-states.md)** | Component State Matrix | **Component creation / Forms** | Complete 8-state matrix: default, hover, focus-visible, active, disabled, loading, empty, error/success. |
| **[`accessibility.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/accessibility.md)** | WCAG 2.2 AA Compliance | **Review / Polish / Accessible UX** | Keyboard operable, visible focus ring, ARIA semantics, 44px min touch targets, screen reader labels. |
| **[`responsive-design.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/responsive-design.md)** | Cross-Device Fluidity | **Responsive command / Layouts** | Mobile (375-430px), Tablet (768-834px), Laptop (1024-1280px), Desktop (1440px+), container queries. |
| **[`cross-platform.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/cross-platform.md)** | Cross-Platform Translation | **React Native / Flutter / Desktop** | Vocabulary mapping between Apple HIG, Android Material, and Web; safe areas, dynamic type. |
| **[`code-audit.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/code-audit.md)** | Static Code Audit & Anti-Patterns | **Review command / Pull Requests** | Grep patterns, guideline citations, severity levels, and stack-specific replacement code. |
| **[`motion.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/motion.md)** | Motion, Transitions & Micro-interactions | **Animation / Transitions** | Purposeful motion, spring physics, duration guidelines (150ms-300ms), reduced-motion overrides. |
| **[`platform-guidelines.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/platform-guidelines.md)** | Host Platform Conventions | **Web / macOS / iOS / Mobile** | Platform idiomatic navigation, window controls, menus, and system surfaces. |
| **[`hig-lookup.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/hig-lookup.md)** | Apple HIG Topic Index & Routing | **Apple platforms / HIG routing** | 123 Apple Human Interface Guidelines mapped across Foundations, Patterns, Components, and Inputs. |
| **[`reference-analysis.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/reference-analysis.md)** | Live Reference Reverse Engineering | **Reference command** | DevTools inspection protocol, computed style extraction, 16-section `DESIGN.md` specification. |
| **[`design-review.md`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-review.md)** | Quality Review Methodology | **Review command** | Evidence-based audit protocol, test vs untested tracking, verification reporting. |
| **[`design-intelligence.json`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-intelligence.json)** | Comprehensive Design Intelligence Dataset | **Design / Query CLI / Archetypes** | 88 styles, 192 product types, 192 color palettes, 74 font pairings, 34 landing patterns, 119 UX heuristics, 25 chart guides, 17 motion patterns, 32 app UI guides, 22 stacks. |
| **[`design-styles-catalog.json`](file:///Users/lmgxenon/Downloads/pure%20saas/references/design-styles-catalog.json)** | Design Intelligence Taxonomy | **Design / Scaffolding / Style CLI** | 12 curated production styles, 10 product archetypes, and multi-stack best practices. |

---

## 2. Searching & Retrieving References

Agents and developers can search the entire reference library using the built-in CLI:

```bash
# Search by component
npx pure-saas ref "modal"
npx pure-saas ref "button"
npx pure-saas ref "table"

# Search by framework
npx pure-saas ref "react"
npx pure-saas ref "tailwind"
npx pure-saas ref "swiftui"

# Search by craft or topic
npx pure-saas ref "accessibility"
npx pure-saas ref "motion"
npx pure-saas ref "mobile navigation"

# Output machine-readable JSON for agents
npx pure-saas ref "cards" --json
```

---

## 3. The 5-Tier Precedence Hierarchy

When synthesizing decisions, styling rules, or reconciling conflicting patterns across platforms and tools, apply this strict precedence:

1. **User Requirements & Established Brand System:** Explicit user instructions, existing brand assets, established color tokens, and active typography rules always take top priority.
2. **Platform Conventions & Accessibility Standards:** Native platform requirements (Apple HIG on macOS/iOS, Web standards on browsers) and WCAG 2.2 AA accessibility requirements (contrast, focus indicators, 44px min touch targets).
3. **Verified Project Decisions & Approved Tokens:** The immutable tokens and rules recorded in the root `DESIGN.md`.
4. **Retrieved Reference Intelligence:** Guidance retrieved from `references/hig/`, `references/frameworks/`, and `references/design-intelligence.json`.
5. **New Proposals:** Suggestions not previously approved, explicitly marked as proposals with open items tracked in the `unresolved` ledger.

---

## 4. Design Intelligence & Verification CLI Tools

Pure SaaS equips coding agents with zero-dependency CLI tools to query intelligence and enforce design rules:

```bash
# Query multi-domain design intelligence (styles, products, colors, typography, UX, landing, charts, motion)
npx pure-saas query [domain] "<keyword or query>"
npx pure-saas style "<query>" --product "<type>" --stack "<stack>"

# Programmatically generate an approved DESIGN.md tailored to product archetype and design dials
npx pure-saas design-system --product "<type>" --variance <1-10> --motion <1-10> --density <1-10> --out DESIGN.md

# Audit color contrast against WCAG 2.2 AA (4.5:1 text, 3.0:1 UI) and AAA (7.0:1)
npx pure-saas contrast DESIGN.md

# Diff tokens between two design files or versions
npx pure-saas diff DESIGN.before.md DESIGN.md

# Detect design drift between expected tokens and live observed values
npx pure-saas drift DESIGN.md observations.json

# Scan source code against design tokens with known defects baseline tracking
npx pure-saas check DESIGN.md --source src --known known-defects.json

# Export tokens to required format (CSS custom properties, Tailwind v3/v4, DTCG 2025.10, or JSON)
npx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json
```

---

## 5. The "Read Before You Cite" Rule

- Never quote or reference a guideline from memory. Always inspect the reference file and cite both the file and the section (e.g. `references/hig/buttons.md › Best practices` or `references/frameworks/react.md › State`).
- Load 3 to 6 focused reference documents relevant to the current user prompt.

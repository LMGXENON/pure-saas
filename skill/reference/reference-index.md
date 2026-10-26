# Pure SaaS Master Reference Index

This manifest catalogues Pure SaaS's reference library of **260+ architectural guides, component specifications, Apple HIG documents, and frontend engineering manuals**.

AI coding agents and developers should consult these exact documents before designing, writing, or reviewing code.

---

## Quick Reference Search
```bash
# Search any topic across all categories
npx pure-saas ref "<query>"

# Examples:
npx pure-saas ref "button"          # Component specification
npx pure-saas ref "modal"           # Focus trapping & dialog guidelines
npx pure-saas ref "wcag 2.2"        # Accessibility conformance matrix
npx pure-saas ref "dark mode"       # Inversion & contrast preservation
npx pure-saas ref "spring physics"  # Animation curves & motion
npx pure-saas ref "dashboard"       # SaaS dashboard shell layout
```

---

## Component Architecture & Primitives (20 Guides)

*Tactile, accessible UI primitives with state matrices and WCAG requirements.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Accordion & Disclosure Patterns](./components/accordion-disclosure.md) | `references/components/accordion-disclosure.md` | Accordions stack collapsible content panels vertically to conserve viewport real estate and reduce cognitive l... |
| [Breadcrumb Navigation Hierarchy](./components/breadcrumbs.md) | `references/components/breadcrumbs.md` | Breadcrumbs communicate nested position within an application hierarchy, enabling users to retrace their steps... |
| [Button Component Architecture & Craft Guidelines](./components/button.md) | `references/components/button.md` | Buttons communicate actions that users can take throughout an application. In Pure SaaS, buttons represent tac... |
| [Card Container Architecture](./components/card.md) | `references/components/card.md` | Cards group related information and actions into bounded visual units. Pure SaaS avoids generic card-vomit by ... |
| [Checkbox and Radio Group Patterns](./components/checkbox-radio.md) | `references/components/checkbox-radio.md` | Checkboxes support multi-selection and binary toggles within forms. Radio buttons handle mutually exclusive si... |
| [Command Palette (Cmd+K) Architecture](./components/command-palette.md) | `references/components/command-palette.md` | The command palette offers rapid keyboard-first navigation and action execution. It indexes pages, settings, a... |
| [Data Table & Virtualized List Guidelines](./components/data-table.md) | `references/components/data-table.md` | Data tables organize dense tabular information for fast scanning, sorting, and inline modification. Pure SaaS ... |
| [Dropdown Context & Action Menus](./components/dropdown-menu.md) | `references/components/dropdown-menu.md` | Dropdown menus provide grouped command lists triggered by buttons or context actions. They must support swift ... |
| [Text Input & Field Primitives Specification](./components/input-text.md) | `references/components/input-text.md` | Text fields allow users to enter, edit, and search textual data. In Pure SaaS, input fields must be calm, pred... |
| [Modal Dialog & Alert Architectural Guide](./components/modal-dialog.md) | `references/components/modal-dialog.md` | Modals interrupt user flow to capture mandatory decisions or display focused tasks. Pure SaaS enforces focus c... |
| [Pagination & Page Navigation Primitives](./components/pagination.md) | `references/components/pagination.md` | Pagination divides large record sets into discrete pages. It provides direct access to numbered pages, previou... |
| [Popover and Tooltip Floating Primitives](./components/popover-tooltip.md) | `references/components/popover-tooltip.md` | Tooltips provide brief, non-interactive context on hover/focus. Popovers offer rich, interactive overlays anch... |
| [Select & Option Menu Guidelines](./components/select-dropdown.md) | `references/components/select-dropdown.md` | Select controls let users choose one or more values from a list. Native selects are preferred on mobile device... |
| [Sheet & Drawer Primitives](./components/sheet-drawer.md) | `references/components/sheet-drawer.md` | Sheets slide in from screen edges (right on desktop, bottom on mobile) to display secondary inspection views, ... |
| [Sidebar Navigation Pattern](./components/sidebar-nav.md) | `references/components/sidebar-nav.md` | Sidebar navigation structures hierarchical application spaces. It must gracefully collapse between expanded ra... |
| [Tabs & Segmented Control Design Specification](./components/tabs-segmented-control.md) | `references/components/tabs-segmented-control.md` | Tabs partition related views under a common context. Segmented controls provide compact, inline toggles for fi... |
| [Textarea & Multi-line Editor Specification](./components/textarea.md) | `references/components/textarea.md` | Multi-line inputs accommodate variable-length content such as comments, notes, and code snippets. They require... |
| [Toast & Snackbar Notification System](./components/toast-snackbar.md) | `references/components/toast-snackbar.md` | Toasts provide brief, non-intrusive feedback on completed background operations (e.g., "Saved changes", "Link ... |
| [Toggle Switch Specification](./components/toggle-switch.md) | `references/components/toggle-switch.md` | Switches provide immediate, binary toggles for live settings. Unlike checkboxes that require a form submit but... |
| [Top Navigation Bar Architecture](./components/top-nav.md) | `references/components/top-nav.md` | Top bars provide persistent product branding, global search, notifications, and primary user controls. They mu... |

---

## Layout & Page Composition Blueprints (12 Guides)

*Architectural blueprints for SaaS dashboards, heroes, settings, and conversion funnels.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Analytics & KPI Dashboard Grid](./layouts/analytics-board.md) | `references/layouts/analytics-board.md` | Analytics boards present high-density metrics, trend lines, and data comparisons. They demand clear visual hie... |
| [Authentication & Sign-in Portal Layout](./layouts/auth-portal.md) | `references/layouts/auth-portal.md` | Auth portals handle sign-in, account creation, password recovery, and SSO. They require rock-solid security fe... |
| [Checkout Funnel & Payment Flow Layout](./layouts/checkout-funnel.md) | `references/layouts/checkout-funnel.md` | Checkout flows must be frictionless and trustworthy, minimizing fields while showing clear itemized totals and... |
| [Technical Documentation & Knowledge Base Layout](./layouts/documentation-layout.md) | `references/layouts/documentation-layout.md` | Documentation requires a distraction-free 3-column architecture: navigation tree on the left, formatted markdo... |
| [E-commerce & Product Catalog Layout](./layouts/ecommerce-product-grid.md) | `references/layouts/ecommerce-product-grid.md` | Product catalogs balance high-density image grids with robust facet filters and instantaneous sorting.... |
| [Marketing Hero Section Composition & Hierarchy](./layouts/marketing-hero.md) | `references/layouts/marketing-hero.md` | The hero section establishes immediate value proposition, brand identity, and the primary call-to-action. Pure... |
| [Onboarding Multi-Step Wizard Layout](./layouts/onboarding-wizard.md) | `references/layouts/onboarding-wizard.md` | Onboarding wizards guide new users through critical configuration steps without overwhelming cognitive bandwid... |
| [Pricing Matrix & Tier Comparison Layout](./layouts/pricing-matrix.md) | `references/layouts/pricing-matrix.md` | Pricing layouts must communicate feature differences and subscription economics clearly, eliminating hidden ca... |
| [SaaS App Dashboard Shell & Grid Layout](./layouts/saas-dashboard.md) | `references/layouts/saas-dashboard.md` | The dashboard shell provides the persistent frame for productivity applications: side navigation, global heade... |
| [SaaS Marketing Landing Page Blueprint](./layouts/saas-landing.md) | `references/layouts/saas-landing.md` | A complete SaaS landing page guides potential customers from initial interest through proof, feature discovery... |
| [Settings & Profile Management Layout](./layouts/settings-profile.md) | `references/layouts/settings-profile.md` | Settings pages organize account, team, billing, and security preferences into structured master-detail panels.... |
| [System Status & Incident Timeline Layout](./layouts/status-page.md) | `references/layouts/status-page.md` | Public status pages broadcast uptime, service health, and incident resolution progress, inspiring customer con... |

---

## Design Systems & Token Architecture (12 Guides)

*3-tier token hierarchies, naming taxonomy, color construction, and spatial grids.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Border Radius Geometry & Concentric Corner Nesting](./design-systems/border-radius-geometry.md) | `references/design-systems/border-radius-geometry.md` | Corner geometry dictates visual softness and hardware alignment. Pure SaaS applies concentric corner mathemati... |
| [Color Palette Construction & Perceptual Lightness Scales](./design-systems/color-palette-construction.md) | `references/design-systems/color-palette-construction.md` | Building accessible digital color systems requires perceptual uniformity. Pure SaaS utilizes OKLCH color space... |
| [Component Contract Design & API Polymorphism](./design-systems/component-contract-design.md) | `references/design-systems/component-contract-design.md` | Well-designed component contracts maximize flexibility while preventing invalid states.... |
| [Design System Governance & Contribution Model](./design-systems/design-system-governance.md) | `references/design-systems/design-system-governance.md` | Governance protects the design system from divergence, duplicated components, and uncurated visual drift.... |
| [Design System Versioning & Deprecation Lifecycle](./design-systems/design-system-versioning.md) | `references/design-systems/design-system-versioning.md` | Predictable versioning ensures consuming teams can adopt updates safely without breaking existing customer int... |
| [Design Tokens Architecture & 3-Tier Hierarchy](./design-systems/design-tokens-architecture.md) | `references/design-systems/design-tokens-architecture.md` | Design tokens are the atomic building blocks of a maintainable UI system. Pure SaaS enforces a strict 3-tier h... |
| [Elevation, Depth & Multi-Layer Shadow Tokens](./design-systems/elevation-depth-shadows.md) | `references/design-systems/elevation-depth-shadows.md` | Depth clarifies visual hierarchy and overlapping surfaces. Pure SaaS replaces single harsh drop shadows with r... |
| [Container Queries & Responsive Component Grids](./design-systems/grid-container-queries.md) | `references/design-systems/grid-container-queries.md` | Modern modular layouts adapt based on their available container space rather than the full browser viewport wi... |
| [Spatial Grids, Layout Rhythm & Spacing Tokens](./design-systems/spacing-spatial-grids.md) | `references/design-systems/spacing-spatial-grids.md` | Spatial systems define rhythm, alignment, and balance. Pure SaaS enforces an 8pt spatial grid with 4pt micro-s... |
| [Token Naming Taxonomy & Structured Conventions](./design-systems/token-naming-taxonomy.md) | `references/design-systems/token-naming-taxonomy.md` | A standardized naming taxonomy prevents token collisions, accelerates developer onboarding, and enables automa... |
| [DTCG Token Transforms & Multi-Platform Export](./design-systems/token-transform-dtcg.md) | `references/design-systems/token-transform-dtcg.md` | The W3C Design Tokens Community Group (DTCG) specification provides a vendor-neutral JSON format for sharing t... |
| [Typography Scale, Fluid Formulas, and Optical Tracking](./design-systems/typography-scale-hierarchy.md) | `references/design-systems/typography-scale-hierarchy.md` | Typography conveys structure, priority, and voice. Pure SaaS couples mathematical modular scales with fluid cl... |

---

## UX & Interaction Patterns (12 Guides)

*Keyboard shortcuts, focus management, optimistic updates, and undo patterns.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Accessible Drag and Drop Interactions](./ux-patterns/drag-drop-interactions.md) | `references/ux-patterns/drag-drop-interactions.md` | Drag-and-drop handles kanban boards, file uploads, and list reordering. Pure SaaS requires full keyboard parit... |
| [Empty States, Zero-Data Fallbacks & Starter Guidance](./ux-patterns/empty-states-onboarding.md) | `references/ux-patterns/empty-states-onboarding.md` | Empty states are prime educational real estate. Rather than presenting dead ends, Pure SaaS designs empty stat... |
| [Feedback Toast System & Notification Queues](./ux-patterns/feedback-toast-system.md) | `references/ux-patterns/feedback-toast-system.md` | Toasts handle non-blocking, asynchronous system feedback with a disciplined FIFO queue and viewport corner sta... |
| [Focus Management, Trapping & Restoration](./ux-patterns/focus-management-trapping.md) | `references/ux-patterns/focus-management-trapping.md` | Proper focus management guarantees that keyboard and screen-reader users can navigate web applications without... |
| [Form Steppers & Multi-Step Progress Flows](./ux-patterns/form-steppers-wizards.md) | `references/ux-patterns/form-steppers-wizards.md` | Steppers divide long, complex forms into bite-sized, logical milestones, lowering cognitive fatigue and drop-o... |
| [Infinite Scroll & Virtualized Feed Patterns](./ux-patterns/infinite-scroll-pagination.md) | `references/ux-patterns/infinite-scroll-pagination.md` | Infinite scrolling provides seamless browsing for feeds and logs, but requires robust scroll restoration and f... |
| [Inline Validation & Real-Time Form Error Handling](./ux-patterns/inline-validation-errors.md) | `references/ux-patterns/inline-validation-errors.md` | Inline validation guides users to correct mistakes as early as possible without prematurely nagging them befor... |
| [Keyboard Shortcuts & Global Navigation Systems](./ux-patterns/keyboard-shortcuts-navigation.md) | `references/ux-patterns/keyboard-shortcuts-navigation.md` | Keyboard shortcuts transform productivity web applications into power-user environments. Pure SaaS standardize... |
| [Loading Skeletons, Micro-Spinners & Shimmer States](./ux-patterns/loading-skeletons-spinners.md) | `references/ux-patterns/loading-skeletons-spinners.md` | Perceived performance is heavily dictated by loading patterns. Pure SaaS uses content-matched skeleton shimmer... |
| [Optimistic UI Updates & Instant Feedback](./ux-patterns/optimistic-ui-updates.md) | `references/ux-patterns/optimistic-ui-updates.md` | Optimistic updates assume backend operations will succeed, immediately updating the visual state and rolling b... |
| [Search Autocomplete & Instant Filter Patterns](./ux-patterns/search-autocomplete-filtering.md) | `references/ux-patterns/search-autocomplete-filtering.md` | Search autocomplete anticipates queries and displays rich matching entities with highlighted substring terms.... |
| [Undo Patterns vs Destructive Confirmation Dialogs](./ux-patterns/undo-destructive-actions.md) | `references/ux-patterns/undo-destructive-actions.md` | Modern UX favors forgiving interfaces with instantaneous "Undo" over intrusive confirmation modals that induce... |

---

## Visual Craft, Physics & Polish (10 Guides)

*Apple-inspired design polish, materials, spring physics, and hairline sharpness.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Apple-Inspired Visual Polish & Hardware-Grade Craft](./visual-craft/apple-visual-polish.md) | `references/visual-craft/apple-visual-polish.md` | The signature Apple design feel stems from extraordinary restraint, optical alignment, physics-based springs, ... |
| [Fluid Spring Physics & Animation Curves](./visual-craft/fluid-spring-physics.md) | `references/visual-craft/fluid-spring-physics.md` | Linear transitions feel mechanical and robotic. Pure SaaS mandates physics-based spring curves that accelerate... |
| [Hairline Borders, Separators & Sub-Pixel Sharpness](./visual-craft/hairline-borders-separators.md) | `references/visual-craft/hairline-borders-separators.md` | Thick, muddy borders make interfaces look clumsy. Pure SaaS employs razor-sharp 1px (or 0.5px on Retina/High-D... |
| [Light & Dark Lighting Models: Elevation vs Self-Illumination](./visual-craft/light-dark-lighting-models.md) | `references/visual-craft/light-dark-lighting-models.md` | Light mode mimics overhead directional sunlight casting downward shadows. Dark mode mimics an environment wher... |
| [Materials, Vibrancy & Acrylic Backdrop Blur](./visual-craft/materials-vibrancy-blur.md) | `references/visual-craft/materials-vibrancy-blur.md` | Materials simulate translucent physical surfaces that adopt the color temperature of underlying content while ... |
| [Micro-Interaction Tactile Feedback](./visual-craft/micro-interaction-feedback.md) | `references/visual-craft/micro-interaction-feedback.md` | Micro-interactions communicate state changes with delightful, tactile physical confirmation.... |
| [Optical Alignment vs Mathematical Centering](./visual-craft/optical-alignment-centering.md) | `references/visual-craft/optical-alignment-centering.md` | Mathematical centering frequently looks off-center to the human eye due to typographic ascenders/descenders, i... |
| [Shadow Bloom & Ambient Occlusion Techniques](./visual-craft/shadow-bloom-ambient-occlusion.md) | `references/visual-craft/shadow-bloom-ambient-occlusion.md` | Realistic depth requires separating the soft ambient shadow (contact occlusion) from the directional key light... |
| [Staggered Entrance Motion & Cascading Reveals](./visual-craft/staggered-entrance-motion.md) | `references/visual-craft/staggered-entrance-motion.md` | When lists or grids mount, staggering item reveals by 30-50ms directs eye flow naturally without cognitive ove... |
| [Visual Weight, Composition Asymmetry & Focal Control](./visual-craft/visual-weight-asymmetry.md) | `references/visual-craft/visual-weight-asymmetry.md` | Symmetrical grids often become monotonous and visually boring. Asymmetric layouts create intentional tension t... |

---

## Frontend Engineering & Performance (12 Guides)

*Compound components, headless primitives, virtualization, and Core Web Vitals.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [requestAnimationFrame Scheduling & Scroll Performance](./frontend-engineering/animation-frame-scheduling.md) | `references/frontend-engineering/animation-frame-scheduling.md` | High-frequency events like window scroll, resize, and mouse tracking must be scheduled via `requestAnimationFr... |
| [CSS Architecture, Cascade Layers (@layer) & Token Scoping](./frontend-engineering/css-architecture-token-layering.md) | `references/frontend-engineering/css-architecture-token-layering.md` | Modern CSS uses `@layer` to declare explicit cascade precedence, ending specificity wars and eliminating `!imp... |
| [Data Fetching, Cache Invalidation & Stale-While-Revalidate](./frontend-engineering/data-fetching-cache-invalidation.md) | `references/frontend-engineering/data-fetching-cache-invalidation.md` | Using TanStack Query or SWR provides instantaneous background synchronization, automatic deduplication, and ca... |
| [DOM Size Optimization & Large List Virtualization](./frontend-engineering/dom-size-virtualization.md) | `references/frontend-engineering/dom-size-virtualization.md` | Rendering thousands of DOM elements causes high memory consumption and unresponsive scroll frames. Virtualizat... |
| [Error Boundaries & Graceful Degradation](./frontend-engineering/error-boundary-fallbacks.md) | `references/frontend-engineering/error-boundary-fallbacks.md` | Component error boundaries prevent a single runtime JavaScript exception from crashing the entire application ... |
| [Headless UI Primitives & Separation of Concerns](./frontend-engineering/headless-primitive-patterns.md) | `references/frontend-engineering/headless-primitive-patterns.md` | Separating behavioral state, keyboard interactions, and ARIA attributes from visual styling produces robust, 1... |
| [Compound Component Architecture in React](./frontend-engineering/react-compound-components.md) | `references/frontend-engineering/react-compound-components.md` | Compound components share implicit state and coordinate complex UI trees via React Context, providing flexible... |
| [React Render Performance & Re-render Optimization](./frontend-engineering/render-performance-optimization.md) | `references/frontend-engineering/render-performance-optimization.md` | High-frequency UI updates (e.g. typing, slider dragging, live metrics) must not trigger catastrophic whole-tre... |
| [Custom React Hooks for UI Primitives](./frontend-engineering/reusable-hooks-patterns.md) | `references/frontend-engineering/reusable-hooks-patterns.md` | Custom hooks package browser event listeners, media queries, and lifecycle behaviors into reusable functional ... |
| [React Server Components (RSC) & Client Boundaries](./frontend-engineering/server-client-boundary-patterns.md) | `references/frontend-engineering/server-client-boundary-patterns.md` | Next.js and modern React frameworks split applications into Server Components (zero JS bundle) and Client Comp... |
| [Finite State Machines for Complex UI Flows](./frontend-engineering/state-machine-ui-modeling.md) | `references/frontend-engineering/state-machine-ui-modeling.md` | Modeling complex interfaces with finite state machines (e.g. XState) mathematically eliminates impossible stat... |
| [Core Web Vitals Optimization (INP, CLS, LCP)](./frontend-engineering/web-vitals-inp-cls-lcp.md) | `references/frontend-engineering/web-vitals-inp-cls-lcp.md` | Google Core Web Vitals directly measure user experience: Interaction to Next Paint (INP < 200ms), Cumulative L... |

---

## Accessibility (WCAG 2.2 AA) Guides (10 Guides)

*Conformance matrices, screen reader announcements, target sizes, and high contrast.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Accessible Color Contrast & APCA Verification](./accessibility/accessible-color-contrast.md) | `references/accessibility/accessible-color-contrast.md` | Contrast guarantees that text and visual elements can be deciphered by users with moderate visual impairments ... |
| [Accessible Data Table Semantics & Keyboard Scrolling](./accessibility/accessible-data-tables.md) | `references/accessibility/accessible-data-tables.md` | Complex data tables require explicit column and row headers, sort announcements, and keyboard-accessible scrol... |
| [Accessible Modal Dialogs & Alert Dialogs](./accessibility/accessible-dialogs-modals.md) | `references/accessibility/accessible-dialogs-modals.md` | Dialogs demand strict focus containment, background inertness, and appropriate role semantics.... |
| [Accessible Form Architecture & Field Groupings](./accessibility/accessible-forms-validation.md) | `references/accessibility/accessible-forms-validation.md` | Forms must present unambiguous labels, associated descriptions, and programmatic error associations.... |
| [Accessible Navigation Menus & Disclosure Submenus](./accessibility/accessible-navigation-menus.md) | `references/accessibility/accessible-navigation-menus.md` | Multi-level navigation menus must allow keyboard users to tab past top-level categories without having to trav... |
| [Accessible SVG Iconography & Visual Symbols](./accessibility/accessible-svg-iconography.md) | `references/accessibility/accessible-svg-iconography.md` | Icons must be treated according to their functional intent: decorative icons must be hidden from screen reader... |
| [Accessible Touch Targets & Target Spacing (WCAG 2.5.8)](./accessibility/accessible-touch-targets.md) | `references/accessibility/accessible-touch-targets.md` | Users with tremors, motor impairments, or large fingers struggle with crowded buttons. Pure SaaS guarantees ad... |
| [Reduced Motion & Forced High-Contrast Adaptations](./accessibility/reduced-motion-high-contrast.md) | `references/accessibility/reduced-motion-high-contrast.md` | Operating system accessibility preferences must be respected: reduced motion for vestibular safety and forced-... |
| [Screen Reader Announcements & ARIA Live Regions](./accessibility/screen-reader-announcements-aria.md) | `references/accessibility/screen-reader-announcements-aria.md` | Dynamic web applications change state without full page reloads. ARIA live regions announce asynchronous event... |
| [WCAG 2.2 AA Conformance Matrix & Compliance Gates](./accessibility/wcag-22-conformance-matrix.md) | `references/accessibility/wcag-22-conformance-matrix.md` | WCAG 2.2 introduces critical criteria around focus appearance, dragging movements, and target sizes. Pure SaaS... |

---

## Theming & Token Architecture (8 Guides)

*Dark mode color inversion, runtime CSS variables, and system preference listeners.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Contrast Preservation Across Theme Variants](./theming/contrast-preservation-themes.md) | `references/theming/contrast-preservation-themes.md` | When supporting multiple themes (e.g. Light, Dark, Midnight, High-Contrast), semantic tokens must maintain WCA... |
| [CSS Variables Architecture for Runtime Theming](./theming/css-variables-runtime-themes.md) | `references/theming/css-variables-runtime-themes.md` | Switching themes via CSS custom properties on the root element enables instant theme switching without re-rend... |
| [Dark Mode Architecture & Color Inversion Principles](./theming/dark-mode-color-inversion.md) | `references/theming/dark-mode-color-inversion.md` | Dark mode is not an automated mathematical negative of light mode. It requires desaturating primary colors, ad... |
| [High Contrast Mode & Forced-Colors Adaptations](./theming/high-contrast-modes.md) | `references/theming/high-contrast-modes.md` | Operating system high-contrast modes assist users with significant vision loss by replacing author colors with... |
| [Multi-Brand & Tenant Token Scoping](./theming/multi-brand-theming.md) | `references/theming/multi-brand-theming.md` | Enterprise SaaS products often serve multiple customer brands or sub-brands from a single unified codebase.... |
| [System Preference Detection & Reactive Switching](./theming/system-preference-detection.md) | `references/theming/system-preference-detection.md` | Modern web applications should default to the user’s operating system theme preference (`prefers-color-scheme`... |
| [Tailwind CSS Theme Token Integration](./theming/tailwind-theme-configuration.md) | `references/theming/tailwind-theme-configuration.md` | Configuring Tailwind CSS to resolve utility classes directly to semantic CSS variables eliminates arbitrary co... |
| [Theme Flash Prevention (FOIT / FOUC) in SSR & Next.js](./theming/theme-flash-prevention.md) | `references/theming/theme-flash-prevention.md` | When using server-side rendering, a mismatch between server-rendered HTML and client localStorage can cause an... |

---

## Developer Tooling & CI Auditing (8 Guides)

*Static AST linting, automated contrast checking, and visual regression pipelines.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Browser DevTools Inspection & Visual Audit Workflow](./developer-tooling/browser-devtools-inspection-workflow.md) | `references/developer-tooling/browser-devtools-inspection-workflow.md` | A disciplined manual DevTools inspection workflow verifies computed metrics, rendering layers, repaint cycles,... |
| [Automated Contrast Ratio CI Pipelines](./developer-tooling/contrast-ratio-automation.md) | `references/developer-tooling/contrast-ratio-automation.md` | Automating contrast validation checks mathematical WCAG luminance formulas on every build without requiring ma... |
| [Design Token Linting & Static AST Verification](./developer-tooling/design-token-linting.md) | `references/developer-tooling/design-token-linting.md` | Static analysis tools scan codebase ASTs to detect raw hex colors, arbitrary spacing constants, and deprecated... |
| [Visual Regression Testing with Headless Browsers](./developer-tooling/headless-browser-regression.md) | `references/developer-tooling/headless-browser-regression.md` | Visual regression testing captures screenshots in headless Chromium/WebKit and computes pixel diffs against ap... |
| [Lighthouse CI Auditing & Performance Budgets](./developer-tooling/lighthouse-ci-auditing.md) | `references/developer-tooling/lighthouse-ci-auditing.md` | Lighthouse CI automatically benchmarks performance, accessibility, SEO, and best practices on every pull reque... |
| [Storybook Component Catalogs & State Testing](./developer-tooling/storybook-component-catalog.md) | `references/developer-tooling/storybook-component-catalog.md` | Storybook provides an isolated sandbox to develop, test, and document components across all 8 core states (Def... |
| [Stylelint Configuration for Strict Token Enforcement](./developer-tooling/stylelint-token-enforcement.md) | `references/developer-tooling/stylelint-token-enforcement.md` | Stylelint rules prevent arbitrary CSS declarations, enforcing the use of CSS custom properties for colors, spa... |
| [Arbitrary Tailwind Class Prevention & ESLint Rules](./developer-tooling/tailwind-arbitrary-prevention.md) | `references/developer-tooling/tailwind-arbitrary-prevention.md` | Arbitrary Tailwind brackets (`w-[327px]`, `bg-[#1a1a1a]`, `text-[13.5px]`) re-introduce rogue styling chaos in... |

---

## Real-World Production Flows (10 Guides)

*Authentication, billing checkouts, multi-tenancy, and audit log timelines.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [API Keys & Developer Secrets Management](./real-world-flows/api-keys-developer-portal.md) | `references/real-world-flows/api-keys-developer-portal.md` | Developer portals handle the generation, display, scoping, and rotation of API keys with strict one-time revea... |
| [Audit Log & Security Activity Timeline](./real-world-flows/audit-log-timeline.md) | `references/real-world-flows/audit-log-timeline.md` | Audit logs provide an immutable timeline of security events (logins, API key generation, permission updates, d... |
| [Authentication & Session Lifecycle Flow](./real-world-flows/authentication-flow.md) | `references/real-world-flows/authentication-flow.md` | Authentication orchestrates login, multi-factor challenges (MFA/TOTP), OAuth callbacks, session expiration, an... |
| [Billing & Polar/Stripe Checkout Integration Flow](./real-world-flows/billing-stripe-polar-checkout.md) | `references/real-world-flows/billing-stripe-polar-checkout.md` | Subscription flows handle plan upgrades, invoice history, payment method management, and prorated plan adjustm... |
| [Data Export & Asynchronous Reporting Flow](./real-world-flows/data-export-reporting.md) | `references/real-world-flows/data-export-reporting.md` | Exporting large datasets requires asynchronous job queuing, clear format selection (CSV, JSON, Parquet), and n... |
| [Team Member Invitations & Role-Based Access (RBAC)](./real-world-flows/invite-member-permissions.md) | `references/real-world-flows/invite-member-permissions.md` | Inviting collaborators requires granular role assignment (Owner, Admin, Member, Viewer) with clear permission ... |
| [Multi-Tenant Workspace & Team Switching Flow](./real-world-flows/multi-tenant-team-switching.md) | `references/real-world-flows/multi-tenant-team-switching.md` | Multi-tenant systems allow users to belong to several organizations, requiring swift workspace switching witho... |
| [Notifications Inbox & Real-Time Alert Center](./real-world-flows/notifications-inbox-center.md) | `references/real-world-flows/notifications-inbox-center.md` | Notification hubs organize team mentions, system alerts, and task assignments with unread counters and granula... |
| [Faceted Search & Multi-Dimensional Filtering](./real-world-flows/search-faceting-filtering.md) | `references/real-world-flows/search-faceting-filtering.md` | Faceted search combines full-text queries with discrete category, price, date, and status filters, accompanied... |
| [User Profile & Account Settings Flow](./real-world-flows/user-profile-account-settings.md) | `references/real-world-flows/user-profile-account-settings.md` | Account settings house personal information, avatar uploads, password management, session termination, and per... |

---

## Design Analysis & Reverse Engineering (6 Guides)

*Screenshot deconstruction, DOM style extraction, and 11-item completion gates.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Live Website DOM & DevTools Reverse Engineering](./design-analysis/dom-devtools-extraction.md) | `references/design-analysis/dom-devtools-extraction.md` | Inspecting live reference websites via browser DevTools extracts exact computed styles, CSS variables, and lay... |
| [Motion Curve & Physics Reverse Engineering](./design-analysis/motion-curve-reconstruction.md) | `references/design-analysis/motion-curve-reconstruction.md` | Recreating the tactile feel of an interface requires analyzing duration, acceleration, and damping curves from... |
| [Screenshot Reference Deconstruction & Visual Decomposition](./design-analysis/screenshot-reference-analysis.md) | `references/design-analysis/screenshot-reference-analysis.md` | Deconstructing visual references requires breaking flat screenshots into their fundamental layers: canvas back... |
| [Spacing Scale Reconstruction & Spatial Reverse Engineering](./design-analysis/spacing-scale-reconstruction.md) | `references/design-analysis/spacing-scale-reconstruction.md` | Reverse engineering layouts requires identifying the underlying spatial rhythm (typically 4pt or 8pt grid) to ... |
| [Typography Matching, Pairing & Font Fallbacks](./design-analysis/typography-matching-pairing.md) | `references/design-analysis/typography-matching-pairing.md` | Accurately reproducing a brand identity requires identifying primary display typefaces, editorial body pairing... |
| [Visual Drift Comparison & 11-Item Quality Gates](./design-analysis/visual-drift-comparison-gates.md) | `references/design-analysis/visual-drift-comparison-gates.md` | Before claiming that a recreation is complete, perform rigorous side-by-side visual comparison against the ori... |

---

## Responsive Design & Mobile Ergonomics (6 Guides)

*Breakpoints, mobile touch ergonomics, fluid typography, and viewport modes.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Adaptive Navigation Patterns: Mobile Drawer to Desktop Rail](./responsive/adaptive-navigation-patterns.md) | `references/responsive/adaptive-navigation-patterns.md` | Navigation must transform gracefully between mobile bottom sheets/drawers and persistent desktop sidebars.... |
| [Cross-Device Form Input Optimization & Virtual Keyboards](./responsive/cross-device-form-inputs.md) | `references/responsive/cross-device-form-inputs.md` | Optimizing form inputs for mobile devices requires invoking the correct virtual keyboard layout, preventing un... |
| [Data Density & Responsive Viewport Adaptations](./responsive/data-density-viewport-modes.md) | `references/responsive/data-density-viewport-modes.md` | Dense data grids must adapt their display density across screen sizes: comfortable spacing on touchscreens, co... |
| [Fluid Typography & Spacing with CSS clamp()](./responsive/fluid-typography-spacing-clamp.md) | `references/responsive/fluid-typography-spacing-clamp.md` | Fluid typography and spacing smoothly scale between mobile and desktop viewport boundaries without abrupt layo... |
| [Mobile-First Breakpoint Architecture](./responsive/mobile-first-breakpoint-strategy.md) | `references/responsive/mobile-first-breakpoint-strategy.md` | Designing mobile-first ensures core functionality and critical content are prioritized on constrained viewport... |
| [Mobile Touch Ergonomics & Thumb Zones](./responsive/touch-target-ergonomics.md) | `references/responsive/touch-target-ergonomics.md` | Mobile interfaces must place primary actions within natural one-handed thumb reach zones while avoiding awkwar... |

---

## Interactive Background Shaders & Canvases (15 Guides)

*Production-grade WebGL/Canvas shader components and generative visual fields.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Integrate the <Aurora /> component from React Bits](./backgrounds/aurora.md) | `references/backgrounds/aurora.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Ballpit /> component from React Bits](./backgrounds/ballpit.md) | `references/backgrounds/ballpit.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Dither /> component from React Bits](./backgrounds/dither.md) | `references/backgrounds/dither.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <DotGrid /> component from React Bits](./backgrounds/dot-grid.md) | `references/backgrounds/dot-grid.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <GradientASCII /> component from React Bits](./backgrounds/gradient-ascii.md) | `references/backgrounds/gradient-ascii.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Hyperspeed /> component from React Bits](./backgrounds/hyperspeed.md) | `references/backgrounds/hyperspeed.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Iridescence /> component from React Bits](./backgrounds/iridescence.md) | `references/backgrounds/iridescence.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <LiquidChrome /> component from React Bits](./backgrounds/liquid-chrome.md) | `references/backgrounds/liquid-chrome.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Particles /> component from React Bits](./backgrounds/particles.md) | `references/backgrounds/particles.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <PatternWaves /> component from React Bits](./backgrounds/pattern-waves.md) | `references/backgrounds/pattern-waves.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Plasma /> component from React Bits](./backgrounds/plasma.md) | `references/backgrounds/plasma.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Prism /> component from React Bits](./backgrounds/prism.md) | `references/backgrounds/prism.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Threads /> component from React Bits](./backgrounds/threads.md) | `references/backgrounds/threads.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Topography /> component from React Bits](./backgrounds/topography.md) | `references/backgrounds/topography.md` | You are helping integrate an open-source React component into an existing application.... |
| [Integrate the <Waves /> component from React Bits](./backgrounds/waves.md) | `references/backgrounds/waves.md` | You are helping integrate an open-source React component into an existing application.... |

---

## Framework Engineering Guides (22 Stacks)

*Implementation guides across React, Next.js, Vue, Svelte, Tailwind, SwiftUI, Flutter, etc.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Angular Implementation & Design Engineering Guide](./frameworks/angular.md) | `references/frameworks/angular.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Astro Implementation & Design Engineering Guide](./frameworks/astro.md) | `references/frameworks/astro.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Avalonia Implementation & Design Engineering Guide](./frameworks/avalonia.md) | `references/frameworks/avalonia.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Flutter Implementation & Design Engineering Guide](./frameworks/flutter.md) | `references/frameworks/flutter.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Html Tailwind Implementation & Design Engineering Guide](./frameworks/html-tailwind.md) | `references/frameworks/html-tailwind.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Javafx Implementation & Design Engineering Guide](./frameworks/javafx.md) | `references/frameworks/javafx.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Jetpack Compose Implementation & Design Engineering Guide](./frameworks/jetpack-compose.md) | `references/frameworks/jetpack-compose.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Laravel Implementation & Design Engineering Guide](./frameworks/laravel.md) | `references/frameworks/laravel.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Nextjs Implementation & Design Engineering Guide](./frameworks/nextjs.md) | `references/frameworks/nextjs.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Nuxt Ui Implementation & Design Engineering Guide](./frameworks/nuxt-ui.md) | `references/frameworks/nuxt-ui.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Nuxtjs Implementation & Design Engineering Guide](./frameworks/nuxtjs.md) | `references/frameworks/nuxtjs.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [React Native Implementation & Design Engineering Guide](./frameworks/react-native.md) | `references/frameworks/react-native.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [React Implementation & Design Engineering Guide](./frameworks/react.md) | `references/frameworks/react.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Shadcn Implementation & Design Engineering Guide](./frameworks/shadcn.md) | `references/frameworks/shadcn.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Svelte Implementation & Design Engineering Guide](./frameworks/svelte.md) | `references/frameworks/svelte.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Swiftui Implementation & Design Engineering Guide](./frameworks/swiftui.md) | `references/frameworks/swiftui.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Threejs Implementation & Design Engineering Guide](./frameworks/threejs.md) | `references/frameworks/threejs.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Uno Implementation & Design Engineering Guide](./frameworks/uno.md) | `references/frameworks/uno.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Uwp Implementation & Design Engineering Guide](./frameworks/uwp.md) | `references/frameworks/uwp.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Vue Implementation & Design Engineering Guide](./frameworks/vue.md) | `references/frameworks/vue.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Winui Implementation & Design Engineering Guide](./frameworks/winui.md) | `references/frameworks/winui.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |
| [Wpf Implementation & Design Engineering Guide](./frameworks/wpf.md) | `references/frameworks/wpf.md` | This reference guide provides actionable frontend implementation patterns, anti-slop rules,... |

---

## Apple Human Interface Guidelines (124 Topics)

*Comprehensive Apple HIG reference across components, foundations, and system behaviors.*

| Guide / Topic | File Path | Summary |
| :--- | :--- | :--- |
| [Accessibility](./hig/accessibility.md) | `references/hig/accessibility.md` | Accessible user interfaces empower everyone to have a great experience with your app or game.... |
| [Action sheets](./hig/action-sheets.md) | `references/hig/action-sheets.md` | An action sheet is a modal view that presents choices related to an action people initiate.... |
| [Activity views](./hig/activity-views.md) | `references/hig/activity-views.md` | An activity view — often called a *share sheet* — presents a range of tasks that people can perform in the cur... |
| [AirPlay](./hig/airplay.md) | `references/hig/airplay.md` | AirPlay lets people stream media content wirelessly from iOS, iPadOS, macOS, and tvOS devices to Apple TV, Hom... |
| [Alerts](./hig/alerts.md) | `references/hig/alerts.md` | An alert gives people critical information they need right away.... |
| [App Clips](./hig/app-clips.md) | `references/hig/app-clips.md` | An App Clip is a lightweight version of your app or game that provides an on-the-go or demo experience that’s ... |
| [App icons](./hig/app-icons.md) | `references/hig/app-icons.md` | A unique, memorable icon expresses your app’s or game’s purpose and personality and helps people recognize it ... |
| [App Shortcuts](./hig/app-shortcuts.md) | `references/hig/app-shortcuts.md` | An App Shortcut gives people access to your app’s key functions or content throughout the system.... |
| [Apple In-App Purchase](./hig/apple-in-app-purchase.md) | `references/hig/apple-in-app-purchase.md` | People can use Apple In-App Purchase to pay for digital goods and services, like premium content and subscript... |
| [Apple Pay](./hig/apple-pay.md) | `references/hig/apple-pay.md` | Apple Pay is a secure, easy way to make payments for physical goods and services, donations, and subscriptions... |
| [Apple Pencil and Scribble](./hig/apple-pencil-and-scribble.md) | `references/hig/apple-pencil-and-scribble.md` | Apple Pencil helps make drawing, handwriting, and marking effortless and natural, in addition to performing we... |
| [Augmented reality](./hig/augmented-reality.md) | `references/hig/augmented-reality.md` | Augmented reality (or AR) lets you deliver immersive, engaging experiences that seamlessly blend virtual objec... |
| [Boxes](./hig/boxes.md) | `references/hig/boxes.md` | A box creates a visually distinct group of logically related information and components.... |
| [Branding](./hig/branding.md) | `references/hig/branding.md` | Apps and games express their unique brand identity in ways that make them instantly recognizable while feeling... |
| [Buttons](./hig/buttons.md) | `references/hig/buttons.md` | A button initiates an instantaneous action.... |
| [Charting data](./hig/charting-data.md) | `references/hig/charting-data.md` | Presenting data in a chart can help you communicate information with clarity and appeal.... |
| [Charts](./hig/charts.md) | `references/hig/charts.md` | Organize data in a chart to communicate information with clarity and visual appeal.... |
| [Collaboration and sharing](./hig/collaboration-and-sharing.md) | `references/hig/collaboration-and-sharing.md` | Great collaboration and sharing experiences are simple and responsive, letting people engage with the content ... |
| [Collections](./hig/collections.md) | `references/hig/collections.md` | A collection manages an ordered set of content and presents it in a customizable and highly visual layout.... |
| [Color wells](./hig/color-wells.md) | `references/hig/color-wells.md` | A color well lets people adjust the color of text, shapes, guides, and other onscreen elements.... |
| [Color](./hig/color.md) | `references/hig/color.md` | Judicious use of color can enhance communication, evoke your brand, provide visual continuity, communicate sta... |
| [Column views](./hig/column-views.md) | `references/hig/column-views.md` | A column view — also called a *browser* — lets people view and navigate a data hierarchy using a series of ver... |
| [Combo boxes](./hig/combo-boxes.md) | `references/hig/combo-boxes.md` | A combo box combines a text field with a pull-down button in a single control.... |
| [Context menus](./hig/context-menus.md) | `references/hig/context-menus.md` | A context menu provides access to functionality that’s directly related to an item, without cluttering the int... |
| [Controls](./hig/controls.md) | `references/hig/controls.md` | A control provides quick access to a feature of your app from Control Center, the Lock Screen, or the Action b... |
| [Dark Mode](./hig/dark-mode.md) | `references/hig/dark-mode.md` | Dark Mode is a systemwide appearance setting that uses a dark color palette to provide a comfortable viewing e... |
| [Design principles](./hig/design-principles.md) | `references/hig/design-principles.md` | Explore fundamental principles that guide design across Apple platforms.... |
| [Designing for games](./hig/designing-for-games.md) | `references/hig/designing-for-games.md` | When people play your game on an Apple device, they dive into the world you designed while relying on the plat... |
| [Designing for iOS](./hig/designing-for-ios.md) | `references/hig/designing-for-ios.md` | People depend on their iPhone to help them stay connected, play games, view media, accomplish tasks, and track... |
| [Designing for iPadOS](./hig/designing-for-ipados.md) | `references/hig/designing-for-ipados.md` | People value the power, mobility, and flexibility of iPad as they enjoy media, play games, perform detailed pr... |
| [Designing for iPhone Duo](./hig/designing-for-iphone-duo.md) | `references/hig/designing-for-iphone-duo.md` | An app designed for iPhone Duo adapts seamlessly to both displays, providing a continuous experience as the de... |
| [Designing for macOS](./hig/designing-for-macos.md) | `references/hig/designing-for-macos.md` | People rely on the power, spaciousness, and flexibility of a Mac as they perform in-depth productivity tasks, ... |
| [Disclosure controls](./hig/disclosure-controls.md) | `references/hig/disclosure-controls.md` | Disclosure controls reveal and hide information and functionality related to specific controls or views.... |
| [Dock menus](./hig/dock-menus.md) | `references/hig/dock-menus.md` | On a Mac, people can secondary click an app’s or game’s icon in the Dock to reveal a Dock menu, which presents... |
| [Drag and drop](./hig/drag-and-drop.md) | `references/hig/drag-and-drop.md` | Using drag and drop, people can move or duplicate selected photos, text, and other content by dragging the sel... |
| [Edit menus](./hig/edit-menus.md) | `references/hig/edit-menus.md` | An edit menu lets people make changes to selected content in the current view, in addition to offering related... |
| [Entering data](./hig/entering-data.md) | `references/hig/entering-data.md` | When you need information from people, design ways that make it easy for them to provide it without making mis... |
| [Feedback](./hig/feedback.md) | `references/hig/feedback.md` | Feedback helps people know what’s happening, discover what they can do next, understand the results of actions... |
| [File management](./hig/file-management.md) | `references/hig/file-management.md` | Some apps can support documents and files that people expect to manage throughout the system.... |
| [Focus and selection](./hig/focus-and-selection.md) | `references/hig/focus-and-selection.md` | Focus helps people visually confirm the object that their interaction targets.... |
| [Game controls](./hig/game-controls.md) | `references/hig/game-controls.md` | Precise, intuitive game controls enhance gameplay and can increase a player’s immersion in the game.... |
| [Gauges](./hig/gauges.md) | `references/hig/gauges.md` | A gauge displays a specific numerical value within a range of values.... |
| [Generative AI](./hig/generative-ai.md) | `references/hig/generative-ai.md` | Generative AI empowers you to enhance your app or game with dynamic content and offer intelligent features tha... |
| [Gestures](./hig/gestures.md) | `references/hig/gestures.md` | A gesture is a physical motion that a person uses to directly affect an object in an app or game on their devi... |
| [Going full screen](./hig/going-full-screen.md) | `references/hig/going-full-screen.md` | iPhone, iPad, and Mac offer full-screen modes that let people expand a window to fill the screen, hiding syste... |
| [Gyroscope and accelerometer](./hig/gyro-and-accelerometer.md) | `references/hig/gyro-and-accelerometer.md` | On-device gyroscopes and accelerometers can supply data about a device’s movement in the physical world.... |
| [Home Screen quick actions](./hig/home-screen-quick-actions.md) | `references/hig/home-screen-quick-actions.md` | Home Screen quick actions give people a way to perform app-specific actions from the Home Screen.... |
| [iCloud](./hig/icloud.md) | `references/hig/icloud.md` | iCloud is a service that lets people seamlessly access the content they care about — photos, videos, documents... |
| [Icons](./hig/icons.md) | `references/hig/icons.md` | An effective icon is a graphic asset that expresses a single concept in ways people instantly understand.... |
| [Image views](./hig/image-views.md) | `references/hig/image-views.md` | An image view displays a single image — or in some cases, an animated sequence of images — on a transparent or... |
| [Image wells](./hig/image-wells.md) | `references/hig/image-wells.md` | An image well is an editable version of an image view.... |
| [Images](./hig/images.md) | `references/hig/images.md` | To make sure your artwork looks great on all devices you support, learn how the system displays content and ho... |
| [Inclusion](./hig/inclusion.md) | `references/hig/inclusion.md` | Inclusive apps and games put people first by prioritizing respectful communication and presenting content and ... |
| [Keyboards](./hig/keyboards.md) | `references/hig/keyboards.md` | A physical keyboard can be an essential input device for entering text, playing games, controlling apps, and m... |
| [Labels](./hig/labels.md) | `references/hig/labels.md` | A label is a static piece of text that people can read and often copy, but not edit.... |
| [Launching](./hig/launching.md) | `references/hig/launching.md` | A streamlined launch experience helps people start using your app or game immediately.... |
| [Layout](./hig/layout.md) | `references/hig/layout.md` | A consistent layout that adapts across display sizes, orientations, and multitasking configurations helps peop... |
| [Liquid Glass](./hig/liquid-glass.md) | `references/hig/liquid-glass.md` | Liquid Glass is the dynamic, translucent material Apple introduced in 2025 for the layer of controls and navig... |
| [Lists and tables](./hig/lists-and-tables.md) | `references/hig/lists-and-tables.md` | Lists and tables present data in one or more columns of rows.... |
| [Live Activities](./hig/live-activities.md) | `references/hig/live-activities.md` | A Live Activity lets people track the progress of an activity, event, or task at a glance.... |
| [Live-viewing apps](./hig/live-viewing-apps.md) | `references/hig/live-viewing-apps.md` | As you design a live-viewing app, prioritize the content and create fun, fluid interactions that encourage imm... |
| [Loading](./hig/loading.md) | `references/hig/loading.md` | The best content-loading experience finishes before people become aware of it.... |
| [Machine learning](./hig/machine-learning.md) | `references/hig/machine-learning.md` | Machine learning enables apps and games to learn from data and usage patterns, letting you improve existing ex... |
| [Managing accounts](./hig/managing-accounts.md) | `references/hig/managing-accounts.md` | When it doesn’t create an unnecessary barrier to your experience, an account can be a convenient way for peopl... |
| [Managing notifications](./hig/managing-notifications.md) | `references/hig/managing-notifications.md` | Notifications can give people timely and important information, whether the device is locked or in use.... |
| [Maps](./hig/maps.md) | `references/hig/maps.md` | A map displays outdoor or indoor geographical data in your app or on your website.... |
| [Materials](./hig/materials.md) | `references/hig/materials.md` | A material is a visual effect that creates a sense of depth, layering, and hierarchy between foreground and ba... |
| [Menus](./hig/menus.md) | `references/hig/menus.md` | A menu reveals its options when people interact with it, making it a space-efficient way to present commands i... |
| [Modality](./hig/modality.md) | `references/hig/modality.md` | Modality is a design technique that presents content in a separate, dedicated mode that prevents interaction w... |
| [Motion](./hig/motion.md) | `references/hig/motion.md` | Beautiful, fluid motions bring the interface to life, conveying status, providing feedback and instruction, an... |
| [Multitasking](./hig/multitasking.md) | `references/hig/multitasking.md` | Multitasking lets people switch quickly from one app to another, performing tasks in each.... |
| [NFC](./hig/nfc.md) | `references/hig/nfc.md` | Near-field communication (NFC) allows devices within a few centimeters of each other to exchange information w... |
| [Notifications](./hig/notifications.md) | `references/hig/notifications.md` | A notification gives people timely, high-value information they can understand at a glance.... |
| [Offering help](./hig/offering-help.md) | `references/hig/offering-help.md` | Although the most effective experiences are approachable and intuitive, you can provide contextual help when n... |
| [Onboarding](./hig/onboarding.md) | `references/hig/onboarding.md` | Onboarding can help people get a quick start using your app or game.... |
| [Outline views](./hig/outline-views.md) | `references/hig/outline-views.md` | An outline view presents hierarchical data in a scrolling list of cells that are organized into columns and ro... |
| [Page controls](./hig/page-controls.md) | `references/hig/page-controls.md` | A page control displays a row of indicator images, each of which represents a page in a flat list.... |
| [Panels](./hig/panels.md) | `references/hig/panels.md` | In a macOS app, a panel typically floats above other open windows providing supplementary controls, options, o... |
| [Path controls](./hig/path-controls.md) | `references/hig/path-controls.md` | A path control shows the file system path of a selected file or folder.... |
| [Pickers](./hig/pickers.md) | `references/hig/pickers.md` | A picker displays one or more scrollable lists of distinct values that people can choose from.... |
| [Playing audio](./hig/playing-audio.md) | `references/hig/playing-audio.md` | People expect rich audio experiences that automatically adjust when the context changes on the device.... |
| [Playing haptics](./hig/playing-haptics.md) | `references/hig/playing-haptics.md` | Playing haptics can engage people’s sense of touch and bring their familiarity with the physical world into yo... |
| [Playing video](./hig/playing-video.md) | `references/hig/playing-video.md` | People expect to enjoy rich video experiences on their devices, regardless of the app or game they’re using.... |
| [Pointing devices](./hig/pointing-devices.md) | `references/hig/pointing-devices.md` | People can use a pointing device like a trackpad or mouse to navigate the interface and initiate actions.... |
| [Pop-up buttons](./hig/pop-up-buttons.md) | `references/hig/pop-up-buttons.md` | A pop-up button displays a menu of mutually exclusive options.... |
| [Popovers](./hig/popovers.md) | `references/hig/popovers.md` | A popover is a transient view that appears above other content when people click or tap a control or interacti... |
| [Printing](./hig/printing.md) | `references/hig/printing.md` | An iOS, iPadOS, macOS, or visionOS app can integrate system-provided print functionality when it makes sense, ... |
| [Privacy](./hig/privacy.md) | `references/hig/privacy.md` | Privacy is paramount: it’s critical to be transparent about the privacy-related data and resources you require... |
| [Progress indicators](./hig/progress-indicators.md) | `references/hig/progress-indicators.md` | Progress indicators let people know that your app isn’t stalled while it loads content or performs lengthy ope... |
| [Pull-down buttons](./hig/pull-down-buttons.md) | `references/hig/pull-down-buttons.md` | A pull-down button displays a menu of items or actions that directly relate to the button’s purpose.... |
| [Rating indicators](./hig/rating-indicators.md) | `references/hig/rating-indicators.md` | A rating indicator uses a series of horizontally arranged graphical symbols — by default, stars — to communica... |
| [Ratings and reviews](./hig/ratings-and-reviews.md) | `references/hig/ratings-and-reviews.md` | People often view the ratings and reviews for an app or game before they download it.... |
| [Right to left](./hig/right-to-left.md) | `references/hig/right-to-left.md` | Support right-to-left languages like Arabic and Hebrew by reversing your interface as needed to match the read... |
| [Scroll views](./hig/scroll-views.md) | `references/hig/scroll-views.md` | A scroll view lets people view content that’s larger than the view’s boundaries by moving the content vertical... |
| [Search fields](./hig/search-fields.md) | `references/hig/search-fields.md` | A search field lets people search a collection of content for specific terms they enter.... |
| [Searching](./hig/searching.md) | `references/hig/searching.md` | People use various search techniques to find content on their device, within an app, and within a document or ... |
| [Segmented controls](./hig/segmented-controls.md) | `references/hig/segmented-controls.md` | A segmented control is a linear set of two or more segments, each of which functions as a button.... |
| [Settings](./hig/settings.md) | `references/hig/settings.md` | People expect apps and games to just work, but they also appreciate having ways to customize the experience to... |
| [SF Symbols](./hig/sf-symbols.md) | `references/hig/sf-symbols.md` | SF Symbols provides thousands of consistent, highly configurable symbols that integrate seamlessly with the Sa... |
| [Sheets](./hig/sheets.md) | `references/hig/sheets.md` | A sheet helps people perform a scoped task that’s closely related to their current context.... |
| [Sidebars](./hig/sidebars.md) | `references/hig/sidebars.md` | A sidebar appears on the leading side of a view and lets people navigate between areas of your app or top-leve... |
| [Sign in with Apple](./hig/sign-in-with-apple.md) | `references/hig/sign-in-with-apple.md` | Sign in with Apple provides a fast, private way to sign into apps and websites, giving people a consistent exp... |
| [Siri](./hig/siri.md) | `references/hig/siri.md` | People use Siri to help them with the things they need to find, know, or do every day.... |
| [Sliders](./hig/sliders.md) | `references/hig/sliders.md` | A slider is a horizontal track with a control, called a thumb, that people can adjust between a minimum and ma... |
| [Snippets](./hig/snippets.md) | `references/hig/snippets.md` | When someone performs a task with Siri or an App Shortcut, a snippet shows the result or asks for confirmation... |
| [Split views](./hig/split-views.md) | `references/hig/split-views.md` | A split view manages the presentation of multiple adjacent panes of content, each of which can contain a varie... |
| [Status bars](./hig/status-bars.md) | `references/hig/status-bars.md` | A status bar appears along the upper edge of the screen and displays information about the device’s current st... |
| [Steppers](./hig/steppers.md) | `references/hig/steppers.md` | A stepper is a two-segment control that people use to increase or decrease an incremental value.... |
| [Tab bars](./hig/tab-bars.md) | `references/hig/tab-bars.md` | A tab bar lets people navigate between top-level sections of your app.... |
| [Tab views](./hig/tab-views.md) | `references/hig/tab-views.md` | A tab view presents multiple mutually exclusive panes of content in the same area, which people can switch bet... |
| [Text fields](./hig/text-fields.md) | `references/hig/text-fields.md` | A text field is a rectangular area in which people enter or edit small, specific pieces of text.... |
| [Text views](./hig/text-views.md) | `references/hig/text-views.md` | A text view displays multiline, styled text content, which can optionally be editable.... |
| [The menu bar](./hig/the-menu-bar.md) | `references/hig/the-menu-bar.md` | On a Mac or an iPad, the menu bar at the top of the screen displays the top-level menus in your app or game.... |
| [Toggles](./hig/toggles.md) | `references/hig/toggles.md` | A toggle lets people choose between a pair of opposing states, like on and off, using a different appearance t... |
| [Token fields](./hig/token-fields.md) | `references/hig/token-fields.md` | A token field is a type of text field that can convert text into *tokens* that are easy to select and manipula... |
| [Toolbars](./hig/toolbars.md) | `references/hig/toolbars.md` | A toolbar provides convenient access to frequently used commands, controls, navigation, and search.... |
| [Typography](./hig/typography.md) | `references/hig/typography.md` | Your typographic choices can help you display legible text, convey an information hierarchy, communicate impor... |
| [Undo and redo](./hig/undo-and-redo.md) | `references/hig/undo-and-redo.md` | Undo and redo gives people easy ways to reverse many types of actions, which can also help people explore and ... |
| [Virtual keyboards](./hig/virtual-keyboards.md) | `references/hig/virtual-keyboards.md` | On devices without physical keyboards, the system offers various types of virtual keyboards people can use to ... |
| [VoiceOver](./hig/voiceover.md) | `references/hig/voiceover.md` | VoiceOver is a screen reader that lets people experience your app’s interface without needing to see the scree... |
| [Web views](./hig/web-views.md) | `references/hig/web-views.md` | A web view loads and displays rich web content, such as embedded HTML and websites, directly within your app.... |
| [Widgets](./hig/widgets.md) | `references/hig/widgets.md` | A widget provides quick access to essential information and focused interactions from your app or game in addi... |
| [Windows](./hig/windows.md) | `references/hig/windows.md` | A window presents UI views and components in your app or game.... |
| [Writing](./hig/writing.md) | `references/hig/writing.md` | The words you choose within your app are an essential part of its user experience.... |

---

## Root Craft & Governance Guidelines

| Guide | File Path | Focus Area |
| :--- | :--- | :--- |
| [accessibility.md](./accessibility.md) | `references/accessibility.md` | WCAG 2.2 AA non-negotiable requirements and contrast rules |
| [anti-slop-rules.md](./anti-slop-rules.md) | `references/anti-slop-rules.md` | Top 12 AI design anti-patterns and concrete architectural fixes |
| [art-direction-and-taste.md](./art-direction-and-taste.md) | `references/art-direction-and-taste.md` | Taste Skill art direction, aesthetic archetypes, and visual self-correction |
| [backgrounds.md](./backgrounds.md) | `references/backgrounds.md` | Master directory of interactive canvas shaders and React Bits components |
| [code-audit.md](./code-audit.md) | `references/code-audit.md` | Static code inspection search patterns, token grep checks, and replacement ledger |
| [color-and-tokens.md](./color-and-tokens.md) | `references/color-and-tokens.md` | Semantic color hierarchy, WCAG contrast tiers, light/dark mode pairs |
| [cross-platform.md](./cross-platform.md) | `references/cross-platform.md` | Platform translation between Apple HIG, Android Material, and Web |
| [design-principles.md](./design-principles.md) | `references/design-principles.md` | Core design philosophy: Clarity, Deference, Depth, Authenticity |
| [design-review.md](./design-review.md) | `references/design-review.md` | Evidence-based audit protocol and verification reporting |
| [deterministic-audit-matrix.md](./deterministic-audit-matrix.md) | `references/deterministic-audit-matrix.md` | Impeccable 5-dimension scored technical audit and P0-P3 defect triage |
| [hig-lookup.md](./hig-lookup.md) | `references/hig-lookup.md` | Apple HIG 123-topic index and routing guide |
| [img2threejs-pipeline.md](./img2threejs-pipeline.md) | `references/img2threejs-pipeline.md` | img2threejs 6-pass staged sculpting pipeline from 2D images to Three.js |
| [interaction-states.md](./interaction-states.md) | `references/interaction-states.md` | Complete 8-state component matrix (default, hover, focus, active, disabled, loading, error, success) |
| [layout-and-composition.md](./layout-and-composition.md) | `references/layout-and-composition.md` | 8pt spatial grid, asymmetric visual weight, and content containment |
| [motion.md](./motion.md) | `references/motion.md` | Purposeful physics-based spring motion and cubic-bezier curves |
| [platform-guidelines.md](./platform-guidelines.md) | `references/platform-guidelines.md` | Host platform conventions for Web, macOS, iOS, and Mobile |
| [reference-analysis.md](./reference-analysis.md) | `references/reference-analysis.md` | Live reference reverse engineering and 16-section DESIGN.md protocol |
| [responsive-design.md](./responsive-design.md) | `references/responsive-design.md` | Viewport constraints, container queries, and fluid typography |
| [typography.md](./typography.md) | `references/typography.md` | Optical hierarchy, fluid scale formulas, line heights, and letter-spacing tracking |
| [procedural-threejs-models.md](./components/procedural-threejs-models.md) | `references/components/procedural-threejs-models.md` | Code-only procedural Three.js component architecture & lifecycle hooks |
| [selectable-style-registry.md](./design-systems/selectable-style-registry.md) | `references/design-systems/selectable-style-registry.md` | Awesome Design Skills selectable modular design styles and tokens |
| [playwright-browser-testing.md](./developer-tooling/playwright-browser-testing.md) | `references/developer-tooling/playwright-browser-testing.md` | Playwright CLI token-conscious browser automation & responsive verification |

export interface ReferenceGuide {
  id: string;
  category: string;
  categoryName: string;
  fileName: string;
  title: string;
  summary: string;
  path: string;
}

export interface CategorySummary {
  id: string;
  name: string;
  count: number;
  desc: string;
}

export const referenceCategories: CategorySummary[] = [
  {
    "id": "components",
    "name": "UI Components & Primitives",
    "count": 20,
    "desc": "8-state matrices, WCAG 2.2 AA rules, and production TSX code"
  },
  {
    "id": "layouts",
    "name": "Layouts & Architecture",
    "count": 12,
    "desc": "Dashboards, marketing heroes, pricing tables, and settings shells"
  },
  {
    "id": "design-systems",
    "name": "Design Systems & Tokens",
    "count": 12,
    "desc": "3-tier token hierarchies, OKLCH scales, and spatial grids"
  },
  {
    "id": "ux-patterns",
    "name": "UX & Interaction Patterns",
    "count": 12,
    "desc": "Keyboard shortcuts, focus trapping, skeletons, and undo actions"
  },
  {
    "id": "visual-craft",
    "name": "Visual Craft & Polish",
    "count": 10,
    "desc": "Apple polish, materials blur, hairline borders, and spring physics"
  },
  {
    "id": "frontend-engineering",
    "name": "Frontend Engineering",
    "count": 12,
    "desc": "Compound components, headless primitives, and virtualization"
  },
  {
    "id": "accessibility",
    "name": "Accessibility (WCAG 2.2 AA)",
    "count": 10,
    "desc": "Conformance matrices, screen readers, contrast, and touch targets"
  },
  {
    "id": "theming",
    "name": "Theming & Tokens",
    "count": 8,
    "desc": "Dark mode color inversion, runtime CSS variables, and anti-flash"
  },
  {
    "id": "developer-tooling",
    "name": "Developer Tooling & CI",
    "count": 8,
    "desc": "Token linting, Stylelint, visual regression, and contrast tests"
  },
  {
    "id": "real-world-flows",
    "name": "Real-World Production Flows",
    "count": 10,
    "desc": "Authentication, Stripe billing, multi-tenancy, and audit logs"
  },
  {
    "id": "design-analysis",
    "name": "Design Analysis & Reverse Eng.",
    "count": 6,
    "desc": "DOM extraction, screenshot breakdown, and completion gates"
  },
  {
    "id": "responsive",
    "name": "Responsive Design & Ergonomics",
    "count": 6,
    "desc": "Mobile-first breakpoints, touch ergonomics, and fluid clamp"
  },
  {
    "id": "backgrounds",
    "name": "Interactive Shaders & Canvases",
    "count": 15,
    "desc": "WebGL/Canvas shader components from React Bits"
  },
  {
    "id": "frameworks",
    "name": "Framework Guidelines",
    "count": 22,
    "desc": "React, Next.js, Svelte, Vue, Tailwind, SwiftUI, Flutter, etc."
  },
  {
    "id": "hig",
    "name": "Apple Human Interface Guidelines",
    "count": 124,
    "desc": "Complete Apple HIG reference library"
  }
];

export const allReferenceGuides: ReferenceGuide[] = [
  {
    "id": "components-accordion-disclosure",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "accordion-disclosure.md",
    "title": "Accordion & Disclosure Patterns",
    "summary": "Accordions stack collapsible content panels vertically to conserve viewport real estate and reduce cognitive load, ideal for FAQs, dense inspect panels, and com",
    "path": "references/components/accordion-disclosure.md"
  },
  {
    "id": "components-breadcrumbs",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "breadcrumbs.md",
    "title": "Breadcrumb Navigation Hierarchy",
    "summary": "Breadcrumbs communicate nested position within an application hierarchy, enabling users to retrace their steps upwards through parent levels.",
    "path": "references/components/breadcrumbs.md"
  },
  {
    "id": "components-button",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "button.md",
    "title": "Button Component Architecture & Craft Guidelines",
    "summary": "Buttons communicate actions that users can take throughout an application. In Pure SaaS, buttons represent tactile, purposeful decision points rather than decor",
    "path": "references/components/button.md"
  },
  {
    "id": "components-card",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "card.md",
    "title": "Card Container Architecture",
    "summary": "Cards group related information and actions into bounded visual units. Pure SaaS avoids generic card-vomit by enforcing deliberate contrast, purposeful padding,",
    "path": "references/components/card.md"
  },
  {
    "id": "components-checkbox-radio",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "checkbox-radio.md",
    "title": "Checkbox and Radio Group Patterns",
    "summary": "Checkboxes support multi-selection and binary toggles within forms. Radio buttons handle mutually exclusive single-selection within a defined set. Both demand p",
    "path": "references/components/checkbox-radio.md"
  },
  {
    "id": "components-command-palette",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "command-palette.md",
    "title": "Command Palette (Cmd+K) Architecture",
    "summary": "The command palette offers rapid keyboard-first navigation and action execution. It indexes pages, settings, and commands into a searchable modal dialog.",
    "path": "references/components/command-palette.md"
  },
  {
    "id": "components-data-table",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "data-table.md",
    "title": "Data Table & Virtualized List Guidelines",
    "summary": "Data tables organize dense tabular information for fast scanning, sorting, and inline modification. Pure SaaS requires sticky column headers, clean zebra stripi",
    "path": "references/components/data-table.md"
  },
  {
    "id": "components-dropdown-menu",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "dropdown-menu.md",
    "title": "Dropdown Context & Action Menus",
    "summary": "Dropdown menus provide grouped command lists triggered by buttons or context actions. They must support swift keyboard navigation, visual dividers, and shortcut",
    "path": "references/components/dropdown-menu.md"
  },
  {
    "id": "components-input-text",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "input-text.md",
    "title": "Text Input & Field Primitives Specification",
    "summary": "Text fields allow users to enter, edit, and search textual data. In Pure SaaS, input fields must be calm, predictable, and immediately responsive to keyboard in",
    "path": "references/components/input-text.md"
  },
  {
    "id": "components-modal-dialog",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "modal-dialog.md",
    "title": "Modal Dialog & Alert Architectural Guide",
    "summary": "Modals interrupt user flow to capture mandatory decisions or display focused tasks. Pure SaaS enforces focus containment, backdrop dimming without excessive blu",
    "path": "references/components/modal-dialog.md"
  },
  {
    "id": "components-pagination",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "pagination.md",
    "title": "Pagination & Page Navigation Primitives",
    "summary": "Pagination divides large record sets into discrete pages. It provides direct access to numbered pages, previous/next steps, and total count summaries.",
    "path": "references/components/pagination.md"
  },
  {
    "id": "components-popover-tooltip",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "popover-tooltip.md",
    "title": "Popover and Tooltip Floating Primitives",
    "summary": "Tooltips provide brief, non-interactive context on hover/focus. Popovers offer rich, interactive overlays anchored to a trigger element (e.g. date pickers, filt",
    "path": "references/components/popover-tooltip.md"
  },
  {
    "id": "components-select-dropdown",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "select-dropdown.md",
    "title": "Select & Option Menu Guidelines",
    "summary": "Select controls let users choose one or more values from a list. Native selects are preferred on mobile devices for native wheel pickers; custom popover selects",
    "path": "references/components/select-dropdown.md"
  },
  {
    "id": "components-sheet-drawer",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "sheet-drawer.md",
    "title": "Sheet & Drawer Primitives",
    "summary": "Sheets slide in from screen edges (right on desktop, bottom on mobile) to display secondary inspection views, filters, or context panels while preserving curren",
    "path": "references/components/sheet-drawer.md"
  },
  {
    "id": "components-sidebar-nav",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "sidebar-nav.md",
    "title": "Sidebar Navigation Pattern",
    "summary": "Sidebar navigation structures hierarchical application spaces. It must gracefully collapse between expanded rail and icon-only modes while clearly communicating",
    "path": "references/components/sidebar-nav.md"
  },
  {
    "id": "components-tabs-segmented-control",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "tabs-segmented-control.md",
    "title": "Tabs & Segmented Control Design Specification",
    "summary": "Tabs partition related views under a common context. Segmented controls provide compact, inline toggles for filters or view modes with an animated sliding backg",
    "path": "references/components/tabs-segmented-control.md"
  },
  {
    "id": "components-textarea",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "textarea.md",
    "title": "Textarea & Multi-line Editor Specification",
    "summary": "Multi-line inputs accommodate variable-length content such as comments, notes, and code snippets. They require responsive auto-expanding behaviors or clearly bo",
    "path": "references/components/textarea.md"
  },
  {
    "id": "components-toast-snackbar",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "toast-snackbar.md",
    "title": "Toast & Snackbar Notification System",
    "summary": "Toasts provide brief, non-intrusive feedback on completed background operations (e.g., \"Saved changes\", \"Link copied\"). They float over screen corners and dismi",
    "path": "references/components/toast-snackbar.md"
  },
  {
    "id": "components-toggle-switch",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "toggle-switch.md",
    "title": "Toggle Switch Specification",
    "summary": "Switches provide immediate, binary toggles for live settings. Unlike checkboxes that require a form submit button, a switch takes effect immediately upon change",
    "path": "references/components/toggle-switch.md"
  },
  {
    "id": "components-top-nav",
    "category": "components",
    "categoryName": "UI Components & Primitives",
    "fileName": "top-nav.md",
    "title": "Top Navigation Bar Architecture",
    "summary": "Top bars provide persistent product branding, global search, notifications, and primary user controls. They must remain stable across scroll positions without v",
    "path": "references/components/top-nav.md"
  },
  {
    "id": "layouts-analytics-board",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "analytics-board.md",
    "title": "Analytics & KPI Dashboard Grid",
    "summary": "Analytics boards present high-density metrics, trend lines, and data comparisons. They demand clear visual hierarchy and consistent card padding.",
    "path": "references/layouts/analytics-board.md"
  },
  {
    "id": "layouts-auth-portal",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "auth-portal.md",
    "title": "Authentication & Sign-in Portal Layout",
    "summary": "Auth portals handle sign-in, account creation, password recovery, and SSO. They require rock-solid security feedback, uncluttered visual focus, and mobile respo",
    "path": "references/layouts/auth-portal.md"
  },
  {
    "id": "layouts-checkout-funnel",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "checkout-funnel.md",
    "title": "Checkout Funnel & Payment Flow Layout",
    "summary": "Checkout flows must be frictionless and trustworthy, minimizing fields while showing clear itemized totals and SSL trust indicators.",
    "path": "references/layouts/checkout-funnel.md"
  },
  {
    "id": "layouts-documentation-layout",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "documentation-layout.md",
    "title": "Technical Documentation & Knowledge Base Layout",
    "summary": "Documentation requires a distraction-free 3-column architecture: navigation tree on the left, formatted markdown in the center, and on-page table of contents on",
    "path": "references/layouts/documentation-layout.md"
  },
  {
    "id": "layouts-ecommerce-product-grid",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "ecommerce-product-grid.md",
    "title": "E-commerce & Product Catalog Layout",
    "summary": "Product catalogs balance high-density image grids with robust facet filters and instantaneous sorting.",
    "path": "references/layouts/ecommerce-product-grid.md"
  },
  {
    "id": "layouts-marketing-hero",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "marketing-hero.md",
    "title": "Marketing Hero Section Composition & Hierarchy",
    "summary": "The hero section establishes immediate value proposition, brand identity, and the primary call-to-action. Pure SaaS rejects generic centered gradient blur heroe",
    "path": "references/layouts/marketing-hero.md"
  },
  {
    "id": "layouts-onboarding-wizard",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "onboarding-wizard.md",
    "title": "Onboarding Multi-Step Wizard Layout",
    "summary": "Onboarding wizards guide new users through critical configuration steps without overwhelming cognitive bandwidth.",
    "path": "references/layouts/onboarding-wizard.md"
  },
  {
    "id": "layouts-pricing-matrix",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "pricing-matrix.md",
    "title": "Pricing Matrix & Tier Comparison Layout",
    "summary": "Pricing layouts must communicate feature differences and subscription economics clearly, eliminating hidden caveats.",
    "path": "references/layouts/pricing-matrix.md"
  },
  {
    "id": "layouts-saas-dashboard",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "saas-dashboard.md",
    "title": "SaaS App Dashboard Shell & Grid Layout",
    "summary": "The dashboard shell provides the persistent frame for productivity applications: side navigation, global header bar, and flexible content workspace.",
    "path": "references/layouts/saas-dashboard.md"
  },
  {
    "id": "layouts-saas-landing",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "saas-landing.md",
    "title": "SaaS Marketing Landing Page Blueprint",
    "summary": "A complete SaaS landing page guides potential customers from initial interest through proof, feature discovery, pricing, and onboarding conversion.",
    "path": "references/layouts/saas-landing.md"
  },
  {
    "id": "layouts-settings-profile",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "settings-profile.md",
    "title": "Settings & Profile Management Layout",
    "summary": "Settings pages organize account, team, billing, and security preferences into structured master-detail panels.",
    "path": "references/layouts/settings-profile.md"
  },
  {
    "id": "layouts-status-page",
    "category": "layouts",
    "categoryName": "Layouts & Architecture",
    "fileName": "status-page.md",
    "title": "System Status & Incident Timeline Layout",
    "summary": "Public status pages broadcast uptime, service health, and incident resolution progress, inspiring customer confidence during downtime.",
    "path": "references/layouts/status-page.md"
  },
  {
    "id": "design-systems-border-radius-geometry",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "border-radius-geometry.md",
    "title": "Border Radius Geometry & Concentric Corner Nesting",
    "summary": "Corner geometry dictates visual softness and hardware alignment. Pure SaaS applies concentric corner mathematics: inner radius must equal outer radius minus pad",
    "path": "references/design-systems/border-radius-geometry.md"
  },
  {
    "id": "design-systems-color-palette-construction",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "color-palette-construction.md",
    "title": "Color Palette Construction & Perceptual Lightness Scales",
    "summary": "Building accessible digital color systems requires perceptual uniformity. Pure SaaS utilizes OKLCH color spaces to avoid the hue shifts and uneven luminance ste",
    "path": "references/design-systems/color-palette-construction.md"
  },
  {
    "id": "design-systems-component-contract-design",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "component-contract-design.md",
    "title": "Component Contract Design & API Polymorphism",
    "summary": "Well-designed component contracts maximize flexibility while preventing invalid states.",
    "path": "references/design-systems/component-contract-design.md"
  },
  {
    "id": "design-systems-design-system-governance",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "design-system-governance.md",
    "title": "Design System Governance & Contribution Model",
    "summary": "Governance protects the design system from divergence, duplicated components, and uncurated visual drift.",
    "path": "references/design-systems/design-system-governance.md"
  },
  {
    "id": "design-systems-design-system-versioning",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "design-system-versioning.md",
    "title": "Design System Versioning & Deprecation Lifecycle",
    "summary": "Predictable versioning ensures consuming teams can adopt updates safely without breaking existing customer interfaces.",
    "path": "references/design-systems/design-system-versioning.md"
  },
  {
    "id": "design-systems-design-tokens-architecture",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "design-tokens-architecture.md",
    "title": "Design Tokens Architecture & 3-Tier Hierarchy",
    "summary": "Design tokens are the atomic building blocks of a maintainable UI system. Pure SaaS enforces a strict 3-tier hierarchy: Global/Raw, Semantic/System, and Compone",
    "path": "references/design-systems/design-tokens-architecture.md"
  },
  {
    "id": "design-systems-elevation-depth-shadows",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "elevation-depth-shadows.md",
    "title": "Elevation, Depth & Multi-Layer Shadow Tokens",
    "summary": "Depth clarifies visual hierarchy and overlapping surfaces. Pure SaaS replaces single harsh drop shadows with realistic multi-layer ambient and directional shado",
    "path": "references/design-systems/elevation-depth-shadows.md"
  },
  {
    "id": "design-systems-grid-container-queries",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "grid-container-queries.md",
    "title": "Container Queries & Responsive Component Grids",
    "summary": "Modern modular layouts adapt based on their available container space rather than the full browser viewport width.",
    "path": "references/design-systems/grid-container-queries.md"
  },
  {
    "id": "design-systems-spacing-spatial-grids",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "spacing-spatial-grids.md",
    "title": "Spatial Grids, Layout Rhythm & Spacing Tokens",
    "summary": "Spatial systems define rhythm, alignment, and balance. Pure SaaS enforces an 8pt spatial grid with 4pt micro-steps for compact UI density.",
    "path": "references/design-systems/spacing-spatial-grids.md"
  },
  {
    "id": "design-systems-token-naming-taxonomy",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "token-naming-taxonomy.md",
    "title": "Token Naming Taxonomy & Structured Conventions",
    "summary": "A standardized naming taxonomy prevents token collisions, accelerates developer onboarding, and enables automated tooling transforms.",
    "path": "references/design-systems/token-naming-taxonomy.md"
  },
  {
    "id": "design-systems-token-transform-dtcg",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "token-transform-dtcg.md",
    "title": "DTCG Token Transforms & Multi-Platform Export",
    "summary": "The W3C Design Tokens Community Group (DTCG) specification provides a vendor-neutral JSON format for sharing tokens across Web, iOS, and Android.",
    "path": "references/design-systems/token-transform-dtcg.md"
  },
  {
    "id": "design-systems-typography-scale-hierarchy",
    "category": "design-systems",
    "categoryName": "Design Systems & Tokens",
    "fileName": "typography-scale-hierarchy.md",
    "title": "Typography Scale, Fluid Formulas, and Optical Tracking",
    "summary": "Typography conveys structure, priority, and voice. Pure SaaS couples mathematical modular scales with fluid clamp() formulas and negative letter-spacing on disp",
    "path": "references/design-systems/typography-scale-hierarchy.md"
  },
  {
    "id": "ux-patterns-drag-drop-interactions",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "drag-drop-interactions.md",
    "title": "Accessible Drag and Drop Interactions",
    "summary": "Drag-and-drop handles kanban boards, file uploads, and list reordering. Pure SaaS requires full keyboard parity and screen reader announcements alongside mouse ",
    "path": "references/ux-patterns/drag-drop-interactions.md"
  },
  {
    "id": "ux-patterns-empty-states-onboarding",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "empty-states-onboarding.md",
    "title": "Empty States, Zero-Data Fallbacks & Starter Guidance",
    "summary": "Empty states are prime educational real estate. Rather than presenting dead ends, Pure SaaS designs empty states that celebrate potential, explain the value, an",
    "path": "references/ux-patterns/empty-states-onboarding.md"
  },
  {
    "id": "ux-patterns-feedback-toast-system",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "feedback-toast-system.md",
    "title": "Feedback Toast System & Notification Queues",
    "summary": "Toasts handle non-blocking, asynchronous system feedback with a disciplined FIFO queue and viewport corner stacking.",
    "path": "references/ux-patterns/feedback-toast-system.md"
  },
  {
    "id": "ux-patterns-focus-management-trapping",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "focus-management-trapping.md",
    "title": "Focus Management, Trapping & Restoration",
    "summary": "Proper focus management guarantees that keyboard and screen-reader users can navigate web applications without getting stranded or losing their place after dial",
    "path": "references/ux-patterns/focus-management-trapping.md"
  },
  {
    "id": "ux-patterns-form-steppers-wizards",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "form-steppers-wizards.md",
    "title": "Form Steppers & Multi-Step Progress Flows",
    "summary": "Steppers divide long, complex forms into bite-sized, logical milestones, lowering cognitive fatigue and drop-off rates.",
    "path": "references/ux-patterns/form-steppers-wizards.md"
  },
  {
    "id": "ux-patterns-infinite-scroll-pagination",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "infinite-scroll-pagination.md",
    "title": "Infinite Scroll & Virtualized Feed Patterns",
    "summary": "Infinite scrolling provides seamless browsing for feeds and logs, but requires robust scroll restoration and footer reachability solutions.",
    "path": "references/ux-patterns/infinite-scroll-pagination.md"
  },
  {
    "id": "ux-patterns-inline-validation-errors",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "inline-validation-errors.md",
    "title": "Inline Validation & Real-Time Form Error Handling",
    "summary": "Inline validation guides users to correct mistakes as early as possible without prematurely nagging them before they finish typing.",
    "path": "references/ux-patterns/inline-validation-errors.md"
  },
  {
    "id": "ux-patterns-keyboard-shortcuts-navigation",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "keyboard-shortcuts-navigation.md",
    "title": "Keyboard Shortcuts & Global Navigation Systems",
    "summary": "Keyboard shortcuts transform productivity web applications into power-user environments. Pure SaaS standardizes key combination handling, collision prevention, ",
    "path": "references/ux-patterns/keyboard-shortcuts-navigation.md"
  },
  {
    "id": "ux-patterns-loading-skeletons-spinners",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "loading-skeletons-spinners.md",
    "title": "Loading Skeletons, Micro-Spinners & Shimmer States",
    "summary": "Perceived performance is heavily dictated by loading patterns. Pure SaaS uses content-matched skeleton shimmers to eliminate Cumulative Layout Shift (CLS) and r",
    "path": "references/ux-patterns/loading-skeletons-spinners.md"
  },
  {
    "id": "ux-patterns-optimistic-ui-updates",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "optimistic-ui-updates.md",
    "title": "Optimistic UI Updates & Instant Feedback",
    "summary": "Optimistic updates assume backend operations will succeed, immediately updating the visual state and rolling back with an informative alert if the server reject",
    "path": "references/ux-patterns/optimistic-ui-updates.md"
  },
  {
    "id": "ux-patterns-search-autocomplete-filtering",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "search-autocomplete-filtering.md",
    "title": "Search Autocomplete & Instant Filter Patterns",
    "summary": "Search autocomplete anticipates queries and displays rich matching entities with highlighted substring terms.",
    "path": "references/ux-patterns/search-autocomplete-filtering.md"
  },
  {
    "id": "ux-patterns-undo-destructive-actions",
    "category": "ux-patterns",
    "categoryName": "UX & Interaction Patterns",
    "fileName": "undo-destructive-actions.md",
    "title": "Undo Patterns vs Destructive Confirmation Dialogs",
    "summary": "Modern UX favors forgiving interfaces with instantaneous \"Undo\" over intrusive confirmation modals that induce dialog fatigue.",
    "path": "references/ux-patterns/undo-destructive-actions.md"
  },
  {
    "id": "visual-craft-apple-visual-polish",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "apple-visual-polish.md",
    "title": "Apple-Inspired Visual Polish & Hardware-Grade Craft",
    "summary": "The signature Apple design feel stems from extraordinary restraint, optical alignment, physics-based springs, and continuous corner geometry. Pure SaaS codifies",
    "path": "references/visual-craft/apple-visual-polish.md"
  },
  {
    "id": "visual-craft-fluid-spring-physics",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "fluid-spring-physics.md",
    "title": "Fluid Spring Physics & Animation Curves",
    "summary": "Linear transitions feel mechanical and robotic. Pure SaaS mandates physics-based spring curves that accelerate quickly and decelerate smoothly with natural iner",
    "path": "references/visual-craft/fluid-spring-physics.md"
  },
  {
    "id": "visual-craft-hairline-borders-separators",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "hairline-borders-separators.md",
    "title": "Hairline Borders, Separators & Sub-Pixel Sharpness",
    "summary": "Thick, muddy borders make interfaces look clumsy. Pure SaaS employs razor-sharp 1px (or 0.5px on Retina/High-DPI displays) hairline dividers.",
    "path": "references/visual-craft/hairline-borders-separators.md"
  },
  {
    "id": "visual-craft-light-dark-lighting-models",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "light-dark-lighting-models.md",
    "title": "Light & Dark Lighting Models: Elevation vs Self-Illumination",
    "summary": "Light mode mimics overhead directional sunlight casting downward shadows. Dark mode mimics an environment where surfaces emit subtle luminescence and borders re",
    "path": "references/visual-craft/light-dark-lighting-models.md"
  },
  {
    "id": "visual-craft-materials-vibrancy-blur",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "materials-vibrancy-blur.md",
    "title": "Materials, Vibrancy & Acrylic Backdrop Blur",
    "summary": "Materials simulate translucent physical surfaces that adopt the color temperature of underlying content while maintaining legible contrast.",
    "path": "references/visual-craft/materials-vibrancy-blur.md"
  },
  {
    "id": "visual-craft-micro-interaction-feedback",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "micro-interaction-feedback.md",
    "title": "Micro-Interaction Tactile Feedback",
    "summary": "Micro-interactions communicate state changes with delightful, tactile physical confirmation.",
    "path": "references/visual-craft/micro-interaction-feedback.md"
  },
  {
    "id": "visual-craft-optical-alignment-centering",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "optical-alignment-centering.md",
    "title": "Optical Alignment vs Mathematical Centering",
    "summary": "Mathematical centering frequently looks off-center to the human eye due to typographic ascenders/descenders, icon visual weight, and asymmetric shapes.",
    "path": "references/visual-craft/optical-alignment-centering.md"
  },
  {
    "id": "visual-craft-shadow-bloom-ambient-occlusion",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "shadow-bloom-ambient-occlusion.md",
    "title": "Shadow Bloom & Ambient Occlusion Techniques",
    "summary": "Realistic depth requires separating the soft ambient shadow (contact occlusion) from the directional key light shadow.",
    "path": "references/visual-craft/shadow-bloom-ambient-occlusion.md"
  },
  {
    "id": "visual-craft-staggered-entrance-motion",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "staggered-entrance-motion.md",
    "title": "Staggered Entrance Motion & Cascading Reveals",
    "summary": "When lists or grids mount, staggering item reveals by 30-50ms directs eye flow naturally without cognitive overload.",
    "path": "references/visual-craft/staggered-entrance-motion.md"
  },
  {
    "id": "visual-craft-visual-weight-asymmetry",
    "category": "visual-craft",
    "categoryName": "Visual Craft & Polish",
    "fileName": "visual-weight-asymmetry.md",
    "title": "Visual Weight, Composition Asymmetry & Focal Control",
    "summary": "Symmetrical grids often become monotonous and visually boring. Asymmetric layouts create intentional tension that guides user attention to high-value focal poin",
    "path": "references/visual-craft/visual-weight-asymmetry.md"
  },
  {
    "id": "frontend-engineering-animation-frame-scheduling",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "animation-frame-scheduling.md",
    "title": "requestAnimationFrame Scheduling & Scroll Performance",
    "summary": "High-frequency events like window scroll, resize, and mouse tracking must be scheduled via `requestAnimationFrame` to avoid main-thread jank.",
    "path": "references/frontend-engineering/animation-frame-scheduling.md"
  },
  {
    "id": "frontend-engineering-css-architecture-token-layering",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "css-architecture-token-layering.md",
    "title": "CSS Architecture, Cascade Layers (@layer) & Token Scoping",
    "summary": "Modern CSS uses `@layer` to declare explicit cascade precedence, ending specificity wars and eliminating `!important` overrides.",
    "path": "references/frontend-engineering/css-architecture-token-layering.md"
  },
  {
    "id": "frontend-engineering-data-fetching-cache-invalidation",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "data-fetching-cache-invalidation.md",
    "title": "Data Fetching, Cache Invalidation & Stale-While-Revalidate",
    "summary": "Using TanStack Query or SWR provides instantaneous background synchronization, automatic deduplication, and cache invalidation.",
    "path": "references/frontend-engineering/data-fetching-cache-invalidation.md"
  },
  {
    "id": "frontend-engineering-dom-size-virtualization",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "dom-size-virtualization.md",
    "title": "DOM Size Optimization & Large List Virtualization",
    "summary": "Rendering thousands of DOM elements causes high memory consumption and unresponsive scroll frames. Virtualization renders strictly the visible window.",
    "path": "references/frontend-engineering/dom-size-virtualization.md"
  },
  {
    "id": "frontend-engineering-error-boundary-fallbacks",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "error-boundary-fallbacks.md",
    "title": "Error Boundaries & Graceful Degradation",
    "summary": "Component error boundaries prevent a single runtime JavaScript exception from crashing the entire application window.",
    "path": "references/frontend-engineering/error-boundary-fallbacks.md"
  },
  {
    "id": "frontend-engineering-headless-primitive-patterns",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "headless-primitive-patterns.md",
    "title": "Headless UI Primitives & Separation of Concerns",
    "summary": "Separating behavioral state, keyboard interactions, and ARIA attributes from visual styling produces robust, 100% themeable components.",
    "path": "references/frontend-engineering/headless-primitive-patterns.md"
  },
  {
    "id": "frontend-engineering-react-compound-components",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "react-compound-components.md",
    "title": "Compound Component Architecture in React",
    "summary": "Compound components share implicit state and coordinate complex UI trees via React Context, providing flexible JSX composition without prop-drilling.",
    "path": "references/frontend-engineering/react-compound-components.md"
  },
  {
    "id": "frontend-engineering-render-performance-optimization",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "render-performance-optimization.md",
    "title": "React Render Performance & Re-render Optimization",
    "summary": "High-frequency UI updates (e.g. typing, slider dragging, live metrics) must not trigger catastrophic whole-tree re-renders.",
    "path": "references/frontend-engineering/render-performance-optimization.md"
  },
  {
    "id": "frontend-engineering-reusable-hooks-patterns",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "reusable-hooks-patterns.md",
    "title": "Custom React Hooks for UI Primitives",
    "summary": "Custom hooks package browser event listeners, media queries, and lifecycle behaviors into reusable functional primitives.",
    "path": "references/frontend-engineering/reusable-hooks-patterns.md"
  },
  {
    "id": "frontend-engineering-server-client-boundary-patterns",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "server-client-boundary-patterns.md",
    "title": "React Server Components (RSC) & Client Boundaries",
    "summary": "Next.js and modern React frameworks split applications into Server Components (zero JS bundle) and Client Components (`\"use client\"` for interactivity).",
    "path": "references/frontend-engineering/server-client-boundary-patterns.md"
  },
  {
    "id": "frontend-engineering-state-machine-ui-modeling",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "state-machine-ui-modeling.md",
    "title": "Finite State Machines for Complex UI Flows",
    "summary": "Modeling complex interfaces with finite state machines (e.g. XState) mathematically eliminates impossible states and race conditions.",
    "path": "references/frontend-engineering/state-machine-ui-modeling.md"
  },
  {
    "id": "frontend-engineering-web-vitals-inp-cls-lcp",
    "category": "frontend-engineering",
    "categoryName": "Frontend Engineering",
    "fileName": "web-vitals-inp-cls-lcp.md",
    "title": "Core Web Vitals Optimization (INP, CLS, LCP)",
    "summary": "Google Core Web Vitals directly measure user experience: Interaction to Next Paint (INP < 200ms), Cumulative Layout Shift (CLS < 0.1), and Largest Contentful Pa",
    "path": "references/frontend-engineering/web-vitals-inp-cls-lcp.md"
  },
  {
    "id": "accessibility-accessible-color-contrast",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-color-contrast.md",
    "title": "Accessible Color Contrast & APCA Verification",
    "summary": "Contrast guarantees that text and visual elements can be deciphered by users with moderate visual impairments and across challenging lighting conditions.",
    "path": "references/accessibility/accessible-color-contrast.md"
  },
  {
    "id": "accessibility-accessible-data-tables",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-data-tables.md",
    "title": "Accessible Data Table Semantics & Keyboard Scrolling",
    "summary": "Complex data tables require explicit column and row headers, sort announcements, and keyboard-accessible scroll containers.",
    "path": "references/accessibility/accessible-data-tables.md"
  },
  {
    "id": "accessibility-accessible-dialogs-modals",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-dialogs-modals.md",
    "title": "Accessible Modal Dialogs & Alert Dialogs",
    "summary": "Dialogs demand strict focus containment, background inertness, and appropriate role semantics.",
    "path": "references/accessibility/accessible-dialogs-modals.md"
  },
  {
    "id": "accessibility-accessible-forms-validation",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-forms-validation.md",
    "title": "Accessible Form Architecture & Field Groupings",
    "summary": "Forms must present unambiguous labels, associated descriptions, and programmatic error associations.",
    "path": "references/accessibility/accessible-forms-validation.md"
  },
  {
    "id": "accessibility-accessible-navigation-menus",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-navigation-menus.md",
    "title": "Accessible Navigation Menus & Disclosure Submenus",
    "summary": "Multi-level navigation menus must allow keyboard users to tab past top-level categories without having to traverse dozens of hidden sub-links.",
    "path": "references/accessibility/accessible-navigation-menus.md"
  },
  {
    "id": "accessibility-accessible-svg-iconography",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-svg-iconography.md",
    "title": "Accessible SVG Iconography & Visual Symbols",
    "summary": "Icons must be treated according to their functional intent: decorative icons must be hidden from screen readers, while standalone action icons require accessibl",
    "path": "references/accessibility/accessible-svg-iconography.md"
  },
  {
    "id": "accessibility-accessible-touch-targets",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "accessible-touch-targets.md",
    "title": "Accessible Touch Targets & Target Spacing (WCAG 2.5.8)",
    "summary": "Users with tremors, motor impairments, or large fingers struggle with crowded buttons. Pure SaaS guarantees adequate physical target sizing.",
    "path": "references/accessibility/accessible-touch-targets.md"
  },
  {
    "id": "accessibility-reduced-motion-high-contrast",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "reduced-motion-high-contrast.md",
    "title": "Reduced Motion & Forced High-Contrast Adaptations",
    "summary": "Operating system accessibility preferences must be respected: reduced motion for vestibular safety and forced-colors for Windows High Contrast mode.",
    "path": "references/accessibility/reduced-motion-high-contrast.md"
  },
  {
    "id": "accessibility-screen-reader-announcements-aria",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "screen-reader-announcements-aria.md",
    "title": "Screen Reader Announcements & ARIA Live Regions",
    "summary": "Dynamic web applications change state without full page reloads. ARIA live regions announce asynchronous events to assistive technologies.",
    "path": "references/accessibility/screen-reader-announcements-aria.md"
  },
  {
    "id": "accessibility-wcag-22-conformance-matrix",
    "category": "accessibility",
    "categoryName": "Accessibility (WCAG 2.2 AA)",
    "fileName": "wcag-22-conformance-matrix.md",
    "title": "WCAG 2.2 AA Conformance Matrix & Compliance Gates",
    "summary": "WCAG 2.2 introduces critical criteria around focus appearance, dragging movements, and target sizes. Pure SaaS treats WCAG 2.2 Level AA compliance as a non-nego",
    "path": "references/accessibility/wcag-22-conformance-matrix.md"
  },
  {
    "id": "theming-contrast-preservation-themes",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "contrast-preservation-themes.md",
    "title": "Contrast Preservation Across Theme Variants",
    "summary": "When supporting multiple themes (e.g. Light, Dark, Midnight, High-Contrast), semantic tokens must maintain WCAG 2.2 contrast compliance in every variation.",
    "path": "references/theming/contrast-preservation-themes.md"
  },
  {
    "id": "theming-css-variables-runtime-themes",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "css-variables-runtime-themes.md",
    "title": "CSS Variables Architecture for Runtime Theming",
    "summary": "Switching themes via CSS custom properties on the root element enables instant theme switching without re-rendering React trees or downloading new stylesheets.",
    "path": "references/theming/css-variables-runtime-themes.md"
  },
  {
    "id": "theming-dark-mode-color-inversion",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "dark-mode-color-inversion.md",
    "title": "Dark Mode Architecture & Color Inversion Principles",
    "summary": "Dark mode is not an automated mathematical negative of light mode. It requires desaturating primary colors, adjusting surface elevations, and balancing luminanc",
    "path": "references/theming/dark-mode-color-inversion.md"
  },
  {
    "id": "theming-high-contrast-modes",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "high-contrast-modes.md",
    "title": "High Contrast Mode & Forced-Colors Adaptations",
    "summary": "Operating system high-contrast modes assist users with significant vision loss by replacing author colors with system-defined high-contrast palettes.",
    "path": "references/theming/high-contrast-modes.md"
  },
  {
    "id": "theming-multi-brand-theming",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "multi-brand-theming.md",
    "title": "Multi-Brand & Tenant Token Scoping",
    "summary": "Enterprise SaaS products often serve multiple customer brands or sub-brands from a single unified codebase.",
    "path": "references/theming/multi-brand-theming.md"
  },
  {
    "id": "theming-system-preference-detection",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "system-preference-detection.md",
    "title": "System Preference Detection & Reactive Switching",
    "summary": "Modern web applications should default to the user’s operating system theme preference (`prefers-color-scheme`) while providing a manual user override that pers",
    "path": "references/theming/system-preference-detection.md"
  },
  {
    "id": "theming-tailwind-theme-configuration",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "tailwind-theme-configuration.md",
    "title": "Tailwind CSS Theme Token Integration",
    "summary": "Configuring Tailwind CSS to resolve utility classes directly to semantic CSS variables eliminates arbitrary color classes and enforces design consistency.",
    "path": "references/theming/tailwind-theme-configuration.md"
  },
  {
    "id": "theming-theme-flash-prevention",
    "category": "theming",
    "categoryName": "Theming & Tokens",
    "fileName": "theme-flash-prevention.md",
    "title": "Theme Flash Prevention (FOIT / FOUC) in SSR & Next.js",
    "summary": "When using server-side rendering, a mismatch between server-rendered HTML and client localStorage can cause an ugly white flash when loading dark mode.",
    "path": "references/theming/theme-flash-prevention.md"
  },
  {
    "id": "developer-tooling-browser-devtools-inspection-workflow",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "browser-devtools-inspection-workflow.md",
    "title": "Browser DevTools Inspection & Visual Audit Workflow",
    "summary": "A disciplined manual DevTools inspection workflow verifies computed metrics, rendering layers, repaint cycles, and CSS animations in real runtime engines.",
    "path": "references/developer-tooling/browser-devtools-inspection-workflow.md"
  },
  {
    "id": "developer-tooling-contrast-ratio-automation",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "contrast-ratio-automation.md",
    "title": "Automated Contrast Ratio CI Pipelines",
    "summary": "Automating contrast validation checks mathematical WCAG luminance formulas on every build without requiring manual eyedropper checks.",
    "path": "references/developer-tooling/contrast-ratio-automation.md"
  },
  {
    "id": "developer-tooling-design-token-linting",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "design-token-linting.md",
    "title": "Design Token Linting & Static AST Verification",
    "summary": "Static analysis tools scan codebase ASTs to detect raw hex colors, arbitrary spacing constants, and deprecated tokens before they can be merged.",
    "path": "references/developer-tooling/design-token-linting.md"
  },
  {
    "id": "developer-tooling-headless-browser-regression",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "headless-browser-regression.md",
    "title": "Visual Regression Testing with Headless Browsers",
    "summary": "Visual regression testing captures screenshots in headless Chromium/WebKit and computes pixel diffs against approved baseline snapshots.",
    "path": "references/developer-tooling/headless-browser-regression.md"
  },
  {
    "id": "developer-tooling-lighthouse-ci-auditing",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "lighthouse-ci-auditing.md",
    "title": "Lighthouse CI Auditing & Performance Budgets",
    "summary": "Lighthouse CI automatically benchmarks performance, accessibility, SEO, and best practices on every pull request.",
    "path": "references/developer-tooling/lighthouse-ci-auditing.md"
  },
  {
    "id": "developer-tooling-storybook-component-catalog",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "storybook-component-catalog.md",
    "title": "Storybook Component Catalogs & State Testing",
    "summary": "Storybook provides an isolated sandbox to develop, test, and document components across all 8 core states (Default, Hover, Focus, Active, Disabled, Loading, Err",
    "path": "references/developer-tooling/storybook-component-catalog.md"
  },
  {
    "id": "developer-tooling-stylelint-token-enforcement",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "stylelint-token-enforcement.md",
    "title": "Stylelint Configuration for Strict Token Enforcement",
    "summary": "Stylelint rules prevent arbitrary CSS declarations, enforcing the use of CSS custom properties for colors, spacing, and font sizes.",
    "path": "references/developer-tooling/stylelint-token-enforcement.md"
  },
  {
    "id": "developer-tooling-tailwind-arbitrary-prevention",
    "category": "developer-tooling",
    "categoryName": "Developer Tooling & CI",
    "fileName": "tailwind-arbitrary-prevention.md",
    "title": "Arbitrary Tailwind Class Prevention & ESLint Rules",
    "summary": "Arbitrary Tailwind brackets (`w-[327px]`, `bg-[#1a1a1a]`, `text-[13.5px]`) re-introduce rogue styling chaos into codebases. Pure SaaS enforces strict ESLint rul",
    "path": "references/developer-tooling/tailwind-arbitrary-prevention.md"
  },
  {
    "id": "real-world-flows-api-keys-developer-portal",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "api-keys-developer-portal.md",
    "title": "API Keys & Developer Secrets Management",
    "summary": "Developer portals handle the generation, display, scoping, and rotation of API keys with strict one-time reveal safeguards.",
    "path": "references/real-world-flows/api-keys-developer-portal.md"
  },
  {
    "id": "real-world-flows-audit-log-timeline",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "audit-log-timeline.md",
    "title": "Audit Log & Security Activity Timeline",
    "summary": "Audit logs provide an immutable timeline of security events (logins, API key generation, permission updates, deletions) for enterprise compliance (SOC2/ISO27001",
    "path": "references/real-world-flows/audit-log-timeline.md"
  },
  {
    "id": "real-world-flows-authentication-flow",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "authentication-flow.md",
    "title": "Authentication & Session Lifecycle Flow",
    "summary": "Authentication orchestrates login, multi-factor challenges (MFA/TOTP), OAuth callbacks, session expiration, and password resets with uncompromising security and",
    "path": "references/real-world-flows/authentication-flow.md"
  },
  {
    "id": "real-world-flows-billing-stripe-polar-checkout",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "billing-stripe-polar-checkout.md",
    "title": "Billing & Polar/Stripe Checkout Integration Flow",
    "summary": "Subscription flows handle plan upgrades, invoice history, payment method management, and prorated plan adjustments without user friction.",
    "path": "references/real-world-flows/billing-stripe-polar-checkout.md"
  },
  {
    "id": "real-world-flows-data-export-reporting",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "data-export-reporting.md",
    "title": "Data Export & Asynchronous Reporting Flow",
    "summary": "Exporting large datasets requires asynchronous job queuing, clear format selection (CSV, JSON, Parquet), and non-blocking download notifications.",
    "path": "references/real-world-flows/data-export-reporting.md"
  },
  {
    "id": "real-world-flows-invite-member-permissions",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "invite-member-permissions.md",
    "title": "Team Member Invitations & Role-Based Access (RBAC)",
    "summary": "Inviting collaborators requires granular role assignment (Owner, Admin, Member, Viewer) with clear permission explanations.",
    "path": "references/real-world-flows/invite-member-permissions.md"
  },
  {
    "id": "real-world-flows-multi-tenant-team-switching",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "multi-tenant-team-switching.md",
    "title": "Multi-Tenant Workspace & Team Switching Flow",
    "summary": "Multi-tenant systems allow users to belong to several organizations, requiring swift workspace switching without losing route context.",
    "path": "references/real-world-flows/multi-tenant-team-switching.md"
  },
  {
    "id": "real-world-flows-notifications-inbox-center",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "notifications-inbox-center.md",
    "title": "Notifications Inbox & Real-Time Alert Center",
    "summary": "Notification hubs organize team mentions, system alerts, and task assignments with unread counters and granular notification preferences.",
    "path": "references/real-world-flows/notifications-inbox-center.md"
  },
  {
    "id": "real-world-flows-search-faceting-filtering",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "search-faceting-filtering.md",
    "title": "Faceted Search & Multi-Dimensional Filtering",
    "summary": "Faceted search combines full-text queries with discrete category, price, date, and status filters, accompanied by active filter chips.",
    "path": "references/real-world-flows/search-faceting-filtering.md"
  },
  {
    "id": "real-world-flows-user-profile-account-settings",
    "category": "real-world-flows",
    "categoryName": "Real-World Production Flows",
    "fileName": "user-profile-account-settings.md",
    "title": "User Profile & Account Settings Flow",
    "summary": "Account settings house personal information, avatar uploads, password management, session termination, and permanent account deletion.",
    "path": "references/real-world-flows/user-profile-account-settings.md"
  },
  {
    "id": "design-analysis-dom-devtools-extraction",
    "category": "design-analysis",
    "categoryName": "Design Analysis & Reverse Eng.",
    "fileName": "dom-devtools-extraction.md",
    "title": "Live Website DOM & DevTools Reverse Engineering",
    "summary": "Inspecting live reference websites via browser DevTools extracts exact computed styles, CSS variables, and layout structures rather than relying on optical gues",
    "path": "references/design-analysis/dom-devtools-extraction.md"
  },
  {
    "id": "design-analysis-motion-curve-reconstruction",
    "category": "design-analysis",
    "categoryName": "Design Analysis & Reverse Eng.",
    "fileName": "motion-curve-reconstruction.md",
    "title": "Motion Curve & Physics Reverse Engineering",
    "summary": "Recreating the tactile feel of an interface requires analyzing duration, acceleration, and damping curves from live reference sites.",
    "path": "references/design-analysis/motion-curve-reconstruction.md"
  },
  {
    "id": "design-analysis-screenshot-reference-analysis",
    "category": "design-analysis",
    "categoryName": "Design Analysis & Reverse Eng.",
    "fileName": "screenshot-reference-analysis.md",
    "title": "Screenshot Reference Deconstruction & Visual Decomposition",
    "summary": "Deconstructing visual references requires breaking flat screenshots into their fundamental layers: canvas backgrounds, spatial containers, elevation shadows, ty",
    "path": "references/design-analysis/screenshot-reference-analysis.md"
  },
  {
    "id": "design-analysis-spacing-scale-reconstruction",
    "category": "design-analysis",
    "categoryName": "Design Analysis & Reverse Eng.",
    "fileName": "spacing-scale-reconstruction.md",
    "title": "Spacing Scale Reconstruction & Spatial Reverse Engineering",
    "summary": "Reverse engineering layouts requires identifying the underlying spatial rhythm (typically 4pt or 8pt grid) to eliminate arbitrary padding values.",
    "path": "references/design-analysis/spacing-scale-reconstruction.md"
  },
  {
    "id": "design-analysis-typography-matching-pairing",
    "category": "design-analysis",
    "categoryName": "Design Analysis & Reverse Eng.",
    "fileName": "typography-matching-pairing.md",
    "title": "Typography Matching, Pairing & Font Fallbacks",
    "summary": "Accurately reproducing a brand identity requires identifying primary display typefaces, editorial body pairings, and reliable system font stacks.",
    "path": "references/design-analysis/typography-matching-pairing.md"
  },
  {
    "id": "design-analysis-visual-drift-comparison-gates",
    "category": "design-analysis",
    "categoryName": "Design Analysis & Reverse Eng.",
    "fileName": "visual-drift-comparison-gates.md",
    "title": "Visual Drift Comparison & 11-Item Quality Gates",
    "summary": "Before claiming that a recreation is complete, perform rigorous side-by-side visual comparison against the original reference across an 11-item completion gate.",
    "path": "references/design-analysis/visual-drift-comparison-gates.md"
  },
  {
    "id": "responsive-adaptive-navigation-patterns",
    "category": "responsive",
    "categoryName": "Responsive Design & Ergonomics",
    "fileName": "adaptive-navigation-patterns.md",
    "title": "Adaptive Navigation Patterns: Mobile Drawer to Desktop Rail",
    "summary": "Navigation must transform gracefully between mobile bottom sheets/drawers and persistent desktop sidebars.",
    "path": "references/responsive/adaptive-navigation-patterns.md"
  },
  {
    "id": "responsive-cross-device-form-inputs",
    "category": "responsive",
    "categoryName": "Responsive Design & Ergonomics",
    "fileName": "cross-device-form-inputs.md",
    "title": "Cross-Device Form Input Optimization & Virtual Keyboards",
    "summary": "Optimizing form inputs for mobile devices requires invoking the correct virtual keyboard layout, preventing unwanted auto-zoom, and streamlining entry.",
    "path": "references/responsive/cross-device-form-inputs.md"
  },
  {
    "id": "responsive-data-density-viewport-modes",
    "category": "responsive",
    "categoryName": "Responsive Design & Ergonomics",
    "fileName": "data-density-viewport-modes.md",
    "title": "Data Density & Responsive Viewport Adaptations",
    "summary": "Dense data grids must adapt their display density across screen sizes: comfortable spacing on touchscreens, compact high-information density on desktop workstat",
    "path": "references/responsive/data-density-viewport-modes.md"
  },
  {
    "id": "responsive-fluid-typography-spacing-clamp",
    "category": "responsive",
    "categoryName": "Responsive Design & Ergonomics",
    "fileName": "fluid-typography-spacing-clamp.md",
    "title": "Fluid Typography & Spacing with CSS clamp()",
    "summary": "Fluid typography and spacing smoothly scale between mobile and desktop viewport boundaries without abrupt layout jumps.",
    "path": "references/responsive/fluid-typography-spacing-clamp.md"
  },
  {
    "id": "responsive-mobile-first-breakpoint-strategy",
    "category": "responsive",
    "categoryName": "Responsive Design & Ergonomics",
    "fileName": "mobile-first-breakpoint-strategy.md",
    "title": "Mobile-First Breakpoint Architecture",
    "summary": "Designing mobile-first ensures core functionality and critical content are prioritized on constrained viewports before expanding outward.",
    "path": "references/responsive/mobile-first-breakpoint-strategy.md"
  },
  {
    "id": "responsive-touch-target-ergonomics",
    "category": "responsive",
    "categoryName": "Responsive Design & Ergonomics",
    "fileName": "touch-target-ergonomics.md",
    "title": "Mobile Touch Ergonomics & Thumb Zones",
    "summary": "Mobile interfaces must place primary actions within natural one-handed thumb reach zones while avoiding awkward top-corner stretches.",
    "path": "references/responsive/touch-target-ergonomics.md"
  },
  {
    "id": "backgrounds-aurora",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "aurora.md",
    "title": "Integrate the <Aurora /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/aurora.md"
  },
  {
    "id": "backgrounds-ballpit",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "ballpit.md",
    "title": "Integrate the <Ballpit /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/ballpit.md"
  },
  {
    "id": "backgrounds-dither",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "dither.md",
    "title": "Integrate the <Dither /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/dither.md"
  },
  {
    "id": "backgrounds-dot-grid",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "dot-grid.md",
    "title": "Integrate the <DotGrid /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/dot-grid.md"
  },
  {
    "id": "backgrounds-gradient-ascii",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "gradient-ascii.md",
    "title": "Integrate the <GradientASCII /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/gradient-ascii.md"
  },
  {
    "id": "backgrounds-hyperspeed",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "hyperspeed.md",
    "title": "Integrate the <Hyperspeed /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/hyperspeed.md"
  },
  {
    "id": "backgrounds-iridescence",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "iridescence.md",
    "title": "Integrate the <Iridescence /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/iridescence.md"
  },
  {
    "id": "backgrounds-liquid-chrome",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "liquid-chrome.md",
    "title": "Integrate the <LiquidChrome /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/liquid-chrome.md"
  },
  {
    "id": "backgrounds-particles",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "particles.md",
    "title": "Integrate the <Particles /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/particles.md"
  },
  {
    "id": "backgrounds-pattern-waves",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "pattern-waves.md",
    "title": "Integrate the <PatternWaves /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/pattern-waves.md"
  },
  {
    "id": "backgrounds-plasma",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "plasma.md",
    "title": "Integrate the <Plasma /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/plasma.md"
  },
  {
    "id": "backgrounds-prism",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "prism.md",
    "title": "Integrate the <Prism /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/prism.md"
  },
  {
    "id": "backgrounds-threads",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "threads.md",
    "title": "Integrate the <Threads /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/threads.md"
  },
  {
    "id": "backgrounds-topography",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "topography.md",
    "title": "Integrate the <Topography /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/topography.md"
  },
  {
    "id": "backgrounds-waves",
    "category": "backgrounds",
    "categoryName": "Interactive Shaders & Canvases",
    "fileName": "waves.md",
    "title": "Integrate the <Waves /> component from React Bits",
    "summary": "You are helping integrate an open-source React component into an existing application.",
    "path": "references/backgrounds/waves.md"
  },
  {
    "id": "frameworks-angular",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "angular.md",
    "title": "Angular Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/angular.md"
  },
  {
    "id": "frameworks-astro",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "astro.md",
    "title": "Astro Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/astro.md"
  },
  {
    "id": "frameworks-avalonia",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "avalonia.md",
    "title": "Avalonia Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/avalonia.md"
  },
  {
    "id": "frameworks-flutter",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "flutter.md",
    "title": "Flutter Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/flutter.md"
  },
  {
    "id": "frameworks-html-tailwind",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "html-tailwind.md",
    "title": "Html Tailwind Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/html-tailwind.md"
  },
  {
    "id": "frameworks-javafx",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "javafx.md",
    "title": "Javafx Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/javafx.md"
  },
  {
    "id": "frameworks-jetpack-compose",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "jetpack-compose.md",
    "title": "Jetpack Compose Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/jetpack-compose.md"
  },
  {
    "id": "frameworks-laravel",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "laravel.md",
    "title": "Laravel Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/laravel.md"
  },
  {
    "id": "frameworks-nextjs",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "nextjs.md",
    "title": "Nextjs Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/nextjs.md"
  },
  {
    "id": "frameworks-nuxt-ui",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "nuxt-ui.md",
    "title": "Nuxt Ui Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/nuxt-ui.md"
  },
  {
    "id": "frameworks-nuxtjs",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "nuxtjs.md",
    "title": "Nuxtjs Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/nuxtjs.md"
  },
  {
    "id": "frameworks-react-native",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "react-native.md",
    "title": "React Native Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/react-native.md"
  },
  {
    "id": "frameworks-react",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "react.md",
    "title": "React Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/react.md"
  },
  {
    "id": "frameworks-shadcn",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "shadcn.md",
    "title": "Shadcn Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/shadcn.md"
  },
  {
    "id": "frameworks-svelte",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "svelte.md",
    "title": "Svelte Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/svelte.md"
  },
  {
    "id": "frameworks-swiftui",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "swiftui.md",
    "title": "Swiftui Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/swiftui.md"
  },
  {
    "id": "frameworks-threejs",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "threejs.md",
    "title": "Threejs Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/threejs.md"
  },
  {
    "id": "frameworks-uno",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "uno.md",
    "title": "Uno Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/uno.md"
  },
  {
    "id": "frameworks-uwp",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "uwp.md",
    "title": "Uwp Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/uwp.md"
  },
  {
    "id": "frameworks-vue",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "vue.md",
    "title": "Vue Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/vue.md"
  },
  {
    "id": "frameworks-winui",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "winui.md",
    "title": "Winui Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/winui.md"
  },
  {
    "id": "frameworks-wpf",
    "category": "frameworks",
    "categoryName": "Framework Guidelines",
    "fileName": "wpf.md",
    "title": "Wpf Implementation & Design Engineering Guide",
    "summary": "This reference guide provides actionable frontend implementation patterns, anti-slop rules,",
    "path": "references/frameworks/wpf.md"
  },
  {
    "id": "hig-accessibility",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "accessibility.md",
    "title": "Accessibility",
    "summary": "Accessible user interfaces empower everyone to have a great experience with your app or game.",
    "path": "references/hig/accessibility.md"
  },
  {
    "id": "hig-action-sheets",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "action-sheets.md",
    "title": "Action sheets",
    "summary": "An action sheet is a modal view that presents choices related to an action people initiate.",
    "path": "references/hig/action-sheets.md"
  },
  {
    "id": "hig-activity-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "activity-views.md",
    "title": "Activity views",
    "summary": "An activity view — often called a *share sheet* — presents a range of tasks that people can perform in the current context.",
    "path": "references/hig/activity-views.md"
  },
  {
    "id": "hig-airplay",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "airplay.md",
    "title": "AirPlay",
    "summary": "AirPlay lets people stream media content wirelessly from iOS, iPadOS, macOS, and tvOS devices to Apple TV, HomePod, and TVs and speakers that support AirPlay.",
    "path": "references/hig/airplay.md"
  },
  {
    "id": "hig-alerts",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "alerts.md",
    "title": "Alerts",
    "summary": "An alert gives people critical information they need right away.",
    "path": "references/hig/alerts.md"
  },
  {
    "id": "hig-app-clips",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "app-clips.md",
    "title": "App Clips",
    "summary": "An App Clip is a lightweight version of your app or game that provides an on-the-go or demo experience that’s instantly available.",
    "path": "references/hig/app-clips.md"
  },
  {
    "id": "hig-app-icons",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "app-icons.md",
    "title": "App icons",
    "summary": "A unique, memorable icon expresses your app’s or game’s purpose and personality and helps people recognize it at a glance.",
    "path": "references/hig/app-icons.md"
  },
  {
    "id": "hig-app-shortcuts",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "app-shortcuts.md",
    "title": "App Shortcuts",
    "summary": "An App Shortcut gives people access to your app’s key functions or content throughout the system.",
    "path": "references/hig/app-shortcuts.md"
  },
  {
    "id": "hig-apple-in-app-purchase",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "apple-in-app-purchase.md",
    "title": "Apple In-App Purchase",
    "summary": "People can use Apple In-App Purchase to pay for digital goods and services, like premium content and subscriptions, securely within your app.",
    "path": "references/hig/apple-in-app-purchase.md"
  },
  {
    "id": "hig-apple-pay",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "apple-pay.md",
    "title": "Apple Pay",
    "summary": "Apple Pay is a secure, easy way to make payments for physical goods and services, donations, and subscriptions in apps and in any browser.",
    "path": "references/hig/apple-pay.md"
  },
  {
    "id": "hig-apple-pencil-and-scribble",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "apple-pencil-and-scribble.md",
    "title": "Apple Pencil and Scribble",
    "summary": "Apple Pencil helps make drawing, handwriting, and marking effortless and natural, in addition to performing well as a pointer and UI interaction tool.",
    "path": "references/hig/apple-pencil-and-scribble.md"
  },
  {
    "id": "hig-augmented-reality",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "augmented-reality.md",
    "title": "Augmented reality",
    "summary": "Augmented reality (or AR) lets you deliver immersive, engaging experiences that seamlessly blend virtual objects with the real world.",
    "path": "references/hig/augmented-reality.md"
  },
  {
    "id": "hig-boxes",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "boxes.md",
    "title": "Boxes",
    "summary": "A box creates a visually distinct group of logically related information and components.",
    "path": "references/hig/boxes.md"
  },
  {
    "id": "hig-branding",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "branding.md",
    "title": "Branding",
    "summary": "Apps and games express their unique brand identity in ways that make them instantly recognizable while feeling at home on the platform and giving people a consi",
    "path": "references/hig/branding.md"
  },
  {
    "id": "hig-buttons",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "buttons.md",
    "title": "Buttons",
    "summary": "A button initiates an instantaneous action.",
    "path": "references/hig/buttons.md"
  },
  {
    "id": "hig-charting-data",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "charting-data.md",
    "title": "Charting data",
    "summary": "Presenting data in a chart can help you communicate information with clarity and appeal.",
    "path": "references/hig/charting-data.md"
  },
  {
    "id": "hig-charts",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "charts.md",
    "title": "Charts",
    "summary": "Organize data in a chart to communicate information with clarity and visual appeal.",
    "path": "references/hig/charts.md"
  },
  {
    "id": "hig-collaboration-and-sharing",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "collaboration-and-sharing.md",
    "title": "Collaboration and sharing",
    "summary": "Great collaboration and sharing experiences are simple and responsive, letting people engage with the content while communicating effectively with others.",
    "path": "references/hig/collaboration-and-sharing.md"
  },
  {
    "id": "hig-collections",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "collections.md",
    "title": "Collections",
    "summary": "A collection manages an ordered set of content and presents it in a customizable and highly visual layout.",
    "path": "references/hig/collections.md"
  },
  {
    "id": "hig-color-wells",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "color-wells.md",
    "title": "Color wells",
    "summary": "A color well lets people adjust the color of text, shapes, guides, and other onscreen elements.",
    "path": "references/hig/color-wells.md"
  },
  {
    "id": "hig-color",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "color.md",
    "title": "Color",
    "summary": "Judicious use of color can enhance communication, evoke your brand, provide visual continuity, communicate status and feedback, and help people understand infor",
    "path": "references/hig/color.md"
  },
  {
    "id": "hig-column-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "column-views.md",
    "title": "Column views",
    "summary": "A column view — also called a *browser* — lets people view and navigate a data hierarchy using a series of vertical columns.",
    "path": "references/hig/column-views.md"
  },
  {
    "id": "hig-combo-boxes",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "combo-boxes.md",
    "title": "Combo boxes",
    "summary": "A combo box combines a text field with a pull-down button in a single control.",
    "path": "references/hig/combo-boxes.md"
  },
  {
    "id": "hig-context-menus",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "context-menus.md",
    "title": "Context menus",
    "summary": "A context menu provides access to functionality that’s directly related to an item, without cluttering the interface.",
    "path": "references/hig/context-menus.md"
  },
  {
    "id": "hig-controls",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "controls.md",
    "title": "Controls",
    "summary": "A control provides quick access to a feature of your app from Control Center, the Lock Screen, or the Action button.",
    "path": "references/hig/controls.md"
  },
  {
    "id": "hig-dark-mode",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "dark-mode.md",
    "title": "Dark Mode",
    "summary": "Dark Mode is a systemwide appearance setting that uses a dark color palette to provide a comfortable viewing experience tailored for low-light environments.",
    "path": "references/hig/dark-mode.md"
  },
  {
    "id": "hig-design-principles",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "design-principles.md",
    "title": "Design principles",
    "summary": "Explore fundamental principles that guide design across Apple platforms.",
    "path": "references/hig/design-principles.md"
  },
  {
    "id": "hig-designing-for-games",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "designing-for-games.md",
    "title": "Designing for games",
    "summary": "When people play your game on an Apple device, they dive into the world you designed while relying on the platform features they love.",
    "path": "references/hig/designing-for-games.md"
  },
  {
    "id": "hig-designing-for-ios",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "designing-for-ios.md",
    "title": "Designing for iOS",
    "summary": "People depend on their iPhone to help them stay connected, play games, view media, accomplish tasks, and track personal data in any location and while on the go",
    "path": "references/hig/designing-for-ios.md"
  },
  {
    "id": "hig-designing-for-ipados",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "designing-for-ipados.md",
    "title": "Designing for iPadOS",
    "summary": "People value the power, mobility, and flexibility of iPad as they enjoy media, play games, perform detailed productivity tasks, and bring their creations to lif",
    "path": "references/hig/designing-for-ipados.md"
  },
  {
    "id": "hig-designing-for-iphone-duo",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "designing-for-iphone-duo.md",
    "title": "Designing for iPhone Duo",
    "summary": "An app designed for iPhone Duo adapts seamlessly to both displays, providing a continuous experience as the device opens and closes.",
    "path": "references/hig/designing-for-iphone-duo.md"
  },
  {
    "id": "hig-designing-for-macos",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "designing-for-macos.md",
    "title": "Designing for macOS",
    "summary": "People rely on the power, spaciousness, and flexibility of a Mac as they perform in-depth productivity tasks, view media or content, and play games, often using",
    "path": "references/hig/designing-for-macos.md"
  },
  {
    "id": "hig-disclosure-controls",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "disclosure-controls.md",
    "title": "Disclosure controls",
    "summary": "Disclosure controls reveal and hide information and functionality related to specific controls or views.",
    "path": "references/hig/disclosure-controls.md"
  },
  {
    "id": "hig-dock-menus",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "dock-menus.md",
    "title": "Dock menus",
    "summary": "On a Mac, people can secondary click an app’s or game’s icon in the Dock to reveal a Dock menu, which presents both system-provided and custom items.",
    "path": "references/hig/dock-menus.md"
  },
  {
    "id": "hig-drag-and-drop",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "drag-and-drop.md",
    "title": "Drag and drop",
    "summary": "Using drag and drop, people can move or duplicate selected photos, text, and other content by dragging the selection from one location to another.",
    "path": "references/hig/drag-and-drop.md"
  },
  {
    "id": "hig-edit-menus",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "edit-menus.md",
    "title": "Edit menus",
    "summary": "An edit menu lets people make changes to selected content in the current view, in addition to offering related commands like Copy, Select, Translate, and Look U",
    "path": "references/hig/edit-menus.md"
  },
  {
    "id": "hig-entering-data",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "entering-data.md",
    "title": "Entering data",
    "summary": "When you need information from people, design ways that make it easy for them to provide it without making mistakes.",
    "path": "references/hig/entering-data.md"
  },
  {
    "id": "hig-feedback",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "feedback.md",
    "title": "Feedback",
    "summary": "Feedback helps people know what’s happening, discover what they can do next, understand the results of actions, and avoid mistakes.",
    "path": "references/hig/feedback.md"
  },
  {
    "id": "hig-file-management",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "file-management.md",
    "title": "File management",
    "summary": "Some apps can support documents and files that people expect to manage throughout the system.",
    "path": "references/hig/file-management.md"
  },
  {
    "id": "hig-focus-and-selection",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "focus-and-selection.md",
    "title": "Focus and selection",
    "summary": "Focus helps people visually confirm the object that their interaction targets.",
    "path": "references/hig/focus-and-selection.md"
  },
  {
    "id": "hig-game-controls",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "game-controls.md",
    "title": "Game controls",
    "summary": "Precise, intuitive game controls enhance gameplay and can increase a player’s immersion in the game.",
    "path": "references/hig/game-controls.md"
  },
  {
    "id": "hig-gauges",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "gauges.md",
    "title": "Gauges",
    "summary": "A gauge displays a specific numerical value within a range of values.",
    "path": "references/hig/gauges.md"
  },
  {
    "id": "hig-generative-ai",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "generative-ai.md",
    "title": "Generative AI",
    "summary": "Generative AI empowers you to enhance your app or game with dynamic content and offer intelligent features that unlock new levels of creativity, connection, and",
    "path": "references/hig/generative-ai.md"
  },
  {
    "id": "hig-gestures",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "gestures.md",
    "title": "Gestures",
    "summary": "A gesture is a physical motion that a person uses to directly affect an object in an app or game on their device.",
    "path": "references/hig/gestures.md"
  },
  {
    "id": "hig-going-full-screen",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "going-full-screen.md",
    "title": "Going full screen",
    "summary": "iPhone, iPad, and Mac offer full-screen modes that let people expand a window to fill the screen, hiding system controls and providing a distraction-free enviro",
    "path": "references/hig/going-full-screen.md"
  },
  {
    "id": "hig-gyro-and-accelerometer",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "gyro-and-accelerometer.md",
    "title": "Gyroscope and accelerometer",
    "summary": "On-device gyroscopes and accelerometers can supply data about a device’s movement in the physical world.",
    "path": "references/hig/gyro-and-accelerometer.md"
  },
  {
    "id": "hig-home-screen-quick-actions",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "home-screen-quick-actions.md",
    "title": "Home Screen quick actions",
    "summary": "Home Screen quick actions give people a way to perform app-specific actions from the Home Screen.",
    "path": "references/hig/home-screen-quick-actions.md"
  },
  {
    "id": "hig-icloud",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "icloud.md",
    "title": "iCloud",
    "summary": "iCloud is a service that lets people seamlessly access the content they care about — photos, videos, documents, and more — from any device, without performing e",
    "path": "references/hig/icloud.md"
  },
  {
    "id": "hig-icons",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "icons.md",
    "title": "Icons",
    "summary": "An effective icon is a graphic asset that expresses a single concept in ways people instantly understand.",
    "path": "references/hig/icons.md"
  },
  {
    "id": "hig-image-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "image-views.md",
    "title": "Image views",
    "summary": "An image view displays a single image — or in some cases, an animated sequence of images — on a transparent or opaque background.",
    "path": "references/hig/image-views.md"
  },
  {
    "id": "hig-image-wells",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "image-wells.md",
    "title": "Image wells",
    "summary": "An image well is an editable version of an image view.",
    "path": "references/hig/image-wells.md"
  },
  {
    "id": "hig-images",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "images.md",
    "title": "Images",
    "summary": "To make sure your artwork looks great on all devices you support, learn how the system displays content and how to deliver art at the appropriate scale factors.",
    "path": "references/hig/images.md"
  },
  {
    "id": "hig-inclusion",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "inclusion.md",
    "title": "Inclusion",
    "summary": "Inclusive apps and games put people first by prioritizing respectful communication and presenting content and functionality in ways that everyone can access and",
    "path": "references/hig/inclusion.md"
  },
  {
    "id": "hig-keyboards",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "keyboards.md",
    "title": "Keyboards",
    "summary": "A physical keyboard can be an essential input device for entering text, playing games, controlling apps, and more.",
    "path": "references/hig/keyboards.md"
  },
  {
    "id": "hig-labels",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "labels.md",
    "title": "Labels",
    "summary": "A label is a static piece of text that people can read and often copy, but not edit.",
    "path": "references/hig/labels.md"
  },
  {
    "id": "hig-launching",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "launching.md",
    "title": "Launching",
    "summary": "A streamlined launch experience helps people start using your app or game immediately.",
    "path": "references/hig/launching.md"
  },
  {
    "id": "hig-layout",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "layout.md",
    "title": "Layout",
    "summary": "A consistent layout that adapts across display sizes, orientations, and multitasking configurations helps people understand and enjoy your app or game on all th",
    "path": "references/hig/layout.md"
  },
  {
    "id": "hig-liquid-glass",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "liquid-glass.md",
    "title": "Liquid Glass",
    "summary": "Liquid Glass is the dynamic, translucent material Apple introduced in 2025 for the layer of controls and navigation that floats above an app's content. Use this",
    "path": "references/hig/liquid-glass.md"
  },
  {
    "id": "hig-lists-and-tables",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "lists-and-tables.md",
    "title": "Lists and tables",
    "summary": "Lists and tables present data in one or more columns of rows.",
    "path": "references/hig/lists-and-tables.md"
  },
  {
    "id": "hig-live-activities",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "live-activities.md",
    "title": "Live Activities",
    "summary": "A Live Activity lets people track the progress of an activity, event, or task at a glance.",
    "path": "references/hig/live-activities.md"
  },
  {
    "id": "hig-live-viewing-apps",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "live-viewing-apps.md",
    "title": "Live-viewing apps",
    "summary": "As you design a live-viewing app, prioritize the content and create fun, fluid interactions that encourage immersion in the live-viewing experience.",
    "path": "references/hig/live-viewing-apps.md"
  },
  {
    "id": "hig-loading",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "loading.md",
    "title": "Loading",
    "summary": "The best content-loading experience finishes before people become aware of it.",
    "path": "references/hig/loading.md"
  },
  {
    "id": "hig-machine-learning",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "machine-learning.md",
    "title": "Machine learning",
    "summary": "Machine learning enables apps and games to learn from data and usage patterns, letting you improve existing experiences and create engaging new ones.",
    "path": "references/hig/machine-learning.md"
  },
  {
    "id": "hig-managing-accounts",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "managing-accounts.md",
    "title": "Managing accounts",
    "summary": "When it doesn’t create an unnecessary barrier to your experience, an account can be a convenient way for people to access their content and track personal detai",
    "path": "references/hig/managing-accounts.md"
  },
  {
    "id": "hig-managing-notifications",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "managing-notifications.md",
    "title": "Managing notifications",
    "summary": "Notifications can give people timely and important information, whether the device is locked or in use.",
    "path": "references/hig/managing-notifications.md"
  },
  {
    "id": "hig-maps",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "maps.md",
    "title": "Maps",
    "summary": "A map displays outdoor or indoor geographical data in your app or on your website.",
    "path": "references/hig/maps.md"
  },
  {
    "id": "hig-materials",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "materials.md",
    "title": "Materials",
    "summary": "A material is a visual effect that creates a sense of depth, layering, and hierarchy between foreground and background elements.",
    "path": "references/hig/materials.md"
  },
  {
    "id": "hig-menus",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "menus.md",
    "title": "Menus",
    "summary": "A menu reveals its options when people interact with it, making it a space-efficient way to present commands in your app or game.",
    "path": "references/hig/menus.md"
  },
  {
    "id": "hig-modality",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "modality.md",
    "title": "Modality",
    "summary": "Modality is a design technique that presents content in a separate, dedicated mode that prevents interaction with the parent view and requires an explicit actio",
    "path": "references/hig/modality.md"
  },
  {
    "id": "hig-motion",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "motion.md",
    "title": "Motion",
    "summary": "Beautiful, fluid motions bring the interface to life, conveying status, providing feedback and instruction, and enriching the visual experience of your app or g",
    "path": "references/hig/motion.md"
  },
  {
    "id": "hig-multitasking",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "multitasking.md",
    "title": "Multitasking",
    "summary": "Multitasking lets people switch quickly from one app to another, performing tasks in each.",
    "path": "references/hig/multitasking.md"
  },
  {
    "id": "hig-nfc",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "nfc.md",
    "title": "NFC",
    "summary": "Near-field communication (NFC) allows devices within a few centimeters of each other to exchange information wirelessly.",
    "path": "references/hig/nfc.md"
  },
  {
    "id": "hig-notifications",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "notifications.md",
    "title": "Notifications",
    "summary": "A notification gives people timely, high-value information they can understand at a glance.",
    "path": "references/hig/notifications.md"
  },
  {
    "id": "hig-offering-help",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "offering-help.md",
    "title": "Offering help",
    "summary": "Although the most effective experiences are approachable and intuitive, you can provide contextual help when necessary.",
    "path": "references/hig/offering-help.md"
  },
  {
    "id": "hig-onboarding",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "onboarding.md",
    "title": "Onboarding",
    "summary": "Onboarding can help people get a quick start using your app or game.",
    "path": "references/hig/onboarding.md"
  },
  {
    "id": "hig-outline-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "outline-views.md",
    "title": "Outline views",
    "summary": "An outline view presents hierarchical data in a scrolling list of cells that are organized into columns and rows.",
    "path": "references/hig/outline-views.md"
  },
  {
    "id": "hig-page-controls",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "page-controls.md",
    "title": "Page controls",
    "summary": "A page control displays a row of indicator images, each of which represents a page in a flat list.",
    "path": "references/hig/page-controls.md"
  },
  {
    "id": "hig-panels",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "panels.md",
    "title": "Panels",
    "summary": "In a macOS app, a panel typically floats above other open windows providing supplementary controls, options, or information related to the active window or curr",
    "path": "references/hig/panels.md"
  },
  {
    "id": "hig-path-controls",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "path-controls.md",
    "title": "Path controls",
    "summary": "A path control shows the file system path of a selected file or folder.",
    "path": "references/hig/path-controls.md"
  },
  {
    "id": "hig-pickers",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "pickers.md",
    "title": "Pickers",
    "summary": "A picker displays one or more scrollable lists of distinct values that people can choose from.",
    "path": "references/hig/pickers.md"
  },
  {
    "id": "hig-playing-audio",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "playing-audio.md",
    "title": "Playing audio",
    "summary": "People expect rich audio experiences that automatically adjust when the context changes on the device.",
    "path": "references/hig/playing-audio.md"
  },
  {
    "id": "hig-playing-haptics",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "playing-haptics.md",
    "title": "Playing haptics",
    "summary": "Playing haptics can engage people’s sense of touch and bring their familiarity with the physical world into your app or game.",
    "path": "references/hig/playing-haptics.md"
  },
  {
    "id": "hig-playing-video",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "playing-video.md",
    "title": "Playing video",
    "summary": "People expect to enjoy rich video experiences on their devices, regardless of the app or game they’re using.",
    "path": "references/hig/playing-video.md"
  },
  {
    "id": "hig-pointing-devices",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "pointing-devices.md",
    "title": "Pointing devices",
    "summary": "People can use a pointing device like a trackpad or mouse to navigate the interface and initiate actions.",
    "path": "references/hig/pointing-devices.md"
  },
  {
    "id": "hig-pop-up-buttons",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "pop-up-buttons.md",
    "title": "Pop-up buttons",
    "summary": "A pop-up button displays a menu of mutually exclusive options.",
    "path": "references/hig/pop-up-buttons.md"
  },
  {
    "id": "hig-popovers",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "popovers.md",
    "title": "Popovers",
    "summary": "A popover is a transient view that appears above other content when people click or tap a control or interactive area.",
    "path": "references/hig/popovers.md"
  },
  {
    "id": "hig-printing",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "printing.md",
    "title": "Printing",
    "summary": "An iOS, iPadOS, macOS, or visionOS app can integrate system-provided print functionality when it makes sense, presenting custom printer- and document-specific o",
    "path": "references/hig/printing.md"
  },
  {
    "id": "hig-privacy",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "privacy.md",
    "title": "Privacy",
    "summary": "Privacy is paramount: it’s critical to be transparent about the privacy-related data and resources you require and essential to protect the data people allow yo",
    "path": "references/hig/privacy.md"
  },
  {
    "id": "hig-progress-indicators",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "progress-indicators.md",
    "title": "Progress indicators",
    "summary": "Progress indicators let people know that your app isn’t stalled while it loads content or performs lengthy operations.",
    "path": "references/hig/progress-indicators.md"
  },
  {
    "id": "hig-pull-down-buttons",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "pull-down-buttons.md",
    "title": "Pull-down buttons",
    "summary": "A pull-down button displays a menu of items or actions that directly relate to the button’s purpose.",
    "path": "references/hig/pull-down-buttons.md"
  },
  {
    "id": "hig-rating-indicators",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "rating-indicators.md",
    "title": "Rating indicators",
    "summary": "A rating indicator uses a series of horizontally arranged graphical symbols — by default, stars — to communicate a ranking level.",
    "path": "references/hig/rating-indicators.md"
  },
  {
    "id": "hig-ratings-and-reviews",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "ratings-and-reviews.md",
    "title": "Ratings and reviews",
    "summary": "People often view the ratings and reviews for an app or game before they download it.",
    "path": "references/hig/ratings-and-reviews.md"
  },
  {
    "id": "hig-right-to-left",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "right-to-left.md",
    "title": "Right to left",
    "summary": "Support right-to-left languages like Arabic and Hebrew by reversing your interface as needed to match the reading direction of the related scripts.",
    "path": "references/hig/right-to-left.md"
  },
  {
    "id": "hig-scroll-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "scroll-views.md",
    "title": "Scroll views",
    "summary": "A scroll view lets people view content that’s larger than the view’s boundaries by moving the content vertically or horizontally.",
    "path": "references/hig/scroll-views.md"
  },
  {
    "id": "hig-search-fields",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "search-fields.md",
    "title": "Search fields",
    "summary": "A search field lets people search a collection of content for specific terms they enter.",
    "path": "references/hig/search-fields.md"
  },
  {
    "id": "hig-searching",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "searching.md",
    "title": "Searching",
    "summary": "People use various search techniques to find content on their device, within an app, and within a document or file.",
    "path": "references/hig/searching.md"
  },
  {
    "id": "hig-segmented-controls",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "segmented-controls.md",
    "title": "Segmented controls",
    "summary": "A segmented control is a linear set of two or more segments, each of which functions as a button.",
    "path": "references/hig/segmented-controls.md"
  },
  {
    "id": "hig-settings",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "settings.md",
    "title": "Settings",
    "summary": "People expect apps and games to just work, but they also appreciate having ways to customize the experience to fit their needs.",
    "path": "references/hig/settings.md"
  },
  {
    "id": "hig-sf-symbols",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "sf-symbols.md",
    "title": "SF Symbols",
    "summary": "SF Symbols provides thousands of consistent, highly configurable symbols that integrate seamlessly with the San Francisco system font, automatically aligning wi",
    "path": "references/hig/sf-symbols.md"
  },
  {
    "id": "hig-sheets",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "sheets.md",
    "title": "Sheets",
    "summary": "A sheet helps people perform a scoped task that’s closely related to their current context.",
    "path": "references/hig/sheets.md"
  },
  {
    "id": "hig-sidebars",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "sidebars.md",
    "title": "Sidebars",
    "summary": "A sidebar appears on the leading side of a view and lets people navigate between areas of your app or top-level collections of content, like folders and playlis",
    "path": "references/hig/sidebars.md"
  },
  {
    "id": "hig-sign-in-with-apple",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "sign-in-with-apple.md",
    "title": "Sign in with Apple",
    "summary": "Sign in with Apple provides a fast, private way to sign into apps and websites, giving people a consistent experience they can trust and the convenience of not ",
    "path": "references/hig/sign-in-with-apple.md"
  },
  {
    "id": "hig-siri",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "siri.md",
    "title": "Siri",
    "summary": "People use Siri to help them with the things they need to find, know, or do every day.",
    "path": "references/hig/siri.md"
  },
  {
    "id": "hig-sliders",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "sliders.md",
    "title": "Sliders",
    "summary": "A slider is a horizontal track with a control, called a thumb, that people can adjust between a minimum and maximum value.",
    "path": "references/hig/sliders.md"
  },
  {
    "id": "hig-snippets",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "snippets.md",
    "title": "Snippets",
    "summary": "When someone performs a task with Siri or an App Shortcut, a snippet shows the result or asks for confirmation.",
    "path": "references/hig/snippets.md"
  },
  {
    "id": "hig-split-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "split-views.md",
    "title": "Split views",
    "summary": "A split view manages the presentation of multiple adjacent panes of content, each of which can contain a variety of components, including tables, collections, i",
    "path": "references/hig/split-views.md"
  },
  {
    "id": "hig-status-bars",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "status-bars.md",
    "title": "Status bars",
    "summary": "A status bar appears along the upper edge of the screen and displays information about the device’s current state, like the time, cellular carrier, and battery ",
    "path": "references/hig/status-bars.md"
  },
  {
    "id": "hig-steppers",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "steppers.md",
    "title": "Steppers",
    "summary": "A stepper is a two-segment control that people use to increase or decrease an incremental value.",
    "path": "references/hig/steppers.md"
  },
  {
    "id": "hig-tab-bars",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "tab-bars.md",
    "title": "Tab bars",
    "summary": "A tab bar lets people navigate between top-level sections of your app.",
    "path": "references/hig/tab-bars.md"
  },
  {
    "id": "hig-tab-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "tab-views.md",
    "title": "Tab views",
    "summary": "A tab view presents multiple mutually exclusive panes of content in the same area, which people can switch between using a tabbed control.",
    "path": "references/hig/tab-views.md"
  },
  {
    "id": "hig-text-fields",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "text-fields.md",
    "title": "Text fields",
    "summary": "A text field is a rectangular area in which people enter or edit small, specific pieces of text.",
    "path": "references/hig/text-fields.md"
  },
  {
    "id": "hig-text-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "text-views.md",
    "title": "Text views",
    "summary": "A text view displays multiline, styled text content, which can optionally be editable.",
    "path": "references/hig/text-views.md"
  },
  {
    "id": "hig-the-menu-bar",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "the-menu-bar.md",
    "title": "The menu bar",
    "summary": "On a Mac or an iPad, the menu bar at the top of the screen displays the top-level menus in your app or game.",
    "path": "references/hig/the-menu-bar.md"
  },
  {
    "id": "hig-toggles",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "toggles.md",
    "title": "Toggles",
    "summary": "A toggle lets people choose between a pair of opposing states, like on and off, using a different appearance to indicate each state.",
    "path": "references/hig/toggles.md"
  },
  {
    "id": "hig-token-fields",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "token-fields.md",
    "title": "Token fields",
    "summary": "A token field is a type of text field that can convert text into *tokens* that are easy to select and manipulate.",
    "path": "references/hig/token-fields.md"
  },
  {
    "id": "hig-toolbars",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "toolbars.md",
    "title": "Toolbars",
    "summary": "A toolbar provides convenient access to frequently used commands, controls, navigation, and search.",
    "path": "references/hig/toolbars.md"
  },
  {
    "id": "hig-typography",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "typography.md",
    "title": "Typography",
    "summary": "Your typographic choices can help you display legible text, convey an information hierarchy, communicate important content, and express your brand or style.",
    "path": "references/hig/typography.md"
  },
  {
    "id": "hig-undo-and-redo",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "undo-and-redo.md",
    "title": "Undo and redo",
    "summary": "Undo and redo gives people easy ways to reverse many types of actions, which can also help people explore and experiment safely as they learn a new interface or",
    "path": "references/hig/undo-and-redo.md"
  },
  {
    "id": "hig-virtual-keyboards",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "virtual-keyboards.md",
    "title": "Virtual keyboards",
    "summary": "On devices without physical keyboards, the system offers various types of virtual keyboards people can use to enter data.",
    "path": "references/hig/virtual-keyboards.md"
  },
  {
    "id": "hig-voiceover",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "voiceover.md",
    "title": "VoiceOver",
    "summary": "VoiceOver is a screen reader that lets people experience your app’s interface without needing to see the screen.",
    "path": "references/hig/voiceover.md"
  },
  {
    "id": "hig-web-views",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "web-views.md",
    "title": "Web views",
    "summary": "A web view loads and displays rich web content, such as embedded HTML and websites, directly within your app.",
    "path": "references/hig/web-views.md"
  },
  {
    "id": "hig-widgets",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "widgets.md",
    "title": "Widgets",
    "summary": "A widget provides quick access to essential information and focused interactions from your app or game in additional contexts.",
    "path": "references/hig/widgets.md"
  },
  {
    "id": "hig-windows",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "windows.md",
    "title": "Windows",
    "summary": "A window presents UI views and components in your app or game.",
    "path": "references/hig/windows.md"
  },
  {
    "id": "hig-writing",
    "category": "hig",
    "categoryName": "Apple Human Interface Guidelines",
    "fileName": "writing.md",
    "title": "Writing",
    "summary": "The words you choose within your app are an essential part of its user experience.",
    "path": "references/hig/writing.md"
  }
];

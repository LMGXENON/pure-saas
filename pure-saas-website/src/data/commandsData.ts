export interface CommandSpec {
  id: string;
  name: string;
  syntax: string;
  tagline: string;
  purpose: string;
  whenToUse: string;
  difference: string;
  arguments: string[];
  prerequisites: string[];
  exampleRequest: string;
  expectedOutput: string;
  commonMistakes: string[];
  references: { title: string; path: string }[];
}

export const commandsData: CommandSpec[] = [
  {
    id: 'universal',
    name: '/pure-saas',
    syntax: '/pure-saas [any request]',
    tagline: 'Autonomous end-to-end design, implementation, and quality enforcement',
    purpose: 'The universal entry point for Pure SaaS. It inspects repository context, establishes or updates DESIGN.md, executes frontend code, binds styles to semantic tokens, integrates physics-based motion, enforces WCAG 2.2 AA accessibility, fixes bugs while preserving backend APIs, and reports verification honestly.',
    whenToUse: 'Use for all general UI/UX tasks: building new pages, creating complex components, refactoring legacy screens, or implementing end-to-end user flows.',
    difference: 'Unlike specialist commands that focus strictly on one phase (like design-only or review-only), the universal command coordinates all 6 workflows autonomously from brief to verified code.',
    arguments: [
      '[request]: Natural language description of the interface, component, or refactor to build.'
    ],
    prerequisites: [
      'Accessible codebase workspace.',
      'Existing framework setup (React, Vue, Svelte, Next.js, or HTML/Tailwind) or clean starter directory.'
    ],
    exampleRequest: '/pure-saas Build an analytics overview page with 4 KPI summary cards, a date-range filter, and a responsive active deployments table.',
    expectedOutput: '1. Established or updated DESIGN.md with semantic tokens\n2. Implementation of modular components with 8 interaction states\n3. Responsive layout tested at 1440px, 768px, and 375px\n4. Zero raw hex codes or arbitrary Tailwind brackets\n5. Honest verification report distinguishing tested, failed, and untested elements.',
    commonMistakes: [
      'Providing vague single-word requests without target audience or domain context.',
      'Allowing agents to skip establishing DESIGN.md before writing JSX.',
      'Allowing agents to fabricate test IDs or rewrite existing backend API routes.'
    ],
    references: [
      { title: 'Pure SaaS Master Reference Index', path: 'references/reference-index.md' },
      { title: 'SaaS Dashboard Shell & Grid Layout', path: 'references/layouts/saas-dashboard.md' },
      { title: 'Analytics & KPI Dashboard Grid', path: 'references/layouts/analytics-board.md' },
      { title: 'Data Table & Virtualized List Guidelines', path: 'references/components/data-table.md' }
    ]
  },
  {
    id: 'design',
    name: '/pure-saas design',
    syntax: '/pure-saas design [request]',
    tagline: 'Establish or update DESIGN.md design specification before coding',
    purpose: 'Creates or refines the root-level DESIGN.md specification without modifying source code files. Establishes the 3-tier token hierarchy, typographic scale formulas, 8pt spatial grid, color palette with light/dark parity, component contracts, and unresolved decisions ledger.',
    whenToUse: 'Use before starting large features, when rebranding an application, or when unifying disparate styles across a multi-team repository.',
    difference: 'Purely architectural: produces the formal DESIGN.md specification and design-brief.md without generating JSX or touching frontend components.',
    arguments: [
      '[request]: Product archetype, desired visual style dial values (variance 1-10, motion 1-10, density 1-10), and brand constraints.'
    ],
    prerequisites: [
      'Project workspace where DESIGN.md can be authored or updated.'
    ],
    exampleRequest: '/pure-saas design Establish design tokens for an enterprise developer cloud console with high information density and dark mode default.',
    expectedOutput: 'Root DESIGN.md containing:\n- Complete semantic color token palette with OKLCH lightness values\n- Fluid typography scale clamp formulas\n- 8pt spatial grid and hairline border definitions\n- Documented unresolved design decisions list.',
    commonMistakes: [
      'Attempting to write production application code during a design command invocation.',
      'Creating tokens without checking mathematical 4.5:1 WCAG contrast ratios.'
    ],
    references: [
      { title: 'Design Tokens Architecture & 3-Tier Hierarchy', path: 'references/design-systems/design-tokens-architecture.md' },
      { title: 'Color Palette Construction & Perceptual Lightness Scales', path: 'references/design-systems/color-palette-construction.md' },
      { title: 'Fluid Typography Scale & Optical Tracking', path: 'references/design-systems/typography-scale-hierarchy.md' }
    ]
  },
  {
    name: '/pure-saas polish',
    id: 'polish',
    syntax: '/pure-saas polish [request]',
    tagline: 'Elevate visual craft, surface lighting, and micro-interactions',
    purpose: 'Refines an existing working interface to hardware-grade visual excellence without altering backend contracts, state management, or component APIs. Focuses on optical tracking, hairline borders, multi-stop shadow bloom, and spring physics.',
    whenToUse: 'Use on functional interfaces that feel flat, clunky, or generic, or to add Apple-level tactile responsiveness.',
    difference: 'Preserves 100% of underlying application logic and DOM structure; modifies only presentation, spacing, typography tracking, and motion curves.',
    arguments: [
      '[request]: Target component or page to polish, or specific craft focus (e.g., "elevate card lighting and button tap physics").'
    ],
    prerequisites: [
      'Functional frontend code with passing tests or working build.'
    ],
    exampleRequest: '/pure-saas polish Elevate the pricing tier cards with subtle translucent materials, hairline borders, and snappy spring press micro-interactions.',
    expectedOutput: '1. Razor-sharp 1px hairline borders\n2. Spring curves (cubic-bezier(0.16, 1, 0.3, 1)) on button active presses\n3. Optical alignment of asymmetric icons and cap-height text\n4. Verified zero regression on existing automated tests.',
    commonMistakes: [
      'Rewriting state management or data fetching during a polish pass.',
      'Adding loud, gratuitous animations that increase task completion time.'
    ],
    references: [
      { title: 'Apple-Inspired Visual Polish & Hardware-Grade Craft', path: 'references/visual-craft/apple-visual-polish.md' },
      { title: 'Materials, Vibrancy & Acrylic Backdrop Blur', path: 'references/visual-craft/materials-vibrancy-blur.md' },
      { title: 'Fluid Spring Physics & Animation Curves', path: 'references/visual-craft/fluid-spring-physics.md' }
    ]
  },
  {
    name: '/pure-saas review',
    id: 'review',
    syntax: '/pure-saas review [request or scope]',
    tagline: 'Evidence-based quality audit across bugs, security, a11y, and tokens',
    purpose: 'Conducts a forensic, evidence-based quality inspection of code and design files. Identifies concrete defects across accessibility (WCAG 2.2 AA), styling tokens, anti-slop rules, performance vitals, and keyboard trapping. Does not edit files by default.',
    whenToUse: 'Use before opening pull requests, during design handoff QA, or to audit legacy pages for AI slop and hardcoded hex values.',
    difference: 'Strictly analytical and read-only. Produces a 4-part structured finding report (Finding, Evidence with file:line, Impact severity, Concrete Fix).',
    arguments: [
      '[request or scope]: Optional directory (e.g., "src/components") or specific feature branch to audit.'
    ],
    prerequisites: [
      'Accessible source repository and DESIGN.md specification.'
    ],
    exampleRequest: '/pure-saas review Audit src/components/billing for token compliance and WCAG 2.2 AA accessibility.',
    expectedOutput: 'Structured Markdown Review Report containing:\n- Severity breakdown (Critical, Warning, Info)\n- Exact file:line evidence for each finding\n- Contrast ratios measured mathematically\n- Concrete code replacement diffs.',
    commonMistakes: [
      'Modifying codebase files without explicit user approval.',
      'Reporting vague subjective opinions without file:line evidence.',
      'Claiming accessibility passed without performing DOM or contrast inspection.'
    ],
    references: [
      { title: 'Pure SaaS Anti-Slop Design Rules', path: 'references/anti-slop-rules.md' },
      { title: 'WCAG 2.2 AA Conformance Matrix', path: 'references/accessibility/wcag-22-conformance-matrix.md' },
      { title: 'Static Code Inspection Search Patterns', path: 'references/code-audit.md' }
    ]
  },
  {
    name: '/pure-saas reference',
    id: 'reference',
    syntax: '/pure-saas reference [URL]',
    tagline: 'Reverse-engineer visual reference sites into a 16-section DESIGN.md',
    purpose: 'Deconstructs a live reference website via browser DevTools. Discovers linked pages, extracts computed typography and spacing scales, maps color palettes, inspects motion dynamics, captures matching viewports (1440px, 768px, 375px), and authors a 16-section DESIGN.md.',
    whenToUse: 'Use when the user provides an external URL as an inspiration reference or requests recreating a design language.',
    difference: 'Enforces the mandatory 11-item completion gate and side-by-side visual difference verification before claiming completion.',
    arguments: [
      '[URL]: Fully-qualified HTTP/HTTPS address of the target reference website.'
    ],
    prerequisites: [
      'Publicly accessible URL (or local localhost URL).',
      'Browser runtime or DevTools capabilities.'
    ],
    exampleRequest: '/pure-saas reference https://linear.app',
    expectedOutput: '1. Multi-page navigation mapping\n2. Computed style extraction (exact fonts, line-heights, tracking, colors)\n3. Reconstructed 16-section DESIGN.md\n4. Verified implementation matching original responsive breakpoints.',
    commonMistakes: [
      'Relying on a single desktop screenshot instead of inspecting responsive behavior.',
      'Guessing colors from compressed images rather than extracting computed CSS variables.',
      'Failing the 11-item completion gate by omitting motion reveals.'
    ],
    references: [
      { title: 'Live Website DOM & DevTools Reverse Engineering', path: 'references/design-analysis/dom-devtools-extraction.md' },
      { title: 'Screenshot Reference Deconstruction', path: 'references/design-analysis/screenshot-reference-analysis.md' },
      { title: 'Visual Drift Comparison & 11-Item Quality Gates', path: 'references/design-analysis/visual-drift-comparison-gates.md' }
    ]
  },
  {
    name: '/pure-saas responsive',
    id: 'responsive',
    syntax: '/pure-saas responsive [request]',
    tagline: 'Optimize layouts across mobile (375px), tablet (768px), and desktop (1440px+)',
    purpose: 'Diagnoses and fixes cross-device layout failures. Enforces mobile-first CSS architecture, 44x44px minimum touch targets, fluid typography clamp formulas, adaptive navigation transitions, and zero horizontal overflow down to 320px.',
    whenToUse: 'Use when existing desktop views break on mobile screens, touch targets are cramped, or tables overflow uncontrollably.',
    difference: 'Specializes in viewport constraints, container queries, touch ergonomics, and virtual keyboard adaptations while preserving desktop fidelity.',
    arguments: [
      '[request]: Page or layout area needing responsive optimization (e.g. "optimize the data table and side navigation for mobile").'
    ],
    prerequisites: [
      'Working desktop implementation.'
    ],
    exampleRequest: '/pure-saas responsive Make the customer order history table and filter sidebar fully responsive down to 375px with swipe gestures.',
    expectedOutput: '1. Fluid typography and spacing using CSS clamp()\n2. Responsive drawer or bottom sheet for filter controls on mobile\n3. Tabindex=0 accessible horizontal scroll container on wide tables\n4. Verified zero horizontal scrollbar on 375px viewports.',
    commonMistakes: [
      'Hiding essential functionality on mobile instead of providing an adaptive layout.',
      'Using desktop hover states for critical interactive menus on touch devices.',
      'Disabling viewport zoom with maximum-scale=1.0.'
    ],
    references: [
      { title: 'Mobile-First Breakpoint Architecture', path: 'references/responsive/mobile-first-breakpoint-strategy.md' },
      { title: 'Mobile Touch Ergonomics & Thumb Zones', path: 'references/responsive/touch-target-ergonomics.md' },
      { title: 'Adaptive Navigation Patterns: Mobile Drawer to Desktop Rail', path: 'references/responsive/adaptive-navigation-patterns.md' }
    ]
  }
];


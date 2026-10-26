export interface CommandSpec {
  id: string;
  name: string;
  syntax: string;
  tagline: string;
  role: string;
  purpose: string;
  whenToUse: string;
  difference: string;
  arguments: string[];
  prerequisites: string[];
  exampleRequest: string;
  expectedOutput: string;
  commonMistakes: string[];
  playbookPath: string;
  references: { title: string; path: string }[];
}

export const commandsData: CommandSpec[] = [
  {
    id: 'puresaas',
    name: '/puresaas',
    syntax: '/puresaas [request]',
    tagline: 'Principal Designer & Main Orchestrator',
    role: 'Own the complete outcome from understanding the brief to delivering a verified, production-ready interface.',
    purpose: 'The universal entry point and orchestrator for Pure SaaS. It inspects repository context (framework, styling stack, components, existing tokens, and backend APIs), establishes or updates DESIGN.md, selects the appropriate specialist workflow when valuable, implements components with the 8-state interaction matrix and zero raw hex codes, and captures live browser verification across desktop, tablet, and mobile.',
    whenToUse: 'Use for end-to-end design and engineering tasks: building brand new pages, creating complex full-stack components, executing user flow refactors, or when you want the AI to orchestrate the complete design lifecycle autonomously.',
    difference: 'Coordinates all 5 specialist capabilities within one coherent session. Unlike specialist commands that narrow focus to design-only or review-only, /puresaas acts as a staff-level principal designer from brief to verified code.',
    arguments: [
      '[request]: Natural language description of what you want to build or improve, target surface mode (Persuade, Operate, Read, Experience), audience, and constraints.'
    ],
    prerequisites: [
      'Accessible codebase repository.',
      'Existing framework setup (React, Vue, Svelte, Next.js, or HTML/Tailwind) or clean starter directory.'
    ],
    exampleRequest: '/puresaas Build a customer telemetry dashboard with 4 metric overview cards, a real-time event stream table, status pills, and date-range filters.',
    expectedOutput: '1. Established or updated DESIGN.md with semantic tokens\n2. Implementation of modular components with 8 interaction states\n3. Responsive layout verified across 1440px, 768px, and 375px viewports\n4. Zero raw hex codes or arbitrary Tailwind brackets\n5. Honest verification report distinguishing tested, failed, and untested elements.',
    commonMistakes: [
      'Providing vague single-word requests without audience or domain context.',
      'Allowing coding agents to skip establishing DESIGN.md before writing JSX.',
      'Allowing agents to fabricate test IDs or alter existing backend API routes.'
    ],
    playbookPath: 'skill/reference/workflow.md',
    references: [
      { title: 'Principal Orchestrator Playbook', path: 'skill/reference/workflow.md' },
      { title: 'Hardware-Grade Craft Floor', path: 'skill/reference/craft-floor.md' },
      { title: 'Anti-Slop Enforcement Rules', path: 'skill/reference/anti-slop-rules.md' },
      { title: 'SaaS Dashboard Shell & Grid Layout', path: 'skill/reference/layouts/saas-dashboard.md' }
    ]
  },
  {
    id: 'design',
    name: '/puresaas:design',
    syntax: '/puresaas:design [brief]',
    tagline: 'Creative Director & Builder',
    role: 'Turn a product brief into a distinctive, fully implemented interface and landing page with strong visual hierarchy and authentic content.',
    purpose: 'Acts as Creative Director and lead UI builder. Selects a deliberate visual archetype from the 100+ style registry (Minimal Stark, Swiss International, Corporate Clean, Linear Dark, Neo-Brutalism, Retro Tech, etc.), establishes typography pairings and spatial density, authors DESIGN.md, and creates bold, authentic layouts with real copy and zero generic AI slop.',
    whenToUse: 'Use when starting completely new features, building distinct marketing landing pages, creating new product surfaces from scratch, or rebranding an existing application.',
    difference: 'Focuses on visual character, art direction, and bold composition rather than minor polishing or auditing existing screens.',
    arguments: [
      '[brief]: Product description, audience, visual personality, preferred style archetype or dial values (variance 1-10, motion 1-10, density 1-10).'
    ],
    prerequisites: [
      'Project workspace where DESIGN.md and component code can be authored.'
    ],
    exampleRequest: '/puresaas:design Create a developer-first observability platform landing page in Swiss International style with bold typography, dark canvas tokens, and terminal previews.',
    expectedOutput: '1. Authoritative DESIGN.md specifying chosen archetype, typography, and semantic color tokens\n2. Production-ready page components with authentic, domain-specific copy\n3. Distinctive visual hierarchy with zero AI template clichés\n4. Responsive layout tested across breakpoints.',
    commonMistakes: [
      'Falling back to default purple-to-cyan gradient text.',
      'Using identical 3-column feature cards with generic placeholder copy.',
      'Neglecting light/dark parity tokens in DESIGN.md.'
    ],
    playbookPath: 'skill/reference/design.md',
    references: [
      { title: 'Creative Director & Builder Playbook', path: 'skill/reference/design.md' },
      { title: 'Selectable Style Registry (100+ Archetypes)', path: 'skill/reference/style-registry.md' },
      { title: 'Art Direction and Taste Standards', path: 'skill/reference/art-direction-and-taste.md' },
      { title: 'Typographic Hierarchy & Typeset System', path: 'skill/reference/typeset.md' }
    ]
  },
  {
    id: 'polish',
    name: '/puresaas:polish',
    syntax: '/puresaas:polish [target]',
    tagline: 'Senior Visual Designer',
    role: 'Elevate visual craft, typography tracking, surface lighting, and micro-interactions without breaking working behavior.',
    purpose: 'Acts as a Senior Visual Designer focused entirely on craft and refinement. Audits and refines existing interfaces without rewriting business logic: calibrates letter-spacing (negative tracking on display text), tightens padding, applies Apple-grade hairline borders, tunes spring physics transitions, and adds polished hover/active feedback.',
    whenToUse: 'Use when you already have working code and components that feel slightly clunky, unstyled, or lack visual finesse.',
    difference: 'Preserves 100% of underlying business logic, state hooks, and functionality while elevating the visual execution to Apple/Vercel-level craft.',
    arguments: [
      '[target]: File path, component name, or URL of the existing interface to polish.'
    ],
    prerequisites: [
      'Existing working components or pages.'
    ],
    exampleRequest: '/puresaas:polish Polish src/components/DataGrid.tsx with hairline borders, subtle hover highlights, tabular numbers, and smooth 150ms transitions.',
    expectedOutput: '1. Refined typography with letter-spacing tracking and tabular figures\n2. Subtle layered surface lighting and hairline borders (rgba 8% - 14%)\n3. Cohesive spring micro-interactions on buttons, rows, and inputs\n4. Fully preserved functionality and state.',
    commonMistakes: [
      'Adding heavy, blurry drop shadows that muddy the UI.',
      'Breaking event handlers or state management during restyling.',
      'Using inconsistent corner radii across nested containers.'
    ],
    playbookPath: 'skill/reference/polish.md',
    references: [
      { title: 'Senior Visual Designer Playbook', path: 'skill/reference/polish.md' },
      { title: 'Apple Visual Polish & Restraint', path: 'skill/reference/visual-craft/apple-polish.md' },
      { title: 'Hairline Borders & Surface Lighting', path: 'skill/reference/visual-craft/hairline-borders.md' },
      { title: 'Micro-Interactions & Spring Physics', path: 'skill/reference/visual-craft/micro-interactions.md' }
    ]
  },
  {
    id: 'review',
    name: '/puresaas:review',
    syntax: '/puresaas:review [scope]',
    tagline: 'Independent Design Critic',
    role: 'Judge the interface honestly across 10 dimensions, prioritizing defects from P0 to P3 and driving verified fixes.',
    purpose: 'Acts as an independent design critic and accessibility auditor. Evaluates an interface or codebase across 10 rigorous dimensions: Visual Hierarchy, Typographic Craft, Color & Contrast (WCAG 2.2 AA), Spatial Consistency, Surface Elevation, Interaction Feedback, Responsive Ergonomics, Motion Purpose, Accessibility, and Slop Elimination. Produces a prioritized defect ledger (P0 Blocker to P3 Polish) and fixes issues when authorized.',
    whenToUse: 'Use before shipping releases, during PR reviews, or when evaluating an AI coding agent’s completed work.',
    difference: 'Uncompromisingly honest: does not give participation trophies or false approvals. If contrast fails or browser screenshots are unavailable, it reports the exact failure.',
    arguments: [
      '[scope]: File paths, directory, or URL to audit across the 10 dimensions.'
    ],
    prerequisites: [
      'Renderable components or accessible application files.'
    ],
    exampleRequest: '/puresaas:review Audit src/pages/BillingPage.tsx across all 10 dimensions and triage defects from P0 to P3.',
    expectedOutput: '1. 10-Dimension score breakdown (0-20 scale)\n2. Prioritized defect ledger (P0, P1, P2, P3) with specific file/line pointers\n3. WCAG 2.2 AA contrast compliance verification\n4. Specific code fixes for identified defects.',
    commonMistakes: [
      'Reporting passing verification for uninspected or unrendered code.',
      'Conflating subjective preferences with objective P0/P1 design bugs.',
      'Ignoring mobile keyboard occlusion or broken tap targets.'
    ],
    playbookPath: 'skill/reference/review.md',
    references: [
      { title: 'Independent Design Critic Playbook', path: 'skill/reference/review.md' },
      { title: 'Deterministic Audit Matrix', path: 'skill/reference/code-audit.md' },
      { title: 'WCAG 2.2 AA Accessibility Matrix', path: 'skill/reference/accessibility/conformance-matrix.md' }
    ]
  },
  {
    id: 'clone',
    name: '/puresaas:clone',
    syntax: '/puresaas:clone [URL/Image]',
    tagline: 'Reference Analyst & Cloning Engineer',
    role: 'Analyze a supplied website or screenshot and recreate its relevant layout, typography, styling, and interactions accurately within the user project.',
    purpose: 'Deconstructs reference websites or screenshot captures into their foundational design DNA: typographic scale, spacing ratios, color palette, surface hierarchy, and interaction mechanics. Recreates the layout and styling cleanly inside your project framework using semantic tokens, without copying proprietary images or trademarked assets.',
    whenToUse: 'Use when you have an inspirational reference site (e.g. Stripe, Linear, Apple, Raycast) or design mockup that you want to recreate cleanly in your codebase.',
    difference: 'Performs true structural analysis rather than crude visual guessing. Extracts real DOM geometries, fonts, and CSS variables where browser tools are active.',
    arguments: [
      '[URL/Image]: Live URL to inspect or path to screenshot image.'
    ],
    prerequisites: [
      'Accessible URL or local screenshot asset.'
    ],
    exampleRequest: '/puresaas:clone Recreate the hero section, interactive pricing calculator, and feature grid from https://linear.app using our Tailwind tokens.',
    expectedOutput: '1. Extracted design DNA specification (typography, palette, spatial grid)\n2. Reconstructed modular components tailored to your framework\n3. Fully responsive layout matching reference proportions\n4. Zero trademarked logos or proprietary image assets copied.',
    commonMistakes: [
      'Pretending inaccessible pages were inspected when network or auth fails.',
      'Copying copyrighted brand assets instead of building semantic equivalents.',
      'Ignoring responsive breakdown of reference layout at 375px.'
    ],
    playbookPath: 'skill/reference/clone.md',
    references: [
      { title: 'Reference Analyst & Cloning Playbook', path: 'skill/reference/clone.md' },
      { title: 'DOM Extraction & Reverse Engineering', path: 'skill/reference/design-analysis/dom-extraction.md' },
      { title: 'Visual Deconstruction Techniques', path: 'skill/reference/design-analysis/screenshot-breakdown.md' }
    ]
  },
  {
    id: 'responsive',
    name: '/puresaas:responsive',
    syntax: '/puresaas:responsive [target]',
    tagline: 'Responsive Systems Engineer',
    role: 'Audit and fix multi-viewport behavior, touch ergonomics, fluid typography, and mobile-desktop layout shifts.',
    purpose: 'Specializes in multi-viewport engineering from 375px mobile screens to 1440px+ ultra-wide displays. Enforces zero horizontal overflow, fluid typography (`clamp()`), accessible minimum touch targets (44×44px), thumb-zone navigation, and graceful table adaptations (cards/drawers on mobile, data grids on desktop).',
    whenToUse: 'Use when an interface looks good on desktop but breaks on mobile phones, suffers from horizontal scrollbars, or has unclickable small buttons on touch devices.',
    difference: 'Does not just wrap elements in `flex-wrap`. Intentionally re-architects layout topology for mobile ergonomics, drawer navigation, and touch fidelity.',
    arguments: [
      '[target]: Component, page, or application route to audit and fix across viewports.'
    ],
    prerequisites: [
      'Renderable responsive layout in project.'
    ],
    exampleRequest: '/puresaas:responsive Audit src/pages/AnalyticsPage.tsx across 375px, 768px, and 1440px. Fix horizontal overflow and convert the desktop data table to responsive card rows on mobile.',
    expectedOutput: '1. Multi-viewport audit report (375px, 768px, 1440px)\n2. Zero horizontal scroll overflow across all screen sizes\n3. Touch targets enlarged to 44px minimum with thumb-zone positioning\n4. Fluid typography clamping applied to headings.',
    commonMistakes: [
      'Only testing at 1440px desktop width.',
      'Allowing fixed width elements (`w-[800px]`) that cause viewport blowout.',
      'Hiding essential functionality on mobile rather than adapting layout.'
    ],
    playbookPath: 'skill/reference/responsive.md',
    references: [
      { title: 'Responsive Systems Engineer Playbook', path: 'skill/reference/responsive.md' },
      { title: 'Mobile-First Breakpoint Architecture', path: 'skill/reference/responsive/mobile-first.md' },
      { title: 'Touch Ergonomics & Thumb Zones', path: 'skill/reference/responsive/touch-ergonomics.md' },
      { title: 'Fluid Typography & clamp() Calculations', path: 'skill/reference/responsive/fluid-clamp.md' }
    ]
  }
];

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/design-systems');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const guides = [
  {
    name: 'design-tokens-architecture.md',
    title: 'Design Tokens Architecture & 3-Tier Hierarchy',
    overview: 'Design tokens are the atomic building blocks of a maintainable UI system. Pure SaaS enforces a strict 3-tier hierarchy: Global/Raw, Semantic/System, and Component-scoped tokens.',
    tiers: [
      { tier: 'Tier 1: Global / Raw Tokens', role: 'Context-agnostic primitive values (e.g., color-blue-500: #3b82f6, space-4: 16px)', usage: 'Never referenced directly in UI component styles' },
      { tier: 'Tier 2: Semantic / System Tokens', role: 'Intent-driven aliases that change with theme context (e.g., color-surface-base, color-text-primary)', usage: 'Primary styling layer for all layout and component surfaces' },
      { tier: 'Tier 3: Component-Scoped Tokens', role: 'Component-specific overrides (e.g., button-primary-bg, modal-backdrop-blur)', usage: 'Used for fine-grained component micro-adjustments' }
    ],
    codeSnippet: `:root {
  /* Tier 1: Primitives */
  --raw-slate-900: #0f172a;
  --raw-slate-50:  #f8fafc;
  --raw-blue-600:  #2563eb;
  --raw-blue-500:  #3b82f6;

  /* Tier 2: Semantic Tokens (Light Default) */
  --color-surface-base:    var(--raw-slate-50);
  --color-surface-elevated: #ffffff;
  --color-text-primary:    var(--raw-slate-900);
  --color-text-secondary:  #475569;
  --color-border-subtle:   #e2e8f0;
  --color-accent-primary:  var(--raw-blue-600);
}

[data-theme="dark"] {
  /* Tier 2: Semantic Tokens (Dark Inversion) */
  --color-surface-base:    var(--raw-slate-900);
  --color-surface-elevated: #1e293b;
  --color-text-primary:    var(--raw-slate-50);
  --color-text-secondary:  #94a3b8;
  --color-border-subtle:   #334155;
  --color-accent-primary:  var(--raw-blue-500);
}`,
    dos: [
      'Bind 100% of component styles to Tier 2 semantic tokens.',
      'Group tokens by role: surface, text, border, accent, feedback.',
      'Maintain automated contrast validation across all light/dark token pairings.'
    ],
    donts: [
      'Never allow hardcoded hex values (#1a1a1a) or arbitrary Tailwind values (bg-[#fff]) in production templates.',
      'Do not name tokens after visual appearances (e.g. --color-blue); use semantic roles (e.g. --color-primary).'
    ],
    accessibility: [
      'Ensure semantic token pairs meet WCAG 2.2 AA 4.5:1 text contrast and 3:1 non-text contrast.'
    ]
  },
  {
    name: 'token-naming-taxonomy.md',
    title: 'Token Naming Taxonomy & Structured Conventions',
    overview: 'A standardized naming taxonomy prevents token collisions, accelerates developer onboarding, and enables automated tooling transforms.',
    tiers: [
      { tier: 'Namespace', role: 'Identifies brand or system prefix (e.g., --sys-, --pure-)', usage: 'System isolation' },
      { tier: 'Domain / Category', role: 'Property category (e.g., color, font, space, radius, shadow, motion)', usage: 'Fast IDE autocomplete' },
      { tier: 'Property / Object', role: 'UI element role (e.g., surface, text, border, button, input)', usage: 'Identifies affected surface' },
      { tier: 'Variant / Modifier', role: 'Intent or state (e.g., primary, muted, subtle, hover, active, error)', usage: 'Differentiates intent' }
    ],
    codeSnippet: `/* Standard Formula: --sys-[domain]-[property]-[variant]-[state] */

/* Surfaces */
--sys-color-surface-base: #ffffff;
--sys-color-surface-elevated: #f9fafb;
--sys-color-surface-overlay: #ffffff;
--sys-color-surface-hover: #f3f4f6;

/* Typography */
--sys-font-size-heading-xl: 2.25rem;
--sys-font-line-height-heading-xl: 1.15;
--sys-font-weight-bold: 700;

/* Spacing */
--sys-space-inset-sm: 8px;
--sys-space-inset-md: 16px;
--sys-space-inset-lg: 24px;

/* Radius */
--sys-radius-sm: 6px;
--sys-radius-md: 10px;
--sys-radius-lg: 16px;`,
    dos: [
      'Follow kebab-case with consistent hierarchical token segments.',
      'Make token names self-documenting for both designers and engineers.'
    ],
    donts: [
      'Do not mix camelCase and kebab-case within the token namespace.'
    ],
    accessibility: [
      'Explicitly designate high-contrast and state variants in the taxonomy.'
    ]
  },
  {
    name: 'color-palette-construction.md',
    title: 'Color Palette Construction & Perceptual Lightness Scales',
    overview: 'Building accessible digital color systems requires perceptual uniformity. Pure SaaS utilizes OKLCH color spaces to avoid the hue shifts and uneven luminance steps inherent to traditional RGB and HSL.',
    tiers: [
      { tier: 'OKLCH Lightness', role: 'Perceptual brightness (L: 0% to 100%) remains uniform across hues', usage: 'Guarantees predictable contrast' },
      { tier: 'Chroma Ramp', role: 'Controls color saturation without blowing out contrast boundaries', usage: 'Keeps hues natural' },
      { tier: 'Light/Dark Parity', role: 'Step 50 in light mode corresponds to Step 950 in dark mode', usage: 'Predictable theme mapping' }
    ],
    codeSnippet: `/* OKLCH Uniform Luminance Scale Example */
:root {
  /* Neutral Ramp (Luminance carefully calibrated) */
  --neutral-50:  oklch(0.98 0.005 240);
  --neutral-100: oklch(0.95 0.008 240);
  --neutral-200: oklch(0.89 0.012 240);
  --neutral-500: oklch(0.55 0.020 240);
  --neutral-800: oklch(0.24 0.018 240);
  --neutral-900: oklch(0.16 0.015 240);
  --neutral-950: oklch(0.11 0.012 240);

  /* Primary Brand Blue (Predictable 4.5:1 contrast against neutral-50) */
  --brand-500: oklch(0.58 0.22 255);
}`,
    dos: [
      'Use OKLCH for programmatic palette generation to prevent yellow/blue luminance skew.',
      'Check contrast against both white and black before locking a primary brand color.'
    ],
    donts: [
      'Never rely on HSL lightness (e.g. hsl(60, 100%, 50%) yellow has dramatically higher perceived luminance than hsl(240, 100%, 50%) blue).'
    ],
    accessibility: [
      'Verify that all text colors on their respective backgrounds achieve >= 4.5:1 ratio.'
    ]
  },
  {
    name: 'typography-scale-hierarchy.md',
    title: 'Typography Scale, Fluid Formulas, and Optical Tracking',
    overview: 'Typography conveys structure, priority, and voice. Pure SaaS couples mathematical modular scales with fluid clamp() formulas and negative letter-spacing on display headlines.',
    tiers: [
      { tier: 'Display / Hero', role: '36px to 64px, line-height 1.05 to 1.15, tracking -0.03em', usage: 'Impact statements' },
      { tier: 'Headings (H1-H3)', role: '20px to 32px, line-height 1.2 to 1.3, tracking -0.015em', usage: 'Section titles' },
      { tier: 'Body & Microcopy', role: '13px to 16px, line-height 1.5 to 1.6, tracking 0 to +0.01em', usage: 'Comfortable reading' }
    ],
    codeSnippet: `/* Fluid Typography Scale */
:root {
  --font-hero: clamp(2.25rem, 1.8rem + 2.2vw, 3.75rem);
  --font-h1:   clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem);
  --font-h2:   clamp(1.35rem, 1.2rem + 1.0vw, 2.00rem);
  --font-body: clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem);
  
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.04em;
}

h1, .hero-heading {
  font-size: var(--font-hero);
  line-height: 1.1;
  letter-spacing: var(--tracking-tight);
}

body {
  font-size: var(--font-body);
  line-height: 1.55;
  letter-spacing: var(--tracking-normal);
}`,
    dos: [
      'Tighten letter-spacing (tracking) as font-size increases.',
      'Decrease line-height as font-size increases (1.1 for 48px, 1.55 for 15px).',
      'Use fluid clamp() formulas to eliminate abrupt breakpoint text resizing.'
    ],
    donts: [
      'Never apply negative letter-spacing to small body or caption text (renders illegible).'
    ],
    accessibility: [
      'WCAG 1.4.12: Support 200% font zoom without breaking containers.'
    ]
  },
  {
    name: 'spacing-spatial-grids.md',
    title: 'Spatial Grids, Layout Rhythm & Spacing Tokens',
    overview: 'Spatial systems define rhythm, alignment, and balance. Pure SaaS enforces an 8pt spatial grid with 4pt micro-steps for compact UI density.',
    tiers: [
      { tier: 'Micro Scale (2px, 4px)', role: 'Icon gaps, badge insets, hairline offsets', usage: 'Micro-alignment' },
      { tier: 'Component Scale (8px, 12px, 16px, 24px)', role: 'Input padding, card insets, list item gaps', usage: 'Tactile components' },
      { tier: 'Macro Scale (32px, 48px, 64px, 96px, 128px)', role: 'Section padding, hero margins, layout gutters', usage: 'Architectural breathing room' }
    ],
    codeSnippet: `:root {
  --space-0-5: 2px;
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-12:  48px;
  --space-16:  64px;
  --space-24:  96px;
}`,
    dos: [
      'Snap all margins, paddings, and component heights to multiples of 4px and 8px.',
      'Keep section gaps proportional to typography scale.'
    ],
    donts: [
      'Never introduce random arbitrary spacing like 17px or 29px without an architectural justification.'
    ],
    accessibility: [
      'Adequate spacing between interactive touch targets (minimum 8px gap).'
    ]
  },
  {
    name: 'elevation-depth-shadows.md',
    title: 'Elevation, Depth & Multi-Layer Shadow Tokens',
    overview: 'Depth clarifies visual hierarchy and overlapping surfaces. Pure SaaS replaces single harsh drop shadows with realistic multi-layer ambient and directional shadows.',
    tiers: [
      { tier: 'Elevation 1 (Card / Subtle)', role: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', usage: 'Resting cards' },
      { tier: 'Elevation 2 (Dropdown / Popover)', role: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)', usage: 'Floating menus' },
      { tier: 'Elevation 3 (Modal / Dialog)', role: '0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)', usage: 'Top-level dialogs' }
    ],
    codeSnippet: `:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.08);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.08);
}

[data-theme="dark"] {
  /* Dark mode relies on surface luminosity and hairline borders rather than heavy black shadows */
  --shadow-sm: 0 0 0 1px rgba(255, 255, 255, 0.08);
  --shadow-md: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 12px 24px rgba(0, 0, 0, 0.6);
}`,
    dos: [
      'Layer multiple shadow stops for natural optical diffusion.',
      'In dark mode, combine subtle ambient shadows with luminous hairline borders.'
    ],
    donts: [
      'Never render muddy pure black shadows with 0 blur and 100% opacity in light mode.'
    ],
    accessibility: [
      'Maintain contrast between overlapping elevation layers without relying solely on shadow visibility.'
    ]
  },
  {
    name: 'border-radius-geometry.md',
    title: 'Border Radius Geometry & Concentric Corner Nesting',
    overview: 'Corner geometry dictates visual softness and hardware alignment. Pure SaaS applies concentric corner mathematics: inner radius must equal outer radius minus padding.',
    tiers: [
      { tier: 'Concentric Nesting Formula', role: 'R_inner = R_outer - Padding', usage: 'Nested cards and inner badges' },
      { tier: 'Squircle & Continuous Curves', role: 'CSS corner-shape or smooth svg path', usage: 'macOS/iOS visual parity' },
      { tier: 'Pill Radius (9999px)', role: 'Tags, toggles, badges', usage: 'Inline metadata' }
    ],
    codeSnippet: `/* Concentric Nesting Calculation */
.outer-card {
  padding: 16px;
  border-radius: 24px; /* R_outer = 24px */
}

.inner-content {
  /* R_inner = 24px - 16px = 8px */
  border-radius: 8px; 
}`,
    dos: [
      'Apply the concentric nesting formula to prevent awkward mismatched corner gaps.',
      'Use consistent radius tokens across components (e.g. 8px inputs, 12px cards, 16px modals).'
    ],
    donts: [
      'Never nest an inner element with equal or larger radius than its outer container with padding.'
    ],
    accessibility: [
      'Ensure focus rings closely trace curved element corners.'
    ]
  },
  {
    name: 'grid-container-queries.md',
    title: 'Container Queries & Responsive Component Grids',
    overview: 'Modern modular layouts adapt based on their available container space rather than the full browser viewport width.',
    tiers: [
      { tier: '@container Definition', role: 'container-type: inline-size', usage: 'Parent wrapper' },
      { tier: 'Container Breakpoints', role: '@container (min-width: 400px)', usage: 'Self-adapting cards' }
    ],
    codeSnippet: `.card-container {
  container-type: inline-size;
  container-name: card;
}

.responsive-card {
  display: flex;
  flex-direction: column;
}

@container card (min-width: 480px) {
  .responsive-card {
    flex-direction: row;
    align-items: center;
  }
}`,
    dos: [
      'Use container queries for cards and widgets that can be dropped into sidebars or full-width stages.',
      'Pair with modern CSS Grid auto-fit and minmax.'
    ],
    donts: [
      'Do not rely solely on viewport media queries for embeddable widgets.'
    ],
    accessibility: [
      'Ensure responsive reflow does not hide essential content or controls.'
    ]
  },
  {
    name: 'design-system-versioning.md',
    title: 'Design System Versioning & Deprecation Lifecycle',
    overview: 'Predictable versioning ensures consuming teams can adopt updates safely without breaking existing customer interfaces.',
    tiers: [
      { tier: 'Patch (1.0.x)', role: 'Bug fixes, contrast corrections, zero API changes', usage: 'Safe auto-upgrade' },
      { tier: 'Minor (1.x.0)', role: 'New components, backward-compatible prop additions', usage: 'Feature updates' },
      { tier: 'Major (x.0.0)', role: 'Breaking token renames, removed components or DOM structures', usage: 'Scheduled migration' }
    ],
    codeSnippet: `// Deprecation warning in development mode
export function Button({ variant, ...props }: ButtonProps) {
  if (process.env.NODE_ENV !== 'production' && variant === 'legacy-outline') {
    console.warn(
      '[Pure SaaS Deprecation]: Button variant "legacy-outline" is deprecated and will be removed in v2.0. Please use "secondary" instead.'
    );
  }
  return <button {...props} />;
}`,
    dos: [
      'Maintain automated codemods for major token migrations.',
      'Provide at least one minor release cycle with deprecation warnings before breaking changes.'
    ],
    donts: [
      'Never silently rename or delete tokens in minor or patch releases.'
    ],
    accessibility: [
      'Audit accessibility compliance on every release tag.'
    ]
  },
  {
    name: 'component-contract-design.md',
    title: 'Component Contract Design & API Polymorphism',
    overview: 'Well-designed component contracts maximize flexibility while preventing invalid states.',
    tiers: [
      { tier: 'Polymorphic "as" prop', role: 'Render as <a>, <button>, or Link without losing styling', usage: 'Universal affordances' },
      { tier: 'Compound Composition', role: 'Parent/Child context binding (<Tabs.List>, <Tabs.Trigger>)', usage: 'Flexible layouts' },
      { tier: 'Strict Typing', role: 'Discriminated unions for mutually exclusive options', usage: 'Zero runtime errors' }
    ],
    codeSnippet: `// Clean polymorphic component pattern
import React from 'react';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsProp<C>
> & Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;`,
    dos: [
      'Favor composition over monolithic prop bags with 40 optional flags.',
      'Use forwardRef on all primitives to support focus management and animations.'
    ],
    donts: [
      'Never swallow or override native HTML attributes (like onClick, id, role).'
    ],
    accessibility: [
      'Preserve appropriate ARIA roles regardless of polymorphic root element.'
    ]
  },
  {
    name: 'token-transform-dtcg.md',
    title: 'DTCG Token Transforms & Multi-Platform Export',
    overview: 'The W3C Design Tokens Community Group (DTCG) specification provides a vendor-neutral JSON format for sharing tokens across Web, iOS, and Android.',
    tiers: [
      { tier: 'DTCG JSON', role: '$value, $type, $description structure', usage: 'Source of truth' },
      { tier: 'Style Dictionary', role: 'Compiles DTCG tokens into CSS, SCSS, Swift, and Kotlin', usage: 'Cross-platform distribution' }
    ],
    codeSnippet: `{
  "color": {
    "surface": {
      "base": {
        "$value": "#ffffff",
        "$type": "color",
        "$description": "Primary background surface in light mode."
      }
    }
  }
}`,
    dos: [
      'Validate tokens against DTCG JSON schema in CI.',
      'Generate platform-specific artifacts (CSS vars, Tailwind theme, Swift tokens) automatically.'
    ],
    donts: [
      'Do not maintain manual, out-of-sync copies of token files for different platforms.'
    ],
    accessibility: [
      'Include contrast requirements inside token metadata descriptions.'
    ]
  },
  {
    name: 'design-system-governance.md',
    title: 'Design System Governance & Contribution Model',
    overview: 'Governance protects the design system from divergence, duplicated components, and uncurated visual drift.',
    tiers: [
      { tier: 'Contribution RFC', role: 'Proposal document for new patterns with usage evidence', usage: 'Quality gating' },
      { tier: 'Token Drift Scanner', role: 'Automated CI tool flagging rogue CSS properties', usage: 'Continuous enforcement' }
    ],
    codeSnippet: `// Pure SaaS Token Drift Check Command
$ npx pure-saas drift DESIGN.md observations.json
// Scans for unmapped colors and rogue spacing overrides in source files`,
    dos: [
      'Require cross-functional review (design + engineering + accessibility) for new primitives.',
      'Maintain an Unresolved Decisions ledger in DESIGN.md.'
    ],
    donts: [
      'Never allow ad-hoc inline styles to bypass system review.'
    ],
    accessibility: [
      'Mandatory accessibility sign-off on all RFC proposals.'
    ]
  }
];

let created = 0;
for (const guide of guides) {
  const filePath = path.join(targetDir, guide.name);
  let content = `# ${guide.title}\n\n`;
  content += `${guide.overview}\n\n---\n\n`;
  content += `## 1. Architectural Structure & Tiers\n\n`;
  content += `| Level / Tier | Core Role | Usage / Purpose |\n`;
  content += `| :--- | :--- | :--- |\n`;
  for (const t of guide.tiers) {
    content += `| **${t.tier}** | ${t.role} | ${t.usage} |\n`;
  }
  content += `\n---\n\n## 2. Code & Configuration Reference\n\n`;
  content += `\`\`\`css\n${guide.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(guide.dos.length, guide.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const d = guide.dos[i] || '';
    const dn = guide.donts[i] || '';
    content += `| ${d} | ${dn} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Quality Standards\n\n`;
  for (const a of guide.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Enforcement\n\n`;
  content += `- Enforce strict token binding across all components.\n`;
  content += `- Prevent arbitrary numbers and unverified hex values in pull requests.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} design system references in references/design-systems/`);


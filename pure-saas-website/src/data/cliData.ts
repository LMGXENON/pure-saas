export interface CliCommand {
  command: string;
  syntax: string;
  description: string;
  options: { flag: string; desc: string }[];
  example: string;
  outputPreview: string;
}

export const cliData: CliCommand[] = [
  {
    command: 'validate',
    syntax: 'npx pure-saas validate [file]',
    description: 'Validates DESIGN.md or design-brief.md for correct structure, mandatory token declarations, light/dark mode pairings, and open unresolved ledger items.',
    options: [
      { flag: '--json', desc: 'Output machine-readable validation results suitable for CI' },
      { flag: '--strict', desc: 'Fail on warnings and open proposals as well as critical defects' }
    ],
    example: 'npx pure-saas validate DESIGN.md',
    outputPreview: `=== Pure SaaS Design System Validation ===
File: DESIGN.md (16 sections found)
✓ 3-tier token hierarchy detected
✓ Semantic color pairings complete (18/18 tokens)
✓ Fluid typography scale clamp formulas valid
✓ 8pt spatial grid definitions verified
✓ 0 unresolved decisions remaining
RESULT: PASS (0 errors, 0 warnings)`
  },
  {
    command: 'contrast',
    syntax: 'npx pure-saas contrast [file]',
    description: 'Audits all documented color tokens against WCAG 2.2 Level AA and AAA contrast tiers using mathematical relative luminance calculations.',
    options: [
      { flag: '--json', desc: 'Output machine-readable contrast audit data' },
      { flag: '--strict', desc: 'Require 7.0:1 AAA contrast for all normal text' }
    ],
    example: 'npx pure-saas contrast DESIGN.md',
    outputPreview: `=== Pure SaaS Token Contrast Audit (WCAG 2.2 AA) ===
✓ [Light Mode] --color-surface-base on --color-text-primary: 15.2:1 (PASS >= 4.5:1)
✓ [Light Mode] --color-surface-base on --color-text-secondary: 5.4:1 (PASS >= 4.5:1)
✓ [Light Mode] --color-button-primary-bg on text: 4.8:1 (PASS >= 4.5:1)
✓ [Dark Mode]  --color-surface-base on --color-text-primary: 14.8:1 (PASS >= 4.5:1)
✓ [Dark Mode]  --color-surface-elevated on --color-text-primary: 11.2:1 (PASS >= 4.5:1)
RESULT: 100% WCAG 2.2 AA COMPLIANT (0 failures)`
  },
  {
    command: 'diff',
    syntax: 'npx pure-saas diff <file1> <file2>',
    description: 'Compares tokens between two design files or git commits, highlighting added, modified, or deleted color and typography definitions.',
    options: [
      { flag: '--json', desc: 'Output token diff object' }
    ],
    example: 'npx pure-saas diff DESIGN.before.md DESIGN.md',
    outputPreview: `=== Pure SaaS Token Diff ===
Added:
  + --color-accent-hover: #0077ed
  + --shadow-bloom: 0 0 40px -10px rgba(59, 130, 246, 0.25)
Modified:
  ~ --color-surface-elevated: #f8fafc -> #ffffff
Deleted:
  - --color-legacy-purple: #9333ea
RESULT: 2 added, 1 modified, 1 deleted`
  },
  {
    command: 'drift',
    syntax: 'npx pure-saas drift <design.md> <observations.json>',
    description: 'Detects design drift between the tokens documented in DESIGN.md and actual measured values observed in running browser DevTools.',
    options: [
      { flag: '--strict', desc: 'Fail if any measured property deviates by more than 1px' }
    ],
    example: 'npx pure-saas drift DESIGN.md observations.json',
    outputPreview: `=== Pure SaaS Design Drift Analysis ===
Inspecting 42 observed component measurements...
✓ Button height: 40px (matches --size-button-md: 40px)
✓ Card padding: 24px (matches --space-card-padding: 24px)
! Hero font-size: observed 44px vs expected 48px (--font-h1)
RESULT: 1 drift alert detected`
  },
  {
    command: 'check',
    syntax: 'npx pure-saas check [file] --source <dir>',
    description: 'Scans source code files (JSX, TSX, CSS, HTML, Svelte, Vue) for hardcoded hex colors, arbitrary Tailwind bracket values, and unmapped spacing.',
    options: [
      { flag: '--source <dir>', desc: 'Source directory to scan (default: src)' },
      { flag: '--known <file>', desc: 'Baseline JSON file to suppress existing tech debt' },
      { flag: '--update-known', desc: 'Update known defects file with current findings' }
    ],
    example: 'npx pure-saas check DESIGN.md --source src',
    outputPreview: `=== Pure SaaS Static Source Scanner ===
Scanned 68 files in src/
✓ 0 raw hex color codes found
✓ 0 arbitrary Tailwind brackets (w-[...], bg-[...])
✓ All color references resolve to CSS variables
RESULT: CLEAN CODEBASE (0 token violations)`
  },
  {
    command: 'design-system',
    syntax: 'npx pure-saas design-system --product <type> [options]',
    description: 'Programmatically generates a production-ready, fully tokenized DESIGN.md based on product archetype and numerical design dial values.',
    options: [
      { flag: '--product <name>', desc: 'Product archetype (e.g. saas, fintech, devtools, ecommerce)' },
      { flag: '--variance <1-10>', desc: 'Visual variance dial (1=clean minimal, 10=bold asymmetric)' },
      { flag: '--motion <1-10>', desc: 'Motion intensity dial (1=subtle/reduced, 10=dynamic spring physics)' },
      { flag: '--density <1-10>', desc: 'Information density dial (1=spacious marketing, 10=compact console)' },
      { flag: '--out <file>', desc: 'Output destination file path (default: DESIGN.md)' }
    ],
    example: 'npx pure-saas design-system --product devtools --variance 8 --motion 7 --density 9 --out DESIGN.md',
    outputPreview: `Generated DESIGN.md for archetype "devtools":
- Palette: Technical Terminal / Carbon Monospace
- Density: Compact (32px controls, 8px micro-grid)
- Motion: Snappy Spring (cubic-bezier(0.16, 1, 0.3, 1))
- Output written to: DESIGN.md`
  },
  {
    command: 'export-tokens',
    syntax: 'npx pure-saas export-tokens [file] --format <format> --out <path>',
    description: 'Exports tokens from DESIGN.md into production code formats: CSS variables, Tailwind v3 config, Tailwind v4 theme, DTCG standard JSON, or plain JSON.',
    options: [
      { flag: '--format <type>', desc: 'css | tailwind | tailwind-v4 | dtcg | json' },
      { flag: '--out <file>', desc: 'Destination file path' }
    ],
    example: 'npx pure-saas export-tokens DESIGN.md --format css --out src/styles/tokens.css',
    outputPreview: `Exported 48 tokens from DESIGN.md:
- Target format: CSS Custom Properties
- Output file: src/styles/tokens.css
✓ File created successfully`
  },
  {
    command: 'ref',
    syntax: 'npx pure-saas ref "<query>"',
    description: 'Full-text search engine across all 260+ reference files: components, layouts, design systems, UX patterns, visual craft, accessibility, Apple HIG, frameworks, and shaders.',
    options: [
      { flag: '--limit <num>', desc: 'Maximum number of results to display (default: 10)' },
      { flag: '--json', desc: 'Output matches as JSON array' }
    ],
    example: 'npx pure-saas ref "modal"',
    outputPreview: `=== Pure SaaS Reference Search: "modal" (6 results) ===
[Apple HIG] Modality (references/hig/modality.md)
[Component Guide] Modal Dialog & Alert Architectural Guide (references/components/modal-dialog.md)
[Accessibility] Accessible Modal Dialogs & Alert Dialogs (references/accessibility/accessible-dialogs-modals.md)`
  },
  {
    command: 'query',
    syntax: 'npx pure-saas query [domain] "<keyword>"',
    description: 'Queries multi-domain curated design intelligence including styles, product archetypes, colors, typography pairings, UX heuristics, and motion curves.',
    options: [
      { flag: '[domain]', desc: 'styles | products | colors | typography | ux | landing | charts | motion' }
    ],
    example: 'npx pure-saas query ux "scroll"',
    outputPreview: `=== Pure SaaS Design Intelligence Query: ux "scroll" ===
Heuristic: Smooth Scroll Restoration
Do: Preserve exact scroll coordinates upon navigation back
Don't: Trap users in infinite scroll loops without accessible footers`
  },
  {
    command: 'init',
    syntax: 'npx pure-saas init [--reference]',
    description: 'Initializes a starter design-brief.md and DESIGN.md template in the current project directory with verified semantic tokens.',
    options: [
      { flag: '--reference', desc: 'Scaffolds a website recreation brief with 16 sections' }
    ],
    example: 'npx pure-saas init',
    outputPreview: `Created design-brief.md and DESIGN.md in current directory.
Run "npx pure-saas validate DESIGN.md" to verify.`
  }
];


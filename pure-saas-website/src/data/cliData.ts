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
    command: 'init',
    syntax: 'npx pure-saas init [options]',
    description: 'Initializes Pure SaaS in the current repository: compiles skill playbooks, generates host slash commands for Claude Code, Cursor, and Codex, and installs agent system rules.',
    options: [
      { flag: '--preset <name>', desc: 'Preset visual archetype (e.g., minimal-stark, swiss, linear-dark)' },
      { flag: '--force', desc: 'Overwrite existing configuration files and rules' }
    ],
    example: 'npx pure-saas init',
    outputPreview: `=== Pure SaaS Repository Initialization ===
✓ Skill directory verified (skill/SKILL.md)
✓ 317 reference playbooks linked
✓ Compiled Claude Code slash commands (.claude/commands/puresaas/)
✓ Compiled Cursor commands and rules (.cursor/commands/, .cursor/rules/)
✓ Compiled OpenAI Codex / Agents commands (.agents/commands/)
✓ Workspace rules active: .cursorrules, .windsurfrules, GEMINI.md, AGENTS.md
Initialization complete. Run "pure-saas doctor" to verify.`
  },
  {
    command: 'doctor',
    syntax: 'npx pure-saas doctor [options]',
    description: 'Runs diagnostic checks verifying Node.js version, package manager, DESIGN.md token presence, slash command registration, reference links, and browser engine availability.',
    options: [
      { flag: '--json', desc: 'Output machine-readable diagnostic report' }
    ],
    example: 'npx pure-saas doctor',
    outputPreview: `=== Pure SaaS Diagnostic Doctor ===
✓ Node.js runtime: v20.11.0 (>= 18.0.0)
✓ Repository Root: /workspace
✓ Skill Definition: skill/SKILL.md (Canonical)
✓ Reference Playbooks: 317/317 valid
✓ Registered Commands: 6 canonical slash commands active
✓ Design Specification: DESIGN.md detected and valid
✓ Browser Screenshot Engine: Google Chrome detected (/Applications/Google Chrome.app)
Status: Operational (Ready for AI design orchestration)`
  },
  {
    command: 'context',
    syntax: 'npx pure-saas context [options]',
    description: 'Deep-scans the repository to identify framework (React, Next.js, Vue, Svelte, Vite), styling solution (Tailwind v4/v3, CSS Modules), component libraries, existing tokens, and backend API routes.',
    options: [
      { flag: '--json', desc: 'Output structured JSON context object' }
    ],
    example: 'npx pure-saas context',
    outputPreview: `=== Pure SaaS Project Context Scan ===
Framework:      React 18.3.1 (Vite 6.x)
Styling Engine: Tailwind CSS 3.4.17 with CSS custom properties
Design Tokens:  DESIGN.md (3-tier semantic tokens active)
Component Stack: Lucide Icons, Headless UI primitives
Backend APIs:   12 endpoints detected (Preserved 100%)
Surface Mode:   Operate & Persuade`
  },
  {
    command: 'validate',
    syntax: 'npx pure-saas validate [file]',
    description: 'Validates DESIGN.md for structural integrity, mandatory token declarations, light/dark mode parity, spatial grid values, and unresolved decision ledger items.',
    options: [
      { flag: '--json', desc: 'Output machine-readable validation results suitable for CI' },
      { flag: '--strict', desc: 'Fail on warnings and open proposals as well as critical defects' }
    ],
    example: 'npx pure-saas validate DESIGN.md',
    outputPreview: `=== Pure SaaS Design System Validation ===
File: DESIGN.md (3-tier hierarchy detected)
✓ 3-tier token hierarchy verified (Primitive, Semantic, Component)
✓ Semantic color pairings complete (18/18 tokens with light/dark parity)
✓ Typographic scale formulas valid
✓ 8pt spatial grid definitions verified
✓ 0 unresolved decisions remaining
RESULT: PASS (0 errors, 0 warnings)`
  },
  {
    command: 'contrast',
    syntax: 'npx pure-saas contrast [file]',
    description: 'Audits all documented color tokens against WCAG 2.2 Level AA (4.5:1 for normal text, 3:1 for large text/graphical elements) using mathematical relative luminance calculations.',
    options: [
      { flag: '--json', desc: 'Output machine-readable contrast audit data' },
      { flag: '--strict', desc: 'Require 7.0:1 AAA contrast for all normal text' }
    ],
    example: 'npx pure-saas contrast DESIGN.md',
    outputPreview: `=== Pure SaaS Token Contrast Audit (WCAG 2.2 AA) ===
✓ [Light Mode] --color-canvas on --color-text-primary: 15.8:1 (PASS >= 4.5:1)
✓ [Light Mode] --color-surface-base on --color-text-secondary: 5.6:1 (PASS >= 4.5:1)
✓ [Light Mode] --color-accent on text: 4.9:1 (PASS >= 4.5:1)
✓ [Dark Mode]  --color-canvas on --color-text-primary: 16.2:1 (PASS >= 4.5:1)
✓ [Dark Mode]  --color-surface-base on --color-text-secondary: 5.2:1 (PASS >= 4.5:1)
RESULT: 100% WCAG 2.2 AA COMPLIANT (0 failures)`
  },
  {
    command: 'audit',
    syntax: 'npx pure-saas audit [path]',
    description: 'Performs a deterministic 10-dimension code and visual audit against the codebase, scoring visual hierarchy, typography, contrast, spacing, elevation, states, responsiveness, motion, semantics, and anti-slop rules.',
    options: [
      { flag: '--json', desc: 'Output structured defect ledger (P0 to P3)' },
      { flag: '--out <file>', desc: 'Save audit report to markdown or JSON file' }
    ],
    example: 'npx pure-saas audit src/',
    outputPreview: `=== Pure SaaS 10-Dimension Quality Audit ===
Scope: src/ (18 components evaluated)
Visual Hierarchy:       1.9 / 2.0 (Clear focal anchors)
Typographic Craft:      1.9 / 2.0 (Tabular figures, negative tracking)
Color & Contrast:       2.0 / 2.0 (100% WCAG AA compliant)
Spatial Consistency:    1.8 / 2.0 (8pt grid adhered)
Surface Elevation:      1.9 / 2.0 (Subtle hairlines, clean z-layers)
Interaction Feedback:   1.8 / 2.0 (8-state component coverage)
Responsive Ergonomics:  1.9 / 2.0 (Zero 375px horizontal overflow)
Motion Purpose:         1.8 / 2.0 (Spring physics calibrated)
Accessibility Semantics:1.9 / 2.0 (Keyboard focus rings & aria attributes)
Slop Elimination:       2.0 / 2.0 (0 AI tropes detected)
Overall Score: 18.9 / 20.0 (Grade: EXCELLENT)`
  },
  {
    command: 'browser',
    syntax: 'npx pure-saas browser <action> [options]',
    description: 'Automates browser testing and responsive screenshot capture across desktop (1440px), tablet (768px), and mobile (375px) viewports using Playwright or system headless Chrome.',
    options: [
      { flag: 'check', desc: 'Checks availability of Playwright CLI or system Chrome/Chromium' },
      { flag: 'screenshot <url>', desc: 'Captures responsive screenshots of a local or remote URL' },
      { flag: 'verify <url>', desc: 'Performs automated multi-viewport rendering verification' },
      { flag: '--out <dir>', desc: 'Output directory for captured PNG images (default: screenshots/)' }
    ],
    example: 'npx pure-saas browser screenshot http://localhost:3000',
    outputPreview: `=== Capturing Responsive Screenshots for: http://localhost:3000 ===
✓ [desktop] 1440x900 -> screenshots/screenshot-desktop-1440x900.png (100058 bytes)
✓ [tablet]  768x1024 -> screenshots/screenshot-tablet-768x1024.png (99182 bytes)
✓ [mobile]  375x812  -> screenshots/screenshot-mobile-375x812.png (52678 bytes)
Capture complete: 3/3 viewports captured successfully.`
  },
  {
    command: '3d',
    syntax: 'npx pure-saas 3d <action> [options]',
    description: 'Procedural 3D modeling toolkit based on the img2threejs pipeline. Generates zero-binary-asset, parametric Three.js TypeScript models suitable for modern SaaS product interfaces.',
    options: [
      { flag: 'check', desc: 'Checks Three.js and TypeScript environment prerequisites' },
      { flag: 'scaffold <name>', desc: 'Scaffolds a procedural Three.js component group with PBR materials' },
      { flag: '--output <file>', desc: 'Destination file path for generated TypeScript component' }
    ],
    example: 'npx pure-saas 3d scaffold ServerRack',
    outputPreview: `=== Procedural Three.js Model Scaffold ===
Generated: src/components/ServerRack3D.tsx
• Procedural geometry: BoxGeometry, RoundedBox, Cylinder
• PBR Materials: MeshStandardMaterial with roughness & metalness calibration
• Memory Management: Full dispose() cleanup hooks included
• Asset Dependencies: 0 KB binary files (100% parametric TypeScript)`
  },
  {
    command: 'style',
    syntax: 'npx pure-saas style <action> [options]',
    description: 'Inspects and browses the catalog of over 100 selectable visual style archetypes, outputting typography formulas, palette presets, and dial calibrations.',
    options: [
      { flag: 'list', desc: 'Lists all available design archetypes by category' },
      { flag: 'info <name>', desc: 'Displays detailed specs, typography, and tokens for an archetype' },
      { flag: '--category <cat>', desc: 'Filter by category (minimal, swiss, corporate, dark, retro)' }
    ],
    example: 'npx pure-saas style info minimal-stark',
    outputPreview: `=== Style Archetype: Minimal Stark ===
Category:   Minimal & Editorial
Variance:   3/10 (Controlled, rigorous)
Motion:     2/10 (Subtle, swift 120ms transitions)
Density:    7/10 (High information density, generous whitespace)
Typography: Inter Display + JetBrains Mono (Negative letter-spacing -0.03em)
Palette:    Monochrome (#09090b / #fbfbfd), hairline dividers (rgba 8%)
Best For:   Developer tools, financial systems, documentation, API platforms`
  }
];

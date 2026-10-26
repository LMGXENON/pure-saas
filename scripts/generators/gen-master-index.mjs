import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const referencesRoot = path.resolve(__dirname, '../../references');

const categoryMetadata = [
  { dir: 'components', title: 'Component Architecture & Primitives (20 Guides)', desc: 'Tactile, accessible UI primitives with state matrices and WCAG requirements.' },
  { dir: 'layouts', title: 'Layout & Page Composition Blueprints (12 Guides)', desc: 'Architectural blueprints for SaaS dashboards, heroes, settings, and conversion funnels.' },
  { dir: 'design-systems', title: 'Design Systems & Token Architecture (12 Guides)', desc: '3-tier token hierarchies, naming taxonomy, color construction, and spatial grids.' },
  { dir: 'ux-patterns', title: 'UX & Interaction Patterns (12 Guides)', desc: 'Keyboard shortcuts, focus management, optimistic updates, and undo patterns.' },
  { dir: 'visual-craft', title: 'Visual Craft, Physics & Polish (10 Guides)', desc: 'Apple-inspired design polish, materials, spring physics, and hairline sharpness.' },
  { dir: 'frontend-engineering', title: 'Frontend Engineering & Performance (12 Guides)', desc: 'Compound components, headless primitives, virtualization, and Core Web Vitals.' },
  { dir: 'accessibility', title: 'Accessibility (WCAG 2.2 AA) Guides (10 Guides)', desc: 'Conformance matrices, screen reader announcements, target sizes, and high contrast.' },
  { dir: 'theming', title: 'Theming & Token Architecture (8 Guides)', desc: 'Dark mode color inversion, runtime CSS variables, and system preference listeners.' },
  { dir: 'developer-tooling', title: 'Developer Tooling & CI Auditing (8 Guides)', desc: 'Static AST linting, automated contrast checking, and visual regression pipelines.' },
  { dir: 'real-world-flows', title: 'Real-World Production Flows (10 Guides)', desc: 'Authentication, billing checkouts, multi-tenancy, and audit log timelines.' },
  { dir: 'design-analysis', title: 'Design Analysis & Reverse Engineering (6 Guides)', desc: 'Screenshot deconstruction, DOM style extraction, and 11-item completion gates.' },
  { dir: 'responsive', title: 'Responsive Design & Mobile Ergonomics (6 Guides)', desc: 'Breakpoints, mobile touch ergonomics, fluid typography, and viewport modes.' },
  { dir: 'backgrounds', title: 'Interactive Background Shaders & Canvases (15 Guides)', desc: 'Production-grade WebGL/Canvas shader components and generative visual fields.' },
  { dir: 'frameworks', title: 'Framework Engineering Guides (22 Stacks)', desc: 'Implementation guides across React, Next.js, Vue, Svelte, Tailwind, SwiftUI, Flutter, etc.' },
  { dir: 'hig', title: 'Apple Human Interface Guidelines (124 Topics)', desc: 'Comprehensive Apple HIG reference across components, foundations, and system behaviors.' }
];

let indexContent = `# Pure SaaS Master Reference Index

This manifest catalogues Pure SaaS's reference library of **260+ architectural guides, component specifications, Apple HIG documents, and frontend engineering manuals**.

AI coding agents and developers should consult these exact documents before designing, writing, or reviewing code.

---

## Quick Reference Search
\`\`\`bash
# Search any topic across all categories
npx pure-saas ref "<query>"

# Examples:
npx pure-saas ref "button"          # Component specification
npx pure-saas ref "modal"           # Focus trapping & dialog guidelines
npx pure-saas ref "wcag 2.2"        # Accessibility conformance matrix
npx pure-saas ref "dark mode"       # Inversion & contrast preservation
npx pure-saas ref "spring physics"  # Animation curves & motion
npx pure-saas ref "dashboard"       # SaaS dashboard shell layout
\`\`\`

---

`;

for (const cat of categoryMetadata) {
  const catDir = path.join(referencesRoot, cat.dir);
  if (!fs.existsSync(catDir)) continue;

  indexContent += `## ${cat.title}\n\n*${cat.desc}*\n\n`;
  indexContent += `| Guide / Topic | File Path | Summary |\n`;
  indexContent += `| :--- | :--- | :--- |\n`;

  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md')).sort();
  for (const file of files) {
    const fullPath = path.join(catDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    const titleLine = lines.find(l => l.startsWith('# ')) || `# ${path.basename(file, '.md')}`;
    const title = titleLine.replace(/^#\s+/, '').trim();
    
    // Find summary snippet
    const snippetLine = lines.find(l => !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('|') && !l.startsWith('-') && !l.startsWith('`') && l.trim().length > 15);
    const snippet = snippetLine ? snippetLine.trim().slice(0, 110) + '...' : 'Detailed reference guide.';

    const relLink = `[${title}](./${cat.dir}/${file})`;
    indexContent += `| ${relLink} | \`references/${cat.dir}/${file}\` | ${snippet} |\n`;
  }
  indexContent += `\n---\n\n`;
}

// Add root craft references
indexContent += `## Root Craft & Governance Guidelines\n\n`;
indexContent += `| Guide | File Path | Focus Area |\n| :--- | :--- | :--- |\n`;
const rootGuides = [
  { file: 'accessibility.md', focus: 'WCAG 2.2 AA non-negotiable requirements and contrast rules' },
  { file: 'anti-slop-rules.md', focus: 'Top 12 AI design anti-patterns and concrete architectural fixes' },
  { file: 'backgrounds.md', focus: 'Master directory of interactive canvas shaders and React Bits components' },
  { file: 'code-audit.md', focus: 'Static code inspection search patterns, token grep checks, and replacement ledger' },
  { file: 'color-and-tokens.md', focus: 'Semantic color hierarchy, WCAG contrast tiers, light/dark mode pairs' },
  { file: 'cross-platform.md', focus: 'Platform translation between Apple HIG, Android Material, and Web' },
  { file: 'design-principles.md', focus: 'Core design philosophy: Clarity, Deference, Depth, Authenticity' },
  { file: 'design-review.md', focus: 'Evidence-based audit protocol and verification reporting' },
  { file: 'hig-lookup.md', focus: 'Apple HIG 123-topic index and routing guide' },
  { file: 'interaction-states.md', focus: 'Complete 8-state component matrix (default, hover, focus, active, disabled, loading, error, success)' },
  { file: 'layout-and-composition.md', focus: '8pt spatial grid, asymmetric visual weight, and content containment' },
  { file: 'motion.md', focus: 'Purposeful physics-based spring motion and cubic-bezier curves' },
  { file: 'platform-guidelines.md', focus: 'Host platform conventions for Web, macOS, iOS, and Mobile' },
  { file: 'reference-analysis.md', focus: 'Live reference reverse engineering and 16-section DESIGN.md protocol' },
  { file: 'responsive-design.md', focus: 'Viewport constraints, container queries, and fluid typography' },
  { file: 'typography.md', focus: 'Optical hierarchy, fluid scale formulas, line heights, and letter-spacing tracking' }
];

for (const g of rootGuides) {
  indexContent += `| [${g.file}](./${g.file}) | \`references/${g.file}\` | ${g.focus} |\n`;
}

fs.writeFileSync(path.join(referencesRoot, 'reference-index.md'), indexContent, 'utf8');
console.log('Successfully generated references/reference-index.md');

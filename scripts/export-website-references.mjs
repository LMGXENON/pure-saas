import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const referenceRoot = path.join(rootDir, 'skill', 'reference');
const targetFile = path.join(rootDir, 'pure-saas-website', 'src', 'data', 'referenceData.ts');

const categoryMetadata = {
  'core-playbooks': { name: 'Core Workflows & Playbooks', desc: 'Authoritative playbooks for design, review, cloning, and refinement' },
  'visual-craft': { name: 'Visual Craft & Polish', desc: 'Apple polish, materials blur, hairline borders, and typography tracking' },
  'components': { name: 'UI Components & Primitives', desc: '8-state matrices, WCAG 2.2 AA rules, and production component specs' },
  'layouts': { name: 'Layouts & Architecture', desc: 'SaaS dashboards, landing page heroes, pricing tables, and shells' },
  'design-systems': { name: 'Design Systems & Tokens', desc: '3-tier token hierarchies, OKLCH scales, and spatial grids' },
  'theming': { name: 'Theming & Surface Inversion', desc: 'Dark mode color inversion, CSS custom properties, and anti-flash' },
  'ux-patterns': { name: 'UX & Interaction Patterns', desc: 'Keyboard navigation, focus trapping, skeletons, and undo actions' },
  'frontend-engineering': { name: 'Frontend Engineering', desc: 'Headless primitives, compound components, and virtualization' },
  'accessibility': { name: 'Accessibility (WCAG 2.2 AA)', desc: 'Screen reader semantics, contrast ratios, and touch targets' },
  'responsive': { name: 'Responsive Systems', desc: 'Fluid typography clamp, mobile-first breakpoints, and ergonomics' },
  'backgrounds': { name: 'Interactive Shaders & Canvases', desc: 'Procedural Three.js, Canvas shaders, and animated backgrounds' },
  'real-world-flows': { name: 'Production Flows', desc: 'Auth, Stripe billing, tenant switcher, and audit logging' },
  'design-analysis': { name: 'Design Analysis & Reverse Eng.', desc: 'DOM extraction, screenshot breakdown, and visual deconstruction' },
  'developer-tooling': { name: 'Developer Tooling & Testing', desc: 'Token validation, contrast checking, and Playwright verification' },
  'frameworks': { name: 'Framework Guidelines', desc: 'React, Next.js, Vue, Svelte, Tailwind, and native platforms' },
  'hig': { name: 'Human Interface Guidelines', desc: 'Apple HIG patterns, liquid glass, typography, and layout rules' }
};

const allEntries = [];
const categoryCounts = {};

// 1. Process root-level playbooks in skill/reference/*.md
const rootFiles = fs.readdirSync(referenceRoot, { withFileTypes: true })
  .filter(e => e.isFile() && e.name.endsWith('.md'))
  .map(e => e.name)
  .sort();

for (const f of rootFiles) {
  const fullPath = path.join(referenceRoot, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  // Title
  const titleLine = lines.find(l => l.startsWith('# ')) || `# ${f.replace('.md', '')}`;
  const title = titleLine.replace(/^#\s+/, '').trim();

  // Summary
  const descLine = lines.find(l => l.startsWith('description:'));
  let summary = '';
  if (descLine) {
    summary = descLine.replace(/^description:\s*["']?/, '').replace(/["']?\s*$/, '').trim();
  } else {
    const textLine = lines.find(l => !l.startsWith('#') && !l.startsWith('---') && !l.startsWith('>') && !l.startsWith('|') && !l.startsWith('-') && !l.startsWith('`') && l.trim().length > 20);
    summary = textLine ? textLine.trim().slice(0, 160) : 'Authoritative workflow playbook and design specification.';
  }

  const catId = 'core-playbooks';
  categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;

  allEntries.push({
    id: `core-${path.basename(f, '.md')}`,
    category: catId,
    categoryName: categoryMetadata[catId].name,
    fileName: f,
    title,
    summary,
    path: `skill/reference/${f}`
  });
}

// 2. Process subdirectories in skill/reference/*/
const subdirs = fs.readdirSync(referenceRoot, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort();

for (const sub of subdirs) {
  const subDir = path.join(referenceRoot, sub);
  const files = fs.readdirSync(subDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  const catId = sub;
  const meta = categoryMetadata[catId] || { name: sub.replace(/-/g, ' ').toUpperCase(), desc: `${sub} reference collection` };

  for (const f of files) {
    const fullPath = path.join(subDir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');

    const titleLine = lines.find(l => l.startsWith('# ')) || `# ${f.replace('.md', '')}`;
    const title = titleLine.replace(/^#\s+/, '').trim();

    const descLine = lines.find(l => l.startsWith('description:'));
    let summary = '';
    if (descLine) {
      summary = descLine.replace(/^description:\s*["']?/, '').replace(/["']?\s*$/, '').trim();
    } else {
      const textLine = lines.find(l => !l.startsWith('#') && !l.startsWith('---') && !l.startsWith('>') && !l.startsWith('|') && !l.startsWith('-') && !l.startsWith('`') && l.trim().length > 20);
      summary = textLine ? textLine.trim().slice(0, 160) : 'Production-grade reference documentation and component guidance.';
    }

    categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;

    allEntries.push({
      id: `${catId}-${path.basename(f, '.md')}`,
      category: catId,
      categoryName: meta.name,
      fileName: f,
      title,
      summary,
      path: `skill/reference/${catId}/${f}`
    });
  }
}

const categories = Object.keys(categoryMetadata).map(id => ({
  id,
  name: categoryMetadata[id].name,
  count: categoryCounts[id] || 0,
  desc: categoryMetadata[id].desc
})).filter(c => c.count > 0);

const fileOutput = `// Auto-generated by scripts/export-website-references.mjs
// Single source of truth compiled from skill/reference/ (${allEntries.length} total documents)

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

export const referenceCategories: CategorySummary[] = ${JSON.stringify(categories, null, 2)};

export const allReferenceGuides: ReferenceGuide[] = ${JSON.stringify(allEntries, null, 2)};
`;

fs.writeFileSync(targetFile, fileOutput, 'utf8');
console.log(`✓ Exported ${allEntries.length} reference documents across ${categories.length} categories to ${targetFile}`);


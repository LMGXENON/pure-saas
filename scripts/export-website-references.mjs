import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const referencesRoot = path.resolve(__dirname, '../references');
const targetFile = path.resolve(__dirname, '../pure-saas-website/src/data/referenceData.ts');

const categories = [
  { id: 'components', name: 'UI Components & Primitives', count: 20, desc: '8-state matrices, WCAG 2.2 AA rules, and production TSX code' },
  { id: 'layouts', name: 'Layouts & Architecture', count: 12, desc: 'Dashboards, marketing heroes, pricing tables, and settings shells' },
  { id: 'design-systems', name: 'Design Systems & Tokens', count: 12, desc: '3-tier token hierarchies, OKLCH scales, and spatial grids' },
  { id: 'ux-patterns', name: 'UX & Interaction Patterns', count: 12, desc: 'Keyboard shortcuts, focus trapping, skeletons, and undo actions' },
  { id: 'visual-craft', name: 'Visual Craft & Polish', count: 10, desc: 'Apple polish, materials blur, hairline borders, and spring physics' },
  { id: 'frontend-engineering', name: 'Frontend Engineering', count: 12, desc: 'Compound components, headless primitives, and virtualization' },
  { id: 'accessibility', name: 'Accessibility (WCAG 2.2 AA)', count: 10, desc: 'Conformance matrices, screen readers, contrast, and touch targets' },
  { id: 'theming', name: 'Theming & Tokens', count: 8, desc: 'Dark mode color inversion, runtime CSS variables, and anti-flash' },
  { id: 'developer-tooling', name: 'Developer Tooling & CI', count: 8, desc: 'Token linting, Stylelint, visual regression, and contrast tests' },
  { id: 'real-world-flows', name: 'Real-World Production Flows', count: 10, desc: 'Authentication, Stripe billing, multi-tenancy, and audit logs' },
  { id: 'design-analysis', name: 'Design Analysis & Reverse Eng.', count: 6, desc: 'DOM extraction, screenshot breakdown, and completion gates' },
  { id: 'responsive', name: 'Responsive Design & Ergonomics', count: 6, desc: 'Mobile-first breakpoints, touch ergonomics, and fluid clamp' },
  { id: 'backgrounds', name: 'Interactive Shaders & Canvases', count: 15, desc: 'WebGL/Canvas shader components from React Bits' },
  { id: 'frameworks', name: 'Framework Guidelines', count: 22, desc: 'React, Next.js, Svelte, Vue, Tailwind, SwiftUI, Flutter, etc.' },
  { id: 'hig', name: 'Apple Human Interface Guidelines', count: 124, desc: 'Complete Apple HIG reference library' }
];

const allEntries = [];

for (const cat of categories) {
  const catDir = path.join(referencesRoot, cat.id);
  if (!fs.existsSync(catDir)) continue;

  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md')).sort();
  for (const f of files) {
    const fullPath = path.join(catDir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    const titleLine = lines.find(l => l.startsWith('# ')) || `# ${f.replace('.md', '')}`;
    const title = titleLine.replace(/^#\s+/, '').trim();
    
    // Find snippet
    const snippetLine = lines.find(l => !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('|') && !l.startsWith('-') && !l.startsWith('`') && l.trim().length > 20);
    const snippet = snippetLine ? snippetLine.trim().slice(0, 160) : 'Detailed reference guide.';

    allEntries.push({
      id: `${cat.id}-${path.basename(f, '.md')}`,
      category: cat.id,
      categoryName: cat.name,
      fileName: f,
      title,
      summary: snippet,
      path: `references/${cat.id}/${f}`
    });
  }
}

const fileOutput = `export interface ReferenceGuide {
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
console.log(`Generated ${allEntries.length} reference records in ${targetFile}`);

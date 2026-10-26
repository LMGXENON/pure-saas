import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const referencesRoot = path.resolve(__dirname, '../../references');

const targetSubdirs = [
  'components',
  'layouts',
  'design-systems',
  'ux-patterns',
  'visual-craft',
  'frontend-engineering',
  'accessibility',
  'theming',
  'developer-tooling',
  'real-world-flows',
  'design-analysis',
  'responsive'
];

let totalNewFiles = 0;
let errors = [];

for (const sub of targetSubdirs) {
  const dirPath = path.join(referencesRoot, sub);
  if (!fs.existsSync(dirPath)) {
    errors.push(`Missing expected subdirectory: ${sub}`);
    continue;
  }
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
  console.log(`Checking ${sub} (${files.length} files)...`);
  totalNewFiles += files.length;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check title
    if (!content.startsWith('# ')) {
      errors.push(`${sub}/${file}: Missing top-level # Title`);
    }

    // Check file size (must be substantive, not empty stub)
    if (content.length < 500) {
      errors.push(`${sub}/${file}: File too short (${content.length} bytes), potential stub`);
    }

    // Check markdown link integrity
    const linkMatches = content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    for (const match of linkMatches) {
      const href = match[2];
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
        continue;
      }
      const resolvedTarget = path.resolve(dirPath, href);
      if (!fs.existsSync(resolvedTarget)) {
        errors.push(`${sub}/${file}: Broken relative link to ${href}`);
      }
    }
  }
}

// Check master reference index
const indexPath = path.join(referencesRoot, 'reference-index.md');
if (!fs.existsSync(indexPath)) {
  errors.push('Missing references/reference-index.md');
} else {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const indexLinks = indexContent.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
  for (const match of indexLinks) {
    const href = match[2];
    if (href.startsWith('http') || href.startsWith('#')) continue;
    const resolved = path.resolve(referencesRoot, href);
    if (!fs.existsSync(resolved)) {
      errors.push(`reference-index.md: Broken link to ${href}`);
    }
  }
}

console.log(`\n========================================`);
console.log(`Total new reference files verified: ${totalNewFiles}`);
if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} errors:`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
} else {
  console.log(`All markdown files passed validation with zero errors!`);
}


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const referenceRoot = path.resolve(__dirname, '../skill/reference');

let totalFiles = 0;
let errors = [];

function validateDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const ent of entries) {
    const fullPath = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      validateDirectory(fullPath);
    } else if (ent.isFile() && ent.name.endsWith('.md')) {
      totalFiles++;
      const content = fs.readFileSync(fullPath, 'utf8');

      // Check title or YAML frontmatter
      if (!content.startsWith('# ') && !content.startsWith('---')) {
        errors.push(`${path.relative(referenceRoot, fullPath)}: Missing top-level # Title or YAML frontmatter`);
      }

      // Check file size (must be substantive, not empty stub)
      if (content.length < 200) {
        errors.push(`${path.relative(referenceRoot, fullPath)}: File too short (${content.length} bytes)`);
      }
    }
  }
}

if (!fs.existsSync(referenceRoot)) {
  console.error(`Error: Reference directory not found at ${referenceRoot}`);
  process.exit(1);
}

validateDirectory(referenceRoot);

console.log(`Validated ${totalFiles} reference documents in skill/reference`);

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} validation error(s):`);
  for (const err of errors.slice(0, 10)) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log('✓ All reference documents passed validation with zero errors!');
process.exit(0);


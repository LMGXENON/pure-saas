#!/usr/bin/env node

/**
 * Pure SaaS Comprehensive Test Suite
 * Tests references, build system, CLI commands, deterministic audits, and provider outputs.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const results = [];

function runTest(name, fn) {
  process.stdout.write(`• Testing ${name}... `);
  try {
    const res = fn();
    if (res === false) {
      console.log('✗ FAILED');
      results.push({ name, pass: false, error: 'Assertion failed' });
    } else {
      console.log('✓ PASS');
      results.push({ name, pass: true });
    }
  } catch (err) {
    console.log(`✗ FAILED (${err.message})`);
    results.push({ name, pass: false, error: err.message });
  }
}

function execCli(args) {
  const cliPath = path.join(rootDir, 'cli/bin/pure-saas.js');
  return spawnSync('node', [cliPath, ...args], { encoding: 'utf8', cwd: rootDir });
}

console.log('=== Pure SaaS Comprehensive Test Suite ===\n');

// 1. Reference Guides Integrity
runTest('Reference Guides Validation (skill/reference)', () => {
  const res = spawnSync('node', ['scripts/validate-references.mjs'], { encoding: 'utf8', cwd: rootDir });
  return res.status === 0;
});

// 2. Multi-Provider Build System
runTest('Multi-Provider Build Compilation', () => {
  const res = spawnSync('node', ['scripts/build.mjs'], { encoding: 'utf8', cwd: rootDir });
  if (res.status !== 0) return false;
  return fs.existsSync(path.join(rootDir, '.cursor/skills/pure-saas/SKILL.md')) &&
         fs.existsSync(path.join(rootDir, '.claude/skills/pure-saas/SKILL.md')) &&
         fs.existsSync(path.join(rootDir, '.gemini/skills/pure-saas/SKILL.md')) &&
         fs.existsSync(path.join(rootDir, '.agents/skills/pure-saas/SKILL.md'));
});

// 3. CLI: Context Command
runTest('CLI: "pure-saas context --json"', () => {
  const res = execCli(['context', '--json']);
  if (res.status !== 0) return false;
  const parsed = JSON.parse(res.stdout);
  return parsed.framework && parsed.styling && parsed.mode;
});

// 4. CLI: Doctor Command
runTest('CLI: "pure-saas doctor --json"', () => {
  const res = execCli(['doctor', '--json']);
  if (res.status !== 0) return false;
  const parsed = JSON.parse(res.stdout);
  return Array.isArray(parsed.checks) && parsed.checks.length >= 4;
});

// 5. CLI: DESIGN.md Validation & Contrast
runTest('CLI: "pure-saas validate" & "pure-saas contrast"', () => {
  const val = execCli(['validate', 'DESIGN.md']);
  const con = execCli(['contrast', 'DESIGN.md']);
  return val.status === 0 && con.status === 0;
});

// 6. CLI: Deterministic Audit
runTest('CLI: "pure-saas audit --json"', () => {
  const res = execCli(['audit', '--json']);
  if (res.status !== 0) return false;
  const parsed = JSON.parse(res.stdout);
  return parsed.totalScore !== undefined && parsed.dimensions && parsed.dimensions.accessibility;
});

// 7. CLI: Browser Environment Check
runTest('CLI: "pure-saas browser check"', () => {
  const res = execCli(['browser', 'check']);
  return res.status === 0 && res.stdout.includes('Browser Environment Check');
});

// 8. CLI: 3D Prerequisites Check
runTest('CLI: "pure-saas 3d check" (Reports true state)', () => {
  const res = execCli(['3d', 'check']);
  // Exits with 1 or 0 depending on installed packages, but must output real diagnostic
  return res.stdout.includes('Procedural Three.js') && res.stdout.includes('Node.js:');
});

// 9. CLI: 3D Scaffolding Component Generation
runTest('CLI: "pure-saas 3d scaffold" generates valid TypeScript', () => {
  const tempOut = path.join(rootDir, '.test-tmp', 'TestModel.tsx');
  fs.mkdirSync(path.dirname(tempOut), { recursive: true });
  const res = execCli(['3d', 'scaffold', 'TestModel', '--out', tempOut]);
  if (res.status !== 0 || !fs.existsSync(tempOut)) return false;
  const content = fs.readFileSync(tempOut, 'utf8');
  fs.unlinkSync(tempOut);
  return content.includes('createTestModelModel') && content.includes('userData:');
});

// 10. CLI: Style Registry List & Info
runTest('CLI: "pure-saas style list" & "pure-saas style info"', () => {
  const list = execCli(['style', 'list']);
  const info = execCli(['style', 'info', 'minimalism-swiss']);
  return list.status === 0 && info.status === 0 && info.stdout.includes('Minimalism & Swiss');
});

// 11. Command Discovery & Architecture
runTest('Command Discovery (.claude/commands, .cursor/commands, commands)', () => {
  const requiredCommands = [
    'puresaas.md',
    'puresaas/design.md',
    'puresaas/polish.md',
    'puresaas/review.md',
    'puresaas/clone.md',
    'puresaas/responsive.md'
  ];

  const searchRoots = [
    path.join(rootDir, '.claude/commands'),
    path.join(rootDir, '.cursor/commands'),
    path.join(rootDir, 'commands'),
    path.join(rootDir, 'skill/commands')
  ];

  for (const root of searchRoots) {
    for (const cmd of requiredCommands) {
      const full = path.join(root, cmd);
      if (!fs.existsSync(full)) {
        throw new Error(`Missing command file: ${path.relative(rootDir, full)}`);
      }
      const content = fs.readFileSync(full, 'utf8');
      if (!content.includes('description:')) {
        throw new Error(`Missing frontmatter description in ${path.relative(rootDir, full)}`);
      }
      if (!content.includes('skill/reference/')) {
        throw new Error(`Command does not reference shared playbooks: ${path.relative(rootDir, full)}`);
      }
    }
  }
  return true;
});

// 12. CLI: Six Independent Slash Commands (puresaas, puresaas:design, puresaas:polish, puresaas:review, puresaas:clone, puresaas:responsive)
runTest('CLI: Execution of the Six Independent Slash Commands', () => {
  const orchestrator = execCli(['puresaas', 'Full product landing page']);
  const design = execCli(['puresaas:design', 'Minimalism Swiss SaaS Brief']);
  const polish = execCli(['puresaas:polish', 'Hero section']);
  const review = execCli(['puresaas:review', 'src/components']);
  const clone = execCli(['puresaas:clone', 'https://example.com']);
  const responsive = execCli(['puresaas:responsive', 'Mobile breakpoint 375px']);

  // Clean up any test reference record
  if (fs.existsSync(path.join(rootDir, 'reference-record.md'))) {
    fs.unlinkSync(path.join(rootDir, 'reference-record.md'));
  }

  // Also test leading slash invocation (/puresaas:polish)
  const slashPolish = execCli(['/puresaas:polish']);

  return orchestrator.status === 0 && orchestrator.stdout.includes('Principal Designer & Main Orchestrator') &&
         design.status === 0 && design.stdout.includes('Creative Director & Builder') &&
         polish.status === 0 && polish.stdout.includes('Senior Visual Designer') &&
         review.status === 0 && review.stdout.includes('Independent Design Critic') &&
         clone.status === 0 && clone.stdout.includes('Reference Analyst & Cloning Engineer') &&
         responsive.status === 0 && responsive.stdout.includes('Responsive Systems Engineer') &&
         slashPolish.status === 0 && slashPolish.stdout.includes('Senior Visual Designer');
});

// 13. CLI: Help Flag Handling
runTest('CLI: Subcommand --help flags print guidance without failing', () => {
  const subcommands = ['init', 'audit', 'browser', '3d', 'style', 'context', 'doctor'];
  for (const sub of subcommands) {
    const res = execCli([sub, '--help']);
    if (res.status !== 0 || !res.stdout.includes('Usage:')) {
      return false;
    }
  }
  return true;
});

// 14. Cursor Native Rules (.cursor/rules/*.mdc)
runTest('Cursor Native Rules (.cursor/rules/*.mdc)', () => {
  const cursorRules = [
    'puresaas.mdc',
    'puresaas-design.mdc',
    'puresaas-polish.mdc',
    'puresaas-review.mdc',
    'puresaas-clone.mdc',
    'puresaas-responsive.mdc'
  ];
  const rulesDir = path.join(rootDir, '.cursor/rules');
  for (const rule of cursorRules) {
    const full = path.join(rulesDir, rule);
    if (!fs.existsSync(full)) {
      throw new Error(`Missing Cursor rule file: ${rule}`);
    }
    const content = fs.readFileSync(full, 'utf8');
    if (!content.includes('alwaysApply: false') || !content.includes('description:')) {
      throw new Error(`Invalid Cursor rule frontmatter in ${rule}`);
    }
  }
  return true;
});

// 15. Repository-Wide Markdown Link & Reference Integrity
runTest('Repository-Wide Markdown Link Resolution', () => {
  const broken = [];
  function checkLinks(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\`\`\`[\s\S]*?\`\`\`/g, '');
    content = content.replace(/\`[^\`]*\`/g, '');

    const regex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const raw = match[2].trim().split('#')[0].split('?')[0];
      if (!raw || raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('mailto:') || raw.startsWith('#')) {
        continue;
      }
      let resolved = raw.startsWith('/') ? path.join(rootDir, raw) : path.resolve(path.dirname(filePath), raw);
      const rootResolved = path.resolve(rootDir, raw);
      if (!fs.existsSync(resolved) && !fs.existsSync(rootResolved)) {
        broken.push(`${path.relative(rootDir, filePath)} -> ${raw}`);
      }
    }
  }

  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === '.test-tmp') continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.name.endsWith('.md')) checkLinks(full);
    }
  }

  walk(rootDir);
  if (broken.length > 0) {
    throw new Error(`Found broken link targets: \n  - ${broken.join('\n  - ')}`);
  }
  return true;
});

console.log('\n========================================');
const passedCount = results.filter(r => r.pass).length;
console.log(`Results: ${passedCount} / ${results.length} tests passed.\n`);

if (passedCount === results.length) {
  console.log('✓ All Pure SaaS test suites passed successfully!');
  process.exit(0);
} else {
  console.error('✗ Some tests failed.');
  process.exit(1);
}


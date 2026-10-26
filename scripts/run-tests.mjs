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
runTest('Reference Guides Validation (129 files)', () => {
  const res = spawnSync('node', ['scripts/generators/validate-references.mjs'], { encoding: 'utf8', cwd: rootDir });
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

// 11. CLI: Specialist Verbs
runTest('CLI: Specialist Verbs (bolder, typeset, landing, polish)', () => {
  const verbs = ['bolder', 'typeset', 'landing', 'polish', 'quieter', 'harden', 'layout'];
  for (const v of verbs) {
    const res = execCli([v]);
    if (res.status !== 0 || !res.stdout.includes(`Pure SaaS Specialist Action: ${v.toUpperCase()}`)) {
      return false;
    }
  }
  return true;
});

// 12. CLI: Help Flag Handling
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

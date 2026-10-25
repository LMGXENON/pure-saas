import { test } from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { runCli, scanSourceDirectory, parseFrontmatter } from '../../scripts/pure-saas.mjs';
import fs from 'node:fs';

test('CLI: Validate command exits 0 on valid design file', async () => {
  const code = await runCli(['validate', 'tests/fixtures/valid-design.md']);
  assert.strictEqual(code, 0, 'Exit code must be 0 for valid file');
});

test('CLI: Validate command exits 1 on missing or invalid file', async () => {
  const codeMissing = await runCli(['validate', 'tests/fixtures/nonexistent-file.md']);
  assert.strictEqual(codeMissing, 1, 'Exit code must be 1 for missing file');

  const codeInvalid = await runCli(['validate', 'tests/fixtures/invalid-design-missing-tokens.md']);
  assert.strictEqual(codeInvalid, 1, 'Exit code must be 1 for invalid tokens');

  const codeBadStatus = await runCli(['validate', 'tests/fixtures/invalid-design-bad-status.md']);
  assert.strictEqual(codeBadStatus, 1, 'Exit code must be 1 for invalid status');

  const codeMalformed = await runCli(['validate', 'tests/fixtures/malformed-yaml.md']);
  assert.strictEqual(codeMalformed, 1, 'Exit code must be 1 for malformed YAML');
});

test('CLI: Source scan ignores comments and does not produce false positives', () => {
  const fixtureDesign = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const raw = fs.readFileSync(fixtureDesign, 'utf8');
  const { data } = parseFrontmatter(raw);

  const srcDir = path.resolve(process.cwd(), 'tests/fixtures/test-src');
  const scan = scanSourceDirectory(srcDir, data.tokens);

  // false-positive-comment.css has a commented #ff00ea, an EXC-002, and pure-saas-ignore.
  // None of those should appear in rawColorViolations.
  const hasCommentViolation = scan.rawColorViolations.some(v => v.value === '#ff00ea' || v.value === '#ffaa00' || v.value === '#000000');
  assert.strictEqual(hasCommentViolation, false, 'Must not flag hex colors in comments or approved exceptions');
});

test('CLI: Source scan handles complex TypeScript syntax without errors', () => {
  const fixtureDesign = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const raw = fs.readFileSync(fixtureDesign, 'utf8');
  const { data } = parseFrontmatter(raw);

  const srcDir = path.resolve(process.cwd(), 'tests/fixtures/test-src');
  const scan = scanSourceDirectory(srcDir, data.tokens);

  assert.ok(scan.scannedFiles >= 6, 'Must scan TypeScript files as well');
});

test('CLI: Style command returns matching design styles', async () => {
  const code = await runCli(['style', 'developer']);
  assert.strictEqual(code, 0, 'Exit code must be 0 for valid style query');
});

test('CLI: Source scan detects raw color violations and anti-slop patterns', () => {
  const fixtureDesign = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const raw = fs.readFileSync(fixtureDesign, 'utf8');
  const { data } = parseFrontmatter(raw);

  const srcDir = path.resolve(process.cwd(), 'tests/fixtures/test-src');
  const scan = scanSourceDirectory(srcDir, data.tokens);

  assert.ok(scan.scannedFiles >= 4, 'Must scan all files in test-src');
  assert.ok(scan.rawColorViolations.length >= 2, 'Must detect unapproved raw hex colors (#ff00ff, #123456)');
  assert.ok(scan.paletteClassViolations.length >= 2, 'Must detect Tailwind palette classes (bg-blue-500, text-slate-700)');
  assert.ok(scan.arbitraryDimensionViolations.length >= 2, 'Must detect arbitrary bracket dimensions (p-[17px], rounded-[11px])');
  assert.ok(scan.unresolvedTokenRefs.length >= 2, 'Must detect unresolved CSS variables');
  assert.ok(scan.antiSlopWarnings.length >= 1, 'Must detect generic purple gradient and emoji icons');
});

test('CLI: Help and version flags execute successfully', async () => {
  assert.strictEqual(await runCli(['--help']), 0);
  assert.strictEqual(await runCli(['--version']), 0);
});


import { test } from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { runCli, scanSourceDirectory, parseFrontmatter, queryDesignIntelligence } from '../../scripts/pure-saas.mjs';
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

  const codeProduct = await runCli(['style', '--product', 'saas']);
  assert.strictEqual(codeProduct, 0, 'Exit code must be 0 for --product query');

  const codeStack = await runCli(['style', '--stack', 'react']);
  assert.strictEqual(codeStack, 0, 'Exit code must be 0 for --stack query');

  const codeJson = await runCli(['style', '--json']);
  assert.strictEqual(codeJson, 0, 'Exit code must be 0 for --json query');
});

test('CLI: queryDesignIntelligence API resolves styles, products, and stacks', () => {
  const result = queryDesignIntelligence({ product: 'fintech', stack: 'tailwind' });
  assert.ok(result.styles.length > 0, 'Must return available design styles');
  assert.ok(result.product !== null, 'Must resolve fintech product archetype');
  assert.strictEqual(result.product.id, 'fintech');
  assert.ok(result.stack !== null, 'Must resolve tailwind stack guidance');
  assert.strictEqual(result.stack.id, 'tailwind');
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

test('CLI: Init command creates complete starter project and supports --reference', async () => {
  const tmpDir = path.resolve(process.cwd(), 'tests/fixtures/.tmp-init-test');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const originalCwd = process.cwd();
  try {
    process.chdir(tmpDir);

    // 1. Run init --reference
    const code = await runCli(['init', '--reference']);
    assert.strictEqual(code, 0, 'init --reference must exit with 0');
    assert.ok(fs.existsSync(path.join(tmpDir, 'DESIGN.md')), 'DESIGN.md must be created');
    assert.ok(fs.existsSync(path.join(tmpDir, 'design-brief.md')), 'design-brief.md must be created');
    assert.ok(fs.existsSync(path.join(tmpDir, 'reference-record.md')), 'reference-record.md must be created');

    // 2. Validate created files
    const designValid = await runCli(['validate', 'DESIGN.md']);
    assert.strictEqual(designValid, 0, 'Initialized DESIGN.md must pass validation');

    const briefValid = await runCli(['validate', 'design-brief.md']);
    assert.strictEqual(briefValid, 0, 'Initialized design-brief.md must pass validation');

    // 3. Second init must warn and exit 1 (no accidental overwrite)
    const secondCode = await runCli(['init']);
    assert.strictEqual(secondCode, 1, 'init must prevent accidental overwrite of existing DESIGN.md');
  } finally {
    process.chdir(originalCwd);
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});


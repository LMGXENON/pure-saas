import { test } from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import {
  validateDesignDocument,
  exportTokens,
  REQUIRED_COLOR_ROLES,
  parseFrontmatter
} from '../../scripts/pure-saas.mjs';
import fs from 'node:fs';

test('Tokens: Validates complete semantic color tokens in valid fixture', () => {
  const fixturePath = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const result = validateDesignDocument(fixturePath);

  assert.strictEqual(result.valid, true, 'Valid design fixture must pass validation');
  assert.strictEqual(result.issues.length, 0, 'Valid fixture should have 0 issues');
  assert.strictEqual(result.status, 'approved');
});

test('Tokens: Detects missing required color tokens', () => {
  const invalidPath = path.resolve(process.cwd(), 'tests/fixtures/invalid-design-missing-tokens.md');
  const result = validateDesignDocument(invalidPath);

  assert.strictEqual(result.valid, false, 'Incomplete fixture must fail validation');
  assert.ok(result.issues.length > 0, 'Must report missing token issues');

  const hasMissingColorError = result.issues.some(issue => issue.includes('Missing required semantic color token'));
  assert.ok(hasMissingColorError, 'Must explicitly flag missing color tokens');
});

test('Tokens: Exports tokens to CSS, Tailwind, and JSON correctly', () => {
  const fixturePath = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const raw = fs.readFileSync(fixturePath, 'utf8');
  const { data } = parseFrontmatter(raw);

  // CSS export
  const css = exportTokens(data, 'css');
  assert.ok(css.includes(':root {'), 'CSS export must wrap in :root');
  assert.ok(css.includes('--color-bg-canvas: #ffffff;'), 'CSS export must define --color-bg-canvas');
  assert.ok(css.includes('--space-1: 4px;'), 'CSS export must export spacing');

  // Tailwind export
  const tailwind = exportTokens(data, 'tailwind');
  assert.ok(tailwind.includes('module.exports ='), 'Tailwind export must export CommonJS config');
  assert.ok(tailwind.includes('"color-bg-canvas": "var(--color-bg-canvas, #ffffff)"'), 'Tailwind colors must reference CSS variables with fallbacks');

  // JSON export
  const json = exportTokens(data, 'json');
  const parsed = JSON.parse(json);
  assert.ok(parsed.colors, 'JSON export must include colors object');
  assert.strictEqual(parsed.colors['color-bg-canvas'], '#ffffff');
});


import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import {
  validateDesignDocument,
  scanSourceDirectory,
  parseFrontmatter
} from '../../scripts/pure-saas.mjs';

const SUPASTE_DIR = path.resolve(process.cwd(), 'examples/supaste-website');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HAS_CHROME = fs.existsSync(CHROME_PATH);
const CHROME_CMD = process.platform === 'darwin'
  ? `arch -arm64 "${CHROME_PATH}"`
  : `"${CHROME_PATH}"`;

test('Supaste Website: DESIGN.md schema and status validation', () => {
  const designPath = path.join(SUPASTE_DIR, 'DESIGN.md');
  const result = validateDesignDocument(designPath);
  assert.strictEqual(result.valid, true, 'Supaste DESIGN.md must be fully valid');
  assert.strictEqual(result.status, 'approved', 'Status must be approved');
  assert.ok(result.tokensFound >= 18, 'Must declare comprehensive semantic tokens');
});

test('Supaste Website: WCAG 2.2 AA contrast compliance', () => {
  const designPath = path.join(SUPASTE_DIR, 'DESIGN.md');
  const validation = validateDesignDocument(designPath);
  const audit = validation.contrastAudit;
  assert.ok(audit, 'Contrast audit must run');
  assert.ok(audit.auditedPairs >= 8, 'Must audit key semantic pairs');
  assert.strictEqual(audit.failedAA, 0, 'Must have zero WCAG AA failures');
});

test('Supaste Website: 0 raw colors, 0 anti-slop violations, 0 unresolved tokens', () => {
  const designPath = path.join(SUPASTE_DIR, 'DESIGN.md');
  const { data } = parseFrontmatter(fs.readFileSync(designPath, 'utf8'));
  const scan = scanSourceDirectory(SUPASTE_DIR, data.tokens || {});

  assert.strictEqual(scan.rawColorViolations.length, 0, 'Must have 0 raw color violations');
  assert.strictEqual(scan.unresolvedTokenRefs.length, 0, 'Must have 0 unresolved token references');
  assert.strictEqual(scan.antiSlopWarnings.length, 0, 'Must have 0 anti-slop violations');
});

test('Supaste Website: Authentic content and section structure', () => {
  const html = fs.readFileSync(path.join(SUPASTE_DIR, 'index.html'), 'utf8');

  // Verify core sections and messaging
  assert.ok(html.includes('Copy once. <em>Reuse anytime.</em>'), 'Must contain exact authentic headline');
  assert.ok(html.includes('Your clipboard, wherever you need it'), 'Must contain value proposition section');
  assert.ok(html.includes('One price. Lifetime access.'), 'Must contain pricing section headline');
  assert.ok(html.includes('Frequently Asked Questions'), 'Must contain FAQ section');
  assert.ok(html.includes('Your smart second Dock'), 'Must contain Cooldock spotlight');
  assert.ok(html.includes('notch-shelf-simulator'), 'Must contain interactive MacBook notch simulator');
  assert.ok(html.includes('assets/app-icon.png'), 'Must reference downloaded authentic app icon');
  assert.ok(html.includes('assets/hero-screenshot.jpeg'), 'Must reference hero screenshot');
});

test('Supaste Website: Headless Chrome responsive render across viewports', (t) => {
  if (!HAS_CHROME) {
    t.skip('Google Chrome not detected on system; skipping visual screenshot verification.');
    return;
  }

  const htmlPath = path.join(SUPASTE_DIR, 'index.html');
  const fileUrl = encodeURI(`file://${htmlPath}`);
  const outDir = path.join(SUPASTE_DIR, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const shotPath = path.join(outDir, `${vp.name}.png`);
    const tmpProfile = path.join(outDir, `.profile-${vp.name}`);
    const cmd = `${CHROME_CMD} --headless=new --disable-gpu --no-sandbox --user-data-dir="${tmpProfile}" --window-size=${vp.width},${vp.height} --screenshot="${shotPath}" "${fileUrl}"`;
    try {
      execSync(cmd, { stdio: 'pipe', timeout: 20000 });
      assert.ok(fs.existsSync(shotPath), `${vp.name} screenshot must be created`);
      const stat = fs.statSync(shotPath);
      assert.ok(stat.size > 20000, `${vp.name} screenshot must have non-trivial content size`);
    } finally {
      fs.rmSync(tmpProfile, { recursive: true, force: true });
    }
  }
});

import { test } from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import fs from 'node:fs';
import {
  parseFrontmatter,
  validateDesignDocument,
  calculateContrastRatio,
  auditColorContrast,
  diffDesignTokens,
  detectDesignDrift,
  exportTokens,
  generateDesignSystem,
  queryDesignIntelligence,
  scanSourceDirectory,
  runCli
} from '../../scripts/pure-saas.mjs';

test('Unified Integration: WCAG Color Contrast Calculation and Audit', () => {
  // Test mathematical contrast ratio
  const ratioBlackOnWhite = calculateContrastRatio('#000000', '#ffffff');
  assert.strictEqual(ratioBlackOnWhite, 21);

  const ratioTextOnCanvas = calculateContrastRatio('#111827', '#ffffff');
  assert.ok(ratioTextOnCanvas >= 15, `Text ratio ${ratioTextOnCanvas} must exceed 15:1`);

  const audit = auditColorContrast({
    'color-bg-canvas': '#ffffff',
    'color-bg-surface': '#f9fafb',
    'color-text-primary': '#111827',
    'color-text-secondary': '#4b5563',
    'color-action-primary': '#2563eb',
    'color-text-inverse': '#ffffff',
    'color-status-error': '#dc2626',
    'color-status-success': '#16a34a'
  });

  assert.ok(audit.auditedPairs >= 6, 'Must audit all critical UI pairs');
  assert.ok(audit.passedAA >= 5, 'Majority of default tokens must satisfy WCAG 2.2 AA');

  const textPrimary = audit.results.find(r => r.fgToken === 'color-text-primary' && r.bgToken === 'color-bg-canvas');
  assert.ok(textPrimary.passAA, 'Primary text must pass AA');
  assert.ok(textPrimary.passAAA, 'Primary text must pass AAA');
});

test('Unified Integration: Token Diffing accurately detects added, removed, and changed tokens', () => {
  const beforeTokens = {
    colors: {
      'color-bg-canvas': '#ffffff',
      'color-text-primary': '#000000'
    },
    spacing: {
      'space-1': '4px'
    }
  };

  const afterTokens = {
    colors: {
      'color-bg-canvas': '#f9fafb', // changed
      'color-text-primary': '#000000', // unchanged
      'color-action-primary': '#2563eb' // added
    }
    // spacing removed
  };

  const diff = diffDesignTokens(beforeTokens, afterTokens);
  assert.strictEqual(diff.totalChanges, 3, 'Must detect exactly 3 changes');

  const added = diff.changes.find(c => c.path === 'colors.color-action-primary');
  assert.strictEqual(added.change, 'added');
  assert.strictEqual(added.after, '#2563eb');

  const changed = diff.changes.find(c => c.path === 'colors.color-bg-canvas');
  assert.strictEqual(changed.change, 'changed');
  assert.strictEqual(changed.before, '#ffffff');
  assert.strictEqual(changed.after, '#f9fafb');

  const removed = diff.changes.find(c => c.path === 'spacing.space-1');
  assert.strictEqual(removed.change, 'removed');
  assert.strictEqual(removed.before, '4px');
});

test('Unified Integration: Design Drift Detection flags discrepancies between observed UI and tokens', () => {
  const tokens = {
    colors: {
      'color-bg-canvas': '#ffffff',
      'color-text-primary': '#111827'
    }
  };

  const observations = {
    version: 1,
    source: { url: 'https://staging.myapp.com', captured: '2026-10-26' },
    observations: [
      { path: 'colors.color-bg-canvas', value: '#ffffff', location: 'body', state: 'default', mode: 'light' },
      { path: 'colors.color-text-primary', value: '#666666', location: 'h1', state: 'default', mode: 'light' } // drifted
    ]
  };

  const drift = detectDesignDrift(tokens, observations);
  assert.strictEqual(drift.observed, 2);
  assert.strictEqual(drift.matches, 1);
  assert.strictEqual(drift.differences, 1);

  const driftedItem = drift.results.find(r => r.path === 'colors.color-text-primary');
  assert.strictEqual(driftedItem.result, 'drift');
  assert.strictEqual(driftedItem.expected, '#111827');
  assert.strictEqual(driftedItem.observed, '#666666');
});

test('Unified Integration: Token Exporter produces valid DTCG 2025.10 and Tailwind v4 formats', () => {
  const fixturePath = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const raw = fs.readFileSync(fixturePath, 'utf8');
  const { data } = parseFrontmatter(raw);

  // DTCG 2025.10 Export
  const dtcg = exportTokens(data, 'dtcg');
  const parsedDtcg = JSON.parse(dtcg);
  assert.ok(parsedDtcg.$schema.includes('2025.10'), 'Must declare DTCG 2025.10 schema');
  assert.ok(parsedDtcg.color['color-bg-canvas'], 'Must have color-bg-canvas token');
  assert.strictEqual(parsedDtcg.color['color-bg-canvas'].$type, 'color');
  assert.strictEqual(parsedDtcg.color['color-bg-canvas'].$value, '#ffffff');
  assert.strictEqual(parsedDtcg.spacing['space-1'].$type, 'dimension');
  assert.strictEqual(parsedDtcg.spacing['space-1'].$value, '4px');

  // Tailwind v4 Export
  const tw4 = exportTokens(data, 'tailwind-v4');
  assert.ok(tw4.includes('@theme inline {'), 'Tailwind v4 export must use @theme inline block');
  assert.ok(tw4.includes('--color-bg-canvas: #ffffff;'), 'Must export CSS theme variables');
  assert.ok(tw4.includes('--spacing-space-1: 4px;'), 'Must export spacing variables');
});

test('Unified Integration: Programmatic Design System Generator resolves intelligence and produces valid DESIGN.md', () => {
  const generatedDoc = generateDesignSystem({
    product: 'fintech',
    variance: 8,
    motion: 9,
    density: 8,
    name: 'Fintech High Velocity Console'
  });

  assert.ok(generatedDoc.includes('name: "Fintech High Velocity Console"'));
  assert.ok(generatedDoc.includes('product_archetype:'));
  assert.ok(generatedDoc.includes('variance: 8'));
  assert.ok(generatedDoc.includes('density: 8'));
  assert.ok(generatedDoc.includes('motion: 9'));
  assert.ok(generatedDoc.includes('color-bg-canvas:'));
  assert.ok(generatedDoc.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'High motion dial must apply spring curve');
  assert.ok(generatedDoc.includes('space-1: "2px"'), 'High density dial must compress spacing scale');

  // Verify that the generated document passes full Pure SaaS validation!
  const tmpFile = path.resolve(process.cwd(), 'tests/fixtures/.tmp-generated-design.md');
  fs.writeFileSync(tmpFile, generatedDoc, 'utf8');
  try {
    const validation = validateDesignDocument(tmpFile);
    assert.strictEqual(validation.valid, true, 'Generated design system must satisfy all validation rules');
    assert.strictEqual(validation.status, 'approved');
    assert.ok(validation.tokensFound >= 10, 'Must contain all required tokens');
    assert.ok(validation.unresolvedItems.length >= 2, 'Must record explicit unresolved design questions');
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('Unified Integration: Multi-Domain Design Intelligence query returns colors, UX, landing, and app patterns', () => {
  // Query colors
  const colorRes = queryDesignIntelligence({ domain: 'color', query: 'saas' });
  assert.ok(colorRes.colors.length > 0, 'Must find matching color palettes');
  assert.ok(colorRes.colors[0].primary, 'Color entry must have primary token');

  // Query UX heuristics
  const uxRes = queryDesignIntelligence({ domain: 'ux', query: 'scroll' });
  assert.ok(uxRes.ux.length > 0, 'Must find UX guidelines for scroll');
  assert.ok(uxRes.ux[0].do, 'UX guideline must have Do recommendations');
  assert.ok(uxRes.ux[0].dont, 'UX guideline must have Dont anti-patterns');

  // Query landing page patterns
  const landingRes = queryDesignIntelligence({ domain: 'landing', query: 'hero' });
  assert.ok(landingRes.landing.length > 0, 'Must find landing page patterns');
  assert.ok(landingRes.landing[0].sectionOrder, 'Landing pattern must specify section order');

  // Auto-detect domain
  const autoRes = queryDesignIntelligence({ query: 'typography' });
  assert.ok(autoRes.typography.length > 0, 'Must auto-detect typography queries');
});

test('Unified Integration: Source code scan with Known Technical Debt baseline suppresses known defects', () => {
  const fixtureDesign = path.resolve(process.cwd(), 'tests/fixtures/valid-design.md');
  const raw = fs.readFileSync(fixtureDesign, 'utf8');
  const { data } = parseFrontmatter(raw);

  const srcDir = path.resolve(process.cwd(), 'tests/fixtures/test-src');

  // 1. Initial scan without baseline
  const initialScan = scanSourceDirectory(srcDir, data.tokens);
  assert.ok(initialScan.rawColorViolations.length >= 2, 'Raw violations exist');

  // 2. Create known baseline file
  const knownFile = path.resolve(process.cwd(), 'tests/fixtures/.tmp-known-defects.json');
  try {
    scanSourceDirectory(srcDir, data.tokens, {
      known: knownFile,
      updateKnown: true
    });

    assert.ok(fs.existsSync(knownFile), 'Known baseline file must be written');

    // 3. Scan with known baseline active
    const baselineScan = scanSourceDirectory(srcDir, data.tokens, {
      known: knownFile
    });

    assert.strictEqual(baselineScan.newViolations.length, 0, 'All violations should be recognized as known technical debt');
    assert.ok(baselineScan.knownViolations.length >= 2, 'Known violations must be tracked');
    assert.strictEqual(baselineScan.fixedKnownDefects.length, 0, 'No known defects fixed yet');
  } finally {
    if (fs.existsSync(knownFile)) fs.unlinkSync(knownFile);
  }
});

test('Unified Integration: CLI commands contrast, diff, drift, and design-system execute cleanly', async () => {
  // CLI contrast
  const codeContrast = await runCli(['contrast', 'tests/fixtures/valid-design.md']);
  assert.strictEqual(codeContrast, 0, 'Contrast command must exit 0 when AA passes');

  // CLI diff
  const codeDiff = await runCli(['diff', 'tests/fixtures/valid-design.md', 'tests/fixtures/valid-design.md']);
  assert.strictEqual(codeDiff, 0, 'Diff command must exit 0');

  // CLI design-system
  const codeDs = await runCli(['design-system', '--product', 'developer-tool', '--variance', '7']);
  assert.strictEqual(codeDs, 0, 'Design system generation CLI must exit 0');
});

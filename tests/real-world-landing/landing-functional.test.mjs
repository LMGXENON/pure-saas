import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execSync } from 'node:child_process';
import {
  validateDesignDocument,
  auditColorContrast,
  scanSourceDirectory,
  parseFrontmatter
} from '../../scripts/pure-saas.mjs';

const LANDING_DIR = path.resolve(process.cwd(), 'tests/real-world-landing');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HAS_CHROME = fs.existsSync(CHROME_PATH);
const CHROME_CMD = process.platform === 'darwin'
  ? `arch -arm64 "${CHROME_PATH}"`
  : `"${CHROME_PATH}"`;

test('Real-World Landing: DESIGN.md schema and status validation', () => {
  const designPath = path.join(LANDING_DIR, 'DESIGN.md');
  const result = validateDesignDocument(designPath);
  assert.strictEqual(result.valid, true, 'Landing DESIGN.md must be fully valid');
  assert.strictEqual(result.status, 'approved', 'Status must be approved');
});

test('Real-World Landing: WCAG 2.2 AA and AAA contrast compliance', () => {
  const designPath = path.join(LANDING_DIR, 'DESIGN.md');
  const validation = validateDesignDocument(designPath);
  const audit = validation.contrastAudit;
  assert.ok(audit, 'Contrast audit must run');
  assert.ok(audit.auditedPairs >= 8, 'Must audit key semantic pairs');
  assert.strictEqual(audit.failedAA, 0, 'Must have 0 WCAG AA failures');
  assert.strictEqual(audit.passedAA, audit.auditedPairs, 'All pairs must pass AA');
});

test('Real-World Landing: 0 raw colors, 0 anti-slop violations, 0 unresolved tokens', () => {
  const designPath = path.join(LANDING_DIR, 'DESIGN.md');
  const { data } = parseFrontmatter(fs.readFileSync(designPath, 'utf8'));
  const scan = scanSourceDirectory(LANDING_DIR, data.tokens || {});

  assert.strictEqual(scan.rawColorViolations.length, 0, 'Must have zero raw color violations');
  assert.strictEqual(scan.unresolvedTokenRefs.length, 0, 'Must have zero unresolved token references');
  assert.strictEqual(scan.antiSlopWarnings.length, 0, 'Must have zero anti-slop violations');
});

test('Real-World Landing: Interactive client logic and state transitions', () => {
  const appCode = fs.readFileSync(path.join(LANDING_DIR, 'app.js'), 'utf8');

  // Set up mock DOM environment
  const mockElements = new Map();
  const getOrCreate = (id) => {
    if (!mockElements.has(id)) {
      mockElements.set(id, {
        id,
        listeners: {},
        textContent: '',
        innerHTML: '',
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        setAttribute(k, v) { this[k] = v; },
        getAttribute(k) { return this[k]; },
        addEventListener(event, fn) {
          this.listeners[event] = this.listeners[event] || [];
          this.listeners[event].push(fn);
        },
        dispatchEvent(event) {
          (this.listeners[event] || []).forEach(fn => fn());
        }
      });
    }
    return mockElements.get(id);
  };

  const domContext = {
    window: {},
    document: {
      readyState: 'complete',
      getElementById: (id) => getOrCreate(id),
      querySelectorAll: (sel) => {
        if (sel.includes('.terminal-tabs')) {
          const tab1 = getOrCreate('tab-curl');
          tab1.dataset = { target: 'curl' };
          const tab2 = getOrCreate('tab-node');
          tab2.dataset = { target: 'node' };
          return [tab1, tab2];
        }
        return [];
      },
      addEventListener: () => {}
    }
  };

  vm.createContext(domContext);
  vm.runInContext(appCode, domContext);

  const state = domContext.window.__AETHER_STATE__;
  assert.ok(state, 'Aether state must be mounted');
  assert.strictEqual(state.activeTab, 'curl');
  assert.strictEqual(state.billingCycle, 'monthly');

  // Trigger pricing cycle toggle
  const cycleToggle = getOrCreate('cycle-toggle');
  cycleToggle.dispatchEvent('click');
  assert.strictEqual(state.billingCycle, 'annual', 'Billing cycle must toggle to annual');

  // Trigger tab switch to node
  const tabNode = getOrCreate('tab-node');
  tabNode.dispatchEvent('click');
  assert.strictEqual(state.activeTab, 'node', 'Active tab must switch to node');
});

test('Real-World Landing: Headless Chrome responsive render across viewports', (t) => {
  if (!HAS_CHROME) {
    t.skip('Google Chrome not detected at standard macOS location; browser rendering marked as untested.');
    return;
  }

  const htmlUrl = encodeURI(`file://${path.join(LANDING_DIR, 'index.html')}`);

  // 1. Desktop viewport (1440x900)
  const desktopShot = '/tmp/landing-desktop-1440.png';
  execSync(
    `${CHROME_CMD} --headless=new --disable-gpu --screenshot="${desktopShot}" --window-size=1440,900 "${htmlUrl}" 2>/dev/null`,
    { timeout: 15000 }
  );
  assert.ok(fs.existsSync(desktopShot), 'Desktop screenshot must be generated');
  const dStat = fs.statSync(desktopShot);
  assert.ok(dStat.size > 20000, `Desktop render must produce substantial visual content (${dStat.size} bytes)`);

  // 2. Tablet viewport (768x1024)
  const tabletShot = '/tmp/landing-tablet-768.png';
  execSync(
    `${CHROME_CMD} --headless=new --disable-gpu --screenshot="${tabletShot}" --window-size=768,1024 "${htmlUrl}" 2>/dev/null`,
    { timeout: 15000 }
  );
  assert.ok(fs.existsSync(tabletShot), 'Tablet screenshot must be generated');

  // 3. Mobile viewport (375x812)
  const mobileShot = '/tmp/landing-mobile-375.png';
  execSync(
    `${CHROME_CMD} --headless=new --disable-gpu --screenshot="${mobileShot}" --window-size=375,812 "${htmlUrl}" 2>/dev/null`,
    { timeout: 15000 }
  );
  assert.ok(fs.existsSync(mobileShot), 'Mobile screenshot must be generated');
  const mStat = fs.statSync(mobileShot);
  assert.ok(mStat.size > 15000, `Mobile render must produce substantial visual content (${mStat.size} bytes)`);
});

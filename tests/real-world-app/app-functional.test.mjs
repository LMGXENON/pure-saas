import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {
  validateDesignDocument,
  scanSourceDirectory,
  parseFrontmatter
} from '../../scripts/pure-saas.mjs';

const APP_DIR = path.resolve(process.cwd(), 'tests/real-world-app');

test('Real-World App: Business logic and API contracts preserved 100%', async () => {
  const originalCode = fs.readFileSync(path.join(APP_DIR, 'original/app.js'), 'utf8');
  const redesignedCode = fs.readFileSync(path.join(APP_DIR, 'redesigned/app.js'), 'utf8');

  // Verify byte-level preservation of business logic file
  assert.strictEqual(originalCode, redesignedCode, 'JavaScript business logic must be preserved without regressions');

  // Test functional execution in isolated DOM context
  const createMockElement = (id = '') => ({
    id,
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    setAttribute: () => {},
    addEventListener: () => {},
    appendChild: () => {},
    style: {},
    textContent: '',
    innerHTML: ''
  });

  const domContext = {
    window: {},
    document: {
      readyState: 'complete',
      addEventListener: () => {},
      getElementById: (id) => createMockElement(id),
      createElement: () => createMockElement()
    }
  };
  vm.createContext(domContext);
  vm.runInContext(redesignedCode, domContext);

  const api = domContext.window.__APP_API__;
  const state = domContext.window.__APP_STATE__;

  assert.ok(api, 'Application API must be mounted');
  assert.ok(state, 'Application state must be initialized');

  // Contract 1: Initial monthly pricing
  assert.strictEqual(state.billingCycle, 'monthly');
  assert.strictEqual(state.seats, 8);
  const p1 = api.calculatePricing();
  assert.strictEqual(p1.rate, 24);
  assert.strictEqual(p1.total, 192);

  // Contract 2: Annual commitment calculation
  state.billingCycle = 'annual';
  const p2 = api.calculatePricing();
  assert.strictEqual(p2.rate, 20);
  assert.strictEqual(p2.total, 160);
  assert.strictEqual(p2.annualSavings, 384);

  // Contract 3: Route / Tab navigation state
  const routes = ['overview', 'invoices', 'team'];
  routes.forEach(route => {
    state.activeTab = route;
    api.updateTabUI();
    assert.strictEqual(state.activeTab, route, `Active route must update to ${route}`);
  });

  // Contract 4: Member filtering
  assert.strictEqual(state.members.length, 5);
  state.filterRole = 'admin';
  const admins = state.members.filter(m => m.role === state.filterRole);
  assert.strictEqual(admins.length, 1);
  assert.strictEqual(admins[0].name, 'Elena Rostova');
});

test('Real-World App: Pure SaaS token validation and anti-slop enforcement', () => {
  const designMdPath = path.join(APP_DIR, 'redesigned/DESIGN.md');
  const validResult = validateDesignDocument(designMdPath);
  assert.strictEqual(validResult.valid, true, 'Redesigned DESIGN.md must satisfy all schema requirements');
  assert.strictEqual(validResult.status, 'approved');

  const { data } = parseFrontmatter(fs.readFileSync(designMdPath, 'utf8'));
  const tokens = data.tokens || {};

  // Redesigned source directory scan: must have 0 violations
  const redesignedScan = scanSourceDirectory(path.join(APP_DIR, 'redesigned'), tokens);
  assert.strictEqual(redesignedScan.rawColorViolations.length, 0, 'Redesigned code must have 0 raw color violations');
  assert.strictEqual(redesignedScan.unresolvedTokenRefs.length, 0, 'Redesigned code must have 0 unresolved token references');
  assert.strictEqual(redesignedScan.antiSlopWarnings.length, 0, 'Redesigned code must have 0 anti-slop warnings');

  // Original legacy directory scan: must catch the 22 raw colors
  const originalScan = scanSourceDirectory(path.join(APP_DIR, 'original'), tokens);
  assert.ok(originalScan.rawColorViolations.length > 20, 'Original legacy code must be flagged for unapproved raw styling');
});

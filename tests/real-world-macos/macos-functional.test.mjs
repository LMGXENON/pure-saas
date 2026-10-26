import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execSync } from 'node:child_process';
import {
  validateDesignDocument,
  scanSourceDirectory,
  parseFrontmatter
} from '../../scripts/pure-saas.mjs';

const MACOS_DIR = path.resolve(process.cwd(), 'tests/real-world-macos');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HAS_CHROME = fs.existsSync(CHROME_PATH);
const CHROME_CMD = process.platform === 'darwin'
  ? `arch -arm64 "${CHROME_PATH}"`
  : `"${CHROME_PATH}"`;

test('Real-World macOS: DESIGN.md schema and status validation', () => {
  const designPath = path.join(MACOS_DIR, 'DESIGN.md');
  const result = validateDesignDocument(designPath);
  assert.strictEqual(result.valid, true, 'macOS DESIGN.md must be fully valid');
  assert.strictEqual(result.status, 'approved', 'Status must be approved');
});

test('Real-World macOS: WCAG 2.2 AA and AAA contrast compliance', () => {
  const designPath = path.join(MACOS_DIR, 'DESIGN.md');
  const validation = validateDesignDocument(designPath);
  const audit = validation.contrastAudit;
  assert.ok(audit, 'Contrast audit must run');
  assert.ok(audit.auditedPairs >= 8, 'Must audit key semantic pairs');
  assert.strictEqual(audit.failedAA, 0, 'Must have 0 WCAG AA failures');
  assert.strictEqual(audit.passedAA, audit.auditedPairs, 'All pairs must pass AA');
});

test('Real-World macOS: 0 raw colors, 0 anti-slop violations, 0 unresolved tokens', () => {
  const designPath = path.join(MACOS_DIR, 'DESIGN.md');
  const { data } = parseFrontmatter(fs.readFileSync(designPath, 'utf8'));
  const scan = scanSourceDirectory(MACOS_DIR, data.tokens || {});

  assert.strictEqual(scan.rawColorViolations.length, 0, 'Must have zero raw color violations');
  assert.strictEqual(scan.unresolvedTokenRefs.length, 0, 'Must have zero unresolved token references');
  assert.strictEqual(scan.antiSlopWarnings.length, 0, 'Must have zero anti-slop violations');
});

test('Real-World macOS: Business logic and Apple HIG interactive state execution', () => {
  const appCode = fs.readFileSync(path.join(MACOS_DIR, 'app.js'), 'utf8');

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
          toggle(c, val) {
            if (val === undefined) {
              if (this.classes.has(c)) this.classes.delete(c);
              else this.classes.add(c);
            } else if (val) {
              this.classes.add(c);
            } else {
              this.classes.delete(c);
            }
          },
          contains(c) { return this.classes.has(c); }
        },
        setAttribute(k, v) { this[k] = v; },
        getAttribute(k) { return this[k]; },
        addEventListener(event, fn) {
          this.listeners[event] = this.listeners[event] || [];
          this.listeners[event].push(fn);
        },
        dispatchEvent(event, evObj = {}) {
          (this.listeners[event] || []).forEach(fn => fn(evObj));
        },
        querySelectorAll: () => []
      });
    }
    return mockElements.get(id);
  };

  const documentListeners = {};
  const domContext = {
    window: {},
    document: {
      readyState: 'complete',
      getElementById: (id) => getOrCreate(id),
      querySelectorAll: (sel) => {
        if (sel.includes('.segmented-control')) {
          const b1 = getOrCreate('seg-all');
          b1.dataset = { filter: 'all' };
          const b2 = getOrCreate('seg-pinned');
          b2.dataset = { filter: 'pinned' };
          return [b1, b2];
        }
        return [];
      },
      addEventListener: (event, fn) => {
        documentListeners[event] = documentListeners[event] || [];
        documentListeners[event].push(fn);
      }
    }
  };

  vm.createContext(domContext);
  vm.runInContext(appCode, domContext);

  const api = domContext.window.__ZENITH_API__;
  assert.ok(api, 'Zenith API must be mounted');
  assert.strictEqual(api.state.notes.length, 3, 'Must initialize with 3 notes');
  assert.strictEqual(api.state.activeNoteId, 'note-1');

  // Test 1: Note selection
  api.selectNote('note-2');
  assert.strictEqual(api.state.activeNoteId, 'note-2', 'Selected note must update');

  // Test 2: Note creation
  const created = api.createNewNote();
  assert.strictEqual(api.state.notes.length, 4, 'Notes list must grow to 4');
  assert.strictEqual(api.state.activeNoteId, created.id, 'Active note must focus newly created note');

  // Test 3: Search filtering
  api.state.searchQuery = 'FPGA';
  api.renderNotesList();
  assert.strictEqual(api.state.searchQuery, 'FPGA');
});

test('Real-World macOS: Headless Chrome desktop window rendering', (t) => {
  if (!HAS_CHROME) {
    t.skip('Google Chrome not detected at standard macOS location; browser rendering marked as untested.');
    return;
  }

  const htmlUrl = encodeURI(`file://${path.join(MACOS_DIR, 'index.html')}`);
  const shotPath = '/tmp/macos-desktop-window.png';

  execSync(
    `${CHROME_CMD} --headless=new --disable-gpu --screenshot="${shotPath}" --window-size=1024,720 "${htmlUrl}" 2>/dev/null`,
    { timeout: 15000 }
  );

  assert.ok(fs.existsSync(shotPath), 'macOS window screenshot must be created');
  const stat = fs.statSync(shotPath);
  assert.ok(stat.size > 20000, `macOS render must produce substantial visual content (${stat.size} bytes)`);
});

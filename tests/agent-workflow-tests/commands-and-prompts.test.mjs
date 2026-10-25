import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const SPECIALIST_COMMANDS = [
  'design',
  'polish',
  'review',
  'reference',
  'responsive'
];

const ALL_SIX_COMMANDS = [
  'pure-saas',
  ...SPECIALIST_COMMANDS
];

const REMOVED_LEGACY_COMMANDS = [
  'build',
  'audit',
  'fix',
  'accessible',
  'motion',
  'tokens',
  'component',
  'verify',
  'system',
  'migrate',
  'init'
];

test('Command Architecture: Exactly 6 commands exist in commands/, prompts/, and integrations', () => {
  // Check commands/
  const cmdFiles = fs.readdirSync(path.resolve(process.cwd(), 'commands'))
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort();
  assert.deepStrictEqual(cmdFiles, [...ALL_SIX_COMMANDS].sort(), 'commands/ must contain exactly the 6 commands');

  // Check prompts/
  const promptFiles = fs.readdirSync(path.resolve(process.cwd(), 'prompts'))
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => f.replace('.md', ''))
    .sort();
  assert.deepStrictEqual(promptFiles, [...ALL_SIX_COMMANDS].sort(), 'prompts/ must contain exactly the 6 commands');

  // Check Cursor rules
  const cursorRules = fs.readdirSync(path.resolve(process.cwd(), 'integrations/cursor/.cursor/rules'))
    .filter(f => f.endsWith('.mdc'))
    .map(f => f.replace('.mdc', ''))
    .sort();
  const expectedCursorRules = ['pure-saas', ...SPECIALIST_COMMANDS.map(c => `pure-saas-${c}`)].sort();
  assert.deepStrictEqual(cursorRules, expectedCursorRules, 'Cursor rules must contain exactly pure-saas and the 5 specialist rules');

  // Check Claude Code integrations
  const claudeCmds = fs.readdirSync(path.resolve(process.cwd(), 'integrations/claude-code/.claude/commands'))
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort();
  assert.deepStrictEqual(claudeCmds, [...ALL_SIX_COMMANDS].sort(), 'Claude Code integration must contain exactly the 6 commands');

  // Check OpenCode integrations
  const openCodeCmds = fs.readdirSync(path.resolve(process.cwd(), 'integrations/opencode/.opencode/commands'))
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort();
  assert.deepStrictEqual(openCodeCmds, [...ALL_SIX_COMMANDS].sort(), 'OpenCode integration must contain exactly the 6 commands');
});

test('Legacy Commands: Removed slash commands do NOT exist anywhere in command registries', () => {
  for (const legacy of REMOVED_LEGACY_COMMANDS) {
    assert.strictEqual(fs.existsSync(path.resolve(process.cwd(), `commands/${legacy}.md`)), false, `commands/${legacy}.md must be removed`);
    assert.strictEqual(fs.existsSync(path.resolve(process.cwd(), `prompts/${legacy}.md`)), false, `prompts/${legacy}.md must be removed`);
    assert.strictEqual(fs.existsSync(path.resolve(process.cwd(), `.claude-plugin/commands/${legacy}.md`)), false, `.claude-plugin/commands/${legacy}.md must be removed`);
    assert.strictEqual(fs.existsSync(path.resolve(process.cwd(), `integrations/cursor/.cursor/rules/pure-saas-${legacy}.mdc`)), false, `Cursor rule pure-saas-${legacy}.mdc must be removed`);
  }
});

test('Main Command: /pure-saas automatically integrates all removed command capabilities', () => {
  const globalPrompt = fs.readFileSync(path.resolve(process.cwd(), 'prompts/pure-saas.md'), 'utf8');
  const globalCmd = fs.readFileSync(path.resolve(process.cwd(), 'commands/pure-saas.md'), 'utf8');
  const skill = fs.readFileSync(path.resolve(process.cwd(), 'SKILL.md'), 'utf8');

  // Must declare all preserved capabilities in natural language
  const capabilities = [
    'design',
    'implementation',
    'component',
    'tokens',
    'motion',
    'accessibility',
    'responsive',
    'security',
    'performance',
    'verification'
  ];

  for (const cap of capabilities) {
    const pattern = new RegExp(cap, 'i');
    assert.ok(pattern.test(globalPrompt), `Global prompt must declare capability: ${cap}`);
    assert.ok(pattern.test(globalCmd), `Global command must declare capability: ${cap}`);
    assert.ok(pattern.test(skill), `SKILL.md main command must declare capability: ${cap}`);
  }

  // Must enforce user-time optimization and non-rigid sequence
  assert.ok(globalPrompt.includes('consequential mistake'), 'Global prompt must optimize for user time');
  assert.ok(globalCmd.includes('consequential mistake'), 'Global command must avoid unnecessary questions');
});

test('Specialist Commands: All 5 specialist commands contain substantive instructions and proper triggers', () => {
  for (const cmd of SPECIALIST_COMMANDS) {
    const cmdPath = path.resolve(process.cwd(), 'commands', `${cmd}.md`);
    const promptPath = path.resolve(process.cwd(), 'prompts', `${cmd}.md`);

    const cmdContent = fs.readFileSync(cmdPath, 'utf8');
    const promptContent = fs.readFileSync(promptPath, 'utf8');

    assert.ok(cmdContent.includes(`/pure-saas ${cmd}`), `commands/${cmd}.md must declare /pure-saas ${cmd}`);
    assert.ok(cmdContent.length > 100, `commands/${cmd}.md must contain substantive instructions`);
    assert.ok(promptContent.length > 100, `prompts/${cmd}.md must contain substantive instructions`);
  }
});

test('Claude Code Plugin: Plugin manifest registers exactly the 6 commands', () => {
  const pluginPath = path.resolve(process.cwd(), '.claude-plugin/plugin.json');
  assert.ok(fs.existsSync(pluginPath), '.claude-plugin/plugin.json must exist');

  const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  assert.strictEqual(plugin.name, 'pure-saas');
  assert.strictEqual(plugin.commands.length, 6, 'plugin.json must register exactly 6 commands');

  const expectedPaths = ALL_SIX_COMMANDS.map(c => `./commands/${c}.md`);
  assert.deepStrictEqual(plugin.commands.sort(), expectedPaths.sort());

  for (const cmdRef of plugin.commands) {
    const resolvedPath = path.resolve(process.cwd(), '.claude-plugin', cmdRef);
    assert.ok(fs.existsSync(resolvedPath), `Command file must exist: ${resolvedPath}`);
  }
});

test('Integrity: Prompt toolkit references point to real existing files', () => {
  const fileRefRegex = /`([a-zA-Z0-9_\-./]+\.(?:md|json|mjs|css|js))`/g;
  const consumerTargetFiles = [
    'DESIGN.md',
    'design-brief.md',
    'reference-record.md',
    'index.html',
    'styles/tokens.css',
    'tokens.json',
    'tailwind.config.tokens.js',
    'tailwind.tokens.js'
  ];

  for (const cmd of ALL_SIX_COMMANDS) {
    const promptPath = path.resolve(process.cwd(), 'prompts', `${cmd}.md`);
    const content = fs.readFileSync(promptPath, 'utf8');
    let match;
    while ((match = fileRefRegex.exec(content)) !== null) {
      const ref = match[1];
      if (consumerTargetFiles.includes(ref) || ref.startsWith('styles/') || ref.startsWith('src/') || ref.startsWith('tailwind.')) {
        continue;
      }
      const resolved = path.resolve(process.cwd(), ref);
      assert.ok(fs.existsSync(resolved), `Toolkit file referenced in prompts/${cmd}.md must exist: ${ref}`);
    }
  }
});

test('Reference Workflow: /pure-saas reference specifies all 16 DESIGN.md sections and DevTools inspection', () => {
  const refCmd = fs.readFileSync(path.resolve(process.cwd(), 'commands/reference.md'), 'utf8');
  const refPrompt = fs.readFileSync(path.resolve(process.cwd(), 'prompts/reference.md'), 'utf8');

  assert.ok(refCmd.includes('/pure-saas reference'), 'commands/reference.md must document /pure-saas reference');
  assert.ok(refCmd.includes('DevTools'), 'commands/reference.md must require DevTools inspection');

  const REQUIRED_16_SECTIONS = [
    'Reference overview',
    'Design direction',
    'Page architecture',
    'Layout system',
    'Spacing system',
    'Colour system',
    'Typography',
    'Component inventory',
    'Assets',
    'Motion and interaction',
    'Responsive behaviour',
    'Technical observations',
    'Design tokens',
    'Implementation architecture',
    'Accessibility and states',
    'Implementation checklist'
  ];

  for (const section of REQUIRED_16_SECTIONS) {
    const pattern = new RegExp(section.replace(/\s+/g, '[\\s_-]+'), 'i');
    assert.ok(pattern.test(refCmd), `commands/reference.md must include section "${section}"`);
    assert.ok(pattern.test(refPrompt), `prompts/reference.md must include section "${section}"`);
  }
});

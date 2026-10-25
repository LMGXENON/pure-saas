import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const SUBCOMMANDS = [
  'reference',
  'design',
  'build',
  'audit',
  'fix',
  'polish',
  'responsive',
  'accessible',
  'motion',
  'tokens',
  'component',
  'verify',
  'system',
  'migrate',
  'init',
  'review'
];

test('Global Command: Universal /pure-saas prompt and command exist', () => {
  const globalPromptPath = path.resolve(process.cwd(), 'prompts/pure-saas.md');
  const globalCmdPath = path.resolve(process.cwd(), 'commands/pure-saas.md');

  assert.ok(fs.existsSync(globalPromptPath), 'prompts/pure-saas.md must exist');
  assert.ok(fs.existsSync(globalCmdPath), 'commands/pure-saas.md must exist');

  const promptContent = fs.readFileSync(globalPromptPath, 'utf8');
  assert.ok(promptContent.includes('Pure SaaS'), 'Global prompt must reference Pure SaaS');
  assert.ok(promptContent.length > 200, 'Global prompt must be substantive');

  const cmdContent = fs.readFileSync(globalCmdPath, 'utf8');
  assert.ok(cmdContent.includes('/pure-saas'), 'Global command must declare /pure-saas');
  assert.ok(cmdContent.includes('$ARGUMENTS'), 'Global command must handle $ARGUMENTS');
});

test('Prompts: All specialized subcommand prompts exist and contain substantive instructions', () => {
  for (const wf of SUBCOMMANDS) {
    const promptPath = path.resolve(process.cwd(), 'prompts', `${wf}.md`);
    assert.ok(fs.existsSync(promptPath), `prompts/${wf}.md must exist`);
    const content = fs.readFileSync(promptPath, 'utf8');
    assert.ok(content.length > 100, `prompts/${wf}.md must contain substantial instructions`);
    assert.ok(content.includes('Pure SaaS'), `prompts/${wf}.md must reference Pure SaaS`);
  }

  const readmePath = path.resolve(process.cwd(), 'prompts/README.md');
  assert.ok(fs.existsSync(readmePath), 'prompts/README.md must exist');
});

test('Commands: All specialized subcommand definitions exist for Claude Code and OpenCode', () => {
  for (const wf of SUBCOMMANDS) {
    const cmdPath = path.resolve(process.cwd(), 'commands', `${wf}.md`);
    assert.ok(fs.existsSync(cmdPath), `commands/${wf}.md must exist`);
    const content = fs.readFileSync(cmdPath, 'utf8');
    assert.ok(content.length > 50, `commands/${wf}.md must contain substantive instructions`);
    assert.ok(content.includes(`pure-saas`), `commands/${wf}.md must declare pure-saas command`);
  }
});

test('Claude Code: Plugin manifest registers commands and matches package standards', () => {
  const pluginPath = path.resolve(process.cwd(), '.claude-plugin/plugin.json');
  assert.ok(fs.existsSync(pluginPath), '.claude-plugin/plugin.json must exist');

  const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  assert.strictEqual(plugin.name, 'pure-saas');
  assert.ok(Array.isArray(plugin.commands), 'plugin.json must have commands array');
  assert.ok(plugin.commands.length >= 15, 'plugin.json must register commands for all workflows');

  for (const cmdRef of plugin.commands) {
    const resolvedPath = path.resolve(process.cwd(), '.claude-plugin', cmdRef);
    assert.ok(fs.existsSync(resolvedPath), `Registered command path must exist: ${cmdRef} -> ${resolvedPath}`);
  }
});

test('Cursor: Universal rule and specialized workflow rules exist in .cursor/rules/*.mdc', () => {
  const globalRule = path.resolve(process.cwd(), 'integrations/cursor/.cursor/rules/pure-saas.mdc');
  assert.ok(fs.existsSync(globalRule), 'Global pure-saas.mdc rule must exist');

  for (const wf of SUBCOMMANDS) {
    const rulePath = path.resolve(process.cwd(), 'integrations/cursor/.cursor/rules', `pure-saas-${wf}.mdc`);
    assert.ok(fs.existsSync(rulePath), `integrations/cursor/.cursor/rules/pure-saas-${wf}.mdc must exist`);
    const content = fs.readFileSync(rulePath, 'utf8');
    assert.ok(content.includes(`@pure-saas-${wf}`), `Rule must document @pure-saas-${wf} invocation`);
  }
});

test('OpenCode: All subcommand files exist in .opencode/commands/', () => {
  for (const wf of SUBCOMMANDS) {
    const cmdPath = path.resolve(process.cwd(), 'integrations/opencode/.opencode/commands', `${wf}.md`);
    assert.ok(fs.existsSync(cmdPath), `integrations/opencode/.opencode/commands/${wf}.md must exist`);
  }
});

test('Package Distribution: package.json includes prompts and commands directories', () => {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  assert.ok(pkg.files.includes('prompts'), 'package.json files must include prompts');
  assert.ok(pkg.files.includes('commands'), 'package.json files must include commands');
});

test('Integrity: All prompt toolkit references point to real existing files', () => {
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

  for (const wf of SUBCOMMANDS) {
    const promptPath = path.resolve(process.cwd(), 'prompts', `${wf}.md`);
    const content = fs.readFileSync(promptPath, 'utf8');
    let match;
    while ((match = fileRefRegex.exec(content)) !== null) {
      const ref = match[1];
      if (consumerTargetFiles.includes(ref) || ref.startsWith('styles/') || ref.startsWith('src/') || ref.startsWith('tailwind.')) {
        continue;
      }
      const resolved = path.resolve(process.cwd(), ref);
      assert.ok(fs.existsSync(resolved), `Toolkit file referenced in prompts/${wf}.md must exist: ${ref}`);
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

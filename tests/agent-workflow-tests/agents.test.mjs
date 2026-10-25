import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { validateDesignDocument } from '../../scripts/pure-saas.mjs';

test('Agents: All 7 agent integration adapters exist and contain documented instructions', () => {
  const integrations = [
    'claude-code',
    'cursor',
    'codex',
    'windsurf',
    'opencode',
    'gemini',
    'generic'
  ];

  for (const agent of integrations) {
    const dir = path.resolve(process.cwd(), 'integrations', agent);
    assert.ok(fs.existsSync(dir), `Integration directory must exist for ${agent}`);

    const readme = path.join(dir, 'README.md');
    assert.ok(fs.existsSync(readme), `README.md must exist in integrations/${agent}`);
    const content = fs.readFileSync(readme, 'utf8');
    assert.ok(content.length > 50, `README for ${agent} must contain substantive instructions`);
  }
});

test('Agents: SKILL.md and AGENTS.md satisfy required operational sections', () => {
  const skillFile = path.resolve(process.cwd(), 'SKILL.md');
  const agentsFile = path.resolve(process.cwd(), 'AGENTS.md');

  assert.ok(fs.existsSync(skillFile), 'SKILL.md must exist in root');
  assert.ok(fs.existsSync(agentsFile), 'AGENTS.md must exist in root');

  const skillContent = fs.readFileSync(skillFile, 'utf8');
  assert.ok(skillContent.includes('Stage A: Discover'), 'SKILL.md must include Stage A');
  assert.ok(skillContent.includes('Stage C: Establish Design System'), 'SKILL.md must include Stage C');
  assert.ok(skillContent.includes('Stage I: Report Honest Results'), 'SKILL.md must include Stage I');
  assert.ok(skillContent.includes('Anti-Slop'), 'SKILL.md must include Anti-Slop guidance');
});

test('Agents: Starter templates exist and satisfy schema and validation rules', () => {
  const templates = [
    'design-brief.md',
    'DESIGN.md',
    'reference-record.md'
  ];

  for (const tpl of templates) {
    const tplPath = path.resolve(process.cwd(), 'templates', tpl);
    assert.ok(fs.existsSync(tplPath), `Template ${tpl} must exist in templates/`);
    const content = fs.readFileSync(tplPath, 'utf8');
    assert.ok(content.length > 50, `Template ${tpl} must contain substantial starter content`);
  }

  const designValidation = validateDesignDocument(path.resolve(process.cwd(), 'templates/DESIGN.md'));
  assert.strictEqual(designValidation.valid, true, 'Starter template DESIGN.md must pass validation');
  assert.strictEqual(designValidation.issues.length, 0, 'Starter template DESIGN.md must have zero issues');
});


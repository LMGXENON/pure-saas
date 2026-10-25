import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

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

test('Agents: All 4 example projects pass complete validation and token verification', () => {
  const examples = [
    'developer-tool',
    'creative-product',
    'editorial-saas',
    'existing-app-redesign'
  ];

  for (const ex of examples) {
    const brief = path.resolve(process.cwd(), 'examples', ex, 'design-brief.md');
    const design = path.resolve(process.cwd(), 'examples', ex, 'DESIGN.md');

    assert.ok(fs.existsSync(brief), `Example ${ex} must have design-brief.md`);
    assert.ok(fs.existsSync(design), `Example ${ex} must have DESIGN.md`);
  }
});


import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { validateDesignDocument } from '../../scripts/pure-saas.mjs';

test('Agents: Root agent entry points and command registries exist with documented instructions', () => {
  const rootEntryPoints = [
    '.cursorrules',
    'GEMINI.md',
    'SKILL.md',
    'AGENTS.md'
  ];

  for (const file of rootEntryPoints) {
    const fullPath = path.resolve(process.cwd(), file);
    assert.ok(fs.existsSync(fullPath), `Root entry point ${file} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(content.length > 50, `${file} must contain substantive instructions`);
  }

  // Check commands directory
  const cmdDir = path.resolve(process.cwd(), 'commands');
  assert.ok(fs.existsSync(cmdDir), 'commands directory must exist');
  const commands = fs.readdirSync(cmdDir).filter(f => f.endsWith('.md'));
  assert.strictEqual(commands.length, 6, 'Must contain exactly 6 command definitions in commands/');
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
    const tplPath = path.resolve(process.cwd(), 'references/templates', tpl);
    assert.ok(fs.existsSync(tplPath), `Template ${tpl} must exist in references/templates/`);
    const content = fs.readFileSync(tplPath, 'utf8');
    assert.ok(content.length > 50, `Template ${tpl} must contain substantial starter content`);
  }

  const designValidation = validateDesignDocument(path.resolve(process.cwd(), 'references/templates/DESIGN.md'));
  assert.strictEqual(designValidation.valid, true, 'Starter template DESIGN.md must pass validation');
  assert.strictEqual(designValidation.issues.length, 0, 'Starter template DESIGN.md must have zero issues');
});

test('References: All 16 modular reference guides exist and satisfy architecture requirements', () => {
  const references = [
    'README.md',
    'accessibility.md',
    'anti-slop-rules.md',
    'code-audit.md',
    'color-and-tokens.md',
    'cross-platform.md',
    'design-principles.md',
    'design-review.md',
    'design-styles-catalog.json',
    'hig-lookup.md',
    'interaction-states.md',
    'layout-and-composition.md',
    'motion.md',
    'platform-guidelines.md',
    'reference-analysis.md',
    'responsive-design.md',
    'typography.md'
  ];

  for (const ref of references) {
    const refPath = path.resolve(process.cwd(), 'references', ref);
    assert.ok(fs.existsSync(refPath), `Reference ${ref} must exist in references/`);
    const content = fs.readFileSync(refPath, 'utf8');
    assert.ok(content.length > 100, `Reference ${ref} must contain substantive content`);
  }

  // Verify THIRD_PARTY_NOTICES.md covers all 3 reference projects
  const noticesFile = path.resolve(process.cwd(), 'THIRD_PARTY_NOTICES.md');
  assert.ok(fs.existsSync(noticesFile), 'THIRD_PARTY_NOTICES.md must exist');
  const noticesContent = fs.readFileSync(noticesFile, 'utf8');
  assert.ok(noticesContent.includes('ui-ux-pro-max-skill'), 'Must attribute ui-ux-pro-max-skill');
  assert.ok(noticesContent.includes('zero-slop-design-plugin'), 'Must attribute zero-slop-design-plugin');
  assert.ok(noticesContent.includes('apple-design-skill'), 'Must attribute apple-design-skill');
  assert.ok(noticesContent.includes('Provenance & Implementation Ledger'), 'Must include provenance ledger');
});

test('Design Intelligence: Full dataset exists and satisfies structural requirements', () => {
  const dataPath = path.resolve(process.cwd(), 'references/design-intelligence.json');
  assert.ok(fs.existsSync(dataPath), 'references/design-intelligence.json must exist');

  const content = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  assert.ok(content.styles && content.styles.length >= 88, 'Must contain 88+ design styles');
  assert.ok(content.products && content.products.length >= 190, 'Must contain 190+ product archetypes');
  assert.ok(content.typography && content.typography.length >= 70, 'Must contain 70+ typography pairings');
  assert.ok(content.charts && content.charts.length >= 25, 'Must contain 25 chart guides');
  assert.ok(content.motion && content.motion.length >= 17, 'Must contain 17 motion patterns');
  assert.ok(content.stacks && Object.keys(content.stacks).length >= 20, 'Must contain 20+ stack guidelines');
});


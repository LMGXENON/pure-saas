import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  validateDesignDocument,
  getStarterDesign,
  getStarterBrief,
  getStarterReferenceRecord,
  searchReferences
} from '../../scripts/pure-saas.mjs';

test('Agents: Root agent entry points and command registries exist with documented instructions', () => {
  const rootEntryPoints = [
    '.cursorrules',
    'GEMINI.md',
    '.windsurfrules',
    '.github/copilot-instructions.md',
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

test('Built-in Generators: Starter document generators produce valid specifications', () => {
  const starterDesign = getStarterDesign();
  assert.ok(starterDesign.length > 200, 'Starter design must be substantial');
  assert.ok(starterDesign.includes('color-bg-canvas'), 'Starter design must include semantic color tokens');

  const starterBrief = getStarterBrief();
  assert.ok(starterBrief.length > 100, 'Starter brief must be substantial');

  const starterRef = getStarterReferenceRecord();
  assert.ok(starterRef.length > 100, 'Starter reference record must be substantial');
});

test('Apple HIG Reference Library: All 124 substantive documents exist in references/hig/', () => {
  const higDir = path.resolve(process.cwd(), 'references/hig');
  assert.ok(fs.existsSync(higDir), 'references/hig must exist');

  const higFiles = fs.readdirSync(higDir).filter(f => f.endsWith('.md'));
  assert.strictEqual(higFiles.length, 124, 'references/hig/ must contain exactly 124 markdown files');

  // Verify key components and foundations have substantive content and proper headers
  const sampleFiles = [
    'buttons.md',
    'modality.md',
    'sheets.md',
    'accessibility.md',
    'color.md',
    'typography.md',
    'layout.md',
    'liquid-glass.md'
  ];

  for (const sample of sampleFiles) {
    const filePath = path.join(higDir, sample);
    assert.ok(fs.existsSync(filePath), `HIG file ${sample} must exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.length > 500, `HIG file ${sample} must have substantive content (>500 chars)`);
    assert.ok(content.includes('# '), `HIG file ${sample} must start with markdown heading`);
  }
});

test('Framework Engineering Guides: All 22 framework guides exist in references/frameworks/', () => {
  const fwDir = path.resolve(process.cwd(), 'references/frameworks');
  assert.ok(fs.existsSync(fwDir), 'references/frameworks must exist');

  const fwFiles = fs.readdirSync(fwDir).filter(f => f.endsWith('.md'));
  assert.strictEqual(fwFiles.length, 22, 'references/frameworks/ must contain exactly 22 framework guides');

  // Verify sample framework guides contain actionable rules and code examples
  const sampleFw = ['react.md', 'html-tailwind.md', 'vue.md', 'svelte.md', 'swiftui.md', 'flutter.md'];
  for (const sample of sampleFw) {
    const filePath = path.join(fwDir, sample);
    assert.ok(fs.existsSync(filePath), `Framework guide ${sample} must exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.length > 1000, `Framework guide ${sample} must be substantial (>1000 chars)`);
    assert.ok(content.includes('Recommended:') || content.includes('Do:'), `Framework guide ${sample} must contain Do/Recommended guidance`);
  }
});

test('Reference Search Engine: Retrieves relevant documents across components, frameworks, and topics', () => {
  // 1. Search component
  const modalMatches = searchReferences('modal', { limit: 5 });
  assert.ok(modalMatches.length > 0, 'Must return results for "modal"');
  assert.ok(modalMatches.some(m => m.path.includes('hig/modality.md') || m.path.includes('hig/sheets.md')), 'Must retrieve modality or sheets');

  // 2. Search button
  const buttonMatches = searchReferences('button', { limit: 5 });
  assert.ok(buttonMatches.length > 0, 'Must return results for "button"');
  assert.strictEqual(buttonMatches[0].path, 'references/hig/buttons.md', 'Top result for button must be buttons.md');

  // 3. Search framework
  const reactMatches = searchReferences('react', { limit: 5 });
  assert.ok(reactMatches.length > 0, 'Must return results for "react"');
  assert.ok(reactMatches.some(m => m.path.includes('frameworks/react.md')), 'Must retrieve react.md');

  // 4. Search accessibility
  const a11yMatches = searchReferences('accessibility', { limit: 5 });
  assert.ok(a11yMatches.length > 0, 'Must return results for "accessibility"');
  assert.ok(a11yMatches.some(m => m.path.includes('accessibility.md')), 'Must retrieve accessibility.md');
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

test('Agent Skills Standard: SKILL.md adheres to open specification', () => {
  const skillPath = path.resolve(process.cwd(), 'SKILL.md');
  const content = fs.readFileSync(skillPath, 'utf8');

  // Verify YAML frontmatter delimiters
  assert.ok(content.startsWith('---\n'), 'SKILL.md must begin with YAML frontmatter delimiter');
  const secondDash = content.indexOf('\n---\n', 4);
  assert.ok(secondDash > 0, 'SKILL.md must have closing frontmatter delimiter');

  const frontmatterStr = content.slice(4, secondDash);

  // Parse key fields
  assert.ok(/name:\s*pure-saas/.test(frontmatterStr), 'Must have valid skill name');
  assert.ok(/description:\s*.+/.test(frontmatterStr), 'Must have non-empty description');
  assert.ok(/license:\s*MIT/.test(frontmatterStr), 'Must declare license');
  assert.ok(/compatibility:\s*.+/.test(frontmatterStr), 'Must declare compatibility');
  assert.ok(/version:\s*"1\.0\.0"/.test(frontmatterStr), 'Must declare version in metadata');

  // Verify all 6 slash triggers are declared
  const expectedTriggers = [
    '/pure-saas',
    '/pure-saas design',
    '/pure-saas polish',
    '/pure-saas review',
    '/pure-saas reference',
    '/pure-saas responsive'
  ];

  for (const trigger of expectedTriggers) {
    assert.ok(frontmatterStr.includes(trigger), `Frontmatter triggers must include: ${trigger}`);
  }
});


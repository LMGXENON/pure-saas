#!/usr/bin/env node

/**
 * Pure SaaS Multi-Provider Build & Synchronization System
 * Inspired by the Impeccable cross-provider compilation architecture.
 *
 * Compiles canonical skill source in `skill/` into provider-specific bundles:
 * - Cursor: .cursor/skills/pure-saas/
 * - Claude Code: .claude/skills/pure-saas/
 * - Gemini / Antigravity: .gemini/skills/pure-saas/
 * - Agents (OpenAI / Codex): .agents/skills/pure-saas/
 * - GitHub: .github/skills/pure-saas/
 *
 * Synchronizes root instruction files:
 * - .cursorrules
 * - .windsurfrules
 * - GEMINI.md
 * - AGENTS.md
 * - CLAUDE.md
 * - SKILL.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const skillSourceDir = path.join(rootDir, 'skill');

const PROVIDER_TARGETS = [
  { name: 'Cursor', dir: path.join(rootDir, '.cursor/skills/pure-saas') },
  { name: 'Claude Code', dir: path.join(rootDir, '.claude/skills/pure-saas') },
  { name: 'Gemini / Antigravity', dir: path.join(rootDir, '.gemini/skills/pure-saas') },
  { name: 'OpenAI Agents / Codex', dir: path.join(rootDir, '.agents/skills/pure-saas') },
  { name: 'GitHub Copilot', dir: path.join(rootDir, '.github/skills/pure-saas') }
];

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      // Preserve executable permissions for scripts
      if (srcPath.includes('/scripts/')) {
        try { fs.chmodSync(destPath, 0o755); } catch {}
      }
    }
  }
}

function syncCommandsWithRelativeLinks(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      syncCommandsWithRelativeLinks(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      let content = fs.readFileSync(srcPath, 'utf8');

      // Rewrite links to reference playbooks so they resolve correctly from destPath
      const playbooks = ['workflow.md', 'design.md', 'polish.md', 'review.md', 'clone.md', 'responsive.md'];
      for (const pb of playbooks) {
        const canonicalPlaybookPath = path.join(skillSourceDir, 'reference', pb);
        const relToPlaybook = path.relative(path.dirname(destPath), canonicalPlaybookPath);
        const pbRegex = new RegExp(`\\]\\(\\.\\.?/\\.\\.?/reference/${pb}\\)|\\]\\(\\.\\./reference/${pb}\\)`, 'g');
        content = content.replace(pbRegex, `](${relToPlaybook})`);
      }
      fs.writeFileSync(destPath, content, 'utf8');
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function buildProviders() {
  console.log('=== Building Pure SaaS Multi-Provider Distributions ===\n');

  if (!fs.existsSync(skillSourceDir)) {
    throw new Error(`Canonical source directory not found: ${skillSourceDir}`);
  }

  // 1. Sync Root SKILL.md with canonical skill/SKILL.md (rewriting relative links to skill/reference/)
  const canonicalSkill = path.join(skillSourceDir, 'SKILL.md');
  const rootSkill = path.join(rootDir, 'SKILL.md');
  if (fs.existsSync(canonicalSkill)) {
    let skillContent = fs.readFileSync(canonicalSkill, 'utf8');
    // Ensure links from root point to skill/reference/
    skillContent = skillContent.replace(/\(reference\//g, '(skill/reference/');
    fs.writeFileSync(rootSkill, skillContent, 'utf8');
    console.log(`✓ Synchronized root SKILL.md with canonical source`);
  }

  // 2. Build each provider bundle
  for (const target of PROVIDER_TARGETS) {
    // Clean target directory
    if (fs.existsSync(target.dir)) {
      fs.rmSync(target.dir, { recursive: true, force: true });
    }
    fs.mkdirSync(target.dir, { recursive: true });

    // Copy SKILL.md
    fs.copyFileSync(canonicalSkill, path.join(target.dir, 'SKILL.md'));

    // Copy reference playbooks
    copyDirRecursive(path.join(skillSourceDir, 'reference'), path.join(target.dir, 'reference'));

    // Copy specialized agent definitions
    copyDirRecursive(path.join(skillSourceDir, 'agents'), path.join(target.dir, 'agents'));

    // Copy design data (catalog and intelligence)
    copyDirRecursive(path.join(skillSourceDir, 'data'), path.join(target.dir, 'data'));

    // Copy launcher scripts
    copyDirRecursive(path.join(skillSourceDir, 'scripts'), path.join(target.dir, 'scripts'));

    // Copy command definitions
    copyDirRecursive(path.join(skillSourceDir, 'commands'), path.join(target.dir, 'commands'));

    console.log(`✓ Built ${target.name} provider package -> ${path.relative(rootDir, target.dir)}`);
  }

  // 3. Synchronize Slash Commands to standard provider directories (.claude/commands, .cursor/commands, .agents/commands, commands)
  const canonicalCommandsDir = path.join(skillSourceDir, 'commands');
  const commandDestinations = [
    path.join(rootDir, '.claude/commands'),
    path.join(rootDir, '.cursor/commands'),
    path.join(rootDir, '.agents/commands'),
    path.join(rootDir, 'commands')
  ];

  for (const dest of commandDestinations) {
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    syncCommandsWithRelativeLinks(canonicalCommandsDir, dest);
    console.log(`✓ Synchronized slash commands -> ${path.relative(rootDir, dest)}`);
  }

  // 4. Synchronize Cursor Native Rules (.cursor/rules/*.mdc)
  const cursorRulesDir = path.join(rootDir, '.cursor/rules');
  if (fs.existsSync(cursorRulesDir)) {
    fs.rmSync(cursorRulesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(cursorRulesDir, { recursive: true });

  const cursorCommandMap = [
    { src: 'puresaas.md', dest: 'puresaas.mdc', desc: 'Main orchestrator. Understand the request, inspect the project, choose the appropriate workflow, implement the solution and verify the result.' },
    { src: 'puresaas/design.md', dest: 'puresaas-design.mdc', desc: 'Create distinctive, production-ready interfaces and landing pages from a brief.' },
    { src: 'puresaas/polish.md', dest: 'puresaas-polish.mdc', desc: 'Refine existing interfaces, improving visual hierarchy, typography, spacing, interactions and detail.' },
    { src: 'puresaas/review.md', dest: 'puresaas-review.mdc', desc: 'Audit an interface, identify specific design and usability problems, prioritise them and fix them when authorised.' },
    { src: 'puresaas/clone.md', dest: 'puresaas-clone.mdc', desc: 'Analyse a supplied website or screenshot and recreate its relevant layout, typography, styling and interactions accurately.' },
    { src: 'puresaas/responsive.md', dest: 'puresaas-responsive.mdc', desc: 'Audit and fix responsive behaviour across mobile, tablet and desktop without compromising design quality.' }
  ];

  for (const { src, dest, desc } of cursorCommandMap) {
    const rawContent = fs.readFileSync(path.join(canonicalCommandsDir, src), 'utf8');
    const body = rawContent.replace(/^---[\s\S]*?---\s*/, '');
    const mdcContent = `---
description: "${desc}"
globs: *
alwaysApply: false
---

${body}`;
    fs.writeFileSync(path.join(cursorRulesDir, dest), mdcContent, 'utf8');
  }
  console.log(`✓ Synchronized Cursor native rules -> .cursor/rules`);

  // 5. Synchronize Root Rules (.cursorrules, .windsurfrules, GEMINI.md, AGENTS.md, CLAUDE.md)
  const agentManual = `# AGENTS.md

Operating manual for AI agents working in this repository, or using Pure SaaS to design, build, and review software.

---

## 1. What This Repository Is

Pure SaaS is an open-source, universal AI-agent skill and frontend engineering toolkit. Its mission is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, and component libraries.

---

## 2. Command Architecture

Pure SaaS operates via **six independent, namespaced slash commands**:

1. **\`/puresaas [request]\`** — **Principal Designer & Main Orchestrator**: Understands the request, inspects the project, chooses the appropriate workflow, implements the solution, and verifies the result.
2. **\`/puresaas:design [brief]\`** — **Creative Director & Builder**: Turns a product brief into a distinctive, fully implemented interface and landing page with strong visual hierarchy and authentic content.
3. **\`/puresaas:polish [target]\`** — **Senior Visual Designer**: Elevates visual craft, typography tracking, surface lighting, and micro-interactions without breaking working behavior.
4. **\`/puresaas:review [scope]\`** — **Independent Design Critic**: Judges the interface honestly across 10 dimensions, prioritizing defects from P0 to P3 and driving verified fixes.
5. **\`/puresaas:clone [URL/Image]\`** — **Reference Analyst & Cloning Engineer**: Analyses a supplied website or screenshot and recreates its relevant layout, typography, styling, and interactions accurately within the user's project.
6. **\`/puresaas:responsive [target]\`** — **Responsive Systems Engineer**: Makes the interface feel purposefully designed across all viewports (375px mobile to 1440px desktop) with zero overflow.

---

## 3. The 6-Step Build & Verification Loop

1. **Understand Requirements & Mode:** Determine whether surface is Persuade, Operate, Read, or Experience.
2. **Inspect Context:** Check dependencies, styling system, existing tokens, and backend APIs.
3. **Formulate Visual Direction:** Pick style archetype from \`pure-saas style list\`, choose typography, and author \`DESIGN.md\`.
4. **Implement Components:** Build with 8-state interaction matrix and zero raw hex codes.
5. **Capture Real Browser Screenshots:** Test across 1440px, 768px, and 375px viewports.
6. **Forensic Review & Verified Fixes:** Measure against the 10 dimensions, triage P0–P3 defects, and verify final finish.

---

## 4. Hardware-Grade Craft Floor

- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in \`DESIGN.md\`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature cards, no repetitive kickers/eyebrows on every heading, no decorative side-stripe borders, no fake status dots, and no emoji UI icons.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (\`::selection\`), caret color (\`caret-color\`), focus rings, and custom scrollbars.
- **Never Fabricate Verification:** If an environment lacks browser inspection tools, report it as \`untested\`. Never claim passing verification for uninspected code.
`;

  const claudeManual = `# CLAUDE.md

Claude Code project instructions for Pure SaaS.

## Independent Slash Commands
- **Main Orchestrator:** \`/puresaas [request]\`
- **Creative Director & Builder:** \`/puresaas:design [brief]\`
- **Senior Visual Designer:** \`/puresaas:polish [target]\`
- **Independent Design Critic:** \`/puresaas:review [scope]\`
- **Reference Analyst & Cloning Engineer:** \`/puresaas:clone <url-or-image>\`
- **Responsive Systems Engineer:** \`/puresaas:responsive [target]\`

## Supporting Tooling
- Review & audit: \`pure-saas audit --source src\`
- Context inspection: \`pure-saas context\`
- Health & diagnostics: \`pure-saas doctor\`
- Style registry: \`pure-saas style list\`
- Browser screenshots: \`pure-saas browser screenshot <url>\`

## Design & Engineering Rules
1. Never generate raw hex colors or arbitrary brackets in JSX/HTML. All styling must resolve to tokens in \`DESIGN.md\`.
2. Honor surface modes: Persuade (landing pages) gets bold creative direction and real interactive previews; Operate (dashboards) gets density and restraint.
3. Enforce the craft floor: 1px hairline borders, optical tracking (-0.025em on headings), tabular-nums on numbers, and 8-state components.
4. Verify results by inspecting real browser screenshots at 1440px, 768px, and 375px.
`;

  const rootRule = `When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the six independent, namespaced slash commands:
   - \`/puresaas [request]\`: Main orchestrator. Understands request, inspects project, chooses workflow, implements, and verifies.
   - \`/puresaas:design [brief]\`: Creative Director. Turns product brief into distinctive, fully implemented interface.
   - \`/puresaas:polish [target]\`: Senior Visual Designer. Elevates typography tracking, hairlines, micro-interactions.
   - \`/puresaas:review [scope]\`: Independent Critic. 10-dimension audit and prioritized P0-P3 defect triage.
   - \`/puresaas:clone [URL/Image]\`: Reference Analyst. Recreates layout, typography, and styling accurately.
   - \`/puresaas:responsive [target]\`: Responsive Systems Engineer. Multi-viewport mastery (375px to 1440px).
2. Retrieve exact references for the task using \`npx pure-saas ref "<component, framework, or topic>"\`.
3. Non-Negotiable Engineering Rules:
   - Zero raw hex colors or arbitrary styling: resolve to semantic tokens in DESIGN.md.
   - Zero generic AI slop: no purple/cyan gradient text, excessive glassmorphism blur, repetitive 3-column cards, or green pulsing dots.
   - Preserve 100% of backend APIs, authentication, and database schemas.
   - Continuous Verification: verify tokens, contrast, and layout with \`pure-saas contrast\`, \`pure-saas audit\`, and \`pure-saas browser screenshot\`.
`;

  fs.writeFileSync(path.join(rootDir, 'AGENTS.md'), agentManual, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'CLAUDE.md'), claudeManual, 'utf8');
  fs.writeFileSync(path.join(rootDir, '.cursorrules'), rootRule, 'utf8');
  fs.writeFileSync(path.join(rootDir, '.windsurfrules'), rootRule, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'GEMINI.md'), rootRule, 'utf8');
  fs.writeFileSync(path.join(rootDir, '.github/copilot-instructions.md'), rootRule, 'utf8');

  console.log(`✓ Synchronized AGENTS.md, CLAUDE.md, .cursorrules, .windsurfrules, GEMINI.md, and copilot-instructions.md\n`);
  console.log('Build completed successfully.');
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    buildProviders();
  } catch (err) {
    console.error(`Build failed: ${err.message}`);
    process.exit(1);
  }
}


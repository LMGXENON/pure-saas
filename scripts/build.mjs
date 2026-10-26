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

function syncCommandsWithRelativeLinks(srcDir, destDir, writeFlatAliases = false) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      syncCommandsWithRelativeLinks(srcPath, destPath, false);

      // Write flat kebab-case aliases for hosts that do not recurse subdirectories (Cursor, Codex)
      if (writeFlatAliases && entry.name === 'puresaas') {
        const subEntries = fs.readdirSync(srcPath, { withFileTypes: true });
        for (const sub of subEntries) {
          if (sub.isFile() && sub.name.endsWith('.md')) {
            const flatDest = path.join(destDir, `puresaas-${sub.name}`);
            let content = fs.readFileSync(path.join(srcPath, sub.name), 'utf8');
            const playbooks = ['workflow.md', 'design.md', 'polish.md', 'review.md', 'clone.md', 'responsive.md', 'spatial-reasoning.md'];
            for (const pb of playbooks) {
              const canonicalPlaybookPath = path.join(skillSourceDir, 'reference', pb);
              const relToPlaybook = path.relative(path.dirname(flatDest), canonicalPlaybookPath);
              const pbRegex = new RegExp(`\\]\\(\\.\\.?/\\.\\.?/reference/${pb}\\)|\\]\\(\\.\\./reference/${pb}\\)`, 'g');
              content = content.replace(pbRegex, `](${relToPlaybook})`);
            }
            fs.writeFileSync(flatDest, content, 'utf8');
          }
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      let content = fs.readFileSync(srcPath, 'utf8');

      // Rewrite links to reference playbooks so they resolve correctly from destPath
      const playbooks = ['workflow.md', 'design.md', 'polish.md', 'review.md', 'clone.md', 'responsive.md', 'spatial-reasoning.md'];
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
    { dest: path.join(rootDir, '.claude/commands'), flat: false },
    { dest: path.join(rootDir, '.cursor/commands'), flat: true },
    { dest: path.join(rootDir, '.agents/commands'), flat: true },
    { dest: path.join(rootDir, 'commands'), flat: true }
  ];

  for (const { dest, flat } of commandDestinations) {
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    syncCommandsWithRelativeLinks(canonicalCommandsDir, dest, flat);
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

## 2. Spatial Reasoning & Alignment Calculus (Mandatory Engine)

Before writing any markup or styling, reason through these five structural requirements:

1. **The Single Gutter Line (\`x = 0\`):** Every section and card must establish ONE primary vertical alignment axis. Section kickers, H1/H2 headings, paragraphs, form inputs, and CTA buttons must lock to the exact same x-coordinate. Never indent subtext arbitrarily or center buttons below left-aligned text.
2. **Optical vs. Geometric Alignment:** For multi-line text with leading icons, use \`items-start mt-0.5\` or \`mt-1\` to align with the cap-height of the first line. Never use \`items-center\` on multi-line blocks. Lock form labels to inputs with $\\le 6\\text{px}$ gap (\`space-y-1.5\`); space sibling fields by $\\ge 16\\text{px}$.
3. **Proximity Mathematics:**
   - Container-to-Child Inequality: $\\text{Outer Padding} \\ge 1.5 \\times \\text{Internal Child Gap}$ (e.g. \`p-6\` outer padding requires \`space-y-3\` to \`space-y-4\` inner gaps; never put \`gap-6\` inside \`p-4\`).
   - Heading Belonging: $\\text{Spacing Above Heading} \\ge 2.5 \\times \\text{Spacing Below Heading}$ (e.g. \`mt-12\` above, \`mb-3\` below).
4. **Asymmetric Anchor & Orbit Composition:** Forbid symmetrical, repetitive 3-column card grids. Pair a dominant 60%–66% width hero anchor (interactive demo, realistic telemetry view, or terminal canvas) with a 34%–40% secondary contextual rail.
5. **Operational Density & Tabular Figures:** Use high-utility top console app bars with project context switchers and \`⌘K\` command pills instead of dead-weight 256px sidebars. Apply \`font-tabular\` / \`font-mono\` to all metrics, counts, and tables to eliminate jitter. Use slide-over master-detail drawers for row inspection.

---

## 3. Command Architecture

Pure SaaS operates via **six independent, namespaced slash commands**:

1. **\`/puresaas [request]\`** — **Principal Designer & Main Orchestrator**: Runs spatial calculus, inspects context, chooses workflow, implements, and verifies.
2. **\`/puresaas:design [brief]\`** — **Creative Director & Builder**: Turns product brief into distinctive, fully implemented interface with asymmetric layout and authentic content.
3. **\`/puresaas:polish [target]\`** — **Senior Visual Designer**: Elevates optical alignment, typography tracking, spacing ratios, hairlines, and micro-interactions.
4. **\`/puresaas:review [scope]\`** — **Independent Design Critic**: Judges interface honestly across spatial reasoning and 10 dimensions, prioritizing P0–P3 defects and driving verified fixes.
5. **\`/puresaas:clone [URL/Image]\`** — **Reference Analyst & Cloning Engineer**: Deconstructs spatial layout, typography scale, tokens, and interactions from reference and recreates accurately.
6. **\`/puresaas:responsive [target]\`** — **Responsive Systems Engineer**: Makes interface feel purposefully designed across all viewports (375px mobile to 1440px desktop) with zero overflow.

---

## 4. Hardware-Grade Craft Floor

- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in \`DESIGN.md\`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature cards, no centered hero templates with decorative badges, no green pulsing dots (\`animate-ping\`), and no emoji UI icons.
- **Display Tracking:** Apply \`-0.025em\` (\`tracking-tight\`) to all headings $\\ge 24\\text{px}$; apply \`+0.05em\` (\`tracking-wider uppercase font-mono\`) to metadata $\\le 12\\text{px}$.
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
- Spatial Reasoning Playbook: \`skill/reference/spatial-reasoning.md\`
- Review & audit: \`pure-saas audit --source src\`
- Context inspection: \`pure-saas context\`
- Health & diagnostics: \`pure-saas doctor\`
- Style registry: \`pure-saas style list\`
- Browser screenshots: \`pure-saas browser screenshot <url>\`

## Spatial Reasoning & Engineering Rules
1. **Single Gutter Line (\`x = 0\`):** Align kicker, heading, subtext, actions, and card borders to a shared vertical axis. No arbitrary indents.
2. **Optical vs. Geometric Alignment:** Use \`items-start mt-0.5\` or \`mt-1\` for multi-line text with icons. Lock form labels with $\\le 6\\text{px}$ gap.
3. **Proximity Math:** Enforce $\\text{Outer Padding} \\ge 1.5 \\times \\text{Inner Gap}$ on all containers. Enforce $\\text{Above} \\ge 2.5 \\times \\text{Below}$ on heading vertical rhythm.
4. **Anchor & Orbit Asymmetry:** Forbid symmetrical 3-column card vomits. Pair 60%–66% hero anchors with 34%–40% secondary rails.
5. **Operational Consoles:** Use top console app bars with \`⌘K\` command pills instead of dead-weight sidebars. Use \`font-tabular\` on all metrics and slide-over drawers for inspection.
6. **Zero AI Slop:** No raw hex colors, no purple gradient headings, no green pulsing dots (\`animate-ping\`), no emoji interface icons.
7. **Display Tracking:** Apply \`-0.025em\` (\`tracking-tight\`) on display headings $\\ge 24\\text{px}$.
8. **Verify:** Capture real browser screenshots at 1440px, 768px, and 375px.
`;

  const rootRule = `When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS spatial design system:

1. Read SKILL.md in full. It defines the spatial reasoning calculus and six independent slash commands:
   - \`/puresaas [request]\`: Main orchestrator. Runs spatial calculus, inspects project, implements, and verifies.
   - \`/puresaas:design [brief]\`: Creative Director. Turns brief into distinctive, asymmetric interface with authentic content.
   - \`/puresaas:polish [target]\`: Senior Visual Designer. Elevates optical alignment, typography tracking, spacing ratios, hairlines.
   - \`/puresaas:review [scope]\`: Independent Critic. 10-dimension audit and prioritized P0-P3 defect triage.
   - \`/puresaas:clone [URL/Image]\`: Reference Analyst. Recreates layout, typography, and styling accurately.
   - \`/puresaas:responsive [target]\`: Responsive Systems Engineer. Multi-viewport mastery (375px to 1440px) with zero overflow.
2. Mandatory Spatial Reasoning Rules:
   - Single Gutter Line: Lock section title, body, actions, and inputs to a single vertical axis (\`x = 0\`).
   - Optical Alignment: Use \`items-start mt-1\` on multi-line text with icons (never \`items-center\`). Lock labels $\\le 6\\text{px}$ to inputs.
   - Proximity Mathematics: Container Outer Padding $\\ge 1.5 \\times$ Internal Child Gap. Heading Spacing Above $\\ge 2.5 \\times$ Spacing Below.
   - Anchor & Orbit: Forbid generic 3-column card grids. Use 60/40 asymmetric balance.
   - High-Density Consoles: Top console app bars with \`⌘K\` command pills, monospace tabular numbers, and slide-over inspector drawers.
   - Zero AI Slop: No raw hex codes, no purple gradient text, no pulsing green dots (\`animate-ping\`), no emoji UI icons.
   - Display Tracking: Apply \`-0.025em\` (\`tracking-tight\`) on headings $\\ge 24\\text{px}$; \`+0.05em\` (\`font-mono uppercase\`) on metadata $\\le 12\\text{px}$.
3. Continuous Verification: verify tokens, contrast, and layout with \`pure-saas contrast\`, \`pure-saas audit\`, and \`pure-saas browser screenshot\`.
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


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

export function buildProviders() {
  console.log('=== Building Pure SaaS Multi-Provider Distributions ===\n');

  if (!fs.existsSync(skillSourceDir)) {
    throw new Error(`Canonical source directory not found: ${skillSourceDir}`);
  }

  // 1. Sync Root SKILL.md with canonical skill/SKILL.md
  const canonicalSkill = path.join(skillSourceDir, 'SKILL.md');
  const rootSkill = path.join(rootDir, 'SKILL.md');
  if (fs.existsSync(canonicalSkill)) {
    fs.copyFileSync(canonicalSkill, rootSkill);
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

    console.log(`✓ Built ${target.name} provider package -> ${path.relative(rootDir, target.dir)}`);
  }

  // 3. Synchronize Root Rules (.cursorrules, .windsurfrules, GEMINI.md, AGENTS.md, CLAUDE.md)
  const agentManual = `# AGENTS.md

Operating manual for AI agents working in this repository, or using Pure SaaS to design, build, and review software.

---

## 1. What This Repository Is

Pure SaaS is an open-source, universal AI-agent skill and frontend engineering toolkit. Its mission is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, and component libraries.

---

## 2. Command Architecture

Pure SaaS operates via **one principal command and five specialist workflows**:

1. **\`/pure-saas [request]\`** — **Principal Designer**: Owns the complete outcome from understanding the brief, audience, and constraints to delivering a finished, production-ready interface.
2. **\`/pure-saas design [brief]\`** — **Creative Director & Builder**: Turns a product brief into a distinctive, fully implemented interface with strong visual hierarchy and authentic content.
3. **\`/pure-saas polish [target]\`** — **Senior Visual Designer**: Elevates visual craft, typography tracking, surface lighting, and micro-interactions without breaking working behavior.
4. **\`/pure-saas review [scope]\`** — **Independent Design Critic**: Judges the interface honestly across 10 dimensions, prioritizing defects from P0 to P3 and driving verified fixes.
5. **\`/pure-saas reference [URL/Image]\`** — **Reference Analyst & Art Director**: Extracts deep design intelligence from references and translates it into an original, domain-tailored implementation.
6. **\`/pure-saas responsive [target]\`** — **Responsive Systems Engineer**: Makes the interface feel purposefully designed across all viewports (375px mobile to 1440px desktop) with zero overflow.

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

## Invoking Pure SaaS Workflows
- **Principal Designer (Main):** \`/pure-saas [request]\`
- **Creative Director & Builder:** \`/pure-saas design [brief]\`
- **Senior Visual Designer:** \`/pure-saas polish [target]\`
- **Independent Design Critic:** \`/pure-saas review [scope]\`
- **Reference Analyst:** \`/pure-saas reference <url>\`
- **Responsive Systems Engineer:** \`/pure-saas responsive [target]\`

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

1. Read SKILL.md in full. It defines the six specialist command workflows: Principal Designer,
   Creative Director, Senior Visual Designer, Independent Critic, Reference Analyst, and Responsive Engineer.
2. Retrieve exact references for the task using \`npx pure-saas ref "<component, framework, or topic>"\`.
3. Principal Command: Use \`/pure-saas [request]\` as the default entry point.
4. Specialist Commands:
   - \`/pure-saas design [brief]\`: Turn product brief into a distinctive, fully implemented interface.
   - \`/pure-saas polish [target]\`: Elevate typography tracking, surface lighting, micro-interactions.
   - \`/pure-saas review [scope]\`: Judge interface honestly across 10 dimensions with P0-P3 defect triage.
   - \`/pure-saas reference [URL/Image]\`: Extract design intelligence from references and adapt to target project.
   - \`/pure-saas responsive [target]\`: Viewport mastery from 375px mobile to 1440px desktop with zero overflow.
5. Non-Negotiable Engineering Rules:
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


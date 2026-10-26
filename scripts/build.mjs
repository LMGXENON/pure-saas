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

Pure SaaS operates via **one intelligent main command and 18 specialized verbs**:

1. **\`/pure-saas [request]\`**: Universal entry point. Autonomously inspects context, establishes \`DESIGN.md\`, executes frontend code, binds tokens, integrates motion and accessibility, and verifies output.
2. **Specialized Verbs**:
   - \`design\`: Establish/update \`DESIGN.md\` tokens and contracts.
   - \`landing\`: High-conversion SaaS landing page with hero, proof, and pricing.
   - \`review\`: 5-dimension deterministic quality audit (0–20 points) with P0–P3 defect triage.
   - \`polish\`: Elevate visual craft, typography tracking, surface lighting, and micro-interactions.
   - \`bolder\`: Amplify safe, flat, or bland UI into distinctive, high-conviction creative work.
   - \`quieter\`: Calm aggressive, noisy, or overstimulated layouts into serene clarity.
   - \`typeset\`: Editorial typography hierarchy, optical tracking, and fluid clamps.
   - \`layout\`: Fix spatial rhythm, asymmetric balance, and 8pt grid containment.
   - \`distill\`: Strip visual debt and simplify complex screens to their essential core.
   - \`harden\`: Production robustness (empty states, edge cases, error recovery, i18n).
   - \`animate\`: Purposeful spring physics (\`cubic-bezier(0.16, 1, 0.3, 1)\`).
   - \`colorize\`: Strategic 5-tier color ramps and mathematical WCAG 2.2 AA contrast.
   - \`delight\`: Shaders, reactive canvasses, and tactile micro-surprises.
   - \`adapt\` / \`responsive\`: Multi-viewport responsive mastery (375px mobile to 1440px desktop).
   - \`clarify\`: UX microcopy, active button verbs, and actionable error messages.
   - \`optimize\`: Core Web Vitals, virtualization, and sub-frame layout stability.
   - \`browser\`: Playwright CLI headless browser automation and multi-viewport screenshots.
   - \`3d\`: Procedural Three.js 3D models (img2threejs pipeline).
   - \`style\`: Modular style archetype registry (Swiss, Technical, Editorial, Modern Enterprise).

---

## 3. The 8-Step Build & Verification Loop

1. **Understand Requirements & Mode:** Determine whether surface is Persuade, Operate, Read, or Experience.
2. **Inspect Context:** Check dependencies, styling system, existing tokens, and backend APIs.
3. **Select Style Archetype:** Pick from curated archetypes in \`pure-saas style list\`.
4. **Author DESIGN.md:** Define 3-tier semantic tokens and verify WCAG contrast math.
5. **Implement Components:** Build with 8-state interaction matrix and zero raw hex codes.
6. **Capture Real Browser Screenshots:** Test across 1440px, 768px, and 375px viewports.
7. **Forensic Audit:** Measure code against 5 dimensions (0–20 score).
8. **Fix Defects & Verify Finish:** Triage P0–P3 defects and complete deliverable.

---

## 4. Hardware-Grade Craft Floor

- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in \`DESIGN.md\`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature cards, no repetitive kickers/eyebrows on every heading, no decorative side-stripe borders, no fake status dots, and no emoji UI icons.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (\`::selection\`), caret color (\`caret-color\`), focus rings, and custom scrollbars.
- **Never Fabricate Verification:** If an environment lacks browser inspection tools, report it as \`untested\`. Never claim passing verification for uninspected code.
`;

  const claudeManual = `# CLAUDE.md

Claude Code project instructions for Pure SaaS.

## Invoking Pure SaaS
- Main command: \`/pure-saas [request]\`
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

1. Read SKILL.md in full. It defines the stance, surface modes (Persuade, Operate, Read, Experience),
   the 8-step build loop, the 8-state component matrix, semantic token architecture, and honest verification.
2. Retrieve exact references for the task using \`npx pure-saas ref "<component, framework, or topic>"\`.
3. Universal Command: Use \`/pure-saas [request]\` as the default entry point.
4. Specialist Verbs:
   - \`design\`: Establish or update DESIGN.md before coding.
   - \`landing\`: High-conversion SaaS landing page with hero, proof, and pricing.
   - \`polish\`: Elevate typography tracking, surface lighting, micro-interactions.
   - \`bolder\` / \`quieter\`: Amplify bland UI or calm overstimulated layouts.
   - \`typeset\` / \`layout\`: Editorial typography and 8pt spatial grid rhythm.
   - \`review\`: 5-dimension deterministic audit (A11y, Perf, Theming, Responsive, Integrity) scored 0–20.
   - \`browser\`: Playwright CLI headless browser automation & multi-viewport screenshots.
   - \`3d\`: Procedural Three.js 3D model synthesis from reference images.
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

#!/usr/bin/env node

/**
 * Pure SaaS Real Sample Project E2E Verification
 * Simulates a real frontend development workflow in an isolated test project.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sampleProjectDir = path.join(rootDir, '.test-tmp', 'sample-saas-app');
const cliPath = path.join(rootDir, 'cli/bin/pure-saas.js');

function runInSample(args) {
  return spawnSync('node', [cliPath, ...args], { encoding: 'utf8', cwd: sampleProjectDir });
}

console.log('=== Pure SaaS Real Sample Project E2E Verification ===\n');

try {
  // 1. Clean & Setup Sample Directory
  if (fs.existsSync(sampleProjectDir)) {
    fs.rmSync(sampleProjectDir, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(sampleProjectDir, 'src/components'), { recursive: true });

  // 2. Initialize simulated package.json
  const samplePkg = {
    name: "sample-fintech-saas",
    version: "1.0.0",
    private: true,
    dependencies: {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "lucide-react": "^0.475.0"
    },
    devDependencies: {
      "tailwindcss": "^4.0.0",
      "typescript": "^5.7.0",
      "vite": "^6.0.0"
    }
  };
  fs.writeFileSync(path.join(sampleProjectDir, 'package.json'), JSON.stringify(samplePkg, null, 2), 'utf8');
  console.log('1. Created sample project environment with React + Tailwind v4');

  // 3. Test "pure-saas context"
  const ctxRes = runInSample(['context', '--target', 'src/pages/dashboard', '--json']);
  if (ctxRes.status !== 0) throw new Error(`Context command failed: ${ctxRes.stderr}`);
  const ctx = JSON.parse(ctxRes.stdout);
  console.log(`2. Inspected context: Framework=${ctx.framework}, Styling=${ctx.styling}, Mode=${ctx.mode}`);
  if (ctx.framework !== 'React (Vite)' || ctx.styling !== 'Tailwind CSS v4' || ctx.mode !== 'Operate') {
    throw new Error(`Context detection mismatch: ${JSON.stringify(ctx)}`);
  }

  // 4. Test "pure-saas design-system"
  const dsRes = runInSample(['design-system', '--product', 'fintech', '--variance', '7', '--motion', '6', '--density', '8', '--out', 'DESIGN.md']);
  if (dsRes.status !== 0) throw new Error(`Design-system generation failed: ${dsRes.stderr}`);
  console.log('3. Generated persistent DESIGN.md with FinTech archetype tokens');

  // 5. Test "pure-saas validate" & "pure-saas contrast"
  const valRes = runInSample(['validate', 'DESIGN.md']);
  const conRes = runInSample(['contrast', 'DESIGN.md']);
  if (valRes.status !== 0 || conRes.status !== 0) {
    throw new Error(`DESIGN.md validation or contrast failed: ${valRes.stdout} ${conRes.stdout}`);
  }
  console.log('4. Validated DESIGN.md schema and verified 100% WCAG 2.2 AA contrast compliance');

  // 6. Test "pure-saas export-tokens"
  const cssRes = runInSample(['export-tokens', 'DESIGN.md', '--format', 'css', '--out', 'src/tokens.css']);
  const themeRes = runInSample(['export-tokens', 'DESIGN.md', '--format', 'tailwind-v4', '--out', 'src/theme.css']);
  if (cssRes.status !== 0 || themeRes.status !== 0) {
    throw new Error('Token export to CSS/Tailwind v4 failed');
  }
  console.log('5. Exported design tokens to src/tokens.css and src/theme.css');

  // 7. Test "pure-saas 3d scaffold"
  const modelRes = runInSample(['3d', 'scaffold', 'PortfolioVisualizer', '--out', 'src/components/PortfolioVisualizer.tsx']);
  if (modelRes.status !== 0) throw new Error('Procedural 3D scaffolding failed');
  console.log('6. Scaffolded procedural Three.js component with lifecycle memory disposal');

  // 8. Create production component bound to semantic tokens
  const sampleComponentCode = `import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export function MetricCard({ label, value, change, isPositive }: MetricCardProps) {
  return (
    <div className="p-6 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm transition-transform duration-150 hover:-translate-y-0.5">
      <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold tabular-nums tracking-tight">
        {value}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-sm font-medium">
        <span className={isPositive ? 'text-[var(--color-status-success)]' : 'text-[var(--color-status-error)]'}>
          {change}
        </span>
        <span className="text-[var(--color-text-muted)] text-xs">vs last month</span>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(sampleProjectDir, 'src/components/MetricCard.tsx'), sampleComponentCode, 'utf8');
  console.log('7. Implemented MetricCard component adhering to 8pt grid, tabular-nums, and semantic tokens');

  // 9. Run "pure-saas audit" on the sample project
  const auditRes = runInSample(['audit', '--source', 'src', '--json']);
  if (auditRes.status !== 0) throw new Error(`Audit failed: ${auditRes.stderr}`);
  const audit = JSON.parse(auditRes.stdout);
  console.log(`8. Deterministic audit completed: Score=${audit.totalScore}/20 (${audit.band.toUpperCase()})`);

  // Verify that zero P0 blockers exist
  const p0s = audit.defects.filter(d => d.severity === 'P0');
  if (p0s.length > 0) throw new Error(`Sample project has P0 defects: ${JSON.stringify(p0s)}`);

  console.log('\n========================================');
  console.log('✓ End-to-End Sample Project Verification PASSED!');
  console.log('All modular capabilities verified in a real application context.\n');

  // Cleanup
  fs.rmSync(sampleProjectDir, { recursive: true, force: true });
  process.exit(0);
} catch (err) {
  console.error(`\n✗ Sample project test FAILED: ${err.message}`);
  // Keep directory for inspection on error
  process.exit(1);
}

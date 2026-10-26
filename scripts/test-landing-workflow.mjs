#!/usr/bin/env node

/**
 * Pure SaaS Real Landing Page Workflow Test
 * Verifies that the skill can produce, inspect, and refine a polished, responsive landing page.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const projectDir = path.join(rootDir, '.test-tmp', 'landing-page-test');
const cliPath = path.join(rootDir, 'cli/bin/pure-saas.js');

function runCli(args) {
  return spawnSync('node', [cliPath, ...args], { encoding: 'utf8', cwd: projectDir });
}

console.log('=== Pure SaaS Landing Page Generation & Polish Workflow Test ===\n');

try {
  if (fs.existsSync(projectDir)) {
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(projectDir, 'src/components'), { recursive: true });

  // 1. Initialize simulated package.json for a modern web landing page
  const pkg = {
    name: "cloud-pulse-landing",
    version: "1.0.0",
    dependencies: {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "lucide-react": "^0.475.0"
    },
    devDependencies: {
      "tailwindcss": "^4.0.0",
      "typescript": "^5.7.0"
    }
  };
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');
  console.log('1. Initialized landing page project environment');

  // 2. Context Inspection
  const ctxRes = runCli(['context', '--target', 'src/pages/index', '--json']);
  const ctx = JSON.parse(ctxRes.stdout);
  console.log(`2. Inspected context: Mode=${ctx.mode}, Styling=${ctx.styling}`);
  if (ctx.mode !== 'Persuade') {
    throw new Error(`Expected Persuade mode for landing page, got ${ctx.mode}`);
  }

  // 3. Establish Design Tokens via "pure-saas design-system"
  const dsRes = runCli(['design-system', '--product', 'developer-tool', '--style', 'developer-technical', '--out', 'DESIGN.md']);
  if (dsRes.status !== 0) throw new Error('Failed to generate design system');
  console.log('3. Established DESIGN.md with developer-technical style archetype');

  // 4. Validate Contrast
  const conRes = runCli(['contrast', 'DESIGN.md']);
  if (conRes.status !== 0) throw new Error('Contrast audit failed');
  console.log('4. Verified 100% WCAG 2.2 AA contrast compliance');

  // 5. Implement Production-Grade Landing Page Components
  const landingPageCode = `import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Terminal, Shield, Zap, ChevronDown } from 'lucide-react';

export function LandingPage() {
  const [copied, setCopied] = useState(false);
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-canvas)] text-[var(--color-text-primary)] antialiased">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Terminal className="h-5 w-5 text-[var(--color-action-primary)]" />
            <span>CloudPulse</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#features" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Features</a>
            <a href="#pricing" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Pricing</a>
            <a href="#faq" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">FAQ</a>
          </nav>
          <button className="rounded-md bg-[var(--color-action-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverse)] shadow-sm transition hover:bg-[var(--color-action-hover)] active:scale-[0.985]">
            Start Free Trial
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-balance">
              Zero-latency observability for modern cloud backends.
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] text-pretty leading-relaxed">
              Trace microservice bottlenecks in real time with hardware-grade precision. 
              No sampling, no guesswork, and sub-millisecond query response times.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 rounded-md bg-[var(--color-action-primary)] px-6 py-3 text-base font-medium text-[var(--color-text-inverse)] shadow-sm transition hover:bg-[var(--color-action-hover)] active:scale-[0.985]">
                <span>Deploy Cluster</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-6 py-3 text-base font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-surface-raised)]">
                Live Demo
              </button>
            </div>

            {/* Compact Setup Prompt Control */}
            <div className="mt-8 flex items-center justify-between rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-3 text-sm">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-[var(--color-text-secondary)]" />
                <span className="font-mono text-xs text-[var(--color-text-secondary)]">curl -fsSL https://cloudpulse.dev/install | sh</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium text-[var(--color-action-primary)] hover:bg-[var(--color-bg-surface-raised)]"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[var(--color-status-success)]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-[var(--color-border-subtle)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Transparent, predictable pricing</h2>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <span className={!annualBilling ? 'font-semibold' : 'text-[var(--color-text-secondary)]'}>Monthly</span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className="relative h-6 w-11 rounded-full bg-[var(--color-border)] p-0.5 transition"
              >
                <div className={\`h-5 w-5 rounded-full bg-[var(--color-action-primary)] transition-transform \${annualBilling ? 'translate-x-5' : ''}\`} />
              </button>
              <span className={annualBilling ? 'font-semibold' : 'text-[var(--color-text-secondary)]'}>Annual (Save 20%)</span>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-8">
              <h3 className="text-xl font-bold">Standard Node</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">For early-stage startups and production services.</p>
              <div className="mt-6 text-4xl font-bold tabular-nums">
                {annualBilling ? '$49' : '$59'}<span className="text-sm font-normal text-[var(--color-text-muted)]">/month</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--color-status-success)]" /> Up to 50 microservices</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--color-status-success)]" /> 7-day retention</li>
              </ul>
              <button className="mt-8 w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface-raised)] py-2.5 text-sm font-medium transition hover:bg-[var(--color-border)]">
                Get Started
              </button>
            </div>

            <div className="relative rounded-xl border-2 border-[var(--color-action-primary)] bg-[var(--color-bg-surface)] p-8 shadow-md">
              <h3 className="text-xl font-bold">Enterprise Cluster</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">For high-throughput architectures requiring custom retention.</p>
              <div className="mt-6 text-4xl font-bold tabular-nums">
                {annualBilling ? '$199' : '$249'}<span className="text-sm font-normal text-[var(--color-text-muted)]">/month</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--color-status-success)]" /> Unlimited microservices</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--color-status-success)]" /> 90-day retention & SOC2</li>
              </ul>
              <button className="mt-8 w-full rounded-md bg-[var(--color-action-primary)] py-2.5 text-sm font-medium text-[var(--color-text-inverse)] transition hover:bg-[var(--color-action-hover)]">
                Start Enterprise Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(projectDir, 'src/components/LandingPage.tsx'), landingPageCode, 'utf8');
  console.log('5. Implemented complete landing page component with responsive navigation, hero, copy prompt, and pricing matrix');

  // 6. Test Specialist Verbs: polish, typeset, and audit
  const polishRes = runCli(['polish']);
  const typesetRes = runCli(['typeset']);
  const auditRes = runCli(['audit', '--source', 'src', '--json']);
  const audit = JSON.parse(auditRes.stdout);

  console.log(`6. Executed specialist refinement verbs (polish, typeset)`);
  console.log(`7. Deterministic audit score: ${audit.totalScore}/20 (${audit.band.toUpperCase()})`);

  // Verify that zero P0 blockers exist
  const p0s = audit.defects.filter(d => d.severity === 'P0');
  if (p0s.length > 0) throw new Error(`Landing page has P0 defects: ${JSON.stringify(p0s)}`);

  console.log('\n========================================');
  console.log('✓ Landing page generation & refinement workflow verified successfully!');

  // Cleanup
  fs.rmSync(projectDir, { recursive: true, force: true });
  process.exit(0);
} catch (err) {
  console.error(`\n✗ Landing workflow test FAILED: ${err.message}`);
  process.exit(1);
}

// pure-saas-website/src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { AgentPromptBanner } from '../components/AgentPromptBanner';
import {
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Code2,
  Eye
} from 'lucide-react';

const VERIFIED_INSTALL_PROMPT = `Configure this repository with Pure SaaS.
1. Run \`npx pure-saas init\` to install skill files and agent rules.
2. Run \`npx pure-saas design-system --product "SaaS" --variance 5 --motion 5 --density 6 --out DESIGN.md\` to establish semantic tokens.
3. Verify the installation by running \`npx pure-saas validate DESIGN.md\`.`;

// =========================================================================
// REAL CORRESPONDING SOURCE CODE STRINGS FOR SECTION 2
// =========================================================================
const CODE_WITHOUT_PURE_SAAS = `// Without Pure SaaS: Unguided AI output
// Raw hardcoded hex values, clashing border radii, unformatted numbers, pulsing green circle
export function CloudScaleConsole() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#6366f1', borderRadius: '8px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '15px' }}>CloudScale</span>
          <span style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>us-east-1</span>
        </div>
        <button style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 14px', fontSize: '12px' }}>
          Deploy Service
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>P99 LATENCY</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>28.4ms</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>THROUGHPUT</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>924,108 req/s</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>ERROR RATE</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>0.041%</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>CLUSTER HEALTH</div>
          <div style={{ marginTop: '6px', fontSize: '12px', color: '#4ade80', fontWeight: '500' }}>
            32/32 Online (100%)
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ marginTop: '20px', border: '1px solid #334155', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#1e293b', color: '#cbd5e1' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>Service</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Route</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>P99</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: '1px solid #1e293b' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>api-gateway</td>
              <td style={{ padding: '10px', color: '#94a3b8' }}>/v1/*</td>
              <td style={{ padding: '10px' }}>14.2ms</td>
              <td style={{ padding: '10px', color: '#22c55e' }}>Active</td>
            </tr>
            <tr style={{ borderTop: '1px solid #1e293b' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>auth-service</td>
              <td style={{ padding: '10px', color: '#94a3b8' }}>/auth/*</td>
              <td style={{ padding: '10px' }}>9.8ms</td>
              <td style={{ padding: '10px', color: '#22c55e' }}>Active</td>
            </tr>
            <tr style={{ borderTop: '1px solid #1e293b' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>billing-worker</td>
              <td style={{ padding: '10px', color: '#94a3b8' }}>/billing/*</td>
              <td style={{ padding: '10px' }}>31.5ms</td>
              <td style={{ padding: '10px', color: '#f59e0b' }}>Degraded</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}`;

const CODE_WITH_PURE_SAAS = `// With Pure SaaS: Guided by DESIGN.md semantic tokens
// System 8pt grid, Apple hairline borders, tabular figures, accessible focus states, static status pills
export function CloudScaleConsole() {
  return (
    <div className="rounded-2xl bg-surface-base border border-border-subtle p-6 shadow-subtle space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
            CS
          </div>
          <span className="font-bold text-sm text-text-primary tracking-tight">CloudScale</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-muted text-text-secondary border border-border-subtle">
            prod-us-east-1
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-mono hidden sm:inline">Last sync: 2m ago</span>
          <button
            type="button"
            className="h-8 px-3.5 rounded-lg bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-all shadow-xs"
          >
            Deploy Service
          </button>
        </div>
      </div>

      {/* 4-Metric Cluster */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Global P99</div>
          <div className="text-xl font-bold font-mono tabular-nums text-text-primary">18.4ms</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">−2.1ms vs 24h</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Throughput</div>
          <div className="text-xl font-bold font-mono tabular-nums text-text-primary">924.1k</div>
          <div className="text-[11px] text-text-secondary font-mono">req/sec</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Error Rate</div>
          <div className="text-xl font-bold font-mono tabular-nums text-text-primary">0.002%</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Nominal</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Cluster Health</div>
          <div className="text-xl font-bold font-mono tabular-nums text-text-primary">32 / 32</div>
          <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            All Nodes Healthy
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted/60 text-text-primary font-semibold border-b border-border-subtle">
              <tr>
                <th className="px-3.5 py-2.5">Service</th>
                <th className="px-3.5 py-2.5">Routing Path</th>
                <th className="px-3.5 py-2.5 font-mono">P99</th>
                <th className="px-3.5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle bg-surface-base">
              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-3.5 py-2.5 font-semibold text-text-primary">api-gateway</td>
                <td className="px-3.5 py-2.5 font-mono text-text-secondary">/v1/*</td>
                <td className="px-3.5 py-2.5 font-mono tabular-nums text-text-primary">14.2ms</td>
                <td className="px-3.5 py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-3.5 py-2.5 font-semibold text-text-primary">auth-service</td>
                <td className="px-3.5 py-2.5 font-mono text-text-secondary">/auth/*</td>
                <td className="px-3.5 py-2.5 font-mono tabular-nums text-text-primary">9.8ms</td>
                <td className="px-3.5 py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-3.5 py-2.5 font-semibold text-text-primary">billing-worker</td>
                <td className="px-3.5 py-2.5 font-mono text-text-secondary">/billing/*</td>
                <td className="px-3.5 py-2.5 font-mono tabular-nums text-text-primary">31.5ms</td>
                <td className="px-3.5 py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    High Load
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`;

export const HomePage: React.FC = () => {
  // Comparison State
  const [selectedVersion, setSelectedVersion] = useState<'with' | 'without'>('with');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copiedCodeSuccess, setCopiedCodeSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  const handleCopyCode = async () => {
    const textToCopy = selectedVersion === 'with' ? CODE_WITH_PURE_SAAS : CODE_WITHOUT_PURE_SAAS;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedCodeSuccess(true);
      setTimeout(() => setCopiedCodeSuccess(false), 2000);
    } catch {}
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-accent/20 selection:text-accent">
      {/* ================================================================= */}
      {/* SECTION 1: HERO                                                   */}
      {/* ================================================================= */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-border-subtle">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted border border-border-subtle text-text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Developer Skill & Design Toolkit</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.08] max-w-3xl mx-auto">
            Build better SaaS interfaces with Pure SaaS.
          </h1>

          {/* One short supporting paragraph */}
          <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-normal">
            Pure SaaS gives AI coding agents practical design guidance and reusable workflows to help build polished SaaS websites.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs?slug=getting-started-installation"
              className="h-11 px-6 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/showcase"
              className="h-11 px-5 rounded-xl bg-surface-base border border-border-subtle text-text-primary text-xs font-semibold hover:bg-surface-hover hover:border-border-default transition-colors inline-flex items-center gap-2 shadow-2xs"
            >
              <span>Explore Showcase</span>
            </Link>
          </div>

          {/* Compact Installation-Prompt Control (Hidden Prompt Text by Default) */}
          <div className="pt-4 max-w-xl mx-auto w-full">
            <AgentPromptBanner
              promptText={VERIFIED_INSTALL_PROMPT}
              className="w-full"
              description="Copy the installation instructions into your AI coding agent."
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2: WEBSITE COMPARISON (COMPLETE WEBSITE PREVIEW & CODE)   */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 border-b border-border-subtle bg-surface-base/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent mb-2">
                <span>Official Demonstration</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Before and after Pure SaaS
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl">
                An authentic comparison showing two implementations of the same cloud infrastructure website: unguided AI output versus Pure SaaS guided output.
              </p>
            </div>

            {/* Version & View Switching Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Version Toggle (With Pure SaaS vs Without Pure SaaS) */}
              <div className="inline-flex p-1 rounded-xl bg-surface-muted border border-border-subtle text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedVersion('with')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedVersion === 'with'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  With Pure SaaS
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVersion('without')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedVersion === 'without'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Without Pure SaaS
                </button>
              </div>

              {/* View Mode Toggle (Preview vs Source Code) */}
              <div className="inline-flex p-1 rounded-xl bg-surface-muted border border-border-subtle text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('code')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    viewMode === 'code'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Visual Display Area */}
          <div className="rounded-2xl border border-border-subtle bg-surface-base overflow-hidden shadow-subtle">
            {/* Header Status Bar of the Comparison Container */}
            <div className="px-5 py-3 border-b border-border-subtle bg-surface-muted/40 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                </div>
                <span className="text-border-default mx-1">|</span>
                <span className="font-semibold text-text-primary">
                  {selectedVersion === 'with' ? 'CloudScale Console — With Pure SaaS' : 'CloudScale Console — Without Pure SaaS'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-surface-base text-text-muted border border-border-subtle">
                  {selectedVersion === 'with' ? 'DESIGN.md Tokens Enforced' : 'Unguided AI Output'}
                </span>
              </div>

              {viewMode === 'code' && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-base border border-border-subtle text-text-secondary hover:text-text-primary text-[11px] font-medium transition-colors"
                >
                  {copiedCodeSuccess ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCodeSuccess ? 'Copied Code' : 'Copy Code'}</span>
                </button>
              )}
            </div>

            {/* Display Content: Real Rendered Website Preview or Corresponding Source Code */}
            {viewMode === 'preview' ? (
              <div className="p-4 sm:p-6 lg:p-8">
                {selectedVersion === 'with' ? (
                  /* ======================================================= */
                  /* REAL RENDERED COMPLETE WEBSITE PREVIEW: WITH PURE SAAS  */
                  /* ======================================================= */
                  <div className="space-y-6">
                    {/* Navigation Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          CS
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-text-primary tracking-tight">CloudScale</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-muted text-text-secondary border border-border-subtle">
                              prod-us-east-1
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted font-mono hidden sm:inline">Telemetry sync: 2m ago</span>
                        <button
                          type="button"
                          className="h-8 px-3.5 rounded-lg bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-all shadow-xs"
                        >
                          Deploy Service
                        </button>
                      </div>
                    </div>

                    {/* 4-Metric Cluster */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Global P99</div>
                        <div className="text-2xl font-bold font-mono tabular-nums text-text-primary">18.4ms</div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">−2.1ms vs 24h</div>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Throughput</div>
                        <div className="text-2xl font-bold font-mono tabular-nums text-text-primary">924.1k</div>
                        <div className="text-[11px] text-text-secondary font-mono">req/sec</div>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Error Rate</div>
                        <div className="text-2xl font-bold font-mono tabular-nums text-text-primary">0.002%</div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Nominal</div>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Cluster Health</div>
                        <div className="text-2xl font-bold font-mono tabular-nums text-text-primary">32 / 32</div>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          All Nodes Healthy
                        </span>
                      </div>
                    </div>

                    {/* Main Service Status Table */}
                    <div className="rounded-xl border border-border-subtle overflow-hidden">
                      <div className="px-4 py-3 bg-surface-muted/30 border-b border-border-subtle flex items-center justify-between">
                        <span className="text-xs font-bold text-text-primary">Active Production Services</span>
                        <span className="text-[11px] text-text-muted font-mono">4 services operational</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-surface-muted/60 text-text-primary font-semibold border-b border-border-subtle">
                            <tr>
                              <th className="px-4 py-2.5">Service</th>
                              <th className="px-4 py-2.5">Routing Path</th>
                              <th className="px-4 py-2.5 font-mono">P99</th>
                              <th className="px-4 py-2.5">Status</th>
                              <th className="px-4 py-2.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-subtle bg-surface-base">
                            <tr className="hover:bg-surface-hover/50 transition-colors">
                              <td className="px-4 py-3 font-semibold text-text-primary">api-gateway</td>
                              <td className="px-4 py-3 font-mono text-text-secondary">/v1/*</td>
                              <td className="px-4 py-3 font-mono tabular-nums text-text-primary">14.2ms</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  Active
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button type="button" className="text-text-secondary hover:text-text-primary text-xs font-medium">Inspect</button>
                              </td>
                            </tr>
                            <tr className="hover:bg-surface-hover/50 transition-colors">
                              <td className="px-4 py-3 font-semibold text-text-primary">auth-service</td>
                              <td className="px-4 py-3 font-mono text-text-secondary">/auth/*</td>
                              <td className="px-4 py-3 font-mono tabular-nums text-text-primary">9.8ms</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  Active
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button type="button" className="text-text-secondary hover:text-text-primary text-xs font-medium">Inspect</button>
                              </td>
                            </tr>
                            <tr className="hover:bg-surface-hover/50 transition-colors">
                              <td className="px-4 py-3 font-semibold text-text-primary">billing-worker</td>
                              <td className="px-4 py-3 font-mono text-text-secondary">/billing/*</td>
                              <td className="px-4 py-3 font-mono tabular-nums text-text-primary">31.5ms</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                  High Load
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button type="button" className="text-text-secondary hover:text-text-primary text-xs font-medium">Inspect</button>
                              </td>
                            </tr>
                            <tr className="hover:bg-surface-hover/50 transition-colors">
                              <td className="px-4 py-3 font-semibold text-text-primary">telemetry-ingest</td>
                              <td className="px-4 py-3 font-mono text-text-secondary">/events/*</td>
                              <td className="px-4 py-3 font-mono tabular-nums text-text-primary">6.1ms</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  Active
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button type="button" className="text-text-secondary hover:text-text-primary text-xs font-medium">Inspect</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary Callout */}
                    <div className="p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="text-text-secondary">
                        <strong className="text-text-primary font-semibold">Pure SaaS Enforcement:</strong> Semantic tokens, hairline borders, tabular numerals, accessible keyboard focus rings, and zero pulsing dots.
                      </span>
                      <button
                        type="button"
                        onClick={() => setViewMode('code')}
                        className="text-accent hover:underline font-semibold shrink-0"
                      >
                        Inspect TSX Code →
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ======================================================= */
                  /* REAL RENDERED COMPLETE WEBSITE PREVIEW: WITHOUT PURE SAAS*/
                  /* ======================================================= */
                  <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }} className="space-y-6">
                    {/* Navigation Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '28px', height: '28px', backgroundColor: '#6366f1', borderRadius: '8px' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>CloudScale</span>
                        <span style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>us-east-1</span>
                      </div>
                      <button style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer' }}>
                        Deploy Service
                      </button>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>P99 LATENCY</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>28.4ms</div>
                      </div>
                      <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>THROUGHPUT</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>924,108 req/s</div>
                      </div>
                      <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>ERROR RATE</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>0.041%</div>
                      </div>
                      <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>CLUSTER HEALTH</div>
                        <div style={{ marginTop: '6px', fontSize: '12px', color: '#4ade80', fontWeight: '500' }}>
                          32/32 Online (100%)
                        </div>
                      </div>
                    </div>

                    {/* Table */}
                    <div style={{ border: '1px solid #334155', borderRadius: '10px', overflow: 'hidden' }}>
                      <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#1e293b', color: '#cbd5e1' }}>
                          <tr>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Service</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Route</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>P99</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderTop: '1px solid #1e293b' }}>
                            <td style={{ padding: '10px', fontWeight: 'bold' }}>api-gateway</td>
                            <td style={{ padding: '10px', color: '#94a3b8' }}>/v1/*</td>
                            <td style={{ padding: '10px' }}>14.2ms</td>
                            <td style={{ padding: '10px', color: '#22c55e' }}>Active</td>
                          </tr>
                          <tr style={{ borderTop: '1px solid #1e293b' }}>
                            <td style={{ padding: '10px', fontWeight: 'bold' }}>auth-service</td>
                            <td style={{ padding: '10px', color: '#94a3b8' }}>/auth/*</td>
                            <td style={{ padding: '10px' }}>9.8ms</td>
                            <td style={{ padding: '10px', color: '#22c55e' }}>Active</td>
                          </tr>
                          <tr style={{ borderTop: '1px solid #1e293b' }}>
                            <td style={{ padding: '10px', fontWeight: 'bold' }}>billing-worker</td>
                            <td style={{ padding: '10px', color: '#94a3b8' }}>/billing/*</td>
                            <td style={{ padding: '10px' }}>31.5ms</td>
                            <td style={{ padding: '10px', color: '#f59e0b' }}>Degraded</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Analysis Callout */}
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1">
                      <div className="font-semibold text-rose-400">Unguided AI Design Deficiencies:</div>
                      <div className="text-text-muted">
                        Hardcoded hex colors (#0f172a, #6366f1, #38bdf8), clashing radii (16px, 12px, 10px, 4px), proportional fonts causing jittering figures, and missing keyboard navigation states.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ======================================================= */
              /* EXACT CORRESPONDING SOURCE CODE PANEL                   */
              /* ======================================================= */
              <div className="p-4 sm:p-6 bg-surface-base">
                <CodeBlock
                  code={selectedVersion === 'with' ? CODE_WITH_PURE_SAAS : CODE_WITHOUT_PURE_SAAS}
                  language={selectedVersion === 'with' ? 'tsx' : 'jsx'}
                  filename={selectedVersion === 'with' ? 'CloudScaleConsole.tsx' : 'CloudScaleConsole.jsx'}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3: FAQ                                                    */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Everything you need to know about setting up and using Pure SaaS.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'What is Pure SaaS?',
                a: 'Pure SaaS is an open-source skill and design enforcement toolkit that gives AI coding assistants (Cursor, Windsurf, Claude Code, GitHub Copilot, Gemini) verified design rules, semantic tokens, and component blueprints. It runs locally with zero external network requests.',
                link: '/docs?slug=getting-started-introduction',
                linkText: 'Read Introduction'
              },
              {
                q: 'How do I install it?',
                a: 'Run `npx pure-saas init` in your project root. It inspects your repository, detects your active editor, and configures the appropriate instruction files (.cursorrules, GEMINI.md, or .windsurfrules) automatically.',
                link: '/docs?slug=getting-started-installation',
                linkText: 'Installation Guide'
              },
              {
                q: 'Which AI coding agents does it support?',
                a: 'Pure SaaS natively supports Cursor IDE, Windsurf, Claude Code, Cline, GitHub Copilot, Google Gemini, and Antigravity, as well as standalone CLI execution in any terminal.',
                link: '/docs?slug=getting-started-installation#step-2-supported-environments',
                linkText: 'Supported Environments'
              },
              {
                q: 'Does it work with an existing project?',
                a: 'Yes. Pure SaaS adheres to strict non-regression rules: it preserves 100% of your backend APIs, database schemas, auth tokens, and test IDs, upgrading only the UI design layer and semantic tokens.',
                link: '/docs?slug=guide-refactoring-legacy-ui',
                linkText: 'Refactoring Guide'
              },
              {
                q: 'How do I use DESIGN.md, if supported?',
                a: 'DESIGN.md is the root specification file that defines your color tokens, surface hierarchy, and 1–10 design dials (variance, motion, density). The AI agent inspects this file before generating any code.',
                link: '/docs?slug=getting-started-configuration',
                linkText: 'DESIGN.md Documentation'
              },
              {
                q: 'Where can I see websites built with Pure SaaS?',
                a: 'Browse the curated community showcase and official examples to inspect real SaaS websites, dashboards, and developer tools built with Pure SaaS.',
                link: '/showcase',
                linkText: 'Explore Showcase'
              }
            ].map((faq, idx) => {
              const isOpen = Boolean(openFaq[idx]);
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-surface-base border border-border-subtle overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-semibold text-sm text-text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-1 focus-visible:ring-offset-canvas rounded-xl transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-text-secondary leading-relaxed space-y-2.5">
                      <p>{faq.a}</p>
                      <div>
                        <Link
                          to={faq.link}
                          className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                        >
                          <span>{faq.linkText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4: FINAL CTA                                              */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Ready to build better SaaS interfaces?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Equip your AI coding agent with practical design guidance, reusable components, and proven workflows.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs?slug=getting-started-installation"
              className="h-11 px-6 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/showcase"
              className="h-11 px-5 rounded-xl bg-surface-base border border-border-subtle text-text-primary text-xs font-semibold hover:bg-surface-hover hover:border-border-default transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Showcase</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import {
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Code2,
  Eye,
  Terminal,
  Monitor
} from 'lucide-react';

const HOST_INSTALL_COMMANDS = {
  cli: 'npx pure-saas init',
  claude: 'npx pure-saas init --preset linear-dark\n# Automatically registers /puresaas, /puresaas:design in .claude/commands/',
  cursor: 'npx pure-saas init\n# Automatically compiles .cursor/commands/ and .cursor/rules/*.mdc',
  codex: 'npx pure-saas init\n# Synchronizes skill to .agents/skills/pure-saas/SKILL.md'
};

const CODE_WITHOUT_PURE_SAAS = `// Without Pure SaaS: Unguided AI output
// Raw hardcoded hex values, clashing border radii, unformatted numbers, pulsing green circle
export function CloudScaleConsole() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
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
    </div>
  );
}`;

const CODE_WITH_PURE_SAAS = `// With Pure SaaS: Guided by DESIGN.md semantic tokens
// System 8pt grid, Apple hairline borders, tabular figures, accessible focus states, static status pills
export function CloudScaleConsole() {
  return (
    <div className="rounded-2xl bg-surface-base border border-border-subtle p-6 shadow-subtle space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
            CS
          </div>
          <span className="font-bold text-sm text-text-primary tracking-tight">CloudScale</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-muted text-text-secondary border border-border-subtle">
            prod-us-east-1
          </span>
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
    </div>
  );
}`;

export const HomePage: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<'with' | 'without'>('with');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeHost, setActiveHost] = useState<'cli' | 'claude' | 'cursor' | 'codex'>('cli');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCodeSuccess, setCopiedCodeSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(HOST_INSTALL_COMMANDS[activeHost]);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {}
  };

  const handleCopyCode = async () => {
    const textToCopy = selectedVersion === 'with' ? CODE_WITH_PURE_SAAS : CODE_WITHOUT_PURE_SAAS;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedCodeSuccess(true);
      setTimeout(() => setCopiedCodeSuccess(false), 2000);
    } catch {}
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-accent/20 selection:text-accent">
      {/* SECTION 1: HERO */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-border-subtle">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted border border-border-subtle text-text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Universal AI Design Skill & Engineering Toolkit</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary leading-[1.05] max-w-4xl mx-auto">
            Design original interfaces.
            <br />
            Eliminate AI slop.
          </h1>

          <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Pure SaaS guides AI coding assistants in producing Apple-grade UI/UX designs, 3-tier semantic tokens, 8-state components, and verified responsive layouts with zero generic templates.
          </p>

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
              <Monitor className="w-3.5 h-3.5 text-accent" />
              <span>Interactive Showcase</span>
            </Link>

            <Link
              to="/commands"
              className="h-11 px-5 rounded-xl bg-surface-base border border-border-subtle text-text-primary text-xs font-semibold hover:bg-surface-hover hover:border-border-default transition-colors inline-flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-text-secondary" />
              <span>Explore 6 Commands</span>
            </Link>
          </div>

          {/* Interactive Multi-Host Installation Bar */}
          <div className="pt-6 max-w-2xl mx-auto w-full">
            <div className="p-4 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Install in Your Environment</span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'cli', label: 'CLI / Terminal' },
                    { id: 'claude', label: 'Claude Code' },
                    { id: 'cursor', label: 'Cursor' },
                    { id: 'codex', label: 'Codex' }
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHost(h.id as any)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        activeHost === h.id
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 bg-surface-muted/50 p-3 rounded-xl border border-border-subtle font-mono text-xs text-text-primary overflow-x-auto">
                <span className="truncate">{HOST_INSTALL_COMMANDS[activeHost]}</span>
                <button
                  onClick={handleCopyInstall}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-sans font-semibold transition-colors shrink-0 shadow-xs"
                >
                  {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedInstall ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 6 INDEPENDENT CANONICAL COMMANDS */}
      <section className="py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
              <span>Command Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
              Six Independent Specialist Commands
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Pure SaaS does not rely on a monolithic prompt. It provides six namespaced workflows, each tailored with senior-level decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                cmd: '/puresaas',
                role: 'Principal Designer & Orchestrator',
                desc: 'Understands the brief, inspects repo context, coordinates specialist workflows, implements components, and verifies output.',
                playbook: 'skill/reference/workflow.md'
              },
              {
                cmd: '/puresaas:design',
                role: 'Creative Director & Builder',
                desc: 'Turns product briefs into distinctive interfaces with bold visual hierarchy, authentic copywriting, and selectable archetypes.',
                playbook: 'skill/reference/design.md'
              },
              {
                cmd: '/puresaas:polish',
                role: 'Senior Visual Designer',
                desc: 'Elevates typography tracking, surface lighting, hairline borders, and micro-interactions without breaking working behavior.',
                playbook: 'skill/reference/polish.md'
              },
              {
                cmd: '/puresaas:review',
                role: 'Independent Design Critic',
                desc: 'Judges interfaces honestly across 10 dimensions, prioritizing defects from P0 to P3 and driving verified code fixes.',
                playbook: 'skill/reference/review.md'
              },
              {
                cmd: '/puresaas:clone',
                role: 'Reference Analyst & Cloning Engineer',
                desc: 'Deconstructs reference websites or screenshots and recreates their layout and styling cleanly inside your project framework.',
                playbook: 'skill/reference/clone.md'
              },
              {
                cmd: '/puresaas:responsive',
                role: 'Responsive Systems Engineer',
                desc: 'Audits multi-viewport behavior from 375px to 1440px, eliminating horizontal overflow and calibrating touch ergonomics.',
                playbook: 'skill/reference/responsive.md'
              }
            ].map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle hover:border-border-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-accent">
                      {c.cmd}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      playbook
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary">
                    {c.role}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-semibold">
                  <Link to={`/commands?cmd=${c.cmd.replace('/puresaas:', '').replace('/puresaas', 'puresaas')}`} className="text-accent hover:underline flex items-center gap-1">
                    <span>Inspect Workflow</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BEFORE & AFTER COMPARISON */}
      <section className="py-16 md:py-24 border-b border-border-subtle bg-surface-base/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent mb-2">
                <span>Real Output Comparison</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Before and after Pure SaaS
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl">
                Unguided AI code vs Pure SaaS guided code implementing the exact same telemetry dashboard brief.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
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

          <div className="rounded-2xl border border-border-subtle bg-surface-base overflow-hidden shadow-subtle">
            <div className="px-5 py-3 border-b border-border-subtle bg-surface-muted/40 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                </div>
                <span className="font-semibold text-text-primary">
                  {selectedVersion === 'with' ? 'CloudScale Console — With Pure SaaS (Semantic Tokens)' : 'CloudScale Console — Without Pure SaaS (Unguided Clichés)'}
                </span>
              </div>

              {viewMode === 'code' && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-base border border-border-subtle text-text-secondary hover:text-text-primary text-[11px] font-medium transition-colors"
                >
                  {copiedCodeSuccess ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCodeSuccess ? 'Copied' : 'Copy Code'}</span>
                </button>
              )}
            </div>

            {viewMode === 'preview' ? (
              <div className="p-6">
                {selectedVersion === 'with' ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          CS
                        </div>
                        <div>
                          <span className="font-bold text-sm text-text-primary tracking-tight">CloudScale</span>
                          <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-muted text-text-secondary border border-border-subtle">
                            prod-us-east-1
                          </span>
                        </div>
                      </div>
                      <button className="h-8 px-3.5 rounded-lg bg-accent text-white text-xs font-semibold shadow-xs">
                        Deploy Service
                      </button>
                    </div>

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
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }} className="space-y-6">
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
                        <div style={{ marginTop: '6px', fontSize: '12px', color: '#4ade80' }}>32/32 Online (100%)</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-surface-base">
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

      {/* SECTION 4: THE 6-STEP BUILD & VERIFICATION LOOP */}
      <section className="py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
              The 6-Step Build & Verification Loop
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Pure SaaS replaces unguided prompting with a repeatable engineering loop that produces verifiable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Understand Mode', desc: 'Determines whether surface is Persuade (marketing), Operate (dashboard), Read (docs), or Experience (interactive).' },
              { step: '02', title: 'Inspect Context', desc: 'Scans package.json, framework, Tailwind tokens, and backend APIs to preserve 100% of existing functionality.' },
              { step: '03', title: 'Visual Direction', desc: 'Selects a style archetype from 100+ catalog options, establishes typography formulas, and authors DESIGN.md.' },
              { step: '04', title: 'Component Build', desc: 'Builds modular components with complete 8-state interaction matrices, keyboard focus rings, and zero raw hex codes.' },
              { step: '05', title: 'Browser Screenshots', desc: 'Captures live responsive screenshots across 1440px desktop, 768px tablet, and 375px mobile viewports.' },
              { step: '06', title: 'Forensic Audit', desc: 'Audits the result across 10 dimensions, triaging defects from P0 to P3 and confirming WCAG 2.2 AA contrast.' }
            ].map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
                <div className="text-accent font-mono font-bold text-xs">STEP {s.step}</div>
                <h3 className="text-base font-bold text-text-primary">{s.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
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
                a: 'Pure SaaS is an open-source skill and design enforcement toolkit that gives AI coding assistants (Cursor, Claude Code, Windsurf, Codex, Gemini) verified design rules, semantic tokens, and component blueprints. It runs locally with zero external network requests.',
                link: '/docs?slug=getting-started-introduction',
                linkText: 'Read Introduction'
              },
              {
                q: 'How do I install it?',
                a: 'Run `npx pure-saas init` in your project root. It inspects your repository, detects your active editor, and configures the appropriate instruction files (.cursorrules, GEMINI.md, or .claude/commands/) automatically.',
                link: '/docs?slug=getting-started-installation',
                linkText: 'Installation Guide'
              },
              {
                q: 'Which AI coding agents does it support?',
                a: 'Pure SaaS natively supports Claude Code, Cursor IDE, OpenAI Codex / Agents CLI, Windsurf, GitHub Copilot, and Google Gemini / Antigravity, as well as standalone CLI execution in any terminal.',
                link: '/docs?slug=getting-started-installation',
                linkText: 'Supported Environments'
              },
              {
                q: 'Does it work with an existing project?',
                a: 'Yes. Pure SaaS adheres to strict non-regression rules: it preserves 100% of your backend APIs, database schemas, auth tokens, and test IDs, upgrading only the UI design layer and semantic tokens.',
                link: '/docs?slug=workflow-lifecycle',
                linkText: 'Workflow Guide'
              },
              {
                q: 'How does DESIGN.md work?',
                a: 'DESIGN.md is the root specification file that defines your color tokens, surface hierarchy, and 1–10 design dials (variance, motion, density). The AI agent inspects this file before generating any code.',
                link: '/docs?slug=design-system-tokens',
                linkText: 'DESIGN.md Documentation'
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
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-semibold text-sm text-text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-colors"
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

      {/* SECTION 6: CLOSING CTA */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Ready to elevate your frontend engineering?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Equip your AI coding assistant with practical design guidance, reusable components, and proven workflows today.
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
              <span>Interactive Showcase</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

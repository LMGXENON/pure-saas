// pure-saas-website/src/pages/HomePage.tsx
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
  Eye
} from 'lucide-react';

const VERIFIED_INSTALL_PROMPT = `Configure this repository with Pure SaaS.
1. Run \`npx pure-saas init\` to install skill files and agent rules.
2. Run \`npx pure-saas design-system --product "SaaS" --variance 5 --motion 5 --density 6 --out DESIGN.md\` to establish semantic tokens.
3. Verify the installation by running \`npx pure-saas validate DESIGN.md\`.`;

// =========================================================================
// SECTION 2 CODE STRINGS (Exact matching code for genuine comparison)
// =========================================================================
const CODE_WITHOUT_PURE_SAAS = `// Without Pure SaaS: Unguided AI output
// Arbitrary hardcoded hex values, mismatched border radii, lack of accessible focus states
export function ApiKeyCard() {
  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '20px', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '15px', fontWeight: 'bold' }}>Production API Key</h3>
        <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>
          Active
        </span>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>
        Used to authenticate high-throughput webhook telemetry.
      </p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <input
          readOnly
          value="sk_live_98a7df8a97f98d7sf"
          style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #475569', color: '#38bdf8', borderRadius: '4px', padding: '6px 10px', fontSize: '12px' }}
        />
        <button
          style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '3px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer' }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}`;

const CODE_WITH_PURE_SAAS = `// With Pure SaaS: Guided by DESIGN.md semantic tokens
// System radius, Apple-grade hairline border, tabular figures, accessible focus ring
export function ApiKeyCard() {
  return (
    <div className="rounded-xl bg-surface-base border border-border-subtle p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-text-primary tracking-tight">Production API Key</h3>
          <p className="text-xs text-text-secondary mt-0.5">Used to authenticate webhook telemetry</p>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
          Active
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center justify-between h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default font-mono text-xs text-text-primary select-all">
          <span className="tabular-nums">sk_live_••••••••••••e92b</span>
          <span className="text-[10px] text-text-muted">Secret</span>
        </div>
        <button
          type="button"
          className="h-9 px-3.5 rounded-lg bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-all shadow-xs"
        >
          Copy Key
        </button>
      </div>
    </div>
  );
}`;

export const HomePage: React.FC = () => {
  // Hero Prompt Copy State
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [promptFallbackOpen, setPromptFallbackOpen] = useState(false);

  // Comparison State
  const [comparisonView, setComparisonView] = useState<'split' | 'with' | 'without'>('split');
  const [activeCodeTab, setActiveCodeTab] = useState<'preview' | 'code'>('preview');
  const [copiedCodeVersion, setCopiedCodeVersion] = useState<string | null>(null);

  // Interactive Demonstration State
  const [copiedKeyWith, setCopiedKeyWith] = useState(false);
  const [copiedKeyWithout, setCopiedKeyWithout] = useState(false);
  const [revealedKey, setRevealedKey] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  const handleCopyInstallPrompt = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(VERIFIED_INSTALL_PROMPT);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2500);
      } else {
        setPromptFallbackOpen(true);
      }
    } catch {
      setPromptFallbackOpen(true);
    }
  };

  const handleCopyCode = async (version: 'with' | 'without') => {
    const text = version === 'with' ? CODE_WITH_PURE_SAAS : CODE_WITHOUT_PURE_SAAS;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCodeVersion(version);
      setTimeout(() => setCopiedCodeVersion(null), 2000);
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
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-border-subtle overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
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

          {/* Primary Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs?slug=getting-started-introduction"
              className="h-11 px-6 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/showcase"
              className="h-11 px-5 rounded-xl bg-surface-base border border-border-default text-text-primary text-xs font-semibold hover:bg-surface-hover hover:border-border-hover transition-colors inline-flex items-center gap-2 shadow-2xs"
            >
              <span>Explore Showcase</span>
            </Link>

            {/* Compact Copy Install Prompt Action */}
            <button
              onClick={handleCopyInstallPrompt}
              className="h-11 px-4 rounded-xl bg-surface-muted/80 border border-border-subtle hover:border-accent text-text-secondary hover:text-text-primary text-xs font-medium transition-all inline-flex items-center gap-2 group"
              title="Copy install prompt for your AI coding assistant"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Prompt Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
                  <span>Copy install prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Fallback Prompt Modal (if clipboard access fails) */}
        {promptFallbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-surface-base border border-border-default p-6 space-y-4 shadow-2xl text-left">
              <h3 className="text-sm font-bold text-text-primary">AI Coding Agent Setup Prompt</h3>
              <p className="text-xs text-text-secondary">Copy and paste this instruction into your AI coding assistant:</p>
              <textarea
                readOnly
                value={VERIFIED_INSTALL_PROMPT}
                rows={5}
                className="w-full p-3 text-xs font-mono rounded-lg bg-surface-muted border border-border-subtle select-all"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setPromptFallbackOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================================================================= */}
      {/* SECTION 2: BEFORE AND AFTER PURE SAAS                             */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 border-b border-border-subtle bg-surface-base/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header & View Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent mb-2">
                <span>Official Demonstration</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Before and after Pure SaaS
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                A genuine comparison between an unguided AI component and the same component guided by Pure SaaS.
              </p>
            </div>

            {/* View Switching Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Split / Single View Toggle */}
              <div className="inline-flex p-1 rounded-xl bg-surface-muted border border-border-subtle text-xs">
                <button
                  onClick={() => setComparisonView('split')}
                  className={`hidden sm:inline-block px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    comparisonView === 'split'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Side by Side
                </button>
                <button
                  onClick={() => setComparisonView('without')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    comparisonView === 'without'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Without Pure SaaS
                </button>
                <button
                  onClick={() => setComparisonView('with')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    comparisonView === 'with'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  With Pure SaaS
                </button>
              </div>

              {/* Preview vs Code Tab */}
              <div className="inline-flex p-1 rounded-xl bg-surface-muted border border-border-subtle text-xs">
                <button
                  onClick={() => setActiveCodeTab('preview')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeCodeTab === 'preview'
                      ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('code')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeCodeTab === 'code'
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

          {/* Interactive Comparison Container */}
          {activeCodeTab === 'preview' ? (
            <div className={`grid gap-6 ${comparisonView === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
              {/* Card 1: Without Pure SaaS */}
              {(comparisonView === 'split' || comparisonView === 'without') && (
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-500/10 text-xs">
                    <span className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[11px]">
                      Without Pure SaaS (Unguided AI)
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">Arbitrary styling</span>
                  </div>

                  {/* Rendered Live Preview (Matches CODE_WITHOUT_PURE_SAAS) */}
                  <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '20px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ color: '#f8fafc', fontSize: '15px', fontWeight: 'bold' }}>Production API Key</h3>
                      <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>
                        Active
                      </span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>
                      Used to authenticate high-throughput webhook telemetry.
                    </p>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <input
                        readOnly
                        value="sk_live_98a7df8a97f98d7sf"
                        style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #475569', color: '#38bdf8', borderRadius: '4px', padding: '6px 10px', fontSize: '12px' }}
                      />
                      <button
                        onClick={() => {
                          setCopiedKeyWithout(true);
                          setTimeout(() => setCopiedKeyWithout(false), 2000);
                        }}
                        style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '3px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        {copiedKeyWithout ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Analysis Callout */}
                  <div className="text-[11px] text-text-secondary space-y-1 pt-1">
                    <div className="font-semibold text-rose-500">Observed Issues:</div>
                    <ul className="list-disc pl-4 space-y-0.5 text-text-muted">
                      <li>Arbitrary hex colors (#1e293b, #4f46e5, #0284c7) detached from project theme.</li>
                      <li>Clashing radii (14px card, 4px input, 3px button, 20px badge).</li>
                      <li>Missing focus indicators for keyboard navigation.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Card 2: With Pure SaaS */}
              {(comparisonView === 'split' || comparisonView === 'with') && (
                <div className="rounded-2xl border border-accent/30 bg-surface-base p-6 space-y-4 shadow-subtle">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-xs">
                    <span className="font-bold text-accent uppercase tracking-wider text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>With Pure SaaS (Token Enforced)</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">WCAG 2.2 AA</span>
                  </div>

                  {/* Rendered Live Preview (Matches CODE_WITH_PURE_SAAS) */}
                  <div className="rounded-xl bg-surface-base border border-border-subtle p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-text-primary tracking-tight">Production API Key</h3>
                        <p className="text-xs text-text-secondary mt-0.5">Used to authenticate webhook telemetry</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center justify-between h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default font-mono text-xs text-text-primary select-all">
                        <span className="tabular-nums">
                          {revealedKey ? 'sk_live_948f2b7a91e92b' : 'sk_live_••••••••••••e92b'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setRevealedKey(!revealedKey)}
                          className="text-[10px] text-text-muted hover:text-text-primary underline ml-2"
                        >
                          {revealedKey ? 'Hide' : 'Reveal'}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCopiedKeyWith(true);
                          setTimeout(() => setCopiedKeyWith(false), 2000);
                        }}
                        className="h-9 px-3.5 rounded-lg bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-all shadow-xs shrink-0"
                      >
                        {copiedKeyWith ? 'Copied' : 'Copy Key'}
                      </button>
                    </div>
                  </div>

                  {/* Analysis Callout */}
                  <div className="text-[11px] text-text-secondary space-y-1 pt-1">
                    <div className="font-semibold text-accent">Pure SaaS Improvements:</div>
                    <ul className="list-disc pl-4 space-y-0.5 text-text-secondary">
                      <li>100% semantic CSS tokens tied to DESIGN.md.</li>
                      <li>Consistent 8pt spatial grid geometry and hairline borders.</li>
                      <li>Tabular numbers, keyboard focus rings, and active state transitions.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Code View (Matches exact source code) */
            <div className={`grid gap-6 ${comparisonView === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
              {(comparisonView === 'split' || comparisonView === 'without') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                    <span>Without Pure SaaS (Unguided Code)</span>
                    <button
                      onClick={() => handleCopyCode('without')}
                      className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-text-primary"
                    >
                      {copiedCodeVersion === 'without' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCodeVersion === 'without' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <CodeBlock code={CODE_WITHOUT_PURE_SAAS} language="jsx" filename="ApiKeyCard.jsx" />
                </div>
              )}

              {(comparisonView === 'split' || comparisonView === 'with') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-accent">
                    <span>With Pure SaaS (Tokenized Code)</span>
                    <button
                      onClick={() => handleCopyCode('with')}
                      className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-text-primary"
                    >
                      {copiedCodeVersion === 'with' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCodeVersion === 'with' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <CodeBlock code={CODE_WITH_PURE_SAAS} language="tsx" filename="ApiKeyCard.tsx" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3: FAQ                                                    */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Everything you need to know about setting up and using Pure SaaS.
            </p>
          </div>

          <div className="space-y-3">
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
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-semibold text-sm text-text-primary hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-text-secondary leading-relaxed border-t border-border-subtle/50 mt-1 space-y-2">
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Ready to build better SaaS interfaces?
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Equip your AI coding agent with verified design guidance and start building production-quality interfaces in minutes.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs?slug=getting-started-introduction"
              className="h-11 px-6 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/showcase"
              className="h-11 px-5 rounded-xl bg-surface-base border border-border-default text-text-primary text-xs font-semibold hover:bg-surface-hover transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Showcase</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

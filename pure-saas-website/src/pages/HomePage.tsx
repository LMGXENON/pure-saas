import React from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { showcaseData } from '../data/showcaseData';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Palette, 
  Terminal, 
  Layers, 
  Cpu, 
  SlidersHorizontal 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const primaryShowcase = showcaseData[0]; // SaaS metric cluster dashboard

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-border-subtle bg-gradient-to-b from-surface-elevated/40 via-surface-base to-canvas">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted border border-border-subtle text-text-secondary mb-8 shadow-xs animate-fade-in">
            <span className="px-1.5 py-0.2 rounded bg-surface-base text-accent text-[10px] font-semibold border border-border-subtle uppercase tracking-wider">RELEASE</span>
            <span className="text-xs">Pure SaaS 1.0 Ready for Production</span>
            <span className="text-border-default">•</span>
            <span className="text-text-primary font-semibold">260+ Guides Added</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary leading-[1.06] max-w-4xl">
            Eliminate AI slop.<br className="hidden sm:inline" />
            <span className="text-accent">Hardware-grade UI/UX</span> for AI coding agents.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
            The open-source AI skill and design enforcement toolkit. Guides Claude Code, Cursor, Windsurf, Copilot, and Gemini to build production-quality interfaces with Apple HIG polish and zero generic templates.
          </p>

          {/* Action Group */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              to="/get-started"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 rounded-xl bg-accent text-white font-semibold text-sm hover:opacity-90 active:scale-98 transition-all shadow-subtle gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/docs"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 rounded-xl bg-surface-base border border-border-default text-text-primary font-medium text-sm hover:bg-surface-hover active:scale-98 transition-all shadow-subtle gap-2"
            >
              <span>Read the Documentation</span>
            </Link>
          </div>

          {/* Real Copyable Terminal Command */}
          <div className="mt-10 w-full max-w-md text-left">
            <CodeBlock 
              code="npx pure-saas init" 
              language="bash" 
              filename="Terminal Quickstart" 
            />
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-text-muted">
              <span>✓ Zero Dependencies</span>
              <span>✓ MIT Licensed</span>
              <span>✓ 100% Offline Compatible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Before & After Showcase */}
      <section className="px-4 sm:px-6 py-20 border-b border-border-subtle bg-surface-base">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Visual Difference
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-1">
                Say goodbye to generic AI landing templates.
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl">
                Compare uncurated LLM output ("AI Slop") against Pure SaaS's tokenized, accessible, hardware-polished output.
              </p>
            </div>
            <Link to="/showcase" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
              <span>View all 4 interactive showcases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <BeforeAfterSlider item={primaryShowcase} />
        </div>
      </section>

      {/* The 4 Non-Negotiable Pillars */}
      <section className="px-4 sm:px-6 py-20 border-b border-border-subtle bg-surface-elevated/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Engineering Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-1">
              Built on 4 non-negotiable principles.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Pure SaaS does not offer superficial aesthetic suggestions. It enforces architectural discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-accent flex items-center justify-center mb-4">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">Zero AI Slop</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Halts and challenges purple/cyan gradient text, heavy 40px glass blurs, emoji UI icons, and repetitive 3-column card grids.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle text-xs font-medium text-accent">
                anti-slop-rules.md
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">Semantic Tokens</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Rejects hardcoded hex colors and arbitrary bracket classes. Binds 100% of styling to documented tokens in DESIGN.md.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle text-xs font-medium text-purple-500">
                color-and-tokens.md
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">WCAG 2.2 AA</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Guarantees 4.5:1 text contrast, visible focus rings, roving keyboard navigation, and minimum 24px/44px touch targets.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle text-xs font-medium text-emerald-500">
                accessibility.md
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">Non-Regression</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Preserves 100% of existing backend endpoints, database schemas, authentication flows, and test selectors during UI redesigns.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle text-xs font-medium text-amber-500">
                SKILL.md § 3
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Skill Works (Concise 3-Step Architecture) */}
      <section className="px-4 sm:px-6 py-20 border-b border-border-subtle bg-surface-base">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Operational Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-1">
              How Pure SaaS works inside your agent.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              From natural language request to verified, production-ready code in three autonomous phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative pl-6 border-l-2 border-accent/40 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">PHASE 01</div>
              <h3 className="text-lg font-bold text-text-primary">Context & Reference Retrieval</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                The agent inspects your workspace, detects existing tokens, and retrieves exact architectural references from the 280+ file library before writing any code.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-purple-500/40 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-500">PHASE 02</div>
              <h3 className="text-lg font-bold text-text-primary">Tokenized Implementation</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Components are authored using semantic CSS variables and the complete 8-state matrix (hover, focus-visible, active scale, loading states) without touching backend APIs.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-emerald-500/40 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">PHASE 03</div>
              <h3 className="text-lg font-bold text-text-primary">Honest Evidence Verification</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                The CLI validates DESIGN.md, measures WCAG 2.2 AA contrast ratios, and outputs a 4-part evidence audit citing exact files, lines, and observed values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Slash Commands Overview */}
      <section className="px-4 sm:px-6 py-20 border-b border-border-subtle bg-surface-base">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Command Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-1">
                One intelligent universal command. Five specialists.
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl">
                Invoke directly in Claude Code, Cursor, Windsurf, Copilot, or Gemini.
              </p>
            </div>
            <Link to="/commands" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
              <span>View full command guide & examples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-elevated/40 border-2 border-accent/30 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent text-white font-bold inline-block mb-3">
                  Default Entry Point
                </span>
                <h3 className="text-base font-bold text-text-primary">
                  <code>/pure-saas [request]</code>
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Autonomous end-to-end design, implementation, and quality enforcement. Coordinates all 6 workflows from brief to verified code.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">General UI/UX</span>
                <Link to="/commands#universal" className="text-accent font-medium hover:underline">Learn more →</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  <code>/pure-saas design</code>
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Establish or update the root-level DESIGN.md specification before touching source code files.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">Specification Only</span>
                <Link to="/commands#design" className="text-accent font-medium hover:underline">Learn more →</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  <code>/pure-saas polish</code>
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Elevate visual craft, surface lighting, and tactile micro-interactions without rebuilding working logic.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">Visual Craft</span>
                <Link to="/commands#polish" className="text-accent font-medium hover:underline">Learn more →</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  <code>/pure-saas review</code>
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Forensic 4-part evidence audit across bugs, security, WCAG 2.2 accessibility, and token drift.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">Read-Only QA</span>
                <Link to="/commands#review" className="text-accent font-medium hover:underline">Learn more →</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  <code>/pure-saas reference</code>
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Reverse-engineer live visual references via browser DevTools into a 16-section DESIGN.md specification.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">Reverse Engineering</span>
                <Link to="/commands#reference" className="text-accent font-medium hover:underline">Learn more →</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  <code>/pure-saas responsive</code>
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Diagnose and resolve viewport layout failures across mobile (375px), tablet (768px), and desktop.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">Cross-Device</span>
                <Link to="/commands#responsive" className="text-accent font-medium hover:underline">Learn more →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 260+ Reference Library Stats */}
      <section className="px-4 sm:px-6 py-20 border-b border-border-subtle bg-surface-elevated/40">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-1">
              A comprehensive library of 260+ architectural references.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              Pure SaaS doesn't rely on generic LLM memory. Agents dynamically retrieve exact reference documents with code snippets, 8-state matrices, and WCAG rules for every task.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/references" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-surface-base border border-border-default text-text-primary text-xs font-semibold hover:bg-surface-hover shadow-xs">
                <Layers className="w-4 h-4 text-accent" />
                <span>Browse 260+ Guides</span>
              </Link>
              <Link to="/cli" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-surface-muted text-text-secondary text-xs font-medium hover:text-text-primary">
                <Terminal className="w-4 h-4" />
                <span>CLI Search Command</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:max-w-lg">
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-xs">
              <div className="text-3xl font-bold tracking-tight text-accent tabular-nums">126</div>
              <div className="text-xs text-text-secondary mt-1">Craft & Engineering Guides</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-xs">
              <div className="text-3xl font-bold tracking-tight text-accent tabular-nums">124</div>
              <div className="text-xs text-text-secondary mt-1">Apple HIG Topics</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-xs">
              <div className="text-3xl font-bold tracking-tight text-accent tabular-nums">22</div>
              <div className="text-xs text-text-secondary mt-1">Framework Guidelines</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-xs">
              <div className="text-3xl font-bold tracking-tight text-accent tabular-nums">15</div>
              <div className="text-xs text-text-secondary mt-1">Interactive Shaders</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-xs">
              <div className="text-3xl font-bold tracking-tight text-accent tabular-nums">88</div>
              <div className="text-xs text-text-secondary mt-1">Curated Design Styles</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-xs">
              <div className="text-3xl font-bold tracking-tight text-accent tabular-nums">100%</div>
              <div className="text-xs text-text-secondary mt-1">Offline Capable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="px-4 sm:px-6 py-24 bg-surface-base text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center font-bold text-lg mb-6 shadow-bloom">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Build production software with true design craft.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-xl">
            Install Pure SaaS into your local repository or agent configuration and start generating hardware-grade interfaces today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-accent text-white font-semibold text-sm hover:opacity-90 active:scale-98 transition-all shadow-subtle gap-2"
            >
              <span>Read the 10-Step Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/LMGXENON/pure-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-surface-muted border border-border-subtle text-text-primary font-medium text-sm hover:bg-surface-hover active:scale-98 transition-all gap-2"
            >
              <span>View GitHub Repository</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

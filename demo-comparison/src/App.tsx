import React, { useState, useEffect } from 'react';
import { WithoutPureSaaS } from './components/WithoutPureSaaS';
import { WithPureSaaS } from './components/WithPureSaaS';
import {
  Sparkles,
  Columns,
  Maximize2,
  Minimize2,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Moon,
  Sun,
  Layers,
  ShieldCheck,
  Scale,
  Info,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Code2,
  Sliders,
  Eye,
  FileText
} from 'lucide-react';

export function App() {
  // Read initial params from URL if present (?view=side-by-side|tabs|fullscreen|scorecard|methodology, &version=without|with)
  const initialParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const paramView = initialParams.get('view') as 'side-by-side' | 'tabs' | 'fullscreen' | 'scorecard' | 'methodology' | null;
  const paramVersion = initialParams.get('version') as 'without' | 'with' | null;

  // Comparison Display Mode: side-by-side, tabs, fullscreen, scorecard, methodology
  const [viewMode, setViewMode] = useState<'side-by-side' | 'tabs' | 'fullscreen' | 'scorecard' | 'methodology'>(
    paramView && ['side-by-side', 'tabs', 'fullscreen', 'scorecard', 'methodology'].includes(paramView)
      ? paramView
      : 'side-by-side'
  );
  const [activeTabVersion, setActiveTabVersion] = useState<'without' | 'with'>(
    paramVersion && ['without', 'with'].includes(paramVersion) ? paramVersion : 'with'
  );
  const [fullscreenVersion, setFullscreenVersion] = useState<'without' | 'with'>(
    paramVersion && ['without', 'with'].includes(paramVersion) ? paramVersion : 'with'
  );

  // Viewport Simulation: desktop (100%), tablet (768px), mobile (375px)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Dark / Light Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('demo-theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        localStorage.setItem('demo-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('demo-theme', 'light');
      }
    } catch {}
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col font-sans transition-colors">
      {/* Sticky Top Comparison Control Bar */}
      <header className="sticky top-0 z-40 bg-surface-base/95 backdrop-blur-md border-b border-border-subtle py-2.5 px-4 sm:px-6 shadow-subtle transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Experiment Label */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-text-primary">
                  Pure SaaS Impact Experiment
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-surface-muted text-text-muted border border-border-subtle uppercase">
                  Controlled Test
                </span>
              </div>
            </div>
          </div>

          {/* Primary View Mode Switcher */}
          <div className="flex items-center bg-surface-muted/60 p-1 rounded-xl border border-border-subtle text-xs">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'side-by-side' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </button>

            <button
              onClick={() => setViewMode('tabs')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'tabs' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Interactive Tabs</span>
            </button>

            <button
              onClick={() => setViewMode('scorecard')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'scorecard' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Evaluation Matrix</span>
            </button>

            <button
              onClick={() => setViewMode('methodology')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'methodology' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Methodology</span>
            </button>
          </div>

          {/* Viewport & Theme Controls */}
          <div className="flex items-center gap-2">
            {/* Viewport Switcher */}
            <div className="flex items-center bg-surface-muted/60 p-0.5 rounded-lg border border-border-subtle text-xs">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-md ${viewport === 'desktop' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'}`}
                title="Desktop Viewport (1440px)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded-md ${viewport === 'tablet' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'}`}
                title="Tablet Viewport (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-md ${viewport === 'mobile' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'}`}
                title="Mobile Viewport (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-surface-muted border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
              title="Toggle Light / Dark Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* ============================================================= */}
        {/* VIEW 1: SIDE-BY-SIDE SYNCHRONIZED COMPARISON                  */}
        {/* ============================================================= */}
        {viewMode === 'side-by-side' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Intro Banner */}
            <div className="p-4 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-text-primary tracking-tight">
                  Side-by-Side Controlled Implementation
                </h2>
                <p className="text-xs text-text-secondary">
                  The exact same product brief, data schema, interactions, and component requirements built with and without Pure SaaS.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-rose-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Without Pure SaaS (Unguided)</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-accent">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span>With Pure SaaS (Skill-Guided)</span>
                </span>
              </div>
            </div>

            {/* Synchronized Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Column 1: Without Pure SaaS */}
              <div className="space-y-2">
                <div className="px-3 py-1.5 rounded-xl bg-surface-muted border border-border-subtle flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    1. Without Pure SaaS (Unguided AI)
                  </span>
                  <button
                    onClick={() => {
                      setFullscreenVersion('without');
                      setViewMode('fullscreen');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-muted hover:text-text-primary"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Full Screen</span>
                  </button>
                </div>

                <div className={`transition-all duration-300 mx-auto ${
                  viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full'
                }`}>
                  <div className="rounded-2xl border border-border-subtle overflow-hidden shadow-elevated">
                    <WithoutPureSaaS />
                  </div>
                </div>
              </div>

              {/* Column 2: With Pure SaaS */}
              <div className="space-y-2">
                <div className="px-3 py-1.5 rounded-xl bg-surface-muted border border-border-subtle flex items-center justify-between text-xs">
                  <span className="font-bold text-accent uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2. With Pure SaaS (Semantic Tokens)</span>
                  </span>
                  <button
                    onClick={() => {
                      setFullscreenVersion('with');
                      setViewMode('fullscreen');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Full Screen</span>
                  </button>
                </div>

                <div className={`transition-all duration-300 mx-auto ${
                  viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full'
                }`}>
                  <div className="rounded-2xl border border-border-subtle overflow-hidden shadow-elevated">
                    <WithPureSaaS />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 2: INTERACTIVE TABS VIEW                                 */}
        {/* ============================================================= */}
        {viewMode === 'tabs' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="inline-flex p-1 rounded-2xl bg-surface-muted border border-border-subtle text-xs">
                <button
                  onClick={() => setActiveTabVersion('without')}
                  className={`px-5 py-2 rounded-xl font-bold transition-all ${
                    activeTabVersion === 'without'
                      ? 'bg-surface-base text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Without Pure SaaS (Unguided Default)
                </button>
                <button
                  onClick={() => setActiveTabVersion('with')}
                  className={`px-5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    activeTabVersion === 'with'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>With Pure SaaS (Skill-Guided)</span>
                </button>
              </div>
            </div>

            <div className={`transition-all duration-300 mx-auto ${
              viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full'
            }`}>
              <div className="rounded-2xl border border-border-subtle overflow-hidden shadow-elevated">
                {activeTabVersion === 'with' ? <WithPureSaaS /> : <WithoutPureSaaS />}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 3: FULLSCREEN IMMERSION VIEW                             */}
        {/* ============================================================= */}
        {viewMode === 'fullscreen' && (
          <div className="fixed inset-0 z-50 bg-canvas overflow-y-auto flex flex-col">
            {/* Floating Top Exit Bar */}
            <div className="sticky top-0 z-50 bg-surface-base/90 backdrop-blur-md border-b border-border-subtle px-6 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold font-mono uppercase px-2.5 py-1 rounded bg-surface-muted border border-border-subtle">
                  Viewing: {fullscreenVersion === 'with' ? 'With Pure SaaS (Skill Guided)' : 'Without Pure SaaS (Unguided Default)'}
                </span>
                <button
                  onClick={() => setFullscreenVersion(fullscreenVersion === 'with' ? 'without' : 'with')}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  Switch to {fullscreenVersion === 'with' ? 'Without Pure SaaS' : 'With Pure SaaS'} →
                </button>
              </div>

              <button
                onClick={() => setViewMode('side-by-side')}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-surface-muted border border-border-subtle text-xs font-semibold hover:bg-surface-hover text-text-primary"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </button>
            </div>

            <div className="flex-1">
              {fullscreenVersion === 'with' ? <WithPureSaaS /> : <WithoutPureSaaS />}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 4: REPRODUCIBLE EVALUATION SCORECARD                     */}
        {/* ============================================================= */}
        {viewMode === 'scorecard' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Objective Evaluation Matrix
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary">
                Side-by-side forensic audit of both implementations across 8 measurable criteria.
              </p>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-base overflow-hidden shadow-subtle">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted/60 text-text-primary font-semibold border-b border-border-subtle">
                  <tr>
                    <th className="p-4 w-1/4">Evaluation Criterion</th>
                    <th className="p-4 w-3/8 text-rose-500">Without Pure SaaS (Unguided)</th>
                    <th className="p-4 w-3/8 text-accent">With Pure SaaS (Guided)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {[
                    {
                      crit: '1. Color & Token System',
                      without: 'Hardcoded hex strings (#0f172a, #6366f1, #38bdf8) and ad-hoc Tailwind classes.',
                      with: '100% semantic tokens (canvas, surface-base, border-subtle) with automated light/dark parity.'
                    },
                    {
                      crit: '2. Typographic Craft',
                      without: 'Proportional default numerals causing telemetry numbers to jitter on re-renders; loose tracking.',
                      with: 'Tabular numerals (tabular-nums font-mono) ensuring fixed column alignment; display negative tracking.'
                    },
                    {
                      crit: '3. Surface Lighting & Borders',
                      without: 'Heavy blurred drop shadows (shadow-xl shadow-slate-950/40) and high-contrast solid borders.',
                      with: 'Apple-grade hairline borders (rgba 8% - 14%) and subtle layered material depth.'
                    },
                    {
                      crit: '4. Status Indicators',
                      without: 'Pulsing green circular ping animation (fakes real-time activity and distracts eye).',
                      with: 'Solid, high-contrast accessible status pill badge (emerald-500/10 with 20% border).'
                    },
                    {
                      crit: '5. Component Interaction States',
                      without: 'Only 2 states handled (Default, basic Hover); missing focus-visible outline and active pressed state.',
                      with: 'Complete 8-state matrix (Default, Hover, Focus-Visible 2px ring, Active scale-98, Disabled, Loading).'
                    },
                    {
                      crit: '6. Responsive Ergonomics',
                      without: 'Standard flex-wrap causes horizontal table blowout and clipped column headers on 375px mobile.',
                      with: 'Zero 375px overflow; tables gracefully transform to touch-friendly card stacks with 44px hit targets.'
                    },
                    {
                      crit: '7. Motion & Transitions',
                      without: 'Linear transitions or default ease without calibrated physics curves.',
                      with: 'Physics-based spring curves (cubic-bezier 0.16, 1, 0.3, 1) tuned for snappy 150ms feedback.'
                    },
                    {
                      crit: '8. Code Maintainability',
                      without: 'Brittle ad-hoc classes spread across files; rebranding requires manual find-and-replace of raw hex codes.',
                      with: 'Centrally maintained in DESIGN.md; updating tokens automatically re-themes the entire application.'
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="p-4 font-bold text-text-primary align-top">
                        {row.crit}
                      </td>
                      <td className="p-4 text-text-secondary align-top space-y-1">
                        <div className="flex items-start gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.without}</span>
                        </div>
                      </td>
                      <td className="p-4 text-text-secondary align-top space-y-1">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{row.with}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 5: EXPERIMENTAL METHODOLOGY & LIMITATIONS                */}
        {/* ============================================================= */}
        {viewMode === 'methodology' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Experimental Methodology & Controls
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary">
                Documenting fair testing conditions, acceptance criteria, and honest limitations.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface-base border border-border-subtle shadow-subtle space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-text-primary">1. Shared Product Brief & Acceptance Criteria</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Both implementations were built to satisfy the exact same acceptance criteria: a fictional analytics SaaS dashboard called "PulseMetrics" featuring sidebar navigation, KPI cards, an interactive time-series chart with hover tooltips, a live activity feed, a searchable data table with status filters, and an interactive settings modal with working save actions.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border-subtle">
                <h3 className="text-base font-bold text-text-primary">2. Shared Dependencies & Technology Stack</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Both dashboards execute on the exact same runtime dependencies: React 18, TypeScript 5, Vite 6, Tailwind CSS 3.4, and Lucide React icons. Neither version accesses proprietary external services or third-party paid components.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border-subtle">
                <h3 className="text-base font-bold text-text-primary">3. Fair Implementation Protocol</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  The baseline was produced using normal, standard unguided coding assistant patterns without loading Pure SaaS rules or tokens. The treatment was created using the installed Pure SaaS skill workflows (/puresaas and /puresaas:polish). No artificial bugs or deliberate sabotage were introduced into the baseline.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border-subtle">
                <h3 className="text-base font-bold text-text-primary">4. Honest Limitations</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  While quantitative checks (WCAG 2.2 AA contrast calculations, horizontal scroll measurements, tabular figure verification) provide objective pass/fail gates, aesthetic qualities such as visual restraint and typography pairing involve qualitative design judgement. Visitors are encouraged to inspect both source code implementations and interact with all controls.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;

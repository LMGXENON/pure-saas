import React, { useState, useEffect } from 'react';
import { WithoutPureSaaS } from './components/WithoutPureSaaS';
import { WithPureSaaS } from './components/WithPureSaaS';
import {
  Columns,
  Smartphone,
  Tablet,
  Monitor,
  Moon,
  Sun,
  Scale,
  Sliders,
  FileText,
  SlidersHorizontal
} from 'lucide-react';

export function App() {
  // Read initial params from URL if present (?view=side-by-side|slider|without|with|scorecard|methodology)
  const initialParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const paramView = initialParams.get('view') as
    | 'side-by-side'
    | 'slider'
    | 'without'
    | 'with'
    | 'scorecard'
    | 'methodology'
    | null;

  // Comparison Display Mode: side-by-side, slider, without, with, scorecard, methodology
  const [viewMode, setViewMode] = useState<
    'side-by-side' | 'slider' | 'without' | 'with' | 'scorecard' | 'methodology'
  >(paramView && ['side-by-side', 'slider', 'without', 'with', 'scorecard', 'methodology'].includes(paramView)
    ? paramView
    : 'side-by-side'
  );

  // Viewport Simulation: desktop (100%), tablet (768px), mobile (375px)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Interactive Diff / Comparison Slider position (0 - 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Motion preference: 'spring' or 'reduced'
  const [reducedMotion, setReducedMotion] = useState(false);

  // Dark / Light Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('pure-saas-theme');
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
        localStorage.setItem('pure-saas-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('pure-saas-theme', 'light');
      }
    } catch {}
  }, [isDark]);

  // Handle slider mouse drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  return (
    <div
      className={`min-h-screen bg-canvas text-text-primary flex flex-col font-sans transition-colors ${
        reducedMotion ? 'reduce-motion' : ''
      }`}
    >
      {/* Sticky Top Comparison Control Bar */}
      <header className="sticky top-0 z-50 bg-surface-base/95 backdrop-blur-md border-b border-border-subtle py-2.5 px-4 sm:px-6 lg:px-8 shadow-subtle transition-colors">
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
          <div className="flex items-center bg-surface-muted/70 p-1 rounded-xl border border-border-subtle text-xs">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'side-by-side'
                  ? 'bg-surface-base text-accent shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'slider'
                  ? 'bg-surface-base text-accent shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Diff Slider</span>
            </button>
            <button
              onClick={() => setViewMode('without')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'without'
                  ? 'bg-surface-base text-accent shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Without Skill
            </button>
            <button
              onClick={() => setViewMode('with')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'with'
                  ? 'bg-surface-base text-accent shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              With Pure SaaS
            </button>
            <button
              onClick={() => setViewMode('scorecard')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'scorecard'
                  ? 'bg-surface-base text-accent shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Scorecard</span>
            </button>
            <button
              onClick={() => setViewMode('methodology')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'methodology'
                  ? 'bg-surface-base text-accent shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Methodology
            </button>
          </div>

          {/* Right Controls: Viewport, Motion & Theme */}
          <div className="flex items-center gap-2">
            {/* Viewport Simulation Selector (Disabled in slider mode) */}
            {viewMode !== 'slider' && (
              <div className="flex items-center bg-surface-muted p-1 rounded-lg border border-border-subtle text-xs">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewport === 'desktop'
                      ? 'bg-surface-base text-accent shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  title="Desktop (1440px)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewport === 'tablet'
                      ? 'bg-surface-base text-accent shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewport === 'mobile'
                      ? 'bg-surface-base text-accent shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  title="Mobile (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Reduced Motion Toggle */}
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-1.5 rounded-lg border text-xs font-mono transition-colors ${
                reducedMotion
                  ? 'bg-accent/15 border-accent text-accent font-semibold'
                  : 'bg-surface-muted hover:bg-surface-elevated border-border-subtle text-text-muted hover:text-text-primary'
              }`}
              title="Toggle Reduced Motion"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg bg-surface-muted hover:bg-surface-elevated border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Experience Container */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* MODE 1: SIDE-BY-SIDE SYNCHRONIZED COMPARISON */}
        {viewMode === 'side-by-side' && (
          <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-[1720px] mx-auto w-full">
            {/* Viewport wrapper */}
            <div
              className={`flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 mx-auto w-full transition-all duration-300 ${
                viewport === 'mobile'
                  ? 'max-w-[400px]'
                  : viewport === 'tablet'
                  ? 'max-w-[800px]'
                  : 'max-w-full'
              }`}
            >
              {/* Left Column: Baseline (Without Pure SaaS) */}
              <div className="flex flex-col bg-surface-base rounded-2xl border border-border-subtle shadow-subtle overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Baseline: Without Pure SaaS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                    Standard AI Output
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <WithoutPureSaaS />
                </div>
              </div>

              {/* Right Column: Treatment (With Pure SaaS) */}
              <div className="flex flex-col bg-surface-base rounded-2xl border border-accent/30 shadow-subtle overflow-hidden">
                <div className="px-4 py-2.5 bg-accent/5 border-b border-accent/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                    <span className="font-bold text-xs uppercase tracking-wider text-accent">
                      Treatment: With Pure SaaS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-white font-semibold">
                    Spatial Reasoning Engine
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <WithPureSaaS />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: INTERACTIVE DIFF / WIPE SLIDER */}
        {viewMode === 'slider' && (
          <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full select-none">
            <div className="mb-4 text-center">
              <span className="text-xs font-mono text-text-muted">
                Drag the vertical divider left or right to inspect the exact spatial alignment and typography difference
              </span>
            </div>

            <div
              className="relative flex-1 min-h-[780px] rounded-2xl border border-border-subtle shadow-card overflow-hidden cursor-ew-resize bg-surface-base"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Layer 1: With Pure SaaS (Full width behind) */}
              <div className="absolute inset-0 overflow-y-auto">
                <WithPureSaaS />
              </div>

              {/* Layer 2: Without Pure SaaS (Clipped to sliderPos width) */}
              <div
                className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-2xl"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="w-[1280px] h-full overflow-y-auto">
                  <WithoutPureSaaS />
                </div>
              </div>

              {/* Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-mono text-[10px] shadow-md border-2 border-white">
                  ⟷
                </div>
              </div>

              {/* Floating Labels */}
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-mono pointer-events-none">
                ← Without Pure SaaS
              </div>
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-mono pointer-events-none">
                With Pure SaaS →
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: FULLSCREEN WITHOUT SKILL */}
        {viewMode === 'without' && (
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 mx-auto w-full transition-all duration-300 ${
                viewport === 'mobile'
                  ? 'max-w-[400px] my-6 border border-border-subtle rounded-3xl overflow-hidden shadow-card'
                  : viewport === 'tablet'
                  ? 'max-w-[768px] my-6 border border-border-subtle rounded-2xl overflow-hidden shadow-card'
                  : 'max-w-full'
              }`}
            >
              <WithoutPureSaaS />
            </div>
          </div>
        )}

        {/* MODE 4: FULLSCREEN WITH PURE SAAS */}
        {viewMode === 'with' && (
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 mx-auto w-full transition-all duration-300 ${
                viewport === 'mobile'
                  ? 'max-w-[400px] my-6 border border-border-subtle rounded-3xl overflow-hidden shadow-card'
                  : viewport === 'tablet'
                  ? 'max-w-[768px] my-6 border border-border-subtle rounded-2xl overflow-hidden shadow-card'
                  : 'max-w-full'
              }`}
            >
              <WithPureSaaS />
            </div>
          </div>
        )}

        {/* MODE 5: AUDIT SCORECARD */}
        {viewMode === 'scorecard' && (
          <div className="flex-1 max-w-5xl mx-auto w-full p-6 sm:p-8 lg:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                Controlled Audit Scorecard: 8 Architectural Craft Dimensions
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Direct evidence comparing unguided AI generation against Pure SaaS spatial reasoning.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  dimension: '1. Gutter Line Alignment',
                  without: 'Arbitrary indents; centered heading below left logo; staggered button alignment.',
                  with: 'Strict single vertical axis (x = 0). Eyebrows, H1 headings, subtext, actions, and table borders align exactly.',
                  advantage: 'Instant visual stability and cognitive clarity.'
                },
                {
                  dimension: '2. Optical vs Geometric Alignment',
                  without: 'items-center used on multi-line text blocks with leading icons, floating icons in the middle.',
                  with: 'items-start mt-0.5/mt-1 lock icon to the cap-height of the first line of text. Form labels locked <= 6px to inputs.',
                  advantage: 'No visual awkwardness on multi-line text or form inputs.'
                },
                {
                  dimension: '3. Proximity Mathematics',
                  without: 'Random padding (gap-6 inside p-4 card); symmetrical heading margins (mt-8 mb-8).',
                  with: 'Mathematical inequality: Outer Padding >= 1.5 * Inner Gap. Heading Belonging: Spacing Above >= 2.5 * Spacing Below.',
                  advantage: 'Proper content containment; headings belong clearly to following text.'
                },
                {
                  dimension: '4. Layout Composition',
                  without: 'Cookie-cutter 4-column identical cards; centered hero templates.',
                  with: 'Asymmetric 66%/34% Anchor & Orbit composition; primary telemetry hero paired with orbital status rail.',
                  advantage: 'Senior editorial balance without repetitive template vomit.'
                },
                {
                  dimension: '5. Operational Console Density',
                  without: 'Dead-weight 256px lateral sidebar consuming horizontal space for only 5 links.',
                  with: 'High-utility top console app bar with workspace context switcher, breadcrumbs, and ⌘K command search pill.',
                  advantage: 'Maximizes usable screen canvas for high-density telemetry data.'
                },
                {
                  dimension: '6. Tabular Figures & Numbers',
                  without: 'Default proportional fonts; numbers jump and jitter horizontally during live updates.',
                  with: 'Strict font-tabular / font-mono tabular lining numerals; inline proportional latency micro-bars.',
                  advantage: 'Stable metrics scanning without layout shift.'
                },
                {
                  dimension: '7. Master-Detail Inspection',
                  without: 'Flat static table; user forced to leave context or open blank page for route details.',
                  with: 'Slide-Over Master-Detail Route Inspector Drawer with full latency waterfall and replayable cURL snippet.',
                  advantage: 'High-velocity operational workflow for engineers.'
                },
                {
                  dimension: '8. Material Surface & Token Architecture',
                  without: 'Hardcoded utility palette colors; flat card elevations; unmanaged contrast ratios across nested components.',
                  with: '3-tier semantic token architecture (primitive → semantic → component); subtle material surface elevations; WCAG 2.2 AA verified contrast.',
                  advantage: 'Systematic theme stability, predictable hierarchy, and zero color drift.'
                }
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-border-subtle bg-surface-base shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-4"
                >
                  <div className="lg:col-span-3">
                    <span className="font-bold text-sm text-text-primary block">{row.dimension}</span>
                    <span className="text-xs text-accent font-semibold mt-1 block">{row.advantage}</span>
                  </div>
                  <div className="lg:col-span-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-mono text-[10px] text-rose-500 font-bold block mb-1">
                      WITHOUT PURE SAAS
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">{row.without}</p>
                  </div>
                  <div className="lg:col-span-5 p-3 rounded-lg bg-accent/5 border border-accent/20 text-xs">
                    <span className="font-mono text-[10px] text-accent font-bold block mb-1">
                      WITH PURE SAAS
                    </span>
                    <p className="text-text-primary">{row.with}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 6: METHODOLOGY & CONTROLS */}
        {viewMode === 'methodology' && (
          <div className="flex-1 max-w-4xl mx-auto w-full p-6 sm:p-8 lg:p-12 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Scientific Controls & Fair Comparison Methodology
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary space-y-4">
              <p>
                To measure the true impact of the Pure SaaS engineering toolkit, this experiment enforces strict controls to guarantee fairness and eliminate confounding variables:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Identical Functional Requirements:</strong> Both dashboards implement the exact same SaaS observability product (&ldquo;PulseMetrics&rdquo;) featuring telemetry KPIs, time-series charts, audit activity feeds, and filterable endpoint tables.
                </li>
                <li>
                  <strong>Shared Data Model:</strong> Both implementations import the identical datasets from <code>mockData.ts</code>, eliminating differences caused by varying sample data.
                </li>
                <li>
                  <strong>Identical Dependency Footprint:</strong> Both dashboards are built with React 18, TypeScript, Tailwind CSS, and Lucide React.
                </li>
                <li>
                  <strong>Zero Sabotage Guarantee:</strong> The &ldquo;Without Pure SaaS&rdquo; version was not artificially downgraded; it reflects the standard, highly competent output of unguided LLMs (like Claude Code or GPT-4o) when asked to produce a clean SaaS dashboard.
                </li>
                <li>
                  <strong>Observable Difference:</strong> The contrast in quality stems entirely from Pure SaaS&rsquo;s deterministic spatial reasoning, optical alignment calculus, and proximity mathematics.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

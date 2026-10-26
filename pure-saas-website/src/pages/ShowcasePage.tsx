import React, { useState } from 'react';
import {
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  ArrowUpDown,
  Search,
  RefreshCw,
  Info,
  Layers,
  Check,
  X
} from 'lucide-react';

interface TelemetryRow {
  id: string;
  service: string;
  route: string;
  latency: number;
  throughput: string;
  status: 'healthy' | 'degraded' | 'offline';
  region: string;
}

const INITIAL_ROWS: TelemetryRow[] = [
  { id: 'srv-1', service: 'auth-gateway', route: '/api/v2/auth', latency: 8.4, throughput: '12.4k req/s', status: 'healthy', region: 'us-east-1' },
  { id: 'srv-2', service: 'billing-engine', route: '/api/v1/checkout', latency: 24.1, throughput: '4.8k req/s', status: 'healthy', region: 'us-east-1' },
  { id: 'srv-3', service: 'vector-search', route: '/v3/query', latency: 68.9, throughput: '18.2k req/s', status: 'degraded', region: 'eu-west-1' },
  { id: 'srv-4', service: 'event-broker', route: '/stream/events', latency: 3.2, throughput: '94.6k req/s', status: 'healthy', region: 'ap-northeast-1' },
  { id: 'srv-5', service: 'metrics-sink', route: '/telemetry/v1', latency: 12.0, throughput: '42.1k req/s', status: 'healthy', region: 'us-west-2' },
];

export const ShowcasePage: React.FC = () => {
  // Viewport Simulator
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Archetype State
  const [archetype, setArchetype] = useState<'minimal' | 'swiss' | 'corporate' | 'linear' | 'terminal'>('corporate');

  // Dials
  const [density, setDensity] = useState<'compact' | 'normal' | 'relaxed'>('normal');

  // Data State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'healthy' | 'degraded'>('all');
  const [sortAsc, setSortAsc] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 8-State Component Testing
  const [testState, setTestState] = useState<'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'invalid' | 'valid'>('default');

  const filteredRows = INITIAL_ROWS.filter(r => {
    const matchesSearch = r.service.toLowerCase().includes(searchQuery.toLowerCase()) || r.route.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => sortAsc ? a.latency - b.latency : b.latency - a.latency);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Density spacing classes
  const densityPadding = density === 'compact' ? 'py-1.5 px-3' : density === 'relaxed' ? 'py-4 px-5' : 'py-2.5 px-4';

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Header */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted border border-border-subtle text-text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Interactive Design Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Interactive Product Showcase
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Experience Pure SaaS design standards firsthand. Test dynamic style archetypes, 8-state interaction matrices, and responsive viewport adaptations with live working state.
          </p>

          {/* Explicit Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-border-subtle max-w-2xl mx-auto flex items-start gap-3 text-left">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-normal">
              <strong>Demonstration Disclaimer:</strong> The interfaces below are live, interactive examples generated under Pure SaaS design standards. They illustrate token application, typographic scales, and component state handling.
            </p>
          </div>
        </div>
      </section>

      {/* Control Dashboard & Live Sandbox */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Global Showcase Toolbar */}
          <div className="p-4 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-wrap items-center justify-between gap-4">
            {/* Style Archetypes */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-text-muted mr-1 uppercase tracking-wider">Style:</span>
              {[
                { id: 'corporate', label: 'Corporate Clean' },
                { id: 'minimal', label: 'Minimal Stark' },
                { id: 'swiss', label: 'Swiss International' },
                { id: 'linear', label: 'Linear Dark' },
                { id: 'terminal', label: 'Developer Terminal' }
              ].map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setArchetype(arch.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    archetype === arch.id
                      ? 'bg-accent text-white font-semibold shadow-xs'
                      : 'bg-surface-muted/60 text-text-secondary hover:text-text-primary border border-border-subtle'
                  }`}
                >
                  {arch.label}
                </button>
              ))}
            </div>

            {/* Density Selector */}
            <div className="flex items-center gap-1 bg-surface-muted/50 p-1 rounded-xl border border-border-subtle">
              {(['compact', 'normal', 'relaxed'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    density === d ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Viewport Frame Controller */}
            <div className="flex items-center gap-1 bg-surface-muted/50 p-1 rounded-xl border border-border-subtle">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewport === 'desktop' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'
                }`}
                title="Desktop Viewport (1440px)"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">1440px</span>
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewport === 'tablet' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'
                }`}
                title="Tablet Viewport (768px)"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">768px</span>
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewport === 'mobile' ? 'bg-surface-base text-accent shadow-xs' : 'text-text-muted hover:text-text-primary'
                }`}
                title="Mobile Viewport (375px)"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">375px</span>
              </button>
            </div>
          </div>

          {/* Viewport Simulation Stage */}
          <div className="flex justify-center transition-all duration-300">
            <div
              className={`w-full transition-all duration-300 ${
                viewport === 'mobile'
                  ? 'max-w-[375px] rounded-3xl border-4 border-border-default shadow-floating overflow-hidden'
                  : viewport === 'tablet'
                  ? 'max-w-[768px] rounded-2xl border-2 border-border-default shadow-floating overflow-hidden'
                  : 'max-w-full rounded-2xl border border-border-subtle shadow-elevated'
              }`}
            >
              {/* Browser / Device Chrome Header for Mobile/Tablet */}
              {viewport !== 'desktop' && (
                <div className="bg-surface-muted px-4 py-2 border-b border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>{viewport === 'mobile' ? '375 × 812 (iPhone)' : '768 × 1024 (iPad)'}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-border-default" />
                    <span className="w-2 h-2 rounded-full bg-border-default" />
                  </div>
                </div>
              )}

              {/* Live Rendered Operational Dashboard */}
              <div className={`p-5 sm:p-6 space-y-6 ${
                archetype === 'minimal'
                  ? 'bg-canvas font-sans'
                  : archetype === 'swiss'
                  ? 'bg-surface-base border border-black dark:border-white font-sans'
                  : archetype === 'linear'
                  ? 'bg-[#0a0a0c] text-slate-100'
                  : archetype === 'terminal'
                  ? 'bg-[#0d1117] text-[#58a6ff] font-mono'
                  : 'bg-surface-base'
              }`}>
                {/* Console Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      PS
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-text-primary tracking-tight">
                        Cloud Telemetry Console
                      </h2>
                      <span className="text-[10px] font-mono text-text-muted">
                        cluster-primary.us-east-1 // v2.4.0
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="h-8 px-3 rounded-lg bg-surface-muted border border-border-subtle text-xs font-medium text-text-secondary hover:text-text-primary flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-accent' : ''}`} />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button
                      className="h-8 px-3.5 rounded-lg bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all shadow-xs"
                    >
                      Deploy Probe
                    </button>
                  </div>
                </div>

                {/* 4-KPI Overview Cards (Tabular Numbers & Deliberate Whitespace) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Global P99</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-text-primary">14.2ms</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">−2.4ms vs 24h</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Throughput</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-text-primary">172.1k</div>
                    <div className="text-[11px] text-text-secondary font-mono">req/sec</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Error Rate</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-text-primary">0.001%</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Nominal</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Active Probes</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-text-primary">48 / 48</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      100% Online
                    </span>
                  </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Filter services or routes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-8 pl-8 pr-3 rounded-lg bg-surface-muted/40 border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="h-8 px-2.5 rounded-lg bg-surface-muted/40 border border-border-subtle text-xs text-text-secondary focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="healthy">Healthy Only</option>
                      <option value="degraded">Degraded Only</option>
                    </select>

                    <button
                      onClick={() => setSortAsc(!sortAsc)}
                      className="h-8 px-2.5 rounded-lg bg-surface-muted/40 border border-border-subtle text-xs text-text-secondary hover:text-text-primary flex items-center gap-1"
                      title="Sort by Latency"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">P99</span>
                    </button>
                  </div>
                </div>

                {/* Live Data Table / Mobile Card Switcher */}
                {viewport === 'mobile' ? (
                  // Mobile Adaptive Card Layout
                  <div className="space-y-2.5">
                    {filteredRows.map((row) => (
                      <div key={row.id} className="p-3 rounded-xl bg-surface-muted/30 border border-border-subtle space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-text-primary">{row.service}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            row.status === 'healthy'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          }`}>
                            {row.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-text-muted truncate">{row.route}</div>
                        <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-border-subtle">
                          <span className="text-text-muted">P99: <strong className="text-text-primary">{row.latency}ms</strong></span>
                          <span className="text-text-secondary">{row.throughput}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Desktop / Tablet Grid Table
                  <div className="rounded-xl border border-border-subtle overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-surface-muted/60 text-text-secondary font-semibold border-b border-border-subtle">
                        <tr>
                          <th className={densityPadding}>Service</th>
                          <th className={densityPadding}>Route</th>
                          <th className={`${densityPadding} font-mono`}>P99 Latency</th>
                          <th className={densityPadding}>Throughput</th>
                          <th className={densityPadding}>Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle bg-surface-base">
                        {filteredRows.map((row) => (
                          <tr key={row.id} className="hover:bg-surface-hover/50 transition-colors">
                            <td className={`${densityPadding} font-semibold text-text-primary`}>{row.service}</td>
                            <td className={`${densityPadding} font-mono text-text-secondary`}>{row.route}</td>
                            <td className={`${densityPadding} font-mono tabular-nums text-text-primary`}>{row.latency}ms</td>
                            <td className={`${densityPadding} font-mono text-text-secondary`}>{row.throughput}</td>
                            <td className={densityPadding}>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                row.status === 'healthy'
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 8-State Interactive Component Lab */}
          <div className="p-8 rounded-3xl bg-surface-base border border-border-subtle shadow-subtle space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                <Layers className="w-4 h-4" />
                <span>Quality Gate</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">
                8-State Component Matrix Tester
              </h3>
              <p className="text-xs text-text-secondary max-w-xl">
                Every Pure SaaS interactive component satisfies the 8-state design contract. Click each state below to observe live visual feedback:
              </p>
            </div>

            {/* State Picker Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                'default',
                'hover',
                'focus',
                'active',
                'disabled',
                'loading',
                'invalid',
                'valid'
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setTestState(s as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-colors ${
                    testState === s
                      ? 'bg-accent text-white font-bold'
                      : 'bg-surface-muted border border-border-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Component State Render Box */}
            <div className="p-8 rounded-2xl bg-surface-muted/30 border border-border-subtle flex flex-wrap items-center justify-around gap-6">
              {/* Primary Action Button */}
              <div className="space-y-2 text-center">
                <span className="text-[11px] font-mono text-text-muted">Primary Button</span>
                <div>
                  <button
                    disabled={testState === 'disabled' || testState === 'loading'}
                    className={`h-9 px-4 rounded-xl text-xs font-semibold transition-all ${
                      testState === 'default'
                        ? 'bg-accent text-white hover:opacity-90'
                        : testState === 'hover'
                        ? 'bg-accent text-white opacity-90 shadow-md'
                        : testState === 'focus'
                        ? 'bg-accent text-white ring-2 ring-accent/60 ring-offset-2 ring-offset-canvas'
                        : testState === 'active'
                        ? 'bg-accent text-white scale-95'
                        : testState === 'disabled'
                        ? 'bg-surface-muted text-text-muted cursor-not-allowed opacity-50'
                        : testState === 'loading'
                        ? 'bg-accent text-white opacity-80 cursor-wait'
                        : testState === 'invalid'
                        ? 'bg-danger text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {testState === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing...</span>
                      </span>
                    ) : testState === 'valid' ? (
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirmed</span>
                      </span>
                    ) : testState === 'invalid' ? (
                      <span className="flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5" />
                        <span>Invalid Action</span>
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>

              {/* Form Input Field */}
              <div className="space-y-2 text-center min-w-[220px]">
                <span className="text-[11px] font-mono text-text-muted">Form Input Field</span>
                <div>
                  <input
                    type="text"
                    disabled={testState === 'disabled'}
                    readOnly={testState === 'loading'}
                    value={testState === 'invalid' ? 'invalid-email-address' : testState === 'valid' ? 'user@domain.com' : 'Cluster-Node-01'}
                    className={`w-full h-9 px-3 rounded-lg text-xs font-mono transition-all ${
                      testState === 'default'
                        ? 'bg-surface-base border border-border-subtle text-text-primary'
                        : testState === 'hover'
                        ? 'bg-surface-base border border-border-hover text-text-primary'
                        : testState === 'focus'
                        ? 'bg-surface-base border border-accent ring-2 ring-accent/30 text-text-primary'
                        : testState === 'active'
                        ? 'bg-surface-hover border border-accent'
                        : testState === 'disabled'
                        ? 'bg-surface-muted/50 border border-border-subtle text-text-muted cursor-not-allowed opacity-60'
                        : testState === 'loading'
                        ? 'bg-surface-muted/30 border border-border-subtle text-text-secondary cursor-wait'
                        : testState === 'invalid'
                        ? 'bg-danger/10 border border-danger text-danger'
                        : 'bg-emerald-500/10 border border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    }`}
                  />
                  {testState === 'invalid' && (
                    <span className="text-[10px] text-danger text-left block mt-1">Please enter a valid RFC-compliant address</span>
                  )}
                  {testState === 'valid' && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 text-left block mt-1">✓ Syntax verified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

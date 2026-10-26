import { useState, useEffect } from 'react';
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sun,
  Moon,
  Command,
  X,
  Copy,
  Check,
  ShieldCheck,
  Globe,
  ChevronRight,
  Zap,
  Filter
} from 'lucide-react';
import { SHARED_ENDPOINTS, SHARED_TIME_SERIES, SHARED_REGIONS, EndpointItem } from '../data/mockData';

interface WithPureSaaSProps {
  onOpenCommand?: () => void;
}

export function WithPureSaaS({ onOpenCommand }: WithPureSaaSProps) {
  const [selectedMetric, setSelectedMetric] = useState<'throughput' | 'latency' | 'budget'>('throughput');
  const [timeWindow, setTimeWindow] = useState<'15m' | '1h' | '24h' | '7d'>('24h');
  const [methodFilter, setMethodFilter] = useState<'ALL' | 'GET' | 'POST'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | '200' | '500'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointItem | null>(SHARED_ENDPOINTS[0]);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; rps: number; latency: number } | null>(null);

  // Dark mode toggle
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

  // Keyboard shortcut listener for Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onOpenCommand) {
          onOpenCommand();
        } else {
          setIsCommandOpen((prev) => !prev);
        }
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenCommand]);

  // Filtered endpoints
  const filtered = SHARED_ENDPOINTS.filter((ep) => {
    const matchesSearch = ep.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || ep.method === methodFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === '200' && ep.status === 200) ||
      (statusFilter === '500' && ep.status >= 500);
    return matchesSearch && matchesMethod && matchesStatus;
  });

  return (
    <div className="h-full min-h-[850px] bg-canvas text-text-primary flex flex-col font-sans transition-colors">
      {/* 1. Senior Engineering Console App Bar (NO boilerplate sidebar) */}
      <header className="sticky top-0 z-30 bg-surface-base/90 backdrop-blur-md border-b border-border-subtle px-4 sm:px-6 lg:px-8 py-2.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand + Context Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent text-white flex items-center justify-center font-bold text-xs shadow-subtle">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm tracking-tight text-text-primary">
                PulseMetrics
              </span>
            </div>

            <span className="text-border-strong select-none">/</span>

            {/* Environment Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-muted border border-border-subtle text-xs font-mono font-medium text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span>prod-us-east-1</span>
            </div>

            {/* Breadcrumb Context */}
            <span className="hidden md:inline-flex text-xs text-text-muted">
              Observability &gt; Ingress Telemetry
            </span>
          </div>

          {/* Center: Command Palette Pill */}
          <div className="flex-1 max-w-sm hidden lg:block">
            <button
              onClick={() => (onOpenCommand ? onOpenCommand() : setIsCommandOpen(true))}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface-muted hover:bg-surface-elevated border border-border-subtle text-xs text-text-muted hover:text-text-primary transition-all shadow-subtle group"
            >
              <div className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
                <span>Search telemetry, routes, actions...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-base border border-border-subtle text-[10px] font-mono text-text-muted">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls: Segmented Scrubber, Stream Pulse & Theme */}
          <div className="flex items-center gap-2.5">
            {/* Pure SaaS Flag Pill */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-muted text-accent border border-accent/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pure SaaS Enabled
            </span>

            {/* Live Streaming Indicator (Solid Static Pill, Zero Pulsing Dot) */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-muted border border-border-subtle text-xs font-mono text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span>2,420 req/s</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg bg-surface-muted hover:bg-surface-elevated border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main High-Density Operational Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Context Header Strip & Time Window Scrubber */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border-subtle">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              Ingress Fleet Overview
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              High-frequency packet telemetry and distributed edge node latency.
            </p>
          </div>

          {/* Segmented Time Control */}
          <div className="flex items-center bg-surface-muted p-1 rounded-lg border border-border-subtle text-xs font-medium">
            {(['15m', '1h', '24h', '7d'] as const).map((tw) => (
              <button
                key={tw}
                onClick={() => setTimeWindow(tw)}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeWindow === tw
                    ? 'bg-surface-base text-accent font-semibold shadow-subtle'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {tw}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Asymmetric Hero Telemetry Grid (66% Hero Chart / 34% Secondary Operational Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hero Card: Live Volume & Interactive Telemetry (8 Cols) */}
          <div className="lg:col-span-8 bg-surface-base rounded-xl border border-border-subtle p-6 sm:p-7 shadow-subtle flex flex-col justify-between">
            <div>
              {/* Header with Metric Segmented Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold tracking-tight font-tabular text-text-primary">
                      {selectedMetric === 'throughput'
                        ? '48,214,890'
                        : selectedMetric === 'latency'
                        ? '42.8 ms'
                        : '99.98%'}
                    </span>
                    <span className="text-xs font-semibold text-success flex items-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +14.2% vs baseline
                    </span>
                  </div>
                  <span className="text-xs text-text-muted mt-0.5 block font-mono">
                    {selectedMetric === 'throughput'
                      ? 'Total Ingested Events (Window: 24h)'
                      : selectedMetric === 'latency'
                      ? 'Fleet-Wide P99 Response Latency'
                      : 'Rolling Monthly Availability'}
                  </span>
                </div>

                {/* Metric Mode Toggle */}
                <div className="flex items-center bg-surface-muted p-0.5 rounded-lg border border-border-subtle text-xs font-medium">
                  <button
                    onClick={() => setSelectedMetric('throughput')}
                    className={`px-2.5 py-1 rounded ${
                      selectedMetric === 'throughput' ? 'bg-surface-base text-accent shadow-subtle' : 'text-text-muted'
                    }`}
                  >
                    Volume
                  </button>
                  <button
                    onClick={() => setSelectedMetric('latency')}
                    className={`px-2.5 py-1 rounded ${
                      selectedMetric === 'latency' ? 'bg-surface-base text-accent shadow-subtle' : 'text-text-muted'
                    }`}
                  >
                    Latency
                  </button>
                  <button
                    onClick={() => setSelectedMetric('budget')}
                    className={`px-2.5 py-1 rounded ${
                      selectedMetric === 'budget' ? 'bg-surface-base text-accent shadow-subtle' : 'text-text-muted'
                    }`}
                  >
                    SLA
                  </button>
                </div>
              </div>

              {/* Status Code Proportional Bar Strip */}
              <div className="mb-4 bg-surface-muted/60 p-2.5 rounded-lg border border-border-subtle">
                <div className="flex justify-between text-[11px] font-mono text-text-secondary mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    2xx Success: <strong className="text-text-primary">98.4%</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-warning"></span>
                    4xx Client: <strong className="text-text-primary">1.2%</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-danger"></span>
                    5xx Server: <strong className="text-text-primary">0.4%</strong>
                  </span>
                </div>
                {/* Proportional Strip */}
                <div className="h-2 w-full rounded-full bg-border-subtle overflow-hidden flex">
                  <div style={{ width: '98.4%' }} className="bg-success"></div>
                  <div style={{ width: '1.2%' }} className="bg-warning"></div>
                  <div style={{ width: '0.4%' }} className="bg-danger"></div>
                </div>
              </div>

              {/* Interactive SVG Sparkline with Hover Tooltip */}
              <div className="relative h-48 w-full select-none mt-2">
                <svg className="w-full h-full" viewBox="0 0 600 180" fill="none">
                  <defs>
                    <linearGradient id="area-gradient-pure" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  <line x1="20" y1="30" x2="580" y2="30" stroke="var(--border-subtle)" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="580" y2="80" stroke="var(--border-subtle)" strokeDasharray="3 3" />
                  <line x1="20" y1="130" x2="580" y2="130" stroke="var(--border-subtle)" strokeDasharray="3 3" />

                  {/* Warning Threshold Line */}
                  <line x1="20" y1="50" x2="580" y2="50" stroke="var(--danger)" strokeDasharray="2 2" strokeOpacity="0.4" />
                  <text x="500" y="44" fill="var(--danger)" fontSize="9" fontFamily="monospace">
                    SLA Limit (3.2k)
                  </text>

                  {/* Chart Fill */}
                  <path
                    d="M 20 140 Q 90 120, 160 130 T 300 70 T 440 90 T 580 60 L 580 170 L 20 170 Z"
                    fill="url(#area-gradient-pure)"
                  />
                  {/* Chart Stroke */}
                  <path
                    d="M 20 140 Q 90 120, 160 130 T 300 70 T 440 90 T 580 60"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive points */}
                  {SHARED_TIME_SERIES.map((pt, idx) => {
                    const cx = 20 + idx * 70;
                    const cy = 170 - (pt.rps / 4000) * 140;
                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r="4"
                        className="cursor-pointer transition-all hover:r-6"
                        fill="var(--surface-base)"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    );
                  })}
                </svg>

                {/* Dynamic Tooltip on Hover */}
                {hoveredPoint && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-surface-elevated border border-border-strong px-3 py-1.5 rounded-lg shadow-card text-xs font-mono pointer-events-none">
                    <span className="text-text-muted">{hoveredPoint.time}: </span>
                    <strong className="text-accent">{hoveredPoint.rps} req/s</strong>
                    <span className="text-text-muted"> · P99: </span>
                    <strong className="text-success">{hoveredPoint.latency}ms</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Time Axis Labels */}
            <div className="flex justify-between text-[11px] font-mono text-text-muted px-2 pt-2 border-t border-border-subtle">
              {SHARED_TIME_SERIES.map((p, i) => (
                <span key={i}>{p.time}</span>
              ))}
            </div>
          </div>

          {/* Secondary Operational Console (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Error Budget & SLA Ring */}
            <div className="bg-surface-base rounded-xl border border-border-subtle p-5 shadow-subtle">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-mono">
                  SLA Error Budget
                </span>
                <span className="text-xs font-mono text-success bg-accent-muted px-2 py-0.5 rounded font-semibold">
                  Healthy
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-tabular text-text-primary">99.982%</span>
                <span className="text-xs text-text-muted">/ 99.90% SLA Target</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-text-muted font-mono mb-1">
                  <span>Remaining: 18.4 hrs</span>
                  <span>Burn Rate: 0.8x</span>
                </div>
                <div className="h-1.5 w-full bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>

            {/* Ingestion Cluster Topology Matrix */}
            <div className="bg-surface-base rounded-xl border border-border-subtle p-5 shadow-subtle">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-mono">
                  Edge Regions
                </span>
                <Globe className="w-4 h-4 text-text-muted" />
              </div>

              <div className="space-y-2.5 text-xs">
                {SHARED_REGIONS.map((r) => (
                  <div
                    key={r.region}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-muted/50 border border-border-subtle font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          r.status === 'healthy' ? 'bg-success' : 'bg-warning'
                        }`}
                      ></span>
                      <span className="font-semibold text-text-primary">{r.region}</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary">
                      <span>{r.nodes} nodes</span>
                      <strong className="text-text-primary">{r.latency}ms</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Master-Detail Ingress Data Grid & Slide-Over Inspector */}
        <div className="bg-surface-base rounded-xl border border-border-subtle shadow-subtle overflow-hidden">
          {/* Faceted Filter Toolbar */}
          <div className="p-4 border-b border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Terminal className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by endpoint URI (/api/...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-muted border border-border-subtle rounded-lg font-mono focus:outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-[11px] text-text-muted font-mono flex items-center gap-1">
                <Filter className="w-3 h-3" /> Method:
              </span>
              {(['ALL', 'GET', 'POST'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethodFilter(m)}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-medium border transition-colors ${
                    methodFilter === m
                      ? 'bg-accent text-white border-accent'
                      : 'bg-surface-muted border-border-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {m}
                </button>
              ))}

              <span className="text-[11px] text-text-muted font-mono ml-2">Status:</span>
              {(['ALL', '200', '500'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-medium border transition-colors ${
                    statusFilter === s
                      ? 'bg-accent text-white border-accent'
                      : 'bg-surface-muted border-border-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {s === 'ALL' ? 'All' : s === '200' ? '2xx Only' : '5xx Only'}
                </button>
              ))}
            </div>
          </div>

          {/* Operational Dense Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-muted text-text-muted border-b border-border-subtle uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3">Route Path</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">P99 Latency</th>
                  <th className="px-4 py-3">Traffic (RPM)</th>
                  <th className="px-4 py-3">Error Rate</th>
                  <th className="px-4 py-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((ep) => {
                  const isSelected = selectedEndpoint?.id === ep.id;
                  return (
                    <tr
                      key={ep.id}
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-accent/10 border-l-2 border-l-accent'
                          : 'hover:bg-surface-muted/60'
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-text-primary">
                        {ep.path}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            ep.method === 'POST'
                              ? 'bg-accent/15 text-accent'
                              : 'bg-surface-muted text-text-secondary border border-border-subtle'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            ep.status === 200
                              ? 'bg-success/15 text-success'
                              : 'bg-danger/15 text-danger'
                          }`}
                        >
                          {ep.status === 200 ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          {ep.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-tabular">
                        <div className="flex items-center gap-2">
                          <span className="w-12 text-right">{ep.latency}ms</span>
                          <div className="w-16 h-1.5 bg-surface-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                ep.latency > 200 ? 'bg-danger' : ep.latency > 100 ? 'bg-warning' : 'bg-success'
                              }`}
                              style={{ width: `${Math.min(100, (ep.latency / 500) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-tabular text-text-secondary">
                        {ep.rpm.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-tabular">
                        <span className={ep.errorRate > 1 ? 'text-danger font-bold' : 'text-text-muted'}>
                          {ep.errorRate.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ChevronRight className="w-4 h-4 text-text-muted inline group-hover:text-text-primary" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
            <span>Showing {filtered.length} active routes</span>
            <span className="text-[11px]">Click any route to open the Master-Detail Inspector</span>
          </div>
        </div>
      </main>

      {/* 5. Slide-Over Master-Detail Inspector Drawer */}
      {selectedEndpoint && (
        <aside className="fixed top-0 right-0 z-40 h-full w-full sm:w-[440px] bg-surface-base border-l border-border-subtle shadow-drawer p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 font-sans">
          <div className="space-y-5">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <h3 className="font-bold text-sm text-text-primary">Route Telemetry Inspector</h3>
              </div>
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="p-1 rounded hover:bg-surface-muted text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Route */}
            <div className="bg-surface-muted p-3 rounded-lg border border-border-subtle">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-1.5 py-0.5 rounded bg-accent text-white font-bold text-[10px]">
                  {selectedEndpoint.method}
                </span>
                <span className="font-semibold text-text-primary truncate">{selectedEndpoint.path}</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle text-[11px] font-mono text-text-muted">
                <span>Trace ID: trc_8fa429e01f</span>
                <span className="text-success font-semibold">Active Ingress</span>
              </div>
            </div>

            {/* Waterfall Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 font-mono">
                Latency Breakdown Waterfall
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-text-secondary">
                  <span>DNS Lookup</span>
                  <span className="font-tabular">{selectedEndpoint.waterfall.dns} ms</span>
                </div>
                <div className="h-1 bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '8%' }}></div>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>TLS Handshake</span>
                  <span className="font-tabular">{selectedEndpoint.waterfall.tls} ms</span>
                </div>
                <div className="h-1 bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '18%' }}></div>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>Origin Server TTFB</span>
                  <span className="font-tabular">{selectedEndpoint.waterfall.origin} ms</span>
                </div>
                <div className="h-1 bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '64%' }}></div>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>Content Transfer</span>
                  <span className="font-tabular">{selectedEndpoint.waterfall.transfer} ms</span>
                </div>
                <div className="h-1 bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>

            {/* Replay cURL snippet */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono">
                  Replay cURL
                </h4>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `curl -X ${selectedEndpoint.method} https://api.pulsemetrics.io${selectedEndpoint.path} -H "Authorization: Bearer sec_live_99"`
                    );
                    setCopiedCurl(true);
                    setTimeout(() => setCopiedCurl(false), 1500);
                  }}
                  className="flex items-center gap-1 text-[11px] text-accent hover:underline font-mono"
                >
                  {copiedCurl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedCurl ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-surface-muted border border-border-subtle rounded-lg text-[11px] font-mono text-text-secondary overflow-x-auto">
                curl -X {selectedEndpoint.method} \
  https://api.pulsemetrics.io{selectedEndpoint.path} \
  -H "Authorization: Bearer sec_live_99"
              </pre>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="pt-4 border-t border-border-subtle flex gap-2">
            <button
              onClick={() => alert(`Quarantine applied to ${selectedEndpoint.path}`)}
              className="flex-1 py-2 px-3 rounded-lg border border-border-strong text-xs font-semibold hover:bg-surface-muted text-text-primary transition-colors"
            >
              Throttle Route (50%)
            </button>
            <button
              onClick={() => setSelectedEndpoint(null)}
              className="py-2 px-4 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-subtle transition-colors"
            >
              Done
            </button>
          </div>
        </aside>
      )}

      {/* 6. Command Palette (⌘K) Modal */}
      {isCommandOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
          onClick={() => setIsCommandOpen(false)}
        >
          <div
            className="bg-surface-elevated rounded-xl border border-border-strong shadow-drawer max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-border-subtle flex items-center gap-2">
              <Command className="w-4 h-4 text-text-muted" />
              <input
                autoFocus
                placeholder="Type a command or search metrics..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-mono"
              />
              <kbd className="px-1.5 py-0.5 rounded bg-surface-muted border border-border-subtle text-[10px] text-text-muted font-mono">
                ESC
              </kbd>
            </div>

            <div className="p-2 space-y-1 text-xs">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted">
                Quick Operational Actions
              </div>
              <button
                onClick={() => {
                  alert('Canary traffic flush initiated.');
                  setIsCommandOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-muted text-text-primary text-left transition-colors"
              >
                <span>Trigger Ingress Canary Flush</span>
                <kbd className="text-[10px] font-mono text-text-muted">↵</kbd>
              </button>
              <button
                onClick={() => {
                  setIsDark(!isDark);
                  setIsCommandOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-muted text-text-primary text-left transition-colors"
              >
                <span>Toggle Dark / Light Theme</span>
                <kbd className="text-[10px] font-mono text-text-muted">T</kbd>
              </button>
              <button
                onClick={() => {
                  setTimeWindow('15m');
                  setIsCommandOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-muted text-text-primary text-left transition-colors"
              >
                <span>Switch Telemetry Window to 15 Minutes</span>
                <kbd className="text-[10px] font-mono text-text-muted">W</kbd>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

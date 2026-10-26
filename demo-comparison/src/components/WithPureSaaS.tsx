import React, { useState } from 'react';
import {
  SHARED_KPIS,
  SHARED_CHART_DATA,
  SHARED_ACTIVITY_EVENTS,
  SHARED_ENDPOINTS,
  SHARED_USER_SETTINGS
} from '../data/mockData';
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Server,
  Settings,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  X,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Sliders
} from 'lucide-react';

export const WithPureSaaS: React.FC = () => {
  // Navigation State
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Time Range Filter
  const [timeRange, setTimeRange] = useState('24h');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);

  // Settings Modal State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState(SHARED_USER_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filtered Endpoints
  const filteredEndpoints = SHARED_ENDPOINTS.filter(ep => {
    const matchesSearch = ep.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) || ep.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ep.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setTimeout(() => {
      setIsSavingSettings(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setShowSettingsModal(false);
      }, 800);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col md:flex-row font-sans selection:bg-accent/20 selection:text-accent">
      {/* Sidebar Navigation (Pure SaaS: Apple hairline borders, semantic tokens, deliberate spatial rhythm) */}
      <aside className="w-full md:w-64 bg-surface-base border-b md:border-b-0 md:border-r border-border-subtle p-5 flex flex-col justify-between shrink-0 transition-colors">
        <div className="space-y-6">
          {/* Brand Mark (Pure SaaS: Disciplined typography, zero gradient slop text) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
              PM
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-text-primary">
                PulseMetrics
              </span>
              <span className="block text-[10px] font-mono font-medium text-text-muted tracking-wider uppercase">
                Enterprise Cloud
              </span>
            </div>
          </div>

          {/* Navigation Items (8-state compliant, focus-visible rings, 44px touch targets) */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'events', label: 'Activity Feed', icon: Activity },
              { id: 'endpoints', label: 'API Endpoints', icon: Server },
              { id: 'settings', label: 'Configuration', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'settings') setShowSettingsModal(true);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-[0.98] ${
                    isActive
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card (Refined hairline divider, accessible avatar) */}
        <div className="pt-4 mt-6 border-t border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-surface-muted border border-border-subtle flex items-center justify-center font-mono font-bold text-xs text-text-primary shrink-0">
              AC
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-text-primary truncate">{settings.name}</div>
              <div className="text-[10px] text-text-muted font-mono truncate">{settings.email}</div>
            </div>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Account Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header (Subtle material blur, restrained surface lighting) */}
        <header className="h-14 px-6 border-b border-border-subtle bg-surface-base/90 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20 transition-colors">
          <div className="flex items-center gap-3 truncate">
            <h1 className="text-sm font-bold text-text-primary tracking-tight truncate">
              Infrastructure Telemetry
            </h1>
            {/* Pure SaaS Accessible Status Pill: Solid tint, zero pulsing green ping */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Nominal // 48 Nodes Healthy</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Segmented Time Range Picker */}
            <div className="inline-flex bg-surface-muted/60 p-0.5 rounded-lg border border-border-subtle text-xs">
              {['24h', '7d', '30d'].map(r => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-md uppercase font-semibold text-[11px] transition-all duration-150 ${
                    timeRange === r
                      ? 'bg-surface-base text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-border-subtle transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Body (Disciplined 8pt spatial rhythm: gap-4, p-6) */}
        <div className="p-6 space-y-6">
          {/* KPI Cards (Pure SaaS: Tabular Numbers, Negative Tracking, Hairline Borders) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHARED_KPIS.map(kpi => (
              <div
                key={kpi.id}
                className="bg-surface-base border border-border-subtle p-5 rounded-2xl shadow-subtle hover:border-border-hover transition-all duration-150 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  <span>{kpi.label}</span>
                  <span
                    className={`inline-flex items-center text-[11px] font-semibold font-mono ${
                      kpi.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-danger'
                    }`}
                  >
                    {kpi.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {kpi.delta}
                  </span>
                </div>
                {/* Pure SaaS: Tabular Numerals (font-variant-numeric: tabular-nums) */}
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-text-primary tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs text-text-secondary font-normal">
                  {kpi.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Chart Section (Subtle gradient, clean typographic legends) */}
          <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-subtle space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-text-primary tracking-tight">
                  Request Throughput & Latency Trend
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  High-cardinality distributed telemetry sampled at 15-minute intervals
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-medium">
                <span className="flex items-center gap-1.5 text-accent">
                  <span className="w-2.5 h-2.5 rounded-sm bg-accent" />
                  <span>Throughput (req/s)</span>
                </span>
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="w-2.5 h-2.5 rounded-sm bg-border-default" />
                  <span>P99 Latency (ms)</span>
                </span>
              </div>
            </div>

            {/* Custom Interactive SVG Chart */}
            <div className="h-56 relative pt-4 flex flex-col justify-end">
              <div className="flex items-end justify-between gap-2 h-44 w-full">
                {SHARED_CHART_DATA.map((pt, idx) => {
                  const reqHeightPercent = (pt.requests / 400000) * 100;
                  const isHovered = hoveredChartPoint === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredChartPoint(idx)}
                      onMouseLeave={() => setHoveredChartPoint(null)}
                      className="flex-1 flex flex-col items-center h-full justify-end relative cursor-pointer group"
                    >
                      {/* Tooltip (Pure SaaS: Hairline border, tabular figures, no shadow blur) */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-2 z-10 bg-surface-base border border-border-default rounded-xl p-3 text-xs text-text-primary shadow-elevated whitespace-nowrap space-y-1">
                          <div className="font-bold text-text-primary font-mono">{pt.time} UTC</div>
                          <div className="text-accent font-mono tabular-nums">{pt.requests.toLocaleString()} reqs</div>
                          <div className="text-text-secondary font-mono tabular-nums">{pt.latencyMs}ms P99 latency</div>
                        </div>
                      )}

                      {/* Bar with spring hover transition */}
                      <div className="w-full max-w-[32px] bg-surface-muted/60 rounded-t-lg relative flex items-end justify-center overflow-hidden h-full">
                        <div
                          style={{ height: `${reqHeightPercent}%` }}
                          className={`w-full transition-all duration-200 rounded-t-lg ${
                            isHovered ? 'bg-accent' : 'bg-accent/70'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-text-muted mt-2 font-mono">{pt.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid Split: Endpoints Table & Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Endpoints Table (8 cols) */}
            <div className="lg:col-span-8 bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-subtle space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-text-primary tracking-tight">
                    Top Managed API Endpoints
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Latency distribution and volumetric routing contracts
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Filter routes..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="h-8 pl-8 pr-3 rounded-lg bg-surface-muted/40 border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-8 px-2.5 rounded-lg bg-surface-muted/40 border border-border-subtle text-xs text-text-secondary focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="degraded">Degraded Only</option>
                  </select>
                </div>
              </div>

              {/* Data Table (Pure SaaS: Tabular figures, hairline dividers, accessible badge pills) */}
              <div className="overflow-x-auto rounded-xl border border-border-subtle">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-muted/50 text-text-secondary font-semibold border-b border-border-subtle">
                    <tr>
                      <th className="py-2.5 px-3.5">Method</th>
                      <th className="py-2.5 px-3.5">Endpoint Route</th>
                      <th className="py-2.5 px-3.5 font-mono">P99</th>
                      <th className="py-2.5 px-3.5 font-mono">Volume</th>
                      <th className="py-2.5 px-3.5">Status</th>
                      <th className="py-2.5 px-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle bg-surface-base">
                    {filteredEndpoints.map(row => (
                      <tr key={row.id} className="hover:bg-surface-hover/60 transition-colors duration-150">
                        <td className="py-2.5 px-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            row.method === 'GET' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                            row.method === 'POST' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                            'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                          }`}>
                            {row.method}
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-text-primary font-medium">{row.endpoint}</td>
                        <td className="py-2.5 px-3.5 font-mono tabular-nums font-semibold text-text-primary">{row.latency}ms</td>
                        <td className="py-2.5 px-3.5 font-mono tabular-nums text-text-secondary">{row.rpm.toLocaleString()} rpm</td>
                        <td className="py-2.5 px-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            row.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                            row.status === 'degraded' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                            'bg-surface-muted text-text-muted border border-border-subtle'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <button className="text-accent hover:underline font-semibold text-xs">
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity Feed (4 cols) */}
            <div className="lg:col-span-4 bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-text-primary tracking-tight">
                Live Cluster Activity
              </h3>
              <div className="space-y-3">
                {SHARED_ACTIVITY_EVENTS.map(evt => (
                  <div key={evt.id} className="p-3.5 rounded-xl bg-surface-muted/30 border border-border-subtle space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-text-primary">{evt.title}</span>
                      <span className="text-[10px] text-text-muted font-mono">{evt.timestamp}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{evt.description}</p>
                    <div className="text-[10px] text-text-muted font-mono truncate pt-1">
                      actor: {evt.actor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal (Pure SaaS: Apple modal depth, focus-visible outline, clear micro-interaction) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-surface-base border border-border-default rounded-3xl p-6 shadow-floating space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h3 className="text-base font-bold text-text-primary tracking-tight">Workspace Configuration</h3>
                <span className="text-xs text-text-secondary">Manage administrative telemetry parameters</span>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-text-primary font-semibold">Administrator Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={e => setSettings({ ...settings, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-surface-muted/40 border border-border-subtle text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-primary font-semibold">Contact Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={e => setSettings({ ...settings, email: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-surface-muted/40 border border-border-subtle text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle">
                <div>
                  <div className="font-semibold text-text-primary">Real-time Telemetry Alerts</div>
                  <div className="text-[10px] text-text-muted">Receive webhook dispatch on latency anomalies</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={e => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-accent focus:ring-accent"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-muted text-text-secondary hover:text-text-primary font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-4 py-2 rounded-xl bg-accent text-white font-semibold flex items-center gap-1.5 shadow-xs hover:opacity-90 active:scale-98 transition-all"
                >
                  {isSavingSettings ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save Configuration</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

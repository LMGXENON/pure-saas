import React, { useState } from 'react';
import {
  SHARED_KPIS,
  SHARED_CHART_DATA,
  SHARED_ACTIVITY_EVENTS,
  SHARED_ENDPOINTS,
  SHARED_USER_SETTINGS,
  EndpointRow
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
  CheckCircle,
  AlertTriangle,
  RotateCw,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const WithoutPureSaaS: React.FC = () => {
  // Navigation State
  const [activeNav, setActiveNav] = useState('dashboard');
  
  // Date range filter
  const [timeRange, setTimeRange] = useState('24h');
  
  // Data Table Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);

  // Settings Modal State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState(SHARED_USER_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

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
      setShowSettingsModal(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo with Gradient Text (Typical AI cliché) */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              PM
            </div>
            <div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                PulseMetrics
              </span>
              <span className="block text-[10px] text-slate-400 tracking-wider">CLOUD ANALYTICS</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'events', label: 'Activity Feed', icon: Activity },
              { id: 'endpoints', label: 'API Endpoints', icon: Server },
              { id: 'settings', label: 'Settings', icon: Settings }
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              AC
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-200 truncate">{settings.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{settings.email}</div>
            </div>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md"
            title="Account Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 px-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white tracking-wide">Infrastructure Telemetry</h1>
            {/* Green Pulsing Dot (Common AI Tropes) */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center bg-slate-800/70 p-1 rounded-lg border border-slate-700 text-xs">
              {['24h', '7d', '30d'].map(r => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-md uppercase font-semibold transition-all ${
                    timeRange === r ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 space-y-6">
          {/* KPI Cards Row (Without Pure SaaS: standard cards, non-tabular nums, heavy glow shadow) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHARED_KPIS.map(kpi => (
              <div
                key={kpi.id}
                className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl shadow-xl shadow-slate-950/40 space-y-2 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <span>{kpi.label}</span>
                  <span
                    className={`inline-flex items-center text-xs font-bold ${
                      kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {kpi.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                    {kpi.delta}
                  </span>
                </div>
                {/* Standard Proportional Digits (No tabular-nums) */}
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {kpi.value}
                </div>
                <div className="text-xs text-slate-400">
                  {kpi.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Chart Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Request Throughput & Latency Trend</h2>
                <p className="text-xs text-slate-400 mt-0.5">Sampled aggregate metrics across all active regions</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-3 h-3 rounded-sm bg-blue-500" />
                  <span>Requests/sec</span>
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <span className="w-3 h-3 rounded-sm bg-purple-500" />
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
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-2 z-10 bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 shadow-xl whitespace-nowrap">
                          <div className="font-bold text-white mb-1">{pt.time} UTC</div>
                          <div className="text-blue-400">{pt.requests.toLocaleString()} reqs</div>
                          <div className="text-purple-400">{pt.latencyMs}ms P99</div>
                        </div>
                      )}

                      {/* Bar and Line Indicator */}
                      <div className="w-full max-w-[36px] bg-slate-700/60 rounded-t-md relative flex items-end justify-center overflow-hidden h-full">
                        <div
                          style={{ height: `${reqHeightPercent}%` }}
                          className={`w-full transition-all duration-300 rounded-t-md ${
                            isHovered ? 'bg-blue-400' : 'bg-gradient-to-t from-blue-600 to-indigo-500'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">{pt.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Activity Feed and Table Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Endpoints Table (8 cols on desktop) */}
            <div className="lg:col-span-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">Top Managed API Endpoints</h3>
                  <p className="text-xs text-slate-400">Response time and volume distribution by route</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search routes..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="h-8 pl-8 pr-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-8 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="degraded">Degraded Only</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-300 font-semibold border-b border-slate-700">
                    <tr>
                      <th className="p-3">Method</th>
                      <th className="p-3">Endpoint Route</th>
                      <th className="p-3">P99</th>
                      <th className="p-3">Volume</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 bg-slate-900/30">
                    {filteredEndpoints.map(row => (
                      <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                            row.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {row.method}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-200 font-medium">{row.endpoint}</td>
                        <td className="p-3 font-semibold text-white">{row.latency}ms</td>
                        <td className="p-3 text-slate-400">{row.rpm.toLocaleString()} rpm</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            row.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            row.status === 'degraded' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                            'bg-slate-700 text-slate-400'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button className="text-blue-400 hover:text-blue-300 font-medium">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity Feed (4 cols on desktop) */}
            <div className="lg:col-span-4 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white">Live Cluster Activity</h3>
              <div className="space-y-3.5">
                {SHARED_ACTIVITY_EVENTS.map(evt => (
                  <div key={evt.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{evt.title}</span>
                      <span className="text-[10px] text-slate-400">{evt.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{evt.description}</p>
                    <div className="text-[10px] text-slate-500 font-mono truncate pt-1">
                      actor: {evt.actor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal (Working Interaction) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Workspace Configuration</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Administrator Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={e => setSettings({ ...settings, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Contact Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={e => setSettings({ ...settings, email: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <div className="font-semibold text-slate-200">Real-time Telemetry Alerts</div>
                  <div className="text-[10px] text-slate-400">Receive webhook dispatch on latency anomalies</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={e => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5"
                >
                  {isSavingSettings && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSavingSettings ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

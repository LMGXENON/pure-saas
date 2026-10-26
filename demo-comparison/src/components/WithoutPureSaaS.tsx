import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Server,
  FileText,
  Settings,
  Bell,
  Search,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  Activity,
  Layers,
  X,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { SHARED_ENDPOINTS, SHARED_ACTIVITY } from '../data/mockData';

export function WithoutPureSaaS() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [timeRange, setTimeRange] = useState('24h');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [orgName, setOrgName] = useState('Acme Technologies Inc.');
  const [alertThreshold, setAlertThreshold] = useState('250');
  const [isSaved, setIsSaved] = useState(false);

  // Filtered endpoints
  const filtered = SHARED_ENDPOINTS.filter((ep) => {
    const matchesSearch = ep.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || ep.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="flex h-full min-h-[850px] bg-slate-100 text-slate-800 font-sans">
      {/* 1. Left Sidebar (Fixed 256px dark sidebar, standard AI pattern) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-md shadow-indigo-500/20">
            P
          </div>
          <span className="font-bold text-lg text-white tracking-wide">PulseMetrics</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveNav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveNav('analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveNav('endpoints')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === 'endpoints'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            Endpoints
          </button>
          <button
            onClick={() => setActiveNav('customers')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === 'customers'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Customers
          </button>
          <button
            onClick={() => setActiveNav('logs')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === 'logs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Audit Logs
          </button>
        </nav>

        {/* User & Settings at Bottom */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mb-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/60">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center font-semibold text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">John Doe</p>
              <p className="text-[11px] text-slate-400 truncate">admin@pulse.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search metrics, API paths, nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Version Flag Badge */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              Without Pure SaaS (Unguided AI)
            </span>

            {/* Notification Bell with Pulsing Ping */}
            <div className="relative">
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </button>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Configure
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Header Title with Purple-to-Cyan Gradient */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Analytics Overview
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Real-time cloud ingestion metrics and API telemetry across all clusters.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="1h">Last 1 Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              <button className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg shadow-sm transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Identical KPI Cards (Classic AI 4-column cookie-cutter grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Total Ingested Events</span>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">48.2M</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+14.2%</span>
                  <span className="text-slate-400 font-normal">from last month</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Avg Request Latency</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">142 ms</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>-8.4%</span>
                  <span className="text-slate-400 font-normal">faster than target</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Active Ingestion Nodes</span>
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">84 / 96</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-600">
                  <span>87.5%</span>
                  <span className="text-slate-400 font-normal">cluster load</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Synthetic Error Rate</span>
                <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">0.42%</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-600">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+0.08%</span>
                  <span className="text-slate-400 font-normal">from yesterday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Chart & Recent Activity 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Chart (2 cols) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Request Volume Analytics</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Ingested requests per minute over the last 24 hours</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    Volume (req/s)
                  </span>
                </div>
              </div>

              {/* Standard SVG chart */}
              <div className="h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 240" fill="none">
                  <defs>
                    <linearGradient id="gradient-without" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="580" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" />
                  <line x1="40" y1="90" x2="580" y2="90" stroke="#f1f5f9" strokeDasharray="4 4" />
                  <line x1="40" y1="150" x2="580" y2="150" stroke="#f1f5f9" strokeDasharray="4 4" />
                  <line x1="40" y1="210" x2="580" y2="210" stroke="#e2e8f0" />

                  {/* Area fill */}
                  <path
                    d="M 40 180 Q 100 140, 160 160 T 280 110 T 400 130 T 520 70 L 580 85 L 580 210 L 40 210 Z"
                    fill="url(#gradient-without)"
                  />
                  {/* Line */}
                  <path
                    d="M 40 180 Q 100 140, 160 160 T 280 110 T 400 130 T 520 70 L 580 85"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Data points */}
                  <circle cx="160" cy="160" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="280" cy="110" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="400" cy="130" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="520" cy="70" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between text-xs text-slate-400 px-4 mt-2">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
                <span>Now</span>
              </div>
            </div>

            {/* Right Activity Stream (1 col) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">View All</span>
              </div>

              <div className="space-y-4 flex-1">
                {SHARED_ACTIVITY.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                        act.type === 'success'
                          ? 'bg-emerald-500 animate-pulse'
                          : act.type === 'warning'
                          ? 'bg-amber-500'
                          : act.type === 'danger'
                          ? 'bg-rose-500'
                          : 'bg-indigo-500'
                      }`}
                    ></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800">{act.title}</p>
                      <p className="text-[11px] text-slate-500">{act.detail}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Generic Full-Width Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">API Endpoints Telemetry</h2>
                <p className="text-xs text-slate-400 mt-0.5">Live response times and error rates across microservices</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="ALL">All Methods</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Endpoint Path</th>
                    <th className="px-6 py-3">Method</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Latency</th>
                    <th className="px-6 py-3">Traffic (RPM)</th>
                    <th className="px-6 py-3">Error Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((ep) => (
                    <tr key={ep.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-800">
                        {ep.path}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            ep.method === 'POST'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                            ep.status === 200
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              ep.status === 200 ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          ></span>
                          {ep.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-800 font-medium">
                        {ep.latency} ms
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {ep.rpm.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={ep.errorRate > 1 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                          {ep.errorRate.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Cluster Settings</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  P99 Alert Threshold (ms)
                </label>
                <input
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-700">
                P99 alerts will be delivered to the registered Slack webhook.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSaved(true);
                  setTimeout(() => {
                    setIsSaved(false);
                    setIsSettingsOpen(false);
                  }, 800);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
              >
                {isSaved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

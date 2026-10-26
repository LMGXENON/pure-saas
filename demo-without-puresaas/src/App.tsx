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
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface EndpointItem {
  id: string;
  path: string;
  method: 'GET' | 'POST';
  status: number;
  latency: number;
  p99: number;
  rpm: number;
  errorRate: number;
}

const SHARED_ENDPOINTS: EndpointItem[] = [
  { id: 'ep-1', path: '/api/v2/telemetry/ingest', method: 'POST', status: 200, latency: 42, p99: 88, rpm: 12450, errorRate: 0.08 },
  { id: 'ep-2', path: '/api/v1/stream/events', method: 'POST', status: 200, latency: 68, p99: 135, rpm: 8900, errorRate: 0.12 },
  { id: 'ep-3', path: '/api/v1/auth/session/verify', method: 'GET', status: 200, latency: 18, p99: 34, rpm: 4320, errorRate: 0.01 },
  { id: 'ep-4', path: '/api/v2/analytics/aggregate', method: 'GET', status: 200, latency: 194, p99: 412, rpm: 2150, errorRate: 0.84 },
  { id: 'ep-5', path: '/api/v2/metrics/query', method: 'POST', status: 504, latency: 512, p99: 1240, rpm: 840, errorRate: 4.25 },
  { id: 'ep-6', path: '/api/v1/healthcheck', method: 'GET', status: 200, latency: 6, p99: 12, rpm: 18200, errorRate: 0.00 }
];

const SHARED_ACTIVITY = [
  { id: 'act-1', type: 'success', title: 'Cluster eu-west-1 scaled up', detail: '+12 worker instances auto-provisioned to absorb telemetry surge', time: '2m ago' },
  { id: 'act-2', type: 'danger', title: '504 Gateway Timeout spike', detail: 'Endpoint /api/v2/metrics/query triggered P99 latency alert (>500ms)', time: '8m ago' },
  { id: 'act-3', type: 'warning', title: 'Synthetic probe jitter', detail: 'Edge node us-east-4 observed 14% packet jitter on TLS handshake', time: '24m ago' },
  { id: 'act-4', type: 'info', title: 'Schema migration v2.4 applied', detail: 'Telemetry partitioning table indices refreshed across 96 shards', time: '1h ago' }
];

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [timeRange, setTimeRange] = useState('24h');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [orgName, setOrgName] = useState('Acme Technologies Inc.');
  const [alertThreshold, setAlertThreshold] = useState('250');
  const [isSaved, setIsSaved] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointItem | null>(null);

  // Filtered endpoints
  const filtered = SHARED_ENDPOINTS.filter((ep) => {
    const matchesSearch = ep.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || ep.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      {/* 1. Standard Left Sidebar (256px dark sidebar, standard AI convention) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base mr-3 shadow-sm">
            P
          </div>
          <span className="font-semibold text-lg text-white">PulseMetrics</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveNav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === 'dashboard'
                ? 'bg-blue-600 text-white'
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
                ? 'bg-blue-600 text-white'
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
                ? 'bg-blue-600 text-white'
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
                ? 'bg-blue-600 text-white'
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
                ? 'bg-blue-600 text-white'
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
            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center font-semibold text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">admin@pulse.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search metrics, API paths, nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Baseline (Unguided AI)
            </span>

            {/* Notification Bell */}
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Configure</span>
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Analytics Overview
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Real-time cloud ingestion metrics and API telemetry across all clusters.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg px-3 py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">Last 1 Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              <button
                onClick={() => {}}
                className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-lg shadow-sm transition-colors"
                title="Refresh metrics"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Identical KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Ingested Events</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">48.2M</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+14.2%</span>
                  <span className="text-slate-400 font-normal">from last month</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Request Latency</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">142 ms</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>-8.4%</span>
                  <span className="text-slate-400 font-normal">faster than target</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Ingestion Nodes</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">84 / 96</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-600">
                  <span>87.5%</span>
                  <span className="text-slate-400 font-normal">cluster load</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Synthetic Error Rate</span>
                <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">0.42%</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-600">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+0.08%</span>
                  <span className="text-slate-400 font-normal">from yesterday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Chart & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Request Volume Analytics</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Ingested requests per minute over the last 24 hours</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Volume (req/s)
                  </span>
                </div>
              </div>

              {/* Standard SVG chart */}
              <div className="h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 240" fill="none">
                  <defs>
                    <linearGradient id="gradient-without-clean-app" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="30" x2="580" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
                  <line x1="40" y1="90" x2="580" y2="90" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
                  <line x1="40" y1="150" x2="580" y2="150" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
                  <line x1="40" y1="210" x2="580" y2="210" stroke="currentColor" strokeOpacity="0.15" />

                  <path
                    d="M 40 180 Q 100 140, 160 160 T 280 110 T 400 130 T 520 70 L 580 85 L 580 210 L 40 210 Z"
                    fill="url(#gradient-without-clean-app)"
                  />
                  <path
                    d="M 40 180 Q 100 140, 160 160 T 280 110 T 400 130 T 520 70 L 580 85"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="160" cy="160" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="280" cy="110" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="400" cy="130" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="520" cy="70" r="5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

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

            {/* Right Activity */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">View All</span>
              </div>

              <div className="space-y-4 flex-1">
                {SHARED_ACTIVITY.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        act.type === 'success'
                          ? 'bg-emerald-500'
                          : act.type === 'warning'
                          ? 'bg-amber-500'
                          : act.type === 'danger'
                          ? 'bg-rose-500'
                          : 'bg-blue-500'
                      }`}
                    ></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{act.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{act.detail}</p>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Full-Width Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">API Endpoints Telemetry</h2>
                <p className="text-xs text-slate-400 mt-0.5">Live response times and error rates across microservices</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-lg px-2.5 py-1.5 font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="ALL">All Methods</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase font-semibold text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3">Endpoint Path</th>
                    <th className="px-6 py-3">Method</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Latency</th>
                    <th className="px-6 py-3">Traffic (RPM)</th>
                    <th className="px-6 py-3">Error Rate</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filtered.map((ep) => (
                    <tr
                      key={ep.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedEndpoint(ep)}
                    >
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {ep.path}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                            ep.method === 'POST'
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                            ep.status === 200
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
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
                      <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium">
                        {ep.latency} ms
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {ep.rpm.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={ep.errorRate > 1 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-400'}>
                          {ep.errorRate.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEndpoint(ep);
                          }}
                          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Endpoint Details Modal */}
      {selectedEndpoint && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {selectedEndpoint.method}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  {selectedEndpoint.path}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-xs text-slate-400 block">P99 Latency</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedEndpoint.p99} ms</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-xs text-slate-400 block">Current RPM</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedEndpoint.rpm.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
                  Synthetic Health Check Status
                </span>
                <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
                  <span className={`w-2 h-2 rounded-full ${selectedEndpoint.status === 200 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  <span>HTTP {selectedEndpoint.status} &bull; Error Rate: {selectedEndpoint.errorRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cluster Settings</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  P99 Alert Threshold (ms)
                </label>
                <input
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300">
                P99 alerts will be delivered to the registered Slack webhook.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
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
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
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

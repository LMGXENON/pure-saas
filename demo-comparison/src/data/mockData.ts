export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  delta: string;
  isPositive: boolean;
  subtext: string;
}

export interface ChartDataPoint {
  time: string;
  requests: number;
  latencyMs: number;
  errors: number;
}

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'deploy' | 'security' | 'scale' | 'alert';
  actor: string;
}

export interface EndpointRow {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  latency: number;
  rpm: number;
  status: 'active' | 'degraded' | 'maintenance';
  uptimePercent: number;
}

export interface UserSettings {
  name: string;
  email: string;
  role: string;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
  dataRetentionDays: number;
  apiKeyPrefix: string;
}

export const SHARED_KPIS: KpiMetric[] = [
  {
    id: 'kpi-1',
    label: 'Total API Requests',
    value: '4,829,120',
    numericValue: 4829120,
    delta: '+12.4%',
    isPositive: true,
    subtext: 'vs previous 24 hours'
  },
  {
    id: 'kpi-2',
    label: 'P99 Latency',
    value: '18.2ms',
    numericValue: 18.2,
    delta: '-4.1ms',
    isPositive: true,
    subtext: 'sub-25ms SLA target'
  },
  {
    id: 'kpi-3',
    label: 'Error Rate',
    value: '0.041%',
    numericValue: 0.041,
    delta: '+0.002%',
    isPositive: false,
    subtext: '99.95% target SLA'
  },
  {
    id: 'kpi-4',
    label: 'Active Edge Nodes',
    value: '48 / 48',
    numericValue: 48,
    delta: '100%',
    isPositive: true,
    subtext: 'Global multi-region'
  }
];

export const SHARED_CHART_DATA: ChartDataPoint[] = [
  { time: '00:00', requests: 120400, latencyMs: 14.2, errors: 42 },
  { time: '03:00', requests: 98200, latencyMs: 12.8, errors: 28 },
  { time: '06:00', requests: 145800, latencyMs: 16.4, errors: 54 },
  { time: '09:00', requests: 284100, latencyMs: 22.1, errors: 112 },
  { time: '12:00', requests: 342900, latencyMs: 24.8, errors: 145 },
  { time: '15:00', requests: 389400, latencyMs: 21.2, errors: 130 },
  { time: '18:00', requests: 298700, latencyMs: 18.6, errors: 88 },
  { time: '21:00', requests: 214500, latencyMs: 15.9, errors: 61 }
];

export const SHARED_ACTIVITY_EVENTS: ActivityEvent[] = [
  {
    id: 'act-1',
    title: 'Edge Cluster Auto-Scaled',
    description: 'Added 4 worker nodes in us-east-1 during traffic spike.',
    timestamp: '12m ago',
    type: 'scale',
    actor: 'auto-scaler-daemon'
  },
  {
    id: 'act-2',
    title: 'Production SSL Key Rotated',
    description: 'Zero-downtime certificate renewal completed for *.api.pulsemeta.com.',
    timestamp: '48m ago',
    type: 'security',
    actor: 'vault-agent'
  },
  {
    id: 'act-3',
    title: 'Deployment v2.4.8 Promoted',
    description: 'Canary testing finished with 0 rollback triggers detected.',
    timestamp: '2h ago',
    type: 'deploy',
    actor: 'alex.chen@pulsemeta.com'
  },
  {
    id: 'act-4',
    title: 'Rate Limit Warning',
    description: 'Tenant org_enterprise_82 reached 85% of tier quota.',
    timestamp: '4h ago',
    type: 'alert',
    actor: 'rate-limiter'
  }
];

export const SHARED_ENDPOINTS: EndpointRow[] = [
  { id: 'ep-1', endpoint: '/api/v2/auth/verify', method: 'POST', latency: 8.4, rpm: 84200, status: 'active', uptimePercent: 99.99 },
  { id: 'ep-2', endpoint: '/api/v1/billing/checkout', method: 'POST', latency: 31.8, rpm: 14200, status: 'active', uptimePercent: 99.95 },
  { id: 'ep-3', endpoint: '/v3/vector/search', method: 'GET', latency: 68.2, rpm: 42100, status: 'degraded', uptimePercent: 98.84 },
  { id: 'ep-4', endpoint: '/stream/events', method: 'GET', latency: 4.1, rpm: 124800, status: 'active', uptimePercent: 100.0 },
  { id: 'ep-5', endpoint: '/telemetry/v1/metrics', method: 'POST', latency: 12.3, rpm: 98400, status: 'active', uptimePercent: 99.98 },
  { id: 'ep-6', endpoint: '/v2/tenants/sync', method: 'PUT', latency: 45.6, rpm: 6200, status: 'maintenance', uptimePercent: 99.40 }
];

export const SHARED_USER_SETTINGS: UserSettings = {
  name: 'Alex Chen',
  email: 'alex.chen@pulsemeta.com',
  role: 'Principal Infrastructure Engineer',
  notificationsEnabled: true,
  twoFactorEnabled: true,
  dataRetentionDays: 90,
  apiKeyPrefix: 'pk_live_9482b8f'
};

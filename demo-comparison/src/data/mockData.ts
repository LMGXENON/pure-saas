export interface EndpointItem {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: number;
  latency: number;
  p99: number;
  rpm: number;
  errorRate: number;
  waterfall: { dns: number; tls: number; origin: number; transfer: number };
}

export const SHARED_ENDPOINTS: EndpointItem[] = [
  {
    id: 'ep-1',
    path: '/api/v2/telemetry/ingest',
    method: 'POST',
    status: 200,
    latency: 42,
    p99: 88,
    rpm: 12450,
    errorRate: 0.08,
    waterfall: { dns: 2, tls: 8, origin: 26, transfer: 6 }
  },
  {
    id: 'ep-2',
    path: '/api/v1/stream/events',
    method: 'POST',
    status: 200,
    latency: 68,
    p99: 142,
    rpm: 8900,
    errorRate: 0.12,
    waterfall: { dns: 3, tls: 11, origin: 44, transfer: 10 }
  },
  {
    id: 'ep-3',
    path: '/api/v1/auth/session/verify',
    method: 'GET',
    status: 200,
    latency: 18,
    p99: 34,
    rpm: 4320,
    errorRate: 0.01,
    waterfall: { dns: 1, tls: 4, origin: 11, transfer: 2 }
  },
  {
    id: 'ep-4',
    path: '/api/v2/analytics/aggregate',
    method: 'GET',
    status: 200,
    latency: 194,
    p99: 380,
    rpm: 2150,
    errorRate: 0.84,
    waterfall: { dns: 4, tls: 14, origin: 154, transfer: 22 }
  },
  {
    id: 'ep-5',
    path: '/api/v2/metrics/query',
    method: 'POST',
    status: 504,
    latency: 512,
    p99: 980,
    rpm: 840,
    errorRate: 4.25,
    waterfall: { dns: 5, tls: 18, origin: 465, transfer: 24 }
  },
  {
    id: 'ep-6',
    path: '/api/v1/healthcheck',
    method: 'GET',
    status: 200,
    latency: 6,
    p99: 12,
    rpm: 18200,
    errorRate: 0.00,
    waterfall: { dns: 1, tls: 2, origin: 2, transfer: 1 }
  },
];

export const SHARED_TIME_SERIES = [
  { time: '00:00', rps: 1840, latency: 44 },
  { time: '03:00', rps: 1420, latency: 39 },
  { time: '06:00', rps: 2150, latency: 48 },
  { time: '09:00', rps: 2890, latency: 62 },
  { time: '12:00', rps: 3420, latency: 74 },
  { time: '15:00', rps: 3180, latency: 68 },
  { time: '18:00', rps: 2740, latency: 54 },
  { time: '21:00', rps: 2290, latency: 46 },
  { time: 'Now',   rps: 2640, latency: 49 },
];

export const SHARED_ACTIVITY = [
  {
    id: 'act-1',
    title: 'Cluster scale-up completed',
    detail: 'Added 4 worker nodes to us-east pool',
    time: '3 mins ago',
    type: 'success'
  },
  {
    id: 'act-2',
    title: 'High latency detected',
    detail: '/api/v2/metrics/query exceeded 500ms',
    time: '18 mins ago',
    type: 'warning'
  },
  {
    id: 'act-3',
    title: 'Automated snapshot created',
    detail: 'Daily telemetry ledger backup finished',
    time: '42 mins ago',
    type: 'info'
  },
  {
    id: 'act-4',
    title: 'Rate limit triggered',
    detail: 'Token 8f2b.. blocked for 429 flood',
    time: '1 hour ago',
    type: 'danger'
  }
];

export const SHARED_REGIONS = [
  { region: 'us-east-1', nodes: 32, latency: 14, status: 'healthy' },
  { region: 'eu-central-1', nodes: 28, latency: 48, status: 'healthy' },
  { region: 'ap-northeast-1', nodes: 24, latency: 112, status: 'warning' }
];


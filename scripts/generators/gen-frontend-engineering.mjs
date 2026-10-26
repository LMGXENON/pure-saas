import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/frontend-engineering');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const guides = [
  {
    name: 'react-compound-components.md',
    title: 'Compound Component Architecture in React',
    overview: 'Compound components share implicit state and coordinate complex UI trees via React Context, providing flexible JSX composition without prop-drilling.',
    aspects: [
      { key: 'Context Boundary', detail: 'Encapsulates shared active states, change handlers, and unique IDs' },
      { key: 'Child Primitives', detail: 'Subcomponents (<Select.Trigger>, <Select.Content>, <Select.Item>) cleanly separate roles' },
      { key: 'Dev Diagnostics', detail: 'Throw informative errors if a compound subcomponent is rendered outside its parent provider' }
    ],
    codeSnippet: `import React, { createContext, useContext, useState } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be rendered inside <Tabs>');
  return ctx;
}

export function Tabs({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.Trigger = function TabTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={\`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors \${isActive ? 'bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}\`}
    >
      {children}
    </button>
  );
};

Tabs.Content = function TabContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return <div role="tabpanel" className="mt-4">{children}</div>;
};`,
    dos: [
      'Use compound components for multi-part widgets (Tabs, Accordions, Dialogs, Menus).',
      'Provide clear TypeScript typing on the master container object.'
    ],
    donts: [
      'Do not force consumers to pass indices manually when string keys or automatic registration can be used.'
    ],
    accessibility: [
      'Wire up ARIA roles (role="tablist", role="tab", role="tabpanel") within the compound hierarchy.'
    ]
  },
  {
    name: 'headless-primitive-patterns.md',
    title: 'Headless UI Primitives & Separation of Concerns',
    overview: 'Separating behavioral state, keyboard interactions, and ARIA attributes from visual styling produces robust, 100% themeable components.',
    aspects: [
      { key: 'Radix / Ark / React Aria', detail: 'Adopt proven headless primitives for difficult accessibility patterns' },
      { key: 'Unstyled Logic', detail: 'Zero default CSS opinions; full freedom to apply Pure SaaS design tokens' },
      { key: 'Composability', detail: 'Supports custom animations, micro-interactions, and frameworks seamlessly' }
    ],
    codeSnippet: `// Example integrating Radix UI Dialog primitive with Pure SaaS tokens
import * as DialogPrimitive from '@radix-ui/react-dialog';

export function AccessibleDialog({ trigger, title, children }: { trigger: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-2xl">
          <DialogPrimitive.Title className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</DialogPrimitive.Title>
          <div className="mt-4">{children}</div>
          <DialogPrimitive.Close className="absolute top-4 right-4 p-1 rounded-md text-[var(--color-text-muted)] hover:text-white">✕</DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}`,
    dos: [
      'Use headless primitives when building accessible dialogs, comboboxes, and popovers.',
      'Apply tokenized utility classes onto primitive slots.'
    ],
    donts: [
      'Never attempt to rewrite full ARIA combobox state machines from scratch without thorough testing.'
    ],
    accessibility: [
      'Headless primitives handle focus traps, aria attributes, and keyboard listeners out of the box.'
    ]
  },
  {
    name: 'render-performance-optimization.md',
    title: 'React Render Performance & Re-render Optimization',
    overview: 'High-frequency UI updates (e.g. typing, slider dragging, live metrics) must not trigger catastrophic whole-tree re-renders.',
    aspects: [
      { key: 'State Colocation', detail: 'Push state down to the lowest possible node that consumes it' },
      { key: 'Fast Context Splitting', detail: 'Separate rarely changing state from high-frequency dispatch' },
      { key: 'Memo Boundaries', detail: 'Use React.memo with custom comparison functions on expensive table rows and chart canvases' }
    ],
    codeSnippet: `// Separate dispatch from state to prevent consumer re-renders
const CounterContext = createContext<number>(0);
const CounterDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const CounterConsumer = React.memo(() => {
  const count = useContext(CounterContext);
  return <span>{count}</span>;
});`,
    dos: [
      'Colocate state to local component subtrees whenever possible.',
      'Profile renders with React DevTools Profiler to catch cascading re-renders.'
    ],
    donts: [
      'Never put raw mousemove or scroll event coordinates into top-level page state.'
    ],
    accessibility: [
      'Ensure performance optimizations do not bypass required live-region text updates.'
    ]
  },
  {
    name: 'dom-size-virtualization.md',
    title: 'DOM Size Optimization & Large List Virtualization',
    overview: 'Rendering thousands of DOM elements causes high memory consumption and unresponsive scroll frames. Virtualization renders strictly the visible window.',
    aspects: [
      { key: 'Virtual Windowing', detail: 'Only mount elements currently inside the scroll viewport plus an overscan buffer' },
      { key: 'Dynamic Heights', detail: 'Measure and cache variable row dimensions on the fly' },
      { key: 'DOM Budget', detail: 'Keep total document DOM nodes under 1,500 for 60fps performance' }
    ],
    codeSnippet: `// Conceptual virtualization pattern
const totalRows = 10000;
const rowHeight = 40;
const visibleCount = Math.ceil(containerHeight / rowHeight);
const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2); // 2 overscan
const endIndex = Math.min(totalRows, startIndex + visibleCount + 4);

const visibleItems = items.slice(startIndex, endIndex);
const offsetY = startIndex * rowHeight;`,
    dos: [
      'Virtualize data tables, logs, and feeds with more than 100 items.',
      'Maintain an overscan buffer (2-4 items) for smooth keyboard scrolling.'
    ],
    donts: [
      'Never render 10,000 raw DOM nodes directly in the browser.'
    ],
    accessibility: [
      'Include aria-rowcount and aria-rowindex so screen readers report correct list position.'
    ]
  },
  {
    name: 'css-architecture-token-layering.md',
    title: 'CSS Architecture, Cascade Layers (@layer) & Token Scoping',
    overview: 'Modern CSS uses `@layer` to declare explicit cascade precedence, ending specificity wars and eliminating `!important` overrides.',
    aspects: [
      { key: 'Layer Order', detail: '@layer reset, tokens, base, components, utilities;' },
      { key: 'Scoped Variables', detail: 'Defining component-level custom properties that inherit from global tokens' },
      { key: 'Predictable Overrides', detail: 'Utilities in the utilities layer always supersede component styles' }
    ],
    codeSnippet: `@layer reset, tokens, base, components, utilities;

@layer tokens {
  :root {
    --color-surface-base: #ffffff;
    --color-accent: #2563eb;
  }
}

@layer components {
  .btn {
    background-color: var(--color-accent);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
}

@layer utilities {
  .p-0 { padding: 0 !important; }
}`,
    dos: [
      'Organize global stylesheets with explicit @layer ordering.',
      'Keep component classes free of hardcoded !important.'
    ],
    donts: [
      'Avoid high-specificity ID selectors (#main-nav .menu-item.active).'
    ],
    accessibility: [
      'Ensure high-contrast mode media queries properly override component styling layers.'
    ]
  },
  {
    name: 'server-client-boundary-patterns.md',
    title: 'React Server Components (RSC) & Client Boundaries',
    overview: 'Next.js and modern React frameworks split applications into Server Components (zero JS bundle) and Client Components (`"use client"` for interactivity).',
    aspects: [
      { key: 'Push Boundaries Down', detail: 'Keep parent layouts and data wrappers as Server Components; isolate client interactivity to leaf buttons' },
      { key: 'Serializable Props', detail: 'Pass only JSON-serializable primitives and objects across the server-client boundary' },
      { key: 'Zero-Bundle Icons', detail: 'Render SVG icons on the server to keep client JS bundles lightweight' }
    ],
    codeSnippet: `// Server Component (Default in Next.js App Router)
import { ClientInteractiveButton } from './ClientButton';

export default async function DashboardPage() {
  const data = await fetchMetrics(); // Direct DB or server fetch

  return (
    <div className="p-8">
      <h1>Production Metrics</h1>
      <StaticMetricsDisplay data={data} />
      <ClientInteractiveButton id={data.id} />
    </div>
  );
}`,
    dos: [
      'Mark only interactive leaf components with `"use client"`.',
      'Fetch data directly on the server to reduce client-side waterfall latency.'
    ],
    donts: [
      'Never put `"use client"` at the top of the root layout file.'
    ],
    accessibility: [
      'Ensure server-rendered HTML contains full semantic markup and ARIA landmarks before JS hydration.'
    ]
  },
  {
    name: 'state-machine-ui-modeling.md',
    title: 'Finite State Machines for Complex UI Flows',
    overview: 'Modeling complex interfaces with finite state machines (e.g. XState) mathematically eliminates impossible states and race conditions.',
    aspects: [
      { key: 'Explicit States', detail: 'idle, loading, success, error — only one can be active at any given moment' },
      { key: 'Deterministic Transitions', detail: 'State changes occur strictly in response to defined events' },
      { key: 'Guards & Actions', detail: 'Validate conditions before permitting transition to the next state' }
    ],
    codeSnippet: `type State = 'idle' | 'loading' | 'success' | 'error';
type Event = { type: 'SUBMIT' } | { type: 'RESOLVE' } | { type: 'REJECT'; error: string };

function formReducer(state: { status: State; error?: string }, event: Event) {
  switch (state.status) {
    case 'idle':
      if (event.type === 'SUBMIT') return { status: 'loading' as const };
      break;
    case 'loading':
      if (event.type === 'RESOLVE') return { status: 'success' as const };
      if (event.type === 'REJECT') return { status: 'error' as const, error: event.error };
      break;
    case 'error':
      if (event.type === 'SUBMIT') return { status: 'loading' as const };
      break;
  }
  return state;
}`,
    dos: [
      'Use state machines for authentication wizards, payment flows, and media players.',
      'Eliminate boolean flag explosions (isLoading && isError && isRetrying).'
    ],
    donts: [
      'Do not rely on disjointed, uncoordinated useState hooks for multi-step transactional flows.'
    ],
    accessibility: [
      'Announce state transitions to screen readers automatically.'
    ]
  },
  {
    name: 'data-fetching-cache-invalidation.md',
    title: 'Data Fetching, Cache Invalidation & Stale-While-Revalidate',
    overview: 'Using TanStack Query or SWR provides instantaneous background synchronization, automatic deduplication, and cache invalidation.',
    aspects: [
      { key: 'Stale-While-Revalidate', detail: 'Display cached data immediately while fetching fresh data in the background' },
      { key: 'Targeted Invalidation', detail: 'Invalidate exact query keys upon mutation completion' },
      { key: 'Window Focus Refetch', detail: 'Silently refresh stale data when user tabs back into the application' }
    ],
    codeSnippet: `// TanStack Query mutation with targeted invalidation
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateProfile,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    toast.success("Profile updated");
  }
});`,
    dos: [
      'Structure hierarchical query keys: `[\'projects\', projectId, \'comments\']`.',
      'Provide optimistic updates for instant UI response.'
    ],
    donts: [
      'Never trigger a full page reload just to refresh a modified table record.'
    ],
    accessibility: [
      'Prevent background data refetches from stealing keyboard focus.'
    ]
  },
  {
    name: 'error-boundary-fallbacks.md',
    title: 'Error Boundaries & Graceful Degradation',
    overview: 'Component error boundaries prevent a single runtime JavaScript exception from crashing the entire application window.',
    aspects: [
      { key: 'Granular Boundaries', detail: 'Wrap independent widgets, charts, and feeds in local error boundaries' },
      { key: 'Actionable Fallbacks', detail: 'Display an inline "Retry" button rather than a blank white screen' },
      { key: 'Telemetry Reporting', detail: 'Silently log stack traces to error monitoring services (Sentry/Datadog)' }
    ],
    codeSnippet: `import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallbackTitle?: string; }
interface State { hasError: boolean; }

export class ComponentErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UI Exception caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-xl border border-[var(--color-danger-subtle)] bg-[var(--color-surface-base)] text-center">
          <p className="text-xs font-semibold text-[var(--color-danger-text)]">Unable to load component</p>
          <button onClick={() => this.setState({ hasError: false })} className="mt-3 text-xs underline text-[var(--color-text-secondary)]">Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}`,
    dos: [
      'Isolate third-party embeds (analytics charts, maps) within dedicated error boundaries.',
      'Provide a user-facing retry action.'
    ],
    donts: [
      'Never let an unhandled render error trigger a full blank white screen.'
    ],
    accessibility: [
      'Announce error states to screen readers using role="alert".'
    ]
  },
  {
    name: 'reusable-hooks-patterns.md',
    title: 'Custom React Hooks for UI Primitives',
    overview: 'Custom hooks package browser event listeners, media queries, and lifecycle behaviors into reusable functional primitives.',
    aspects: [
      { key: 'useMediaQuery', detail: 'Listens to responsive CSS media queries cleanly with cleanup' },
      { key: 'useClickOutside', detail: 'Detects pointer events outside a referenced element for modal dismissal' },
      { key: 'useDebounce', detail: 'Delays state updates until input stabilizes' }
    ],
    codeSnippet: `// useMediaQuery hook
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}`,
    dos: [
      'Always remove event listeners in the hook cleanup return function.',
      'Keep hook dependencies strictly declared in useEffect dependency arrays.'
    ],
    donts: [
      'Do not call hooks conditionally or within loops.'
    ],
    accessibility: [
      'Support window.matchMedia("(prefers-reduced-motion: reduce)") hook for adaptive animation.'
    ]
  },
  {
    name: 'animation-frame-scheduling.md',
    title: 'requestAnimationFrame Scheduling & Scroll Performance',
    overview: 'High-frequency events like window scroll, resize, and mouse tracking must be scheduled via `requestAnimationFrame` to avoid main-thread jank.',
    aspects: [
      { key: 'rAF Throttling', detail: 'Throttle DOM updates to hardware refresh rate (60Hz / 120Hz)' },
      { key: 'Passive Event Listeners', detail: 'Add `{ passive: true }` to scroll/touch listeners for instantaneous scrolling' },
      { key: 'Transform Only', detail: 'Mutate GPU-accelerated CSS properties (`transform`, `opacity`)' }
    ],
    codeSnippet: `// rAF scroll listener throttling pattern
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallaxPosition(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });`,
    dos: [
      'Use passive listeners on all scroll and touchmove events.',
      'Cancel pending animation frames on component unmount.'
    ],
    donts: [
      'Never trigger layout thrashing (e.g. reading offsetHeight and immediately writing style.height) inside a loop.'
    ],
    accessibility: [
      'Respect reduced-motion preferences by disabling scroll-based transformations.'
    ]
  },
  {
    name: 'web-vitals-inp-cls-lcp.md',
    title: 'Core Web Vitals Optimization (INP, CLS, LCP)',
    overview: 'Google Core Web Vitals directly measure user experience: Interaction to Next Paint (INP < 200ms), Cumulative Layout Shift (CLS < 0.1), and Largest Contentful Paint (LCP < 2.5s).',
    aspects: [
      { key: 'INP (<200ms)', detail: 'Yield to main thread using setTimeout or scheduler.yield() during heavy computation' },
      { key: 'CLS (<0.1)', detail: 'Set explicit aspect-ratio and width/height on all images, videos, and dynamic ads' },
      { key: 'LCP (<2.5s)', detail: 'Preload hero images with fetchpriority="high", avoid blocking JavaScript in <head>' }
    ],
    codeSnippet: `<!-- Zero-CLS image markup with high LCP priority -->
<img
  src="/hero-product.avif"
  alt="Pure SaaS Dashboard Preview"
  width="1200"
  height="675"
  fetchpriority="high"
  decoding="async"
  class="aspect-[16/9] w-full rounded-2xl object-cover"
/>`,
    dos: [
      'Assign explicit width and height attributes to every image and video element.',
      'Use `font-display: swap` or `font-display: optional` to eliminate layout shifts on web font load.'
    ],
    donts: [
      'Never dynamically inject banners above existing content without reserving height.'
    ],
    accessibility: [
      'Fast-loading accessible HTML ensures immediate availability for screen readers.'
    ]
  }
];

let created = 0;
for (const g of guides) {
  const filePath = path.join(targetDir, g.name);
  let content = `# ${g.title}\n\n`;
  content += `${g.overview}\n\n---\n\n`;
  content += `## 1. Architectural Principles & Mechanisms\n\n`;
  content += `| Principle / Pattern | Concrete Implementation Detail |\n`;
  content += `| :--- | :--- |\n`;
  for (const a of g.aspects) {
    content += `| **${a.key}** | ${a.detail} |\n`;
  }
  content += `\n---\n\n## 2. Code Implementation Reference\n\n`;
  content += `\`\`\`tsx\n${g.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(g.dos.length, g.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const d = g.dos[i] || '';
    const dn = g.donts[i] || '';
    content += `| ${d} | ${dn} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Performance Verification\n\n`;
  for (const a of g.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.\n`;
  content += `- Ensure component boundaries remain maintainable and strictly typed.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} frontend engineering references in references/frontend-engineering/`);

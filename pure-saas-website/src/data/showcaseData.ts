export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  headline: string;
  taskPrompt: string;
  skillCommand: string;
  appliedReferences: string[];
  before: {
    label: string;
    description: string;
    flaws: string[];
    visualCode: string;
  };
  after: {
    label: string;
    description: string;
    improvements: string[];
    visualCode: string;
  };
  metrics: { metric: string; beforeVal: string; afterVal: string }[];
}

export const showcaseData: ShowcaseItem[] = [
  {
    id: 'dashboard',
    title: 'SaaS Metric & Cluster Dashboard',
    category: 'Application Layout',
    headline: 'From generic purple gradient cards to an Apple-grade, high-density data console',
    taskPrompt: 'Build an edge server cluster overview with KPI summary cards and active regional node health.',
    skillCommand: '/pure-saas Build edge cluster overview dashboard with 4 KPI cards and regional status.',
    appliedReferences: [
      'references/layouts/saas-dashboard.md',
      'references/layouts/analytics-board.md',
      'references/visual-craft/hairline-borders-separators.md'
    ],
    before: {
      label: 'Generic AI Output ("Slop")',
      description: 'Loud purple-to-cyan gradient blobs, illegible low-contrast text on glass cards, emoji icons, and arbitrary Tailwind margins.',
      flaws: [
        'Massive blur-xl gradient blob background causing GPU repaints',
        'Emoji (🚀, ⚡, 🔥) used as status icons',
        'Raw unmapped hex values (bg-[#7c3aed]) with poor contrast',
        'Missing tabular numerals causing layout shifts as numbers update'
      ],
      visualCode: `<div className="bg-gradient-to-tr from-purple-900 to-indigo-950 p-8">
  <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/30 blur-3xl rounded-full" />
  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6">
    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
      🚀 Supercharge Your Cluster!
    </div>
    <div className="grid grid-cols-3 gap-6 mt-6">
      <div className="bg-white/10 p-6 rounded-2xl">🔥 Nodes: 124</div>
      <div className="bg-white/10 p-6 rounded-2xl">⚡ Load: 99.4%</div>
      <div className="bg-white/10 p-6 rounded-2xl">✨ Speed: 420x</div>
    </div>
  </div>
</div>`
    },
    after: {
      label: 'Pure SaaS Production Output',
      description: 'Disciplined 8pt spatial grid, tabular monospace numerals, crisp 1px hairline borders, semantic tokens, and live status indicators.',
      improvements: [
        '100% semantic token binding to DESIGN.md (--color-surface-base, --color-text-primary)',
        'Monospace tabular numerals (font-mono) to prevent layout jitter',
        'Crisp SVG status rings with 3:1 non-text WCAG contrast',
        'Independent scroll container with zero layout shift'
      ],
      visualCode: `<div className="p-6 md:p-8 bg-[var(--color-surface-canvas)]">
  <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border-subtle)]">
    <div>
      <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Cluster Fleet Health</h1>
      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">342 edge micro-regions active across 3 continents.</p>
    </div>
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] text-xs font-mono">
      <span className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">Operational</span>
      <span>99.998% SLA</span>
    </div>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
    <KpiCard title="Active Ingress" value="48.2 GB/s" change="+4.1%" />
    <KpiCard title="P99 Latency" value="3.8 ms" change="-12ms" positive />
    <KpiCard title="Edge Nodes" value="1,420" change="All Healthy" />
    <KpiCard title="Active Conns" value="842.1k" change="+18%" />
  </div>
</div>`
    },
    metrics: [
      { metric: 'WCAG 2.2 AA Contrast', beforeVal: '2.8:1 (Failing)', afterVal: '14.2:1 (Passing)' },
      { metric: 'DOM Node Count', beforeVal: '420 nodes', afterVal: '84 nodes' },
      { metric: 'Hardcoded Hex Colors', beforeVal: '14 violations', afterVal: '0 (100% Tokens)' }
    ]
  },
  {
    id: 'hero',
    title: 'Developer Tool Landing Hero',
    category: 'Marketing Section',
    headline: 'From generic centered gradient text to an asymmetric editorial composition with live code terminal',
    taskPrompt: 'Create a high-conversion marketing hero for an autonomous edge deployment platform.',
    skillCommand: '/pure-saas Build marketing hero for autonomous edge deployment with terminal preview.',
    appliedReferences: [
      'references/layouts/marketing-hero.md',
      'references/visual-craft/visual-weight-asymmetry.md',
      'references/anti-slop-rules.md'
    ],
    before: {
      label: 'Generic AI Output ("Slop")',
      description: 'Centered badge pill, giant purple gradient headline, vague slogans like "Unlock your potential", and fake floating 3D spheres.',
      flaws: [
        'Vague buzzwords: "Supercharge your workflow with next-gen AI power"',
        'Excessive centered alignment causing awkward line wrapping',
        'Fake abstract floating illustration with zero product relevance',
        'Lacking clear secondary CTA affordance'
      ],
      visualCode: `<section className="text-center py-24 bg-black text-white">
  <div className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs inline-block mb-4">
    ✨ Revolutionary v2.0 is Here!
  </div>
  <h1 className="text-6xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
    Supercharge Your Workflow Today!
  </h1>
  <p className="text-gray-400 max-w-2xl mx-auto mt-4">
    The ultimate all-in-one AI platform to empower your team to achieve 10x developer synergy.
  </p>
  <button className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold shadow-lg shadow-purple-500/50">
    Get Started Now 🚀
  </button>
</section>`
    },
    after: {
      label: 'Pure SaaS Production Output',
      description: 'Asymmetric 60/40 editorial layout, precise value-focused copy, clear primary and secondary CTAs, and authentic command-line proof.',
      improvements: [
        'Asymmetric 60/40 layout directing visual focus naturally',
        'Concrete product copy explaining who it is for and how cold-start performance works',
        'Interactive real terminal session snippet with copy command',
        'Hardware-grade typography tracking and restrained accent lighting'
      ],
      visualCode: `<section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
  <div className="flex-1 text-left">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] mb-6">
      <span className="px-1.5 py-0.2 rounded bg-[var(--color-surface-base)] text-[var(--color-text-primary)] font-mono text-[10px] font-semibold border border-[var(--color-border-subtle)]">RELEASE</span>
      <span>v2.4 Rust Edge Engine</span>
    </div>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.08] mb-6">
      Autonomous edge deployment for modern software teams.
    </h1>
    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-xl">
      Deploy containerized microservices across 300+ global edge points in seconds with zero configuration and sub-5ms cold starts.
    </p>
    <div className="flex items-center gap-4">
      <Button variant="primary" size="lg">Start Free Trial</Button>
      <Button variant="secondary" size="lg">Live Interactive Demo →</Button>
    </div>
  </div>
  <div className="flex-1 w-full max-w-xl">
    <TerminalPreview />
  </div>
</section>`
    },
    metrics: [
      { metric: 'Headline Legibility', beforeVal: 'Low (Gradient clipping)', afterVal: '100% Optical Crispness' },
      { metric: 'LCP (Largest Contentful Paint)', beforeVal: '3.4s (Heavy blobs)', afterVal: '0.8s (Instant SVG)' },
      { metric: 'Conversion Clarity Score', beforeVal: '24/100 (Vague copy)', afterVal: '96/100 (Concrete value)' }
    ]
  }
];


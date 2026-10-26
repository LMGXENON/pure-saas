import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/layouts');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const layouts = [
  {
    name: 'marketing-hero.md',
    title: 'Marketing Hero Section Composition & Hierarchy',
    overview: 'The hero section establishes immediate value proposition, brand identity, and the primary call-to-action. Pure SaaS rejects generic centered gradient blur heroes in favor of asymmetrical editorial compositions, product-led visual anchors, and crisp typography.',
    structure: [
      { section: 'Eyebrow / Badge', role: 'Contextual announcement or product category', token: 'var(--color-text-accent)' },
      { section: 'Primary Headline', role: 'Concise value statement (32-56px fluid type)', token: 'var(--color-text-primary)' },
      { section: 'Subheadline', role: 'Clear explanation of who it is for and how it works', token: 'var(--color-text-secondary)' },
      { section: 'Action Group', role: 'Primary CTA button + secondary link or social proof', token: 'var(--color-accent-primary)' },
      { section: 'Visual Anchor', role: 'Real interactive preview, high-res UI snapshot, or code block', token: 'var(--color-surface-base)' }
    ],
    codeSnippet: `<section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
  <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span>v2.4 Released with Rust Engine</span>
    </div>
    
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.08] mb-6">
      Autonomous edge deployment for modern software teams.
    </h1>
    
    <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-xl">
      Deploy containerized microservices across 300+ edge locations in seconds with zero configuration and sub-5ms cold starts.
    </p>

    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
      <button className="h-12 px-6 rounded-xl bg-[var(--color-accent-primary)] text-white font-medium hover:opacity-90 transition-all shadow-md">
        Start Free Trial
      </button>
      <button className="h-12 px-6 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-hover)] transition-all">
        View Live Demo →
      </button>
    </div>
    
    <div className="mt-8 flex items-center gap-6 text-xs text-[var(--color-text-muted)]">
      <span>✓ No credit card required</span>
      <span>✓ 99.99% uptime SLA</span>
    </div>
  </div>

  <div className="flex-1 w-full max-w-xl rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] shadow-2xl p-6 overflow-hidden">
    <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)] mb-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-neutral-700" />
        <span className="w-3 h-3 rounded-full bg-neutral-700" />
        <span className="w-3 h-3 rounded-full bg-neutral-700" />
      </div>
      <span className="text-xs font-mono text-[var(--color-text-muted)]">terminal.edge.sh</span>
    </div>
    <pre className="text-xs font-mono text-[var(--color-text-secondary)] leading-relaxed">
      <code>$ curl -sSL https://edge.sh/install | bash<br/>$ edge deploy --region=iad,fra,hkg<br/><span className="text-emerald-400">✔ Deployed in 842ms across 3 clusters</span></code>
    </pre>
  </div>
</section>`,
    dos: [
      'Use left-aligned or asymmetric 60/40 layouts for high-conversion technical products.',
      'Show the actual software product in action within the visual anchor.',
      'Ensure primary CTA has unmistakable visual weight.'
    ],
    donts: [
      'Avoid massive purple-to-cyan gradient blobs behind centered headings.',
      'Never use generic slogans like "Supercharge your productivity".'
    ],
    accessibility: [
      'Semantic <h1> on hero headline.',
      'Contrast ratio of at least 4.5:1 on subheadline and button text.'
    ]
  },
  {
    name: 'saas-landing.md',
    title: 'SaaS Marketing Landing Page Blueprint',
    overview: 'A complete SaaS landing page guides potential customers from initial interest through proof, feature discovery, pricing, and onboarding conversion.',
    structure: [
      { section: '1. Navigation Header', role: 'Brand logo, 3-5 core links, Sign In, Primary CTA', token: 'var(--color-surface-base)' },
      { section: '2. Hero Section', role: 'Value proposition + primary CTA + visual product proof', token: 'var(--color-surface-base)' },
      { section: '3. Social Proof Strip', role: 'Monochrome customer logos and key enterprise metrics', token: 'var(--color-surface-muted)' },
      { section: '4. Deep Dive Features', role: 'Alternating 2-column feature blocks with real screenshots', token: 'var(--color-surface-base)' },
      { section: '5. Interactive Playground', role: 'Live preview or interactive demo component', token: 'var(--color-surface-elevated)' },
      { section: '6. Pricing Tiers', role: 'Transparent monthly/annual comparison matrix', token: 'var(--color-surface-base)' },
      { section: '7. FAQ Accordion', role: 'Addressing real objections and security questions', token: 'var(--color-surface-base)' },
      { section: '8. Final Conversion CTA', role: 'High-contrast closing block + persistent footer', token: 'var(--color-surface-overlay)' }
    ],
    codeSnippet: `export const LandingPage = () => (
  <div className="min-h-screen bg-[var(--color-surface-canvas)] text-[var(--color-text-primary)]">
    <TopNav />
    <main>
      <HeroSection />
      <LogoCloud />
      <FeatureSection />
      <DemoPlayground />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);`,
    dos: [
      'Follow the proven 8-stage technical SaaS landing sequence.',
      'Keep logo clouds monochromatic to avoid color noise.',
      'Provide direct pricing clarity without forced sales calls for standard tiers.'
    ],
    donts: [
      'Do not scatter arbitrary decorative badges across every single section.',
      'Avoid repetitive 3-column card grids repeated consecutively.'
    ],
    accessibility: [
      'Proper document landmark structure: <header>, <main>, <footer> with sequential <section> headers.'
    ]
  },
  {
    name: 'saas-dashboard.md',
    title: 'SaaS App Dashboard Shell & Grid Layout',
    overview: 'The dashboard shell provides the persistent frame for productivity applications: side navigation, global header bar, and flexible content workspace.',
    structure: [
      { section: 'Persistent Sidebar', role: 'Workspace switcher, main navigation, account footer', token: 'w-64 border-r' },
      { section: 'Global Header', role: 'Breadcrumbs, search trigger (Cmd+K), notification center', token: 'h-14 border-b' },
      { section: 'Main Stage', role: 'Responsive multi-column grid with auto-fitting widgets', token: 'flex-1 overflow-y-auto' }
    ],
    codeSnippet: `<div className="flex h-screen bg-[var(--color-surface-canvas)] overflow-hidden">
  <aside className="w-64 shrink-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-base)]">
    <SidebarContent />
  </aside>
  <div className="flex-1 flex flex-col min-w-0">
    <header className="h-14 shrink-0 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] px-6 flex items-center justify-between">
      <HeaderControls />
    </header>
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <MetricCardsRow />
        <MainChartGrid />
        <RecentActivityTable />
      </div>
    </main>
  </div>
</div>`,
    dos: [
      'Prevent horizontal body scrolling when sidebar is open.',
      'Ensure content stage can scroll independently of sidebar and header.'
    ],
    donts: [
      'Never hardcode fixed pixel widths that break tablet or split-screen views.'
    ],
    accessibility: [
      'Ensure skip-link bypasses sidebar directly to main stage.'
    ]
  },
  {
    name: 'analytics-board.md',
    title: 'Analytics & KPI Dashboard Grid',
    overview: 'Analytics boards present high-density metrics, trend lines, and data comparisons. They demand clear visual hierarchy and consistent card padding.',
    structure: [
      { section: 'Metric Summary Cards', role: '3-4 top KPI cards displaying total, delta %, and mini sparkline', token: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' },
      { section: 'Primary Chart Canvas', role: 'Main timeline area chart (aspect-ratio 16/7 or fixed 380px)', token: 'col-span-12 lg:col-span-8' },
      { section: 'Distribution Breakdown', role: 'Donut chart or bar distribution breakdown', token: 'col-span-12 lg:col-span-4' }
    ],
    codeSnippet: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
    <span className="text-xs text-[var(--color-text-secondary)]">Total ARR</span>
    <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] mt-1">$2.48M</div>
    <div className="text-xs text-emerald-500 mt-2 flex items-center gap-1">↑ 18.2% vs last month</div>
  </div>
</div>`,
    dos: [
      'Use tabular numbers (`font-mono` or `font-feature-settings: "tnum"`) for KPI values.',
      'Show positive/negative delta indicators with both color and directional glyphs.'
    ],
    donts: [
      'Do not use misleading zero-suppressed chart axes that exaggerate small fluctuations.'
    ],
    accessibility: [
      'Provide textual data table fallbacks for visual charts.'
    ]
  },
  {
    name: 'pricing-matrix.md',
    title: 'Pricing Matrix & Tier Comparison Layout',
    overview: 'Pricing layouts must communicate feature differences and subscription economics clearly, eliminating hidden caveats.',
    structure: [
      { section: 'Billing Frequency Toggle', role: 'Monthly vs Annual switch with annual discount badge', token: 'var(--color-surface-muted)' },
      { section: 'Tier Cards', role: 'Starter, Pro (Recommended/Highlighted), Enterprise', token: 'grid-cols-1 md:grid-cols-3' },
      { section: 'Feature Comparison Matrix', role: 'Detailed checkbox breakdown across categories', token: 'divide-y border' }
    ],
    codeSnippet: `<div className="w-full max-w-7xl mx-auto px-4 py-16">
  <div className="text-center max-w-2xl mx-auto mb-12">
    <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Simple, transparent pricing</h2>
    <p className="text-sm text-[var(--color-text-secondary)] mt-2">Scale as you grow. No hidden bandwidth charges.</p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
    {/* Tier cards */}
  </div>
</div>`,
    dos: [
      'Highlight exactly one recommended plan with subtle elevation or border accent.',
      'Clarify monthly equivalent pricing when annual billing is active.'
    ],
    donts: [
      'Never hide currency denomination or billing renewal frequency.'
    ],
    accessibility: [
      'Ensure plan selection radio buttons or CTA buttons have clear unique accessible names ("Select Pro Plan").'
    ]
  },
  {
    name: 'documentation-layout.md',
    title: 'Technical Documentation & Knowledge Base Layout',
    overview: 'Documentation requires a distraction-free 3-column architecture: navigation tree on the left, formatted markdown in the center, and on-page table of contents on the right.',
    structure: [
      { section: 'Navigation Tree', role: 'Collapsible folders and doc topics', token: 'w-64 border-r' },
      { section: 'Content Column', role: 'Prose typography, code blocks, alerts', token: 'max-w-3xl px-8' },
      { section: 'Table of Contents', role: 'Active scroll-spy h2/h3 links', token: 'w-56 hidden xl:block' }
    ],
    codeSnippet: `<div className="flex max-w-8xl mx-auto">
  <nav className="w-64 shrink-0 border-r border-[var(--color-border-subtle)] p-6 hidden lg:block">
    <DocNavTree />
  </nav>
  <article className="flex-1 max-w-3xl px-8 py-10 prose prose-invert">
    <DocMarkdownRenderer />
  </article>
  <aside className="w-56 shrink-0 p-6 hidden xl:block">
    <TableOfContents />
  </aside>
</div>`,
    dos: [
      'Maintain an active scroll-spy on the right table of contents.',
      'Provide one-click copy buttons on all code blocks.'
    ],
    donts: [
      'Do not crowd code snippets with microscopic fonts; maintain 13-14px code legibility.'
    ],
    accessibility: [
      'Ensure high contrast syntax highlighting (WCAG 4.5:1 on background).'
    ]
  },
  {
    name: 'settings-profile.md',
    title: 'Settings & Profile Management Layout',
    overview: 'Settings pages organize account, team, billing, and security preferences into structured master-detail panels.',
    structure: [
      { section: 'Settings Navigation', role: 'Horizontal tabs or left-hand category list', token: 'var(--color-surface-base)' },
      { section: 'Form Section Cards', role: 'Grouped settings blocks with descriptive headers and save action footer', token: 'var(--color-surface-base)' },
      { section: 'Danger Zone', role: 'Isolated red-bordered section for destructive account actions', token: 'var(--color-danger-subtle)' }
    ],
    codeSnippet: `<div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
  <div className="p-6 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
    <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Public Profile</h3>
    <p className="text-xs text-[var(--color-text-secondary)] mb-6">This information is displayed publicly on your workspace.</p>
    <div className="space-y-4">
      <TextInput label="Display Name" defaultValue="Alex Morgan" />
      <TextInput label="Contact Email" defaultValue="alex@company.com" />
    </div>
    <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] flex justify-end">
      <button className="h-9 px-4 text-xs font-medium rounded-lg bg-[var(--color-accent-primary)] text-white">Save Changes</button>
    </div>
  </div>
</div>`,
    dos: [
      'Isolate destructive deletion actions into an explicit Danger Zone.',
      'Show clear success notifications when settings are saved.'
    ],
    donts: [
      'Never place a single global save button at the very bottom of a 20-field settings page.'
    ],
    accessibility: [
      'Group related inputs inside semantic <fieldset> with <legend>.'
    ]
  },
  {
    name: 'onboarding-wizard.md',
    title: 'Onboarding Multi-Step Wizard Layout',
    overview: 'Onboarding wizards guide new users through critical configuration steps without overwhelming cognitive bandwidth.',
    structure: [
      { section: 'Progress Indicator', role: 'Step pills or percentage bar showing current step and total', token: 'h-1 bg-accent' },
      { section: 'Focused Card Container', role: 'Centered single-purpose card (max-w-lg)', token: 'shadow-2xl' },
      { section: 'Action Footer', role: 'Back button, Skip option, and Primary Continue CTA', token: 'flex justify-between' }
    ],
    codeSnippet: `<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--color-surface-canvas)]">
  <div className="w-full max-w-md">
    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-3">
      <span>Step 2 of 4</span>
      <span>Configure Workspace</span>
    </div>
    <div className="w-full h-1 bg-[var(--color-surface-muted)] rounded-full mb-8">
      <div className="h-full bg-[var(--color-accent-primary)] rounded-full w-1/2 transition-all duration-300" />
    </div>
    <div className="p-8 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] shadow-xl">
      <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Name your workspace</h2>
      <p className="text-xs text-[var(--color-text-secondary)] mt-1 mb-6">Choose a unique domain identifier for your team.</p>
      <TextInput label="Workspace Name" placeholder="acme-corp" />
      <div className="mt-8 flex items-center justify-between">
        <button className="text-xs text-[var(--color-text-secondary)] hover:underline">Back</button>
        <button className="h-10 px-5 text-xs font-semibold rounded-lg bg-[var(--color-accent-primary)] text-white">Continue →</button>
      </div>
    </div>
  </div>
</div>`,
    dos: [
      'Allow users to return to previous steps to edit answers.',
      'Preserve entered state in drafts/storage during wizard flow.'
    ],
    donts: [
      'Do not lock the user out from skipping non-essential steps.'
    ],
    accessibility: [
      'Announce step transitions to screen readers using aria-live="polite".'
    ]
  },
  {
    name: 'auth-portal.md',
    title: 'Authentication & Sign-in Portal Layout',
    overview: 'Auth portals handle sign-in, account creation, password recovery, and SSO. They require rock-solid security feedback, uncluttered visual focus, and mobile responsiveness.',
    structure: [
      { section: 'Split Hero or Centered Card', role: 'Brand illustration on left, interactive auth form on right', token: 'min-h-screen' },
      { section: 'Social / SSO Providers', role: 'GitHub, Google, SAML SSO one-click buttons', token: 'gap-3' },
      { section: 'Credential Form', role: 'Email and password with reveal toggle and forgot password link', token: 'space-y-4' },
      { section: 'Security Disclosures', role: 'Terms of service and privacy policy links', token: 'text-[11px] text-muted' }
    ],
    codeSnippet: `<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--color-surface-canvas)]">
  <div className="hidden lg:flex flex-col justify-between p-12 bg-[var(--color-surface-base)] border-r border-[var(--color-border-subtle)]">
    <div className="font-bold text-lg text-[var(--color-text-primary)]">Acme Engine</div>
    <div className="max-w-md">
      <blockquote className="text-xl font-medium text-[var(--color-text-primary)] leading-snug">
        "Pure SaaS helped us ship our design system 4x faster with zero generic UI bloat."
      </blockquote>
      <p className="text-xs text-[var(--color-text-secondary)] mt-4">Sarah Chen — Head of Engineering, ScaleFlow</p>
    </div>
    <div className="text-xs text-[var(--color-text-muted)]">© 2026 Acme Corp. All rights reserved.</div>
  </div>
  
  <div className="flex items-center justify-center p-8">
    <div className="w-full max-w-sm space-y-6">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Welcome back</h1>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">Sign in with your enterprise credentials.</p>
      </div>
      <button className="w-full h-10 rounded-lg border border-[var(--color-border-subtle)] flex items-center justify-center gap-2 text-xs font-medium hover:bg-[var(--color-surface-hover)]">
        <span>Sign in with GitHub</span>
      </button>
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-[var(--color-border-subtle)]" />
        <span className="flex-shrink mx-4 text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider">or continue with email</span>
        <div className="flex-grow border-t border-[var(--color-border-subtle)]" />
      </div>
      <form className="space-y-4">
        <TextInput label="Work Email" type="email" placeholder="name@company.com" />
        <TextInput label="Password" type="password" />
        <button type="submit" className="w-full h-10 rounded-lg bg-[var(--color-accent-primary)] text-white text-xs font-medium">Sign In</button>
      </form>
    </div>
  </div>
</div>`,
    dos: [
      'Enable browser password managers via autocomplete="username" and autocomplete="current-password".',
      'Provide clear inline error messaging for failed authentication attempts.'
    ],
    donts: [
      'Never block copy-paste into password fields.'
    ],
    accessibility: [
      'Proper form landmarks and explicit labels for assistive tools.'
    ]
  },
  {
    name: 'ecommerce-product-grid.md',
    title: 'E-commerce & Product Catalog Layout',
    overview: 'Product catalogs balance high-density image grids with robust facet filters and instantaneous sorting.',
    structure: [
      { section: 'Facet Filter Rail', role: 'Category trees, price sliders, color swatches, availability', token: 'w-64 hidden md:block' },
      { section: 'Product Grid Stage', role: '2 to 4 responsive columns with aspect-ratio locked product imagery', token: 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' },
      { section: 'Quick View Overlay', role: 'Accessible modal for instant preview without navigating away', token: 'var(--color-surface-overlay)' }
    ],
    codeSnippet: `<div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
  <aside className="w-64 shrink-0 hidden md:block">
    <ProductFilters />
  </aside>
  <main className="flex-1">
    <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)] mb-6">
      <span className="text-xs text-[var(--color-text-secondary)]">Showing 48 products</span>
      <select className="h-8 text-xs bg-transparent border border-[var(--color-border-subtle)] rounded-md px-2">
        <option>Sort by: Newest</option>
        <option>Price: Low to High</option>
      </select>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard />
    </div>
  </main>
</div>`,
    dos: [
      'Lock product image aspect ratios to prevent Cumulative Layout Shift (CLS).',
      'Offer mobile filter modal on small viewports.'
    ],
    donts: [
      'Never hide price or stock availability from the main grid card.'
    ],
    accessibility: [
      'Descriptive alt text for all product images.'
    ]
  },
  {
    name: 'checkout-funnel.md',
    title: 'Checkout Funnel & Payment Flow Layout',
    overview: 'Checkout flows must be frictionless and trustworthy, minimizing fields while showing clear itemized totals and SSL trust indicators.',
    structure: [
      { section: 'Shipping & Contact Details', role: 'Streamlined address and contact inputs with autofill', token: 'flex-1 space-y-6' },
      { section: 'Payment Method Form', role: 'Credit card elements, Apple Pay, or digital wallet', token: 'border p-4 rounded-xl' },
      { section: 'Sticky Order Summary Rail', role: 'Item thumbnails, promo code input, subtotal, tax, and final total', token: 'w-96 border-l p-6' }
    ],
    codeSnippet: `<div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
  <div className="lg:col-span-7 space-y-8">
    <section>
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">1. Contact & Shipping</h2>
      <AddressForm />
    </section>
    <section>
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">2. Payment Method</h2>
      <PaymentForm />
    </section>
  </div>
  <aside className="lg:col-span-5 bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] rounded-2xl p-6 h-fit sticky top-6">
    <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Order Summary</h3>
    <OrderSummaryItems />
    <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] space-y-2 text-xs">
      <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Subtotal</span><span>$129.00</span></div>
      <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Shipping</span><span>Free</span></div>
      <div className="flex justify-between font-bold text-sm text-[var(--color-text-primary)] pt-2 border-t"><span>Total</span><span>$129.00</span></div>
    </div>
    <button className="w-full h-12 mt-6 rounded-xl bg-[var(--color-accent-primary)] text-white font-semibold text-sm">Place Order</button>
  </aside>
</div>`,
    dos: [
      'Provide collapsible order summary on mobile viewports.',
      'Support browser autofill across address and card inputs.'
    ],
    donts: [
      'Never introduce surprise fees on the final confirmation step.'
    ],
    accessibility: [
      'Screen reader live regions for tax calculation and discount code application.'
    ]
  },
  {
    name: 'status-page.md',
    title: 'System Status & Incident Timeline Layout',
    overview: 'Public status pages broadcast uptime, service health, and incident resolution progress, inspiring customer confidence during downtime.',
    structure: [
      { section: 'Global Status Banner', role: 'Prominent green/amber/red banner stating overall operational status', token: 'p-4 rounded-xl' },
      { section: 'Component Matrix', role: 'List of individual systems (API, Web, Database) with 90-day uptime bars', token: 'divide-y' },
      { section: 'Incident Timeline', role: 'Chronological updates (Investigating, Identified, Monitoring, Resolved)', token: 'border-l-2' }
    ],
    codeSnippet: `<div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium text-sm flex items-center gap-3">
    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
    <span>All Systems Operational</span>
  </div>
  <div className="rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] divide-y divide-[var(--color-border-subtle)]">
    <div className="p-4 flex items-center justify-between text-xs font-medium">
      <span>API Services</span>
      <span className="text-emerald-500">Operational</span>
    </div>
    <div className="p-4 flex items-center justify-between text-xs font-medium">
      <span>Database Clusters</span>
      <span className="text-emerald-500">Operational</span>
    </div>
  </div>
</div>`,
    dos: [
      'Use 90-day interactive uptime tick bars with hover tooltips.',
      'Include timestamps with explicit timezone abbreviations.'
    ],
    donts: [
      'Never obscure incident reports behind vague euphemisms.'
    ],
    accessibility: [
      'Color status must always be accompanied by text status ("Operational", "Degraded").'
    ]
  }
];

let created = 0;
for (const layout of layouts) {
  const filePath = path.join(targetDir, layout.name);
  let content = `# ${layout.title}\n\n`;
  content += `${layout.overview}\n\n---\n\n`;
  content += `## 1. Architectural Section Breakdown\n\n`;
  content += `| Section / Region | Architectural Role | Suggested Token / Classes |\n`;
  content += `| :--- | :--- | :--- |\n`;
  for (const s of layout.structure) {
    content += `| **${s.section}** | ${s.role} | \`${s.token}\` |\n`;
  }
  content += `\n---\n\n## 2. Layout Implementation Example\n\n`;
  content += `\`\`\`tsx\n${layout.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(layout.dos.length, layout.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const d = layout.dos[i] || '';
    const dn = layout.donts[i] || '';
    content += `| ${d} | ${dn} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Layout Semantics\n\n`;
  for (const a of layout.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Avoid generic centered layouts when asymmetric product-led framing communicates faster.\n`;
  content += `- Never pad sections with meaningless decorative pills or fake squiggly line metrics.\n`;
  content += `- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} layout references in references/layouts/`);


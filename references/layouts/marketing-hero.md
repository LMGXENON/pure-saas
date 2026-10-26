# Marketing Hero Section Composition & Hierarchy

The hero section establishes immediate value proposition, brand identity, and the primary call-to-action. Pure SaaS rejects generic centered gradient blur heroes in favor of asymmetrical editorial compositions, product-led visual anchors, and crisp typography.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Eyebrow / Badge** | Contextual announcement or product category | `var(--color-text-accent)` |
| **Primary Headline** | Concise value statement (32-56px fluid type) | `var(--color-text-primary)` |
| **Subheadline** | Clear explanation of who it is for and how it works | `var(--color-text-secondary)` |
| **Action Group** | Primary CTA button + secondary link or social proof | `var(--color-accent-primary)` |
| **Visual Anchor** | Real interactive preview, high-res UI snapshot, or code block | `var(--color-surface-base)` |

---

## 2. Layout Implementation Example

```tsx
<section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
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
</section>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use left-aligned or asymmetric 60/40 layouts for high-conversion technical products. | Avoid massive purple-to-cyan gradient blobs behind centered headings. |
| Show the actual software product in action within the visual anchor. | Never use generic slogans like "Supercharge your productivity". |
| Ensure primary CTA has unmistakable visual weight. |  |

---

## 4. Accessibility & Layout Semantics

- **Semantic <h1> on hero headline.**
- **Contrast ratio of at least 4.5:1 on subheadline and button text.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

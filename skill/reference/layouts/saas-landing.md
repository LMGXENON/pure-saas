# SaaS Marketing Landing Page Blueprint

A complete SaaS landing page guides potential customers from initial interest through proof, feature discovery, pricing, and onboarding conversion.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **1. Navigation Header** | Brand logo, 3-5 core links, Sign In, Primary CTA | `var(--color-surface-base)` |
| **2. Hero Section** | Value proposition + primary CTA + visual product proof | `var(--color-surface-base)` |
| **3. Social Proof Strip** | Monochrome customer logos and key enterprise metrics | `var(--color-surface-muted)` |
| **4. Deep Dive Features** | Alternating 2-column feature blocks with real screenshots | `var(--color-surface-base)` |
| **5. Interactive Playground** | Live preview or interactive demo component | `var(--color-surface-elevated)` |
| **6. Pricing Tiers** | Transparent monthly/annual comparison matrix | `var(--color-surface-base)` |
| **7. FAQ Accordion** | Addressing real objections and security questions | `var(--color-surface-base)` |
| **8. Final Conversion CTA** | High-contrast closing block + persistent footer | `var(--color-surface-overlay)` |

---

## 2. Layout Implementation Example

```tsx
export const LandingPage = () => (
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
);
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Follow the proven 8-stage technical SaaS landing sequence. | Do not scatter arbitrary decorative badges across every single section. |
| Keep logo clouds monochromatic to avoid color noise. | Avoid repetitive 3-column card grids repeated consecutively. |
| Provide direct pricing clarity without forced sales calls for standard tiers. |  |

---

## 4. Accessibility & Layout Semantics

- **Proper document landmark structure: <header>, <main>, <footer> with sequential <section> headers.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

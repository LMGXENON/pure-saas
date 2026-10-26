# Typography Scale, Fluid Formulas, and Optical Tracking

Typography conveys structure, priority, and voice. Pure SaaS couples mathematical modular scales with fluid clamp() formulas and negative letter-spacing on display headlines.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Display / Hero** | 36px to 64px, line-height 1.05 to 1.15, tracking -0.03em | Impact statements |
| **Headings (H1-H3)** | 20px to 32px, line-height 1.2 to 1.3, tracking -0.015em | Section titles |
| **Body & Microcopy** | 13px to 16px, line-height 1.5 to 1.6, tracking 0 to +0.01em | Comfortable reading |

---

## 2. Code & Configuration Reference

```css
/* Fluid Typography Scale */
:root {
  --font-hero: clamp(2.25rem, 1.8rem + 2.2vw, 3.75rem);
  --font-h1:   clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem);
  --font-h2:   clamp(1.35rem, 1.2rem + 1.0vw, 2.00rem);
  --font-body: clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem);
  
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.04em;
}

h1, .hero-heading {
  font-size: var(--font-hero);
  line-height: 1.1;
  letter-spacing: var(--tracking-tight);
}

body {
  font-size: var(--font-body);
  line-height: 1.55;
  letter-spacing: var(--tracking-normal);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Tighten letter-spacing (tracking) as font-size increases. | Never apply negative letter-spacing to small body or caption text (renders illegible). |
| Decrease line-height as font-size increases (1.1 for 48px, 1.55 for 15px). |  |
| Use fluid clamp() formulas to eliminate abrupt breakpoint text resizing. |  |

---

## 4. Accessibility & Quality Standards

- **WCAG 1.4.12: Support 200% font zoom without breaking containers.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

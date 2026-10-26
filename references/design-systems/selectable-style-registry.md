# Selectable Design Style Registry Guide

> Modular, on-demand catalog of curated design styles, tokens, and aesthetic archetypes for AI coding agents.  
> Adapted from and compatible with **Awesome Design Skills** (by jdsadminllc / bergside, MIT License).

---

## 1. Selectable Design Guidance Architecture

A common failure mode in AI-generated web interfaces is forcing a single opinionated aesthetic onto every project or cluttering repositories with dozens of unwanted styles.

Pure SaaS integrates the **Awesome Design Skills** philosophy:
- **Selectable on Demand:** Choose the exact style that fits your product archetype without installing irrelevant styles.
- **Durable Token Ramps:** Every style provides verified CSS custom properties, contrast-tested palettes, and font pairings.
- **Anti-Slop Boundaries:** Explicit "Best For" and "Avoid For" rules prevent misapplying styles (e.g., using playful neo-brutalism for a healthcare portal).

---

## 2. Style Registry Catalog

| Style ID | Name | Primary Fonts | Canvas / Accent | Best For | Avoid For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `minimal-swiss` | Swiss Modernism | Geist, Inter / Helvetica Neue | `#ffffff` / `#09090b` | Enterprise SaaS, Documentation, APIs | Playful consumer apps, gaming |
| `soft-polished` | Soft Polished | Inter, SF Pro / SF Pro Text | `#fafaf9` / `#1e293b` | Consumer FinTech, Wellness, Portfolios | Dense data consoles, terminals |
| `neo-brutalist` | Neo-Brutalism | JetBrains Mono, Space Grotesk | `#000000` / `#a3e635` | Web3, Creative Tools, Developer CLI | Healthcare, Banking, Legal |
| `editorial-literary` | Editorial Literary | Newsreader, Georgia / Serif | `#faf9f5` / `#14532d` | Research, Essays, Publishing, Long-form | Fast-paced SaaS dashboards |
| `technical-terminal` | Technical Terminal | JetBrains Mono, Geist Mono | `#0c0d0e` / `#fa5d29` | Observability, Cloud Infra, CLI Tools | Lifestyle, Fashion, Beauty |
| `fintech-high-contrast`| FinTech Precision | Inter (tabular-nums), Roboto | `#0f172a` / `#38bdf8` | Trading consoles, Banking, Analytics | Whimsical blogs, Kids apps |
| `spatial-glass` | Spatial Materials | SF Pro, Inter / System | `#18181b` / `#6366f1` | Media apps, Vision OS, Presentation | High-density tables, E-commerce |
| `warm-organic` | Warm Organic Craft | Recoleta, Plus Jakarta Sans | `#fdfbf7` / `#b45309` | Food & Beverage, Sustainable Brands | High-frequency trading, Dev tools |
| `dark-cyberpunk` | High-Tech Cyberpunk | Orbitron, Share Tech Mono | `#050508` / `#06b6d4` | Gaming hardware, Sci-Fi, Crypto events | Corporate enterprise, Accounting |

---

## 3. Querying & Selecting Styles via CLI

Pure SaaS makes style selection effortless via `pure-saas style` and `pure-saas query`:

```bash
# 1. List all available selectable styles in the registry
npx pure-saas style list

# 2. Search styles by keyword, product archetype, or technology stack
npx pure-saas style "swiss"
npx pure-saas style "fintech" --product saas
npx pure-saas query style "brutalist"

# 3. Inspect detailed tokens, typography, and contrast rules for a specific style
npx pure-saas style info minimal-swiss

# 4. Generate an implementation-ready DESIGN.md using the selected style
npx pure-saas design-system --style minimal-swiss --out DESIGN.md
npx pure-saas design-system --style technical-terminal --density 8 --out DESIGN.md
```

---

## 4. Selecting Without Clutter

When applying a style to your application:
1. **Never copy entire registries:** Select only the active style tokens needed for the application.
2. **Export to Your Stack:** Use `npx pure-saas export-tokens DESIGN.md --format tailwind` (or `--format css`) to emit minimal, clean styles.
3. **Verify Contrast:** Always audit the selected style against WCAG 2.2 AA using `npx pure-saas contrast DESIGN.md`.

---

## Attribution & License

Portions of this selectable design-system registry and style archetypes are adapted from [jdsadminllc/awesome-design-skills](https://github.com/jdsadminllc/awesome-design-skills) and [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills), released under the **MIT License**.  
Copyright (c) 2025-2026 Awesome Design Skills Contributors.

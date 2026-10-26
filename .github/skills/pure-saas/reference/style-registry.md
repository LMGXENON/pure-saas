# Selectable Style Archetype Registry

Pure SaaS integrates a curated registry of tokenized design archetypes inspired by Awesome Design Skills and Taste Skill. Explore and inspect on-demand without bulk installation.

---

## 1. Registry Commands

```bash
# List all available styles across all categories
npx pure-saas style list

# Inspect detailed tokens, fonts, and geometry for a style
npx pure-saas style info "minimalism-swiss"
npx pure-saas style info "developer-technical"
npx pure-saas style info "data-dense-dashboard"
npx pure-saas style info "editorial-literary"
npx pure-saas style info "creative-studio"

# Apply style tokens directly to DESIGN.md
npx pure-saas style select "minimalism-swiss" --out DESIGN.md
```

---

## 2. Curated Style Archetype Catalog

| Style ID | Name | Primary Fonts | Canvas / Accent | Best For | Avoid For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `minimalism-swiss` | Swiss Modernism | Geist, Inter | `#ffffff` / `#09090b` | Enterprise SaaS, Documentation, APIs | Playful consumer apps, gaming |
| `developer-technical` | Technical Precision | Geist Mono, JetBrains Mono | `#0c0d0e` / `#fa5d29` | Observability, Cloud Infra, CLI Tools | Lifestyle, Fashion, Beauty |
| `data-dense-dashboard`| FinTech Precision | Inter (tabular-nums), Roboto | `#0f172a` / `#38bdf8` | Trading consoles, Banking, Analytics | Whimsical blogs, Kids apps |
| `editorial-literary` | Editorial Literary | Newsreader, Georgia | `#faf9f5` / `#14532d` | Research, Essays, Publishing, Long-form | Fast-paced SaaS dashboards |
| `creative-studio` | Creative Studio | Syne, Outfit | `#121214` / `#f59e0b` | Media apps, Portfolios, Design tools | Corporate enterprise, Accounting |
| `high-tech-cyberpunk` | Dark Cyberpunk | Orbitron, Share Tech Mono | `#050508` / `#06b6d4` | Gaming hardware, Sci-Fi, Crypto events | Banking, Healthcare |
| `tactile-neumorphic` | Tactile Clean | Plus Jakarta Sans | `#f1f5f9` / `#475569` | Audio hardware, Physical controls | Dense data tables |

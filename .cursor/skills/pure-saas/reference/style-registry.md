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

## 2. Style Index Overview

1. **`minimalism-swiss`:** High typographic structure, neutral slate/zinc canvas, hairline grid dividers. Best for general SaaS, enterprise workflows.
2. **`developer-technical`:** Pitch obsidian canvas (`#0c0d0e`), monospaced code, warm amber/orange accent (`#fa5d29`). Best for cloud consoles, devtools, APIs.
3. **`data-dense-dashboard`:** Deep slate (`#0f172a`), cyan accent (`#38bdf8`), compact rows, tabular numbers. Best for analytics, BI, trading.
4. **`editorial-literary`:** Warm paper (`#faf9f5`), serif display (`Newsreader`), racing green accent (`#14532d`). Best for publishing, technical essays.
5. **`creative-studio`:** Deep charcoal (`#121214`), amber accent (`#f59e0b`), floating toolbars. Best for media, audio, 3D editors.


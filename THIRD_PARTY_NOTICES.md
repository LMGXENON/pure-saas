# Third-Party Notices & Attribution

This document provides complete, file-level provenance and attribution for all third-party code, data, concepts, and materials incorporated or adapted into **Pure SaaS**.

---

## 1. UI/UX Pro Max Skill
- **Repository:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Copyright:** Copyright (c) 2024 Next Level Builder
- **License:** MIT License
- **Incorporated / Adapted Assets:**
  - `references/design-intelligence.json`: Full compiled design intelligence dataset (88 styles, 192 product archetypes, 74 typography pairings, 25 chart guides, 17 motion patterns, 22 framework guidelines) adapted from `src/ui-ux-pro-max/data/styles.csv`, `products.csv`, `typography.csv`, `charts.csv`, `motion.csv`, and `stacks/*.md`.
  - `references/design-styles-catalog.json`: Curated design style taxonomy (12 archetypes including Minimalism & Swiss, Technical Terminal, Data-Dense Console, Editorial Serif, Creative Studio, Enterprise SaaS, Bento Box Grid, Clean Consumer E-Commerce, High-Contrast FinTech, Healthcare & Clinical Trust, Spatial & Tactile Glass, Neo-Brutalist), 10 product archetypes, and stack guidance adapted from `src/ui-ux-pro-max/data/styles.csv` and `products.csv`.
  - `scripts/pure-saas.mjs` (`queryDesignIntelligence` & CLI `pure-saas style` / `pure-saas query`): CLI design intelligence query mechanism with keyword, product, and stack filtering adapted from `src/ui-ux-pro-max/scripts/search.py`.
- **License Notice:**
```text
MIT License

Copyright (c) 2024 Next Level Builder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 2. Zero Slop Design Plugin
- **Repository:** https://github.com/zero-slop-design/zero-slop-design-plugin
- **Copyright:** Copyright (c) 2026 zero-slop-design contributors
- **License:** MIT License
- **Incorporated / Adapted Code & Concepts:**
  - `scripts/pure-saas.mjs` (`scanSourceDirectory`): Advanced static code checks adapted from `src/check.mjs`:
    - Tailwind utility palette class detection regex (`PALETTE_CLASS` detecting unmapped utility classes like `bg-blue-500`, `text-slate-400`).
    - Arbitrary bracket utility dimension detection regex (`UTILITY_DIMENSION` detecting `p-[17px]`, `rounded-[11px]`).
    - Color function detection regex (`COLOR_FUNCTION`).
    - Focus outline suppression check (detecting `outline-none` / `focus:outline-none` without `focus-visible`).
    - Standardized inline comment bypass parsing (`/* pure-saas-ignore rule: reason */`).
  - `references/schemas/design-md.schema.json` & `references/templates/DESIGN.md`: Specification structure informed by `spec/zsd-design-md.md` and `templates/DESIGN.md`.
  - `references/anti-slop-rules.md`: Concrete anti-generic design critique methodology.
  - `references/templates/reference-record.md`: Observation data structure separating measured interface values from estimates adapted from `references/observations.md`.
- **License Notice:**
```text
MIT License

Copyright (c) 2026 zero-slop-design contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 3. Apple Design Skill
- **Repository:** https://github.com/dickwu/apple-design-skill
- **Author:** Dick Wu
- **Guideline Text Origin:** Apple Inc. (Human Interface Guidelines, developer.apple.com/design/human-interface-guidelines/)
- **Incorporated / Adapted Concepts & Architecture:**
  - `references/README.md` & `SKILL.md`: Reference-routing architecture and the strict "Read Before You Cite" rule, keeping core instructions focused while routing specific questions to dedicated guides.
  - `references/cross-platform.md`: Cross-platform translation mapping Apple HIG vocabulary and principles (clarity, deference, depth, touch targets, materials, dynamic type) to Web, React Native, Flutter, Electron, and SwiftUI adapted from `references/cross-platform.md`.
  - `references/code-audit.md`: Concrete code inspection search patterns, guideline citations, severity ratings, and framework-specific replacement ledger adapted from `references/code-audit.md`.
  - Four-part actionable review findings architecture (Finding, Evidence with `file:line`, Impact with severity, and Concrete Fix).

---

## 4. File-by-File Provenance & Implementation Ledger

The following ledger establishes the relationship between every adapted component and Pure SaaS:

| Upstream Project | Upstream Subsystem | Pure SaaS Subsystem | Incorporation Type | Technical Implementation Rationale | License & Attribution Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/data/styles.csv` & `products.csv` | `references/design-styles-catalog.json` | **Adapted & Curated** | Curated professional SaaS, developer, and product archetypes (12 styles, 10 product archetypes, 7 stack guides). Added strict anti-slop rules, best-for, avoid-for, and token mappings. | MIT License; Notice preserved in Section 1. |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/scripts/search.py` | `scripts/pure-saas.mjs` (`queryDesignIntelligence`, `pure-saas style`) | **Rewritten (Language Translation)** | Translated Python keyword and category search logic into zero-dependency ES module JavaScript running on native Node.js, supporting `--product` and `--stack` flags. | MIT License; Notice preserved in Section 1. |
| `zero-slop-design-plugin` | `src/check.mjs` | `scripts/pure-saas.mjs` (`scanSourceDirectory`) | **Adapted & Hardened** | Incorporated core static regex patterns: `PALETTE_CLASS` (detecting unmapped utility classes), `UTILITY_DIMENSION` (bracketed dimensions), `COLOR_FUNCTION` (raw rgb/hsl/oklch), and focus outline suppression. Added comment stripping (`/* ... */`, `// ...`) and preceding-line ignore comment parsing to eliminate false positives. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `spec/zsd-design-md.md` | `references/schemas/` & `references/templates/` | **Adapted & Formalized** | Formalized token schema enforcing semantic colors, typography scale, spacing, border radii, and accessibility tiers in JSON Schema Draft-07 format. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `src/export.mjs` | `scripts/pure-saas.mjs` (`exportTokens`) | **Rewritten (Zero-Dependency)** | Rewrote token exporter into zero-dependency JavaScript supporting CSS custom properties, Tailwind config, and JSON. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `references/observations.md` | `references/templates/reference-record.md` | **Adapted & Integrated** | Formalized measured observation data structure separating verified measurements from estimates and unverified inferences. | MIT License; Notice preserved in Section 2. |
| `apple-design-skill` | `SKILL.md` (Reference Routing) | `references/README.md` & `SKILL.md` Section 4 | **Architectural Principle Adaptation** | Adapted reference routing architecture: core skill remains focused (~380 lines), routing specific tasks to modular reference guides, enforcing "Read Before You Cite". | Section 3 Attribution. |
| `apple-design-skill` | `references/cross-platform.md` | `references/cross-platform.md` | **Adapted & Expanded** | Translated Apple HIG spatial and interaction principles to Web, React Native, Flutter, Electron, and SwiftUI with concrete vocabulary and convention mapping. | Section 3 Attribution. |
| `apple-design-skill` | `references/code-audit.md` | `references/code-audit.md` | **Adapted & Hardened** | Created actionable search patterns table, guideline citations, and stack-specific replacement ledger for touch targets, focus rings, payment marks, and tokens. | Section 3 Attribution. |

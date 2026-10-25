# Third-Party Notices & Attribution

This document provides complete, file-level provenance and attribution for all third-party code, data, concepts, and materials incorporated or adapted into **Pure SaaS**.

---

## 1. UI/UX Pro Max Skill
- **Repository:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Copyright:** Copyright (c) 2024 Next Level Builder
- **License:** MIT License
- **Incorporated / Adapted Assets:**
  - `references/design-styles-catalog.json`: Curated design style taxonomy (Minimalism & Swiss, Developer Technical, Data-Dense Console, Editorial Serif, Creative Studio, Enterprise SaaS) adapted from `src/ui-ux-pro-max/data/styles.csv`.
  - `scripts/pure-saas.mjs` (`pure-saas style [query]`): CLI design-intelligence query mechanism adapted from `src/ui-ux-pro-max/scripts/search.py`.
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
- **Incorporated / Adapted Code:**
  - `scripts/pure-saas.mjs` (`scanSourceDirectory`): Advanced static code checks adapted from `src/check.mjs`:
    - Tailwind utility palette class detection regex (`PALETTE_CLASS` detecting unmapped utility classes like `bg-blue-500`, `text-slate-400`).
    - Arbitrary bracket utility dimension detection regex (`UTILITY_DIMENSION` detecting `p-[17px]`, `rounded-[11px]`).
    - Color function detection regex (`COLOR_FUNCTION`).
    - Standardized inline comment bypass parsing (`/* pure-saas-ignore rule: reason */`).
  - `schemas/design-md.schema.json` & `templates/DESIGN.md`: Specification structure informed by `spec/zsd-design-md.md` and `templates/DESIGN.md`.
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

## 3. File-by-File Provenance & Implementation Ledger

The following ledger establishes the relationship between every adapted component and Pure SaaS:

| Upstream Project | Upstream Subsystem | Pure SaaS Subsystem | Incorporation Type | Technical Implementation Rationale | License & Attribution Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/data/styles.csv` | `references/design-styles-catalog.json` | **Adapted & Curated** | Curated professional SaaS & developer styles (Minimalist, Technical Terminal, Data Console, Editorial, Creative Studio, Enterprise SaaS). Added strict anti-slop rules, best-for, and avoid-for constraints. | MIT License; Notice preserved in Section 1. |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/scripts/search.py` | `scripts/pure-saas.mjs` (`pure-saas style [query]`) | **Rewritten (Language Translation)** | Translated Python keyword and category search logic into zero-dependency ES module JavaScript running on native Node.js. | MIT License; Notice preserved in Section 1. |
| `zero-slop-design-plugin` | `src/check.mjs` | `scripts/pure-saas.mjs` (`scanSourceDirectory`) | **Adapted & Hardened** | Incorporated core static regex patterns: `PALETTE_CLASS` (detecting unmapped utility classes), `UTILITY_DIMENSION` (bracketed dimensions), `COLOR_FUNCTION` (raw rgb/hsl/oklch). Added comment stripping (`/* ... */`, `// ...`) and preceding-line ignore comment parsing to eliminate false positives. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `spec/zsd-design-md.md` | `schemas/design-md.schema.json` & `templates/DESIGN.md` | **Adapted & Formalized** | Formalized token schema enforcing semantic colors, typography scale, spacing, border radii, and accessibility tiers in JSON Schema Draft-07 format. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `src/export.mjs` | `scripts/pure-saas.mjs` (`exportTokens`) | **Rewritten (Zero-Dependency)** | Rewrote token exporter into zero-dependency JavaScript supporting CSS custom properties, Tailwind config, and JSON. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `skills/*` (14 fragmented skill folders) | `SKILL.md` (Stages A through I) | **Architectural Consolidation** | Consolidated separate micro-skills into a single coherent, deterministic 9-stage engineering workflow to prevent agent confusion. | Pure SaaS original architecture. |


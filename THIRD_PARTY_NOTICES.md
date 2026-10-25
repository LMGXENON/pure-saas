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

## 3. Apple Design Skill & Apple Human Interface Guidelines
- **Repository:** https://github.com/dickwu/apple-design-skill
- **Licensing Status:** **UNLICENSED / PROPRIETARY CONTENT**. The repository reproduces Apple Inc.'s copyrighted Human Interface Guidelines (123 `.md` files crawled from `developer.apple.com`) and carries no OSI-approved open-source license.
- **Provenance Decision:** **Pure SaaS incorporates ZERO code, text, or documentation from `apple-design-skill` or Apple Inc.**
- **Independent Equivalent Implementation:**
  - `references/platform-guidelines.md`: An independently authored, platform-aware craft guide covering window safe areas (macOS traffic lights, Electron/Tauri `-webkit-app-region`), keyboard accelerators (`Cmd` vs `Ctrl`), mobile touch target minimums ($\ge 44 \times 44\text{px}$), and responsive breakpoints without reproducing Apple's proprietary HIG text.
  - `references/design-review.md`: An independently authored critique rubric (Issue $\rightarrow$ Impact $\rightarrow$ Evidence $\rightarrow$ Recommendation) structured around general software usability rather than proprietary Apple guidelines.

---

## 4. Analytical References
- **Firecrawl (https://www.firecrawl.dev/)**: Used solely as an analytical reference for developer-focused product clarity and technical layout composition. No code, logos, or assets were copied.
- **Butter (https://www.butter.video/)**: Used solely as an analytical reference for expressive typography and media-led layout composition. No code, logos, or assets were copied.

---

## 5. File-by-File Provenance & Implementation Ledger

The following ledger establishes the relationship between every primary asset or subsystem in the upstream repositories and Pure SaaS:

| Upstream Repository | Upstream File / Subsystem | Pure SaaS File / Subsystem | Incorporation Type | Technical Evidence & Architecture Rationale | License & Attribution Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/data/styles.csv` | `references/design-styles-catalog.json` | **Adapted & Curated** | Curated professional SaaS & developer styles (Minimalist, Technical Terminal, Data Console, Editorial, Creative Studio, Enterprise SaaS). Stripped gimmicky consumer styles (Neumorphism, Vaporwave). Added strict anti-slop rules, best-for, and avoid-for constraints. | MIT License; Notice preserved in Section 1. |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/scripts/search.py` | `scripts/pure-saas.mjs` (`pure-saas style [query]`) | **Rewritten (Language Translation)** | Translated Python keyword and category search logic into zero-dependency ES module JavaScript running on native Node.js. | MIT License; Notice preserved in Section 1. |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/data/typography.csv` | `references/typography.md` | **Clean-Room Independent Equivalent** | Replaced generic font combinations with production-grade typographic scale, fluid `clamp()` systems, system font fallbacks (`Geist`, `Inter`), and tabular numerals (`font-variant-numeric: tabular-nums`). | Pure SaaS original work. |
| `ui-ux-pro-max-skill` | `src/ui-ux-pro-max/data/colors.csv` | `references/color-and-tokens.md` | **Clean-Room Independent Equivalent** | Replaced raw color hex listings with semantic design token architecture (canvas, surface, text, action, border, status). | Pure SaaS original work. |
| `ui-ux-pro-max-skill` | `scripts/evaluate-relevance.py`, `generate-slide.py` | *None* | **Omitted** | Slide generation and heavy Python tooling omitted to preserve zero-dependency Node.js architecture. | N/A (Not incorporated). |
| `zero-slop-design-plugin` | `src/check.mjs` | `scripts/pure-saas.mjs` (`scanSourceDirectory`) | **Adapted & Hardened** | Incorporated core static regex patterns: `PALETTE_CLASS` (detecting unmapped utility classes), `UTILITY_DIMENSION` (bracketed dimensions), `COLOR_FUNCTION` (raw rgb/hsl/oklch). Added comment stripping (`/* ... */`, `// ...`) and preceding-line ignore comment parsing to eliminate false positives. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `spec/zsd-design-md.md` | `schemas/design-md.schema.json` & `templates/DESIGN.md` | **Adapted & Formalized** | Formalized token schema enforcing semantic colors, typography scale, spacing, border radii, and accessibility tiers in JSON Schema Draft-07 format. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `src/export.mjs` | `scripts/pure-saas.mjs` (`exportTokens`) | **Rewritten (Zero-Dependency)** | Rewrote token exporter into zero-dependency JavaScript supporting CSS custom properties, Tailwind config, and JSON. | MIT License; Notice preserved in Section 2. |
| `zero-slop-design-plugin` | `skills/*` (14 fragmented skill folders) | `SKILL.md` (Stages A through I) | **Architectural Consolidation** | Consolidated 14 separate micro-skills into a single coherent, deterministic 9-stage engineering workflow to prevent agent confusion. | Pure SaaS original architecture. |
| `zero-slop-design-plugin` | `src/language.mjs` | *None* | **Omitted** | Omitted arbitrary prose length and passive-voice linting to prevent false positives during code generation. | N/A (Not incorporated). |
| `apple-design-skill` | 123 HIG markdown files (`references/hig/*`) | *None* | **Omitted (Copyright Boundary)** | Omitted 100% of scraped Apple developer documentation due to Apple Inc. proprietary copyright and lack of open-source license. | Proprietary Apple content; ZERO text or code incorporated. |
| `apple-design-skill` | `references/cross-platform.md` | `references/platform-guidelines.md` | **Clean-Room Independent Equivalent** | Authored original guide on platform craft: safe area insets (macOS traffic lights, Electron/Tauri drag regions, mobile bottom bars), platform keyboard accelerators (`Cmd` vs `Ctrl`), and touch target minimums ($\ge 44 \times 44\text{px}$). | Pure SaaS original work. |
| `apple-design-skill` | Review prompt structure | `references/design-review.md` | **Clean-Room Independent Equivalent** | Authored independent critique model: Issue $\rightarrow$ User Impact $\rightarrow$ Visual / Code Evidence $\rightarrow$ Concrete Recommendation. | Pure SaaS original work. |


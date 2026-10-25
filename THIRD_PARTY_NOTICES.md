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

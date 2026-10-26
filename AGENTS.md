# AGENTS.md

Operating manual for AI agents working in this repository, or using Pure SaaS to design, build, and review software.

---

## 1. What This Repository Is

Pure SaaS is an open-source, universal AI-agent skill and design enforcement toolkit. Its purpose is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, e-commerce, portfolios, design systems, and components.

---

## 2. Command Architecture

Pure SaaS operates via **one intelligent main command and five specialist commands**:

1. **`/pure-saas [any request]`**  
   The universal entry point. Autonomously inspects context, establishes or updates `DESIGN.md`, executes frontend code, enforces tokens, integrates motion and accessibility, fixes bugs while preserving backend APIs, and reports verification honestly.
2. **`/pure-saas design [request]`**  
   Establish or update the root-level `DESIGN.md` specification before implementation.
3. **`/pure-saas polish [request]`**  
   Elevate visual craft, typography tracking, surface lighting, and micro-interactions without rebuilding working logic.
4. **`/pure-saas review [request or scope]`**  
   Rigorous, evidence-based quality audit across bugs, security, accessibility, performance, and tokens.
5. **`/pure-saas reference [URL]`**  
   Reverse-engineer visual references via browser DevTools and recreate requested design language into a 16-section `DESIGN.md`.
6. **`/pure-saas responsive [request]`**  
   Optimize layouts across mobile (375-430px), tablet (768-834px), laptop (1024-1280px), and desktop (1440px+).

---

## 3. File Map

| Path | Role | Edit by Hand? |
| :--- | :--- | :--- |
| `SKILL.md` | Main skill instructions: stance, principles, 6 workflows, 8-state matrix, and quality standards | Yes |
| `AGENTS.md` | Operating manual and architectural rules (this file) | Yes |
| `README.md` | Concise overview, installation, usage, and commands | Yes |
| `.cursorrules` | Root entry point for Cursor | Yes |
| `GEMINI.md` | Root entry point for Gemini / Antigravity | Yes |
| `.windsurfrules` | Root entry point for Windsurf | Yes |
| `.github/copilot-instructions.md` | Repository custom instructions for GitHub Copilot | Yes |
| `commands/*.md` | The 6 canonical user-facing slash command definitions (`pure-saas`, `design`, `polish`, `review`, `reference`, `responsive`) | Yes |
| `references/hig/*.md` | 124 substantive individual Apple HIG reference documents across components, foundations, and patterns | Yes |
| `references/frameworks/*.md` | 22 framework engineering guides (React, Next.js, Vue, Svelte, Tailwind, SwiftUI, Flutter, etc.) | Yes |
| `references/design-intelligence.json` | Compiled dataset: 88 styles, 192 product archetypes, 74 typography pairings, 25 chart guides, 17 motion patterns, 22 stack guidelines | Generated / Maintained |
| `references/design-styles-catalog.json` | Curated tokenized design style archetypes with Tailwind and CSS mappings | Yes |
| `references/hig-lookup.md` | Apple HIG 123-topic index and routing guide | Yes |
| `references/anti-slop-rules.md` | Concrete anti-generic design critique methodology and 7 deadly patterns | Yes |
| `references/code-audit.md` | Static code inspection search patterns, token grep checks, and replacement ledger | Yes |
| `references/color-and-tokens.md` | Semantic color hierarchy, WCAG contrast tiers, light/dark mode pairs | Yes |
| `references/cross-platform.md` | Platform translation between Apple HIG, Android Material, and Web | Yes |
| `references/design-principles.md` | Core design philosophy: Clarity, Deference, Depth, Authenticity | Yes |
| `references/design-review.md` | Evidence-based audit protocol and verification reporting | Yes |
| `references/interaction-states.md` | Complete 8-state component matrix (default, hover, focus, active, disabled, loading, error, success) | Yes |
| `references/layout-and-composition.md` | 8pt spatial grid, asymmetric visual weight, and content containment | Yes |
| `references/motion.md` | Purposeful physics-based spring motion and cubic-bezier curves | Yes |
| `references/platform-guidelines.md` | Host platform conventions for Web, macOS, iOS, and Mobile | Yes |
| `references/reference-analysis.md` | Live reference reverse engineering and 16-section `DESIGN.md` protocol | Yes |
| `references/responsive-design.md` | Viewport constraints, container queries, and fluid typography | Yes |
| `references/typography.md` | Optical hierarchy, fluid scale formulas, line heights, and letter-spacing tracking | Yes |
| `scripts/pure-saas.mjs` | Zero-dependency Node.js CLI, reference search engine, design intelligence query engine, token validator, and static code scanner | Yes |
| `tests/` | Automated test suite (CLI, tokens, enforcement, commands, real-world apps, reference search) | Yes |

---

## 4. Searching and Retrieving References & Design Intelligence

Before performing design work, coding agents must retrieve and read the exact reference documents and intelligence:

```bash
# Retrieve reference documents across Apple HIG, frameworks, and craft guides
npx pure-saas ref "<component, framework, or craft topic>"

# Query multi-domain design intelligence (styles, products, colors, typography, UX heuristics, landing, charts, motion)
npx pure-saas query [domain] "<keyword or query>"
npx pure-saas style "<query>" --product "<type>" --stack "<stack>"

# Programmatically generate an approved DESIGN.md tailored to product archetype and design dials
npx pure-saas design-system --product "<type>" --variance <1-10> --motion <1-10> --density <1-10> --out DESIGN.md
```

### Retrieval Examples
- **Component pattern:** `npx pure-saas ref "modal"` -> retrieves `references/hig/modality.md`, `references/hig/sheets.md`
- **Button interaction:** `npx pure-saas ref "button"` -> retrieves `references/hig/buttons.md`, `references/interaction-states.md`
- **Framework guidance:** `npx pure-saas ref "react"` -> retrieves `references/frameworks/react.md`, `references/cross-platform.md`
- **Accessibility:** `npx pure-saas ref "accessibility"` -> retrieves `references/accessibility.md`, `references/hig/accessibility.md`
- **Product colors:** `npx pure-saas query color "fintech"` -> retrieves verified financial color palettes
- **UX heuristics:** `npx pure-saas query ux "scroll"` -> retrieves smooth scroll Do/Don't and good/bad code examples
- **Landing patterns:** `npx pure-saas query landing "b2b saas"` -> retrieves conversion-optimized section order

---

## 5. Operating Rules for Coding Agents

1. **Follow the 10 Universal Execution Behaviors:** Follow all rules in `SKILL.md` (inspect context, coordinate capabilities automatically, execute directly for straightforward requests, preserve backend APIs, maintain `DESIGN.md`, test and refine, report honestly).
2. **Adhere to the 5-Tier Precedence Model:**
   - 1. User explicit requirements and established product brand system.
   - 2. Platform conventions (Apple HIG / Web standards) and WCAG 2.2 AA.
   - 3. Verified project decisions and approved tokens in `DESIGN.md`.
   - 4. Retrieved guidance from Apple HIG, UI/UX Pro Max, and Zero Slop Design.
   - 5. New proposals (must be explicitly identified as proposals, never silently assumed approved).
3. **Never Fabricate Validation:** If a check fails, diagnose and resolve it. If an environment lacks browser inspection or screen-reader tooling, record the area as `untested`. Never claim passing verification for uninspected code.
4. **Preserve Architecture in Existing Apps:** Never rewrite backend APIs, auth flows, database structures, or automated test IDs during UI refactors without explicit user authorization.
5. **Enforce Semantic Tokens:** Reject raw hex codes, color functions, and arbitrary Tailwind numbers. Ensure all styling resolves to documented tokens in `DESIGN.md`.
6. **Enforce Anti-Slop Discipline:** Halt and challenge generic purple/cyan gradient text, excessive glassmorphism blur, repetitive 3-column feature cards, and emoji UI icons.
7. **Follow "Read Before You Cite":** Never review from memory or invent guidelines. Route to relevant guides in `references/`, open them, and cite exact files and sections.
8. **Four-Part Review Findings:** Every reported review finding must provide Finding, Evidence (`file:line` or observed value), Impact (**Critical**, **Warning**, or **Info**), and Concrete Fix.
9. **Maintain the Unresolved Decisions Ledger:** Record open questions requiring user confirmation in the `unresolved` frontmatter list of `DESIGN.md`.
10. **Use Verification & Drift Tooling:**
   - Contrast check: `npx pure-saas contrast DESIGN.md`
   - Token diff: `npx pure-saas diff DESIGN.before.md DESIGN.md`
   - Drift detection: `npx pure-saas drift DESIGN.md observations.json`
   - Tech debt scan: `npx pure-saas check DESIGN.md --source src --known known-defects.json`
   - Token export: `npx pure-saas export-tokens DESIGN.md --format dtcg|tailwind|css`

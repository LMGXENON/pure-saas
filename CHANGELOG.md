# Changelog

All notable changes to the Pure SaaS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-26

### Added
- **Unified Tri-Source Integration:** Deeply integrated Apple Design Skill, UI/UX Pro Max, and Zero Slop Design into a single, cohesive UI/UX engineering system.
- **5-Tier Precedence Model:** Codified strict precedence hierarchy across all commands and agent entry points (User/Brand -> Platform/A11y -> Project Tokens -> Upstream Reference -> Agent Proposal) with deliberate cross-platform conflict resolution.
- **Complete Apple HIG Reference Library (`references/hig/`):** 124 individual substantive documents covering 57 UI components, interaction patterns, foundations, inputs, and platform conventions.
- **Framework Engineering Guides (`references/frameworks/`):** 22 dedicated markdown guides covering React, Next.js, Vue, Nuxt, Svelte, Tailwind, Shadcn, SwiftUI, Flutter, React Native, etc.
- **Multi-Domain Design Intelligence (`references/design-intelligence.json`):** 88 visual styles, 192 product archetypes, 192 product color systems, 74 typography pairings, 34 landing page patterns, 119 UX heuristics (with Do/Don't code), 25 chart guides, 17 motion patterns, 32 app UI patterns, and 22 framework stacks.
- **Programmatic Design System Generator (`pure-saas design-system`):** Command generating valid 16-section `DESIGN.md` specs driven by product archetype, style, and design dials (variance, motion intensity, visual density).
- **Automated WCAG 2.2 Contrast Auditor (`pure-saas contrast`):** Relative luminance and contrast ratio engine checking normal text (4.5:1), large text (3.0:1), and UI components (3.0:1).
- **Design Token Diffing (`pure-saas diff`):** Structural comparison tool identifying added, removed, and changed tokens across revisions.
- **Design Drift Detection (`pure-saas drift`):** Automated validation tool comparing live browser/DOM observations against expected `DESIGN.md` tokens.
- **Known Technical Debt Baseline (`pure-saas check --known <file>`):** Baseline tracking to suppress pre-existing technical debt and track resolved defects without failing CI builds.
- **DTCG 2025.10 & Tailwind v4 Token Exporter (`pure-saas export-tokens`):** Export support for Design Tokens Community Group (DTCG 2025.10) specification and Tailwind v4 `@theme inline` extensions.

---

## [1.0.0] - 2026-10-25

### Added
- **Core Skill (`SKILL.md`):** Complete agent-agnostic operational instruction set covering the 9-stage design workflow (Discover -> Define -> Establish -> Plan -> Build -> Inspect -> Refine -> Enforce -> Report).
- **Persistent Design Specifications:** Standardized formats for `design-brief.md`, `DESIGN.md`, and `reference-record.md` with formal JSON schemas in `schemas/`.
- **Enforcement CLI (`scripts/pure-saas.mjs`):** Zero-dependency Node.js CLI providing commands for `validate`, `check-tokens`, `export-tokens`, `review-report`, and `init`.
- **Standalone Wrappers:** Executable shell wrappers `validate-design`, `check-tokens`, `export-tokens`, and `review-report` in `scripts/`.
- **Modular Reference Documentation:** 12 in-depth craft guides in `references/` covering typography, layout, semantic tokens, anti-slop rules, interaction states, responsive design, accessibility (WCAG 2.2 AA), motion, reference analysis, critique rubric, and cross-platform ergonomics.
- **Cross-Agent Adapters:** Native integration adapters in `integrations/` for Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini CLI, and generic agents.
- **Reference Example Projects:**
  - `examples/developer-tool`: HyperTrace distributed eBPF tracing with live terminal runner and benchmark tables.
  - `examples/creative-product`: FrameCraft cinematic video timeline sequencer with expressive typography.
  - `examples/editorial-saas`: Monograph archival long-form research publisher with restrained serif typography and zero cards.
  - `examples/existing-app-redesign`: VaultGuard enterprise secrets console demonstrating UI modernization while strictly preserving backend APIs and authentication contracts.
- **Automated Test Suite:** Built-in test runner tests covering JSON schemas, token validation, CLI execution, source scanning, and agent adapter conventions.
- **Open-Source Foundations:** MIT License, comprehensive documentation, third-party attribution notices, contribution guidelines, issue templates, and CI workflow.

### Changed & Hardened (Release-Readiness Audit)
- **Style Intelligence CLI (`scripts/pure-saas.mjs`):** Added `pure-saas style [query]` command backed by `references/design-styles-catalog.json` (adapted from `ui-ux-pro-max-skill`).
- **Enhanced Static Linter:** Integrated Tailwind palette class detection (`bg-blue-500`, `text-slate-400`) and arbitrary bracket dimension detection (`p-[17px]`, `rounded-[11px]`) adapted from `zero-slop-design`.
- **False-Positive Immunity:** Added code stripping for inline and block comments, plus support for next-line and inline exception flags (`pure-saas-ignore <rule>: <reason>`, `EXC-xxx`).
- **File Integrity Repair:** Repaired zero-byte `LICENSE`, `integrations/cursor/.cursorrules`, and `integrations/windsurf/.windsurfrules` files.
- **Visual & Responsive Defect Corrections:** Tested and refined mobile responsive behavior (375px viewport) on all three design examples using headless Chrome, eliminating text clipping and header overflow.
- **Complete Source Provenance Ledger:** Added exhaustive file-by-file provenance table in `THIRD_PARTY_NOTICES.md` documenting upstream assets from `ui-ux-pro-max-skill`, `zero-slop-design-plugin`, and legal rationale for the clean-room reimplementation of platform guidelines without Apple HIG text.
- **Independent Real-World App Test:** Executed full verification on an independent billing and seat management application (`tests/real-world-app/`), confirming 100% contract preservation, reduction of 22 raw color violations to 0, and elimination of horizontal clipping on 375px mobile viewports with headless Chrome screenshots.
- **Release Artifact & Agent Spec Verification:** Verified npm registry availability (`pure-saas` is available), confirmed npm tarball contents (45 clean files, 53KB gzipped), and added `integrations/README.md` explicitly distinguishing tested native skills from instruction-file compatibility.



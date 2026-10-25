# Changelog

All notable changes to the Pure SaaS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

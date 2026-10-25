# Pure SaaS

> Universal AI-agent skill and design enforcement toolkit for professional web design and UI/UX without generic AI slop.

---

## The Problem

When asked to design websites or web applications, AI coding agents (Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini) frequently converge on the same repetitive aesthetic clichés regardless of the product:

- Massive purple/cyan gradient text and blurred glassmorphism glows.
- Repetitive three-column feature cards stacked monotonously down the page.
- Generic centered hero layouts followed by predictable content blocks.
- Arbitrary spacing, random colors, and inconsistent component geometry.
- Emoji used as interface icons (`🚀`, `⚡`, `🔥`) instead of crisp SVGs.
- Generic marketing jargon ("Unlock your potential", "Supercharge your workflow").
- Beautiful desktop screenshots that lack responsive ergonomics, keyboard navigation, or interaction states.

The problem is not that agents cannot write CSS or components. The problem is that **agents begin coding without an explicit design brief, a persistent design system, rules against generic defaults, or a reliable verification process.**

---

## The Solution: Pure SaaS

Pure SaaS is a universal, open-source design skill and deterministic enforcement toolkit that makes AI coding agents follow disciplined design engineering:

1. **Design System First:** Requires agents to establish a persistent `DESIGN.md` with semantic tokens (colors, typography, spacing, radii) before generating components.
2. **Anti-Slop by Default:** Challenges generic gradients, excessive cards, and AI clichés, guiding agents toward content-specific layouts and authentic product storytelling.
3. **Preserves Existing Architectures:** Protects backend APIs, authentication, and database models in existing applications during visual upgrades.
4. **Deterministic Enforcement CLI:** A zero-dependency command-line validator that verifies `DESIGN.md` structure, scans source code for raw styling drift, and exports tokens to CSS and Tailwind.
5. **Honest Verification Reporting:** Forbids agents from claiming an untested interface is "verified" or "accessible" without running real checks.

---

## Core Capabilities

- **Design Brief Workflow (`design-brief.md`):** Distinguishes user-approved decisions, agent proposals, and unresolved questions.
- **Persistent Design System (`DESIGN.md`):** One canonical source of truth for semantic tokens, typography scales, layout grids, component states, and accessibility rules.
- **Typography Engine:** Evaluates typeface personality (e.g. Geist, Cabinet Grotesk, Newsreader), restricts body line measure (45–75 characters), balances heading wrapping, and enforces tabular numerals.
- **Content-Specific Composition:** Replaces generic 3-card repetition with asymmetrical splits, live interactive code runners, and editorial density.
- **Complete Interaction State Matrix:** Enforces `hover`, `focus-visible`, `active/pressed`, `disabled`, `loading`, `empty`, `error`, and `success` states.
- **Cross-Agent Portability:** Works across Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini CLI, and generic markdown-compatible agents.
- **Deterministic CLI:** Validates design files, checks tokens, scans code for violations, exports tokens, and produces CI-ready JSON reports.

---

## Quick Start

### 1. Initialize Pure SaaS in your project

```bash
# Using npx directly (zero installation required)
npx pure-saas init developer
```

This creates a starter `design-brief.md` and `DESIGN.md` in your project root.

### 2. Validate your design system

```bash
# Validate DESIGN.md structure and required tokens
npx pure-saas validate DESIGN.md

# Scan source code (e.g., src/) for raw hex colors or unapproved styles
npx pure-saas check-tokens DESIGN.md --source src
```

### 3. Export tokens to your CSS or Tailwind config

```bash
# Export CSS custom properties
npx pure-saas export-tokens DESIGN.md --format css --out src/styles/tokens.css

# Export Tailwind config extension
npx pure-saas export-tokens DESIGN.md --format tailwind --out tailwind.tokens.js
```

### 4. Generate an honest verification report

```bash
npx pure-saas review-report
```

---

## Supported Agent Integrations

Pure SaaS uses thin, portable adapters that follow each agent's documented conventions:

| Platform / Agent | Integration Path | Setup Command |
| :--- | :--- | :--- |
| **Claude Code** | Native skill or `.claude-plugin/` | Symlink or copy to `.claude/skills/pure-saas` (see [claude-code](integrations/claude-code/README.md)) |
| **Cursor** | `.cursor/rules/pure-saas.mdc` | Copy `integrations/cursor/.cursor/rules/pure-saas.mdc` to `.cursor/rules/` |
| **Codex** | `.codex-plugin/plugin.json` | Copy `integrations/codex/.codex-plugin/` to `.codex-plugin/` |
| **Windsurf** | `.windsurfrules` | Copy `integrations/windsurf/.windsurfrules` to project root |
| **OpenCode** | `.agents/skills/` | Copy to `.agents/skills/pure-saas` |
| **Gemini CLI** | `GEMINI.md` | Copy `integrations/gemini/GEMINI.md` to project root |
| **Generic / Others** | `SYSTEM_PROMPT.md` | Add [SYSTEM_PROMPT.md](integrations/generic/SYSTEM_PROMPT.md) to your agent instructions |

---

## The 9-Stage Agent Workflow

When an AI coding agent is tasked with creating or redesigning an interface, Pure SaaS directs it through 9 disciplined stages:

1. **Stage A: Discover** — Inspects repository framework, existing styling, brand assets, and immutable backend contracts.
2. **Stage B: Define** — Authors or updates `design-brief.md`, isolating approved decisions from proposals and open questions.
3. **Stage C: Establish** — Generates or updates `DESIGN.md`, defining semantic tokens, typography, radii, and states.
4. **Stage D: Plan** — Plans page composition and information architecture before touching markup.
5. **Stage E: Build** — Implements components bound directly to semantic tokens; avoids decorative dependencies.
6. **Stage F: Inspect** — Examines the rendered interface at 375px (Mobile), 768px (Tablet), and 1440px (Desktop) viewports when browser tools are available.
7. **Stage G: Refine** — Corrects hierarchy flaws, orphaned headings, contrast failures, and missing states.
8. **Stage H: Enforce** — Runs `pure-saas validate` and `pure-saas check-tokens` in CI or local environment.
9. **Stage I: Report** — Concludes with an honest report disclosing verified checks, failed checks, and untested areas.

*For minor UI changes (e.g. tweaking a button), agents follow a shortened workflow: inspect `DESIGN.md`, apply tokens, verify states, and report.*

---

## Anatomy of `DESIGN.md`

`DESIGN.md` is the persistent source of truth for your application's visual system:

```yaml
---
name: "Acme Cloud Design System"
version: "1.0.0"
status: "approved"
tokens:
  colors:
    color-bg-canvas: "#0c0d0e"
    color-bg-surface: "#151719"
    color-bg-surface-elevated: "#1f2226"
    color-bg-surface-sunken: "#050607"
    color-text-primary: "#f9fafb"
    color-text-secondary: "#9ca3af"
    color-text-muted: "#6b7280"
    color-text-inverse: "#0c0d0e"
    color-action-primary: "#fa5d29"
    color-action-hover: "#ea580c"
    color-action-active: "#c2410c"
    color-border-subtle: "#26282c"
    color-border-strong: "#374151"
    color-border-focus: "#fa5d29"
    color-status-success: "#10b981"
    color-status-warning: "#f59e0b"
    color-status-error: "#ef4444"
    color-status-info: "#3b82f6"
  typography:
    font_families:
      sans: "Geist, sans-serif"
      mono: "JetBrains Mono, monospace"
    scale:
      h1: "2.5rem"
      h2: "1.75rem"
      h3: "1.25rem"
      body: "1rem"
      body_small: "0.875rem"
      label: "0.875rem"
  spacing:
    space-1: "4px"
    space-2: "8px"
    space-4: "16px"
    space-6: "24px"
    space-8: "32px"
  radii:
    none: "0"
    sm: "4px"
    md: "6px"
    lg: "8px"
principles:
  - "Developer evidence before marketing assertion."
accessibility:
  tier: "WCAG 2.2 AA"
---
```

---

## Example Projects

Pure SaaS includes four reference implementations demonstrating distinct visual directions:

1. **[Developer Tool (`examples/developer-tool`)](examples/developer-tool/)**: HyperTrace — Technical clarity, 60/40 hero split with live eBPF terminal runner, tabular benchmark tables, and dark mode.
2. **[Creative Product (`examples/creative-product`)](examples/creative-product/)**: FrameCraft — Expressive display typography (Cabinet Grotesk), dynamic aspect-ratio canvas, and multi-track sequencer.
3. **[Editorial SaaS (`examples/editorial-saas`)](examples/editorial-saas/)**: Monograph — Literary serif typography (Newsreader), warm archival canvas, generous whitespace, and zero card containers.
4. **[Existing App Redesign (`examples/existing-app-redesign`)](examples/existing-app-redesign/)**: VaultGuard — Modernizes frontend UI into a high-density security console while strictly preserving Node/Express backend APIs, database models, and authentication contracts.

---

## Testing & Quality Assurance

Run the built-in test suite:

```bash
# Run all tests using Node.js native test runner
npm test

# Run individual test suites
npm run test:schemas
npm run test:tokens
npm run test:enforcement
npm run test:agents
```

Zero external npm dependencies are required to run tests or the CLI.

---

## Known Limitations

- **Browser-less Environments:** When running in an environment without headless browser tooling (e.g. standard terminal sandbox), Pure SaaS performs static code analysis and token verification. It will flag visual rendering and interactive keyboard trapping as "untested" rather than making false claims.
- **Dynamic CSS-in-JS:** The static source scanner parses CSS, Tailwind utility classes, HTML, JSX, TSX, Svelte, and Vue files. Highly dynamic runtime style computations (e.g. `style={{ color: dynamicHex }}`) should use token mappings or be marked with `/* pure-saas-ignore */`.

---

## Roadmap

### Completed in v1.0
- [x] Canonical agent-agnostic `SKILL.md` instruction set.
- [x] Persistent `design-brief.md` and `DESIGN.md` specifications.
- [x] Anti-slop review rules and typography hierarchy engine.
- [x] Zero-dependency Node.js CLI (`pure-saas.mjs` and wrapper scripts).
- [x] Token verification, source scanner, and export to CSS / Tailwind / JSON.
- [x] Integrations for Claude Code, Cursor, Codex, Windsurf, OpenCode, Gemini, and Generic.
- [x] 4 distinct example projects (Developer, Creative, Editorial, Existing App).
- [x] Automated test suite covering schemas, tokens, CLI, and agent conventions.

### Planned for Future Releases
- [ ] Headless browser screenshot comparison runner in CI.
- [ ] Automated color contrast calculation across composite alpha backgrounds.
- [ ] Design system migration script for legacy Figma token exports.
- [ ] Interactive terminal UI (`pure-saas studio`) for visual token tuning.

---

## Contributing

We welcome contributions from designers, engineers, and open-source contributors! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, development guidelines, and pull request procedures.

---

## License & Attribution

Pure SaaS is released under the [MIT License](LICENSE).

Conceptual inspirations and workflow insights from open-source projects (including `ui-ux-pro-max-skill` and `zero-slop-design-plugin`) are gratefully acknowledged in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Pure SaaS does not incorporate proprietary or uncleared materials.

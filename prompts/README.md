# Pure SaaS Portable Prompts

This directory provides copy-ready Markdown prompts for operating **Pure SaaS** across any AI coding agent or LLM interface (including Claude Code, Cursor, Codex, Windsurf, OpenCode, ChatGPT, Copilot, Aider, and Gemini).

---

## Global Entry Point

| Workflow | Prompt File | Command Equivalent | Purpose |
| :--- | :--- | :--- | :--- |
| **Universal Global Prompt** | [`pure-saas.md`](pure-saas.md) | `/pure-saas [request]` | Universal entry point for any design, implementation, refactoring, or audit task. Automatically chains necessary workflows. |

---

## Specialised Subcommands

| Workflow | Prompt File | Slash Command | Purpose |
| :--- | :--- | :--- | :--- |
| **Reference** | [`reference.md`](reference.md) | `/pure-saas reference [URL]` | Reverse-engineer visual reference via DevTools, author 16-section `DESIGN.md`, and recreate design language. |
| **Design** | [`design.md`](design.md) | `/pure-saas design [request]` | Establish or update root-level `DESIGN.md` specification before implementation. |
| **Build** | [`build.md`](build.md) | `/pure-saas build [request]` | Execute complete working implementation from scratch or within existing project. |
| **Audit** | [`audit.md`](audit.md) | `/pure-saas audit [scope]` | Comprehensive quality audit across hierarchy, responsive, accessibility (WCAG 2.2 AA), and performance. |
| **Fix** | [`fix.md`](fix.md) | `/pure-saas fix [request]` | Diagnose and resolve visual, layout, responsive, token, or interaction defects. |
| **Polish** | [`polish.md`](polish.md) | `/pure-saas polish [request]` | Raise visual craft, typography, surface lighting, micro-interactions, and custom SVGs. |
| **Responsive** | [`responsive.md`](responsive.md) | `/pure-saas responsive [request]`| Optimize layouts across 1440px desktop, 768px tablet, and 375px mobile viewports. |
| **Accessible** | [`accessible.md`](accessible.md) | `/pure-saas accessible [request]`| Enforce WCAG 2.2 AA, keyboard focus rings, semantic landmarks, and ARIA patterns. |
| **Motion** | [`motion.md`](motion.md) | `/pure-saas motion [request]` | Design and implement purposeful transitions, entrance reveals, and easing curves. |
| **Tokens** | [`tokens.md`](tokens.md) | `/pure-saas tokens [request]` | Create, inspect, validate, and export design tokens to CSS, Tailwind, or JSON. |
| **Component** | [`component.md`](component.md) | `/pure-saas component [request]`| Build or refactor reusable components across the full 8-state matrix. |
| **Verify** | [`verify.md`](verify.md) | `/pure-saas verify [request]` | End-to-end check of requirements, production builds, tests, and token consistency. |
| **System** | [`system.md`](system.md) | `/pure-saas system [request]` | Establish or evolve product-wide design foundations for incremental adoption. |
| **Migrate** | [`migrate.md`](migrate.md) | `/pure-saas migrate [request]`| Modernize legacy styling or tokens incrementally with zero regressions. |
| **Initialize** | [`init.md`](init.md) | `/pure-saas init` | Initialize starter `DESIGN.md` and `design-brief.md`. |
| **Review** | [`review.md`](review.md) | `/pure-saas review` | Legacy alias to `/pure-saas audit`. |

---

## How to Use These Prompts

1. **For agents with native slash commands (e.g. Claude Code, OpenCode):**
   Type `/pure-saas` or specialized commands like `/pure-saas build` directly in chat.
2. **For agents with rule/mention support (e.g. Cursor):**
   Type `@pure-saas`, `@pure-saas-build`, or `@pure-saas-audit` in Composer or chat.
3. **For standard chat interfaces or other agents (e.g. Windsurf, ChatGPT, Copilot, Aider):**
   Open the corresponding prompt file, copy the prompt text, fill in your specific product details if desired, and paste it into your chat session.

Every prompt is engineered to invoke the canonical instructions in `SKILL.md` and reference guides in `references/` without duplicating or contradicting them.

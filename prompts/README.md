# Pure SaaS Portable Prompts

This directory provides copy-ready Markdown prompts for operating **Pure SaaS** across any AI coding agent or LLM interface (including ChatGPT, Claude, Cursor, Windsurf, Copilot, Aider, and Gemini).

---

## Available Prompts

| Workflow | Prompt File | Native Slash Command (Where Supported) | Purpose |
| :--- | :--- | :--- | :--- |
| **Initialize Project** | [`init.md`](init.md) | `/pure-saas:init` | Initialize persistent `DESIGN.md` and `design-brief.md` starter specifications. |
| **Design / Redesign** | [`design.md`](design.md) | `/pure-saas:design` | Execute the full 9-stage Pure SaaS design workflow without AI slop. |
| **Audit & Review** | [`review.md`](review.md) | `/pure-saas:review` | Audit existing UI for visual quality, accessibility (WCAG 2.2 AA), responsiveness, and slop patterns. |
| **Fix Issues** | [`fix.md`](fix.md) | `/pure-saas:fix` | Remediate design defects while strictly preserving existing business logic, APIs, and DOM contracts. |
| **Tokens & Export** | [`tokens.md`](tokens.md) | `/pure-saas:tokens` | Validate `DESIGN.md`, scan source code for raw styling, and export tokens to CSS/Tailwind/JSON. |
| **Reference Analysis** | [`reference.md`](reference.md) | `/pure-saas:reference` | Deconstruct a live reference website, measure craft parameters, and synthesize into `DESIGN.md`. |

---

## How to Use These Prompts

1. **For agents with native slash commands (e.g. Claude Code, OpenCode):**
   Simply type `/pure-saas:design` or `/pure-saas:review` directly in chat.
2. **For agents with rule/mention support (e.g. Cursor):**
   Type `@pure-saas-design` or `@pure-saas-review` in Composer or chat.
3. **For standard chat interfaces or other agents (e.g. Windsurf, ChatGPT, Copilot, Aider):**
   Open the corresponding prompt file (e.g. `prompts/design.md`), copy the prompt text, fill in your specific product details if desired, and paste it into your chat session.

Every prompt is engineered to invoke the canonical instructions in `SKILL.md` and reference guides in `references/` without duplicating or contradicting them.


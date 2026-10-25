# Pure SaaS Portable Prompts

This directory provides copy-ready Markdown prompts for operating **Pure SaaS** across any AI coding agent or LLM interface (including Claude Code, Cursor, Codex, Windsurf, OpenCode, ChatGPT, Copilot, Aider, and Gemini).

---

## The Minimal Command Architecture

Pure SaaS provides **one intelligent main command and five specialist commands**:

| Command | Prompt File | Responsibility |
| :--- | :--- | :--- |
| **`/pure-saas [any request]`** | [`pure-saas.md`](pure-saas.md) | **Default for almost everything.** Intelligently coordinates design, implementation, components, tokens, motion, accessibility, responsiveness, performance, security, bug fixes, and verification without asking unnecessary questions. |
| **`/pure-saas design [request]`** | [`design.md`](design.md) | **Design direction & system definition.** Creates or updates root-level `DESIGN.md` specification before implementation. |
| **`/pure-saas polish [request]`** | [`polish.md`](polish.md) | **Visual & tactile craft elevation.** Refines typography, spacing, surface lighting, micro-interactions, and custom SVGs without rebuilding working logic. |
| **`/pure-saas review [scope]`** | [`review.md`](review.md) | **Evidence-based quality audit.** Identifies bugs, security weaknesses, accessibility problems, performance issues, and token drift. Prioritizes findings by severity without modifying files by default. |
| **`/pure-saas reference [URL]`** | [`reference.md`](reference.md) | **Reverse-engineer visual references.** Deep inspection via browser DevTools (DOM, computed styles, motion, assets) and recreates requested design language. |
| **`/pure-saas responsive [request]`**| [`responsive.md`](responsive.md) | **Cross-device layout optimization.** Diagnoses and fixes layout failures, horizontal overflow, touch targets, and navigation across mobile, tablet, and desktop. |

---

## How to Use These Prompts

1. **For agents with native slash commands (e.g. Claude Code, OpenCode):**
   Type `/pure-saas` or specialist commands like `/pure-saas polish` directly in chat.
2. **For agents with rule/mention support (e.g. Cursor):**
   Type `@pure-saas`, `@pure-saas-design`, `@pure-saas-polish`, `@pure-saas-review`, `@pure-saas-reference`, or `@pure-saas-responsive` in Composer or chat.
3. **For standard chat interfaces or other agents (e.g. Windsurf, ChatGPT, Copilot, Aider):**
   Open the corresponding prompt file, copy the prompt text, fill in your specific product details if desired, and paste it into your chat session.

Every prompt invokes the canonical instructions in `SKILL.md` and reference guides in `references/` without duplicating or contradicting them.

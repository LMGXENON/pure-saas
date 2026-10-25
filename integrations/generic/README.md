# Generic Coding Agent Integration for Pure SaaS

Pure SaaS can be used with any AI coding agent, web chat assistant, or developer tool (including Aider, GitHub Copilot, Continue.dev, Roo Code, etc.) that accepts system instructions or prompt context.

---

## Usage

### In Agent Prompts or Custom Instructions:
Append the contents of `SYSTEM_PROMPT.md` into your agent's system prompt or project instruction configuration (e.g. `.github/copilot-instructions.md`, `.continue/config.json`, or prompt prefix).

### File Placement:
Keep `DESIGN.md` in your project root so the agent can read and maintain it.

---

## Ready-to-Paste Prompts

For chat-based assistants (ChatGPT, Claude web, Copilot Chat, Aider):
Use the modular prompts in the [`prompts/`](../../prompts/) directory for specific tasks:

- [`prompts/init.md`](../../prompts/init.md): Initialize `DESIGN.md` and `design-brief.md`
- [`prompts/design.md`](../../prompts/design.md): Full 9-stage design/redesign workflow
- [`prompts/review.md`](../../prompts/review.md): Quality, accessibility & anti-slop audit
- [`prompts/fix.md`](../../prompts/fix.md): Remediate UI while preserving backend APIs
- [`prompts/tokens.md`](../../prompts/tokens.md): Validate and export design tokens
- [`prompts/reference.md`](../../prompts/reference.md): Deconstruct reference website into tokens


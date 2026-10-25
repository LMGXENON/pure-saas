# Pure SaaS Agent Integrations Architecture

Pure SaaS provides thin, portable adapters for AI coding agents. Rather than requiring complex runtime dependencies, each adapter conforms to the agent's documented configuration standard.

---

## Integration Matrix & Official Specification Compliance

| Platform / Agent | Official Configuration Format | Command / Invocation Method | Integration Classification | Integration Asset Path |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | Anthropic Skills Standard (`.claude/skills/`) | Native Slash Commands (`/pure-saas:*`) | **Tested Native Skill & Commands** | `integrations/claude-code/` |
| **Cursor** | Cursor 0.40+ MDC Rules (`.cursor/rules/*.mdc`) | Mention Invocations (`@pure-saas-*`) | **Tested Native Rules** | `integrations/cursor/` |
| **Codex** | Codex Plugin Manifest (`.codex-plugin/plugin.json`) | Plugin Actions & Portable Prompts | **Tested Native Plugin Manifest** | `integrations/codex/` |
| **OpenCode** | OpenCode Agent Convention (`.agents/skills/`) | Native Slash Commands (`/pure-saas:*`) | **Tested Native Skill & Commands** | `integrations/opencode/` |
| **Gemini CLI / Antigravity** | Gemini Project Context (`GEMINI.md`) & Antigravity Skills | Slash Commands & Skill Triggers | **Tested Native Context & Skill** | `integrations/gemini/` |
| **Windsurf (Cascade)** | Windsurf Global / Workspace Rules (`.windsurfrules`) | Rule Triggers & Portable Prompts | **Instruction-File Compatibility** | `integrations/windsurf/` |
| **Generic / Others** | System Prompt Injection (`SYSTEM_PROMPT.md`, `AGENTS.md`) | Copy-Ready Markdown Prompts | **Instruction-File Compatibility** | `integrations/generic/` |

---

## Detailed Integration Specifications

### 1. Claude Code (Tested Native Skill)
- **Official Specification:** Claude Code discovers skills located in `.claude/skills/<skill-name>/SKILL.md` (project-level) or `~/.claude/skills/<skill-name>/SKILL.md` (user-level).
- **Behavior:** When initialized, Claude Code inspects `SKILL.md` frontmatter (`name: pure-saas`, `description: ...`) and activates the 9-stage workflow during frontend tasks.
- **Reference:** [integrations/claude-code/README.md](claude-code/README.md)

### 2. Cursor (Tested Native Rules)
- **Official Specification:** Cursor 0.40+ supports `.cursor/rules/*.mdc` files containing frontmatter `description: ...`, `globs: ...`, and `alwaysApply: true`. Legacy versions support root `.cursorrules`.
- **Behavior:** Pure SaaS provides both formats:
  - `.cursor/rules/pure-saas.mdc` targeting frontend globs (`**/*.tsx`, `**/*.jsx`, `**/*.html`, `**/*.css`, `**/*.vue`, `**/*.svelte`).
  - `.cursorrules` for root repository-wide enforcement.
- **Reference:** [integrations/cursor/README.md](cursor/README.md)

### 3. Codex (Tested Native Plugin Manifest)
- **Official Specification:** OpenAI Codex plugins use `.codex-plugin/plugin.json` declaring name, version, description, entry skills, and capabilities.
- **Behavior:** Allows direct installation via `codex plugin add pure-saas@pure-saas` or local folder mounting.
- **Reference:** [integrations/codex/README.md](codex/README.md)

### 4. OpenCode (Tested Native Skill)
- **Official Specification:** OpenCode CLI discovers agent skills in `.agents/skills/` and catalogs them via `.agents/plugins/marketplace.json`.
- **Behavior:** Automatically exposes the `pure-saas` skill to OpenCode runtime sessions.
- **Reference:** [integrations/opencode/README.md](opencode/README.md)

### 5. Gemini CLI & Antigravity (Tested Native Context & Skill)
- **Official Specification:** Google Gemini CLI reads root `GEMINI.md` as permanent prompt context. Antigravity engines load skills from `~/.gemini/antigravity/skills/`.
- **Behavior:** Guarantees that token discipline and anti-slop rules are present on every assistant prompt turn.
- **Reference:** [integrations/gemini/README.md](gemini/README.md)

### 6. Windsurf / Cascade (Instruction-File Compatibility)
- **Official Specification:** Codeium Windsurf reads `.windsurfrules` in the workspace root to inject instructions into Cascade.
- **Classification:** While natively read by the IDE, it operates via context injection rather than an executable plugin sandbox.
- **Reference:** [integrations/windsurf/README.md](windsurf/README.md)

### 7. Generic / Aider / Copilot / Continue (Instruction-File Compatibility)
- **Official Specification:** Uses standard markdown system prompt injection (`SYSTEM_PROMPT.md`) or universal agent documentation (`AGENTS.md`).
- **Classification:** Compatible with any LLM harness capable of reading project markdown instructions.
- **Reference:** [integrations/generic/README.md](generic/README.md)

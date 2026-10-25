# OpenCode Integration for Pure SaaS

Pure SaaS integrates with OpenCode agent harnesses using standard `.agents` plugin conventions.

---

## Installation

Add Pure SaaS to your project or user agent directory:

```bash
mkdir -p .agents/skills
cp -r /path/to/pure-saas .agents/skills/pure-saas
```

Or configure `.agents/plugins/marketplace.json` to include Pure SaaS as a verified design skill.

---

## Native Slash Commands in OpenCode

OpenCode discovers slash commands from `.opencode/commands/` or plugin manifests:

```bash
mkdir -p .opencode/commands
cp -r node_modules/pure-saas/commands/* .opencode/commands/
```

| Command | Description | Example Invocation |
| :--- | :--- | :--- |
| `/pure-saas:init` | Initialize starter `DESIGN.md` and brief | `/pure-saas:init` |
| `/pure-saas:design` | Full 9-stage design/redesign workflow | `/pure-saas:design developer console` |
| `/pure-saas:review` | Audit existing UI for accessibility & slop | `/pure-saas:review src/` |
| `/pure-saas:fix` | Fix UI defects preserving backend APIs | `/pure-saas:fix contrast and hex violations` |
| `/pure-saas:tokens` | Validate and export tokens | `/pure-saas:tokens css` |
| `/pure-saas:reference` | Deconstruct reference website into tokens | `/pure-saas:reference https://convio.dev/` |

For environments without slash command support, use copy-paste prompts from [`prompts/`](../../prompts/).


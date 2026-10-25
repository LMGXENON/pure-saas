# Gemini CLI & Antigravity Integration for Pure SaaS

Pure SaaS integrates with Google Gemini CLI and Antigravity AI coding agents via `GEMINI.md` project context and native skills.

---

## Installation

### Method 1: Project-Level Context (`GEMINI.md`)
Copy `GEMINI.md` into your repository root:
```bash
cp integrations/gemini/GEMINI.md GEMINI.md
```

### Method 2: Antigravity Skill
Install into your local skills directory:
```bash
mkdir -p ~/.gemini/skills/pure-saas
cp -r . ~/.gemini/skills/pure-saas
```

---

## Behavior & Available Workflows

Gemini CLI and Antigravity will automatically follow the 9-stage Pure SaaS workflow, enforce anti-slop rules, generate persistent `DESIGN.md` specifications, and run validation scripts.

Invoke workflows via slash commands (where supported by your Antigravity/Gemini shell) or copy-paste prompts from `prompts/`:

| Workflow | Command Trigger | Portable Prompt | Purpose |
| :--- | :--- | :--- | :--- |
| **Initialize** | `/pure-saas:init` | [`prompts/init.md`](../../prompts/init.md) | Initialize `DESIGN.md` and `design-brief.md` |
| **Design / Redesign** | `/pure-saas:design` | [`prompts/design.md`](../../prompts/design.md) | Full 9-stage design workflow |
| **Audit & Review** | `/pure-saas:review` | [`prompts/review.md`](../../prompts/review.md) | Quality, accessibility & anti-slop audit |
| **Fix Issues** | `/pure-saas:fix` | [`prompts/fix.md`](../../prompts/fix.md) | Remediate UI while preserving backend APIs |
| **Tokens & Export** | `/pure-saas:tokens` | [`prompts/tokens.md`](../../prompts/tokens.md) | Validate and export tokens |
| **Reference Analysis** | `/pure-saas:reference` | [`prompts/reference.md`](../../prompts/reference.md) | Deconstruct reference website into `DESIGN.md` |


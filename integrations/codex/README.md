# Codex Integration for Pure SaaS

Pure SaaS integrates with OpenAI Codex and Codex CLI harnesses to govern frontend code generation with persistent design systems and deterministic token validation.

---

## Installation

### Method 1: Plugin Add
```bash
codex plugin marketplace add pure-saas/pure-saas
codex plugin add pure-saas@pure-saas
```

### Method 2: Local Manifest
Copy the plugin definition into your project:
```bash
mkdir -p .codex-plugin
cp integrations/codex/.codex-plugin/plugin.json .codex-plugin/plugin.json
```

---

## Usage in Codex

When prompted for frontend, UI, or styling work, Codex will automatically adhere to `SKILL.md` rules and validate output against `DESIGN.md`.

### Workflows and Prompt Fallbacks

Codex supports the 6 Pure SaaS workflows via plugin actions or copy-ready prompts from `prompts/`:

| Workflow | Plugin Action / Command | Portable Prompt | Purpose |
| :--- | :--- | :--- | :--- |
| **Initialize** | `/pure-saas:init` | [`prompts/init.md`](../../prompts/init.md) | Initialize `DESIGN.md` and `design-brief.md` |
| **Design / Redesign** | `/pure-saas:design` | [`prompts/design.md`](../../prompts/design.md) | Full 9-stage design workflow |
| **Audit & Review** | `/pure-saas:review` | [`prompts/review.md`](../../prompts/review.md) | Quality, accessibility & anti-slop audit |
| **Fix Issues** | `/pure-saas:fix` | [`prompts/fix.md`](../../prompts/fix.md) | Remediate UI while preserving backend APIs |
| **Tokens & Export** | `/pure-saas:tokens` | [`prompts/tokens.md`](../../prompts/tokens.md) | Validate and export tokens |
| **Reference Analysis** | `/pure-saas:reference` | [`prompts/reference.md`](../../prompts/reference.md) | Deconstruct reference website into `DESIGN.md` |


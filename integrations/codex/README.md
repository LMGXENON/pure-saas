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


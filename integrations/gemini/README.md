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

## Behavior
Gemini will automatically follow the 9-stage Pure SaaS workflow, enforce anti-slop rules, generate persistent `DESIGN.md` specifications, and run validation scripts.

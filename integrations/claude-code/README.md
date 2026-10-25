# Claude Code Integration for Pure SaaS

Pure SaaS integrates directly with Claude Code as a native skill or project plugin.

---

## Installation Methods

### Method 1: Project-Level Skill (Recommended for Repositories)
Place or symlink the Pure SaaS skill into your repository's `.claude/skills/` directory:

```bash
mkdir -p .claude/skills
ln -s /path/to/pure-saas .claude/skills/pure-saas
# or clone directly:
git clone https://github.com/pure-saas/pure-saas.git .claude/skills/pure-saas
```

### Method 2: Global User-Level Skill
To make Pure SaaS available in every project you open with Claude Code:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/pure-saas/pure-saas.git ~/.claude/skills/pure-saas
```

### Method 3: Plugin Marketplace
If using the Claude Code plugin marketplace:
```bash
/plugin marketplace add pure-saas/pure-saas
/plugin install pure-saas@pure-saas
```

---

## How It Activates in Claude Code

Claude Code automatically activates Pure SaaS when you prompt it with tasks involving:
- Designing or redesigning web pages or SaaS interfaces.
- Generating a `DESIGN.md` design system.
- Auditing existing markup for AI slop or generic patterns.
- Checking token consistency and accessibility.

You can also trigger it explicitly:
> "Claude, use the Pure SaaS skill to create a design brief and DESIGN.md for our developer API platform."

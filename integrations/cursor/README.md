# Cursor Integration for Pure SaaS

Integrate Pure SaaS into Cursor to enforce intentional design systems, semantic tokens, and anti-slop rules in all frontend code generation.

---

## Installation

### Option A: Cursor Rules (`.cursor/rules/pure-saas.mdc`) - Recommended for Cursor 0.40+
Copy `.cursor/rules/pure-saas.mdc` into your project:

```bash
mkdir -p .cursor/rules
cp integrations/cursor/.cursor/rules/pure-saas.mdc .cursor/rules/pure-saas.mdc
```

### Option B: Root `.cursorrules`
Copy the `.cursorrules` file to your project root:

```bash
cp integrations/cursor/.cursorrules .cursorrules
```

---

## Behavior
Cursor will enforce:
- Creation of `DESIGN.md` before generating complex UI components.
- Semantic tokens instead of arbitrary Tailwind or raw hex styling.
- Elimination of generic AI gradient meshes and repetitive 3-column cards.
- Automated validation via `node scripts/pure-saas.mjs validate`.


# Cursor Integration for Pure SaaS

Integrate Pure SaaS into Cursor to enforce intentional design systems, semantic tokens, and anti-slop rules in all frontend code generation.

---

## Installation

### Option A: Cursor Rules (`.cursor/rules/*.mdc`) - Recommended for Cursor 0.40+
Copy the rules into your project's `.cursor/rules/`:

```bash
mkdir -p .cursor/rules
cp -r node_modules/pure-saas/integrations/cursor/.cursor/rules/* .cursor/rules/
```

This installs:
- `pure-saas.mdc`: Active across all frontend files (`alwaysApply: true`).
- 6 workflow rules callable on-demand via `@` mention.

### Option B: Root `.cursorrules`
Copy the `.cursorrules` file to your project root:

```bash
cp integrations/cursor/.cursorrules .cursorrules
```

---

## Workflow Invocations in Cursor

> [!NOTE]
> Cursor does not support third-party custom `/slash` commands (slash commands in Cursor are built-in IDE primitives). In Cursor Composer or Chat, invoke Pure SaaS workflows by mentioning the corresponding rule or pasting from `prompts/`:

| Workflow | Cursor Mention | Fallback Prompt | Purpose |
| :--- | :--- | :--- | :--- |
| **Initialize Project** | `@pure-saas-init` | [`prompts/init.md`](../../prompts/init.md) | Initialize `DESIGN.md` and `design-brief.md` |
| **Design / Redesign** | `@pure-saas-design` | [`prompts/design.md`](../../prompts/design.md) | Execute full 9-stage workflow |
| **Audit & Review** | `@pure-saas-review` | [`prompts/review.md`](../../prompts/review.md) | Inspect UI for accessibility, contrast, and AI slop |
| **Fix Issues** | `@pure-saas-fix` | [`prompts/fix.md`](../../prompts/fix.md) | Remediate UI defects while preserving backend APIs |
| **Tokens & Export** | `@pure-saas-tokens` | [`prompts/tokens.md`](../../prompts/tokens.md) | Validate and export tokens to CSS/Tailwind/JSON |
| **Reference Analysis** | `@pure-saas-reference` | [`prompts/reference.md`](../../prompts/reference.md) | Deconstruct reference website into `DESIGN.md` |

---

## Behavior
Cursor will enforce:
- Creation of `DESIGN.md` before generating complex UI components.
- Semantic tokens instead of arbitrary Tailwind or raw hex styling.
- Elimination of generic AI gradient meshes and repetitive 3-column cards.
- Automated validation via `node scripts/pure-saas.mjs validate`.


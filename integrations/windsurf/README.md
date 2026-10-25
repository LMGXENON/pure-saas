# Windsurf Integration for Pure SaaS

Integrate Pure SaaS into Codeium Windsurf and the Cascade agent.

---

## Installation

Copy `.windsurfrules` to the root of your project:

```bash
cp integrations/windsurf/.windsurfrules .windsurfrules
```

---

## What Cascade Follows

When Cascade processes frontend or design requests:
1. Discovers existing styles and checks for `DESIGN.md`.
2. Replaces generic AI templates with product-specific compositions.
3. Generates semantic CSS variables or Tailwind tokens adhering to the Pure SaaS schema.
4. Validates design output using `node scripts/pure-saas.mjs validate`.


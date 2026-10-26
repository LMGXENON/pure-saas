# Design Systems: 3-Tier Token Architecture & Contracts

Use `/pure-saas design` or this playbook to construct, manage, and export design tokens using standard 3-tier hierarchy and DTCG conventions.

---

## 1. 3-Tier Token Hierarchy

```
[Tier 1: Global Primitives]   raw values (blue-500: #2563eb, slate-900: #0f172a, space-4: 16px)
         │
         ▼
[Tier 2: Semantic Tokens]     role-based intent (color-action-primary, color-bg-canvas, space-card)
         │
         ▼
[Tier 3: Component Tokens]    scoped bindings (btn-primary-bg: var(--color-action-primary))
```

Application code MUST ONLY consume **Tier 2 (Semantic)** or **Tier 3 (Component)** tokens. Consuming Tier 1 primitives directly in UI components is prohibited.

---

## 2. Persistent `DESIGN.md` Contract

Every Pure SaaS project maintains a root `DESIGN.md` containing:
- Frontmatter metadata: title, product archetype, style archetype, status (`draft` / `approved`), and the `unresolved` ledger.
- Semantic Color System (Light & Dark pairs with contrast measurements).
- Fluid Typographic Scale formulas.
- 8pt Spatial Grid definitions.
- Geometry & Elevation rules (radii, borders, shadows).
- Component Contracts.

---

## 3. Token Export

Export `DESIGN.md` tokens into production formats:
```bash
# CSS Custom Properties
npx pure-saas export-tokens DESIGN.md --format css --out src/tokens.css

# Tailwind v4 @theme CSS
npx pure-saas export-tokens DESIGN.md --format tailwind-v4 --out src/theme.css

# DTCG Standard JSON
npx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json
```

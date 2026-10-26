# Pure SaaS Official Website & Documentation Portal

This directory contains the complete, production-ready website for **Pure SaaS** — the universal AI-agent skill and design enforcement toolkit.

The website functions as:
1. **The official marketing website:** High-conversion value proposition, Apple-grade visual polish, interactive before-and-after showcases.
2. **The official documentation portal:** Searchable guides on the 5-tier precedence model, anti-slop rules, 8-state component matrix, and verification protocols.
3. **The interactive reference explorer:** Direct access to 260+ architectural reference guides, Apple HIG documents, and framework manuals.
4. **The comprehensive practical guide:** Teaching developers how to install, configure, invoke, and master Pure SaaS across Claude Code, Cursor, Windsurf, Copilot, and Gemini.

---

## Technical Stack & Architecture

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with Pure SaaS semantic tokens (`--color-canvas`, `--color-surface-base`, `--color-accent-primary`)
- **Routing:** React Router v6 with direct navigation, scroll restoration, and 404 fallback
- **Icons:** Lucide React
- **Theme Support:** Dark & Light modes with automatic OS detection and anti-flash blocking head script
- **Search:** Global `Cmd+K` client-side fuzzy search across commands, CLI tools, docs, and 260+ references
- **Zero External Runtime Dependencies:** Builds to pure static assets (`dist/`) deployable anywhere

---

## Local Development & Build

```bash
# 1. Navigate to the website directory
cd pure-saas-website

# 2. Install dependencies
npm install

# 3. Start local development server (http://localhost:3000)
npm run dev

# 4. Run TypeScript type checks
npm run lint

# 5. Build for production
npm run build

# 6. Preview production build locally
npm run preview
```

---

## Independent Deployment

This folder is completely independent of the parent repository's runtime. You can copy the `pure-saas-website/` directory into its own standalone GitHub repository and deploy it to any static web host:

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Netlify
```bash
npx netlify deploy --dir=dist --prod
```

### Deploy to Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name pure-saas
```

---

## Page Route Map

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | Home | Hero value prop, copyable quickstart, before/after slider, 4 pillars, command suite preview |
| `/showcase` | Showcase | Interactive before-and-after comparisons between generic AI slop and Pure SaaS production UI |
| `/get-started` | Get Started | 10-step practical onboarding journey with agent-specific installation commands |
| `/docs` | Documentation | Searchable documentation portal covering architecture, precedence, anti-slop, and state matrices |
| `/commands` | Commands | In-depth guide and decision matrix for the universal `/pure-saas` and 5 specialist commands |
| `/cli` | CLI Manual | Documentation and options for all CLI subcommands (`validate`, `contrast`, `diff`, `drift`, `check`, etc.) |
| `/references` | Reference Explorer | Interactive explorer for all 260+ reference guides with category filters and live search |
| `*` | 404 Not Found | Polished error state with suggested navigation links |

---

## License

MIT © Pure SaaS Contributors

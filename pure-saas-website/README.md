# Pure SaaS Official Website & Documentation Portal

This directory contains the complete, production-ready website for **Pure SaaS** — the skill and design toolkit for AI coding agents.

The website functions as:
1. **The official product website:** Minimal, Apple-inspired introduction explaining how Pure SaaS helps AI coding agents build better SaaS interfaces.
2. **The community showcase:** A curated gallery of real websites created by people using Pure SaaS, with a community submission workflow.
3. **The GitBook-style documentation portal:** Onboarding, practical guides, command references, and troubleshooting.
4. **The CLI & technical manual:** Options for validation, contrast audits, and token exports.

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
| `/` | Home | Product introduction, copyable quickstart, live demonstration, how it works |
| `/showcase` | Showcase | Community gallery of real websites created with Pure SaaS, project detail views, submission form |
| `/docs` | Documentation | GitBook-style portal with Getting Started as first section, practical guides, commands, CLI, troubleshooting |
| `/commands` | Commands | Compact overview and quick-selection table for the 6 slash commands |
| `/cli` | CLI Manual | Usage, syntax, supported features, and troubleshooting |
| `/references` | Reference Explorer | Technical reference explorer |
| `/get-started` | Redirect | Redirects to `/docs?slug=getting-started-introduction` |
| `*` | 404 Not Found | Error state with suggested navigation links |

---

## License

MIT © Pure SaaS Contributors


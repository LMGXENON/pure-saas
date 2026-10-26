# CLAUDE.md

Claude Code project instructions for Pure SaaS.

## Invoking Pure SaaS Workflows
- **Principal Designer (Main):** `/pure-saas [request]`
- **Creative Director & Builder:** `/pure-saas design [brief]`
- **Senior Visual Designer:** `/pure-saas polish [target]`
- **Independent Design Critic:** `/pure-saas review [scope]`
- **Reference Analyst:** `/pure-saas reference <url>`
- **Responsive Systems Engineer:** `/pure-saas responsive [target]`

## Supporting Tooling
- Review & audit: `pure-saas audit --source src`
- Context inspection: `pure-saas context`
- Health & diagnostics: `pure-saas doctor`
- Style registry: `pure-saas style list`
- Browser screenshots: `pure-saas browser screenshot <url>`

## Design & Engineering Rules
1. Never generate raw hex colors or arbitrary brackets in JSX/HTML. All styling must resolve to tokens in `DESIGN.md`.
2. Honor surface modes: Persuade (landing pages) gets bold creative direction and real interactive previews; Operate (dashboards) gets density and restraint.
3. Enforce the craft floor: 1px hairline borders, optical tracking (-0.025em on headings), tabular-nums on numbers, and 8-state components.
4. Verify results by inspecting real browser screenshots at 1440px, 768px, and 375px.

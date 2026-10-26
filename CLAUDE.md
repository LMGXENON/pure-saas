# CLAUDE.md

Claude Code project instructions for Pure SaaS.

## Independent Slash Commands
- **Main Orchestrator:** `/puresaas [request]`
- **Creative Director & Builder:** `/puresaas:design [brief]`
- **Senior Visual Designer:** `/puresaas:polish [target]`
- **Independent Design Critic:** `/puresaas:review [scope]`
- **Reference Analyst & Cloning Engineer:** `/puresaas:clone <url-or-image>`
- **Responsive Systems Engineer:** `/puresaas:responsive [target]`

## Supporting Tooling
- Spatial Reasoning Playbook: `skill/reference/spatial-reasoning.md`
- Review & audit: `pure-saas audit --source src`
- Context inspection: `pure-saas context`
- Health & diagnostics: `pure-saas doctor`
- Style registry: `pure-saas style list`
- Browser screenshots: `pure-saas browser screenshot <url>`

## Spatial Reasoning & Engineering Rules
1. **Single Gutter Line (`x = 0`):** Align kicker, heading, subtext, actions, and card borders to a shared vertical axis. No arbitrary indents.
2. **Optical vs. Geometric Alignment:** Use `items-start mt-0.5` or `mt-1` for multi-line text with icons. Lock form labels with $\le 6\text{px}$ gap.
3. **Proximity Math:** Enforce $\text{Outer Padding} \ge 1.5 \times \text{Inner Gap}$ on all containers. Enforce $\text{Above} \ge 2.5 \times \text{Below}$ on heading vertical rhythm.
4. **Anchor & Orbit Asymmetry:** Forbid symmetrical 3-column card vomits. Pair 60%–66% hero anchors with 34%–40% secondary rails.
5. **Operational Consoles:** Use top console app bars with `⌘K` command pills instead of dead-weight sidebars. Use `font-tabular` on all metrics and slide-over drawers for inspection.
6. **Zero AI Slop:** No raw hex colors, no purple gradient headings, no green pulsing dots (`animate-ping`), no emoji interface icons.
7. **Display Tracking:** Apply `-0.025em` (`tracking-tight`) on display headings $\ge 24\text{px}$.
8. **Verify:** Capture real browser screenshots at 1440px, 768px, and 375px.

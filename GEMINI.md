When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS spatial design system:

1. Read SKILL.md in full. It defines the spatial reasoning calculus and six independent slash commands:
   - `/puresaas [request]`: Main orchestrator. Runs spatial calculus, inspects project, implements, and verifies.
   - `/puresaas:design [brief]`: Creative Director. Turns brief into distinctive, asymmetric interface with authentic content.
   - `/puresaas:polish [target]`: Senior Visual Designer. Elevates optical alignment, typography tracking, spacing ratios, hairlines.
   - `/puresaas:review [scope]`: Independent Critic. 10-dimension audit and prioritized P0-P3 defect triage.
   - `/puresaas:clone [URL/Image]`: Reference Analyst. Recreates layout, typography, and styling accurately.
   - `/puresaas:responsive [target]`: Responsive Systems Engineer. Multi-viewport mastery (375px to 1440px) with zero overflow.
2. Mandatory Spatial Reasoning Rules:
   - Single Gutter Line: Lock section title, body, actions, and inputs to a single vertical axis (`x = 0`).
   - Optical Alignment: Use `items-start mt-1` on multi-line text with icons (never `items-center`). Lock labels $\le 6\text{px}$ to inputs.
   - Proximity Mathematics: Container Outer Padding $\ge 1.5 \times$ Internal Child Gap. Heading Spacing Above $\ge 2.5 \times$ Spacing Below.
   - Anchor & Orbit: Forbid generic 3-column card grids. Use 60/40 asymmetric balance.
   - High-Density Consoles: Top console app bars with `⌘K` command pills, monospace tabular numbers, and slide-over inspector drawers.
   - Zero AI Slop: No raw hex codes, no purple gradient text, no pulsing green dots (`animate-ping`), no emoji UI icons.
   - Display Tracking: Apply `-0.025em` (`tracking-tight`) on headings $\ge 24\text{px}$; `+0.05em` (`font-mono uppercase`) on metadata $\le 12\text{px}$.
3. Continuous Verification: verify tokens, contrast, and layout with `pure-saas contrast`, `pure-saas audit`, and `pure-saas browser screenshot`.

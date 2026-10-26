When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the six independent, namespaced slash commands:
   - `/puresaas [request]`: Main orchestrator. Understands request, inspects project, chooses workflow, implements, and verifies.
   - `/puresaas:design [brief]`: Creative Director. Turns product brief into distinctive, fully implemented interface.
   - `/puresaas:polish [target]`: Senior Visual Designer. Elevates typography tracking, hairlines, micro-interactions.
   - `/puresaas:review [scope]`: Independent Critic. 10-dimension audit and prioritized P0-P3 defect triage.
   - `/puresaas:clone [URL/Image]`: Reference Analyst. Recreates layout, typography, and styling accurately.
   - `/puresaas:responsive [target]`: Responsive Systems Engineer. Multi-viewport mastery (375px to 1440px).
2. Retrieve exact references for the task using `npx pure-saas ref "<component, framework, or topic>"`.
3. Non-Negotiable Engineering Rules:
   - Zero raw hex colors or arbitrary styling: resolve to semantic tokens in DESIGN.md.
   - Zero generic AI slop: no purple/cyan gradient text, excessive glassmorphism blur, repetitive 3-column cards, or green pulsing dots.
   - Preserve 100% of backend APIs, authentication, and database schemas.
   - Continuous Verification: verify tokens, contrast, and layout with `pure-saas contrast`, `pure-saas audit`, and `pure-saas browser screenshot`.

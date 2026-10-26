When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the stance, universal execution behaviors, the 6 core workflows,
   the 8-state component matrix, semantic token architecture, and honest verification reporting.
2. Load references based on the task under references/:
   - Base context: references/design-principles.md, typography.md, color-and-tokens.md, layout-and-composition.md, anti-slop-rules.md.
   - Design intelligence & taxonomy: references/design-intelligence.json, design-styles-catalog.json.
   - Quality audit & code checks: references/code-audit.md, design-review.md.
   - Components & states: references/interaction-states.md, accessibility.md.
   - Responsive & platforms: references/responsive-design.md, cross-platform.md, hig-lookup.md, platform-guidelines.md.
   - Motion & physics: references/motion.md.
   - Reference URL recreation: references/reference-analysis.md.
3. Universal Command: Use `/pure-saas [request]` as the default entry point. It autonomously coordinates
   design specification, component building, token enforcement, accessibility, motion, and verification.
4. Specialist Commands:
   - `/pure-saas design [request]`: Establish or update DESIGN.md and design-brief.md.
   - `/pure-saas polish [request]`: Elevate typography tracking, surface lighting, and micro-interactions.
   - `/pure-saas review [request]`: 4-part evidence audit (Finding, Evidence, Impact, Concrete Fix).
   - `/pure-saas reference [URL]`: Deconstruct live reference site into 16-section DESIGN.md specification.
   - `/pure-saas responsive [request]`: Optimize across mobile (375px), tablet (768px), laptop (1024px), desktop (1440px+).
5. Non-Negotiable Engineering Rules:
   - Zero raw hex colors or arbitrary values: all styling must resolve to semantic tokens in DESIGN.md.
   - Anti-slop discipline: no generic purple/cyan gradient text, excessive glassmorphism blur, or emoji UI icons.
   - Non-regression: in existing applications, preserve 100% of backend APIs, authentication, and database schemas.
   - "Read Before You Cite": open reference files and cite exact file and section paths.

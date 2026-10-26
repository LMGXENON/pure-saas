When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the stance, universal execution behaviors, the 6 core workflows,
   the 8-state component matrix, semantic token architecture, and honest verification reporting.
2. Retrieve exact references for the task using `npx pure-saas ref "<component, framework, or topic>"`:
   - Component patterns (57 UI components): references/hig/buttons.md, sheets.md, modality.md, tables.md, etc.
   - Framework guidelines (22 stacks): references/frameworks/react.md, svelte.md, vue.md, tailwind.md, etc.
   - Base context: references/design-principles.md, typography.md, color-and-tokens.md, layout-and-composition.md, anti-slop-rules.md.
   - Quality audit & code checks: references/code-audit.md, design-review.md.
   - Components & states: references/interaction-states.md, accessibility.md.
   - Responsive & platforms: references/responsive-design.md, cross-platform.md, platform-guidelines.md.
   - Motion & physics: references/motion.md.
   - Interactive backgrounds & shaders: references/backgrounds.md, references/backgrounds/*.md.
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
   - Follow the 5-Tier Precedence Model: 1) User & existing brand; 2) Platform (Apple HIG/Web) & WCAG 2.2 AA; 3) Approved DESIGN.md tokens; 4) Retrieved intelligence; 5) Explicitly identified proposals with unresolved items.
   - Zero raw hex colors or arbitrary values: all styling must resolve to semantic tokens in DESIGN.md.
   - Anti-slop discipline: no generic purple/cyan gradient text, excessive glassmorphism blur, or emoji UI icons.
   - Non-regression: in existing applications, preserve 100% of backend APIs, authentication, and database schemas.
   - "Read Before You Cite": open reference files and cite exact file and section paths using `npx pure-saas ref` and `npx pure-saas query`.
   - Continuous Verification: verify tokens, contrast, and drift with `pure-saas contrast`, `pure-saas diff`, `pure-saas drift`, and `pure-saas check --known`.


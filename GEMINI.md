When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the stance, universal execution behaviors, the 6 core workflows,
   the 8-state component matrix, semantic token architecture, and honest verification reporting.
2. Retrieve exact references for the task using `npx pure-saas ref "<component, framework, or topic>"` or consult the master index at `references/reference-index.md`:
   - Component guides (20 primitives): references/components/*.md (button.md, modal-dialog.md, data-table.md, etc.)
   - Layout blueprints (12 patterns): references/layouts/*.md (saas-dashboard.md, marketing-hero.md, pricing-matrix.md, etc.)
   - Design systems & tokens: references/design-systems/*.md (tokens, naming, color palettes, fluid typography, grids)
   - UX & interaction patterns: references/ux-patterns/*.md (shortcuts, focus traps, skeletons, empty states, validation)
   - Visual craft & polish: references/visual-craft/*.md (apple polish, materials blur, lighting models, spring physics)
   - Frontend engineering: references/frontend-engineering/*.md (compound components, virtualization, RSC boundaries, vitals)
   - Accessibility (WCAG 2.2 AA): references/accessibility/*.md (conformance matrix, contrast, ARIA, target size 2.5.8)
   - Theming: references/theming/*.md (dark mode inversion, runtime CSS variables, system preference detection)
   - Developer tooling: references/developer-tooling/*.md (token linting, Stylelint, visual regression, contrast CI)
   - Real-world flows: references/real-world-flows/*.md (auth lifecycle, billing checkouts, multi-tenancy, audit logs)
   - Design analysis & reverse engineering: references/design-analysis/*.md & references/reference-analysis.md
   - Responsive & ergonomics: references/responsive/*.md & references/responsive-design.md
   - Apple HIG (124 topics): references/hig/*.md (buttons.md, sheets.md, modality.md, etc.)
   - Framework guidelines (22 stacks): references/frameworks/react.md, svelte.md, vue.md, tailwind.md, etc.
   - Interactive backgrounds & shaders (15 shaders): references/backgrounds.md, references/backgrounds/*.md.
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
   - Anti-slop discipline: no generic purple/cyan gradient text, excessive glassmorphism blur, emoji UI icons, or green pulsing/pinging circular status dots.
   - Non-regression: in existing applications, preserve 100% of backend APIs, authentication, and database schemas.
   - "Read Before You Cite": open reference files and cite exact file and section paths using `npx pure-saas ref` and `npx pure-saas query`.
   - Continuous Verification: verify tokens, contrast, and drift with `pure-saas contrast`, `pure-saas diff`, `pure-saas drift`, and `pure-saas check --known`.


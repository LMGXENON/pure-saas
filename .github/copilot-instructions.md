When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the stance, surface modes (Persuade, Operate, Read, Experience),
   the 8-step build loop, the 8-state component matrix, semantic token architecture, and honest verification.
2. Retrieve exact references for the task using `npx pure-saas ref "<component, framework, or topic>"`.
3. Universal Command: Use `/pure-saas [request]` as the default entry point.
4. Specialist Verbs:
   - `design`: Establish or update DESIGN.md before coding.
   - `landing`: High-conversion SaaS landing page with hero, proof, and pricing.
   - `polish`: Elevate typography tracking, surface lighting, micro-interactions.
   - `bolder` / `quieter`: Amplify bland UI or calm overstimulated layouts.
   - `typeset` / `layout`: Editorial typography and 8pt spatial grid rhythm.
   - `review`: 5-dimension deterministic audit (A11y, Perf, Theming, Responsive, Integrity) scored 0–20.
   - `browser`: Playwright CLI headless browser automation & multi-viewport screenshots.
   - `3d`: Procedural Three.js 3D model synthesis from reference images.
5. Non-Negotiable Engineering Rules:
   - Zero raw hex colors or arbitrary styling: resolve to semantic tokens in DESIGN.md.
   - Zero generic AI slop: no purple/cyan gradient text, excessive glassmorphism blur, repetitive 3-column cards, or green pulsing dots.
   - Preserve 100% of backend APIs, authentication, and database schemas.
   - Continuous Verification: verify tokens, contrast, and layout with `pure-saas contrast`, `pure-saas audit`, and `pure-saas browser screenshot`.

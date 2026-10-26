# Pure SaaS: Universal Command (`/pure-saas`)

The universal entry point and intelligent default for UI/UX design, implementation, refactoring, accessibility, motion, components, tokens, bug fixes, and verification.

## Usage

```bash
/pure-saas [any natural-language request or specialist command]
```

**Request:** `$ARGUMENTS`

---

## 1. Intent Understanding & Specialist Command Dispatch

Inspect the request:

### A. Specialist Subcommands
If the request begins with one of the specialist commands, execute that focused workflow:
- `design [request]` → Establish or update root-level `DESIGN.md` specification before implementation.
- `polish [request]` → Elevate visual craft, typography, spacing, surface lighting, and micro-interactions without rebuilding working logic.
- `review [request or scope]` → Rigorous, 5-dimension deterministic quality audit (A11y, Performance, Theming, Responsive, Integrity) with P0–P3 defect triage.
- `reference [URL]` → Reverse-engineer visual reference via browser DevTools and recreate requested design language into a 16-section `DESIGN.md`.
- `responsive [request]` → Fix and optimize layouts across mobile, tablet, laptop, and desktop viewports.
- `browser [action] [url]` → Execute token-conscious browser automation, multi-viewport screenshots, and live page verification via Playwright CLI.
- `3d [action]` → Synthesize procedural, code-only Three.js 3D models in TypeScript from 2D images or scaffold parametric 3D components.

### B. Natural-Language Request (Default Execution Engine)
For all other requests, `/pure-saas` is the default. It understands the user's intent, inspects the existing project context, determines the right capabilities, and completes the task autonomously without forcing the user to pick manual workflows or answer unnecessary questions.

### C. Reference Retrieval & Design Intelligence Routing
Before performing design or implementation work, retrieve exact reference documents and intelligence:
```bash
# Retrieve reference documents across Apple HIG, 22 frameworks, and craft guides
npx pure-saas ref "<component, framework, platform, or topic>"

# Query multi-domain design intelligence (styles, products, colors, typography, UX heuristics, landing, charts, motion)
npx pure-saas query [domain] "<keyword or query>"
npx pure-saas style "<query>" --product "<type>" --stack "<stack>"
```

It automatically coordinates:
- **Design & Specification:** Creates or updates `DESIGN.md` when the scope warrants it.
- **Full Implementation:** Builds real components, routing, states, and functionality—never stopping at a static scaffold or preliminary mockup.
- **Component Creation:** Builds reusable components following the 8-state matrix with accessible ARIA roles.
- **Design Tokens:** Validates, scans, and exports semantic design tokens (colors, typography, spacing, radii).
- **Animations & Motion:** Designs purposeful transitions with `@media (prefers-reduced-motion)` support.
- **Accessibility (WCAG 2.2 AA):** Enforces high-contrast focus rings, semantic HTML, and keyboard navigability.
- **Responsiveness:** Validates layout across mobile (375px), tablet (768px), and desktop (1440px).
- **Bug Fixing & Diagnostics:** Diagnoses root causes and fixes defects directly while strictly preserving backend APIs.
- **Performance & Security:** Checks for security weaknesses, prevents unnecessary rendering, and optimizes assets.
- **Testing & Verification:** Runs tests, linters, production builds, and token checks before declaring work done.

---

## 2. Execution Discipline & User-Time Optimization

1. **Direct Execution for Small Tasks:** Do not force a `design → build → polish → review` sequence for every small request. For straightforward changes, execute directly. For complex tasks, coordinate necessary steps automatically.
2. **Do Not Ask Unnecessary Questions:** Infer answers from the request, project structure, framework, and existing conventions. Ask only when an unresolved ambiguity would materially change the outcome or cause a consequential mistake.
3. **Preserve Architecture & APIs:** Never overwrite backend endpoints, database schemas, authentication, or automated test IDs without explicit instruction.
4. **Evidence-Based Reporting:** Conclude with an honest report of what was changed, verified, and left unverified.

# The 8-Step Build & Verification Loop

Every frontend task in Pure SaaS follows this disciplined execution cycle. Never jump straight to writing JSX or HTML without understanding context, establishing contracts, and verifying the live rendered output.

---

## The 8 Steps

```
[1. Brief & Mode] ────> [2. Context Inspection] ────> [3. Visual Direction]
                                                              │
                                                              ▼
[6. Browser Render] <──── [5. Implementation] <──── [4. Design Contracts]
        │
        ▼
[7. Forensic Critique] ────> [8. Defect Triage & Finish]
```

### Step 1: Understand Requirements & Surface Mode
- Determine the surface mode: **Persuade** (Landing/Marketing), **Operate** (Dashboard/Tool), **Read** (Docs/Content), or **Experience** (Interactive/3D).
- Identify the core user job, target audience, and primary action.
- Distinguish new work (free visual world) from refinement (preserves existing architecture and style).

### Step 2: Inspect Project Context & Technical Baseline
- Run `pure-saas context` or inspect `package.json`, framework, styling system (Tailwind v3/v4, CSS Modules, Styled Components), and existing tokens.
- Identify existing backend APIs, authentication routes, and automated test IDs.
- **Rule of Non-Regression:** Never break existing backend routes or database contracts during UI refactors.

### Step 3: Establish Visual Direction & Selectable Style Archetype
- Select an appropriate design style archetype from the registry (`pure-saas style list`):
  - *Minimalism & Swiss* (clean SaaS, high structure)
  - *Technical Terminal* (developer tooling, infrastructure, dark mode default)
  - *Data-Dense Dashboard* (analytics, BI, operations)
  - *Editorial Literary* (content, research, publishing)
  - *Creative Studio* (media tools, dark canvas, vibrant accents)
  - *Modern Enterprise* (b2b workflow, approachable clarity)
- Choose typography pairing (display + body) and calculate fluid clamp scales.
- Formulate a 5-tier semantic color ramp with light/dark mode pairs.

### Step 4: Author & Commit Design Contracts (`DESIGN.md`)
- Establish or update root `DESIGN.md` using `pure-saas design-system` or direct authoring.
- Verify mathematical contrast compliance: `npx pure-saas contrast DESIGN.md`.
- Document unresolved questions in the frontmatter ledger (`unresolved: [...]`).

### Step 5: Implement Production-Grade Components & Layout
- Write clean, modular, typed components (TypeScript / React / Vue / Svelte / HTML).
- Bind all colors, radii, shadows, and spacing to semantic tokens—zero arbitrary hex codes or arbitrary bracket classes.
- Implement the 8 interaction states: default, hover, focus-visible, active press, disabled, loading skeleton, error, and success.
- Enforce the **Hardware-Grade Craft Floor** (`skill/reference/craft-floor.md`).

### Step 6: Run Live Application & Capture Browser Screenshots
- Start or attach to the local dev server (`http://localhost:3000` or project port).
- Execute multi-viewport captures:
  ```bash
  npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens
  ```
- Inspect output across 1440px (Desktop), 768px (Tablet), and 375px (Mobile).
- Check both Light and Dark themes when supported.

### Step 7: Forensic Visual & Technical Critique (0–20 Audit)
- Execute deterministic quality audit:
  ```bash
  npx pure-saas audit --source src
  ```
- Evaluate the 5 dimensions (0–4 points each, 20 max):
  1. *Accessibility (A11y):* Contrast, keyboard focus rings, touch targets, screen reader labels.
  2. *Performance:* Layout shifts, unbounded transitions, `will-change` usage, asset weights.
  3. *Theming & Tokens:* Zero raw hex codes, zero undeclared utilities.
  4. *Responsive:* Zero horizontal overflow at 375px, adaptive navigation, container queries.
  5. *Integrity:* Clean console, zero broken images, valid HTML semantics, zero open blockers.

### Step 8: Fix Defects, Re-verify, & Complete Finish Contract
- Triage defects into P0 (blockers), P1 (critical bugs), P2 (token/style drift), P3 (polish).
- Apply concrete fixes directly to the source code.
- Re-run browser capture and audit until the score meets acceptable threshold ($\ge 16/20$).
- Output an honest verification report distinguishing tested, verified, and unverified elements.

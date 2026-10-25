# Pure SaaS: Universal Command (`/pure-saas`)

Universal entry point for any UI/UX design, implementation, refactoring, or audit task.

## Usage

```bash
/pure-saas [natural language request or subcommand]
```

**Request:** `$ARGUMENTS`

---

## 1. Intent Analysis & Subcommand Dispatch

Inspect the request:

### A. Subcommand Invocation
If the request begins with a specialized subcommand, execute that specific workflow:
- `reference [URL] [request]` → Reverse-engineer visual reference and recreate design language.
- `design [request]` → Establish or update root-level `DESIGN.md` specification.
- `build [request]` → Execute complete implementation from scratch or within existing project.
- `audit [scope]` → Comprehensive quality audit across hierarchy, responsive, a11y, performance.
- `fix [request]` → Diagnose and resolve visual, layout, token, or interaction defects.
- `polish [request]` → Elevate visual hierarchy, micro-interactions, surfaces, and typography.
- `responsive [request]` → Optimize desktop (1440px), tablet (768px), and mobile (375px) ergonomics.
- `accessible [request]` → Enforce WCAG 2.2 AA, keyboard focus, semantic HTML, and ARIA patterns.
- `motion [request]` → Design and implement purposeful transitions and animation curves.
- `tokens [request]` → Manage, inspect, validate, and export design tokens.
- `component [request]` → Build or refactor reusable components across the 8-state matrix.
- `verify [request]` → Run end-to-end requirement checks, builds, tests, and token validation.
- `system [request]` → Establish or evolve product-wide design foundations and guidelines.
- `migrate [request]` → Modernize interfaces or tokens without breaking existing functionality.

### B. Arbitrary Natural-Language Request
If given a natural-language description (e.g., `/pure-saas create a premium 3D landing page for my hospital` or `/pure-saas make this interface feel significantly more premium`):
1. **Understand Project Context:** Inspect repository files, frameworks, build tools, and backend contracts.
2. **Orchestrate Workflows Automatically:** Dynamically chain the necessary subcommands (e.g., `design` → `build` → `responsive` → `motion` → `audit` → `verify`).
3. **Build Complete Working Product:** Implement real code, components, and styling. Never stop at a static scaffold or preliminary mockup.
4. **Preserve Architecture & APIs:** Never modify backend routes, database models, authentication, or unrelated logic without explicit instructions.
5. **Enforce Shared Standards:** Follow `SKILL.md` rules against generic AI slop, binding all styling to `DESIGN.md`.
6. **Verify & Report Honestly:** Run available validators and tests, refine discrepancies, and output an evidence-backed report.

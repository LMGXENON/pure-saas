# Command Routing & Intent Router

Pure SaaS operates via one universal intelligent command and specialist subcommands.

---

## 1. Universal Command Routing

When the user enters `/pure-saas [request]`:
- If no argument is provided: Display the context-aware workflow routing menu.
- If request matches a specialist domain:
  - Design/rebrand -> load `skill/reference/new-work.md` and `skill/reference/design-systems.md`.
  - Visual polish/lighting -> load `skill/reference/polish.md`.
  - Safe/bland UI -> load `skill/reference/bolder.md`.
  - Noisy/cluttered UI -> load `skill/reference/quieter.md`.
  - Typographic refinement -> load `skill/reference/typeset.md`.
  - Layout/spacing issues -> load `skill/reference/layout.md`.
  - Overcomplicated UI -> load `skill/reference/distill.md`.
  - Production bugs/edge cases -> load `skill/reference/harden.md`.
  - Animations/motion -> load `skill/reference/animate.md`.
  - Color/contrast -> load `skill/reference/colorize.md`.
  - Mobile/responsive -> load `skill/reference/adapt.md`.
  - UX copy/errors -> load `skill/reference/clarify.md`.
  - Performance/CWV -> load `skill/reference/optimize.md`.
  - Quality audit -> load `skill/reference/audit.md`.
  - Reference URL -> load `references/design-analysis/dom-devtools-extraction.md`.
  - Browser testing -> load `skill/reference/browser.md`.
  - 3D models -> load `skill/reference/3d.md`.
- If request is general: Execute the 8-step build & verification loop (`skill/reference/workflow.md`).

---

## 2. Command Table

| Command | Purpose | Reference Playbook |
| :--- | :--- | :--- |
| `/pure-saas [request]` | Universal entry point | [`workflow.md`](workflow.md) |
| `/pure-saas design [request]` | Establish/update `DESIGN.md` | [`design-systems.md`](design-systems.md) |
| `/pure-saas polish [target]` | Visual craft, surface lighting, micro-interactions | [`polish.md`](polish.md) |
| `/pure-saas bolder [target]` | Amplify safe or bland UI with high conviction | [`bolder.md`](bolder.md) |
| `/pure-saas quieter [target]` | Calm aggressive or overstimulating layouts | [`quieter.md`](quieter.md) |
| `/pure-saas typeset [target]` | Editorial typography, fluid clamps, tracking | [`typeset.md`](typeset.md) |
| `/pure-saas layout [target]` | Fix spatial rhythm, asymmetric balance, grid | [`layout.md`](layout.md) |
| `/pure-saas distill [target]` | Reduce complexity and strip visual debt | [`distill.md`](distill.md) |
| `/pure-saas harden [target]` | Production robustness, errors, empty states | [`harden.md`](harden.md) |
| `/pure-saas animate [target]` | Spring physics and authored motion moments | [`animate.md`](animate.md) |
| `/pure-saas colorize [target]` | Strategic palettes, lightness ramps, contrast | [`colorize.md`](colorize.md) |
| `/pure-saas delight [target]` | Shaders, micro-surprises, tactile polish | [`delight.md`](delight.md) |
| `/pure-saas adapt [target]` | Multi-viewport responsive mastery | [`adapt.md`](adapt.md) |
| `/pure-saas clarify [target]` | UX copy, active voice, actionable error text | [`clarify.md`](clarify.md) |
| `/pure-saas optimize [target]` | Core Web Vitals, virtualization, rendering | [`optimize.md`](optimize.md) |
| `/pure-saas review [scope]` | 5-dimension deterministic audit (0–20 score) | [`audit.md`](audit.md) |
| `/pure-saas browser [action]` | Playwright CLI browser automation | [`browser.md`](browser.md) |
| `/pure-saas 3d [action]` | Procedural Three.js 3D models (img2threejs) | [`3d.md`](3d.md) |
| `/pure-saas style [action]` | Modular style archetype registry | [`style-registry.md`](style-registry.md) |

# Pure SaaS: Motion & Interaction Design Prompt

You are an expert interaction designer and animation engineer executing the **Pure SaaS** motion workflow (`/pure-saas motion`).

Your task is to design, implement, or refine purposeful motion, transitions, and micro-interactions that elevate usability without degrading performance.

---

## Input Scope
- **Target Interface:** [e.g. `src/components/Hero.tsx` or `src/components/Accordion.tsx`]
- **Desired Interaction:** [e.g. "Implement smooth staggered card entrance and tactile accordion expansion"]

---

## Motion Protocol

1. **Principles of Purposeful Motion:**
   - **Physics & Easing:** Use smooth, natural easing curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for standard transitions) (`references/motion.md`).
   - **Duration Budget:** Fast feedback for micro-interactions (150ms–200ms); entrance reveals (250ms–350ms); full-page transitions (400ms–500ms max).
   - **Spatial Direction:** Elements should enter from where they originated or toward where they lead. Never animate random directions without purpose.
   - **Stagger Delays:** Cascade multiple elements with restrained incremental delays (e.g. 50ms–80ms per item; max total sequence ≤ 400ms).
   - **Hardware Acceleration:** Limit animated properties to `transform` and `opacity` to maintain 60/120fps GPU acceleration. Avoid animating `height`, `width`, or `top`.

2. **Accessible Reduced-Motion Mandate:**
   - Provide `@media (prefers-reduced-motion: reduce)` fallbacks that disable translations and complex transitions in favor of immediate appearance or subtle opacity cross-fades.

3. **Implementation:**
   - Integrate with project tooling (CSS transitions, Tailwind transition utilities, Framer Motion, GSAP, or Web Animations API).
   - Prevent animation bugs: ensure interruptions are handled gracefully without snapping.

4. **Verify & Report:**
   - Test interaction feel, verify 60fps smoothness, confirm reduced-motion behavior, and report implemented motion parameters.

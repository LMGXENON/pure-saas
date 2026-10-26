# Browser DevTools Inspection & Visual Audit Workflow

A disciplined manual DevTools inspection workflow verifies computed metrics, rendering layers, repaint cycles, and CSS animations in real runtime engines.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **Computed Styles Tab** | Verify actual rendered font-size, line-height, and padding values against tokens |
| **Rendering Drawer** | Enable "Paint flashing" and "Layout Shift Regions" to spot jank |
| **Animations Inspector** | Scrub CSS transitions and cubic-bezier curves at 10% speed to verify physics damping |

---

## 2. Configuration & Execution Reference

```bash
// Browser DevTools inspection checklist
1. Open DevTools (Cmd+Option+I / F12).
2. Press Cmd+Shift+P -> "Show Rendering" -> Enable "Paint flashing".
3. Interact with buttons, modals, and lists; verify no unexpected full-page repaints.
4. Toggle "Emulate CSS prefers-reduced-motion: reduce"; confirm animations halt.
5. Inspect computed colors on the Elements tab to confirm CSS variable resolution.
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Inspect actual computed CSS values on Retina and standard resolution screens. | Never claim visual verification was completed without actually inspecting the running webpage. |
| Scrub animations at 10% speed to audit spring easing curves. |  |

---

## 4. Verification & Quality Gates

- **Use the DevTools Accessibility Pane to inspect the computed Accessibility Tree.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.

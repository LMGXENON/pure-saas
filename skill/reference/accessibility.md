# Accessibility: WCAG 2.2 AA Non-Negotiables

Accessibility in Pure SaaS is a non-negotiable legal and engineering requirement.

---

## 1. WCAG 2.2 AA Mandatory Rules

- **SC 1.4.3 Contrast (Minimum):** Body copy $\ge$ 4.5:1; large text $\ge$ 3:1.
- **SC 1.4.11 Non-text Contrast:** UI components and graphical objects $\ge$ 3:1.
- **SC 2.4.7 Focus Visible:** Keyboard focus indicators must be clearly visible. Suppressing `:focus` with `outline: none` without providing an equal or superior `:focus-visible` replacement is a P1 blocker.
- **SC 2.5.8 Target Size (Minimum):** Interactive touch targets must be at least 44x44 CSS pixels on mobile viewports.
- **SC 1.4.4 Resize Text:** Text must scale up to 200% without loss of content or horizontal blowout.

---

## 2. Accessible Keyboard Patterns

1. **Modal Dialogs:**
   - On open, trap focus inside the modal.
   - Pressing `Escape` closes the modal immediately.
   - On close, return focus to the button that triggered the modal.
2. **Tab Lists:**
   - `ArrowLeft` / `ArrowRight` cycles through tabs (roving `tabindex`).
   - `Home` / `End` jumps to first/last tab.
   - Active tab panel carries `role="tabpanel"` and `aria-labelledby="tab-id"`.

# Components: The 8-State Matrix & Headless Primitives

Every interactive component in Pure SaaS must implement the complete 8-state matrix and adhere to headless accessibility primitives.

---

## 1. The 8-State Interaction Matrix

Never design only the "default" state. Every button, input, tab, card, and row must handle all 8 states:

1. **Default:** Baseline appearance bound to semantic tokens.
2. **Hover:** Clear cursor cue (`cursor: pointer`), subtle surface illumination or translation.
3. **Focus-Visible:** High-visibility focus ring (`2px solid var(--color-action-focus)` with `2px offset`) triggered strictly on keyboard tab. Never suppress outline.
4. **Active (Press):** Tactile physical compression (`scale(0.985)` or `translateY(0.5px)`).
5. **Disabled:** Reduced opacity (`opacity-50`), `cursor-not-allowed`, and `aria-disabled="true"`.
6. **Loading:** Spinner or skeleton replacement, controls disabled to prevent double-submission.
7. **Error:** High-contrast error border (`var(--color-status-error)`), inline error text, `aria-invalid="true"`.
8. **Success:** Positive confirmation cue (`var(--color-status-success)`), animated checkmark icon.

---

## 2. Headless Primitives Pattern

Separate structure and accessibility from styling:
- Use Radix UI, Headless UI, React Aria, or semantic HTML elements (`<dialog>`, `<popover>`, `<details>`).
- Roving `tabindex` for menus, toolbars, and tab lists.
- Portaled modals and dropdowns to prevent clipping by parent `overflow: hidden`.


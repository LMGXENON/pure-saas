# Components: The 8-State Matrix & Headless Primitives

Every interactive component in Pure SaaS must implement the complete 8-state matrix and adhere to headless accessibility primitives.

---

## 1. The 8-State Interaction Matrix

Never design only the "default" state. Every button, input, tab, card, and row must handle all 8 states:

| State | Purpose | Required Visual Feedback |
| :--- | :--- | :--- |
| **Default** | Base at-rest condition | Clean, readable styling bound strictly to semantic tokens. |
| **Hover** | Mouse cursor positioned over control | Subtle contrast change (5%–10% brightness shift or background tint), `cursor: pointer`. Never dramatic layout shifting. |
| **Focus-Visible** | Keyboard user tabs onto control | High-contrast focus ring (min 2px solid, min 3:1 contrast against surrounding surface, offset 2px). Never suppress `outline` without replacement. |
| **Active (Pressed)** | User actively clicking or holding key | Direct tactile response: physical depression (`transform: scale(0.985)` or `translateY(0.5px)`). |
| **Disabled** | Control unavailable for interaction | Reduced opacity (`0.5`), `cursor: not-allowed`, `aria-disabled="true"`. Explain *why* it is disabled via tooltip or inline hint. |
| **Loading** | Action executing (network request) | Clear inline spinner or skeleton shimmer, preserve original control dimensions to prevent layout shift, disable double-clicks. |
| **Error / Invalid** | Validation failure or network error | Red border (`var(--color-status-error)`), descriptive inline error text linked via `aria-describedby`, error icon. Preserve user input! |
| **Success / Completed** | Action succeeded | Green confirmation cue (`var(--color-status-success)`), animated checkmark icon, subtle transition back to stable state. |

---

## 2. Accessible Focus & Overlay Management

1. **Focus Visible Outline Rule:**
   ```css
   :focus-visible {
     outline: 2px solid var(--color-border-focus);
     outline-offset: 2px;
   }
   ```
2. **Keyboard Focus Traps:** Modals and slide-over drawers must trap keyboard focus while open and restore focus to the triggering element when closed.
3. **Escape Key Handling:** Modals, popovers, and tooltips must dismiss immediately on pressing `Escape`.

---

## 3. Headless Primitives Pattern

Separate structure and accessibility from styling:
- Use Radix UI, Headless UI, React Aria, or semantic HTML elements (`<dialog>`, `<popover>`, `<details>`).
- Roving `tabindex` for menus, toolbars, and tab lists.
- Portaled modals and dropdowns to prevent clipping by parent `overflow: hidden`.

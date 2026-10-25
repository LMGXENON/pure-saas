# Pure SaaS Interaction States Guide

An interface cannot be considered complete if it only accounts for the happy, static, default state. Every interactive control must provide clear, predictable visual feedback across its lifecycle.

---

## 1. The Mandatory State Matrix

For every interactive component (buttons, inputs, select menus, list rows, tabs, cards with links), specify and implement the following states:

| State | Purpose | Required Visual Feedback |
| :--- | :--- | :--- |
| **Default** | Base at-rest condition | Clean, readable styling according to semantic tokens. |
| **Hover** | Mouse cursor is positioned over control | Subtle contrast change (5%–10% brightness shift or background tint), pointer cursor. Never dramatic layout shifting. |
| **Focus-Visible** | Keyboard user tabs onto control | High-contrast focus ring (min 2px solid, min 3:1 contrast against surrounding surface, offset 2px). Never suppress `outline` without replacement. |
| **Active / Pressed** | User is actively clicking or holding down key | Direct tactile response: slight depression (e.g. `transform: scale(0.98)` or darkened background fill). |
| **Selected / Active Item** | Current page, active tab, checked toggle | Unambiguous persistent marker: high-contrast background, solid border indicator, or bolded state. |
| **Disabled** | Control is unavailable for interaction | Reduced opacity (`0.5`–`0.6`), `cursor: not-allowed`, muted borders, suppressed hover effects. Note: explain *why* it is disabled via tooltip or inline hint. |
| **Loading** | Action is executing (network request) | Clear inline spinner or skeleton shimmer, preserve original control width to prevent layout shift, disable double-clicks. |
| **Empty** | Collection or list contains 0 items | Dedicated empty state illustration or text, helpful explanation, clear call to action (e.g., "Create your first project"). |
| **Error / Invalid** | Validation failure or network error | Red border (`color-status-error`), descriptive inline error text linked via `aria-describedby`, error icon. Preserve user input! |
| **Success / Completed** | Action succeeded | Green check indicator (`color-status-success`), toast or inline confirmation, subtle transition back to stable state. |

---

## 2. Accessible Focus Management

1. **Never use `outline: none;` without a visible alternative:**
   ```css
   :focus-visible {
     outline: 2px solid var(--color-border-focus);
     outline-offset: 2px;
   }
   ```
2. **Keyboard Traps:** Modals and slide-over drawers must trap keyboard focus while open and restore focus to the triggering element when closed.
3. **Escape Key Handling:** Modals, popovers, and tooltips must dismiss immediately on pressing `Escape`.

---

## 3. Form Resilience Rules

- **Never clear user input upon an error:** If submission fails, preserve every character the user typed so they do not have to re-enter their data.
- **Scroll to first error:** On failed submission, focus and scroll to the first invalid input.
- **Explain requirements up front:** If a field has formatting rules (e.g., password length, phone format), display the requirements *before* the user submits, not only as an angry error message afterwards.

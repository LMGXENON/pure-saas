# Accessible Drag and Drop Interactions

Drag-and-drop handles kanban boards, file uploads, and list reordering. Pure SaaS requires full keyboard parity and screen reader announcements alongside mouse drag.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Drop Target Visuals** | Clear active border highlight and ghost silhouette where item will land |
| **Keyboard Reordering** | Space to pick up item, Arrow keys to reposition, Space/Enter to drop, ESC to cancel |
| **Screen Reader Announcements** | Live announcements: "Picked up item. Position 2 of 5. Press up/down to move." |

---

## 2. Implementation Guide

```tsx
// Drag and drop accessibility announcement helper
function announceDndAction(message: string) {
  const liveRegion = document.getElementById('dnd-announcer');
  if (liveRegion) liveRegion.innerText = message;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide alternative buttons (e.g. Move Up, Move Down) alongside drag handles. | Never make drag-and-drop the exclusive way to perform a required task. |
| Show clear drop indicators between list rows. |  |

---

## 4. Accessibility & Interaction Integrity

- **WCAG 2.5.7 Dragging Movements: A single-pointer alternative is required.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

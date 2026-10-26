# Harden: Production Robustness, Edge Cases & Error Recovery

Use `/pure-saas harden [target]` to transform a fragile prototype into bulletproof, production-grade software that gracefully handles real-world edge cases.

---

## 1. The Production Hardening Matrix

| Domain | Fragile Prototype Flaw | Production-Hardened Solution |
| :--- | :--- | :--- |
| **Empty States** | Blank white screen or generic "No data" text | Helpful empty state with illustrated context, clear explanation, and primary action to create/import data |
| **Long Text / Overflow** | Text overflows container, clips, or blows out layout | `truncate` (with tooltip), `break-words`, `min-w-0` on flex items, and `text-wrap: balance` |
| **Network Loading** | Sudden content snap, CLS jump | Content-shaped skeleton loaders (`animate-pulse`) with matching dimensions |
| **Network Failure** | App hangs or throws unhandled promise rejection | Error banner/toast naming exact failure and providing one-click "Retry" action |
| **Form Validation** | Validating only on submit; alert dialogs | Inline field validation using `:user-valid` / `:user-invalid` and accessible error messages (`aria-describedby`) |
| **Keyboard Traps** | Modal cannot be closed with Escape key; focus lost | Accessible focus trap: focus trapped inside modal while open, restored to triggering element on close |
| **Mobile Viewport** | 320px viewport blows out horizontally | Defensively applied `max-w-full`, `overflow-x-clip`, and responsive containers |

---

## 2. Defensive CSS Rules

1. **Flex Child Shrinkage:** Always add `min-w-0` to flex child containers containing text. By default, flex items have `min-width: auto`, which prevents text truncation and causes unexpected horizontal blowout.
2. **Fixed Height Prohibition:** Never set fixed pixel heights (`height: 240px`) on content containers. Use `min-height` with flex/grid layout so the container expands if text wraps or internationalized translations are longer.
3. **Touch Action & Zoom:** Never disable mobile zoom with `user-scalable=no` or `maximum-scale=1.0` in `<meta name="viewport">`. This violates WCAG SC 1.4.4.
4. **Accessible Hit Target Expansion:** For small icons (16px–20px), expand the clickable hit target to 44x44px using negative margin or padding (`p-3 -m-3` or `::before` pseudo-element).

# Feedback Toast System & Notification Queues

Toasts handle non-blocking, asynchronous system feedback with a disciplined FIFO queue and viewport corner stacking.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Viewport Anchor** | Bottom-right for desktop web; top-center for mobile web |
| **Severity Tiers** | Success (green check), Warning (amber triangle), Error (red octicon), Info (blue dot) |
| **Queue Limiting** | Display maximum 3 visible toasts; queue subsequent messages |

---

## 2. Implementation Guide

```tsx
// Multi-toast stack layout
<div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-w-sm w-full pointer-events-none">
  {toasts.map(toast => (
    <div key={toast.id} className="pointer-events-auto transform transition-all duration-200">
      <ToastItem {...toast} />
    </div>
  ))}
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Pause auto-dismiss timers when the cursor hovers over the toast. | Never render toasts that obscure primary navigation buttons or forms. |
| Include a manual close button on every toast. |  |

---

## 4. Accessibility & Interaction Integrity

- **Use aria-live="polite" for status notifications.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.

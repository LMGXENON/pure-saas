# Screen Reader Announcements & ARIA Live Regions

Dynamic web applications change state without full page reloads. ARIA live regions announce asynchronous events to assistive technologies.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **aria-live="polite"** | Polite Region | Waits until user is idle before speaking (toasts, search result counts) |
| **aria-live="assertive"** | Assertive Region | Interrupts current speech immediately for urgent errors or session timeouts |
| **aria-atomic="true"** | Atomic Announcement | Reads the entire live container content instead of only the changed delta |

---

## 2. Accessible Implementation Example

```tsx
<div
  id="live-announcer"
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use `aria-live="polite"` for non-critical confirmations like "Copied to clipboard". | Never overuse `aria-live="assertive"` for routine background operations. |
| Keep visually hidden announcer elements mounted in the DOM before injecting text. |  |

---

## 4. Testing & Verification Protocol

- **Screen readers rely on live regions to understand SPA view transitions.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

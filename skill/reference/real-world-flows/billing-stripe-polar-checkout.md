# Billing & Polar/Stripe Checkout Integration Flow

Subscription flows handle plan upgrades, invoice history, payment method management, and prorated plan adjustments without user friction.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Plan Comparison** | Clear monthly/annual toggle with savings percentage clearly marked |
| **2. Checkout Modal / Redirect** | Embed Polar or Stripe Elements with minimal required customer fields |
| **3. Webhook Synchronization** | Real-time webhook listener updates workspace subscription state |
| **4. Invoice Portal Access** | Direct self-serve link to download PDF tax receipts and VAT invoices |

---

## 2. Implementation Guide

```tsx
<div className="p-6 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] space-y-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Current Subscription</h3>
      <p className="text-xs text-[var(--color-text-secondary)]">Pro Plan — $49/month (Renews Nov 14, 2026)</p>
    </div>
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">Active</span>
  </div>
  <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
    <button className="text-xs text-[var(--color-text-secondary)] hover:underline">Download Invoices (PDF)</button>
    <button className="h-9 px-4 text-xs font-medium rounded-lg bg-[var(--color-accent-primary)] text-white">Upgrade Plan</button>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Display active plan and upcoming billing renewal date clearly. | Never obscure currency symbols, billing intervals, or applicable VAT/sales taxes. |
| Allow customers to cancel or pause subscriptions without forced customer support calls. |  |

---

## 4. Accessibility & Verification Checklist

- **Ensure checkout payment iframes support screen reader focus navigation.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.

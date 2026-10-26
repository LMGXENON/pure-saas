# Checkout Funnel & Payment Flow Layout

Checkout flows must be frictionless and trustworthy, minimizing fields while showing clear itemized totals and SSL trust indicators.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Shipping & Contact Details** | Streamlined address and contact inputs with autofill | `flex-1 space-y-6` |
| **Payment Method Form** | Credit card elements, Apple Pay, or digital wallet | `border p-4 rounded-xl` |
| **Sticky Order Summary Rail** | Item thumbnails, promo code input, subtotal, tax, and final total | `w-96 border-l p-6` |

---

## 2. Layout Implementation Example

```tsx
<div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
  <div className="lg:col-span-7 space-y-8">
    <section>
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">1. Contact & Shipping</h2>
      <AddressForm />
    </section>
    <section>
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">2. Payment Method</h2>
      <PaymentForm />
    </section>
  </div>
  <aside className="lg:col-span-5 bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] rounded-2xl p-6 h-fit sticky top-6">
    <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Order Summary</h3>
    <OrderSummaryItems />
    <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] space-y-2 text-xs">
      <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Subtotal</span><span>$129.00</span></div>
      <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Shipping</span><span>Free</span></div>
      <div className="flex justify-between font-bold text-sm text-[var(--color-text-primary)] pt-2 border-t"><span>Total</span><span>$129.00</span></div>
    </div>
    <button className="w-full h-12 mt-6 rounded-xl bg-[var(--color-accent-primary)] text-white font-semibold text-sm">Place Order</button>
  </aside>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide collapsible order summary on mobile viewports. | Never introduce surprise fees on the final confirmation step. |
| Support browser autofill across address and card inputs. |  |

---

## 4. Accessibility & Layout Semantics

- **Screen reader live regions for tax calculation and discount code application.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.

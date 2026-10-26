# Audit Log & Security Activity Timeline

Audit logs provide an immutable timeline of security events (logins, API key generation, permission updates, deletions) for enterprise compliance (SOC2/ISO27001).

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Structured Event Row** | Actor avatar + name, action verb, target entity, timestamp, IP address |
| **2. JSON Diff Modal** | Clicking an event opens a modal with side-by-side Before/After JSON diff |
| **3. Export Compliance Log** | One-click signed export for compliance auditors |

---

## 2. Implementation Guide

```tsx
<div className="divide-y divide-[var(--color-border-subtle)] text-xs">
  <div className="py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center font-bold">SC</div>
      <div>
        <p className="font-medium text-[var(--color-text-primary)]"><span className="font-semibold">Sarah Chen</span> rotated API key <code className="bg-neutral-800 px-1 rounded">prod_live_...</code></p>
        <span className="text-[10px] text-[var(--color-text-muted)]">IP: 192.0.2.42 • San Francisco, CA</span>
      </div>
    </div>
    <time className="text-[10px] text-[var(--color-text-muted)]">24 mins ago</time>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Include exact UTC timestamps alongside relative time ("2 hours ago"). | Never allow audit log records to be edited or deleted through the UI. |
| Provide search and filter by actor and event category. |  |

---

## 4. Accessibility & Verification Checklist

- **Use semantic `<time dateTime="...">` tags for all event timestamps.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.

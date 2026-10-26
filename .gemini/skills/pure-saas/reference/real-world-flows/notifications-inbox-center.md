# Notifications Inbox & Real-Time Alert Center

Notification hubs organize team mentions, system alerts, and task assignments with unread counters and granular notification preferences.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Bell Trigger with Badge** | Unread counter badge updates in real time via WebSocket |
| **2. Flyout Notification Panel** | Tabs for "All" and "Unread", "Mark all as read" button |
| **3. Deep Link Navigation** | Clicking an item marks it read and navigates directly to the target record |

---

## 2. Implementation Guide

```tsx
<div className="w-80 p-2 rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-2xl">
  <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border-subtle)]">
    <span className="text-xs font-semibold text-[var(--color-text-primary)]">Notifications</span>
    <button className="text-[10px] text-[var(--color-accent-primary)] hover:underline">Mark all read</button>
  </div>
  <div className="divide-y divide-[var(--color-border-subtle)] max-h-72 overflow-y-auto">
    <div className="p-3 text-xs hover:bg-[var(--color-surface-hover)] cursor-pointer flex gap-2.5">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
      <div>
        <p className="text-[var(--color-text-primary)]"><span className="font-semibold">Alex</span> mentioned you in Deployments</p>
        <span className="text-[10px] text-[var(--color-text-muted)]">10m ago</span>
      </div>
    </div>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Support keyboard navigation through the notification list. | Never bombard users with duplicate notifications across email, push, and in-app. |
| Provide a direct link to notification settings to configure email/push channels. |  |

---

## 4. Accessibility & Verification Checklist

- **Live count badge announced to screen readers via aria-label.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.

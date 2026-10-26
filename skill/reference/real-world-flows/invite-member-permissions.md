# Team Member Invitations & Role-Based Access (RBAC)

Inviting collaborators requires granular role assignment (Owner, Admin, Member, Viewer) with clear permission explanations.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Email Input & Role Selector** | Enter single or batch emails and select intended access tier |
| **2. Invitation Dispatch** | Sends transactional invitation email with unique acceptance token |
| **3. Pending Invitations Table** | View pending invites with "Resend" and "Revoke" actions |

---

## 2. Implementation Guide

```tsx
<div className="flex gap-2">
  <input type="email" placeholder="colleague@company.com" className="flex-1 h-9 px-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-base)] text-xs" />
  <select className="h-9 px-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-base)] text-xs">
    <option value="member">Member</option>
    <option value="admin">Admin</option>
  </select>
  <button className="h-9 px-4 rounded-lg bg-[var(--color-accent-primary)] text-white text-xs font-medium">Invite</button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Display an explicit table explaining what each role can and cannot do. | Never allow non-admin members to elevate their own permissions. |
| Allow administrators to revoke pending invitations immediately. |  |

---

## 4. Accessibility & Verification Checklist

- **Associate role descriptions with role dropdown options.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.

# Data Export & Asynchronous Reporting Flow

Exporting large datasets requires asynchronous job queuing, clear format selection (CSV, JSON, Parquet), and non-blocking download notifications.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Scope Configuration** | Date range, column selection, and output format in an export modal |
| **2. Job Enqueue** | Immediate client feedback: "Export started. You will be notified when ready." |
| **3. Notification & Download** | Toast or notification inbox delivers signed S3 download link |

---

## 2. Implementation Guide

```tsx
<div className="space-y-4">
  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Select Export Format</h4>
  <div className="grid grid-cols-2 gap-3">
    <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--color-border-default)] cursor-pointer hover:bg-[var(--color-surface-hover)]">
      <input type="radio" name="format" value="csv" defaultChecked />
      <span className="text-xs font-medium">CSV (Spreadsheets)</span>
    </label>
    <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--color-border-default)] cursor-pointer hover:bg-[var(--color-surface-hover)]">
      <input type="radio" name="format" value="json" />
      <span className="text-xs font-medium">JSON (Raw Data)</span>
    </label>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Deliver large exports via background notifications rather than blocking the UI thread. | Never freeze the browser window during client-side CSV generation. |
| Provide pre-signed download URLs that expire after 24 hours. |  |

---

## 4. Accessibility & Verification Checklist

- **Inform screen readers when asynchronous export generation completes.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.

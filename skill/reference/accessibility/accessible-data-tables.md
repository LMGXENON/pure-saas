# Accessible Data Table Semantics & Keyboard Scrolling

Complex data tables require explicit column and row headers, sort announcements, and keyboard-accessible scroll containers.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **scope="col" / scope="row"** | Header Association | Enables screen readers to announce column and row context for every data cell |
| **aria-sort** | Sort State | Values: "ascending", "descending", or "none" on sorted table headers |
| **tabindex="0"** | Scrollable Container | Ensures keyboard-only users can scroll wide tables horizontally |

---

## 2. Accessible Implementation Example

```tsx
<div tabIndex={0} aria-label="Customer Orders Table" className="overflow-x-auto focus:ring-2 focus:ring-blue-500 rounded-lg">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending">
          <button className="flex items-center gap-1">Order ID ▲</button>
        </th>
        <th scope="col">Customer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">#1042</th>
        <td>Jane Doe</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Put `tabIndex={0}` on horizontally overflowing table wrappers. | Never build data tables using nested `<div>` tags without applying full ARIA table roles. |
| Use `caption` or `aria-label` to give the table an accessible name. |  |

---

## 4. Testing & Verification Protocol

- **WCAG 1.3.1 Info and Relationships.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

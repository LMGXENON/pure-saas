# Accessible Form Architecture & Field Groupings

Forms must present unambiguous labels, associated descriptions, and programmatic error associations.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **<label htmlFor="...">** | Explicit Label | Every form control must have a visible, programmatically linked label |
| **aria-describedby** | Helper & Error Association | Connects instruction text and error alerts directly to the input |
| **aria-invalid="true"** | Error Flag | Announces error condition immediately upon focus |

---

## 2. Accessible Implementation Example

```tsx
<div className="space-y-1">
  <label htmlFor="card-number" className="text-xs font-semibold">Card Number</label>
  <input
    id="card-number"
    type="text"
    inputMode="numeric"
    autoComplete="cc-number"
    aria-invalid={isInvalid}
    aria-describedby={isInvalid ? "card-error" : "card-help"}
    className="h-10 px-3 border rounded-lg w-full"
  />
  {isInvalid && <p id="card-error" role="alert" className="text-xs text-red-500">Please enter a valid card number.</p>}
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always associate labels with inputs using matching `id` and `for` / `htmlFor`. | Never substitute placeholder text for a true `<label>` element. |
| Provide autocomplete attributes for known browser fields. |  |

---

## 4. Testing & Verification Protocol

- **WCAG 3.3.2 Labels or Instructions.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

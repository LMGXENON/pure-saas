# WCAG 2.2 AA Conformance Matrix & Compliance Gates

WCAG 2.2 introduces critical criteria around focus appearance, dragging movements, and target sizes. Pure SaaS treats WCAG 2.2 Level AA compliance as a non-negotiable release gate.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **2.4.11** | Focus Appearance (Minimum) | Focus indicator has an area of at least 1px border perimeter and 3:1 contrast against adjacent background |
| **2.4.12** | Focus Not Obscured (Minimum) | Focused items must not be hidden entirely by sticky headers, footers, or non-modal dialogs |
| **2.5.7** | Dragging Movements | Any dragging action (reorder, slider) must offer a single-pointer tap/click alternative |
| **2.5.8** | Target Size (Minimum) | Interactive targets must be at least 24x24px or have sufficient spacing offset |

---

## 2. Accessible Implementation Example

```tsx
/* WCAG 2.2 Compliant Focus Ring */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: inherit;
}

/* Ensure sticky elements do not obscure focused elements */
:target, :focus {
  scroll-margin-top: 80px; /* Offset for sticky top navbar */
  scroll-margin-bottom: 40px;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Audit all interactive elements against the 9 new WCAG 2.2 AA criteria. | Never suppress `:focus-visible` without styling a replacement ring. |
| Provide single-pointer click buttons alongside all drag interactions. |  |

---

## 4. Testing & Verification Protocol

- **Enforce automated CI checking with axe-core and Lighthouse.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

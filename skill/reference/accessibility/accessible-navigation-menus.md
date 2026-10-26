# Accessible Navigation Menus & Disclosure Submenus

Multi-level navigation menus must allow keyboard users to tab past top-level categories without having to traverse dozens of hidden sub-links.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **<nav aria-label="...">** | Landmark Identification | Differentiates primary navigation from footer and breadcrumb navs |
| **aria-expanded** | Submenu Disclosure | Signals whether a dropdown submenu is currently open or collapsed |
| **aria-current="page"** | Current Location | Explicitly identifies the active link in the navigation structure |

---

## 2. Accessible Implementation Example

```tsx
<nav aria-label="Main Navigation">
  <ul className="flex gap-4">
    <li><a href="/" aria-current="page">Home</a></li>
    <li className="relative">
      <button aria-expanded={isSubmenuOpen} onClick={() => setSubmenuOpen(!isSubmenuOpen)}>
        Products ▼
      </button>
      {isSubmenuOpen && (
        <ul className="absolute top-full mt-2">
          <li><a href="/p1">Product 1</a></li>
        </ul>
      )}
    </li>
  </ul>
</nav>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use disclosure buttons (`<button aria-expanded="...">`) for navigation submenus. | Never open flyout submenus solely on mouse hover without supporting keyboard focus. |
| Allow Escape to collapse open flyout menus. |  |

---

## 4. Testing & Verification Protocol

- **WCAG 2.1.1 Keyboard & 2.4.4 Link Purpose.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.

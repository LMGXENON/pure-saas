# Container Queries & Responsive Component Grids

Modern modular layouts adapt based on their available container space rather than the full browser viewport width.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **@container Definition** | container-type: inline-size | Parent wrapper |
| **Container Breakpoints** | @container (min-width: 400px) | Self-adapting cards |

---

## 2. Code & Configuration Reference

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

.responsive-card {
  display: flex;
  flex-direction: column;
}

@container card (min-width: 480px) {
  .responsive-card {
    flex-direction: row;
    align-items: center;
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use container queries for cards and widgets that can be dropped into sidebars or full-width stages. | Do not rely solely on viewport media queries for embeddable widgets. |
| Pair with modern CSS Grid auto-fit and minmax. |  |

---

## 4. Accessibility & Quality Standards

- **Ensure responsive reflow does not hide essential content or controls.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

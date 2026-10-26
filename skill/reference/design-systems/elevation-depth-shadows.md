# Elevation, Depth & Multi-Layer Shadow Tokens

Depth clarifies visual hierarchy and overlapping surfaces. Pure SaaS replaces single harsh drop shadows with realistic multi-layer ambient and directional shadows.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Elevation 1 (Card / Subtle)** | 0 1px 2px 0 rgba(0, 0, 0, 0.05) | Resting cards |
| **Elevation 2 (Dropdown / Popover)** | 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06) | Floating menus |
| **Elevation 3 (Modal / Dialog)** | 0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1) | Top-level dialogs |

---

## 2. Code & Configuration Reference

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.08);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.08);
}

[data-theme="dark"] {
  /* Dark mode relies on surface luminosity and hairline borders rather than heavy black shadows */
  --shadow-sm: 0 0 0 1px rgba(255, 255, 255, 0.08);
  --shadow-md: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 12px 24px rgba(0, 0, 0, 0.6);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Layer multiple shadow stops for natural optical diffusion. | Never render muddy pure black shadows with 0 blur and 100% opacity in light mode. |
| In dark mode, combine subtle ambient shadows with luminous hairline borders. |  |

---

## 4. Accessibility & Quality Standards

- **Maintain contrast between overlapping elevation layers without relying solely on shadow visibility.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

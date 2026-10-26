# DTCG Token Transforms & Multi-Platform Export

The W3C Design Tokens Community Group (DTCG) specification provides a vendor-neutral JSON format for sharing tokens across Web, iOS, and Android.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **DTCG JSON** | $value, $type, $description structure | Source of truth |
| **Style Dictionary** | Compiles DTCG tokens into CSS, SCSS, Swift, and Kotlin | Cross-platform distribution |

---

## 2. Code & Configuration Reference

```css
{
  "color": {
    "surface": {
      "base": {
        "$value": "#ffffff",
        "$type": "color",
        "$description": "Primary background surface in light mode."
      }
    }
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Validate tokens against DTCG JSON schema in CI. | Do not maintain manual, out-of-sync copies of token files for different platforms. |
| Generate platform-specific artifacts (CSS vars, Tailwind theme, Swift tokens) automatically. |  |

---

## 4. Accessibility & Quality Standards

- **Include contrast requirements inside token metadata descriptions.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.

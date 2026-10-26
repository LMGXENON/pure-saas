# Adaptive Navigation Patterns: Mobile Drawer to Desktop Rail

Navigation must transform gracefully between mobile bottom sheets/drawers and persistent desktop sidebars.

---

## 1. Responsive Viewports & Architecture

| Viewport / Dimension | Technical Specification |
| :--- | :--- |
| **Mobile Pattern** | Bottom navigation bar (3-5 core items) + full-screen slide drawer |
| **Tablet Pattern** | Collapsible 64px icon rail with flyout labels |
| **Desktop Pattern** | Persistent 240px sidebar with hierarchical tree categories |

---

## 2. Code Implementation Reference

```css
// Adaptive navigation component
export function Navigation() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <MobileBottomNav /> : <DesktopSidebar />;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Keep mobile bottom navigation bars under 5 items. | Do not hide global search completely on mobile devices. |
| Preserve active route indicators across both navigation formats. |  |

---

## 4. Accessibility & Viewport Reflow

- **Ensure mobile hamburger triggers have `aria-expanded` and trap focus when open.**

---

## 5. Anti-Slop Enforcement

- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.

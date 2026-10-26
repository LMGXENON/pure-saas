# Polish: Hardware-Grade Visual Refinement

Use `/pure-saas polish [target]` or `impeccable polish` when an interface is functionally working, but lacks the tactile refinement, optical precision, and surface lighting of an elite Apple or Linear-grade product.

---

## 1. Polish Objectives

A polish pass does NOT rewrite state management, change data fetching, or replace existing component architecture. It focuses strictly on:
1. **Hairline Borders:** Replacing coarse 2px borders with razor-sharp 1px hairline borders (`1px solid var(--color-border)`).
2. **Surface Lighting & Depth:** Multi-stop box shadows that combine an ambient occluding shadow with a subtle directional light bloom.
3. **Optical Alignment:** Aligning asymmetric icons, optical tracking on headings (-0.025em), and baseline alignment of badges and counters.
4. **Spring Micro-Interactions:** Adding physical tactile press scale (`scale(0.98)` on active) and rapid spring transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
5. **Themed Browser Surfaces:** Custom text selection (`::selection`), caret color (`caret-color`), and subtle scrollbars.

---

## 2. Refinement Techniques

### A. Surface Elevation & Shadows
Never use generic muddy shadows (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`). Use layered ambient + directional light:
```css
/* Card Elevation: Ambient occluding floor + directional overhead light */
box-shadow: 
  0 1px 2px 0 rgba(0, 0, 0, 0.05),
  0 4px 12px -2px rgba(0, 0, 0, 0.08);
```

### B. Tactile Button Press Physics
When a user clicks or taps a button, give them physical confirmation:
```css
.btn-action {
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease;
}
.btn-action:hover {
  transform: translateY(-1px);
}
.btn-action:active {
  transform: translateY(0.5px) scale(0.985);
}
```

### C. Optical Hierarchy on Badges & Tags
Ensure small status badges align with cap-height rather than baseline:
```css
.badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: 0.02em;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-sm);
}
```

---

## 3. Verification Protocol

After executing polish:
1. Capture screenshots of modified components before and after.
2. Verify that 100% of automated tests still pass.
3. Verify that zero backend APIs or component props were broken.

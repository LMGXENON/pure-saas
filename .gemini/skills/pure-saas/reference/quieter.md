# Quieter: Calming Aggressive, Noisy, or Overstimulated Interfaces

Use `/pure-saas quieter [target]` when an interface is visually chaotic, screaming for attention with too many competing colors, glows, animations, or loud card borders.

---

## 1. What "Quieter" Means

- **Quieter DOES mean:**
  - Reducing visual clutter to let the content speak.
  - Collapsing gratuitous competing borders into clean whitespace separation.
  - Pulling saturated accent colors back into neutral tones, reserving color strictly for primary interactive actions or semantic alerts.
  - Calming frantic animations into smooth, barely perceptible state transitions.
  - Harmonizing typographic weights and font sizes into a calm, disciplined scale.
- **Quieter DOES NOT mean:**
  - Making text low-contrast or unreadable (gray text on light gray background is an accessibility failure, not quiet design).
  - Removing necessary functionality or hiding critical buttons.

---

## 2. De-Escalation Techniques

### Technique 1: De-Colorize Non-Essential Elements
If cards, table rows, and secondary buttons are colored blue, purple, or cyan, return them to neutral canvas and surface tokens. Reserve the accent hue for:
1. Primary Call-to-Action button.
2. Active navigation link or selected tab indicator.
3. System status changes.

### Technique 2: Remove Competing Borders
A page with borders around every card, column, section, and badge looks like a spreadsheet.
- Replace card borders with subtle surface shifts (`var(--color-bg-surface)` on `var(--color-bg-canvas)`).
- Use generous whitespace (24–32px gaps) to group related content instead of enclosing every element in a stroked box.

### Technique 3: Tame Glows & Over-Blurred Drop Shadows
Strip off multi-colored drop shadows (`box-shadow: 0 0 30px rgba(59, 130, 246, 0.5)`). Replace with subtle, neutral ambient occlusion.

---

## 3. Verification

Capture screenshots before and after. Verify that information hierarchy remains distinct and legible while the overall noise floor is dramatically lowered.


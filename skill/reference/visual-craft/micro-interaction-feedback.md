# Micro-Interaction Tactile Feedback

Micro-interactions communicate state changes with delightful, tactile physical confirmation.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Button Press Depth** | scale(0.98) on active press |
| **Copy to Clipboard** | Icon morphs into checkmark with green spring pulse, returning after 2s |
| **Toggle Click Snap** | Knob stretches slightly (scaleX(1.1)) during transit |

---

## 2. Code & Style Implementation

```css
// Copy button with micro-interaction state
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-[var(--color-surface-hover)] active:scale-95 transition-transform duration-100"
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {copied ? <CheckIcon className="w-4 h-4 text-emerald-500 animate-scale-in" /> : <CopyIcon className="w-4 h-4 text-neutral-400" />}
    </button>
  );
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Keep feedback immediate (0-10ms response to pointer down). | Do not delay execution of actions for animations to play out. |
| Provide tactile visual changes on active press. |  |

---

## 4. Accessibility & Performance Verification

- **Ensure dynamic state changes (e.g. "Copied") are communicated to screen readers.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.

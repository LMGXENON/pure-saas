# Pure SaaS Reference Analysis & Evidence Guide

When a user supplies reference websites, screenshots, or design assets, Pure SaaS analyzes their design intelligence without copying proprietary elements or cloning templates.

---

## 1. Principles of Reference Analysis

1. **Extract Principles, Not Pixels:** Deconstruct *why* a reference works—its information hierarchy, typography ratios, density, tone, and contrast—rather than cloning its exact palette or CSS code.
2. **Preserve Identity Independence:** The target product must develop its own coherent visual language tailored to its specific audience and market.
3. **Respect Intellectual Property:** Never copy logos, copyrighted brand copy, proprietary illustrations, or trademarked visual assets.

---

## 2. Deconstruction Framework

When analyzing a reference site or screenshot, evaluate the following ten dimensions:

| Dimension | Questions to Answer | Extraction Output |
| :--- | :--- | :--- |
| **1. Positioning & Tone** | Who is this for? Is it technical, enterprise, playful, or editorial? | Brand archetype, tone descriptors |
| **2. Layout & Grid** | Max width? Single vs multi-column? Symmetrical or split? | Container max-width, grid columns, alignment lines |
| **3. Typography Rhythm** | Font families? Display vs body contrast? Line heights? | Heading scale, body size, tracking adjustments |
| **4. Color Architecture** | Base canvas tone (warm/cool)? Accent color usage? Contrast? | Semantic color mapping, accent role restraint |
| **5. Information Flow** | What comes first? How is proof presented? | Content sequence (e.g. Hero -> Code demo -> Stats) |
| **6. Component Geometry** | Corner radii? Border styles? Elevation vs flat? | Radius token scale, border strength |
| **7. Visual Evidence** | Real product UI, terminal code, or illustrations? | Asset strategy (code snippets vs diagrams vs UI mocks) |
| **8. Interaction States** | Hover feedback? Focus visibility? Tactile response? | State transition durations, cursor indicators |
| **9. Responsive Logic** | How does the layout adapt on mobile? Touch-first changes? | Breakpoint adaptations, drawer nav vs bottom bar |
| **10. Anti-Slop Audit** | Does the reference avoid AI tropes? What makes it distinct? | Anti-pattern exclusions |

---

## 3. Case Studies: Firecrawl vs Butter

### Case Study A: Firecrawl (Technical Clarity & Product-Led Evidence)
- **Target Audience:** Developers, data engineers, AI builders.
- **Visual Personality:** Technical authority, high contrast, crisp monospace accents, energetic primary brand accent (vibrant orange `#ff5a00` or `#fa5d29`).
- **Composition Technique:** Immediate code snippet demonstration alongside value proposition. The product does not ask the user to imagine what it does; it shows the exact API request and JSON response.
- **Key Takeaways for SaaS:** For developer tools, demonstrate real code and API interactions early. Use clean dark surfaces for code terminals and crisp neutral surfaces for narrative copy.

### Case Study B: Butter (Expressive Typography & Media-Led Storytelling)
- **Target Audience:** Video creators, creative directors, multimedia editors.
- **Visual Personality:** Dynamic, expressive, confident, expansive scale, warm creative energy.
- **Composition Technique:** Oversized typography with tight tracking, dynamic aspect-ratio video canvases, deliberate pacing variations between dense feature controls and wide cinematic showcases.
- **Key Takeaways for SaaS:** For creative or media products, let visual assets lead the story. Restrain interface chrome and provide generous viewport space for rich media.

---

## 4. Provenance & Confidence Model

When recording reference data in a `reference-record.json` or `reference-record.md`, every extracted attribute must have an explicit confidence level:
- `measured`: Inspected directly in the DOM, computed styles, or raw CSS source files.
- `estimated`: Inferred visually from a screenshot or video recording.
- `unknown`: Not verifiable from the available materials (e.g., mobile layout not captured, focus states not documented).

Never convert an `estimated` value into an `approved` token without explicit design validation.

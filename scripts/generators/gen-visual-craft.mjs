import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/visual-craft');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const crafts = [
  {
    name: 'apple-visual-polish.md',
    title: 'Apple-Inspired Visual Polish & Hardware-Grade Craft',
    overview: 'The signature Apple design feel stems from extraordinary restraint, optical alignment, physics-based springs, and continuous corner geometry. Pure SaaS codifies these principles for high-end web applications.',
    pillars: [
      { pillar: 'Deference', detail: 'The interface steps back to elevate the user’s content and primary data' },
      { pillar: 'Clarity', detail: 'Every element has an unambiguous purpose; typography is legible at every scale' },
      { pillar: 'Depth & Materials', detail: 'Translucent materials layer surfaces naturally without loud, fake textures' },
      { pillar: 'Optical Precision', detail: 'Items are balanced according to human visual perception, not raw CSS math' }
    ],
    codeSnippet: `/* Apple-grade surface layering */
.macos-panel {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 12px 24px -4px rgba(0, 0, 0, 0.06);
  border-radius: 14px;
}

[data-theme="dark"] .macos-panel {
  background: rgba(30, 30, 32, 0.75);
  backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 20px 32px -8px rgba(0, 0, 0, 0.5);
}`,
    dos: [
      'Use subtle saturation boosting (`saturate(180%)`) with backdrop blur for luminous acrylics.',
      'Apply crisp hairline borders to separate dark surfaces from black canvas backgrounds.',
      'Respect macOS/iOS font tracking curves (tighter tracking for large titles, wider for captions).'
    ],
    donts: [
      'Never apply generic thick 50px blur overlays that drop frames on mobile devices.',
      'Avoid neon, oversaturated gradients that distract from application content.'
    ],
    accessibility: [
      'Provide opaque fallback backgrounds when backdrop-filter is unsupported or during high-contrast mode.'
    ]
  },
  {
    name: 'materials-vibrancy-blur.md',
    title: 'Materials, Vibrancy & Acrylic Backdrop Blur',
    overview: 'Materials simulate translucent physical surfaces that adopt the color temperature of underlying content while maintaining legible contrast.',
    pillars: [
      { pillar: 'Ultra-Thin Material', detail: '10-12px blur, 60% opacity for floating toolbars' },
      { pillar: 'Regular Material', detail: '20px blur, 75% opacity for navigation headers and sheets' },
      { pillar: 'Thick Material', detail: '30px blur, 88% opacity for modals and system dialogs' }
    ],
    codeSnippet: `.material-regular {
  background-color: var(--color-material-regular-bg);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid var(--color-material-border);
}`,
    dos: [
      'Always prefix with `-webkit-backdrop-filter` for Safari support.',
      'Pair translucent materials with an opaque fallback for older rendering engines.'
    ],
    donts: [
      'Do not layer more than two blurred elements on top of each other (severe GPU performance penalty).'
    ],
    accessibility: [
      'Contrast of text overlaid on blurred materials must be verified against worst-case background imagery.'
    ]
  },
  {
    name: 'light-dark-lighting-models.md',
    title: 'Light & Dark Lighting Models: Elevation vs Self-Illumination',
    overview: 'Light mode mimics overhead directional sunlight casting downward shadows. Dark mode mimics an environment where surfaces emit subtle luminescence and borders reveal edges.',
    pillars: [
      { pillar: 'Light Mode Lighting', detail: 'Overhead key light, soft ambient occlusion, shadows scale with elevation' },
      { pillar: 'Dark Mode Lighting', detail: 'Surfaces get lighter as they elevate (slate-950 -> slate-900 -> slate-800), borders illuminate edges' }
    ],
    codeSnippet: `/* Lighting model token definitions */
:root {
  --surface-base: #f9fafb;
  --surface-card: #ffffff;
  --surface-elevated: #ffffff;
  --border-light: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  /* Elevated surfaces get progressively lighter */
  --surface-base: #09090b;
  --surface-card: #141418;
  --surface-elevated: #1e1e24;
  --border-light: rgba(255, 255, 255, 0.1);
}`,
    dos: [
      'Elevate dark mode cards by increasing surface lightness rather than trying to cast black shadows on a black canvas.',
      'Use 1px light border rings (`rgba(255,255,255,0.08)`) to delineate dark card boundaries.'
    ],
    donts: [
      'Never invert colors with a naive CSS `filter: invert(1)`.'
    ],
    accessibility: [
      'Ensure WCAG contrast holds true across both lighting modes.'
    ]
  },
  {
    name: 'hairline-borders-separators.md',
    title: 'Hairline Borders, Separators & Sub-Pixel Sharpness',
    overview: 'Thick, muddy borders make interfaces look clumsy. Pure SaaS employs razor-sharp 1px (or 0.5px on Retina/High-DPI displays) hairline dividers.',
    pillars: [
      { pillar: 'Sub-Pixel Rendering', detail: 'Using box-shadow inset or transform scale for crisp 0.5px lines on 2x displays' },
      { pillar: 'Subtle Alpha Separators', detail: 'Using alpha-based border colors (`rgba(0,0,0,0.06)` or `rgba(255,255,255,0.08)`) to naturally adapt to varied backgrounds' }
    ],
    codeSnippet: `/* Crisp Retina hairline border */
.hairline-b {
  border-bottom: 1px solid var(--color-border-subtle);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .hairline-retina-b {
    position: relative;
  }
  .hairline-retina-b::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-border-subtle);
    transform: scaleY(0.5);
    transform-origin: bottom;
  }
}`,
    dos: [
      'Use alpha borders (`rgba(...)`) so dividing rules blend seamlessly across dynamic surfaces.',
      'Prefer `box-shadow: inset 0 0 0 1px ...` when border widths might cause box-sizing layout shifts.'
    ],
    donts: [
      'Avoid high-contrast harsh solid black borders around every element.'
    ],
    accessibility: [
      'Interactive form control borders must still meet WCAG 3:1 contrast requirements.'
    ]
  },
  {
    name: 'shadow-bloom-ambient-occlusion.md',
    title: 'Shadow Bloom & Ambient Occlusion Techniques',
    overview: 'Realistic depth requires separating the soft ambient shadow (contact occlusion) from the directional key light shadow.',
    pillars: [
      { pillar: 'Ambient Contact Shadow', detail: 'Tight spread, low blur, anchors object to the surface immediately below' },
      { pillar: 'Directional Key Shadow', detail: 'Larger Y-offset, wide blur, simulates overhead illumination' },
      { pillar: 'Color Tinted Bloom', detail: 'Sampling 5-10% of the brand accent color into the glow shadow' }
    ],
    codeSnippet: `/* Multi-layer ambient occlusion + directional shadow */
.card-elevation {
  box-shadow:
    0 1px 2px -0.5px rgba(0, 0, 0, 0.06),   /* Ambient contact shadow */
    0 4px 8px -2px rgba(0, 0, 0, 0.08),     /* Mid-layer occlusion */
    0 16px 24px -6px rgba(0, 0, 0, 0.05);   /* Directional soft bloom */
}`,
    dos: [
      'Combine at least 2 shadow declarations for natural physical lighting.',
      'Keep shadow blur radii proportional to elevation distance.'
    ],
    donts: [
      'Never use single-stop dark shadows with 0 blur and 50% opacity.'
    ],
    accessibility: [
      'Do not rely solely on shadows to distinguish clickable components.'
    ]
  },
  {
    name: 'fluid-spring-physics.md',
    title: 'Fluid Spring Physics & Animation Curves',
    overview: 'Linear transitions feel mechanical and robotic. Pure SaaS mandates physics-based spring curves that accelerate quickly and decelerate smoothly with natural inertia.',
    pillars: [
      { pillar: 'Snappy Spring', detail: 'cubic-bezier(0.16, 1, 0.3, 1) — immediate response with silky damping' },
      { pillar: 'Bouncy Spring', detail: 'cubic-bezier(0.175, 0.885, 0.32, 1.275) — slight playful overshoot for toggles and badges' },
      { pillar: 'Exit Curve', detail: 'cubic-bezier(0.4, 0, 1, 1) — swift exit acceleration' }
    ],
    codeSnippet: `:root {
  --ease-spring-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  --duration-micro: 120ms;
  --duration-tactile: 200ms;
  --duration-panel: 320ms;
}

.button-interactive {
  transition: transform var(--duration-micro) var(--ease-spring-bounce);
}
.button-interactive:active {
  transform: scale(0.97);
}`,
    dos: [
      'Use snappy spring curves for UI controls that users click frequently.',
      'Keep interactive micro-interaction durations under 200ms.'
    ],
    donts: [
      'Never use `transition: all 0.5s linear` for buttons or modals.',
      'Avoid excessive bounce oscillations that delay user focus.'
    ],
    accessibility: [
      'Always wrap spring animations in `@media (prefers-reduced-motion: no-preference)`.'
    ]
  },
  {
    name: 'staggered-entrance-motion.md',
    title: 'Staggered Entrance Motion & Cascading Reveals',
    overview: 'When lists or grids mount, staggering item reveals by 30-50ms directs eye flow naturally without cognitive overload.',
    pillars: [
      { pillar: 'Stagger Offset', detail: '30ms to 40ms per consecutive child item' },
      { pillar: 'Distance Constraint', detail: 'Translate distance capped at 8px - 16px to prevent exaggerated jumping' },
      { pillar: 'Intersection Observer Gate', detail: 'Only trigger animation when elements scroll into active viewport' }
    ],
    codeSnippet: `@keyframes revealFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item {
  animation: revealFadeUp 350ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 40ms; }
.stagger-item:nth-child(3) { animation-delay: 80ms; }
.stagger-item:nth-child(4) { animation-delay: 120ms; }`,
    dos: [
      'Cap total stagger sequence duration under 400ms.',
      'Animate `transform` and `opacity` only (avoid animating layout properties like height or margin).'
    ],
    donts: [
      'Do not stagger more than 8 items in a single view (causes perceived lag).'
    ],
    accessibility: [
      'Set `animation: none !important; opacity: 1 !important; transform: none !important;` under prefers-reduced-motion.'
    ]
  },
  {
    name: 'visual-weight-asymmetry.md',
    title: 'Visual Weight, Composition Asymmetry & Focal Control',
    overview: 'Symmetrical grids often become monotonous and visually boring. Asymmetric layouts create intentional tension that guides user attention to high-value focal points.',
    pillars: [
      { pillar: '60/40 Composition', detail: 'Dominant content area paired with supporting secondary panel' },
      { pillar: 'Scale Contrast', detail: 'Juxtaposing an oversized metric against tight, dense tabular data' },
      { pillar: 'Generous Negative Space', detail: 'Empty margin acts as an optical spotlight around critical actions' }
    ],
    codeSnippet: `<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
  <div className="lg:col-span-7">
    {/* Dominant focus section with large headline and primary CTA */}
  </div>
  <div className="lg:col-span-5">
    {/* Secondary supporting proof or interactive preview */}
  </div>
</div>`,
    dos: [
      'Vary card sizes in a bento grid based on information importance rather than rigid equal splits.',
      'Use negative space to give primary CTAs breathing room.'
    ],
    donts: [
      'Avoid 4 consecutive rows of identical 3-column cards.'
    ],
    accessibility: [
      'Ensure DOM tab order follows logical reading order regardless of visual asymmetry.'
    ]
  },
  {
    name: 'optical-alignment-centering.md',
    title: 'Optical Alignment vs Mathematical Centering',
    overview: 'Mathematical centering frequently looks off-center to the human eye due to typographic ascenders/descenders, icon visual weight, and asymmetric shapes.',
    pillars: [
      { pillar: 'Play Triangle Offset', detail: 'Play icons require ~10% horizontal rightward nudging due to triangular center of mass' },
      { pillar: 'Cap-Height Text Centering', detail: 'Align icons to the uppercase cap-height rather than total font line-box' },
      { pillar: 'Badge Baseline Alignment', detail: 'Nudge inline status badges by -1px for baseline balance' }
    ],
    codeSnippet: `/* Optical adjustment for play button triangle */
.play-button svg {
  transform: translateX(1px); /* Nudges visual center of triangle */
}

/* Align icon with text cap-height */
.icon-text-row {
  display: flex;
  align-items: center;
}
.icon-text-row svg {
  margin-top: -1px; /* Optical baseline correction */
}`,
    dos: [
      'Visually inspect centered play buttons and asymmetric icons and nudge by 1-2px.',
      'Check vertical icon alignment against adjacent text cap-height.'
    ],
    donts: [
      'Never blindly trust flexbox `items-center` without checking typographic ascender bias.'
    ],
    accessibility: [
      'Optical CSS nudges must not disrupt container focus rings.'
    ]
  },
  {
    name: 'micro-interaction-feedback.md',
    title: 'Micro-Interaction Tactile Feedback',
    overview: 'Micro-interactions communicate state changes with delightful, tactile physical confirmation.',
    pillars: [
      { pillar: 'Button Press Depth', detail: 'scale(0.98) on active press' },
      { pillar: 'Copy to Clipboard', detail: 'Icon morphs into checkmark with green spring pulse, returning after 2s' },
      { pillar: 'Toggle Click Snap', detail: 'Knob stretches slightly (scaleX(1.1)) during transit' }
    ],
    codeSnippet: `// Copy button with micro-interaction state
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
}`,
    dos: [
      'Keep feedback immediate (0-10ms response to pointer down).',
      'Provide tactile visual changes on active press.'
    ],
    donts: [
      'Do not delay execution of actions for animations to play out.'
    ],
    accessibility: [
      'Ensure dynamic state changes (e.g. "Copied") are communicated to screen readers.'
    ]
  }
];

let created = 0;
for (const c of crafts) {
  const filePath = path.join(targetDir, c.name);
  let content = `# ${c.title}\n\n`;
  content += `${c.overview}\n\n---\n\n`;
  content += `## 1. Craft Pillars & Core Mechanisms\n\n`;
  content += `| Principle / Mechanism | Concrete Specification |\n`;
  content += `| :--- | :--- |\n`;
  for (const p of c.pillars) {
    content += `| **${p.pillar}** | ${p.detail} |\n`;
  }
  content += `\n---\n\n## 2. Code & Style Implementation\n\n`;
  content += `\`\`\`css\n${c.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(c.dos.length, c.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const d = c.dos[i] || '';
    const dn = c.donts[i] || '';
    content += `| ${d} | ${dn} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Performance Verification\n\n`;
  for (const a of c.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.\n`;
  content += `- Elevate visual quality through genuine typography, materials, and physics.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} visual craft references in references/visual-craft/`);

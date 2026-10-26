import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/accessibility');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const docs = [
  {
    name: 'wcag-22-conformance-matrix.md',
    title: 'WCAG 2.2 AA Conformance Matrix & Compliance Gates',
    overview: 'WCAG 2.2 introduces critical criteria around focus appearance, dragging movements, and target sizes. Pure SaaS treats WCAG 2.2 Level AA compliance as a non-negotiable release gate.',
    criteria: [
      { num: '2.4.11', name: 'Focus Appearance (Minimum)', req: 'Focus indicator has an area of at least 1px border perimeter and 3:1 contrast against adjacent background' },
      { num: '2.4.12', name: 'Focus Not Obscured (Minimum)', req: 'Focused items must not be hidden entirely by sticky headers, footers, or non-modal dialogs' },
      { num: '2.5.7', name: 'Dragging Movements', req: 'Any dragging action (reorder, slider) must offer a single-pointer tap/click alternative' },
      { num: '2.5.8', name: 'Target Size (Minimum)', req: 'Interactive targets must be at least 24x24px or have sufficient spacing offset' }
    ],
    codeSnippet: `/* WCAG 2.2 Compliant Focus Ring */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: inherit;
}

/* Ensure sticky elements do not obscure focused elements */
:target, :focus {
  scroll-margin-top: 80px; /* Offset for sticky top navbar */
  scroll-margin-bottom: 40px;
}`,
    dos: [
      'Audit all interactive elements against the 9 new WCAG 2.2 AA criteria.',
      'Provide single-pointer click buttons alongside all drag interactions.'
    ],
    donts: [
      'Never suppress `:focus-visible` without styling a replacement ring.'
    ],
    accessibility: [
      'Enforce automated CI checking with axe-core and Lighthouse.'
    ]
  },
  {
    name: 'accessible-color-contrast.md',
    title: 'Accessible Color Contrast & APCA Verification',
    overview: 'Contrast guarantees that text and visual elements can be deciphered by users with moderate visual impairments and across challenging lighting conditions.',
    criteria: [
      { num: '1.4.3', name: 'Contrast (Minimum)', req: '4.5:1 for normal text (<18pt or <14pt bold); 3.0:1 for large text' },
      { num: '1.4.11', name: 'Non-text Contrast', req: '3.0:1 for UI component borders, checkmarks, and focus rings' },
      { num: 'APCA', name: 'Advanced Perceptual Contrast Algorithm', req: 'Evaluates perceived contrast based on font-weight, polarity (light on dark vs dark on light), and spatial frequency' }
    ],
    codeSnippet: `// Pure SaaS contrast check script
$ npx pure-saas contrast DESIGN.md
// Computes exact mathematical luminance ratios for all documented token pairs`,
    dos: [
      'Test contrast across both light mode and dark mode pairings.',
      'Increase font-weight or size if a color falls near the 4.5:1 boundary.'
    ],
    donts: [
      'Never place light gray text (#9ca3af) on pure white backgrounds.'
    ],
    accessibility: [
      'Contrast must be verified mathematically, never guessed visually.'
    ]
  },
  {
    name: 'screen-reader-announcements-aria.md',
    title: 'Screen Reader Announcements & ARIA Live Regions',
    overview: 'Dynamic web applications change state without full page reloads. ARIA live regions announce asynchronous events to assistive technologies.',
    criteria: [
      { num: 'aria-live="polite"', name: 'Polite Region', req: 'Waits until user is idle before speaking (toasts, search result counts)' },
      { num: 'aria-live="assertive"', name: 'Assertive Region', req: 'Interrupts current speech immediately for urgent errors or session timeouts' },
      { num: 'aria-atomic="true"', name: 'Atomic Announcement', req: 'Reads the entire live container content instead of only the changed delta' }
    ],
    codeSnippet: `<div
  id="live-announcer"
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>`,
    dos: [
      'Use `aria-live="polite"` for non-critical confirmations like "Copied to clipboard".',
      'Keep visually hidden announcer elements mounted in the DOM before injecting text.'
    ],
    donts: [
      'Never overuse `aria-live="assertive"` for routine background operations.'
    ],
    accessibility: [
      'Screen readers rely on live regions to understand SPA view transitions.'
    ]
  },
  {
    name: 'accessible-dialogs-modals.md',
    title: 'Accessible Modal Dialogs & Alert Dialogs',
    overview: 'Dialogs demand strict focus containment, background inertness, and appropriate role semantics.',
    criteria: [
      { num: 'role="dialog"', name: 'Standard Dialog', req: 'Interactive modal window with focus trap and title labeling' },
      { num: 'role="alertdialog"', name: 'Alert Dialog', req: 'Used for critical confirmation prompts requiring immediate user attention' },
      { num: 'aria-modal="true"', name: 'Modal Flag', req: 'Signals assistive technology that content outside the dialog is inert' }
    ],
    codeSnippet: `<div
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-desc"
  className="p-6 bg-[var(--color-surface-overlay)] rounded-2xl shadow-2xl"
>
  <h2 id="alert-title" className="text-base font-bold text-red-500">Delete production cluster?</h2>
  <p id="alert-desc" className="text-xs text-neutral-400 mt-2">This action is permanent and cannot be undone.</p>
  <div className="flex justify-end gap-3 mt-6">
    <button className="px-3 py-1.5 text-xs">Cancel</button>
    <button className="px-3 py-1.5 text-xs bg-red-600 text-white rounded">Delete</button>
  </div>
</div>`,
    dos: [
      'Use `aria-labelledby` linked to the heading inside the dialog.',
      'Restore focus to trigger button upon close.'
    ],
    donts: [
      'Do not allow background elements to be focusable or clickable while dialog is open.'
    ],
    accessibility: [
      'ESC key must close the dialog immediately.'
    ]
  },
  {
    name: 'accessible-forms-validation.md',
    title: 'Accessible Form Architecture & Field Groupings',
    overview: 'Forms must present unambiguous labels, associated descriptions, and programmatic error associations.',
    criteria: [
      { num: '<label htmlFor="...">', name: 'Explicit Label', req: 'Every form control must have a visible, programmatically linked label' },
      { num: 'aria-describedby', name: 'Helper & Error Association', req: 'Connects instruction text and error alerts directly to the input' },
      { num: 'aria-invalid="true"', name: 'Error Flag', req: 'Announces error condition immediately upon focus' }
    ],
    codeSnippet: `<div className="space-y-1">
  <label htmlFor="card-number" className="text-xs font-semibold">Card Number</label>
  <input
    id="card-number"
    type="text"
    inputMode="numeric"
    autoComplete="cc-number"
    aria-invalid={isInvalid}
    aria-describedby={isInvalid ? "card-error" : "card-help"}
    className="h-10 px-3 border rounded-lg w-full"
  />
  {isInvalid && <p id="card-error" role="alert" className="text-xs text-red-500">Please enter a valid card number.</p>}
</div>`,
    dos: [
      'Always associate labels with inputs using matching `id` and `for` / `htmlFor`.',
      'Provide autocomplete attributes for known browser fields.'
    ],
    donts: [
      'Never substitute placeholder text for a true `<label>` element.'
    ],
    accessibility: [
      'WCAG 3.3.2 Labels or Instructions.'
    ]
  },
  {
    name: 'accessible-data-tables.md',
    title: 'Accessible Data Table Semantics & Keyboard Scrolling',
    overview: 'Complex data tables require explicit column and row headers, sort announcements, and keyboard-accessible scroll containers.',
    criteria: [
      { num: 'scope="col" / scope="row"', name: 'Header Association', req: 'Enables screen readers to announce column and row context for every data cell' },
      { num: 'aria-sort', name: 'Sort State', req: 'Values: "ascending", "descending", or "none" on sorted table headers' },
      { num: 'tabindex="0"', name: 'Scrollable Container', req: 'Ensures keyboard-only users can scroll wide tables horizontally' }
    ],
    codeSnippet: `<div tabIndex={0} aria-label="Customer Orders Table" className="overflow-x-auto focus:ring-2 focus:ring-blue-500 rounded-lg">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending">
          <button className="flex items-center gap-1">Order ID ▲</button>
        </th>
        <th scope="col">Customer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">#1042</th>
        <td>Jane Doe</td>
      </tr>
    </tbody>
  </table>
</div>`,
    dos: [
      'Put `tabIndex={0}` on horizontally overflowing table wrappers.',
      'Use `caption` or `aria-label` to give the table an accessible name.'
    ],
    donts: [
      'Never build data tables using nested `<div>` tags without applying full ARIA table roles.'
    ],
    accessibility: [
      'WCAG 1.3.1 Info and Relationships.'
    ]
  },
  {
    name: 'reduced-motion-high-contrast.md',
    title: 'Reduced Motion & Forced High-Contrast Adaptations',
    overview: 'Operating system accessibility preferences must be respected: reduced motion for vestibular safety and forced-colors for Windows High Contrast mode.',
    criteria: [
      { num: 'prefers-reduced-motion', name: 'Vestibular Protection', req: 'Disables parallax, large zooms, and rapid transitions; preserves opacity fades' },
      { num: 'forced-colors: active', name: 'Windows High Contrast', req: 'Enforces system colors (Canvas, CanvasText, Highlight); requires visible borders' }
    ],
    codeSnippet: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (forced-colors: active) {
  .btn-primary {
    border: 1px solid ButtonText;
  }
  .card {
    border: 1px solid CanvasText;
  }
}`,
    dos: [
      'Ensure 1px solid transparent borders exist on dark surfaces so Windows High Contrast can render them.',
      'Replace large translations with simple opacity dissolves under reduced motion.'
    ],
    donts: [
      'Never ignore prefers-reduced-motion for continuous background shader animations.'
    ],
    accessibility: [
      'WCAG 2.3.3 Animation from Interactions.'
    ]
  },
  {
    name: 'accessible-touch-targets.md',
    title: 'Accessible Touch Targets & Target Spacing (WCAG 2.5.8)',
    overview: 'Users with tremors, motor impairments, or large fingers struggle with crowded buttons. Pure SaaS guarantees adequate physical target sizing.',
    criteria: [
      { num: '2.5.8 Target Size', name: 'WCAG 2.2 Minimum', req: 'At least 24x24 CSS pixels, or offset by sufficient space to adjacent targets' },
      { num: 'Mobile Standard', name: 'Apple HIG / Android', req: 'Minimum 44x44pt on iOS; 48x48dp on Android' }
    ],
    codeSnippet: `/* Touch target expansion pseudo-element */
.touch-target-sm {
  position: relative;
}
.touch-target-sm::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
  width: 100%;
  height: 100%;
}`,
    dos: [
      'Use invisible pseudo-elements (`::before`) to expand clickable hit targets of small 16px icon buttons to 44px.',
      'Maintain at least 8px margin between adjacent clickable elements.'
    ],
    donts: [
      'Never place critical navigation links spaced 2px apart on mobile touch interfaces.'
    ],
    accessibility: [
      'WCAG 2.5.8 Target Size (Minimum).'
    ]
  },
  {
    name: 'accessible-svg-iconography.md',
    title: 'Accessible SVG Iconography & Visual Symbols',
    overview: 'Icons must be treated according to their functional intent: decorative icons must be hidden from screen readers, while standalone action icons require accessible labels.',
    criteria: [
      { num: 'aria-hidden="true"', name: 'Decorative Icons', req: 'Applied to icons that accompany visible text labels to prevent duplicate screen reader announcements' },
      { num: 'role="img" + aria-label', name: 'Standalone Icons', req: 'Applied to icon-only buttons (search, close, settings) to describe their function' }
    ],
    codeSnippet: `// 1. Decorative icon next to text
<button className="flex items-center gap-2">
  <svg aria-hidden="true" className="w-4 h-4"><path d="..." /></svg>
  <span>Download Log</span>
</button>

// 2. Standalone icon button
<button aria-label="Close modal dialog" className="p-2">
  <svg aria-hidden="true" className="w-4 h-4"><path d="..." /></svg>
</button>`,
    dos: [
      'Always add `aria-hidden="true"` to SVGs that accompany visible text.',
      'Always provide an explicit `aria-label` or visually hidden span on icon-only buttons.'
    ],
    donts: [
      'Never render an icon-only button without an accessible name.'
    ],
    accessibility: [
      'WCAG 1.1.1 Non-text Content.'
    ]
  },
  {
    name: 'accessible-navigation-menus.md',
    title: 'Accessible Navigation Menus & Disclosure Submenus',
    overview: 'Multi-level navigation menus must allow keyboard users to tab past top-level categories without having to traverse dozens of hidden sub-links.',
    criteria: [
      { num: '<nav aria-label="...">', name: 'Landmark Identification', req: 'Differentiates primary navigation from footer and breadcrumb navs' },
      { num: 'aria-expanded', name: 'Submenu Disclosure', req: 'Signals whether a dropdown submenu is currently open or collapsed' },
      { num: 'aria-current="page"', name: 'Current Location', req: 'Explicitly identifies the active link in the navigation structure' }
    ],
    codeSnippet: `<nav aria-label="Main Navigation">
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
</nav>`,
    dos: [
      'Use disclosure buttons (`<button aria-expanded="...">`) for navigation submenus.',
      'Allow Escape to collapse open flyout menus.'
    ],
    donts: [
      'Never open flyout submenus solely on mouse hover without supporting keyboard focus.'
    ],
    accessibility: [
      'WCAG 2.1.1 Keyboard & 2.4.4 Link Purpose.'
    ]
  }
];

let created = 0;
for (const d of docs) {
  const filePath = path.join(targetDir, d.name);
  let content = `# ${d.title}\n\n`;
  content += `${d.overview}\n\n---\n\n`;
  content += `## 1. Compliance Criteria & Specifications\n\n`;
  content += `| Standard / Criterion | Name | Technical Requirement |\n`;
  content += `| :--- | :--- | :--- |\n`;
  for (const c of d.criteria) {
    content += `| **${c.num}** | ${c.name} | ${c.req} |\n`;
  }
  content += `\n---\n\n## 2. Accessible Implementation Example\n\n`;
  content += `\`\`\`tsx\n${d.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(d.dos.length, d.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const doItem = d.dos[i] || '';
    const dontItem = d.donts[i] || '';
    content += `| ${doItem} | ${dontItem} |\n`;
  }
  content += `\n---\n\n## 4. Testing & Verification Protocol\n\n`;
  for (const a of d.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} accessibility references in references/accessibility/`);


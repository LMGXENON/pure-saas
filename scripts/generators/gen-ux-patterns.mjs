import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/ux-patterns');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const patterns = [
  {
    name: 'keyboard-shortcuts-navigation.md',
    title: 'Keyboard Shortcuts & Global Navigation Systems',
    overview: 'Keyboard shortcuts transform productivity web applications into power-user environments. Pure SaaS standardizes key combination handling, collision prevention, platform-adaptive modifiers (Cmd on macOS vs Ctrl on Windows), and shortcut discovery overlays.',
    aspects: [
      { key: 'Modifier Normalization', detail: 'Automatically map metaKey on Apple platforms to ctrlKey on Windows/Linux' },
      { key: 'Collision Avoidance', detail: 'Never intercept browser native shortcuts (Cmd+R, Cmd+T, Cmd+W, Cmd+L)' },
      { key: 'Input Context Bypassing', detail: 'Disable global single-letter keys (e.g. "?", "j", "k") when focus is inside an input, textarea, or contentEditable' },
      { key: 'Discovery Overlay', detail: 'Pressing "?" triggers a grouped cheat-sheet modal of all registered shortcuts' }
    ],
    codeSnippet: `import { useEffect } from 'react';

export function useKeyboardShortcut(
  keyCombo: string, // e.g. "mod+k", "mod+s"
  callback: (e: KeyboardEvent) => void,
  options: { enableInInputs?: boolean } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (e.target as HTMLElement)?.tagName
      ) || (e.target as HTMLElement)?.isContentEditable;

      if (isInput && !options.enableInInputs) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierPressed = isMac ? e.metaKey : e.ctrlKey;

      const [mod, key] = keyCombo.toLowerCase().split('+');
      if (mod === 'mod' && modifierPressed && e.key.toLowerCase() === key) {
        e.preventDefault();
        callback(e);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyCombo, callback, options.enableInInputs]);
}`,
    dos: [
      'Render visual shortcut badges (<kbd>⌘K</kbd>) next to menu items and buttons.',
      'Provide a shortcut cheat sheet accessible via "?" key or Help menu.',
      'Allow users to disable single-key shortcuts in accessibility settings.'
    ],
    donts: [
      'Never hijack browser navigation shortcuts (Cmd+W, Cmd+N, Cmd+Tab).',
      'Do not fire destructive actions via single-key shortcuts without confirmation or undo.'
    ],
    accessibility: [
      'WCAG 2.1.4 Character Key Shortcuts: If a shortcut uses only a single character, provide a mechanism to turn it off or remap it.'
    ]
  },
  {
    name: 'focus-management-trapping.md',
    title: 'Focus Management, Trapping & Restoration',
    overview: 'Proper focus management guarantees that keyboard and screen-reader users can navigate web applications without getting stranded or losing their place after dialog interactions.',
    aspects: [
      { key: 'Focus Trapping', detail: 'Looping Tab and Shift+Tab within active modal dialogs, sheets, or popovers' },
      { key: 'Initial Focus', detail: 'Focusing the first interactive element or title upon dialog mount' },
      { key: 'Focus Restoration', detail: 'Returning document focus to the exact trigger element when an overlay closes' },
      { key: 'Roving Tabindex', detail: 'Managing focus across toolbars, tabs, or grids using arrow keys and tabindex="-1"' }
    ],
    codeSnippet: `import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}`,
    dos: [
      'Always store document.activeElement before opening overlays to restore focus cleanly.',
      'Ensure the focus ring remains clearly visible on trapped elements.'
    ],
    donts: [
      'Never allow Tab focus to leak into the background DOM behind a modal.',
      'Do not focus on non-interactive text elements unless necessary for long reading dialogs.'
    ],
    accessibility: [
      'WCAG 2.4.3 Focus Order: Focus moves sequentially and logically.',
      'WCAG 2.4.7 Focus Visible: Focus indicator is never suppressed.'
    ]
  },
  {
    name: 'loading-skeletons-spinners.md',
    title: 'Loading Skeletons, Micro-Spinners & Shimmer States',
    overview: 'Perceived performance is heavily dictated by loading patterns. Pure SaaS uses content-matched skeleton shimmers to eliminate Cumulative Layout Shift (CLS) and reserves spinners for inline actions.',
    aspects: [
      { key: 'Skeleton Matching', detail: 'Skeleton elements mirror the exact dimensions and typography of the incoming content' },
      { key: 'Shimmer Gradient', detail: 'Subtle wave animation with 1.5s - 2s duration; respects prefers-reduced-motion' },
      { key: 'Delay Thresholds', detail: 'Do not render loading indicators for operations that complete within 200ms (avoids flicker)' },
      { key: 'Button Spinners', detail: 'Preserve the original button width while spinning to prevent layout shift' }
    ],
    codeSnippet: `// Accessible skeleton primitive
export const Skeleton: React.FC<{ className?: string; rounded?: string }> = ({
  className = 'w-full h-4',
  rounded = 'rounded-md'
}) => (
  <div
    role="status"
    aria-label="Loading..."
    className={\`bg-[var(--color-surface-muted)] relative overflow-hidden \${rounded} \${className}\`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);`,
    dos: [
      'Match skeleton widths and heights precisely to typography and card dimensions.',
      'Disable shimmer animation when prefers-reduced-motion is active.'
    ],
    donts: [
      'Never flash a full-page loading spinner for fast AJAX updates.',
      'Do not display generic blank rectangles without accessible loading labels.'
    ],
    accessibility: [
      'Include role="status" and visually hidden text ("Loading...") so assistive tech is aware.'
    ]
  },
  {
    name: 'empty-states-onboarding.md',
    title: 'Empty States, Zero-Data Fallbacks & Starter Guidance',
    overview: 'Empty states are prime educational real estate. Rather than presenting dead ends, Pure SaaS designs empty states that celebrate potential, explain the value, and offer immediate one-click initiation.',
    aspects: [
      { key: 'Illustrative Anchor', role: 'Calm, minimal SVG illustration or icon reflecting the entity (no generic clip art)' },
      { key: 'Clear Heading', role: 'Action-oriented headline (e.g. "No webhooks configured yet")' },
      { key: 'Educational Microcopy', role: 'One concise sentence explaining what webhooks do and why they matter' },
      { key: 'Primary Call to Action', role: 'Prominent button to create the first item or load demo template data' }
    ],
    codeSnippet: `<div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-surface-base)]">
  <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-muted)] flex items-center justify-center text-xl text-[var(--color-text-secondary)] mb-4">
    📦
  </div>
  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">No deployments found</h3>
  <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mt-1 mb-6">
    Connect your GitHub repository to trigger your first autonomous edge deployment.
  </p>
  <button className="h-9 px-4 rounded-lg bg-[var(--color-accent-primary)] text-white text-xs font-medium hover:opacity-90 transition-opacity">
    + Create First Deployment
  </button>
</div>`,
    dos: [
      'Provide an option to load sample or sandbox data so users can explore the UI immediately.',
      'Differentiate between "first-time empty" and "no search results found".'
    ],
    donts: [
      'Never show a raw blank table with no rows and zero explanation.'
    ],
    accessibility: [
      'Ensure the empty state has a clear heading level that screen readers can discover.'
    ]
  },
  {
    name: 'inline-validation-errors.md',
    title: 'Inline Validation & Real-Time Form Error Handling',
    overview: 'Inline validation guides users to correct mistakes as early as possible without prematurely nagging them before they finish typing.',
    aspects: [
      { key: 'Validate on Blur', detail: 'Perform format validation after the user leaves the field for the first time' },
      { key: 'Re-validate on Change', detail: 'Once marked invalid, validate on keystroke so error clears immediately upon resolution' },
      { key: 'Specific Microcopy', detail: 'Explain how to fix the issue (e.g., "Must be at least 8 characters with 1 number")' }
    ],
    codeSnippet: `<div className="flex flex-col gap-1.5">
  <label htmlFor="user-slug" className="text-xs font-semibold text-[var(--color-text-secondary)]">Workspace Slug</label>
  <input
    id="user-slug"
    aria-invalid="true"
    aria-describedby="user-slug-error"
    defaultValue="invalid slug!"
    className="h-10 px-3 rounded-lg border border-[var(--color-danger-base)] bg-[var(--color-surface-base)] text-sm focus:ring-2 focus:ring-[var(--color-danger-ring)]"
  />
  <div id="user-slug-error" role="alert" className="flex items-center gap-1.5 text-xs text-[var(--color-danger-text)] font-medium">
    <span>⚠️</span>
    <span>Slug may only contain lowercase letters, numbers, and hyphens.</span>
  </div>
</div>`,
    dos: [
      'Connect error text to the input using aria-describedby.',
      'Use role="alert" so screen readers speak the error message.'
    ],
    donts: [
      'Never show aggressive red errors while the user is typing their very first character.',
      'Never clear user-entered values upon form validation failure.'
    ],
    accessibility: [
      'WCAG 3.3.1 Error Identification & 3.3.3 Error Suggestion.'
    ]
  },
  {
    name: 'form-steppers-wizards.md',
    title: 'Form Steppers & Multi-Step Progress Flows',
    overview: 'Steppers divide long, complex forms into bite-sized, logical milestones, lowering cognitive fatigue and drop-off rates.',
    aspects: [
      { key: 'Completed Steps', detail: 'Visual checkmark, clickable to return and edit previous answers' },
      { key: 'Current Step', detail: 'Highlighted step number with high-contrast text and aria-current="step"' },
      { key: 'Future Steps', detail: 'Muted indicator, non-interactive until preceding steps are validated' }
    ],
    codeSnippet: `<ol className="flex items-center w-full max-w-2xl mx-auto mb-8">
  <li className="flex items-center text-[var(--color-accent-primary)] font-medium text-xs">
    <span className="w-6 h-6 rounded-full bg-[var(--color-accent-primary)] text-white flex items-center justify-center mr-2">✓</span>
    <span>Account</span>
    <div className="w-12 h-0.5 bg-[var(--color-accent-primary)] mx-4" />
  </li>
  <li className="flex items-center text-[var(--color-text-primary)] font-medium text-xs" aria-current="step">
    <span className="w-6 h-6 rounded-full border-2 border-[var(--color-accent-primary)] flex items-center justify-center mr-2 font-bold">2</span>
    <span>Workspace</span>
    <div className="w-12 h-0.5 bg-[var(--color-border-subtle)] mx-4" />
  </li>
  <li className="flex items-center text-[var(--color-text-muted)] text-xs">
    <span className="w-6 h-6 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center mr-2">3</span>
    <span>Billing</span>
  </li>
</ol>`,
    dos: [
      'Validate current step inputs before permitting transition to the next step.',
      'Autosave draft progress in local storage or database.'
    ],
    donts: [
      'Never prevent users from navigating backward to check earlier inputs.'
    ],
    accessibility: [
      'Use <ol> and aria-current="step" for programmatic state.'
    ]
  },
  {
    name: 'optimistic-ui-updates.md',
    title: 'Optimistic UI Updates & Instant Feedback',
    overview: 'Optimistic updates assume backend operations will succeed, immediately updating the visual state and rolling back with an informative alert if the server rejects the request.',
    aspects: [
      { key: 'Instant State Mutation', detail: 'Reflect toggle, like, bookmark, or creation immediately in local state' },
      { key: 'Rollback Ledger', detail: 'Maintain previous snapshot in memory to restore if API promise rejects' },
      { key: 'Failure Notification', detail: 'Display an undoable toast error if the server call fails' }
    ],
    codeSnippet: `// Pattern: React optimistic update with rollback
const [likes, setLikes] = useState(120);
const [hasLiked, setHasLiked] = useState(false);

const handleToggleLike = async () => {
  const prevLikes = likes;
  const prevHasLiked = hasLiked;

  // 1. Optimistic immediate update
  setHasLiked(!hasLiked);
  setLikes(hasLiked ? likes - 1 : likes + 1);

  try {
    await api.toggleLike();
  } catch (err) {
    // 2. Rollback on failure
    setLikes(prevLikes);
    setHasLiked(prevHasLiked);
    toast.error("Could not record like. Please check connection.");
  }
};`,
    dos: [
      'Use for low-risk, high-frequency interactions (favorites, toggles, upvotes, task completion).',
      'Quietly synchronize final server response data in the background.'
    ],
    donts: [
      'Never use optimistic UI for destructive, unrecoverable actions or payments.'
    ],
    accessibility: [
      'Notify screen readers if an action fails and is rolled back.'
    ]
  },
  {
    name: 'undo-destructive-actions.md',
    title: 'Undo Patterns vs Destructive Confirmation Dialogs',
    overview: 'Modern UX favors forgiving interfaces with instantaneous "Undo" over intrusive confirmation modals that induce dialog fatigue.',
    aspects: [
      { key: 'Soft Deletion', detail: 'Move items to a "Trash" or mark as deleted with a 5-second undo toast window' },
      { key: 'Confirmation Modal Exception', detail: 'Reserve modal popups strictly for irreversible data destruction (e.g. workspace deletion)' },
      { key: 'Type-to-Confirm', detail: 'Require typing the exact entity name for catastrophic operations' }
    ],
    codeSnippet: `<div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-lg">
  <span className="text-xs text-[var(--color-text-primary)]">Item deleted.</span>
  <button 
    onClick={handleUndo} 
    className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline"
  >
    Undo (5s)
  </button>
</div>`,
    dos: [
      'Use toast undo for email archiving, list item deletion, and status changes.',
      'Implement soft-deletes in backend schemas.'
    ],
    donts: [
      'Never pop up a confirmation modal for trivial actions like dismissing a notification.'
    ],
    accessibility: [
      'Ensure the Undo toast has adequate display time (minimum 5000ms).'
    ]
  },
  {
    name: 'drag-drop-interactions.md',
    title: 'Accessible Drag and Drop Interactions',
    overview: 'Drag-and-drop handles kanban boards, file uploads, and list reordering. Pure SaaS requires full keyboard parity and screen reader announcements alongside mouse drag.',
    aspects: [
      { key: 'Drop Target Visuals', detail: 'Clear active border highlight and ghost silhouette where item will land' },
      { key: 'Keyboard Reordering', detail: 'Space to pick up item, Arrow keys to reposition, Space/Enter to drop, ESC to cancel' },
      { key: 'Screen Reader Announcements', detail: 'Live announcements: "Picked up item. Position 2 of 5. Press up/down to move."' }
    ],
    codeSnippet: `// Drag and drop accessibility announcement helper
function announceDndAction(message: string) {
  const liveRegion = document.getElementById('dnd-announcer');
  if (liveRegion) liveRegion.innerText = message;
}`,
    dos: [
      'Provide alternative buttons (e.g. Move Up, Move Down) alongside drag handles.',
      'Show clear drop indicators between list rows.'
    ],
    donts: [
      'Never make drag-and-drop the exclusive way to perform a required task.'
    ],
    accessibility: [
      'WCAG 2.5.7 Dragging Movements: A single-pointer alternative is required.'
    ]
  },
  {
    name: 'infinite-scroll-pagination.md',
    title: 'Infinite Scroll & Virtualized Feed Patterns',
    overview: 'Infinite scrolling provides seamless browsing for feeds and logs, but requires robust scroll restoration and footer reachability solutions.',
    aspects: [
      { key: 'IntersectionObserver', detail: 'Trigger next batch fetch 300px before the user reaches the bottom' },
      { key: 'Scroll Position Restoration', detail: 'Return user to their exact scroll coordinates when navigating back' },
      { key: 'Accessible Load More Button', detail: 'Provide an explicit "Load More" fallback for keyboard users and screen readers' }
    ],
    codeSnippet: `import { useEffect, useRef } from 'react';

export function useInfiniteObserver(onIntersect: () => void, hasMore: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect();
    }, { rootMargin: '300px' });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onIntersect, hasMore]);

  return sentinelRef;
}`,
    dos: [
      'Provide an accessible "Load More" button or virtual pagination for users who prefer keyboard stepping.',
      'Keep the browser URL updated with the current page state.'
    ],
    donts: [
      'Never trap users in an infinite loop that makes the page footer unreachable.'
    ],
    accessibility: [
      'Announce newly loaded batch counts via aria-live="polite".'
    ]
  },
  {
    name: 'search-autocomplete-filtering.md',
    title: 'Search Autocomplete & Instant Filter Patterns',
    overview: 'Search autocomplete anticipates queries and displays rich matching entities with highlighted substring terms.',
    aspects: [
      { key: 'Debouncing (250-300ms)', detail: 'Prevent spamming backend APIs during continuous keystrokes' },
      { key: 'Substring Highlighting', detail: 'Bold matched substrings to verify why a result was returned' },
      { key: 'Keyboard Roving Focus', detail: 'Arrow down seamlessly highlights results without changing input focus' }
    ],
    codeSnippet: `// Highlight matched substrings cleanly
export function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const parts = text.split(new RegExp(\`(\${query})\`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <strong key={i} className="font-semibold text-[var(--color-accent-primary)]">{part}</strong>
        ) : (
          part
        )
      )}
    </span>
  );
}`,
    dos: [
      'Show recent searches and trending keywords in the empty search state.',
      'Allow Escape to clear the input or close the suggestions panel.'
    ],
    donts: [
      'Do not erase search parameters upon page refresh (synchronize with URL).'
    ],
    accessibility: [
      'Use aria-autocomplete="list" and role="listbox".'
    ]
  },
  {
    name: 'feedback-toast-system.md',
    title: 'Feedback Toast System & Notification Queues',
    overview: 'Toasts handle non-blocking, asynchronous system feedback with a disciplined FIFO queue and viewport corner stacking.',
    aspects: [
      { key: 'Viewport Anchor', detail: 'Bottom-right for desktop web; top-center for mobile web' },
      { key: 'Severity Tiers', detail: 'Success (green check), Warning (amber triangle), Error (red octicon), Info (blue dot)' },
      { key: 'Queue Limiting', detail: 'Display maximum 3 visible toasts; queue subsequent messages' }
    ],
    codeSnippet: `// Multi-toast stack layout
<div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-w-sm w-full pointer-events-none">
  {toasts.map(toast => (
    <div key={toast.id} className="pointer-events-auto transform transition-all duration-200">
      <ToastItem {...toast} />
    </div>
  ))}
</div>`,
    dos: [
      'Pause auto-dismiss timers when the cursor hovers over the toast.',
      'Include a manual close button on every toast.'
    ],
    donts: [
      'Never render toasts that obscure primary navigation buttons or forms.'
    ],
    accessibility: [
      'Use aria-live="polite" for status notifications.'
    ]
  }
];

let created = 0;
for (const p of patterns) {
  const filePath = path.join(targetDir, p.name);
  let content = `# ${p.title}\n\n`;
  content += `${p.overview}\n\n---\n\n`;
  content += `## 1. Architectural Principles & Key Aspects\n\n`;
  content += `| Aspect / Mechanism | Implementation Specification |\n`;
  content += `| :--- | :--- |\n`;
  for (const a of p.aspects) {
    content += `| **${a.key}** | ${a.detail || a.role} |\n`;
  }
  content += `\n---\n\n## 2. Implementation Guide\n\n`;
  content += `\`\`\`tsx\n${p.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(p.dos.length, p.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const d = p.dos[i] || '';
    const dn = p.donts[i] || '';
    content += `| ${d} | ${dn} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Interaction Integrity\n\n`;
  for (const a of p.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Avoid distracting, unnecessary motion or confetti effects for mundane actions.\n`;
  content += `- Ensure keyboard navigation operates identically to pointer interaction.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} UX pattern references in references/ux-patterns/`);

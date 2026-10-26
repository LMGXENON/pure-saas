import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/real-world-flows');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const flows = [
  {
    name: 'authentication-flow.md',
    title: 'Authentication & Session Lifecycle Flow',
    overview: 'Authentication orchestrates login, multi-factor challenges (MFA/TOTP), OAuth callbacks, session expiration, and password resets with uncompromising security and visual calm.',
    steps: [
      { step: '1. Identifier Entry', detail: 'User enters email; system validates format and checks for SSO federation' },
      { step: '2. Credential / MFA Challenge', detail: 'Password or Passkey prompt; if MFA is active, transitions to 6-digit TOTP input' },
      { step: '3. Token Acquisition & Cookie Set', detail: 'Receives secure HTTP-only session cookie; redirects to intended destination' },
      { step: '4. Session Expiry Warning', detail: 'Modal warns user 2 minutes before JWT expiration with one-click refresh button' }
    ],
    codeSnippet: `// 6-digit TOTP input with auto-advance
import React, { useRef } from 'react';

export function TotpInput({ onComplete }: { onComplete: (code: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.slice(-1);
    e.target.value = val;
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    const fullCode = inputs.current.map(i => i?.value || '').join('');
    if (fullCode.length === 6) onComplete(fullCode);
  };

  return (
    <div className="flex gap-2 justify-center my-4" role="group" aria-label="Two-factor authentication code">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onChange={e => handleChange(e, i)}
          className="w-10 h-12 text-center text-lg font-mono font-bold rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-base)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:outline-none"
        />
      ))}
    </div>
  );
}`,
    dos: [
      'Auto-focus next input box during 6-digit TOTP code entry.',
      'Support native password manager paste into all inputs.',
      'Preserve the intended redirect URL (`?redirect=/dashboard/settings`).'
    ],
    donts: [
      'Never reveal whether an email address exists in the database during password reset requests.'
    ],
    accessibility: [
      'Provide clear accessible group labels on multi-box MFA inputs.'
    ]
  },
  {
    name: 'billing-stripe-polar-checkout.md',
    title: 'Billing & Polar/Stripe Checkout Integration Flow',
    overview: 'Subscription flows handle plan upgrades, invoice history, payment method management, and prorated plan adjustments without user friction.',
    steps: [
      { step: '1. Plan Comparison', detail: 'Clear monthly/annual toggle with savings percentage clearly marked' },
      { step: '2. Checkout Modal / Redirect', detail: 'Embed Polar or Stripe Elements with minimal required customer fields' },
      { step: '3. Webhook Synchronization', detail: 'Real-time webhook listener updates workspace subscription state' },
      { step: '4. Invoice Portal Access', detail: 'Direct self-serve link to download PDF tax receipts and VAT invoices' }
    ],
    codeSnippet: `<div className="p-6 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] space-y-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Current Subscription</h3>
      <p className="text-xs text-[var(--color-text-secondary)]">Pro Plan — $49/month (Renews Nov 14, 2026)</p>
    </div>
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">Active</span>
  </div>
  <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
    <button className="text-xs text-[var(--color-text-secondary)] hover:underline">Download Invoices (PDF)</button>
    <button className="h-9 px-4 text-xs font-medium rounded-lg bg-[var(--color-accent-primary)] text-white">Upgrade Plan</button>
  </div>
</div>`,
    dos: [
      'Display active plan and upcoming billing renewal date clearly.',
      'Allow customers to cancel or pause subscriptions without forced customer support calls.'
    ],
    donts: [
      'Never obscure currency symbols, billing intervals, or applicable VAT/sales taxes.'
    ],
    accessibility: [
      'Ensure checkout payment iframes support screen reader focus navigation.'
    ]
  },
  {
    name: 'multi-tenant-team-switching.md',
    title: 'Multi-Tenant Workspace & Team Switching Flow',
    overview: 'Multi-tenant systems allow users to belong to several organizations, requiring swift workspace switching without losing route context.',
    steps: [
      { step: '1. Workspace Popover Trigger', detail: 'Displays current workspace avatar, name, and role badge in the top navigation' },
      { step: '2. Search & Select Menu', detail: 'List of member workspaces with checkmark on the active tenant and a "+ New Workspace" action' },
      { step: '3. Context Transition', detail: 'Tenant ID updates in route (`/org/[id]/...`), revalidating permissions and caching' }
    ],
    codeSnippet: `<div className="relative">
  <button className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] text-left">
    <div className="w-6 h-6 rounded bg-neutral-800 text-white flex items-center justify-center font-bold text-xs">A</div>
    <span className="text-xs font-semibold text-[var(--color-text-primary)]">Acme Corp</span>
    <span className="text-xs text-[var(--color-text-muted)]">▼</span>
  </button>
</div>`,
    dos: [
      'Keep the user on the equivalent page when switching teams if permissions allow.',
      'Provide search filtering if a user belongs to more than 5 teams.'
    ],
    donts: [
      'Never flash data from the previous tenant during transition.'
    ],
    accessibility: [
      'WAI-ARIA Menu or Listbox pattern for workspace switcher.'
    ]
  },
  {
    name: 'search-faceting-filtering.md',
    title: 'Faceted Search & Multi-Dimensional Filtering',
    overview: 'Faceted search combines full-text queries with discrete category, price, date, and status filters, accompanied by active filter chips.',
    steps: [
      { step: '1. Text Query Entry', detail: 'Instant or debounced search with highlighted matching terms' },
      { step: '2. Facet Sidebar Selection', detail: 'Checkboxes and range sliders with real-time matching result count badges' },
      { step: '3. Active Chip Stack', detail: 'Dismissible pills displaying active filters with a "Clear all" button' },
      { step: '4. URL State Synchronization', detail: 'Serialize filter state to query params: `?status=active&tag=rust`' }
    ],
    codeSnippet: `// Active filter chip row
<div className="flex flex-wrap items-center gap-2 mb-4">
  <span className="text-xs text-[var(--color-text-muted)]">Active filters:</span>
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]">
    Status: Active
    <button onClick={() => removeFilter('status')} className="text-[var(--color-text-muted)] hover:text-white" aria-label="Remove status filter">✕</button>
  </span>
  <button onClick={clearAllFilters} className="text-xs text-[var(--color-accent-primary)] hover:underline ml-2">Clear all</button>
</div>`,
    dos: [
      'Synchronize all active filters to URL search parameters for shareable links.',
      'Show instant counts beside facet checkboxes.'
    ],
    donts: [
      'Never reset the user’s search pagination to page 1 without preserving active filters.'
    ],
    accessibility: [
      'Screen readers must announce updated result counts upon filter toggle.'
    ]
  },
  {
    name: 'data-export-reporting.md',
    title: 'Data Export & Asynchronous Reporting Flow',
    overview: 'Exporting large datasets requires asynchronous job queuing, clear format selection (CSV, JSON, Parquet), and non-blocking download notifications.',
    steps: [
      { step: '1. Scope Configuration', detail: 'Date range, column selection, and output format in an export modal' },
      { step: '2. Job Enqueue', detail: 'Immediate client feedback: "Export started. You will be notified when ready."' },
      { step: '3. Notification & Download', detail: 'Toast or notification inbox delivers signed S3 download link' }
    ],
    codeSnippet: `<div className="space-y-4">
  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Select Export Format</h4>
  <div className="grid grid-cols-2 gap-3">
    <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--color-border-default)] cursor-pointer hover:bg-[var(--color-surface-hover)]">
      <input type="radio" name="format" value="csv" defaultChecked />
      <span className="text-xs font-medium">CSV (Spreadsheets)</span>
    </label>
    <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--color-border-default)] cursor-pointer hover:bg-[var(--color-surface-hover)]">
      <input type="radio" name="format" value="json" />
      <span className="text-xs font-medium">JSON (Raw Data)</span>
    </label>
  </div>
</div>`,
    dos: [
      'Deliver large exports via background notifications rather than blocking the UI thread.',
      'Provide pre-signed download URLs that expire after 24 hours.'
    ],
    donts: [
      'Never freeze the browser window during client-side CSV generation.'
    ],
    accessibility: [
      'Inform screen readers when asynchronous export generation completes.'
    ]
  },
  {
    name: 'invite-member-permissions.md',
    title: 'Team Member Invitations & Role-Based Access (RBAC)',
    overview: 'Inviting collaborators requires granular role assignment (Owner, Admin, Member, Viewer) with clear permission explanations.',
    steps: [
      { step: '1. Email Input & Role Selector', detail: 'Enter single or batch emails and select intended access tier' },
      { step: '2. Invitation Dispatch', detail: 'Sends transactional invitation email with unique acceptance token' },
      { step: '3. Pending Invitations Table', detail: 'View pending invites with "Resend" and "Revoke" actions' }
    ],
    codeSnippet: `<div className="flex gap-2">
  <input type="email" placeholder="colleague@company.com" className="flex-1 h-9 px-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-base)] text-xs" />
  <select className="h-9 px-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-base)] text-xs">
    <option value="member">Member</option>
    <option value="admin">Admin</option>
  </select>
  <button className="h-9 px-4 rounded-lg bg-[var(--color-accent-primary)] text-white text-xs font-medium">Invite</button>
</div>`,
    dos: [
      'Display an explicit table explaining what each role can and cannot do.',
      'Allow administrators to revoke pending invitations immediately.'
    ],
    donts: [
      'Never allow non-admin members to elevate their own permissions.'
    ],
    accessibility: [
      'Associate role descriptions with role dropdown options.'
    ]
  },
  {
    name: 'audit-log-timeline.md',
    title: 'Audit Log & Security Activity Timeline',
    overview: 'Audit logs provide an immutable timeline of security events (logins, API key generation, permission updates, deletions) for enterprise compliance (SOC2/ISO27001).',
    steps: [
      { step: '1. Structured Event Row', detail: 'Actor avatar + name, action verb, target entity, timestamp, IP address' },
      { step: '2. JSON Diff Modal', detail: 'Clicking an event opens a modal with side-by-side Before/After JSON diff' },
      { step: '3. Export Compliance Log', detail: 'One-click signed export for compliance auditors' }
    ],
    codeSnippet: `<div className="divide-y divide-[var(--color-border-subtle)] text-xs">
  <div className="py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center font-bold">SC</div>
      <div>
        <p className="font-medium text-[var(--color-text-primary)]"><span className="font-semibold">Sarah Chen</span> rotated API key <code className="bg-neutral-800 px-1 rounded">prod_live_...</code></p>
        <span className="text-[10px] text-[var(--color-text-muted)]">IP: 192.0.2.42 • San Francisco, CA</span>
      </div>
    </div>
    <time className="text-[10px] text-[var(--color-text-muted)]">24 mins ago</time>
  </div>
</div>`,
    dos: [
      'Include exact UTC timestamps alongside relative time ("2 hours ago").',
      'Provide search and filter by actor and event category.'
    ],
    donts: [
      'Never allow audit log records to be edited or deleted through the UI.'
    ],
    accessibility: [
      'Use semantic `<time dateTime="...">` tags for all event timestamps.'
    ]
  },
  {
    name: 'api-keys-developer-portal.md',
    title: 'API Keys & Developer Secrets Management',
    overview: 'Developer portals handle the generation, display, scoping, and rotation of API keys with strict one-time reveal safeguards.',
    steps: [
      { step: '1. Create Key Modal', detail: 'Name the key, choose expiration duration, and set granular read/write scopes' },
      { step: '2. One-Time Secret Reveal', detail: 'Display full plaintext secret once with warning: "This key will never be shown again"' },
      { step: '3. Key Ledger', detail: 'Table showing key prefix (`sk_live_4a8...`), created date, last used date, and Revoke button' }
    ],
    codeSnippet: `<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs">
  <p className="font-semibold mb-2">⚠️ Copy your secret key now</p>
  <p className="text-neutral-400 mb-3">You will not be able to view this API key again after closing this window.</p>
  <div className="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-white">
    <span>sk_live_9f81a7b6c5d4e3f201</span>
    <button className="text-blue-400 hover:underline">Copy</button>
  </div>
</div>`,
    dos: [
      'Show plaintext secret exactly once upon generation.',
      'Show "Last used" timestamp so developers can identify abandoned keys before revoking.'
    ],
    donts: [
      'Never store or display plaintext API keys in the database or client.'
    ],
    accessibility: [
      'Accessible confirmation alert when copying secret key.'
    ]
  },
  {
    name: 'notifications-inbox-center.md',
    title: 'Notifications Inbox & Real-Time Alert Center',
    overview: 'Notification hubs organize team mentions, system alerts, and task assignments with unread counters and granular notification preferences.',
    steps: [
      { step: '1. Bell Trigger with Badge', detail: 'Unread counter badge updates in real time via WebSocket' },
      { step: '2. Flyout Notification Panel', detail: 'Tabs for "All" and "Unread", "Mark all as read" button' },
      { step: '3. Deep Link Navigation', detail: 'Clicking an item marks it read and navigates directly to the target record' }
    ],
    codeSnippet: `<div className="w-80 p-2 rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-2xl">
  <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border-subtle)]">
    <span className="text-xs font-semibold text-[var(--color-text-primary)]">Notifications</span>
    <button className="text-[10px] text-[var(--color-accent-primary)] hover:underline">Mark all read</button>
  </div>
  <div className="divide-y divide-[var(--color-border-subtle)] max-h-72 overflow-y-auto">
    <div className="p-3 text-xs hover:bg-[var(--color-surface-hover)] cursor-pointer flex gap-2.5">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
      <div>
        <p className="text-[var(--color-text-primary)]"><span className="font-semibold">Alex</span> mentioned you in Deployments</p>
        <span className="text-[10px] text-[var(--color-text-muted)]">10m ago</span>
      </div>
    </div>
  </div>
</div>`,
    dos: [
      'Support keyboard navigation through the notification list.',
      'Provide a direct link to notification settings to configure email/push channels.'
    ],
    donts: [
      'Never bombard users with duplicate notifications across email, push, and in-app.'
    ],
    accessibility: [
      'Live count badge announced to screen readers via aria-label.'
    ]
  },
  {
    name: 'user-profile-account-settings.md',
    title: 'User Profile & Account Settings Flow',
    overview: 'Account settings house personal information, avatar uploads, password management, session termination, and permanent account deletion.',
    steps: [
      { step: '1. Profile Form', detail: 'Full name, public handle, bio, and avatar upload with preview crop' },
      { step: '2. Security Section', detail: 'Password update form and "Log out of all active sessions" button' },
      { step: '3. Danger Zone Deletion', detail: 'Account deletion with typed confirmation requirement: "Type delete my account"' }
    ],
    codeSnippet: `<div className="space-y-6 max-w-xl">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center text-xl font-bold">JD</div>
    <div>
      <button className="h-8 px-3 text-xs font-medium rounded-lg border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)]">Change Avatar</button>
      <p className="text-[10px] text-[var(--color-text-muted)] mt-1">JPG, GIF or PNG. Max size 2MB.</p>
    </div>
  </div>
  <div className="space-y-4">
    <TextInput label="Full Name" defaultValue="Jane Doe" />
    <TextInput label="Email Address" defaultValue="jane@example.com" />
  </div>
</div>`,
    dos: [
      'Require current password verification before allowing email or password changes.',
      'Provide a confirmation modal requiring typed verification for account deletion.'
    ],
    donts: [
      'Never perform permanent account deletion with a single accidental click.'
    ],
    accessibility: [
      'Accessible file upload inputs with clear error feedback on invalid file types or sizes.'
    ]
  }
];

let created = 0;
for (const f of flows) {
  const filePath = path.join(targetDir, f.name);
  let content = `# ${f.title}\n\n`;
  content += `${f.overview}\n\n---\n\n`;
  content += `## 1. Flow Sequence & Architectural Stages\n\n`;
  content += `| Stage / Step | Implementation Specification |\n`;
  content += `| :--- | :--- |\n`;
  for (const s of f.steps) {
    content += `| **${s.step}** | ${s.detail} |\n`;
  }
  content += `\n---\n\n## 2. Implementation Guide\n\n`;
  content += `\`\`\`tsx\n${f.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(f.dos.length, f.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const doItem = f.dos[i] || '';
    const dontItem = f.donts[i] || '';
    content += `| ${doItem} | ${dontItem} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Verification Checklist\n\n`;
  for (const a of f.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.\n`;
  content += `- Ensure enterprise security flows provide immediate, unambiguous feedback.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} real-world flow references in references/real-world-flows/`);

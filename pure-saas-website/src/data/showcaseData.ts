// pure-saas-website/src/data/showcaseData.ts
// Showcase projects data layer: Official Examples and Community Submissions

export interface ShowcaseProject {
  id: string;
  name: string;
  tagline: string;
  creator: string;
  creatorHandle?: string;
  creatorUrl?: string;
  liveUrl: string;
  category: 'Dashboard' | 'Developer Tools' | 'Documentation' | 'Marketing';
  description: string;
  isOfficial: boolean;
  status: 'approved' | 'pending';
  tags: string[];
}

export const officialShowcaseProjects: ShowcaseProject[] = [
  {
    id: 'pure-saas-docs-portal',
    name: 'Pure SaaS Documentation Portal',
    tagline: 'GitBook-style developer documentation with persistent navigation',
    creator: 'Pure SaaS Core Team',
    creatorHandle: '@lmgxenon',
    creatorUrl: 'https://github.com/LMGXENON',
    liveUrl: '/docs',
    category: 'Documentation',
    description: 'An open-source documentation portal with persistent collapsible sidebars, real-time filtering, sticky article outlines, and responsive drawers.',
    isOfficial: true,
    status: 'approved',
    tags: ['React 18', 'Tailwind CSS', 'Vite', 'GitBook Layout']
  },
  {
    id: 'edge-telemetry-console',
    name: 'Edge Infrastructure Telemetry Console',
    tagline: 'High-density cloud cluster monitoring interface',
    creator: 'Pure SaaS Team',
    creatorHandle: '@puresaas',
    creatorUrl: 'https://github.com/LMGXENON/pure-saas',
    liveUrl: 'https://github.com/LMGXENON/pure-saas',
    category: 'Dashboard',
    description: 'A dense monitoring view for cloud engineering teams featuring 1px hairline borders, tabular metrics, and responsive multi-column layouts.',
    isOfficial: true,
    status: 'approved',
    tags: ['Dashboard', 'High Density', 'Tabular Figures']
  },
  {
    id: 'developer-api-portal',
    name: 'Developer API Key Management Screen',
    tagline: 'Accessible token generation and rotation workflow',
    creator: 'Pure SaaS Team',
    creatorHandle: '@puresaas',
    creatorUrl: 'https://github.com/LMGXENON/pure-saas',
    liveUrl: 'https://github.com/LMGXENON/pure-saas',
    category: 'Developer Tools',
    description: 'An enterprise developer settings screen with granular permission checkboxes, scoped token creation, and accessible modal confirmation dialogs.',
    isOfficial: true,
    status: 'approved',
    tags: ['Developer Tools', 'Forms', 'Modals']
  }
];

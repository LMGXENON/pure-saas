// pure-saas-website/src/data/showcaseData.ts
// Data layer and types for Pure SaaS Showcase

export interface ShowcaseProject {
  id: string;
  name: string;
  tagline: string;
  creator: string;
  creatorHandle?: string;
  creatorUrl?: string;
  liveUrl: string;
  previewUrl?: string;
  category: 'Dashboard' | 'Developer Tools' | 'Documentation' | 'Marketing';
  description: string;
  isOfficial: boolean;
  status: 'approved' | 'pending' | 'rejected';
  tags: string[];
  createdAt?: string;
}

export const fallbackOfficialProjects: ShowcaseProject[] = [
  {
    id: 'official-docs-portal',
    name: 'Pure SaaS Documentation Portal',
    tagline: 'GitBook-style developer documentation with persistent navigation',
    creator: 'Pure SaaS Core Team',
    creatorHandle: '@puresaas',
    creatorUrl: 'https://github.com/LMGXENON/pure-saas',
    liveUrl: '/docs',
    previewUrl: '',
    category: 'Documentation',
    description: 'An open-source documentation portal with persistent collapsible sidebars, real-time filtering, sticky article outlines, and responsive drawers.',
    isOfficial: true,
    status: 'approved',
    tags: ['React 18', 'Tailwind CSS', 'Vite', 'GitBook Layout']
  },
  {
    id: 'official-reference-catalog',
    name: 'Pure SaaS Architectural Reference Catalog',
    tagline: 'Searchable index of 280+ design systems, component blueprints, and Apple HIG patterns',
    creator: 'Pure SaaS Core Team',
    creatorHandle: '@puresaas',
    creatorUrl: 'https://github.com/LMGXENON/pure-saas',
    liveUrl: '/references',
    previewUrl: '',
    category: 'Developer Tools',
    description: 'Interactive explorer and reference lookup engine allowing engineers and AI agents to query 280+ verified architectural guides, color ramps, and UX patterns.',
    isOfficial: true,
    status: 'approved',
    tags: ['Design System', 'Apple HIG', 'Architecture', 'Tokens']
  }
];

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { referenceCategories, allReferenceGuides, ReferenceGuide } from '../data/referenceData';
import { Search, Layers } from 'lucide-react';

export const ReferencesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const selectedId = searchParams.get('id');

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedGuide, setSelectedGuide] = useState<ReferenceGuide | null>(
    selectedId ? allReferenceGuides.find(r => r.id === selectedId) || null : null
  );

  const filteredGuides = allReferenceGuides.filter(g => {
    const matchesCategory = activeCategory === 'all' || g.category === activeCategory;
    const matchesQuery = query === '' || 
      g.title.toLowerCase().includes(query.toLowerCase()) || 
      g.summary.toLowerCase().includes(query.toLowerCase()) ||
      g.path.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (catId === 'all') next.delete('cat');
      else next.set('cat', catId);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Title */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted text-accent border border-border-subtle mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>260+ Architectural Reference Guides</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          Reference Library Explorer
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          Search and inspect Pure SaaS's complete reference library across UI components, layout patterns, design systems, WCAG 2.2 AA accessibility, Apple HIG, and framework engineering guides.
        </p>

        {/* Live Search Input */}
        <div className="mt-8 relative max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, component, or keyword..."
            className="w-full h-10 pl-10 pr-4 text-xs rounded-xl bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border-subtle pb-4">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-accent text-white shadow-xs'
              : 'bg-surface-muted text-text-secondary hover:text-text-primary'
          }`}
        >
          All Categories ({allReferenceGuides.length})
        </button>
        {referenceCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-accent text-white shadow-xs'
                : 'bg-surface-muted text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-text-muted mb-4">
        <span>Showing {filteredGuides.length} reference documents</span>
        <span>Run <code>npx pure-saas ref &lt;query&gt;</code> in CLI</span>
      </div>

      {/* Reference Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map(guide => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="p-5 rounded-2xl bg-surface-base border border-border-subtle hover:border-border-default hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-muted text-text-muted">
                  {guide.categoryName}
                </span>
                <span className="text-xs text-text-muted opacity-60 group-hover:opacity-100 transition-opacity">
                  <code>.md</code>
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {guide.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1.5 line-clamp-3 leading-relaxed">
                {guide.summary}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
              <span className="truncate max-w-[200px]"><code>{guide.path}</code></span>
              <span className="text-accent font-medium group-hover:translate-x-0.5 transition-transform">Inspect →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-surface-base border border-border-subtle">
          <p className="text-sm font-medium text-text-primary">No reference guides matched your query.</p>
          <p className="text-xs text-text-secondary mt-1">Try searching for "button", "modal", "tokens", or clear filters.</p>
          <button
            onClick={() => { setActiveCategory('all'); setQuery(''); }}
            className="mt-4 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detail Slide-over / Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedGuide(null)} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-surface-overlay border border-border-default shadow-floating p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold">
                  {selectedGuide.categoryName}
                </span>
                <h2 className="text-xl font-bold text-text-primary mt-2">{selectedGuide.title}</h2>
                <span className="text-xs text-text-muted mt-0.5 block"><code>{selectedGuide.path}</code></span>
              </div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Summary & Principles</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{selectedGuide.summary}</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-2">
              <span className="text-xs font-semibold text-text-primary block">How Coding Agents Use This Guide</span>
              <p className="text-xs text-text-secondary leading-relaxed">
                When building components in this domain, Pure SaaS commands retrieve this document via <code className="font-mono text-accent">npx pure-saas ref "{selectedGuide.fileName.replace('.md', '')}"</code> and bind markup strictly to its state matrix and WCAG criteria.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-subtle text-xs">
              <span className="text-text-muted">Available in repository at {selectedGuide.path}</span>
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-4 py-2 rounded-lg bg-accent text-white font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

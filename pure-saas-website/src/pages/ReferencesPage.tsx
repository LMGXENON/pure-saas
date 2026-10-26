import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { referenceCategories, allReferenceGuides, ReferenceGuide } from '../data/referenceData';
import { Search, Layers, ExternalLink, Copy, Check } from 'lucide-react';

export const ReferencesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState<string>(initialQuery);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const handleCopyPath = (guide: ReferenceGuide) => {
    navigator.clipboard.writeText(guide.path);
    setCopiedId(guide.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Header */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted text-accent border border-border-subtle">
            <Layers className="w-3.5 h-3.5" />
            <span>317 Authoritative Reference Playbooks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Reference Library Explorer
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Browse and search the complete collection of 317 playbooks, Apple HIG guidelines, component specs, and architectural standards that power Pure SaaS.
          </p>

          {/* Live Search Input */}
          <div className="mt-6 relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 317 playbooks (e.g., apple-polish, data-table, hig, spring)..."
              className="w-full h-11 pl-10 pr-4 text-xs rounded-xl bg-surface-base border border-border-default text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-4">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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

        {/* Results Counter & Search Status */}
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Showing {filteredGuides.length} of {allReferenceGuides.length} reference documents</span>
          <span className="hidden sm:inline">Path resolution: <code>skill/reference/...</code></span>
        </div>

        {/* Reference Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuides.map(guide => (
            <div
              key={guide.id}
              className="p-5 rounded-2xl bg-surface-base border border-border-subtle hover:border-border-hover transition-all flex flex-col justify-between space-y-4 shadow-subtle group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-muted text-text-muted border border-border-subtle uppercase tracking-wider">
                    {guide.categoryName}
                  </span>
                  <button
                    onClick={() => handleCopyPath(guide)}
                    className="text-[11px] font-mono text-text-muted hover:text-accent flex items-center gap-1 transition-colors"
                    title="Copy relative file path"
                  >
                    {copiedId === guide.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === guide.id ? 'Copied' : 'Path'}</span>
                  </button>
                </div>
                <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span className="truncate max-w-[200px]">{guide.fileName}</span>
                <a
                  href={`https://github.com/LMGXENON/pure-saas/blob/main/${guide.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center gap-1 font-sans font-semibold text-xs shrink-0"
                >
                  <span>Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Layers className="w-8 h-8 text-text-muted mx-auto" />
            <h3 className="text-base font-bold text-text-primary">No playbooks found</h3>
            <p className="text-xs text-text-secondary">Try adjusting your search terms or select "All Categories".</p>
          </div>
        )}
      </div>
    </div>
  );
};

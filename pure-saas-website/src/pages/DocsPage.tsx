import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { docsArticles } from '../data/docsData';
import { CodeBlock } from '../components/CodeBlock';
import { Search, Clock } from 'lucide-react';

export const DocsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slugParam = searchParams.get('slug');

  const [activeSlug, setActiveSlug] = useState<string>(slugParam || docsArticles[0].slug);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const currentArticle = docsArticles.find(a => a.slug === activeSlug) || docsArticles[0];

  const categories = Array.from(new Set(docsArticles.map(a => a.category)));

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    setSearchParams({ slug });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Docs Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter topics..."
              className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <nav className="space-y-6">
            {categories.map(cat => {
              const items = docsArticles.filter(
                a => a.category === cat &&
                (a.title.toLowerCase().includes(filterQuery.toLowerCase()) || filterQuery === '')
              );
              if (items.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted px-2 mb-1">
                    {cat}
                  </h4>
                  {items.map(art => {
                    const isActive = art.slug === activeSlug;
                    return (
                      <button
                        key={art.slug}
                        onClick={() => handleSelect(art.slug)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-accent/10 text-accent font-semibold'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        <span className="truncate">{art.title}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Article Body */}
        <main className="lg:col-span-9 p-6 sm:p-10 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-8">
          <div>
            <div className="flex items-center gap-3 text-xs text-text-muted font-mono mb-2">
              <span className="uppercase text-accent font-semibold">{currentArticle.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentArticle.readTime}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
              {currentArticle.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed border-b border-border-subtle pb-6">
              {currentArticle.summary}
            </p>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
            {currentArticle.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Key Rules List */}
          {currentArticle.keyRules && (
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Governing Rules
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {currentArticle.keyRules.map((kr, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-surface-muted/40 border border-border-subtle">
                    <span className="font-semibold text-xs text-text-primary block">{kr.rule}</span>
                    <span className="text-xs text-text-secondary mt-0.5 block">{kr.rationale}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Sample */}
          {currentArticle.codeSample && (
            <div className="pt-4 border-t border-border-subtle">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Implementation Pattern
              </h3>
              <CodeBlock 
                code={currentArticle.codeSample.code} 
                language={currentArticle.codeSample.language} 
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

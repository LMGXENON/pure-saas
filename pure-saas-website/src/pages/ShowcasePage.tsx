import React, { useState } from 'react';
import { showcaseData } from '../data/showcaseData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShowcasePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Showcases' },
    { id: 'Application Layout', label: 'App Layouts' },
    { id: 'Marketing Section', label: 'Marketing Sections' }
  ];

  const filteredShowcases = selectedCategory === 'all'
    ? showcaseData
    : showcaseData.filter(s => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted text-accent border border-border-subtle mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-World Workflows</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          Showcase & Quality Comparisons
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          See the concrete difference between raw, generic AI output ("Slop") and interfaces governed by Pure SaaS's semantic tokens, Apple HIG principles, and WCAG 2.2 AA accessibility requirements.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-border-subtle pb-4">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === c.id
                ? 'bg-accent text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Showcases Stack */}
      <div className="space-y-16">
        {filteredShowcases.map(item => (
          <div key={item.id} className="space-y-4">
            <BeforeAfterSlider item={item} />
          </div>
        ))}
      </div>

      {/* Rationale Banner */}
      <div className="mt-20 p-8 rounded-3xl bg-surface-elevated/40 border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h3 className="text-lg font-bold text-text-primary">Want to run these audits on your own code?</h3>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Use <code className="font-mono text-accent">/pure-saas review</code> to run an evidence-based quality audit across your current codebase, or <code className="font-mono text-accent">/pure-saas polish</code> to elevate existing UI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/commands#review"
            className="h-10 px-4 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
          >
            <span>Review Command</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/get-started"
            className="h-10 px-4 rounded-xl bg-surface-base border border-border-default text-text-primary text-xs font-medium hover:bg-surface-hover transition-colors"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

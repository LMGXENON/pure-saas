import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { docsArticles, DocArticle, DocSection } from '../data/docsData';
import { CodeBlock } from '../components/CodeBlock';
import {
  Search,
  Clock,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  Hash,
  Share2,
  Check,
  Copy,
  Rocket,
  Compass,
  Terminal,
  Sliders,
  HelpCircle,
  BookOpen,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const DocsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slugParam = searchParams.get('slug');

  const [activeSlug, setActiveSlug] = useState<string>(slugParam || docsArticles[0].slug);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Sync state if URL search param changes
  useEffect(() => {
    if (slugParam && slugParam !== activeSlug) {
      setActiveSlug(slugParam);
    }
  }, [slugParam]);

  const currentArticle: DocArticle = docsArticles.find(a => a.slug === activeSlug) || docsArticles[0];
  const categories = Array.from(new Set(docsArticles.map(a => a.category)));

  // State to track collapsed categories in left sidebar
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleSelectArticle = (slug: string) => {
    setActiveSlug(slug);
    setSearchParams({ slug });
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyPageLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return <Rocket className="w-3.5 h-3.5 text-accent stroke-[1.75] fill-none" />;
      case 'Guides & Workflows':
        return <Compass className="w-3.5 h-3.5 text-text-secondary stroke-[1.75] fill-none" />;
      case 'Commands':
        return <Terminal className="w-3.5 h-3.5 text-text-secondary stroke-[1.75] fill-none" />;
      case 'CLI Reference':
        return <Sliders className="w-3.5 h-3.5 text-text-secondary stroke-[1.75] fill-none" />;
      case 'Troubleshooting & FAQ':
        return <HelpCircle className="w-3.5 h-3.5 text-text-secondary stroke-[1.75] fill-none" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-text-secondary stroke-[1.75] fill-none" />;
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Sub-header / GitBook breadcrumb bar */}
      <div className="border-b border-border-subtle bg-surface-base/80 backdrop-blur-md sticky top-14 z-30 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          {/* Breadcrumbs & Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 text-text-secondary truncate">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-1.5 -ml-1 rounded-lg text-text-primary hover:bg-surface-hover transition-colors"
              aria-label="Open documentation navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <Link to="/" className="hover:text-text-primary font-medium transition-colors">Home</Link>
            <span className="text-text-muted">/</span>
            <Link to="/docs" className="hover:text-text-primary font-medium transition-colors">Docs</Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-muted">{currentArticle.category}</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-semibold truncate">{currentArticle.title}</span>
          </div>

          {/* Quick Actions (Share button with clean alignment, no redundant GitHub link) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyPageLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-muted border border-border-subtle text-text-secondary hover:text-text-primary text-[11px] font-medium transition-colors hover:bg-surface-hover"
              title="Copy link to current article"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: Persistent & Collapsible GitBook Navigation */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
            {/* Filter Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter documentation..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            {/* Navigation Category Groups */}
            <nav className="space-y-4">
              {categories.map(cat => {
                const items = docsArticles.filter(
                  a => a.category === cat &&
                  (a.title.toLowerCase().includes(filterQuery.toLowerCase()) || filterQuery === '')
                );
                if (items.length === 0) return null;

                const isCollapsed = collapsedCategories[cat];

                return (
                  <div key={cat} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-text-primary rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="p-1 rounded-md bg-surface-muted/60 text-accent flex items-center justify-center shrink-0 border border-border-subtle">
                          {getCategoryIcon(cat)}
                        </span>
                        <span className="truncate">{cat}</span>
                      </div>
                      {isCollapsed ? (
                        <ChevronRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary shrink-0" />
                      )}
                    </button>

                    {!isCollapsed && (
                      <div className="space-y-0.5 pt-0.5">
                        {items.map(art => {
                          const isActive = art.slug === activeSlug;
                          return (
                            <button
                              key={art.slug}
                              onClick={() => handleSelectArticle(art.slug)}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-1 focus-visible:ring-offset-canvas ${
                                isActive
                                  ? 'bg-accent/10 dark:bg-accent/15 text-accent dark:text-accent font-semibold shadow-xs'
                                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/80 active:bg-surface-selected'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                )}
                                <span className="truncate">{art.title}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* ========================================================= */}
          {/* MOBILE NAVIGATION DRAWER                                  */}
          {/* ========================================================= */}
          {mobileDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
                onClick={() => setMobileDrawerOpen(false)} 
              />
              <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-surface-base p-6 shadow-2xl flex flex-col space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <span className="font-bold text-sm text-text-primary">Documentation Menu</span>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-md text-text-secondary hover:text-text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Filter topics..."
                    className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-surface-elevated border border-border-default text-text-primary placeholder-text-muted"
                  />
                </div>

                <nav className="space-y-4 flex-1">
                  {categories.map(cat => {
                    const items = docsArticles.filter(
                      a => a.category === cat &&
                      (a.title.toLowerCase().includes(filterQuery.toLowerCase()) || filterQuery === '')
                    );
                    if (items.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-2 py-1 flex items-center gap-1.5">
                          <span>{cat}</span>
                        </div>
                        <div className="space-y-0.5">
                          {items.map(art => {
                            const isActive = art.slug === activeSlug;
                            return (
                              <button
                                key={art.slug}
                                onClick={() => handleSelectArticle(art.slug)}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                                  isActive
                                    ? 'bg-accent/10 text-accent font-semibold'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                }`}
                              >
                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                                <span className="truncate">{art.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MAIN ARTICLE CONTENT                                      */}
          {/* ========================================================= */}
          <main className="lg:col-span-6 xl:col-span-6 space-y-8 max-w-3xl">
            {/* Header / Title block */}
            <header className="space-y-3 pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="uppercase text-accent font-semibold px-2 py-0.5 rounded bg-accent/8 border border-accent/20">
                  {currentArticle.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentArticle.readTime}</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary leading-[1.12]">
                {currentArticle.title}
              </h1>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
                {currentArticle.summary}
              </p>
            </header>

            {/* Prominent Copyable AI Agent Setup Prompt (if configured) */}
            {currentArticle.agentPrompt && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-muted/60 border border-accent/20 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-accent text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-text-primary">Coding Agent Setup Prompt</h3>
                      <p className="text-[11px] text-text-secondary">Copy and paste directly into Cursor, Windsurf, Claude Code, or Copilot</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt(currentArticle.agentPrompt!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-base border border-border-default text-text-primary hover:border-accent text-xs font-semibold transition-all shrink-0 shadow-2xs"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? 'Copied Prompt' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-border-subtle text-xs text-text-secondary font-mono leading-relaxed whitespace-pre-wrap select-all">
                  {currentArticle.agentPrompt}
                </div>
              </div>
            )}

            {/* Sections Loop */}
            <div className="space-y-12">
              {currentArticle.sections.map((section: DocSection) => (
                <section key={section.id} id={section.id} className="space-y-4 scroll-mt-32">
                  <div className="group flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                      {section.title}
                    </h2>
                    <a
                      href={`#${section.id}`}
                      className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-accent transition-opacity"
                      aria-label={`Link to section ${section.title}`}
                    >
                      <Hash className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Paragraphs */}
                  {section.content && (
                    <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  )}

                  {/* Callout */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
                        section.callout.type === 'tip'
                          ? 'bg-blue-500/8 border-blue-500/20 text-blue-600 dark:text-blue-400'
                          : section.callout.type === 'important'
                          ? 'bg-amber-500/8 border-amber-500/20 text-amber-600 dark:text-amber-400'
                          : section.callout.type === 'warning'
                          ? 'bg-rose-500/8 border-rose-500/20 text-rose-600 dark:text-rose-400'
                          : 'bg-surface-muted/60 border-border-default text-text-primary'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4" />}
                        {section.callout.type === 'important' && <AlertCircle className="w-4 h-4" />}
                        {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                        {section.callout.type === 'note' && <Info className="w-4 h-4" />}
                      </div>
                      <div>
                        {section.callout.title && (
                          <div className="font-semibold mb-1">{section.callout.title}</div>
                        )}
                        <div>{section.callout.text}</div>
                      </div>
                    </div>
                  )}

                  {/* Table */}
                  {section.table && (
                    <div className="overflow-x-auto rounded-xl border border-border-subtle my-4">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-surface-muted/60 text-text-primary font-semibold border-b border-border-subtle">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3.5 py-2.5">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle bg-surface-base">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-surface-hover/50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3.5 py-2.5 text-text-secondary text-xs">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Steps List */}
                  {section.steps && (
                    <div className="space-y-4 my-4">
                      {section.steps.map((st) => (
                        <div key={st.step} className="p-4 rounded-xl bg-surface-base border border-border-subtle flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {st.step}
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <h4 className="text-sm font-semibold text-text-primary">{st.title}</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">{st.description}</p>
                            {st.code && (
                              <div className="mt-2">
                                <CodeBlock code={st.code} language={st.language || 'bash'} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bulleted List */}
                  {section.list && (
                    <ul className="space-y-2 my-2 text-xs sm:text-sm text-text-secondary list-disc pl-5">
                      {section.list.map((li, lIdx) => (
                        <li key={lIdx} className="leading-relaxed">{li}</li>
                      ))}
                    </ul>
                  )}

                  {/* Code Sample */}
                  {section.codeSample && (
                    <div className="my-4">
                      <CodeBlock
                        code={section.codeSample.code}
                        language={section.codeSample.language}
                        filename={section.codeSample.filename}
                      />
                    </div>
                  )}

                  {/* Trailing content */}
                  {section.content_after && (
                    <div className="space-y-3 text-sm text-text-secondary leading-relaxed pt-2">
                      {section.content_after.map((p, paIdx) => (
                        <p key={paIdx}>{p}</p>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Related Reference Guides */}
            {currentArticle.relatedReferences && currentArticle.relatedReferences.length > 0 && (
              <div className="pt-8 border-t border-border-subtle space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-accent" />
                  <span>Related Reference Guides</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentArticle.relatedReferences.map((rf, rfIdx) => (
                    <Link
                      key={rfIdx}
                      to={`/references?q=${encodeURIComponent(rf.title)}`}
                      className="p-3 rounded-xl bg-surface-base border border-border-subtle hover:border-accent hover:bg-surface-hover transition-colors flex items-center justify-between text-xs group"
                    >
                      <span className="font-medium text-text-primary group-hover:text-accent truncate">
                        {rf.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Previous and Next Navigation Footer */}
            <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              {currentArticle.prev ? (
                <button
                  onClick={() => handleSelectArticle(currentArticle.prev!.slug)}
                  className="w-full sm:w-auto p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-accent hover:bg-surface-hover transition-colors flex items-center gap-3 text-left group"
                >
                  <ArrowLeft className="w-4 h-4 text-text-muted group-hover:text-accent shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-text-muted">Previous</div>
                    <div className="text-xs font-semibold text-text-primary group-hover:text-accent truncate max-w-xs">
                      {currentArticle.prev.title}
                    </div>
                  </div>
                </button>
              ) : <div />}

              {currentArticle.next ? (
                <button
                  onClick={() => handleSelectArticle(currentArticle.next!.slug)}
                  className="w-full sm:w-auto p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-accent hover:bg-surface-hover transition-colors flex items-center justify-end gap-3 text-right group ml-auto"
                >
                  <div>
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-text-muted">Next</div>
                    <div className="text-xs font-semibold text-text-primary group-hover:text-accent truncate max-w-xs">
                      {currentArticle.next.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent shrink-0" />
                </button>
              ) : <div />}
            </div>
          </main>

          {/* ========================================================= */}
          {/* RIGHT SIDEBAR: "ON THIS PAGE" Outline & Quick Meta        */}
          {/* ========================================================= */}
          <aside className="hidden xl:block xl:col-span-3 sticky top-28 space-y-6">
            <div className="p-4 rounded-2xl bg-surface-base border border-border-subtle shadow-xs space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                On This Page
              </h3>
              <nav className="space-y-1.5 text-xs">
                {currentArticle.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-text-secondary hover:text-accent transition-colors py-0.5 truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-border-subtle space-y-2 text-xs">
                <a
                  href="https://github.com/LMGXENON/pure-saas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  to="/commands"
                  className="flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  <span>Browse Slash Commands</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/showcase"
                  className="flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  <span>Explore Showcase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

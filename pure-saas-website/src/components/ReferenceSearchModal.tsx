import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Terminal, Sparkles, Layers } from 'lucide-react';
import { allReferenceGuides } from '../data/referenceData';
import { commandsData } from '../data/commandsData';
import { cliData } from '../data/cliData';
import { docsArticles } from '../data/docsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceSearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search references
  const matchedReferences = q
    ? allReferenceGuides.filter(
        r => r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || r.category.includes(q)
      ).slice(0, 5)
    : allReferenceGuides.slice(0, 4);

  // Search commands
  const matchedCommands = q
    ? commandsData.filter(
        c => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q)
      )
    : commandsData.slice(0, 3);

  // Search CLI
  const matchedCli = q
    ? cliData.filter(
        c => c.command.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  // Search Docs
  const matchedDocs = q
    ? docsArticles.filter(
        d => d.title.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)
      )
    : [];

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-label="Global Search"
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-surface-overlay border border-border-default shadow-floating overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border-subtle bg-surface-base">
          <Search className="w-5 h-5 text-text-muted shrink-0 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 260+ references, commands, CLI tools, docs..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-md text-text-muted hover:text-text-primary mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-surface-muted rounded border border-border-subtle">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4">
          {/* Commands */}
          {matchedCommands.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-text-muted px-2.5 py-1 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-accent" />
                <span>Commands ({matchedCommands.length})</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedCommands.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(`/commands#${cmd.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-surface-hover transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-accent font-mono">{cmd.name}</span>
                      <p className="text-xs text-text-secondary line-clamp-1">{cmd.tagline}</p>
                    </div>
                    <span className="text-xs text-text-muted group-hover:text-text-primary">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reference Guides */}
          {matchedReferences.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-text-muted px-2.5 py-1 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-emerald-500" />
                <span>References ({matchedReferences.length})</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedReferences.map(ref => (
                  <button
                    key={ref.id}
                    onClick={() => handleSelect(`/references?id=${ref.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-surface-hover transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-text-primary">{ref.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-muted text-text-muted font-mono">{ref.category}</span>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">{ref.summary}</p>
                    </div>
                    <span className="text-xs text-text-muted group-hover:text-text-primary">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CLI Tools */}
          {matchedCli.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-text-muted px-2.5 py-1 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>CLI Tools</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedCli.map(c => (
                  <button
                    key={c.command}
                    onClick={() => handleSelect(`/cli#${c.command}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-surface-hover transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-mono font-medium text-text-primary">pure-saas {c.command}</span>
                      <p className="text-xs text-text-secondary line-clamp-1">{c.description}</p>
                    </div>
                    <span className="text-xs text-text-muted group-hover:text-text-primary">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documentation */}
          {matchedDocs.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-text-muted px-2.5 py-1 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-amber-500" />
                <span>Documentation</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedDocs.map(doc => (
                  <button
                    key={doc.slug}
                    onClick={() => handleSelect(`/docs?slug=${doc.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-surface-hover transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-medium text-text-primary">{doc.title}</span>
                      <p className="text-xs text-text-secondary line-clamp-1">{doc.summary}</p>
                    </div>
                    <span className="text-xs text-text-muted group-hover:text-text-primary">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedCommands.length === 0 && matchedReferences.length === 0 && matchedCli.length === 0 && matchedDocs.length === 0 && (
            <div className="py-8 text-center text-text-muted text-xs">
              No results found for "{query}". Try searching "button", "modal", "tokens", or "wcag".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-border-subtle bg-surface-muted/30 flex items-center justify-between text-[11px] text-text-muted px-4">
          <span>Search 260+ guides and full CLI manual</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};

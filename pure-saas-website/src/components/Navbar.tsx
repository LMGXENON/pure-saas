import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Search, Menu, X, Github, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Showcase', path: '/showcase' },
    { label: 'Get Started', path: '/get-started' },
    { label: 'Documentation', path: '/docs' },
    { label: 'Commands', path: '/commands' },
    { label: 'CLI Tools', path: '/cli' },
    { label: 'References', path: '/references' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-base/85 backdrop-blur-md border-b border-border-subtle transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-text-primary">Pure SaaS</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-surface-muted text-text-muted border border-border-subtle uppercase tracking-wider">
              v1.0
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-text-secondary">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-accent bg-accent/8 font-semibold'
                    : 'hover:text-text-primary hover:bg-surface-hover'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-8 px-2.5 rounded-lg bg-surface-muted border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-default transition-all text-xs"
            aria-label="Open search dialog"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1 rounded bg-surface-base border border-border-subtle">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Link */}
          <a
            href="https://github.com/LMGXENON/pure-saas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="hidden sm:flex p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-subtle bg-surface-base px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-accent bg-accent/8 font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
            <span className="text-xs text-text-muted font-medium">v1.0.0 Production</span>
            <a
              href="https://github.com/LMGXENON/pure-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary hover:underline flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


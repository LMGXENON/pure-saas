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
    { label: 'Features', path: '/features' },
    { label: 'Documentation', path: '/docs' },
    { label: 'Commands', path: '/commands' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'References', path: '/references' },
    { label: 'CLI', path: '/cli' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-base/95 backdrop-blur-md border-b border-border-subtle transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-text-primary">Pure SaaS</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-surface-muted text-text-muted border border-border-subtle font-mono">
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
                `px-2.5 py-1.5 rounded-lg transition-colors ${
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

          {/* Get Started Action */}
          <Link
            to="/docs?slug=getting-started-installation"
            className="hidden sm:inline-flex items-center h-8 px-3 rounded-lg bg-accent text-white font-semibold text-xs hover:opacity-90 active:scale-98 transition-all shadow-xs"
          >
            Get Started
          </Link>

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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-subtle bg-surface-base px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
            <Link
              to="/docs?slug=getting-started-installation"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center w-full h-8 rounded-lg bg-accent text-white font-semibold text-xs"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

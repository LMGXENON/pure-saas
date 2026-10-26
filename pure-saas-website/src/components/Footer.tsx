import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-subtle bg-surface-base transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-accent text-white flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm tracking-tight text-text-primary">Pure SaaS</span>
            </Link>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm mb-4">
              Universal AI-agent skill and design enforcement toolkit. Guiding coding assistants to build production-grade web interfaces without generic AI slop.
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
              <span>MIT License</span>
              <span>•</span>
              <a 
                href="https://github.com/LMGXENON/pure-saas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-text-primary flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><Link to="/showcase" className="hover:text-text-primary">Showcase</Link></li>
              <li><Link to="/get-started" className="hover:text-text-primary">Get Started</Link></li>
              <li><Link to="/commands" className="hover:text-text-primary">6 Slash Commands</Link></li>
              <li><Link to="/cli" className="hover:text-text-primary">CLI Tools</Link></li>
            </ul>
          </div>

          {/* Documentation Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><Link to="/docs" className="hover:text-text-primary">Core Documentation</Link></li>
              <li><Link to="/references" className="hover:text-text-primary">260+ Reference Library</Link></li>
              <li><Link to="/docs?slug=anti-slop" className="hover:text-text-primary">Anti-Slop Rules</Link></li>
              <li><Link to="/docs?slug=interaction-states" className="hover:text-text-primary">8-State Matrix</Link></li>
            </ul>
          </div>

          {/* Supported Agents */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Platforms</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><span className="text-text-primary font-medium">Claude Code</span></li>
              <li><span className="text-text-primary font-medium">Cursor</span></li>
              <li><span className="text-text-primary font-medium">Windsurf</span></li>
              <li><span className="text-text-primary font-medium">GitHub Copilot</span></li>
              <li><span className="text-text-primary font-medium">Gemini / Antigravity</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 Pure SaaS Contributors. Open-source under MIT License.</p>
          <div className="flex items-center gap-6">
            <Link to="/docs" className="hover:text-text-primary">Architecture</Link>
            <Link to="/commands" className="hover:text-text-primary">Workflows</Link>
            <a 
              href="https://github.com/LMGXENON/pure-saas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text-primary flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


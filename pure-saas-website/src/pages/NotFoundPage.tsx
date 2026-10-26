import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-4xl sm:text-6xl font-bold tracking-tight text-accent">404</span>
      <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mt-3">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-text-secondary max-w-sm mt-2 leading-relaxed">
        The route you requested does not exist or has been moved. Explore the available sections below:
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-surface-base border border-border-default text-text-primary text-xs font-medium hover:bg-surface-hover transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Documentation</span>
        </Link>
        <Link
          to="/references"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-surface-muted text-text-secondary text-xs font-medium hover:text-text-primary transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search References</span>
        </Link>
      </div>
    </div>
  );
};

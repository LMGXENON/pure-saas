import React, { useState, useEffect } from 'react';
import { officialShowcaseProjects, ShowcaseProject } from '../data/showcaseData';
import {
  ExternalLink,
  PlusCircle,
  X,
  CheckCircle,
  AlertCircle,
  Filter,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ShowcasePage: React.FC = () => {
  const [projects, setProjects] = useState<ShowcaseProject[]>(officialShowcaseProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Form State
  const [projectName, setProjectName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [category, setCategory] = useState<'Dashboard' | 'Developer Tools' | 'Documentation' | 'Marketing'>('Dashboard');
  const [description, setDescription] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Load any local community submissions on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pure-saas-submissions');
      if (saved) {
        const parsed: ShowcaseProject[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProjects([...officialShowcaseProjects, ...parsed]);
        }
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Form validations
    if (!projectName.trim() || projectName.length < 2) {
      setFormError('Please enter a valid project name (minimum 2 characters).');
      return;
    }
    if (!creatorName.trim() || creatorName.length < 2) {
      setFormError('Please enter your name or team name.');
      return;
    }
    if (!isValidUrl(liveUrl)) {
      setFormError('Please enter a valid live website URL starting with https:// or http://');
      return;
    }
    if (!description.trim() || description.length < 15) {
      setFormError('Please provide a short description (minimum 15 characters).');
      return;
    }
    if (!hasPermission) {
      setFormError('Please confirm that you have permission to share this website.');
      return;
    }

    const newSubmission: ShowcaseProject = {
      id: `community-${Date.now()}`,
      name: projectName.trim(),
      tagline: description.slice(0, 60),
      creator: creatorName.trim(),
      creatorHandle: creatorHandle.trim() || undefined,
      liveUrl: liveUrl.trim(),
      category: category,
      description: description.trim(),
      isOfficial: false,
      status: 'pending',
      tags: ['Community', category]
    };

    try {
      const existing = localStorage.getItem('pure-saas-submissions');
      const currentList: ShowcaseProject[] = existing ? JSON.parse(existing) : [];
      const updatedList = [newSubmission, ...currentList];
      localStorage.setItem('pure-saas-submissions', JSON.stringify(updatedList));
      setProjects([...officialShowcaseProjects, ...updatedList]);
      setSubmitSuccess(true);
    } catch (err) {
      setFormError('Could not save submission. Please check browser permissions.');
    }
  };

  const handleCloseModal = () => {
    setIsSubmitModalOpen(false);
    setSubmitSuccess(false);
    setFormError(null);
    setProjectName('');
    setCreatorName('');
    setCreatorHandle('');
    setLiveUrl('');
    setDescription('');
    setHasPermission(false);
  };

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'official') return p.isOfficial;
    if (selectedCategory === 'community') return !p.isOfficial;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border-subtle pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted border border-border-subtle text-text-secondary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Community Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Showcase
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Explore websites built by the community using Pure SaaS. Discover real interfaces, inspect their structure, or submit your own project.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all shadow-subtle shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Your Website</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <span className="text-xs text-text-muted flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </span>
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'official', label: 'Official Examples' },
          { id: 'community', label: 'Community' },
          { id: 'Dashboard', label: 'Dashboards' },
          { id: 'Developer Tools', label: 'Developer Tools' },
          { id: 'Documentation', label: 'Documentation' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-accent text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="p-6 rounded-2xl bg-surface-base border border-border-subtle hover:border-border-default hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-muted text-text-muted">
                  {project.category}
                </span>

                {project.isOfficial ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent px-2 py-0.5 rounded bg-accent/8 border border-accent/20">
                    <Shield className="w-3 h-3" />
                    <span>Official Example</span>
                  </span>
                ) : project.status === 'pending' ? (
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    Pending Review
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-text-muted px-2 py-0.5 rounded bg-surface-muted">
                    Community
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Card Footer */}
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
              <span className="text-text-muted">By {project.creator}</span>
              <span className="text-accent font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-surface-base border border-border-subtle max-w-md mx-auto my-12 space-y-4">
          <Layers className="w-8 h-8 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">No projects found</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            No community submissions have been approved in this category yet. Be the first to share your website!
          </p>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit Your Project</span>
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* PROJECT DETAIL MODAL                                      */}
      {/* ========================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedProject(null)} />
          <div className="relative z-10 w-full max-w-xl rounded-2xl bg-surface-overlay border border-border-default shadow-floating p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {selectedProject.category}
                  </span>
                  {selectedProject.isOfficial && (
                    <span className="text-[10px] font-semibold text-accent px-2 py-0.5 rounded bg-accent/8 border border-accent/20">
                      Official Example
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-text-primary mt-1">{selectedProject.name}</h2>
                <div className="text-xs text-text-muted mt-1">
                  Created by <span className="text-text-primary font-medium">{selectedProject.creator}</span>
                  {selectedProject.creatorHandle && <span className="ml-1 text-text-muted">({selectedProject.creatorHandle})</span>}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
              <p>{selectedProject.description}</p>

              {selectedProject.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.tags.map((t, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-surface-muted text-text-secondary text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary"
              >
                Close
              </button>
              <a
                href={selectedProject.liveUrl}
                target={selectedProject.liveUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBMIT WEBSITE MODAL                                      */}
      {/* ========================================================= */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={handleCloseModal} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-surface-overlay border border-border-default shadow-floating p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Submit Your Website</h2>
                <p className="text-xs text-text-secondary mt-1">
                  Share an interface you designed or built using Pure SaaS.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Submission Received</h3>
                <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you! Your website has been submitted for review. It will appear in the community gallery once approved by the maintainers.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-danger-subtle text-danger-text border border-danger-subtle flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="font-semibold text-text-primary block mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Acme Cloud Console"
                    className="w-full h-10 px-3 rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-text-primary block mb-1">Creator / Team Name *</label>
                    <input
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full h-10 px-3 rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-text-primary block mb-1">Social Handle (Optional)</label>
                    <input
                      type="text"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      placeholder="e.g. @janedoe"
                      className="w-full h-10 px-3 rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-text-primary block mb-1">Live Website URL *</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full h-10 px-3 rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-text-primary block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-base border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="Dashboard">Dashboard</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-text-primary block mb-1">Short Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what this project does and how Pure SaaS was used..."
                    rows={3}
                    className="w-full p-3 rounded-lg bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasPermission}
                      onChange={(e) => setHasPermission(e.target.checked)}
                      className="mt-0.5 rounded border-border-default text-accent focus:ring-accent"
                      required
                    />
                    <span className="text-xs text-text-secondary leading-normal">
                      I confirm that I created this project or have explicit permission from the owner to share this website in the showcase.
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

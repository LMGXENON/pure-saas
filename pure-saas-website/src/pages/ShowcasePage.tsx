// pure-saas-website/src/pages/ShowcasePage.tsx
import React, { useState, useEffect } from 'react';
import { ShowcaseProject } from '../data/showcaseData';
import {
  getShowcaseProjects,
  submitShowcaseProject,
  getModerationSubmissions,
  moderateSubmission
} from '../services/showcaseApi';
import {
  ExternalLink,
  PlusCircle,
  X,
  CheckCircle,
  AlertCircle,
  Filter,
  Shield,
  Lock,
  Loader2,
  Sparkles,
  Inbox
} from 'lucide-react';

export const ShowcasePage: React.FC = () => {
  const [officialProjects, setOfficialProjects] = useState<ShowcaseProject[]>([]);
  const [communityProjects, setCommunityProjects] = useState<ShowcaseProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'official' | 'community'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  // Submission Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [projectName, setProjectName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [creatorUrl, setCreatorUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [category, setCategory] = useState<'Dashboard' | 'Developer Tools' | 'Documentation' | 'Marketing'>('Dashboard');
  const [description, setDescription] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);

  // Moderation Modal State (Server Protected)
  const [isModModalOpen, setIsModModalOpen] = useState<boolean>(false);
  const [modKey, setModKey] = useState<string>('');
  const [isModAuthenticated, setIsModAuthenticated] = useState<boolean>(false);
  const [modSubmissions, setModSubmissions] = useState<ShowcaseProject[]>([]);
  const [modLoading, setModLoading] = useState<boolean>(false);
  const [modError, setModError] = useState<string | null>(null);
  const [modSuccessMsg, setModSuccessMsg] = useState<string | null>(null);

  const loadProjects = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getShowcaseProjects();
      setOfficialProjects(data.official);
      setCommunityProjects(data.approved);
    } catch (err: any) {
      setLoadError('Failed to load showcase projects. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Strict Validations
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
    if (creatorUrl.trim() && !isValidUrl(creatorUrl)) {
      setFormError('Creator URL must be a valid http(s) link.');
      return;
    }
    if (previewUrl.trim() && !isValidUrl(previewUrl)) {
      setFormError('Preview image URL must be a valid http(s) link.');
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

    setIsSubmitting(true);
    try {
      const res = await submitShowcaseProject({
        name: projectName,
        creator: creatorName,
        creatorHandle: creatorHandle || undefined,
        creatorUrl: creatorUrl || undefined,
        liveUrl: liveUrl,
        previewUrl: previewUrl || undefined,
        category: category,
        description: description,
        hasPermission: hasPermission
      });

      setSubmitSuccessMsg(res.message);
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
    setSubmitSuccessMsg(null);
    setFormError(null);
    setProjectName('');
    setCreatorName('');
    setCreatorHandle('');
    setCreatorUrl('');
    setLiveUrl('');
    setPreviewUrl('');
    setDescription('');
    setHasPermission(false);
  };

  // Moderation Logic
  const handleModLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setModError(null);
    setModLoading(true);
    try {
      const data = await getModerationSubmissions(modKey);
      setModSubmissions(data.submissions);
      setIsModAuthenticated(true);
    } catch (err: any) {
      setModError(err.message || 'Authentication failed.');
    } finally {
      setModLoading(false);
    }
  };

  const handleModerateAction = async (id: string, action: 'approve' | 'reject' | 'delete') => {
    setModError(null);
    setModLoading(true);
    try {
      await moderateSubmission(modKey, id, action);
      setModSuccessMsg(`Action "${action}" completed for submission.`);
      const updated = await getModerationSubmissions(modKey);
      setModSubmissions(updated.submissions);
      // Reload public projects too
      await loadProjects();
      setTimeout(() => setModSuccessMsg(null), 3000);
    } catch (err: any) {
      setModError(err.message || 'Action failed.');
    } finally {
      setModLoading(false);
    }
  };

  const allProjects = [
    ...(activeTab === 'community' ? [] : officialProjects),
    ...(activeTab === 'official' ? [] : communityProjects)
  ];

  const filteredProjects = allProjects.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border-subtle pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted border border-border-subtle text-text-secondary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Real SaaS Websites</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
              Showcase
            </h1>
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
              Explore authentic websites and interfaces built with Pure SaaS. Inspect real structures, browse verified official blueprints, or submit your own project.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-98 transition-all shadow-subtle shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Your Website</span>
            </button>
          </div>
        </div>

        {/* Section Tabs & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Gallery Scope Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-muted border border-border-subtle text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              All Projects ({officialProjects.length + communityProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('official')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'official'
                  ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Official Examples ({officialProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'community'
                  ? 'bg-surface-base text-text-primary shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Community ({communityProjects.length})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs text-text-muted flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Type:</span>
            </span>
            {['all', 'Dashboard', 'Developer Tools', 'Documentation', 'Marketing'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                {cat === 'all' ? 'All Types' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-24 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
            <p className="text-xs text-text-secondary font-medium">Loading showcase gallery...</p>
          </div>
        )}

        {/* Load Error */}
        {loadError && !isLoading && (
          <div className="p-6 rounded-2xl bg-danger-subtle border border-danger-base/20 text-center space-y-3 max-w-md mx-auto">
            <AlertCircle className="w-6 h-6 text-danger-text mx-auto" />
            <p className="text-xs text-danger-text">{loadError}</p>
            <button
              onClick={loadProjects}
              className="px-4 py-1.5 rounded-lg bg-surface-base border border-border-default text-xs font-medium text-text-primary hover:bg-surface-hover"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty Community State */}
        {!isLoading && !loadError && activeTab === 'community' && communityProjects.length === 0 && (
          <div className="py-20 px-6 rounded-2xl border border-dashed border-border-default bg-surface-muted/30 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-border-subtle flex items-center justify-center mx-auto text-text-muted">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-text-primary">No community websites published yet</h3>
              <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                Be the first to share a SaaS interface, dashboard, or website built using Pure SaaS with the developer community.
              </p>
            </div>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Your Project</span>
            </button>
          </div>
        )}

        {/* Empty Filter State */}
        {!isLoading && !loadError && filteredProjects.length === 0 && !(activeTab === 'community' && communityProjects.length === 0) && (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-semibold text-text-primary">No projects match the selected filter</p>
            <p className="text-xs text-text-secondary">Try switching categories or viewing all projects.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !loadError && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl bg-surface-base border border-border-subtle hover:border-accent/40 shadow-subtle hover:shadow-hover transition-all duration-200 overflow-hidden"
              >
                {/* Visual Header / Preview Asset */}
                <div className="h-44 bg-surface-muted border-b border-border-subtle relative flex items-center justify-center p-6 overflow-hidden">
                  {project.previewUrl ? (
                    <img
                      src={project.previewUrl}
                      alt={project.name}
                      className="w-full h-full object-cover object-top rounded-lg"
                      onError={(e) => {
                        // Graceful fallback if image fails to load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-surface-base/80 border border-border-subtle p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted">
                          {project.category}
                        </span>
                        {project.isOfficial ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Official Example</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-elevated text-text-secondary border border-border-subtle">
                            <span>Community</span>
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm text-text-primary truncate">{project.name}</div>
                        <div className="text-[11px] text-text-secondary truncate mt-0.5">{project.tagline}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-text-primary tracking-tight truncate">
                        {project.name}
                      </h3>
                      {project.isOfficial && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-accent shrink-0">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-muted text-text-secondary border border-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                    <div className="truncate">
                      <span className="text-[11px] text-text-muted">By </span>
                      <span className="text-[11px] font-semibold text-text-primary">
                        {project.creator}
                      </span>
                      {project.creatorHandle && (
                        <span className="text-[10px] text-text-muted ml-1">{project.creatorHandle}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-2.5 py-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover text-xs font-medium transition-colors"
                      >
                        Details
                      </button>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                        title="Visit Live Website"
                        aria-label={`Visit ${project.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info & Admin Moderation Access */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            <span>All community projects undergo security moderation before publication.</span>
          </div>
          <button
            onClick={() => setIsModModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-secondary transition-colors text-[11px]"
          >
            <Lock className="w-3 h-3" />
            <span>Moderation Panel</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PROJECT DETAIL MODAL                                      */}
      {/* ========================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-surface-base border border-border-default shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-text-primary">{selectedProject.name}</h2>
                  {selectedProject.isOfficial && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
                      Official Example
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-0.5">{selectedProject.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-text-primary mb-1">About the Project</h4>
                <p className="text-text-secondary leading-relaxed">{selectedProject.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-1">Creator Attribution</h4>
                <div className="flex items-center gap-2 text-text-secondary">
                  <span>{selectedProject.creator}</span>
                  {selectedProject.creatorHandle && <span>({selectedProject.creatorHandle})</span>}
                  {selectedProject.creatorUrl && (
                    <a
                      href={selectedProject.creatorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-1.5">Tags & Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tg, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-surface-muted text-text-secondary border border-border-subtle">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-surface-hover"
              >
                Close
              </button>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 shadow-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-surface-base border border-border-default shadow-2xl p-6 space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Submit Your Website</h2>
                <p className="text-xs text-text-secondary mt-1">
                  Share a SaaS website or web interface you built using Pure SaaS.
                </p>
              </div>
              <button
                onClick={handleCloseSubmitModal}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover"
                aria-label="Close submission modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccessMsg ? (
              <div className="py-6 text-center space-y-4">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-text-primary">Submission Received!</h3>
                  <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                    {submitSuccessMsg}
                  </p>
                </div>
                <button
                  onClick={handleCloseSubmitModal}
                  className="px-5 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-xl bg-danger-subtle border border-danger-base/20 text-danger-text text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="font-semibold text-text-primary">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Acme Analytics Console"
                    className="w-full h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-text-primary">Creator Name / Team *</label>
                    <input
                      type="text"
                      required
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-text-primary">Social / GitHub Handle</label>
                    <input
                      type="text"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      placeholder="e.g. @sarahj"
                      className="w-full h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-text-primary">Live Website URL *</label>
                  <input
                    type="url"
                    required
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://yourproduct.com"
                    className="w-full h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-text-primary">Category *</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="Dashboard">Dashboard</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-text-primary">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain what the product does and how Pure SaaS was used..."
                    className="w-full p-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <div className="text-[10px] text-text-muted text-right">Minimum 15 characters</div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={hasPermission}
                      onChange={(e) => setHasPermission(e.target.checked)}
                      className="mt-0.5 rounded border-border-default text-accent focus:ring-accent"
                    />
                    <span className="text-[11px] text-text-secondary leading-normal">
                      I confirm that I built or have permission to submit this website, and agree that it will be reviewed by Pure SaaS moderators prior to publication.
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseSubmitModal}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-surface-hover"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-xs"
                  >
                    {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Submit for Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SERVER-PROTECTED MODERATION MODAL                          */}
      {/* ========================================================= */}
      {isModModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-surface-base border border-border-default shadow-2xl p-6 space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-primary">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">Server Moderation Workflow</h2>
                  <p className="text-xs text-text-muted">Protected endpoint verified via Authorization header</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsModModalOpen(false);
                  setIsModAuthenticated(false);
                  setModKey('');
                  setModError(null);
                }}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover"
                aria-label="Close moderation panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modError && (
              <div className="p-3 rounded-xl bg-danger-subtle border border-danger-base/20 text-danger-text text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modError}</span>
              </div>
            )}

            {modSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{modSuccessMsg}</span>
              </div>
            )}

            {!isModAuthenticated ? (
              <form onSubmit={handleModLogin} className="space-y-4 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  Enter the server moderation secret key. The key is verified on the backend before any submission data is returned.
                </p>
                <div className="space-y-1.5">
                  <label className="font-semibold text-text-primary">Moderator Authorization Token</label>
                  <input
                    type="password"
                    required
                    value={modKey}
                    onChange={(e) => setModKey(e.target.value)}
                    placeholder="Enter moderation secret key..."
                    className="w-full h-9 px-3 rounded-lg bg-surface-muted/60 border border-border-default text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <span className="text-[10px] text-text-muted block">
                    Default dev token: <code className="text-accent">pure-saas-mod-secret-2026</code> (configured via SHOWCASE_MODERATION_KEY)
                  </span>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={modLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {modLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Authenticate with Backend</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-primary">
                    Submissions Queue ({modSubmissions.length})
                  </span>
                  <span className="text-text-muted">
                    {modSubmissions.filter(s => s.status === 'pending').length} Pending
                  </span>
                </div>

                {modSubmissions.length === 0 ? (
                  <p className="text-xs text-text-muted py-6 text-center">No submissions recorded in the database.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {modSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-xl bg-surface-muted/40 border border-border-subtle text-xs space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text-primary">{sub.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-elevated text-text-muted">
                              {sub.category}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              sub.status === 'approved'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : sub.status === 'rejected'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>

                        <p className="text-text-secondary leading-relaxed">{sub.description}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-[11px] text-text-muted">
                          <div>
                            <span>By {sub.creator}</span>
                            <a
                              href={sub.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-3 text-accent hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>Inspect Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            {sub.status !== 'approved' && (
                              <button
                                onClick={() => handleModerateAction(sub.id, 'approve')}
                                className="px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {sub.status !== 'rejected' && (
                              <button
                                onClick={() => handleModerateAction(sub.id, 'reject')}
                                className="px-2.5 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleModerateAction(sub.id, 'delete')}
                              className="px-2 py-1 rounded text-text-muted hover:text-text-primary"
                              title="Delete permanently"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// pure-saas-website/src/services/showcaseApi.ts
import { ShowcaseProject, fallbackOfficialProjects } from '../data/showcaseData';

const LOCAL_STORAGE_KEY = 'pure-saas-client-submissions';

export interface ShowcaseDataResponse {
  official: ShowcaseProject[];
  approved: ShowcaseProject[];
}

export interface ModerationDataResponse {
  official: ShowcaseProject[];
  submissions: ShowcaseProject[];
}

export async function getShowcaseProjects(): Promise<ShowcaseDataResponse> {
  try {
    const res = await fetch('/api/showcase');
    if (res.ok) {
      const data = await res.json();
      return {
        official: data.official || fallbackOfficialProjects,
        approved: data.approved || []
      };
    }
  } catch (e) {
    // API endpoint unavailable, fall back to persistent local storage
  }

  // Client-side persistent storage fallback (for static deployment environments)
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed: ShowcaseProject[] = JSON.parse(raw);
      const approved = parsed.filter(p => p.status === 'approved');
      return {
        official: fallbackOfficialProjects,
        approved
      };
    }
  } catch {}

  return {
    official: fallbackOfficialProjects,
    approved: []
  };
}

export async function submitShowcaseProject(payload: {
  name: string;
  creator: string;
  creatorHandle?: string;
  creatorUrl?: string;
  liveUrl: string;
  previewUrl?: string;
  category: 'Dashboard' | 'Developer Tools' | 'Documentation' | 'Marketing';
  description: string;
  hasPermission: boolean;
}): Promise<{ success: boolean; id: string; message: string }> {
  try {
    const res = await fetch('/api/showcase/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return await res.json();
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit website.');
    }
  } catch (err: any) {
    // If backend endpoint is unavailable (e.g. static CDN deployment), persist locally
    if (err.message && !err.message.includes('Failed to fetch')) {
      throw err;
    }

    const newRecord: ShowcaseProject = {
      id: `comm-local-${Date.now()}`,
      name: payload.name.trim(),
      tagline: payload.description.slice(0, 80),
      creator: payload.creator.trim(),
      creatorHandle: payload.creatorHandle?.trim() || undefined,
      creatorUrl: payload.creatorUrl?.trim() || undefined,
      liveUrl: payload.liveUrl.trim(),
      previewUrl: payload.previewUrl?.trim() || undefined,
      category: payload.category,
      description: payload.description.trim(),
      isOfficial: false,
      status: 'pending',
      tags: ['Community', payload.category],
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: ShowcaseProject[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newRecord, ...list]));
      return {
        success: true,
        id: newRecord.id,
        message: 'Your website has been saved and is pending moderator approval.'
      };
    } catch {
      throw new Error('Could not persist submission to storage.');
    }
  }
}

export async function getModerationSubmissions(secretKey: string): Promise<ModerationDataResponse> {
  const res = await fetch('/api/showcase/moderation', {
    headers: {
      'Authorization': `Bearer ${secretKey}`
    }
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized: Invalid moderation secret key.');
    }
    throw new Error('Failed to retrieve submissions from server.');
  }

  return await res.json();
}

export async function moderateSubmission(
  secretKey: string,
  id: string,
  action: 'approve' | 'reject' | 'delete'
): Promise<void> {
  const res = await fetch('/api/showcase/moderate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${secretKey}`
    },
    body: JSON.stringify({ id, action })
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized: Invalid moderation secret key.');
    }
    const err = await res.json();
    throw new Error(err.error || 'Failed to moderate submission.');
  }
}


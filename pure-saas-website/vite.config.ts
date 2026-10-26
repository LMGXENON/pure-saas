import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function showcaseApiPlugin(): Plugin {
  const dbPath = path.resolve(__dirname, 'data/showcase-db.json');
  const MODERATION_KEY = process.env.SHOWCASE_MODERATION_KEY || 'pure-saas-mod-secret-2026';

  function readDb() {
    try {
      if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading showcase db:', e);
    }
    return { official: [], submissions: [] };
  }

  function writeDb(data: any) {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (e) {
      console.error('Error writing showcase db:', e);
      return false;
    }
  }

  function sanitize(str: string): string {
    if (!str) return '';
    return str
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .replace(/[<>'"&]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#39;';
          case '&': return '&amp;';
          default: return c;
        }
      })
      .trim();
  }

  function isValidUrl(urlStr: string): boolean {
    try {
      const u = new URL(urlStr);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function registerRoutes(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';

      // 1. GET /api/showcase (Public: returns official and approved community projects)
      if (req.method === 'GET' && url === '/api/showcase') {
        const db = readDb();
        const approved = (db.submissions || []).filter((s: any) => s.status === 'approved');
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({
          official: db.official || [],
          approved: approved
        }));
        return;
      }

      // 2. POST /api/showcase/submit (Public: submits a website for moderation)
      if (req.method === 'POST' && url === '/api/showcase/submit') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const name = sanitize(data.name || '');
            const creator = sanitize(data.creator || '');
            const creatorHandle = sanitize(data.creatorHandle || '');
            const creatorUrl = data.creatorUrl ? data.creatorUrl.trim() : '';
            const liveUrl = (data.liveUrl || '').trim();
            const previewUrl = (data.previewUrl || '').trim();
            const category = sanitize(data.category || 'Dashboard');
            const description = sanitize(data.description || '');
            const hasPermission = Boolean(data.hasPermission);

            // Strict Validation
            if (!name || name.length < 2 || name.length > 100) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Project name must be between 2 and 100 characters.' }));
              return;
            }
            if (!creator || creator.length < 2 || creator.length > 100) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Creator name must be between 2 and 100 characters.' }));
              return;
            }
            if (!isValidUrl(liveUrl)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Live URL must be a valid http(s) URL.' }));
              return;
            }
            if (creatorUrl && !isValidUrl(creatorUrl)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Creator profile URL must be a valid http(s) URL.' }));
              return;
            }
            if (previewUrl && !isValidUrl(previewUrl)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Preview asset must be a valid image URL.' }));
              return;
            }
            if (!description || description.length < 15 || description.length > 1000) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Description must be between 15 and 1000 characters.' }));
              return;
            }
            if (!hasPermission) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Permission confirmation is required.' }));
              return;
            }

            const db = readDb();
            const newRecord = {
              id: `comm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              name,
              tagline: description.length > 80 ? description.substring(0, 80) + '...' : description,
              creator,
              creatorHandle: creatorHandle || undefined,
              creatorUrl: creatorUrl || undefined,
              liveUrl,
              previewUrl: previewUrl || undefined,
              category,
              description,
              isOfficial: false,
              status: 'pending', // Genuinely pending moderation
              tags: ['Community', category],
              createdAt: new Date().toISOString()
            };

            db.submissions = [newRecord, ...(db.submissions || [])];
            writeDb(db);

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              id: newRecord.id,
              message: 'Your website has been submitted for review. It will appear once approved by moderators.'
            }));
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to process submission.' }));
          }
        });
        return;
      }

      // 3. GET /api/showcase/moderation (Protected: view all submissions including pending)
      if (req.method === 'GET' && url === '/api/showcase/moderation') {
        const auth = req.headers['authorization'];
        const token = auth && auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';

        if (token !== MODERATION_KEY) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Unauthorized: Invalid or missing moderation key.' }));
          return;
        }

        const db = readDb();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          official: db.official || [],
          submissions: db.submissions || []
        }));
        return;
      }

      // 4. POST /api/showcase/moderate (Protected: approve, reject, or delete submission)
      if (req.method === 'POST' && url === '/api/showcase/moderate') {
        const auth = req.headers['authorization'];
        const token = auth && auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';

        if (token !== MODERATION_KEY) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Unauthorized: Invalid or missing moderation key.' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const { id, action } = JSON.parse(body);
            if (!id || !['approve', 'reject', 'delete'].includes(action)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Valid id and action (approve, reject, delete) are required.' }));
              return;
            }

            const db = readDb();
            const target = (db.submissions || []).find((s: any) => s.id === id);
            if (!target) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Submission not found.' }));
              return;
            }

            if (action === 'delete') {
              db.submissions = db.submissions.filter((s: any) => s.id !== id);
            } else if (action === 'approve') {
              target.status = 'approved';
              target.approvedAt = new Date().toISOString();
            } else if (action === 'reject') {
              target.status = 'rejected';
              target.rejectedAt = new Date().toISOString();
            }

            writeDb(db);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, submission: target }));
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to update moderation status.' }));
          }
        });
        return;
      }

      next();
    });
  }

  return {
    name: 'showcase-api-plugin',
    configureServer(server) {
      registerRoutes(server);
    },
    configurePreviewServer(server) {
      registerRoutes(server);
    }
  };
}

export default defineConfig({
  plugins: [react(), showcaseApiPlugin()],
  server: {
    port: 3000
  }
});

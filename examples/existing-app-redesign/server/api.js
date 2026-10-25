/**
 * PRESERVED BACKEND CONTRACT: VaultGuard REST API
 * This server architecture and authentication contract MUST remain intact during UI redesigns.
 */

import http from 'node:http';
import { verifySessionToken, generateSessionToken } from './auth.js';

// In-memory encrypted secrets database (representing production datastore)
const SECRETS_STORE = [
  { id: 'sec_01', name: 'DATABASE_URL_PRIMARY', environment: 'production', hash: 'sha256:8f2a...91c', lastRotated: '2026-10-21T09:12:00Z' },
  { id: 'sec_02', name: 'STRIPE_WEBHOOK_SECRET', environment: 'production', hash: 'sha256:4b11...e20', lastRotated: '2026-09-14T18:44:00Z' },
  { id: 'sec_03', name: 'AWS_KMS_MASTER_KEY', environment: 'infrastructure', hash: 'sha256:77fa...10d', lastRotated: '2026-10-25T11:00:00Z' }
];

export function createApiServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    res.setHeader('Content-Type', 'application/json');

    // Authentication endpoint
    if (req.method === 'POST' && url.pathname === '/api/v1/auth/login') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { email, password } = JSON.parse(body || '{}');
          if (email === 'admin@vaultguard.internal' && password === 'correct-horse-battery') {
            const token = generateSessionToken(email);
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, token, user: { email, role: 'sec-admin' } }));
          } else {
            res.writeHead(401);
            res.end(JSON.stringify({ success: false, error: 'Invalid security credentials' }));
          }
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Malformed payload' }));
        }
      });
      return;
    }

    // Protected Secrets API
    if (url.pathname === '/api/v1/secrets') {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ') || !verifySessionToken(authHeader.slice(7))) {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Unauthorized: Valid cryptographic bearer token required' }));
        return;
      }

      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ secrets: SECRETS_STORE, count: SECRETS_STORE.length }));
        return;
      }
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  });
}

/**
 * PRESERVED AUTHENTICATION LOGIC: Cryptographic Session Token Verification
 */

import crypto from 'node:crypto';

const SECRET_SIGNING_SALT = 'vaultguard-internal-production-salt-2026';

export function generateSessionToken(email) {
  const payload = `${email}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', SECRET_SIGNING_SALT).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64');
}

export function verifySessionToken(token) {
  try {
    const raw = Buffer.from(token, 'base64').toString('utf8');
    const [email, timestamp, hmac] = raw.split(':');
    if (!email || !timestamp || !hmac) return false;
    const expected = crypto.createHmac('sha256', SECRET_SIGNING_SALT).update(`${email}:${timestamp}`).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}

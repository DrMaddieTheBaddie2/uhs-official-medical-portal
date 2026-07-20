import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_COOKIE, clearCookie, isProduction } from '../_lib/session'

/**
 * POST /api/auth/logout — invalidates the application session by clearing the
 * HTTP-only cookie. POST + SameSite=Lax means cross-site requests cannot
 * trigger it with the user's cookie (CSRF protection).
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  res.setHeader('Set-Cookie', clearCookie(SESSION_COOKIE, isProduction()))
  res.status(200).json({ ok: true })
}

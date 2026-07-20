import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_COOKIE, openPayload, parseCookies, requireEnv } from '../_lib/session'
import type { SessionUser } from '../_lib/discord'

/**
 * GET /api/auth/session — returns the safe, client-facing session object.
 * Never returns Discord tokens, the client secret, or the session secret
 * (none of those are stored in the session at all).
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  res.setHeader('Cache-Control', 'no-store')
  const session = openPayload<{ user: SessionUser }>(
    parseCookies(req.headers.cookie)[SESSION_COOKIE],
    requireEnv('SESSION_SECRET'),
  )

  if (!session) {
    res.status(200).json({ authenticated: false })
    return
  }
  res.status(200).json({ authenticated: true, user: session.user })
}

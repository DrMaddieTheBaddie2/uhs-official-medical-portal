import { timingSafeEqual } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  OAUTH_COOKIE,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  clearCookie,
  isProduction,
  openPayload,
  parseCookies,
  requireEnv,
  sealPayload,
  serializeCookie,
} from '../../_lib/session'
import { exchangeCode, loadSessionUser } from '../../_lib/discord'

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

/**
 * GET /api/auth/discord/callback — validates state, exchanges the code
 * server-side (client secret never leaves this function), loads the Discord
 * identity + optional UHS guild member record, then issues a fresh signed
 * HTTP-only session cookie (session rotation) and redirects home. Discord
 * tokens are discarded immediately after use and are never stored.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const appUrl = process.env.APP_URL || '/'
  const secure = isProduction()
  const fail = (reason: 'denied' | 'failed') => {
    res.setHeader('Set-Cookie', [clearCookie(OAUTH_COOKIE, secure)])
    res.redirect(302, `${appUrl}/?auth=${reason}`)
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { code, state, error } = req.query as Record<string, string | undefined>
    if (error === 'access_denied') return fail('denied')

    const sessionSecret = requireEnv('SESSION_SECRET')
    const oauth = openPayload<{ state: string; codeVerifier: string }>(
      parseCookies(req.headers.cookie)[OAUTH_COOKIE],
      sessionSecret,
    )
    if (!code || !state || !oauth || !safeEqual(state, oauth.state)) return fail('failed')

    const accessToken = await exchangeCode(code, oauth.codeVerifier)
    const user = await loadSessionUser(accessToken)

    const session = sealPayload({ user }, sessionSecret, SESSION_MAX_AGE_SECONDS)
    res.setHeader('Set-Cookie', [
      clearCookie(OAUTH_COOKIE, secure),
      serializeCookie(SESSION_COOKIE, session, { maxAge: SESSION_MAX_AGE_SECONDS, secure }),
    ])
    res.redirect(302, appUrl)
  } catch {
    // Never leak upstream error details to the browser.
    fail('failed')
  }
}

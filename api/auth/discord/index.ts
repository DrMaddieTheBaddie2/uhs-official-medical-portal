import { createHash, randomBytes } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  OAUTH_COOKIE,
  OAUTH_MAX_AGE_SECONDS,
  base64url,
  isProduction,
  requireEnv,
  sealPayload,
  serializeCookie,
} from '../../_lib/session'

/**
 * GET /api/auth/discord — starts the Discord OAuth2 Authorization Code flow
 * with a cryptographically random state and PKCE (S256). State + verifier are
 * kept in a short-lived signed HTTP-only cookie, never exposed to the client.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const state = base64url(randomBytes(24))
  const codeVerifier = base64url(randomBytes(48))
  const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url')

  const sealed = sealPayload({ state, codeVerifier }, requireEnv('SESSION_SECRET'), OAUTH_MAX_AGE_SECONDS)
  res.setHeader(
    'Set-Cookie',
    serializeCookie(OAUTH_COOKIE, sealed, { maxAge: OAUTH_MAX_AGE_SECONDS, secure: isProduction() }),
  )

  const scopes = process.env.DISCORD_GUILD_ID ? 'identify guilds.members.read' : 'identify'
  const authorizeUrl = new URL('https://discord.com/oauth2/authorize')
  authorizeUrl.searchParams.set('client_id', requireEnv('DISCORD_CLIENT_ID'))
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('redirect_uri', requireEnv('DISCORD_REDIRECT_URI'))
  authorizeUrl.searchParams.set('scope', scopes)
  authorizeUrl.searchParams.set('state', state)
  authorizeUrl.searchParams.set('code_challenge', codeChallenge)
  authorizeUrl.searchParams.set('code_challenge_method', 'S256')

  res.redirect(302, authorizeUrl.toString())
}

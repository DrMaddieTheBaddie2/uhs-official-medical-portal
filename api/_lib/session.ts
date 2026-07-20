import { createHmac, timingSafeEqual } from 'node:crypto'

/** Cookie names — underscore-prefixed folder keeps this file out of Vercel's routing. */
export const SESSION_COOKIE = 'uhs_session'
export const OAUTH_COOKIE = 'uhs_oauth'

export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60 // 7 days
export const OAUTH_MAX_AGE_SECONDS = 10 * 60 // state/verifier live 10 minutes

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export function isProduction(): boolean {
  return process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
}

export function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url')
}

function hmac(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url')
}

/** Serialize a payload into `base64url(json).signature` with an absolute expiry. */
export function sealPayload(payload: Record<string, unknown>, secret: string, maxAgeSeconds: number): string {
  const body = base64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + maxAgeSeconds }))
  return `${body}.${hmac(body, secret)}`
}

/** Verify signature + expiry; returns the payload or null. Never throws on bad input. */
export function openPayload<T>(sealed: string | undefined, secret: string): (T & { exp: number }) | null {
  if (!sealed) return null
  const dot = sealed.lastIndexOf('.')
  if (dot <= 0) return null
  const body = sealed.slice(0, dot)
  const signature = sealed.slice(dot + 1)
  const expected = hmac(body, secret)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as T & { exp: number }
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function serializeCookie(
  name: string,
  value: string,
  options: { maxAge: number; secure: boolean },
): string {
  const parts = [
    `${name}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${options.maxAge}`,
  ]
  if (options.secure) parts.push('Secure')
  return parts.join('; ')
}

export function clearCookie(name: string, secure: boolean): string {
  return serializeCookie(name, '', { maxAge: 0, secure })
}

export function parseCookies(header: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (!header) return cookies
  for (const pair of header.split(';')) {
    const eq = pair.indexOf('=')
    if (eq === -1) continue
    cookies[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim()
  }
  return cookies
}

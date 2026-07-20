/**
 * Client side of the UHS auth contract. The browser only ever talks to our own
 * /api/auth/* endpoints — Discord tokens and the client secret live strictly
 * server-side, and the session cookie is HTTP-only (never readable here).
 */

export interface AuthUser {
  id: string
  /** Discord global display name (or username when no display name is set). */
  displayName: string
  username: string
  avatarUrl?: string | null
  /** Nickname in the UHS Discord server, when the scope/guild data allows it. */
  guildNickname?: string | null
  /** Portal title mapped from Discord roles (assigned server-side, never user-edited). */
  roleTitle?: string | null
}

export interface SessionResponse {
  authenticated: boolean
  user?: AuthUser
}

/** Starts the Discord OAuth2 flow (server redirects to Discord). */
export const LOGIN_URL = '/api/auth/discord'

export async function fetchSession(): Promise<SessionResponse> {
  try {
    const res = await fetch('/api/auth/session', { credentials: 'include' })
    if (!res.ok) return { authenticated: false }
    return (await res.json()) as SessionResponse
  } catch {
    // No backend reachable (e.g. plain static dev) — treat as signed out.
    return { authenticated: false }
  }
}

export async function requestLogout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
  } catch {
    // Session cookie is server-managed; nothing further the client can do.
  }
}

/**
 * Display-name fallback order (per the auth spec):
 * UHS server nickname → Discord global display name → Discord username.
 */
export function primaryNameFor(user: AuthUser): string {
  return user.guildNickname || user.displayName || user.username
}

/** Initials for the avatar fallback — first letters of the first two words. */
export function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('')
}

/**
 * Future role support: Discord role id → portal title. The server is the
 * source of truth for role mapping; this mirror exists so the shape is agreed
 * now. Fill in real role ids when role mapping is configured, e.g.:
 *   '123456789012345678': 'Advanced Paramedic',
 * Titles available: Student Paramedic, Emergency Medical Technician,
 * Paramedic, Advanced Paramedic, Critical Care Paramedic, Doctor, HEMS Doctor,
 * HART, Clinical Lead, Command, Administrator.
 */
export const DISCORD_ROLE_TITLES: Record<string, string> = {}

export function resolveRoleTitle(roleIds: readonly string[] | undefined): string | null {
  if (!roleIds) return null
  for (const id of roleIds) {
    const title = DISCORD_ROLE_TITLES[id]
    if (title) return title
  }
  return null
}

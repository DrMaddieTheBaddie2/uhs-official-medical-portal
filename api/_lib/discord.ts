import { requireEnv } from './session'

const DISCORD_API = 'https://discord.com/api/v10'

/**
 * Server-side source of truth for Discord role id → portal title mapping
 * (future role support). Order matters: the first matching role wins, so list
 * senior titles first when configuring. Example:
 *   ['123456789012345678', 'Clinical Lead'],
 */
const DISCORD_ROLE_TITLES: ReadonlyArray<[roleId: string, title: string]> = []

export interface SessionUser {
  id: string
  displayName: string
  username: string
  avatarUrl: string | null
  guildNickname: string | null
  roleTitle: string | null
}

interface DiscordUser {
  id: string
  username: string
  global_name: string | null
  avatar: string | null
}

interface DiscordGuildMember {
  nick: string | null
  roles: string[]
}

export async function exchangeCode(code: string, codeVerifier: string): Promise<string> {
  const response = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: requireEnv('DISCORD_CLIENT_ID'),
      client_secret: requireEnv('DISCORD_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      code,
      redirect_uri: requireEnv('DISCORD_REDIRECT_URI'),
      code_verifier: codeVerifier,
    }),
  })
  if (!response.ok) throw new Error(`Discord token exchange failed: ${response.status}`)
  const data = (await response.json()) as { access_token: string }
  return data.access_token
}

/**
 * Fetches identity (and, when possible, the UHS guild member record) then
 * discards the access token — we keep no Discord tokens anywhere.
 */
export async function loadSessionUser(accessToken: string): Promise<SessionUser> {
  const userResponse = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!userResponse.ok) throw new Error(`Discord user fetch failed: ${userResponse.status}`)
  const user = (await userResponse.json()) as DiscordUser

  let guildNickname: string | null = null
  let roleTitle: string | null = null
  const guildId = process.env.DISCORD_GUILD_ID
  if (guildId) {
    const memberResponse = await fetch(`${DISCORD_API}/users/@me/guilds/${guildId}/member`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    // Not being in the guild (or a missing scope) is fine — fall back gracefully.
    if (memberResponse.ok) {
      const member = (await memberResponse.json()) as DiscordGuildMember
      guildNickname = member.nick ?? null
      const roles = new Set(member.roles)
      for (const [roleId, title] of DISCORD_ROLE_TITLES) {
        if (roles.has(roleId)) {
          roleTitle = title
          break
        }
      }
    }
  }

  return {
    id: user.id,
    displayName: user.global_name ?? user.username,
    username: user.username,
    avatarUrl: user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
      : null,
    guildNickname,
    roleTitle,
  }
}

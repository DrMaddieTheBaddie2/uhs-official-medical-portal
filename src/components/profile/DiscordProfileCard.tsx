import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { initialsFor, primaryNameFor } from '@/lib/auth'
import { ProfileMenu } from '@/components/profile/ProfileMenu'

const MENU_ID = 'uhs-profile-menu'

/** Neutral pulse shown while the session request is in flight — no name, no initials. */
export function ProfileSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-44 animate-pulse items-center gap-3 rounded-2xl border border-(--header-border) bg-(--header-surface) py-1.5 pl-1.5 pr-3"
    >
      <span className="h-9 w-9 rounded-xl bg-white/15" />
      <span className="flex-1 space-y-1.5">
        <span className="block h-2.5 w-24 rounded bg-white/15" />
        <span className="block h-2 w-16 rounded bg-white/10" />
      </span>
    </div>
  )
}

/** Signed-in header card driven entirely by the Discord-derived session — nothing hardcoded. */
export function DiscordProfileCard() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  if (!user) return null
  const name = primaryNameFor(user)
  const secondary = user.roleTitle ?? `@${user.username}`

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={MENU_ID}
        className="flex h-12 items-center gap-3 rounded-2xl border border-(--header-border) bg-(--header-surface) py-1.5 pl-1.5 pr-3 text-left transition-colors hover:border-(--accent)"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-9 w-9 shrink-0 rounded-xl object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--accent) text-xs font-bold text-white"
          >
            {initialsFor(name)}
          </span>
        )}
        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-36 truncate text-sm font-semibold text-(--text-on-dark)">{name}</span>
          <span className="block max-w-36 truncate text-xs text-(--header-text-muted)">{secondary}</span>
        </span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`shrink-0 text-(--header-text-muted) transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && <ProfileMenu id={MENU_ID} onClose={() => setOpen(false)} triggerRef={triggerRef} />}
    </div>
  )
}

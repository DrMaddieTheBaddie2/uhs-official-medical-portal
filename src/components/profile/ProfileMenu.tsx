import { useEffect, useRef } from 'react'
import { Check, LogOut, Monitor, Moon, Sun } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { initialsFor, primaryNameFor } from '@/lib/auth'
import { cn } from '@/lib/cn'
import type { ThemePreference } from '@/lib/theme'

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'Use system setting', icon: Monitor },
]

interface ProfileMenuProps {
  id: string
  onClose: () => void
  /** The button that opened the menu — clicks on it are ignored by the outside-click handler. */
  triggerRef: React.RefObject<HTMLElement | null>
}

/** Dropdown for the signed-in profile: identity, theme preference, sign out. */
export function ProfileMenu({ id, onClose, triggerRef }: ProfileMenuProps) {
  const { user, logout } = useAuth()
  const { preference, setPreference } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  // Escape closes; clicks outside (except the trigger) close.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        ;(triggerRef.current as HTMLElement | null)?.focus()
      }
    }
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node
      if (menuRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [onClose, triggerRef])

  // Basic arrow-key navigation across the menu's buttons.
  function onMenuKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
    if (items.length === 0) return
    const index = items.indexOf(document.activeElement as HTMLButtonElement)
    const next =
      e.key === 'ArrowDown'
        ? items[(index + 1) % items.length]
        : items[(index - 1 + items.length) % items.length]
    next.focus()
  }

  if (!user) return null
  const name = primaryNameFor(user)

  return (
    <div
      ref={menuRef}
      id={id}
      role="menu"
      aria-label="Profile menu"
      onKeyDown={onMenuKeyDown}
      className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-(--border) bg-(--surface-elevated) p-2 text-(--text-primary) shadow-(--shadow)"
    >
      <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent-soft) text-sm font-bold text-(--accent)">
            {initialsFor(name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-(--text-secondary)">@{user.username}</p>
        </div>
      </div>

      <div className="my-1 border-t border-(--border)" />

      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-(--text-secondary)">
        Theme
      </p>
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          role="menuitemradio"
          aria-checked={preference === option.value}
          onClick={() => setPreference(option.value)}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-(--accent-soft)',
            preference === option.value ? 'font-semibold text-(--accent)' : 'text-(--text-primary)',
          )}
        >
          <option.icon size={15} aria-hidden="true" />
          {option.label}
          {preference === option.value && <Check size={14} className="ml-auto" aria-hidden="true" />}
        </button>
      ))}

      <div className="my-1 border-t border-(--border)" />

      <button
        role="menuitem"
        onClick={() => {
          onClose()
          void logout()
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-(--text-primary) transition-colors hover:bg-(--accent-soft)"
      >
        <LogOut size={15} aria-hidden="true" />
        Sign out
      </button>
    </div>
  )
}

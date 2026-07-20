import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Bell, Menu, Search, X } from 'lucide-react'
import { Navigation } from '@/components/layout/Navigation'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { DiscordProfileCard, ProfileSkeleton } from '@/components/profile/DiscordProfileCard'
import { SignedOutProfile } from '@/components/profile/SignedOutProfile'
import { useAuth } from '@/hooks/useAuth'
import { transitionFast } from '@/components/motion/variants'

const headerIconButton =
  'flex h-12 w-12 items-center justify-center rounded-2xl border border-(--header-border) bg-(--header-surface) text-(--text-on-dark) transition-colors hover:border-(--accent) hover:bg-(--accent)/20'

function ProfileSlot() {
  const { isLoading, isAuthenticated } = useAuth()
  if (isLoading) return <ProfileSkeleton />
  return isAuthenticated ? <DiscordProfileCard /> : <SignedOutProfile />
}

/** Full-width navy portal header: brand, section navigation, actions, profile. */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b border-(--header-border) px-4 py-3 transition-colors sm:px-6 lg:px-8"
      style={{ background: 'var(--header-background)' }}
    >
      <div className="mx-auto flex max-w-[1560px] items-center gap-3">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-[70px] items-center justify-center rounded-xl bg-(--accent) text-[26px] font-black italic tracking-tight text-white">
            UHS
          </span>
          <span className="hidden text-[13px] font-bold uppercase leading-[1.3] tracking-wide text-(--text-on-dark) sm:block">
            Unmatched
            <br />
            Ambulance Service
          </span>
        </div>

        {/* Section navigation (desktop) */}
        <div className="mx-auto hidden xl:block">
          <Navigation />
        </div>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-3 xl:ml-0">
          <button aria-label="Search" className={`${headerIconButton} hidden md:flex`}>
            <Search size={19} strokeWidth={1.8} />
          </button>
          <button aria-label="Notifications" className={`${headerIconButton} hidden md:flex`}>
            <Bell size={19} strokeWidth={1.8} />
          </button>
          <ThemeToggle />
          <ProfileSlot />
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="uhs-mobile-nav"
            className={`${headerIconButton} xl:hidden`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="uhs-mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitionFast}
            className="mx-auto mt-3 max-w-[1560px] rounded-2xl border border-(--header-border) bg-(--glass-surface) p-2 xl:hidden"
          >
            <Navigation orientation="vertical" onItemSelect={() => setMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

import { Search, Sun, Moon, Bell } from 'lucide-react'
import { useTheme } from '@/context/theme-context'
import { Breadcrumbs } from './Breadcrumbs'
import { motion } from 'motion/react'
import { transitionFast } from '@/components/motion/variants'

export function TopBar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-(--border-subtle) bg-(--bg-surface-glass) px-4 backdrop-blur-xl lg:px-6">
      <Breadcrumbs />

      <button
        onClick={onOpenSearch}
        className="ml-auto flex w-full max-w-xs items-center gap-2 rounded-(--radius-control) border border-(--border-subtle) bg-(--bg-canvas) px-3 py-1.5 text-sm text-(--text-faint) transition-colors hover:border-(--color-nhs-blue-light) sm:max-w-sm"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Search the handbook…</span>
        <span className="ml-auto hidden items-center gap-0.5 rounded-md border border-(--border-subtle) px-1.5 py-0.5 text-xs sm:flex">
          ⌘K
        </span>
      </button>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.95 }}
        transition={transitionFast}
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-control) text-(--text-muted) hover:bg-(--color-nhs-blue-50) hover:text-(--text-primary)"
      >
        {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
      </motion.button>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.95 }}
        transition={transitionFast}
        aria-label="Notifications"
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-control) text-(--text-muted) hover:bg-(--color-nhs-blue-50) hover:text-(--text-primary)"
      >
        <Bell size={17} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-(--color-accent-pink)" />
      </motion.button>
    </header>
  )
}

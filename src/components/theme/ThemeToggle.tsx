import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

/**
 * Header light/dark switch. Shows the theme you would switch TO (sun while
 * dark, moon while light). "System" remains available from the profile menu.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-(--header-border) bg-(--header-surface) text-(--text-on-dark) transition-colors hover:border-(--accent) hover:bg-(--accent)/20"
    >
      {theme === 'dark' ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
    </button>
  )
}

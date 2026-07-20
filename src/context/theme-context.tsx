import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  THEME_STORAGE_KEY,
  readStoredPreference,
  resolveTheme,
  systemTheme,
  type ResolvedTheme,
  type ThemePreference,
} from '@/lib/theme'

interface ThemeContextValue {
  /** The theme actually in effect right now. */
  theme: ResolvedTheme
  /** What the user chose: an explicit theme or "follow the operating system". */
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
  /** Flips to the explicit opposite of the current resolved theme. */
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStoredPreference)
  const [osTheme, setOsTheme] = useState<ResolvedTheme>(systemTheme)

  // Track the operating-system theme while "system" is selected.
  useEffect(() => {
    if (preference !== 'system') return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setOsTheme(query.matches ? 'dark' : 'light')
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [preference])

  const theme = preference === 'system' ? osTheme : preference

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, preference)
  }, [theme, preference])

  function setPreference(next: ThemePreference) {
    setPreferenceState(next)
  }

  function toggleTheme() {
    setPreferenceState(resolveTheme(preference) === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

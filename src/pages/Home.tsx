import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/home/HeroSection'
import { FooterInfoBar } from '@/components/layout/FooterInfoBar'

const AUTH_NOTICES: Record<string, string> = {
  denied: 'Discord sign-in was cancelled. You have not been signed in.',
  failed: 'Discord sign-in could not be completed. Please try again.',
}

/** Reads the ?auth= flag set by the OAuth callback, then cleans the URL. */
function useAuthNotice() {
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const flag = params.get('auth')
    if (!flag) return
    setNotice(AUTH_NOTICES[flag] ?? null)
    params.delete('auth')
    const query = params.toString()
    window.history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : ''))
  }, [])

  return [notice, () => setNotice(null)] as const
}

/**
 * UHS Medical Portal homepage — crest-based brand layout, fully themed
 * (light / dark / system) via the .portal token scope. First milestone:
 * section navigation is visual only; the portal sections come later.
 */
export default function Home() {
  const [authNotice, dismissNotice] = useAuthNotice()

  return (
    <div className="portal flex min-h-svh flex-col bg-(--page-background) text-(--text-primary) transition-colors duration-300">
      <Header />
      {authNotice && (
        <div
          role="status"
          className="flex items-center justify-center gap-3 border-b border-(--border) bg-(--accent-soft) px-4 py-2.5 text-sm text-(--text-primary)"
        >
          {authNotice}
          <button
            onClick={dismissNotice}
            aria-label="Dismiss message"
            className="rounded-md p-1 transition-colors hover:bg-(--accent)/15"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}
      <main className="flex flex-1 flex-col">
        <HeroSection />
      </main>
      <FooterInfoBar />
    </div>
  )
}

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { LOGIN_URL, fetchSession, requestLogout, type AuthUser } from '@/lib/auth'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  /** True until the first session check settles — render a neutral skeleton, never a flash of the wrong state. */
  isLoading: boolean
  login: () => void
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = useCallback(async () => {
    const session = await fetchSession()
    setUser(session.authenticated && session.user ? session.user : null)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void refreshSession()
  }, [refreshSession])

  function login() {
    window.location.assign(LOGIN_URL)
  }

  const logout = useCallback(async () => {
    await requestLogout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, isLoading, login, logout, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

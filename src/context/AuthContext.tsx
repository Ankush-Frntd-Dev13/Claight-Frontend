import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { api, ApiError } from '../api/client'

interface User {
  id?: string
  email?: string
  name?: string
  first_name?: string
  last_name?: string
  [key: string]: unknown
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated via HTTP-only cookie
  // verify-token returns 204 when valid, 401 when invalid
  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get<any>('admin/verify-token')
      console.log('verify-token response:', res)
      console.log('localStorage user:', localStorage.getItem('user'))

      // Restore user from localStorage, or from the response if available
      const stored = localStorage.getItem('user')
      const userData = res?.data?.user || res?.user || res?.data || (stored ? JSON.parse(stored) : null)

      if (userData) {
        setUser(userData)
        // Keep localStorage in sync
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        // Token is valid (no error thrown) but no user data anywhere
        // Set a minimal authenticated flag so we don't redirect to login
        setUser({ id: '', email: '', name: '' })
      }
    } catch (err) {
      console.log('verify-token failed:', err)
      // 401 or any error = not authenticated
      localStorage.removeItem('user')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string) => {
    // Server sets HTTP-only cookie on successful login
    const res = await api.post<any>('admin/login', { email, password })
    console.log('Login response:', res)
    // Handle both { data: { user } } and { user } response shapes
    const loggedInUser = res?.data?.user || res?.user || res?.data || res
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  const logout = async () => {
    try {
      // Server clears the HTTP-only cookie
      await api.post('/auth/logout')
    } catch {
      // logout even if the API call fails
    }
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

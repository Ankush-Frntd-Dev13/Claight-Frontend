import { useState } from 'react'
import { LogOut, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?'

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-border"
    >
      {/* Left - spacer for mobile hamburger */}
      <div className="flex items-center gap-3">
        <div className="w-10 md:hidden" />
      </div>

      {/* Right - User actions */}
      <div className="relative flex items-center gap-3">
        <a
          href="https://www.procurementresource.com/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium !text-text-secondary hover:!text-primary-500 transition-colors"
        >
          <Mail size={16} />
          <span className="hidden sm:inline">Contact Us</span>
        </a>

        <div className="w-px h-6 bg-border" />

        <div
          className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          {initials}
        </div>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-12 z-50 w-56 bg-white rounded-xl border border-border shadow-lg py-2">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium text-text-primary truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header

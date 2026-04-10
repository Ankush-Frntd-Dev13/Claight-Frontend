import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutGrid,
  Globe,
  BarChart3,
  Compass,
  Database,
  TrendingUp,
  Leaf,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
  iconColor: string
  hasChevron?: boolean
  cardId?: string
}

const mainNavItems: NavItem[] = [
  { id: 'intelligence', label: 'Dashboard', path: '/intelligence', icon: <LayoutGrid size={18} />, iconColor: 'text-primary-500', hasChevron: true },
  { id: 'procure360', label: 'Procure 360', path: '/intelligence', icon: <Globe size={18} />, iconColor: 'text-blue-500', cardId: 'card-procure360' },
  { id: 'cost-models', label: 'Digital Cost Model', path: '/intelligence', icon: <BarChart3 size={18} />, iconColor: 'text-teal-500', cardId: 'card-cost-models' },
  { id: 'sourcing-compass', label: 'Sourcing Compass', path: '/intelligence', icon: <Compass size={18} />, iconColor: 'text-amber-500', cardId: 'card-sourcing-compass' },
  { id: 'price-database', label: 'Price Database', path: '/intelligence', icon: <Database size={18} />, iconColor: 'text-indigo-500', cardId: 'card-price-database' },
  { id: 'inflation-forecasting', label: 'Commodity Intelligence', path: '/intelligence', icon: <TrendingUp size={18} />, iconColor: 'text-orange-500', cardId: 'card-inflation-forecasting' },
  { id: 'sustainability-tracker', label: 'Sustainability Tracker', path: '/intelligence', icon: <Leaf size={18} />, iconColor: 'text-emerald-500', cardId: 'card-sustainability-tracker' },
]

// Card IDs that are on the Intelligence page
const cardIds = new Set(mainNavItems.filter((i) => i.cardId).map((i) => i.id))

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const isActive = (item: NavItem) => {
    if (item.cardId) return false
    return location.pathname === item.path
  }

  const handleClick = (item: NavItem) => {
    if (item.cardId) {
      if (location.pathname !== '/intelligence') {
        navigate('/intelligence')
        setTimeout(() => scrollAndHighlight(item.cardId!), 100)
      } else {
        scrollAndHighlight(item.cardId)
      }
    } else {
      navigate(item.path)
    }
    setMobileOpen(false)
  }

  const scrollAndHighlight = (cardId: string) => {
    const el = document.getElementById(cardId)
    if (!el) return

    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('card-highlight')
    setTimeout(() => {
      el.classList.remove('card-highlight')
    }, 2000)
  }

  const NavButton = ({ item }: { item: NavItem }) => (
    <button
      onClick={() => handleClick(item)}
      title={collapsed ? item.label : undefined}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-150 whitespace-nowrap font-body text-sm font-medium border-l-[3px] ${
        isActive(item)
          ? 'bg-primary-50 text-primary-500 border-l-primary-500'
          : cardIds.has(item.id)
            ? 'text-text-secondary border-l-transparent hover:bg-primary-50/50 hover:text-primary-500'
            : 'text-text-secondary border-l-transparent hover:bg-[#f8f7fa] hover:text-text-primary'
      }`}
    >
      <span className={`min-w-5 ${isActive(item) ? 'text-primary-500' : item.iconColor}`}>
        {item.icon}
      </span>
      <span className={`flex-1 text-left transition-opacity duration-250 ${collapsed && !mobileOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
        {item.label}
      </span>
      {item.hasChevron && (
        <ChevronRight
          size={14}
          className={`text-text-muted transition-opacity duration-250 ${collapsed && !mobileOpen ? 'opacity-0 w-0' : ''}`}
        />
      )}
    </button>
  )

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`flex items-center justify-center pt-6 pb-5 ${collapsed && !mobileOpen ? 'px-3' : 'px-5'}`}>
        <img
          src="https://adminportal-new.procurementresource.com/pr-logo.webp"
          alt="Precision Intel"
          className={`object-contain transition-all duration-250 ${collapsed && !mobileOpen ? 'w-12 h-12' : 'w-52 h-14'}`}
        />
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto">
        {mainNavItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom - Logout */}
      <div className="px-3 py-3 flex flex-col gap-0.5 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          title={collapsed && !mobileOpen ? 'Logout' : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-150 whitespace-nowrap font-body text-sm font-medium border-l-[3px] border-l-transparent text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <span className="min-w-5 text-red-400">
            <LogOut size={18} />
          </span>
          <span className={`flex-1 text-left transition-opacity duration-250 ${collapsed && !mobileOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
            Logout
          </span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center cursor-pointer shadow-sm hover:bg-primary-50 md:hidden"
      >
        <Menu size={20} className="text-text-secondary" />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={`fixed top-7 z-51 w-6 h-6 bg-white border border-border rounded-full hidden md:flex items-center justify-center cursor-pointer shadow-sm hover:bg-primary-50 hover:border-primary-500 group transition-all duration-250 ${
          collapsed ? 'left-17' : 'left-62'
        }`}
      >
        <ChevronLeft
          size={14}
          className={`text-text-secondary group-hover:text-primary-500 transition-transform duration-250 ${
            collapsed ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Desktop sidebar */}
      <aside
        aria-label="Main navigation"
        className={`fixed top-0 left-0 h-screen bg-white border-r border-sidebar-border hidden md:flex flex-col z-50 overflow-hidden transition-all duration-250 ${
          collapsed ? 'w-20' : 'w-65'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="absolute top-0 left-0 h-full w-72 bg-white flex flex-col shadow-2xl animate-slide-in">
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <X size={18} className="text-text-secondary" />
            </button>

            {sidebarContent}
          </aside>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </>
  )
}

export default Sidebar

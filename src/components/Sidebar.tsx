import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutGrid,
  Globe,
  BarChart3,
  Compass,
  Database,
  TrendingDown,
  Leaf,
  MessageSquare,
  Settings,
  LifeBuoy,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
  hasChevron?: boolean
  cardId?: string // ID of the card element to scroll to
}

const mainNavItems: NavItem[] = [
  { id: 'intelligence', label: 'Dashboard', path: '/intelligence', icon: <LayoutGrid size={20} />, hasChevron: true },
  { id: 'procure360', label: 'Procure360', path: '/intelligence', icon: <Globe size={20} />, cardId: 'card-procure360' },
  { id: 'cost-models', label: 'Cost Models', path: '/intelligence', icon: <BarChart3 size={20} />, cardId: 'card-cost-models' },
  { id: 'sourcing-compass', label: 'Sourcing Compass', path: '/intelligence', icon: <Compass size={20} />, cardId: 'card-sourcing-compass' },
  { id: 'price-database', label: 'Price Database', path: '/intelligence', icon: <Database size={20} />, cardId: 'card-price-database' },
  { id: 'inflation-forecasting', label: 'Inflation Forecasting', path: '/intelligence', icon: <TrendingDown size={20} />, cardId: 'card-inflation-forecasting' },
  { id: 'sustainability-tracker', label: 'Sustainability Tracker', path: '/intelligence', icon: <Leaf size={20} />, cardId: 'card-sustainability-tracker' },
]

const bottomNavItems: NavItem[] = [
  { id: 'settings', label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  { id: 'support', label: 'Support', path: '/support', icon: <LifeBuoy size={20} /> },
]

// Card IDs that are on the Intelligence page
const cardIds = new Set(mainNavItems.filter((i) => i.cardId).map((i) => i.id))

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (item: NavItem) => {
    if (item.cardId) return false // card items don't stay "active"
    return location.pathname === item.path
  }

  const handleClick = (item: NavItem) => {
    if (item.cardId) {
      // If not on intelligence page, navigate there first
      if (location.pathname !== '/intelligence') {
        navigate('/intelligence')
        // Wait for page to render then scroll
        setTimeout(() => scrollAndHighlight(item.cardId!), 100)
      } else {
        scrollAndHighlight(item.cardId)
      }
    } else {
      navigate(item.path)
    }
  }

  const scrollAndHighlight = (cardId: string) => {
    const el = document.getElementById(cardId)
    if (!el) return

    el.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Add highlight class
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
      <span className={`min-w-5 ${isActive(item) ? 'text-primary-500' : 'text-text-muted'}`}>
        {item.icon}
      </span>
      <span className={`flex-1 text-left transition-opacity duration-250 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
        {item.label}
      </span>
      {item.hasChevron && (
        <ChevronRight
          size={16}
          className={`text-text-muted transition-opacity duration-250 ${collapsed ? 'opacity-0 w-0' : ''}`}
        />
      )}
    </button>
  )

  return (
    <>
      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={`fixed top-7 z-51 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-primary-50 hover:border-primary-500 group transition-all duration-250 ${
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

      <aside
        aria-label="Main navigation"
        className={`fixed top-0 left-0 h-screen bg-white border-r border-sidebar-border flex flex-col z-50 overflow-hidden transition-all duration-250 ${
          collapsed ? 'w-20' : 'w-65'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center justify-center pt-6 pb-5 ${collapsed ? 'px-3' : 'px-5'}`}>
          <img
            src="https://adminportal-new.procurementresource.com/pr-logo.webp"
            alt="Precision Intel"
            className={`object-contain transition-all duration-250 ${collapsed ? 'w-12 h-12' : 'w-52 h-14'}`}
          />
        </div>

        {/* Main navigation */}
        <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto">
          {mainNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </nav>

        {/* Ask PR Button */}
        <button
          title={collapsed ? 'Ask PR' : undefined}
          className={`flex items-center gap-2.5 mx-3 mb-2 bg-linear-to-br from-accent-start to-accent-end text-white rounded-xl font-body text-sm font-medium cursor-pointer transition-all duration-150 hover:from-primary-500 hover:to-primary-700 hover:-translate-y-0.5 hover:shadow-lg ${
            collapsed ? 'px-2.5 py-2.5 justify-center' : 'px-4 py-2.5'
          }`}
        >
          <MessageSquare size={18} className="min-w-4.5" />
          <span className={`${collapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>Ask PR</span>
        </button>

        {/* Bottom navigation */}
        <div className="px-3 py-3 flex flex-col gap-0.5 border-t border-sidebar-border">
          {bottomNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>
      </aside>

      {/* Mobile overlay */}
      <div className="hidden fixed inset-0 bg-black/40 z-40 md:hidden" />
    </>
  )
}

export default Sidebar

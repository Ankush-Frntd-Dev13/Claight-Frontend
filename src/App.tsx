import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Intelligence from './pages/Intelligence'
import Procurement from './pages/Procurement'
import MarketTrend from './pages/MarketTrend'
import Suppliers from './pages/Suppliers'
import Reports from './pages/Reports'
import SettingsPage from './pages/SettingsPage'
import Support from './pages/Support'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  // No sidebar/header on login page
  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-surface font-body text-text-primary">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <div
          className={`flex flex-1 flex-col transition-all duration-250 ml-0 ${
            sidebarCollapsed ? 'md:ml-20' : 'md:ml-65'
          }`}
        >
          <Header />

          <main role="main" className="flex-1 p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/intelligence" replace />} />
              <Route path="/intelligence" element={<Intelligence />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/market-trend" element={<MarketTrend />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/support" element={<Support />} />
              <Route path="/procure360" element={<div className="p-6 font-body text-text-muted">Procure360 — Coming soon</div>} />
              <Route path="/cost-models" element={<div className="p-6 font-body text-text-muted">Cost Models — Coming soon</div>} />
              <Route path="/sourcing-compass" element={<div className="p-6 font-body text-text-muted">Sourcing Compass — Coming soon</div>} />
              <Route path="/price-database" element={<div className="p-6 font-body text-text-muted">Price Database — Coming soon</div>} />
              <Route path="/inflation-forecasting" element={<div className="p-6 font-body text-text-muted">Inflation Forecasting — Coming soon</div>} />
              <Route path="/sustainability-tracker" element={<div className="p-6 font-body text-text-muted">Sustainability Tracker — Coming soon</div>} />
            </Routes>
          </main>

          <footer role="contentinfo" />
        </div>
      </div>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  )
}

export default App

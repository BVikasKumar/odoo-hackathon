import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard, Building2, Package, ArrowRightLeft, Calendar,
  Wrench, ClipboardCheck, BarChart3, Bell, Settings, LogOut, Menu
} from 'lucide-react'
import { useState } from 'react'

const Layout = () => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
    { name: 'Organization Setup', href: '/organization-setup', icon: Building2, roles: ['admin', 'asset_manager'] },
    { name: 'Assets', href: '/assets', icon: Package, roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
    { name: 'Allocation & Transfer', href: '/allocation-transfer', icon: ArrowRightLeft, roles: ['admin', 'asset_manager', 'department_head'] },
    { name: 'Bookings', href: '/bookings', icon: Calendar, roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench, roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
    { name: 'Audit', href: '/audit', icon: ClipboardCheck, roles: ['admin', 'asset_manager'] },
    { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['admin', 'asset_manager'] },
    { name: 'Notifications', href: '/notifications', icon: Bell, roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 ml-4">AssetFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:static'}`}>
          <div className="h-full flex flex-col py-6">
            <nav className="px-4 space-y-1 flex-1">
              {navigation
                .filter(item => item.roles.includes(user?.role))
                .map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-3 text-base font-medium rounded-lg ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </NavLink>
                ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
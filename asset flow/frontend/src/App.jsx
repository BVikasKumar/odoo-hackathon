import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Assets from './pages/Assets'
import Bookings from './pages/Bookings'
import UsersPage from './pages/Users'
import SettingsPage from './pages/Settings'
import OrganizationSetup from './pages/OrganizationSetup'
import AllocationTransfer from './pages/AllocationTransfer'
import Maintenance from './pages/Maintenance'
import Audit from './pages/Audit'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="organization-setup" element={<OrganizationSetup />} />
            <Route path="assets" element={<Assets />} />
            <Route path="allocation-transfer" element={<AllocationTransfer />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="audit" element={<Audit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
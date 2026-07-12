import { useAuth } from '../contexts/AuthContext'
import { Settings } from 'lucide-react'

const SettingsPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Settings className="h-8 w-8 text-gray-400 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
            <p className="text-gray-500">Manage your account preferences</p>
          </div>
        </div>
        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={user?.name}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
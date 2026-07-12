import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Users, Plus, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'

const UsersPage = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Implement users fetch when backend endpoint exists
    setLoading(false)
  }, [])

  const canEdit = user?.role === 'admin' || user?.role === 'asset_manager'

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        {canEdit && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            Add User
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Users table will go here */}
        </div>
      )}
    </div>
  )
}

export default UsersPage
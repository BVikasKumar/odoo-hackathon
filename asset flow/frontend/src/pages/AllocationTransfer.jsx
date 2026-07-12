import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ArrowRightLeft, Plus, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

const AllocationTransfer = () => {
  const { user } = useAuth()
  const [allocations, setAllocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/allocations/')
        setAllocations(res.data)
      } catch (err) {
        console.error('Failed to fetch allocations:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAllocations()
  }, [])

  const canManage = user?.role === 'admin' || user?.role === 'asset_manager'

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Allocation & Transfer</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          New Allocation
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {allocations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <ArrowRightLeft className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No allocations found</p>
            </div>
          ) : (
            allocations.map((allocation) => (
              <div key={allocation.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Allocation #{allocation.id}</h3>
                    <p className="text-sm text-gray-500">Status: {allocation.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${allocation.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {allocation.status}
                    </span>
                    {canManage && (
                      <>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Asset ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{allocation.asset_id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">User ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{allocation.user_id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Allocated Date:</span>
                    <span className="ml-2 font-medium text-gray-900">{new Date(allocation.allocated_date).toLocaleDateString()}</span>
                  </div>
                  {allocation.return_date && (
                    <div>
                      <span className="text-gray-500">Return Date:</span>
                      <span className="ml-2 font-medium text-gray-900">{new Date(allocation.return_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default AllocationTransfer
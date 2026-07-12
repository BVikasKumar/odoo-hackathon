import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Wrench, Plus } from 'lucide-react'
import axios from 'axios'

const Maintenance = () => {
  const { user } = useAuth()
  const [maintenances, setMaintenances] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/maintenances/')
        setMaintenances(res.data)
      } catch (err) {
        console.error('Failed to fetch maintenances:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMaintenances()
  }, [])

  const columns = ['Pending', 'Approved', 'Technician assigned', 'in progress', 'Resolved']

  const getStatusColumn = (status) => {
    const normalizedStatus = status?.toLowerCase() || 'pending'
    if (normalizedStatus.includes('pending')) return 0
    if (normalizedStatus.includes('approved')) return 1
    if (normalizedStatus.includes('technician') || normalizedStatus.includes('assigned')) return 2
    if (normalizedStatus.includes('in progress') || normalizedStatus.includes('progress')) return 3
    if (normalizedStatus.includes('resolved')) return 4
    return 0
  }

  const getMaintenancesByStatus = () => {
    const grouped = Array(5).fill(null).map(() => [])
    maintenances.forEach(m => {
      grouped[getStatusColumn(m.status)].push(m)
    })
    return grouped
  }

  const groupedMaintenances = getMaintenancesByStatus()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          New Maintenance
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-w-max">
            {columns.map((colName, colIndex) => (
              <div key={colName} className="flex flex-col gap-3">
                <div className="bg-white shadow rounded-lg p-3 text-center font-semibold text-gray-800">
                  {colName}
                </div>
                {groupedMaintenances[colIndex].map((m) => (
                  <div key={m.id} className={`bg-white shadow rounded-lg p-4 border-l-4 ${
                    colIndex === 0 ? 'border-yellow-500' :
                    colIndex === 1 ? 'border-blue-500' :
                    colIndex === 2 ? 'border-purple-500' :
                    colIndex === 3 ? 'border-orange-500' :
                    'border-green-500'
                  }`}>
                    <h3 className="font-semibold text-gray-900 mb-2">AF-{String(m.id).padStart(4, '0')}</h3>
                    <p className="text-sm text-gray-700 mb-3">{m.title}</p>
                    <div className="text-xs text-gray-500">
                      Priority: <span className="font-medium">{m.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Maintenance
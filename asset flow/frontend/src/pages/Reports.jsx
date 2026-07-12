import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BarChart3, LineChart, Download } from 'lucide-react'
import axios from 'axios'

const Reports = () => {
  const { user } = useAuth()
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/assets/')
        setAssets(res.data)
      } catch (err) {
        console.error('Failed to fetch assets:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAssets()
  }, [])

  const availableCount = assets.filter(a => a.status === 'Available').length
  const allocatedCount = assets.filter(a => a.status === 'Allocated').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <LineChart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Assets</p>
                <p className="text-2xl font-bold text-gray-900">{availableCount}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Allocated Assets</p>
                <p className="text-2xl font-bold text-gray-900">{allocatedCount}</p>
              </div>
            </div>
          </div>

          {/* Asset List for Reports */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Asset List</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.tag_info}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{asset.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        asset.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
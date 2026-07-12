import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Package, Users, Calendar, AlertTriangle } from 'lucide-react'
import axios from 'axios'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ totalAssets: 0, availableAssets: 0, totalBookings: 0, activeUsers: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsRes = await axios.get('http://localhost:8000/api/assets/')
        setStats(prev => ({
          ...prev,
          totalAssets: assetsRes.data.length,
          availableAssets: assetsRes.data.filter(a => a.status === 'Available').length
        }))
      } catch (err) {
        console.error('Failed to fetch data', err)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { name: 'Total Assets', value: stats.totalAssets, icon: Package, color: 'bg-blue-500' },
    { name: 'Available Assets', value: stats.availableAssets, icon: Package, color: 'bg-green-500' },
    { name: 'Active Bookings', value: stats.totalBookings, icon: Calendar, color: 'bg-purple-500' },
    { name: 'Active Users', value: stats.activeUsers, icon: Users, color: 'bg-yellow-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${card.color} p-3 rounded-full`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{card.name}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">You are logged in as a <span className="font-medium">{user?.role}</span>.</p>
      </div>
    </div>
  )
}

export default Dashboard

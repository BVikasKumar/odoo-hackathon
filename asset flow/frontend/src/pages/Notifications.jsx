import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Bell, CheckCircle2, Trash2 } from 'lucide-react'

const Notifications = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New asset added to inventory', type: 'info', read: false, time: '5 min ago' },
    { id: 2, title: 'Maintenance request approved', type: 'success', read: false, time: '1 hour ago' },
    { id: 3, title: 'Asset allocated to John Doe', type: 'info', read: true, time: '2 hours ago' },
    { id: 4, title: 'Audit scheduled for tomorrow', type: 'warning', read: true, time: '1 day ago' },
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-gray-400" />
          <span className="text-sm text-gray-500">
            {notifications.filter(n => !n.read).length} unread
          </span>
        </div>
      </div>

      <div className="grid gap-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className={`bg-white rounded-lg shadow p-4 flex items-start justify-between border-l-4 ${
              notif.read ? 'border-gray-300' :
              notif.type === 'success' ? 'border-green-500' :
              notif.type === 'warning' ? 'border-yellow-500' :
              'border-blue-500'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-full ${
                  notif.read ? 'bg-gray-100' :
                  notif.type === 'success' ? 'bg-green-100' :
                  notif.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className={`font-medium ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {notif.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications
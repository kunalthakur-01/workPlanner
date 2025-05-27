"use client"

import { useState } from "react"
import { BellIcon } from "./Icons"

function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false)

  // For demo purposes, we'll create some notifications
  const notifications = [
    {
      id: "1",
      message: "New task assigned: Update dashboard UI",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "2",
      message: "Task approved: Create user documentation",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "3",
      message: "Project deadline approaching: Marketing Website",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return `${diffDays}d ago`
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <BellIcon className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Notifications</h4>
                <button className="text-xs text-blue-600 hover:text-blue-800">Mark all as read</button>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg text-sm ${notification.read ? "bg-gray-50" : "bg-gray-100"}`}
                    >
                      <div className="font-medium">{notification.message}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t">
                <button className="w-full text-xs text-center text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationPanel

"use client"

import { useContext, useState } from "react"
import { AppContext } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function NotificationPanel() {
  const { appData } = useContext(AppContext)
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Notifications</h4>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
              Mark all as read
            </Button>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg text-sm ${notification.read ? "bg-muted/50" : "bg-muted"}`}
                >
                  <div className="font-medium">{notification.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{formatTime(notification.timestamp)}</div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

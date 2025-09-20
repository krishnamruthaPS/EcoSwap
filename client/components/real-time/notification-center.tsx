"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, ArrowRightLeft, MessageCircle, Award, TrendingUp } from "lucide-react"

interface Notification {
  id: string
  type: "swap" | "message" | "achievement" | "system"
  title: string
  description: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "swap",
      title: "New Swap Request",
      description: "Sarah Chen wants to swap her vintage camera for your kitchen appliances",
      timestamp: "2 minutes ago",
      read: false,
      actionUrl: "/marketplace/swap/123",
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      description: "Mike Johnson: 'Is the garden tool set still available?'",
      timestamp: "5 minutes ago",
      read: false,
      actionUrl: "/messages/456",
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked!",
      description: "You've earned the 'Eco Warrior' badge for completing 100+ swaps",
      timestamp: "1 hour ago",
      read: true,
      actionUrl: "/profile/achievements",
    },
    {
      id: "4",
      type: "system",
      title: "Impact Milestone",
      description: "Congratulations! You've saved 100kg of CO₂ this year",
      timestamp: "3 hours ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "swap":
        return ArrowRightLeft
      case "message":
        return MessageCircle
      case "achievement":
        return Award
      case "system":
        return TrendingUp
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "swap":
        return "text-blue-600"
      case "message":
        return "text-green-600"
      case "achievement":
        return "text-purple-600"
      case "system":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative p-2">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type)
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${getNotificationColor(notification.type)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

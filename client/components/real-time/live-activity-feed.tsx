"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, MessageCircle, Award, TrendingUp, Users, Leaf } from "lucide-react"

interface Activity {
  id: string
  type: "swap" | "message" | "achievement" | "join" | "impact"
  user: {
    name: string
    avatar?: string
  }
  action: string
  details: string
  timestamp: string
  impact?: string
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "swap",
      user: { name: "Sarah Chen", avatar: "/diverse-woman-portrait.png" },
      action: "completed a swap",
      details: "Vintage camera ↔ Kitchen appliances",
      timestamp: "2 minutes ago",
      impact: "3.2kg CO₂ saved",
    },
    {
      id: "2",
      type: "achievement",
      user: { name: "Mike Johnson", avatar: "/thoughtful-man.png" },
      action: "earned an achievement",
      details: "Eco Warrior badge for 100+ swaps",
      timestamp: "5 minutes ago",
    },
    {
      id: "3",
      type: "join",
      user: { name: "Emma Davis" },
      action: "joined EcoSwap",
      details: "Welcome to the community!",
      timestamp: "8 minutes ago",
    },
    {
      id: "4",
      type: "impact",
      user: { name: "Alex Rodriguez" },
      action: "reached a milestone",
      details: "50kg CO₂ saved this year",
      timestamp: "12 minutes ago",
      impact: "50kg CO₂ total",
    },
    {
      id: "5",
      type: "swap",
      user: { name: "Lisa Wang" },
      action: "listed new items",
      details: "3 electronics items available for swap",
      timestamp: "15 minutes ago",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: ["swap", "achievement", "join", "impact"][Math.floor(Math.random() * 4)] as Activity["type"],
        user: {
          name: ["John Doe", "Jane Smith", "Bob Wilson", "Alice Brown"][Math.floor(Math.random() * 4)],
        },
        action: "completed a swap",
        details: "New activity happening now",
        timestamp: "Just now",
        impact: Math.random() > 0.5 ? `${(Math.random() * 5 + 1).toFixed(1)}kg CO₂ saved` : undefined,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 30000) // Add new activity every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "swap":
        return ArrowRightLeft
      case "message":
        return MessageCircle
      case "achievement":
        return Award
      case "join":
        return Users
      case "impact":
        return Leaf
      default:
        return TrendingUp
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "swap":
        return "text-blue-600"
      case "message":
        return "text-green-600"
      case "achievement":
        return "text-purple-600"
      case "join":
        return "text-orange-600"
      case "impact":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Live Community Activity
          <Badge className="ml-2 bg-green-100 text-green-800">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user.name}</span> {activity.action}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    {activity.impact && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {activity.impact}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

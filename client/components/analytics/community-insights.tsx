"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Heart, Star, TrendingUp } from "lucide-react"

interface CommunityInsightsProps {
  timeRange: string
  detailed?: boolean
}

export function CommunityInsights({ timeRange, detailed = false }: CommunityInsightsProps) {
  const communityStats = [
    { label: "Network Size", value: "247", change: "+12", icon: Users },
    { label: "Messages Sent", value: "89", change: "+23", icon: MessageCircle },
    { label: "Likes Received", value: "156", change: "+34", icon: Heart },
    { label: "Community Rating", value: "4.8", change: "+0.2", icon: Star },
  ]

  const topConnections = [
    { name: "Sarah Chen", swaps: 12, rating: 4.9, avatar: "/diverse-woman-portrait.png" },
    { name: "Mike Johnson", swaps: 8, rating: 4.8, avatar: "/thoughtful-man.png" },
    { name: "Emma Davis", swaps: 6, rating: 4.9, avatar: "/diverse-woman-portrait.png" },
    { name: "Alex Rodriguez", swaps: 5, rating: 4.7, avatar: "/thoughtful-man.png" },
  ]

  const achievements = [
    { title: "Eco Warrior", description: "Completed 100+ swaps", earned: true },
    { title: "Community Builder", description: "Helped 50+ members", earned: true },
    { title: "Green Pioneer", description: "Early platform adopter", earned: true },
    { title: "Sustainability Champion", description: "Top 10% impact score", earned: false },
  ]

  return (
    <Card className={detailed ? "col-span-full" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-600" />
          Community Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <stat.icon className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Connections */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Top Swap Partners</h3>
          <div className="space-y-3">
            {topConnections.slice(0, detailed ? topConnections.length : 3).map((connection, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {connection.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{connection.name}</p>
                    <p className="text-sm text-gray-600">{connection.swaps} swaps together</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium text-gray-900">{connection.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {detailed && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          achievement.earned ? "bg-purple-200" : "bg-gray-200"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${achievement.earned ? "text-purple-600" : "text-gray-400"}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${achievement.earned ? "text-purple-900" : "text-gray-500"}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <Badge variant={achievement.earned ? "default" : "secondary"}>
                      {achievement.earned ? "Earned" : "Locked"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Engagement */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4">Engagement Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Response Rate</span>
                  <span className="font-medium text-green-900">96%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Avg. Response Time</span>
                  <span className="font-medium text-green-900">2.4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Community Helpfulness</span>
                  <span className="font-medium text-green-900">4.8/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Active Days</span>
                  <span className="font-medium text-green-900">23/30</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

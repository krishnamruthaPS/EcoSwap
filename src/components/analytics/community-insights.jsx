import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Users, MessageCircle, Heart, Star, TrendingUp } from "lucide-react"

export function CommunityInsights({ timeRange, detailed = false }) {
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
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Connections */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Top Connections</h3>
          <div className="space-y-4">
            {topConnections.map((connection, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={connection.avatar} alt={connection.name} />
                    <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="font-medium">{connection.name}</div>
                    <div className="text-sm text-gray-500">{connection.swaps} swaps</div>
                  </div>
                </div>
                <Badge variant="secondary">{connection.rating} ★</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.earned ? "bg-purple-50 border-purple-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm text-gray-600">{achievement.description}</div>
                <Badge
                  variant={achievement.earned ? "default" : "secondary"}
                  className="mt-2"
                >
                  {achievement.earned ? "Earned" : "In Progress"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, Heart, MessageSquare, ArrowRightLeft } from "lucide-react"

export function SellerAnalytics() {
  const stats = [
    {
      title: "Total Views",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Total Likes",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: Heart,
    },
    {
      title: "Messages Received",
      value: "45",
      change: "-3%",
      trend: "down",
      icon: MessageSquare,
    },
    {
      title: "Swap Proposals",
      value: "23",
      change: "+15%",
      trend: "up",
      icon: ArrowRightLeft,
    },
  ]

  const topPerformingItems = [
    {
      title: "MacBook Pro 2019",
      views: 45,
      likes: 12,
      proposals: 5,
      category: "Electronics",
    },
    {
      title: "Vintage Leather Armchair",
      views: 24,
      likes: 8,
      proposals: 2,
      category: "Furniture",
    },
    {
      title: "Designer Winter Coat",
      views: 18,
      likes: 5,
      proposals: 1,
      category: "Clothing",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                    <span className="text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingItems.map((item, index) => (
              <div key={item.title} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowRightLeft className="h-3 w-3" />
                    {item.proposals}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Electronics</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Furniture</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Clothing</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">33%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>New swap proposal for MacBook Pro</span>
                <span className="text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Someone liked your armchair</span>
                <span className="text-muted-foreground ml-auto">4h ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>New message about winter coat</span>
                <span className="text-muted-foreground ml-auto">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

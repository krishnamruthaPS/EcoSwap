"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, TrendingUp } from "lucide-react"

interface SwapAnalyticsProps {
  timeRange: string
  detailed?: boolean
}

export function SwapAnalytics({ timeRange, detailed = false }: SwapAnalyticsProps) {
  const swapStats = [
    { label: "Total Swaps", value: "156", change: "+8", color: "blue" },
    { label: "Success Rate", value: "94%", change: "+2%", color: "green" },
    { label: "Avg. Response Time", value: "2.4h", change: "-0.3h", color: "purple" },
    { label: "Active Listings", value: "12", change: "+3", color: "orange" },
  ]

  const recentSwaps = [
    {
      item: "Vintage Camera",
      partner: "Sarah M.",
      status: "completed",
      date: "2 hours ago",
      impact: "3.2kg CO₂",
    },
    {
      item: "Kitchen Appliance Set",
      partner: "Mike J.",
      status: "pending",
      date: "5 hours ago",
      impact: "5.8kg CO₂",
    },
    {
      item: "Garden Tools",
      partner: "Emma D.",
      status: "completed",
      date: "1 day ago",
      impact: "2.1kg CO₂",
    },
    {
      item: "Books Collection",
      partner: "Alex R.",
      status: "in-progress",
      date: "2 days ago",
      impact: "1.4kg CO₂",
    },
  ]

  const categories = [
    { name: "Electronics", count: 45, percentage: 29 },
    { name: "Home & Garden", count: 38, percentage: 24 },
    { name: "Clothing", count: 32, percentage: 21 },
    { name: "Books & Media", count: 25, percentage: 16 },
    { name: "Sports & Outdoors", count: 16, percentage: 10 },
  ]

  return (
    <Card className={detailed ? "col-span-full" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowRightLeft className="w-5 h-5 mr-2 text-blue-600" />
          Swap Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {swapStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Recent Swap Activity</h3>
          <div className="space-y-3">
            {recentSwaps.slice(0, detailed ? recentSwaps.length : 3).map((swap, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{swap.item}</p>
                    <p className="text-sm text-gray-600">with {swap.partner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      swap.status === "completed" ? "default" : swap.status === "pending" ? "secondary" : "outline"
                    }
                    className="mb-1"
                  >
                    {swap.status}
                  </Badge>
                  <p className="text-xs text-gray-500">{swap.date}</p>
                  <p className="text-xs text-green-600">{swap.impact} saved</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {detailed && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Swap Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-blue-700">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-blue-600">{category.count}</span>
                      <div className="w-16 bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4">Performance Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Best Performing Category</span>
                  <span className="font-medium text-green-900">Electronics</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Fastest Swap Time</span>
                  <span className="font-medium text-green-900">45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Most Active Day</span>
                  <span className="font-medium text-green-900">Saturday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Completion Rate</span>
                  <span className="font-medium text-green-900">94%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

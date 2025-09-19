"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplets, Recycle, TreePine, TrendingUp } from "lucide-react"

interface ImpactMetricsProps {
  timeRange: string
  detailed?: boolean
}

export function ImpactMetrics({ timeRange, detailed = false }: ImpactMetricsProps) {
  const metrics = [
    {
      title: "Carbon Footprint Reduction",
      value: "89.4kg CO₂",
      change: "+15.2kg",
      progress: 74,
      icon: Leaf,
      color: "green",
      description: "Equivalent to planting 4 trees",
    },
    {
      title: "Water Conservation",
      value: "2,847L",
      change: "+456L",
      progress: 68,
      icon: Droplets,
      color: "blue",
      description: "Saved through reduced manufacturing",
    },
    {
      title: "Waste Diverted",
      value: "156 items",
      change: "+23 items",
      progress: 82,
      icon: Recycle,
      color: "purple",
      description: "Prevented from reaching landfills",
    },
    {
      title: "Resource Efficiency",
      value: "94%",
      change: "+3%",
      progress: 94,
      icon: TreePine,
      color: "emerald",
      description: "Optimal resource utilization score",
    },
  ]

  return (
    <Card className={detailed ? "col-span-full" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-green-600" />
          Environmental Impact Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-6 ${detailed ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-${metric.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                    <metric.icon className={`w-4 h-4 text-${metric.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{metric.title}</p>
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
                <Progress value={metric.progress} className="h-2" />
                <p className="text-xs text-gray-500">{metric.progress}% of monthly goal</p>
              </div>
            </div>
          ))}
        </div>

        {detailed && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4">Monthly Impact Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Electronics</span>
                  <span className="font-medium text-green-900">34.2kg CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Clothing</span>
                  <span className="font-medium text-green-900">28.7kg CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Home & Garden</span>
                  <span className="font-medium text-green-900">26.5kg CO₂</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Impact Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">vs. Average User</span>
                  <span className="font-medium text-green-600">+23% better</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">vs. Last Month</span>
                  <span className="font-medium text-green-600">+15% improvement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Global Ranking</span>
                  <span className="font-medium text-purple-600">Top 12%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

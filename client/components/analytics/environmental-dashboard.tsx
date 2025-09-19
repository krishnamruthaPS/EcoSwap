"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Globe, TreePine, Droplets, Zap, TrendingUp } from "lucide-react"

interface EnvironmentalDashboardProps {
  timeRange: string
}

export function EnvironmentalDashboard({ timeRange }: EnvironmentalDashboardProps) {
  const environmentalGoals = [
    {
      title: "Carbon Neutrality",
      current: 89.4,
      target: 120,
      unit: "kg CO₂",
      progress: 74,
      icon: Globe,
      color: "green",
    },
    {
      title: "Tree Equivalent",
      current: 4.2,
      target: 6,
      unit: "trees",
      progress: 70,
      icon: TreePine,
      color: "emerald",
    },
    {
      title: "Water Conservation",
      current: 2847,
      target: 4000,
      unit: "liters",
      progress: 71,
      icon: Droplets,
      color: "blue",
    },
    {
      title: "Energy Savings",
      current: 156,
      target: 200,
      unit: "kWh",
      progress: 78,
      icon: Zap,
      color: "yellow",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="w-5 h-5 mr-2 text-green-600" />
          Environmental Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {environmentalGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-${goal.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                    <goal.icon className={`w-4 h-4 text-${goal.color}-600`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{goal.title}</p>
                    <p className="text-sm text-gray-600">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{goal.progress}%</p>
                  <div className="flex items-center text-green-600 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    On track
                  </div>
                </div>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Monthly Impact Summary</h4>
          <p className="text-sm text-green-700">
            Your sustainable swapping activities this month have prevented{" "}
            <span className="font-semibold">89.4kg of CO₂</span> from entering the atmosphere, equivalent to the carbon
            absorption of <span className="font-semibold">4 trees</span> over a year.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

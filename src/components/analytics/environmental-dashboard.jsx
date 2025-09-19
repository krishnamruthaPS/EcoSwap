import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Globe, TreePine, Droplets, Zap, TrendingUp } from "lucide-react"

export function EnvironmentalDashboard({ timeRange }) {
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
          Environmental Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {environmentalGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg bg-${goal.color}-100 flex items-center justify-center mr-3`}>
                    <goal.icon className={`w-4 h-4 text-${goal.color}-600`} />
                  </div>
                  <div>
                    <div className="font-medium">{goal.title}</div>
                    <div className="text-sm text-gray-500">
                      {goal.current} of {goal.target} {goal.unit}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-green-500 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{goal.progress}%
                </div>
              </div>
              <Progress value={goal.progress} className={`h-2 bg-${goal.color}-100`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
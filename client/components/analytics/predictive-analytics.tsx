"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Target, Lightbulb, Calendar, ArrowRight } from "lucide-react"

interface PredictiveAnalyticsProps {
  timeRange: string
}

export function PredictiveAnalytics({ timeRange }: PredictiveAnalyticsProps) {
  const predictions = [
    {
      title: "Impact Forecast",
      description: "Based on your current activity, you're projected to save 180kg CO₂ by year-end",
      confidence: 87,
      trend: "positive",
      action: "Maintain current pace",
    },
    {
      title: "Optimal Swap Times",
      description: "Saturday afternoons show 40% higher response rates for your listings",
      confidence: 92,
      trend: "insight",
      action: "Schedule listings accordingly",
    },
    {
      title: "Category Recommendation",
      description: "Electronics swaps could increase your impact by 25% based on local demand",
      confidence: 78,
      trend: "opportunity",
      action: "Focus on electronics",
    },
    {
      title: "Community Growth",
      description: "Your network is likely to grow by 15-20 new connections this month",
      confidence: 83,
      trend: "positive",
      action: "Engage with newcomers",
    },
  ]

  const recommendations = [
    {
      title: "List Kitchen Appliances",
      reason: "High demand in your area (85% match rate)",
      impact: "+12kg CO₂ potential",
      priority: "high",
    },
    {
      title: "Join Electronics Challenge",
      reason: "Aligns with your swap history and goals",
      impact: "+8 community points",
      priority: "medium",
    },
    {
      title: "Connect with Local Partners",
      reason: "3 verified businesses near you",
      impact: "Exclusive swap opportunities",
      priority: "low",
    },
  ]

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "positive":
        return "text-green-600"
      case "insight":
        return "text-blue-600"
      case "opportunity":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "positive":
        return TrendingUp
      case "insight":
        return Lightbulb
      case "opportunity":
        return Target
      default:
        return Calendar
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            AI-Powered Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => {
              const TrendIcon = getTrendIcon(prediction.trend)
              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <TrendIcon className={`w-4 h-4 ${getTrendColor(prediction.trend)}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900">{prediction.title}</h3>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{prediction.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    {prediction.action}
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      rec.priority === "high"
                        ? "bg-red-500"
                        : rec.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-600">{rec.reason}</p>
                    <p className="text-xs text-green-600 font-medium">{rec.impact}</p>
                  </div>
                </div>
                <Button size="sm">Take Action</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Projected Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50">
              <div>
                <p className="font-medium text-green-900">100 Swaps Milestone</p>
                <p className="text-sm text-green-700">Expected in 3 weeks</p>
              </div>
              <Badge className="bg-green-600">On Track</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
              <div>
                <p className="font-medium text-blue-900">Carbon Neutral Goal</p>
                <p className="text-sm text-blue-700">Expected in 2 months</p>
              </div>
              <Badge variant="secondary">Projected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-purple-500 bg-purple-50">
              <div>
                <p className="font-medium text-purple-900">Community Leader Status</p>
                <p className="text-sm text-purple-700">Expected in 4 months</p>
              </div>
              <Badge variant="outline">Stretch Goal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

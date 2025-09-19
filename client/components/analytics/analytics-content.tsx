"use client"

import { useState, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, ArrowRightLeft, Leaf, Target, Download, Filter, Award } from "lucide-react"
import { ImpactMetrics } from "./impact-metrics"
import { SwapAnalytics } from "./swap-analytics"
import { CommunityInsights } from "./community-insights"
import { EnvironmentalDashboard } from "./environmental-dashboard"
import { PredictiveAnalytics } from "./predictive-analytics"
import { useSearchParams } from "next/navigation"

export function AnalyticsContent() {
  return (
    <Suspense fallback={<div>Loading analytics...</div>}>
      <AnalyticsContentInner />
    </Suspense>
  )
}

function AnalyticsContentInner() {
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")
  const searchParams = useSearchParams()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your environmental impact and community engagement</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Impact Score</p>
                <p className="text-3xl font-bold text-primary">847</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Items Swapped</p>
                <p className="text-3xl font-bold text-blue-600">156</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8 this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CO₂ Saved</p>
                <p className="text-3xl font-bold text-primary">89.4kg</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.2kg this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Community Rank</p>
                <p className="text-3xl font-bold text-purple-600">#47</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12 positions</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
          <TabsTrigger value="swaps">Swap Analytics</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImpactMetrics timeRange={timeRange} />
            <SwapAnalytics timeRange={timeRange} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CommunityInsights timeRange={timeRange} />
            <EnvironmentalDashboard timeRange={timeRange} />
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <ImpactMetrics timeRange={timeRange} detailed />
        </TabsContent>

        <TabsContent value="swaps">
          <SwapAnalytics timeRange={timeRange} detailed />
        </TabsContent>

        <TabsContent value="community">
          <CommunityInsights timeRange={timeRange} detailed />
        </TabsContent>

        <TabsContent value="predictions">
          <PredictiveAnalytics timeRange={timeRange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

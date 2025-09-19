"use client"

import { Suspense, lazy } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Package, Leaf, Star, MessageSquare, Calendar, Target } from "lucide-react"

// Lazy load charts
const Charts = lazy(() => import("./partner-dashboard-charts"))

function AnalyticsTab() {
  const monthlyData = [
    { month: "Jan", customers: 245, swaps: 89, impact: 156 },
    { month: "Feb", customers: 289, swaps: 112, impact: 198 },
    { month: "Mar", customers: 334, swaps: 145, impact: 267 },
    { month: "Apr", customers: 378, swaps: 167, impact: 298 },
    { month: "May", customers: 423, swaps: 189, impact: 334 },
    { month: "Jun", customers: 467, swaps: 234, impact: 389 },
  ]

  const programData = [
    { name: "Reusable Cups", value: 45, color: "#22C55E" },
    { name: "Container Exchange", value: 30, color: "#84CC16" },
    { name: "Bulk Refills", value: 25, color: "#92400E" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense 
              fallback={
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              }
            >
              <Charts data={{ monthlyData, programData }} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      {/* Goals Progress section remains the same */}
    </div>
  )
}

export default function PartnerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">Partner Dashboard</h2>
          <p className="text-muted-foreground">GreenCycle Coffee - Premium Partner</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            Verified
          </Badge>
          <Badge variant="secondary">Premium</Badge>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Metrics cards remain the same */}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <AnalyticsTab />
          </Suspense>
        </TabsContent>

        {/* Other tab contents remain the same */}
      </Tabs>
    </div>
  )
}
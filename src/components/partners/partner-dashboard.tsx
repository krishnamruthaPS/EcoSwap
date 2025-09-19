"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Package, Leaf, Star, MessageSquare, Calendar, Target } from "lucide-react"

export function PartnerDashboard() {
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
      {/* Header */}
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Customers</p>
                <p className="text-2xl font-bold text-primary">467</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Items Swapped</p>
                <p className="text-2xl font-bold text-secondary">234</p>
                <p className="text-xs text-green-600">+28% from last month</p>
              </div>
              <Package className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Environmental Impact</p>
                <p className="text-2xl font-bold text-accent">389</p>
                <p className="text-xs text-green-600">CO₂ lbs saved</p>
              </div>
              <Leaf className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
                <p className="text-2xl font-bold text-primary">4.8</p>
                <p className="text-xs text-muted-foreground">127 reviews</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="customers" stroke="#22C55E" strokeWidth={2} />
                    <Line type="monotone" dataKey="swaps" stroke="#84CC16" strokeWidth={2} />
                    <Line type="monotone" dataKey="impact" stroke="#92400E" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Program Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Program Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={programData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {programData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Goals Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Sustainability Goals Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Waste Reduction Goal</span>
                  <span>389 / 500 lbs CO₂</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Customer Engagement Target</span>
                  <span>467 / 400 customers</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Reusable Container Program</span>
                  <span>234 / 300 swaps</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Marketing Campaigns</h3>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Summer Reusable Cup Drive</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  20% discount for customers bringing reusable cups during June-August
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Campaign Progress</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Participants</p>
                    <p className="font-semibold">234</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cups Saved</p>
                    <p className="font-semibold">1,247</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Earth Day Special</CardTitle>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Free coffee for customers who brought containers for bulk coffee beans
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Participants</p>
                    <p className="font-semibold">89</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Impact</p>
                    <p className="font-semibold">156 lbs CO₂</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Customer Messages</h4>
                      <p className="text-sm text-muted-foreground">3 new messages from EcoSwap members</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Recent Reviews</h4>
                      <p className="text-sm text-muted-foreground">5 new reviews this week (avg 4.9 stars)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Reviews
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Loyalty Program</h4>
                      <p className="text-sm text-muted-foreground">89 active members, 23 new this month</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Program
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Business Profile</h4>
                    <p className="text-sm text-muted-foreground">Update your business information and photos</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Sustainability Programs</h4>
                    <p className="text-sm text-muted-foreground">Manage your environmental initiatives</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Update Programs
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Notification Preferences</h4>
                    <p className="text-sm text-muted-foreground">Control email and platform notifications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Notifications
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Partnership Plan</h4>
                    <p className="text-sm text-muted-foreground">Currently on Premium Plan ($49/month)</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

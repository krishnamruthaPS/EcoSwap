"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemScanner } from "./item-scanner"
import { SellerListings } from "./seller-listings"
import { SellerAnalytics } from "./seller-analytics"
import { Camera, Package, BarChart3, Plus, Scan } from "lucide-react"

export function SellerDashboard() {
  const [showScanner, setShowScanner] = useState(false)
  const [activeListings, setActiveListings] = useState(12)
  const [pendingSwaps, setPendingSwaps] = useState(5)
  const [completedSwaps, setCompletedSwaps] = useState(23)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)]">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your items and track your swapping activity</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowScanner(true)} className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Scan Item
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Manually
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeListings}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Swaps</CardTitle>
            <Scan className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSwaps}</div>
            <p className="text-xs text-muted-foreground">3 new proposals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Swaps</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSwaps}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="listings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="proposals">
            Swap Proposals
            <Badge variant="secondary" className="ml-2">
              {pendingSwaps}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-6">
          <SellerListings />
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Swap proposals for your items will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SellerAnalytics />
        </TabsContent>
      </Tabs>

      {/* Item Scanner Modal */}
      {showScanner && <ItemScanner onClose={() => setShowScanner(false)} />}
    </div>
  )
}

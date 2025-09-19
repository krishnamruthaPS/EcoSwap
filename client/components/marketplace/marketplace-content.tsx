"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceFilters } from "./marketplace-filters"
import { ItemGrid } from "./item-grid"
import { AIClassificationDemo } from "./ai-classification-demo"
import { SwapProposals } from "./swap-proposals"
import { Search, Grid3X3, List, Camera, Sparkles, MessageSquare } from "lucide-react"

export function MarketplaceContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAIDemo, setShowAIDemo] = useState(false)
  const [showSwapProposals, setShowSwapProposals] = useState(false)

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items, categories, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowAIDemo(true)} className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            AI Classify
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* AI Suggestions Banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Recommendations Ready</h3>
                <p className="text-sm text-muted-foreground">
                  We found 12 perfect matches based on your preferences and swap history
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Matches
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <MarketplaceFilters />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browse">Browse Items</TabsTrigger>
              <TabsTrigger value="proposals" onClick={() => setShowSwapProposals(true)}>
                Swap Proposals
                <Badge variant="secondary" className="ml-2">
                  3
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="messages">
                Messages
                <Badge variant="secondary" className="ml-2">
                  5
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              <ItemGrid viewMode={viewMode} searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="proposals" className="space-y-6">
              <SwapProposals />
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your recent conversations with other swappers will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Classification Demo Modal */}
      {showAIDemo && <AIClassificationDemo onClose={() => setShowAIDemo(false)} />}
    </div>
  )
}

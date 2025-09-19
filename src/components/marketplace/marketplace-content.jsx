import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { MarketplaceFilters } from "./marketplace-filters"
import { ItemGrid } from "./item-grid"
import { AIClassificationDemo } from "./ai-classification-demo"
import { SwapProposals } from "./swap-proposals"
import { Search, Grid3X3, List, Camera, Sparkles, MessageSquare } from "lucide-react"

export function MarketplaceContent() {
  const [viewMode, setViewMode] = useState("grid")
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketplaceFilters />
          </CardContent>
        </Card>

        {/* Item Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <Badge variant="secondary">All Items</Badge>
              <Badge variant="secondary">5 mile radius</Badge>
            </div>
            <Button variant="outline" onClick={() => setShowSwapProposals(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Swap Proposals
            </Button>
          </div>
          <ItemGrid viewMode={viewMode} searchQuery={searchQuery} />
        </div>
      </div>

      {/* AI Classification Demo Dialog */}
      {showAIDemo && (
        <AIClassificationDemo open={showAIDemo} onClose={() => setShowAIDemo(false)} />
      )}

      {/* Swap Proposals Dialog */}
      {showSwapProposals && (
        <SwapProposals open={showSwapProposals} onClose={() => setShowSwapProposals(false)} />
      )}
    </div>
  )
}
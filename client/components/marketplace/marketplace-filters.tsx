"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Filter, X } from "lucide-react"

export function MarketplaceFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [distanceRange, setDistanceRange] = useState([10])
  const [activeFilters, setActiveFilters] = useState(0)

  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Sports Equipment",
    "Kitchen Items",
    "Garden Tools",
    "Toys & Games",
    "Art Supplies",
    "Home Decor",
  ]

  const conditions = ["Like New", "Good", "Fair", "Needs Repair"]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedConditions([])
    setDistanceRange([10])
    setActiveFilters(0)
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters > 0 && <Badge variant="secondary">{activeFilters}</Badge>}
          </CardTitle>
          {activeFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Distance: {distanceRange[0]} miles</span>
            </div>
            <Slider
              value={distanceRange}
              onValueChange={setDistanceRange}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-medium">Categories</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Condition */}
        <div className="space-y-3">
          <h4 className="font-medium">Condition</h4>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => toggleCondition(condition)}
                />
                <label
                  htmlFor={condition}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* AI Matching */}
        <div className="space-y-3">
          <h4 className="font-medium">AI Preferences</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ai-match" defaultChecked />
              <label htmlFor="ai-match" className="text-sm font-medium cursor-pointer">
                Show AI matches only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="high-compatibility" />
              <label htmlFor="high-compatibility" className="text-sm font-medium cursor-pointer">
                High compatibility (80%+)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="recent-activity" />
              <label htmlFor="recent-activity" className="text-sm font-medium cursor-pointer">
                Recently active users
              </label>
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => setActiveFilters(selectedCategories.length + selectedConditions.length)}
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}

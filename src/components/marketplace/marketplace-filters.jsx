import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { MapPin, Filter, X } from "lucide-react"

export function MarketplaceFilters() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedConditions, setSelectedConditions] = useState([])
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

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedConditions([])
    setDistanceRange([10])
    setActiveFilters(0)
  }

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {(selectedCategories.length > 0 ||
        selectedConditions.length > 0 ||
        distanceRange[0] !== 10) && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Active Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="rounded-full"
                onClick={() => toggleCategory(category)}
              >
                {category}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {selectedConditions.map((condition) => (
              <Badge
                key={condition}
                variant="secondary"
                className="rounded-full"
                onClick={() => toggleCondition(condition)}
              >
                {condition}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {distanceRange[0] !== 10 && (
              <Badge variant="secondary" className="rounded-full">
                Within {distanceRange[0]} miles
                <X
                  className="w-3 h-3 ml-1"
                  onClick={() => setDistanceRange([10])}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Conditions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Condition</h3>
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
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {condition}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Distance Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Distance</h3>
          <span className="text-sm text-gray-500">Within {distanceRange[0]} miles</span>
        </div>
        <Slider
          value={distanceRange}
          onValueChange={setDistanceRange}
          max={50}
          step={1}
        />
      </div>
    </div>
  )
}
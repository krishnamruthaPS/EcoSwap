"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { MapPin, Filter, Navigation, Star, Package, Recycle, Leaf } from "lucide-react"

export function PartnersMap() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searchLocation, setSearchLocation] = useState("")

  const mapFilters = [
    { id: "reusable-packaging", label: "Reusable Packaging", icon: Package, count: 23 },
    { id: "bulk-refill", label: "Bulk & Refill", icon: Recycle, count: 18 },
    { id: "repair-upcycle", label: "Repair & Upcycle", icon: Leaf, count: 15 },
    { id: "composting", label: "Composting", icon: Leaf, count: 12 },
    { id: "verified-only", label: "Verified Partners", icon: Star, count: 45 },
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map Filters */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Map Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter address or zip code"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>

          <Separator />

          {/* Program Type Filters */}
          <div className="space-y-3">
            <h4 className="font-medium">Program Types</h4>
            <div className="space-y-2">
              {mapFilters.map((filter) => (
                <div key={filter.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => toggleFilter(filter.id)}
                    />
                    <label
                      htmlFor={filter.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                    >
                      <filter.icon className="h-3 w-3" />
                      {filter.label}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {filter.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Distance Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Distance</label>
            <div className="space-y-2">
              {["1 mile", "5 miles", "10 miles", "25 miles"].map((distance) => (
                <div key={distance} className="flex items-center space-x-2">
                  <Checkbox id={distance} />
                  <label htmlFor={distance} className="text-sm cursor-pointer">
                    Within {distance}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Partner Locations</CardTitle>
          <p className="text-sm text-muted-foreground">
            Interactive map showing {selectedFilters.length > 0 ? "filtered" : "all"} partner locations
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-muted/30 rounded-lg flex items-center justify-center">
            {/* Placeholder for interactive map */}
            <div className="text-center space-y-4">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="font-semibold text-lg">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Map integration would show partner locations with clustering and detailed popups
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Reusable Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>Bulk & Refill</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Repair & Upcycle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <span>Composting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedFilters.length === 0 ? "68" : "23"} partners shown</Badge>
              {selectedFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedFilters([])}>
                  Clear filters
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                List View
              </Button>
              <Button variant="outline" size="sm">
                Satellite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

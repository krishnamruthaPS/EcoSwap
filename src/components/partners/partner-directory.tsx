"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Star, Package, Recycle, Leaf, ExternalLink, Heart, MessageSquare } from "lucide-react"

export function PartnerDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const partners = [
    {
      id: "1",
      name: "GreenCycle Coffee",
      category: "Food & Beverage",
      type: "Reusable Packaging",
      description: "Sustainable coffee shop offering reusable cup programs and zero-waste initiatives.",
      location: "Brooklyn, NY",
      distance: "2.1 miles",
      rating: 4.8,
      reviews: 127,
      verified: true,
      logo: "/green-coffee-logo.png",
      coverImage: "/sustainable-coffee-shop.png",
      offers: [
        { title: "20% off with reusable cup", type: "discount" },
        { title: "Cup deposit program", type: "program" },
        { title: "Bulk coffee bean swaps", type: "swap" },
      ],
      programs: ["Reusable Cups", "Compost Program", "Local Sourcing"],
      impact: {
        cupsReused: 2847,
        wasteReduced: "1.2 tons",
        co2Saved: "340 lbs",
      },
    },
    {
      id: "2",
      name: "EcoMart Grocery",
      category: "Retail",
      type: "Bulk & Refill",
      description: "Zero-waste grocery store with bulk bins, refill stations, and container exchange program.",
      location: "Manhattan, NY",
      distance: "3.8 miles",
      rating: 4.6,
      reviews: 89,
      verified: true,
      logo: "/eco-grocery-logo.png",
      coverImage: "/zero-waste-grocery.png",
      offers: [
        { title: "Container exchange program", type: "program" },
        { title: "15% off bulk purchases", type: "discount" },
        { title: "Refill station access", type: "service" },
      ],
      programs: ["Container Exchange", "Bulk Refills", "Produce Bags"],
      impact: {
        containersReused: 1523,
        wasteReduced: "2.8 tons",
        co2Saved: "520 lbs",
      },
    },
    {
      id: "3",
      name: "Repair Café Brooklyn",
      category: "Services",
      type: "Repair & Upcycle",
      description: "Community repair space for electronics, clothing, and household items.",
      location: "Brooklyn, NY",
      distance: "1.5 miles",
      rating: 4.9,
      reviews: 203,
      verified: true,
      logo: "/repair-cafe-logo.png",
      coverImage: "/community-repair-space.png",
      offers: [
        { title: "Free repair workshops", type: "service" },
        { title: "Tool lending library", type: "program" },
        { title: "Upcycling materials swap", type: "swap" },
      ],
      programs: ["Electronics Repair", "Textile Mending", "Tool Library"],
      impact: {
        itemsRepaired: 892,
        wasteReduced: "3.1 tons",
        co2Saved: "780 lbs",
      },
    },
    {
      id: "4",
      name: "Urban Farm Supply",
      category: "Agriculture",
      type: "Composting & Garden",
      description: "Urban farming supplies with compost programs and seed/tool exchanges.",
      location: "Queens, NY",
      distance: "7.2 miles",
      rating: 4.7,
      reviews: 156,
      verified: true,
      logo: "/urban-farm-logo.png",
      coverImage: "/urban-farming-supplies.png",
      offers: [
        { title: "Compost pickup service", type: "service" },
        { title: "Seed library access", type: "program" },
        { title: "Garden tool exchanges", type: "swap" },
      ],
      programs: ["Compost Collection", "Seed Library", "Tool Sharing"],
      impact: {
        compostProcessed: "4.5 tons",
        wasteReduced: "6.2 tons",
        co2Saved: "1.1K lbs",
      },
    },
  ]

  const categories = ["all", "Food & Beverage", "Retail", "Services", "Agriculture"]

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || partner.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search partners, services, or programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === "all" ? "All" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={partner.coverImage || "/placeholder.svg"}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  {partner.verified && <Star className="h-3 w-3 mr-1" />}
                  Verified Partner
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" className="bg-background/80 hover:bg-background">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={partner.logo || "/placeholder.svg"} />
                  <AvatarFallback>{partner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Badge variant="outline">{partner.category}</Badge>
                    <Badge variant="secondary">{partner.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{partner.rating}</span>
                      <span>({partner.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{partner.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{partner.description}</p>

              {/* Programs */}
              <div>
                <h4 className="font-medium text-sm mb-2">Programs & Services</h4>
                <div className="flex flex-wrap gap-1">
                  {partner.programs.map((program, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Offers */}
              <div>
                <h4 className="font-medium text-sm mb-2">Current Offers</h4>
                <div className="space-y-2">
                  {partner.offers.slice(0, 2).map((offer, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {offer.type === "discount" && <Leaf className="h-3 w-3 text-primary" />}
                      {offer.type === "program" && <Package className="h-3 w-3 text-secondary" />}
                      {offer.type === "swap" && <Recycle className="h-3 w-3 text-accent" />}
                      {offer.type === "service" && <Star className="h-3 w-3 text-primary" />}
                      <span>{offer.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Stats */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Environmental Impact</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {partner.impact.cupsReused ||
                        partner.impact.containersReused ||
                        partner.impact.itemsRepaired ||
                        partner.impact.compostProcessed}
                    </div>
                    <div className="text-muted-foreground">
                      {partner.impact.cupsReused
                        ? "Cups Reused"
                        : partner.impact.containersReused
                          ? "Containers"
                          : partner.impact.itemsRepaired
                            ? "Items Fixed"
                            : "Compost"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-secondary">{partner.impact.wasteReduced}</div>
                    <div className="text-muted-foreground">Waste Reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-accent">{partner.impact.co2Saved}</div>
                    <div className="text-muted-foreground">CO₂ Saved</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button size="sm" className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Store
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, MoreHorizontal, Heart, MessageSquare, ArrowRightLeft, Clock, MapPin } from "lucide-react"

export function SellerListings() {
  const [listings, setListings] = useState([
    {
      id: "1",
      title: "Vintage Leather Armchair",
      description: "Beautiful vintage leather armchair in excellent condition. Perfect for reading corner.",
      category: "Furniture",
      condition: "Good",
      estimatedValue: 175,
      images: ["/placeholder-dhvzr.png"],
      status: "active",
      views: 24,
      likes: 8,
      messages: 3,
      swapProposals: 2,
      listedDate: "2 days ago",
      location: "Brooklyn, NY",
    },
    {
      id: "2",
      title: "MacBook Pro 2019",
      description: 'MacBook Pro 13" 2019 model. Some wear on corners but fully functional.',
      category: "Electronics",
      condition: "Fair",
      estimatedValue: 800,
      images: ["/macbook-pro-laptop.png"],
      status: "active",
      views: 45,
      likes: 12,
      messages: 7,
      swapProposals: 5,
      listedDate: "1 week ago",
      location: "Brooklyn, NY",
    },
    {
      id: "3",
      title: "Designer Winter Coat",
      description: "High-end winter coat, size M. Warm and stylish, perfect for cold weather.",
      category: "Clothing",
      condition: "Good",
      estimatedValue: 120,
      images: ["/placeholder-m6xsi.png"],
      status: "pending",
      views: 18,
      likes: 5,
      messages: 2,
      swapProposals: 1,
      listedDate: "3 days ago",
      location: "Brooklyn, NY",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "swapped":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Listings</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative">
                  <img
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <Badge className={`absolute -top-2 -right-2 ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </Badge>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{listing.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{listing.category}</Badge>
                    <Badge variant="secondary">{listing.condition}</Badge>
                    <span className="font-medium">${listing.estimatedValue}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {listing.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {listing.listedDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {listing.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {listing.likes} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {listing.messages} messages
                      </span>
                      <span className="flex items-center gap-1">
                        <ArrowRightLeft className="h-4 w-4" />
                        {listing.swapProposals} proposals
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Proposals
                      </Button>
                      <Button size="sm">Promote</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

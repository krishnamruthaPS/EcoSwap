"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, ArrowRightLeft, MapPin, Clock, Sparkles } from "lucide-react"

interface ItemGridProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

export function ItemGrid({ viewMode, searchQuery }: ItemGridProps) {
  const [likedItems, setLikedItems] = useState<string[]>([])

  const mockItems = [
    {
      id: "1",
      title: "Vintage Leather Armchair",
      description: "Beautiful vintage leather armchair in excellent condition. Perfect for reading corner.",
      category: "Furniture",
      condition: "Good",
      location: "Brooklyn, NY",
      distance: "2.3 miles",
      user: { name: "Sarah M.", avatar: "/diverse-woman-portrait.png" },
      images: ["/placeholder-dhvzr.png"],
      aiMatch: 95,
      timeAgo: "2 hours ago",
      swapPreferences: ["Modern furniture", "Plants", "Books"],
    },
    {
      id: "2",
      title: "MacBook Pro 2019",
      description: 'MacBook Pro 13" 2019 model. Some wear on corners but fully functional.',
      category: "Electronics",
      condition: "Fair",
      location: "Manhattan, NY",
      distance: "4.1 miles",
      user: { name: "Alex K.", avatar: "/thoughtful-man.png" },
      images: ["/macbook-pro-laptop.png"],
      aiMatch: 88,
      timeAgo: "5 hours ago",
      swapPreferences: ["Gaming equipment", "Camera gear", "Art supplies"],
    },
    {
      id: "3",
      title: "Yoga Mat & Blocks Set",
      description: "Complete yoga set with premium mat, blocks, and strap. Barely used.",
      category: "Sports Equipment",
      condition: "Like New",
      location: "Queens, NY",
      distance: "6.8 miles",
      user: { name: "Maya P.", avatar: "/woman-doing-yoga.png" },
      images: ["/placeholder-s5tqr.png"],
      aiMatch: 92,
      timeAgo: "1 day ago",
      swapPreferences: ["Kitchen appliances", "Home decor", "Books"],
    },
    {
      id: "4",
      title: "Designer Winter Coat",
      description: "High-end winter coat, size M. Warm and stylish, perfect for cold weather.",
      category: "Clothing",
      condition: "Good",
      location: "Bronx, NY",
      distance: "8.2 miles",
      user: { name: "Jordan L.", avatar: "/placeholder-60av3.png" },
      images: ["/placeholder-m6xsi.png"],
      aiMatch: 76,
      timeAgo: "3 days ago",
      swapPreferences: ["Summer clothes", "Accessories", "Shoes"],
    },
    {
      id: "5",
      title: "Espresso Machine",
      description: "Semi-automatic espresso machine. Makes excellent coffee, includes grinder.",
      category: "Kitchen Items",
      condition: "Good",
      location: "Staten Island, NY",
      distance: "12.5 miles",
      user: { name: "Coffee Joe", avatar: "/placeholder-jtpf4.png" },
      images: ["/professional-espresso-setup.png"],
      aiMatch: 84,
      timeAgo: "1 week ago",
      swapPreferences: ["Tea accessories", "Kitchen gadgets", "Cookbooks"],
    },
    {
      id: "6",
      title: "Guitar & Amp Bundle",
      description: "Electric guitar with amplifier and cables. Great for beginners or practice.",
      category: "Musical Instruments",
      condition: "Good",
      location: "Brooklyn, NY",
      distance: "3.7 miles",
      user: { name: "Rock Mike", avatar: "/placeholder-8bbg8.png" },
      images: ["/placeholder-y7ehb.png"],
      aiMatch: 91,
      timeAgo: "4 days ago",
      swapPreferences: ["Audio equipment", "Vinyl records", "Music books"],
    },
  ]

  const toggleLike = (itemId: string) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredItems = mockItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  {item.aiMatch >= 85 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {item.aiMatch}%
                    </Badge>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleLike(item.id)}
                      className={likedItems.includes(item.id) ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 ${likedItems.includes(item.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{item.category}</Badge>
                    <Badge variant="secondary">{item.condition}</Badge>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.timeAgo}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{item.user.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm">
                        <ArrowRightLeft className="h-4 w-4 mr-1" />
                        Propose Swap
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={item.images[0] || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {item.aiMatch >= 85 && (
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {item.aiMatch}% Match
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                onClick={() => toggleLike(item.id)}
              >
                <Heart className={`h-4 w-4 ${likedItems.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.condition}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.timeAgo}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{item.user.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

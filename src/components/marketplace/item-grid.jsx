import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Heart, MessageSquare, ArrowRightLeft, MapPin, Clock, Sparkles } from "lucide-react"

export function ItemGrid({ viewMode, searchQuery }) {
  const [likedItems, setLikedItems] = useState([])

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
      category: "Sports & Fitness",
      condition: "Like New",
      location: "Queens, NY",
      distance: "5.8 miles",
      user: { name: "Emma D.", avatar: "/woman-doing-yoga.png" },
      images: ["/placeholder-y7ehb.png"],
      aiMatch: 92,
      timeAgo: "1 day ago",
      swapPreferences: ["Meditation cushions", "Fitness equipment", "Wellness books"],
    },
  ]

  const handleLike = (itemId) => {
    setLikedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredItems = mockItems.filter((item) =>
    searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  )

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-0">
              {/* Item Image */}
              <div className="relative aspect-square">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {item.condition}
                  </Badge>
                  {item.aiMatch && (
                    <Badge variant="secondary" className="bg-purple-500 text-white">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {item.aiMatch}% Match
                    </Badge>
                  )}
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.user.avatar} alt={item.user.name} />
                      <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-500">{item.user.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.timeAgo}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.distance}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLike(item.id)}
                      className={likedItems.includes(item.id) ? "text-red-500" : ""}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowRightLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // List View
  return (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Item Image */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {item.condition}
                  </Badge>
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    {item.aiMatch && (
                      <Badge variant="secondary" className="bg-purple-500 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {item.aiMatch}% Match
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-500">{item.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.user.avatar} alt={item.user.name} />
                      <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-500">{item.user.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.distance}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.timeAgo}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {item.swapPreferences.map((pref, index) => (
                      <Badge key={index} variant="outline">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLike(item.id)}
                      className={likedItems.includes(item.id) ? "text-red-500" : ""}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowRightLeft className="w-4 h-4" />
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
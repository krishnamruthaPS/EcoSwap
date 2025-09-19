"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, BookOpen, Clock, Users, Search, Filter, Star } from "lucide-react"

export function EducationalLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Repair & DIY", "Zero Waste", "Sustainable Living", "Upcycling", "Composting"]

  const content = [
    {
      id: "1",
      title: "Complete Guide to Electronics Repair",
      description: "Learn to fix common electronic devices and extend their lifespan. From smartphones to laptops.",
      type: "video_series",
      duration: "2h 45m",
      category: "Repair & DIY",
      difficulty: "Intermediate",
      instructor: "Tech Repair Pro",
      rating: 4.8,
      students: 1234,
      thumbnail: "/electronics-repair-guide.png",
      lessons: 12,
      featured: true,
    },
    {
      id: "2",
      title: "Zero Waste Kitchen Essentials",
      description: "Transform your kitchen into a zero-waste zone with practical tips and sustainable swaps.",
      type: "article_series",
      duration: "30m read",
      category: "Zero Waste",
      difficulty: "Beginner",
      instructor: "Green Chef Maya",
      rating: 4.9,
      students: 2156,
      thumbnail: "/zero-waste-kitchen.png",
      lessons: 8,
      featured: true,
    },
    {
      id: "3",
      title: "Upcycling Furniture Workshop",
      description: "Turn old furniture into beautiful, functional pieces. Step-by-step video tutorials.",
      type: "workshop",
      duration: "3h 20m",
      category: "Upcycling",
      difficulty: "Advanced",
      instructor: "Furniture Artist Jo",
      rating: 4.7,
      students: 892,
      thumbnail: "/furniture-upcycling.png",
      lessons: 15,
      featured: false,
    },
    {
      id: "4",
      title: "Composting 101: From Scraps to Soil",
      description: "Master the art of composting with this comprehensive guide for beginners.",
      type: "video_course",
      duration: "1h 15m",
      category: "Composting",
      difficulty: "Beginner",
      instructor: "Garden Guru Sam",
      rating: 4.6,
      students: 1567,
      thumbnail: "/composting-basics.png",
      lessons: 6,
      featured: false,
    },
    {
      id: "5",
      title: "Sustainable Fashion: Repair & Restyle",
      description: "Extend your wardrobe's life with mending techniques and creative restyling ideas.",
      type: "tutorial_series",
      duration: "2h 10m",
      category: "Sustainable Living",
      difficulty: "Intermediate",
      instructor: "Fashion Fixer Alex",
      rating: 4.8,
      students: 1089,
      thumbnail: "/sustainable-fashion.png",
      lessons: 10,
      featured: false,
    },
    {
      id: "6",
      title: "DIY Natural Cleaning Products",
      description: "Make effective, eco-friendly cleaning products from simple household ingredients.",
      type: "recipe_guide",
      duration: "45m read",
      category: "Sustainable Living",
      difficulty: "Beginner",
      instructor: "Clean Green Team",
      rating: 4.5,
      students: 2234,
      thumbnail: "/natural-cleaning.png",
      lessons: 5,
      featured: false,
    },
  ]

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredContent = content.filter((item) => item.featured)

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials, guides, and workshops..."
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

      {/* Featured Content */}
      {selectedCategory === "all" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-[family-name:var(--font-poppins)]">Featured Content</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredContent.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                      <Play className="h-5 w-5 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="secondary">{item.difficulty}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {item.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {item.lessons} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">by {item.instructor}</span>
                      <span className="text-sm text-muted-foreground">
                        <Users className="h-3 w-3 inline mr-1" />
                        {item.students.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-[family-name:var(--font-poppins)]">
            {selectedCategory === "all" ? "All Content" : selectedCategory}
          </h2>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button className="bg-white/90 text-black hover:bg-white">
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">by {item.instructor}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

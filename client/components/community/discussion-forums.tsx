"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageCircle, Users, Clock, Pin, TrendingUp, Search, Plus } from "lucide-react"

export function DiscussionForums() {
  const [searchQuery, setSearchQuery] = useState("")

  const forumCategories = [
    {
      id: "general",
      name: "General Discussion",
      description: "Share your sustainability journey and connect with the community",
      topics: 234,
      posts: 1567,
      icon: MessageCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "repair-help",
      name: "Repair & Fix-It Help",
      description: "Get help fixing broken items and share repair knowledge",
      topics: 189,
      posts: 892,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: "swap-stories",
      name: "Swap Success Stories",
      description: "Share your amazing swap experiences and inspire others",
      topics: 156,
      posts: 734,
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  const recentTopics = [
    {
      id: "1",
      title: "Best practices for electronics swapping?",
      category: "General Discussion",
      author: {
        name: "TechSwapper23",
        avatar: "/placeholder.svg",
        level: "Eco Explorer",
      },
      replies: 12,
      views: 234,
      lastActivity: "2 hours ago",
      isPinned: false,
      isHot: true,
    },
    {
      id: "2",
      title: "How to fix a wobbly table leg - step by step guide",
      category: "Repair & Fix-It Help",
      author: {
        name: "HandyHelper",
        avatar: "/placeholder.svg",
        level: "Fix-It Master",
      },
      replies: 8,
      views: 156,
      lastActivity: "4 hours ago",
      isPinned: true,
      isHot: false,
    },
    {
      id: "3",
      title: "Amazing furniture transformation - before/after pics!",
      category: "Swap Success Stories",
      author: {
        name: "UpcycleQueen",
        avatar: "/placeholder.svg",
        level: "Green Guru",
      },
      replies: 23,
      views: 567,
      lastActivity: "6 hours ago",
      isPinned: false,
      isHot: true,
    },
    {
      id: "4",
      title: "Zero waste challenge - week 2 update and tips",
      category: "General Discussion",
      author: {
        name: "ZeroWasteWarrior",
        avatar: "/placeholder.svg",
        level: "Sustainability Advocate",
      },
      replies: 15,
      views: 289,
      lastActivity: "8 hours ago",
      isPinned: false,
      isHot: false,
    },
    {
      id: "5",
      title: "Broken coffee maker - worth repairing or swap?",
      category: "Repair & Fix-It Help",
      author: {
        name: "CoffeeLover42",
        avatar: "/placeholder.svg",
        level: "Eco Champion",
      },
      replies: 7,
      views: 123,
      lastActivity: "12 hours ago",
      isPinned: false,
      isHot: false,
    },
  ]

  const filteredTopics = recentTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Forum Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forumCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{category.topics} topics</span>
                    <span>{category.posts} posts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Topic
        </Button>
      </div>

      {/* Recent Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={topic.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topic.author.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-2">
                    {topic.isPinned && <Pin className="h-4 w-4 text-primary mt-0.5" />}
                    <div className="flex-1">
                      <h4 className="font-semibold hover:text-primary transition-colors">
                        {topic.title}
                        {topic.isHot && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Hot
                          </Badge>
                        )}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>by {topic.author.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {topic.author.level}
                        </Badge>
                        <span>in {topic.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {topic.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {topic.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {topic.lastActivity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

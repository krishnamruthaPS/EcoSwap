"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2, Camera, Trophy, Leaf, ArrowRightLeft, Clock, MapPin } from "lucide-react"

export function SocialFeed() {
  const [newPost, setNewPost] = useState("")
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const posts = [
    {
      id: "1",
      user: {
        name: "Sarah M.",
        avatar: "/diverse-woman-portrait.png",
        level: "Eco Champion",
        badges: ["First Swap", "Green Warrior"],
      },
      content:
        "Just completed my 50th swap! 🌱 Traded my old coffee maker for this amazing French press. The circular economy in action!",
      images: ["/french-press-coffee.png"],
      type: "swap_milestone",
      timestamp: "2 hours ago",
      location: "Brooklyn, NY",
      likes: 23,
      comments: 8,
      shares: 3,
      impact: {
        co2Saved: "12 lbs",
        wasteReduced: "2.3 lbs",
      },
    },
    {
      id: "2",
      user: {
        name: "Alex K.",
        avatar: "/thoughtful-man.png",
        level: "Sustainability Advocate",
        badges: ["Tech Swapper", "Community Helper"],
      },
      content:
        "Hosting a repair café this weekend! Bring your broken electronics and let's fix them together instead of throwing them away. Knowledge sharing is the best kind of swapping! 🔧",
      type: "community_event",
      timestamp: "4 hours ago",
      location: "Manhattan, NY",
      likes: 45,
      comments: 12,
      shares: 8,
      eventDetails: {
        date: "Saturday, June 15",
        time: "10 AM - 4 PM",
        location: "Community Center",
      },
    },
    {
      id: "3",
      user: {
        name: "Maya P.",
        avatar: "/woman-doing-yoga.png",
        level: "Green Guru",
        badges: ["Yoga Master", "Wellness Warrior", "Challenge Winner"],
      },
      content:
        "Completed the 30-day zero waste challenge! 🏆 Here's what I learned: small changes make a huge difference. My favorite discovery was the bulk store downtown - saved so much packaging!",
      images: ["/zero-waste-lifestyle.png"],
      type: "challenge_completion",
      timestamp: "1 day ago",
      location: "Queens, NY",
      likes: 67,
      comments: 15,
      shares: 12,
      challenge: {
        name: "30-Day Zero Waste",
        badge: "Waste Warrior",
        impact: "45 lbs waste avoided",
      },
    },
    {
      id: "4",
      user: {
        name: "Jordan L.",
        avatar: "/placeholder-60av3.png",
        level: "Eco Explorer",
        badges: ["Fashion Forward", "Upcycle Artist"],
      },
      content:
        "Turned my old jeans into a tote bag! 👜 Sometimes the best swaps are the ones you make with yourself. Tutorial in comments for anyone interested!",
      images: ["/upcycled-denim-bag.png"],
      type: "diy_project",
      timestamp: "2 days ago",
      location: "Bronx, NY",
      likes: 34,
      comments: 18,
      shares: 6,
      tutorial: true,
    },
  ]

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="Share your sustainability journey, swap success, or eco-tip..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Share Swap
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    Achievement
                  </Button>
                </div>
                <Button disabled={!newPost.trim()}>Post</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {post.user.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.user.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-foreground">{post.content}</p>

              {/* Post Images */}
              {post.images && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Special Content Based on Post Type */}
              {post.type === "swap_milestone" && post.impact && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    Environmental Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CO₂ Saved:</span>
                      <span className="font-semibold ml-2">{post.impact.co2Saved}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Waste Reduced:</span>
                      <span className="font-semibold ml-2">{post.impact.wasteReduced}</span>
                    </div>
                  </div>
                </div>
              )}

              {post.type === "community_event" && post.eventDetails && (
                <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-secondary mb-2">Event Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Date:</span> {post.eventDetails.date}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span> {post.eventDetails.time}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Location:</span> {post.eventDetails.location}
                    </p>
                  </div>
                  <Button size="sm" className="mt-3">
                    Join Event
                  </Button>
                </div>
              )}

              {post.type === "challenge_completion" && post.challenge && (
                <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Challenge Completed
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Challenge:</span> {post.challenge.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Badge Earned:</span> {post.challenge.badge}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Impact:</span> {post.challenge.impact}
                    </p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={likedPosts.includes(post.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    {post.shares}
                  </Button>
                </div>
                {post.tutorial && <Badge className="bg-primary text-primary-foreground">Tutorial Available</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

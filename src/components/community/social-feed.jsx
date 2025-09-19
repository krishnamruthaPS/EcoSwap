import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Heart, MessageCircle, Share2, Camera, Trophy, Leaf, ArrowRightLeft, Clock, MapPin } from "lucide-react"

export function SocialFeed() {
  const [newPost, setNewPost] = useState("")
  const [likedPosts, setLikedPosts] = useState([])

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
      shares: 15,
    }
  ]

  const handleLike = (postId) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    )
  }

  const getIconForPostType = (type) => {
    switch (type) {
      case "swap_milestone":
        return ArrowRightLeft
      case "impact_achievement":
        return Leaf
      case "community_event":
        return Trophy
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your eco-swapping journey..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-3"
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
                <Button>Post</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.user.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {post.timestamp}
                      {post.location && (
                        <>
                          <MapPin className="w-3 h-3 ml-2" />
                          {post.location}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{post.user.level}</Badge>
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <p>{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 mt-3">
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Post content"
                        className="rounded-lg w-full object-cover"
                      />
                    ))}
                  </div>
                )}
                {post.impact && (
                  <div className="bg-green-50 p-3 rounded-lg flex gap-4 mt-3">
                    <div>
                      <div className="text-sm text-gray-600">CO₂ Saved</div>
                      <div className="font-medium">{post.impact.co2Saved}</div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="text-sm text-gray-600">Waste Reduced</div>
                      <div className="font-medium">{post.impact.wasteReduced}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={likedPosts.includes(post.id) ? "text-red-500" : ""}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  {post.shares}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
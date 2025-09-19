"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRightLeft, Clock, MapPin, MessageSquare, Check, X, Sparkles } from "lucide-react"

export function SwapProposals() {
  const [proposals, setProposals] = useState([
    {
      id: "1",
      status: "pending",
      proposer: {
        name: "Sarah M.",
        avatar: "/diverse-woman-portrait.png",
        rating: 4.8,
      },
      theirItem: {
        title: "Vintage Leather Armchair",
        image: "/placeholder-dhvzr.png",
        category: "Furniture",
        condition: "Good",
      },
      yourItem: {
        title: "Modern Coffee Table",
        image: "/modern-coffee-table.png",
        category: "Furniture",
        condition: "Like New",
      },
      compatibilityScore: 95,
      location: "Brooklyn, NY",
      distance: "2.3 miles",
      timeAgo: "2 hours ago",
      message:
        "Hi! I love your coffee table and think it would be perfect for my living room. My armchair is in great condition and would complement your space beautifully.",
    },
    {
      id: "2",
      status: "pending",
      proposer: {
        name: "Alex K.",
        avatar: "/thoughtful-man.png",
        rating: 4.6,
      },
      theirItem: {
        title: "MacBook Pro 2019",
        image: "/macbook-pro-laptop.png",
        category: "Electronics",
        condition: "Fair",
      },
      yourItem: {
        title: "iPad Pro + Apple Pencil",
        image: "/ipad-pro-apple-pencil.jpg",
        category: "Electronics",
        condition: "Good",
      },
      compatibilityScore: 88,
      location: "Manhattan, NY",
      distance: "4.1 miles",
      timeAgo: "5 hours ago",
      message: "Would you be interested in swapping? I need something more portable for my design work.",
    },
    {
      id: "3",
      status: "pending",
      proposer: {
        name: "Maya P.",
        avatar: "/woman-doing-yoga.png",
        rating: 4.9,
      },
      theirItem: {
        title: "Yoga Mat & Blocks Set",
        image: "/placeholder-s5tqr.png",
        category: "Sports Equipment",
        condition: "Like New",
      },
      yourItem: {
        title: "Resistance Bands Set",
        image: "/resistance-bands-set.png",
        category: "Sports Equipment",
        condition: "Good",
      },
      compatibilityScore: 92,
      location: "Queens, NY",
      distance: "6.8 miles",
      timeAgo: "1 day ago",
      message:
        "Perfect swap! I'm transitioning from yoga to strength training. Your resistance bands look exactly what I need.",
    },
  ])

  const handleProposal = (id, action) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === id ? { ...proposal, status: action === "accept" ? "accepted" : "declined" } : proposal,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">Swap Proposals</h2>
        <Badge variant="secondary">{proposals.filter((p) => p.status === "pending").length} pending</Badge>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={proposal.proposer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{proposal.proposer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{proposal.proposer.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>★ {proposal.proposer.rating}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {proposal.distance}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {proposal.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>

                {proposal.compatibilityScore >= 85 && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {proposal.compatibilityScore}% Match
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Swap Items */}
              <div className="flex items-center gap-4">
                {/* Their Item */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={proposal.theirItem.image || "/placeholder.svg"}
                      alt={proposal.theirItem.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{proposal.theirItem.title}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {proposal.theirItem.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {proposal.theirItem.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-center">They offer</p>
                </div>

                {/* Swap Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Your Item */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                    <img
                      src={proposal.yourItem.image || "/placeholder.svg"}
                      alt={proposal.yourItem.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{proposal.yourItem.title}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {proposal.yourItem.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {proposal.yourItem.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-center">You give</p>
                </div>
              </div>

              {/* Message */}
              {proposal.message && (
                <>
                  <Separator />
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm italic">"{proposal.message}"</p>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>

                {proposal.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleProposal(proposal.id, "decline")}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button size="sm" onClick={() => handleProposal(proposal.id, "accept")}>
                      <Check className="h-4 w-4 mr-1" />
                      Accept Swap
                    </Button>
                  </div>
                )}

                {proposal.status === "accepted" && (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Accepted
                  </Badge>
                )}

                {proposal.status === "declined" && (
                  <Badge variant="secondary">
                    <X className="h-3 w-3 mr-1" />
                    Declined
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
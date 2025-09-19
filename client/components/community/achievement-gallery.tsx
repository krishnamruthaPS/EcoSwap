"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Target, Leaf, Users, Package, Recycle, Award, Lock, CheckCircle } from "lucide-react"

export function AchievementGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const achievements = [
    {
      id: "first-swap",
      title: "First Swap",
      description: "Complete your very first item swap",
      category: "Getting Started",
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      points: 100,
      rarity: "Common",
      earned: true,
      earnedDate: "March 15, 2024",
      progress: 100,
      requirement: "Complete 1 swap",
    },
    {
      id: "swap-master",
      title: "Swap Master",
      description: "Complete 50 successful swaps",
      category: "Swapping",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      points: 500,
      rarity: "Rare",
      earned: true,
      earnedDate: "May 22, 2024",
      progress: 100,
      requirement: "Complete 50 swaps",
    },
    {
      id: "eco-warrior",
      title: "Eco Warrior",
      description: "Save 100 lbs of CO₂ through swapping",
      category: "Environmental Impact",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      points: 750,
      rarity: "Epic",
      earned: true,
      earnedDate: "June 8, 2024",
      progress: 100,
      requirement: "Save 100 lbs CO₂",
    },
    {
      id: "community-helper",
      title: "Community Helper",
      description: "Help 10 community members with repairs or advice",
      category: "Community",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      points: 300,
      rarity: "Uncommon",
      earned: false,
      progress: 70,
      requirement: "Help 10 members",
      currentProgress: "7/10 members helped",
    },
    {
      id: "repair-guru",
      title: "Repair Guru",
      description: "Successfully repair 25 items instead of discarding",
      category: "Repair & Upcycle",
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      points: 600,
      rarity: "Rare",
      earned: false,
      progress: 45,
      requirement: "Repair 25 items",
      currentProgress: "11/25 items repaired",
    },
    {
      id: "challenge-champion",
      title: "Challenge Champion",
      description: "Complete 5 community challenges",
      category: "Challenges",
      icon: Target,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      points: 400,
      rarity: "Uncommon",
      earned: false,
      progress: 80,
      requirement: "Complete 5 challenges",
      currentProgress: "4/5 challenges completed",
    },
    {
      id: "zero-waste-hero",
      title: "Zero Waste Hero",
      description: "Achieve zero waste for 30 consecutive days",
      category: "Environmental Impact",
      icon: Recycle,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      points: 1000,
      rarity: "Legendary",
      earned: false,
      progress: 0,
      requirement: "30 days zero waste",
      locked: true,
      unlockRequirement: "Complete 'Eco Warrior' achievement",
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Make 20 new connections in the community",
      category: "Community",
      icon: Users,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      points: 250,
      rarity: "Common",
      earned: false,
      progress: 35,
      requirement: "Connect with 20 members",
      currentProgress: "7/20 connections made",
    },
  ]

  const categories = [
    "all",
    "Getting Started",
    "Swapping",
    "Environmental Impact",
    "Community",
    "Repair & Upcycle",
    "Challenges",
  ]

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "all" || achievement.category === selectedCategory,
  )

  const earnedAchievements = achievements.filter((a) => a.earned)
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600 bg-gray-100"
      case "Uncommon":
        return "text-blue-600 bg-blue-100"
      case "Rare":
        return "text-purple-600 bg-purple-100"
      case "Epic":
        return "text-orange-600 bg-orange-100"
      case "Legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{earnedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements Earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{totalPoints.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">
              {
                earnedAchievements.filter((a) => a.rarity === "Rare" || a.rarity === "Epic" || a.rarity === "Legendary")
                  .length
              }
            </div>
            <div className="text-sm text-muted-foreground">Rare+ Badges</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize text-xs">
              {category === "all" ? "All" : category.replace(" & ", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`overflow-hidden transition-all duration-300 ${
                achievement.earned
                  ? `${achievement.borderColor} border-2 shadow-md`
                  : achievement.locked
                    ? "opacity-60 border-dashed"
                    : "hover:shadow-md"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 ${achievement.bgColor} rounded-lg flex items-center justify-center relative`}
                  >
                    {achievement.locked ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    )}
                    {achievement.earned && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {achievement.points} pts
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {achievement.locked ? (
                  <div className="text-center py-4">
                    <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{achievement.unlockRequirement}</p>
                  </div>
                ) : achievement.earned ? (
                  <div className="text-center py-2">
                    <div className="text-green-600 font-semibold mb-1">Completed!</div>
                    <div className="text-sm text-muted-foreground">Earned on {achievement.earnedDate}</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} />
                    {achievement.currentProgress && (
                      <p className="text-xs text-muted-foreground text-center">{achievement.currentProgress}</p>
                    )}
                  </div>
                )}

                <div className="text-xs text-muted-foreground text-center border-t pt-2">{achievement.requirement}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Target, Recycle, Package, Clock } from "lucide-react"

export function ChallengesBoard() {
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>(["zero-waste-week"])

  const activeChallenges = [
    {
      id: "zero-waste-week",
      title: "Zero Waste Week",
      description: "Reduce your waste to zero for 7 consecutive days. Track your progress and share tips!",
      duration: "7 days",
      participants: 234,
      reward: "Waste Warrior Badge + 500 EcoPoints",
      difficulty: "Medium",
      category: "Waste Reduction",
      icon: Recycle,
      color: "text-primary",
      bgColor: "bg-primary/10",
      progress: 65,
      daysLeft: 3,
      requirements: [
        "No single-use plastics",
        "Compost all organic waste",
        "Repair instead of replace",
        "Share daily progress",
      ],
    },
    {
      id: "repair-month",
      title: "Repair Month Challenge",
      description: "Fix 5 broken items instead of throwing them away. Document your repairs and help others!",
      duration: "30 days",
      participants: 156,
      reward: "Fix-It Master Badge + 750 EcoPoints",
      difficulty: "Hard",
      category: "Repair & Upcycle",
      icon: Package,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      progress: 0,
      daysLeft: 28,
      requirements: [
        "Repair 5 different items",
        "Document with before/after photos",
        "Share repair tutorials",
        "Help 2 community members",
      ],
    },
    {
      id: "local-swap",
      title: "Local Swap Champion",
      description: "Complete 10 swaps within 5 miles of your location. Support your local community!",
      duration: "14 days",
      participants: 89,
      reward: "Community Hero Badge + 400 EcoPoints",
      difficulty: "Easy",
      category: "Community Building",
      icon: Target,
      color: "text-accent",
      bgColor: "bg-accent/10",
      progress: 0,
      daysLeft: 14,
      requirements: [
        "10 swaps within 5 miles",
        "Rate all swap partners",
        "Refer 2 new members",
        "Share local impact story",
      ],
    },
  ]

  const leaderboard = [
    {
      rank: 1,
      user: { name: "Maya P.", avatar: "/woman-doing-yoga.png" },
      points: 2450,
      badges: 12,
      completedChallenges: 8,
    },
    {
      rank: 2,
      user: { name: "Alex K.", avatar: "/thoughtful-man.png" },
      points: 2180,
      badges: 10,
      completedChallenges: 7,
    },
    {
      rank: 3,
      user: { name: "Sarah M.", avatar: "/diverse-woman-portrait.png" },
      points: 1950,
      badges: 9,
      completedChallenges: 6,
    },
    {
      rank: 4,
      user: { name: "Jordan L.", avatar: "/placeholder-60av3.png" },
      points: 1720,
      badges: 8,
      completedChallenges: 5,
    },
    {
      rank: 5,
      user: { name: "You", avatar: "/placeholder.svg" },
      points: 1450,
      badges: 6,
      completedChallenges: 4,
    },
  ]

  const completedChallenges = [
    {
      id: "earth-day-special",
      title: "Earth Day Special",
      completedDate: "April 22, 2024",
      participants: 567,
      badge: "Earth Guardian",
      impact: "2.3 tons CO₂ saved",
    },
    {
      id: "plastic-free-july",
      title: "Plastic Free July",
      completedDate: "July 31, 2024",
      participants: 423,
      badge: "Plastic Warrior",
      impact: "1.8 tons plastic avoided",
    },
  ]

  const joinChallenge = (challengeId: string) => {
    setJoinedChallenges((prev) => [...prev, challengeId])
  }

  const leaveChallenge = (challengeId: string) => {
    setJoinedChallenges((prev) => prev.filter((id) => id !== challengeId))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${challenge.bgColor} rounded-lg flex items-center justify-center`}>
                      <challenge.icon className={`h-6 w-6 ${challenge.color}`} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant={
                          challenge.difficulty === "Easy"
                            ? "secondary"
                            : challenge.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {challenge.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants} joined</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  </div>

                  {joinedChallenges.includes(challenge.id) && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Requirements:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {challenge.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Reward</h4>
                    <p className="text-xs text-muted-foreground">{challenge.reward}</p>
                  </div>

                  <div className="pt-2">
                    {joinedChallenges.includes(challenge.id) ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => leaveChallenge(challenge.id)}
                        >
                          Leave Challenge
                        </Button>
                        <Button size="sm" className="flex-1">
                          View Progress
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full" onClick={() => joinChallenge(challenge.id)}>
                        Join Challenge
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Community Leaderboard
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Top eco-warriors based on challenge completions and community impact
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      entry.user.name === "You" ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank === 1
                            ? "bg-yellow-500 text-white"
                            : entry.rank === 2
                              ? "bg-gray-400 text-white"
                              : entry.rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {entry.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={entry.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{entry.user.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {entry.completedChallenges} challenges completed
                        </p>
                      </div>
                    </div>

                    <div className="flex-1" />

                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.points.toLocaleString()} pts</div>
                      <div className="text-sm text-muted-foreground">{entry.badges} badges</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="space-y-4">
            {completedChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">Completed on {challenge.completedDate}</p>
                        <p className="text-sm text-muted-foreground">
                          {challenge.participants} participants • {challenge.impact}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{challenge.badge}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

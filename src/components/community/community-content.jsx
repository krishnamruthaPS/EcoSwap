import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { SocialFeed } from "./social-feed"
import { ChallengesBoard } from "./challenges-board"
import { EducationalLibrary } from "./educational-library"
import { DiscussionForums } from "./discussion-forums"
import { AchievementGallery } from "./achievement-gallery"
import { Users, Trophy, BookOpen, MessageCircle, Award } from "lucide-react"

export function CommunityContent() {
  const [activeTab, setActiveTab] = useState("feed")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Social Feed
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Challenges
            <Badge variant="secondary" className="ml-1">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Forums
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <SocialFeed />
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <ChallengesBoard />
        </TabsContent>

        <TabsContent value="learn" className="space-y-6">
          <EducationalLibrary />
        </TabsContent>

        <TabsContent value="forums" className="space-y-6">
          <DiscussionForums />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <AchievementGallery />
        </TabsContent>
      </Tabs>
    </div>
  )
}
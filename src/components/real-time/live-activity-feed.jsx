import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ArrowRightLeft, MessageCircle, Award, TrendingUp, Users, Leaf } from "lucide-react";

export function LiveActivityFeed() {
  const [activities] = useState([
    {
      id: "1",
      type: "swap",
      user: { name: "Sarah Chen", avatar: "/diverse-woman-portrait.png" },
      action: "completed a swap",
      details: "Vintage camera ↔ Kitchen appliances",
      timestamp: "2 minutes ago",
      impact: "3.2kg CO₂ saved",
    },
    {
      id: "2",
      type: "achievement",
      user: { name: "Mike Johnson", avatar: "/thoughtful-man.png" },
      action: "earned an achievement",
      details: "Eco Warrior badge for 100+ swaps",
      timestamp: "5 minutes ago",
    }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50">
              <div className="flex-shrink-0">
                <Avatar>
                  {activity.user.avatar ? (
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  ) : (
                    <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user.name} {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.details}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                  {activity.impact && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-xs text-green-600 flex items-center">
                        <Leaf className="w-3 h-3 mr-1" />
                        {activity.impact}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
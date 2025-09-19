import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, AlertCircle, Settings, Zap, Database, MessageSquare, BarChart3 } from "lucide-react";

export function IntegrationStatus() {
  const [integrations] = useState([
    {
      id: "ai-matching",
      name: "AI Matching Engine",
      description: "Intelligent item matching and recommendations",
      status: "connected",
      enabled: true,
      icon: Zap,
      color: "blue",
      lastSync: "2 minutes ago",
      features: ["Smart recommendations", "Compatibility scoring", "Auto-categorization"],
    },
    {
      id: "database",
      name: "Database Sync",
      description: "Real-time data synchronization",
      status: "connected",
      enabled: true,
      icon: Database,
      color: "green",
      lastSync: "1 minute ago",
      features: ["Auto backup", "Version control", "Data recovery"],
    }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="p-4 rounded-lg border border-gray-200 bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`text-${integration.color}-500`}>
                    <integration.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{integration.name}</h3>
                    <p className="text-xs text-gray-500">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {integration.status === "connected" ? (
                    <div className="flex items-center text-green-600 text-xs">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Connected
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600 text-xs">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Error
                    </div>
                  )}
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {integration.lastSync && (
                <p className="mt-2 text-xs text-gray-500">Last synced: {integration.lastSync}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
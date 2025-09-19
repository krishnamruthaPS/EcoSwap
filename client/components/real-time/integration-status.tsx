"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, AlertCircle, Settings, Zap, Database, MessageSquare, BarChart3 } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  status: "connected" | "disconnected" | "error"
  enabled: boolean
  icon: any
  color: string
  lastSync?: string
  features: string[]
}

export function IntegrationStatus() {
  const [integrations, setIntegrations] = useState<Integration[]>([
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
      lastSync: "Just now",
      features: ["Real-time updates", "Data backup", "Performance optimization"],
    },
    {
      id: "messaging",
      name: "Real-time Messaging",
      description: "Live chat and notifications",
      status: "connected",
      enabled: true,
      icon: MessageSquare,
      color: "purple",
      lastSync: "1 minute ago",
      features: ["Instant messaging", "Push notifications", "File sharing"],
    },
    {
      id: "analytics",
      name: "Analytics Engine",
      description: "Impact tracking and insights",
      status: "error",
      enabled: false,
      icon: BarChart3,
      color: "orange",
      features: ["Impact metrics", "Predictive analytics", "Custom reports"],
    },
  ])

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600"
      case "disconnected":
        return "text-gray-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return CheckCircle
      case "error":
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2 text-gray-600" />
          Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => {
            const StatusIcon = getStatusIcon(integration.status)
            return (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 bg-${integration.color}-100 rounded-lg flex items-center justify-center`}
                    >
                      <integration.icon className={`w-5 h-5 text-${integration.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(integration.status)}`} />
                      <Badge
                        variant={integration.status === "connected" ? "default" : "secondary"}
                        className={
                          integration.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : integration.status === "error"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                      disabled={integration.status === "error"}
                    />
                  </div>
                </div>

                {integration.lastSync && (
                  <p className="text-xs text-gray-500 mb-3">Last sync: {integration.lastSync}</p>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {integration.status === "error" && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      Connection error detected. Please check your configuration and try reconnecting.
                    </p>
                    <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                      Reconnect
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">System Health</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-700">Uptime</p>
              <p className="font-medium text-blue-900">99.9%</p>
            </div>
            <div>
              <p className="text-blue-700">Response Time</p>
              <p className="font-medium text-blue-900">&lt; 100ms</p>
            </div>
            <div>
              <p className="text-blue-700">Active Connections</p>
              <p className="font-medium text-blue-900">1,247</p>
            </div>
            <div>
              <p className="text-blue-700">Data Processed</p>
              <p className="font-medium text-blue-900">2.3TB</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PartnersMap } from "./partners-map"
import { PartnerDirectory } from "./partner-directory"
import { PartnershipApplication } from "./partnership-application"
import { PartnerDashboard } from "./partner-dashboard"
import { Building2, Map, FileText, BarChart3 } from "lucide-react"

export function PartnersContent() {
  const [activeTab, setActiveTab] = useState("directory")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Directory
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="apply" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Become Partner
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Partner Dashboard
            <Badge variant="secondary" className="ml-1">
              Pro
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          <PartnerDirectory />
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <PartnersMap />
        </TabsContent>

        <TabsContent value="apply" className="space-y-6">
          <PartnershipApplication />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <PartnerDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { Suspense, lazy } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Map, FileText, BarChart3 } from "lucide-react"

// Lazy load heavy components
const PartnerDirectory = lazy(() => import("./partner-directory"))
const PartnersMap = lazy(() => import("./partners-map"))
const PartnershipApplication = lazy(() => import("./partnership-application"))
const PartnerDashboard = lazy(() => import("./partner-dashboard"))

// Loading fallbacks
const LoadingFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

export function PartnersContent() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="directory" className="space-y-6">
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
          <Suspense fallback={<LoadingFallback />}>
            <PartnerDirectory />
          </Suspense>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Suspense fallback={<LoadingFallback />}>
            <PartnersMap />
          </Suspense>
        </TabsContent>

        <TabsContent value="apply" className="space-y-6">
          <Suspense fallback={<LoadingFallback />}>
            <PartnershipApplication />
          </Suspense>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <Suspense fallback={<LoadingFallback />}>
            <PartnerDashboard />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
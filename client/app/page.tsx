import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LiveActivityFeed } from "@/components/real-time/live-activity-feed"
import { IntegrationStatus } from "@/components/real-time/integration-status"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        {/* Real-time Features Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LiveActivityFeed />
            <IntegrationStatus />
          </div>
        </section>
      </main>
    </div>
  )
}

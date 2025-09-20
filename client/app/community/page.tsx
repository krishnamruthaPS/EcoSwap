import { Header } from "@/components/header"
import { CommunityContent } from "@/components/community/community-content"

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
            Community Hub
          </h1>
          <p className="text-muted-foreground">Connect with eco-warriors, share your journey, and learn together</p>
        </div>
        <CommunityContent />
      </main>
    </div>
  )
}

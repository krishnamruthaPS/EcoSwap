import { Header } from "@/components/header"
import { MarketplaceContent } from "@/components/marketplace/marketplace-content"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
            AI-Powered Marketplace
          </h1>
          <p className="text-muted-foreground">
            Discover perfect matches for your items using our intelligent recommendation system
          </p>
        </div>
        <MarketplaceContent />
      </main>
    </div>
  )
}

import { Header } from "@/components/header"
import { PartnersContent } from "@/components/partners/partners-content"

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
            Business Partners
          </h1>
          <p className="text-muted-foreground">
            Discover sustainable businesses and join our reusable packaging network
          </p>
        </div>
        <PartnersContent />
      </main>
    </div>
  )
}

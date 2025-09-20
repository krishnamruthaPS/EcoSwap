"use client"

import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightLeft, Leaf, Users, TrendingUp, Play, Shield, Target, Star, UserPlus, LogIn } from "lucide-react"

export function HeroSection() {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      {/* Main Hero Section */}
      <section className="py-12">
        {/* AI-Powered Badge */}
        <div className="flex items-center mb-6">
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <Leaf className="w-4 h-4 mr-2" />
            AI-Powered Sustainability
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight font-[family-name:var(--font-poppins)]">
              Swap Smart, <span className="text-primary">Live Green</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of eco-conscious individuals building a circular economy. Exchange items, reduce waste, and
              create lasting environmental impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Items Swapped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">15K</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">125T</div>
                <div className="text-sm text-muted-foreground">COâ‚‚ Saved</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-8">
              {isAuthenticated ? (
                <Button asChild className="px-6 py-3">
                  <Link href="/marketplace">
                    Start Swapping
                    <ArrowRightLeft className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild className="px-6 py-3">
                  <Link href="/auth/signup">
                    Get Started Free
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" className="px-6 py-3 bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                Community Driven
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-primary" />
                AI Matching
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                Impact Tracking
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-xl p-6">
              <img
                src="people_with_books.png"
                alt="EcoSwap community members exchanging items in a sustainable environment"
                className="w-full h-auto rounded-lg"
              />
              {/* Floating Stats */}
              <div className="absolute top-4 right-4 bg-card rounded-lg shadow-lg p-3">
                <div className="flex items-center text-primary text-sm font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  23 swaps happening now
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-card rounded-lg shadow-lg p-3">
                <div className="text-primary font-semibold">+12kg COâ‚‚</div>
                <div className="text-xs text-muted-foreground">saved today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EcoSwap Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
            Why Choose EcoSwap?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of sustainable exchange with our AI-driven platform designed for the circular economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-muted-foreground">
                Our smart algorithm finds the perfect swap partners based on your preferences and item compatibility.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Impact Tracking</h3>
              <p className="text-sm text-muted-foreground">
                See exactly how much COâ‚‚ you've saved and waste you've diverted from landfills with every swap.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Trusted Community</h3>
              <p className="text-sm text-muted-foreground">
                Join a verified community of eco-conscious individuals committed to sustainable living practices.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Assurance</h3>
              <p className="text-sm text-muted-foreground">
                Our rating system and verification process ensures safe, fair, and high-quality exchanges.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trending Swaps Section */}
      <section className="py-16 bg-muted/30">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
              Trending Swaps
            </h2>
            <p className="text-muted-foreground">Discover what our community is exchanging right now</p>
          </div>
          {isAuthenticated ? (
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                View All Items
                <ArrowRightLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth/signin">
                Sign In to View All
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Marketplace Preview */}
        <div className="bg-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Marketplace</h3>
            <p className="text-sm text-muted-foreground">Discover sustainable items from our community</p>
          </div>

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search items..."
              className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
            />
            <select className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background">
              <option>All Categories</option>
            </select>
            <select className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background">
              <option>All Locations</option>
            </select>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">6 items found</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Onion Shreds", description: "Freshly peeled and shredded onions", image: "/onion-shreds.png" },
              { name: "Plastic Glass", description: "Disposable transparent plastic glasses", image: "/plastic-glass.png" },
              { name: "Spoons", description: "Pack of white plastic spoons", image: "/spoons.png" },
              { name: "Tiles", description: "Assorted broken tiles for reuse", image: "/tiles.png" }
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-muted relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  {isAuthenticated ? (
                    <Button className="w-full">Request Swap</Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/auth/signup">Sign Up to Swap</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Success Stories */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
            Community Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            See how EcoSwap members are making a real environmental impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Chen",
              swaps: "52 swaps",
              co2: "23.4kg COâ‚‚",
              quote:
                "EcoSwap has completely changed how I think about consumption. I've swapped over 50 items and saved so much money while helping the planet!",
            },
            {
              name: "Mike Johnson",
              swaps: "38 swaps",
              co2: "18.7kg COâ‚‚",
              quote:
                "The AI matching is incredible - it suggested perfect swaps I never would have thought of. The community is so welcoming and eco-conscious.",
            },
            {
              name: "Emma Davis",
              swaps: "67 swaps",
              co2: "31.2kg COâ‚‚",
              quote:
                "I love the sustainability tracking features. Seeing my environmental impact grow each month motivates me to swap even more!",
            },
          ].map((story, index) => (
            <Card key={index} className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-muted rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">{story.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"{story.quote}"</p>
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-medium">{story.swaps}</span>
                  <span className="text-primary font-medium">{story.co2}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious individuals building a circular economy. Your first swap is just a few
            clicks away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="px-8 py-3 text-lg" variant="secondary">
              <Link href="/auth/signup">
                Join EcoSwap Free
                <UserPlus className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 text-lg border-background/20 text-background hover:bg-background/10">
              <Link href="/auth/signin">
                Already have an account? Sign In
                <LogIn className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center gap-8 mt-8 text-sm text-muted">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Free to join
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Verified community
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              AI-powered matching
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
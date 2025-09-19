import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRightLeft, Leaf, Users, TrendingUp, Play, Shield, Target, Star } from "lucide-react";

export function HeroSection() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Hero Section */}
      <section className="px-8 py-12">
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Swap Smart, <span className="text-green-600">Live Green</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of eco-conscious individuals building a circular economy. Exchange items, reduce waste, and
              create lasting environmental impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Items Swapped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">15K</div>
                <div className="text-sm text-gray-600">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">125T</div>
                <div className="text-sm text-gray-600">CO₂ Saved</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Swapping
              </Button>
              <Button variant="outline" size="lg" className="flex items-center">
                <Play className="w-4 h-4 mr-2" />
                How it Works
              </Button>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Swaps</h3>
                <p className="text-gray-600">
                  Built-in verification and rating system ensures safe and reliable exchanges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
                <p className="text-gray-600">
                  AI-powered algorithm finds perfect matches for your items.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community First</h3>
                <p className="text-gray-600">
                  Join a growing network of environmentally conscious swappers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Rewards Program</h3>
                <p className="text-gray-600">
                  Earn points and badges for sustainable swapping practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, X, Sparkles, CheckCircle } from "lucide-react"

interface AIClassificationDemoProps {
  onClose: () => void
}

export function AIClassificationDemo({ onClose }: AIClassificationDemoProps) {
  const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload")
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleImageUpload = () => {
    setStep("analyzing")
    // Simulate AI analysis
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStep("results")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const mockResults = {
    category: "Electronics",
    subcategory: "Laptop Computer",
    confidence: 94,
    condition: "Good",
    estimatedValue: "$800-1200",
    suggestedSwaps: [
      { item: "Desktop Computer", match: 92 },
      { item: "Tablet + Accessories", match: 88 },
      { item: "Gaming Console", match: 85 },
    ],
    tags: ["MacBook", "Apple", "13-inch", "2019", "Silver"],
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Item Classification
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "upload" && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Upload a photo of your item and let our AI identify and categorize it instantly
                </p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Take a Photo or Upload Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">Supported formats: JPG, PNG, WebP (max 10MB)</p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleImageUpload}>
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" onClick={handleImageUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "analyzing" && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Analyzing Your Item...</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI is identifying the category, condition, and potential matches
                </p>
                <Progress value={analysisProgress} className="w-full max-w-md mx-auto" />
                <p className="text-xs text-muted-foreground mt-2">{analysisProgress}% complete</p>
              </div>
            </div>
          )}

          {step === "results" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Analysis Complete!</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Classification</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Category:</span>
                        <Badge>{mockResults.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Type:</span>
                        <span className="text-sm font-medium">{mockResults.subcategory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Confidence:</span>
                        <span className="text-sm font-medium text-primary">{mockResults.confidence}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Condition:</span>
                        <Badge variant="secondary">{mockResults.condition}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Est. Value:</span>
                        <span className="text-sm font-medium">{mockResults.estimatedValue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Suggested Swap Matches</h4>
                  <div className="space-y-2">
                    {mockResults.suggestedSwaps.map((swap, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">{swap.item}</span>
                        <Badge variant="outline">{swap.match}% match</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Detected Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockResults.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button>Create Listing</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

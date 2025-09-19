import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Camera, Upload, X, Sparkles, CheckCircle } from "lucide-react"

export function AIClassificationDemo({ onClose }) {
  const [step, setStep] = useState("upload")
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
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Item Classification
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {step === "upload" && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-lg font-medium">Upload Item Photo</p>
                    <p className="text-sm text-gray-500">
                      Upload a clear photo of your item for AI analysis
                    </p>
                  </div>
                  <Button onClick={handleImageUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "analyzing" && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">Analyzing Your Item</p>
                <p className="text-sm text-gray-500">
                  Our AI is processing your image to provide detailed insights
                </p>
              </div>
              <Progress value={analysisProgress} className="w-full" />
            </div>
          )}

          {step === "results" && (
            <div className="space-y-6">
              {/* Main Classification */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Primary Classification</p>
                    <p className="text-xl font-semibold">{mockResults.category}</p>
                    <p className="text-sm text-gray-500">{mockResults.subcategory}</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100">
                    {mockResults.confidence}% Confidence
                  </Badge>
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Estimated Condition</p>
                  <p className="font-medium">{mockResults.condition}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Estimated Value Range</p>
                  <p className="font-medium">{mockResults.estimatedValue}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Detected Tags</p>
                <div className="flex flex-wrap gap-2">
                  {mockResults.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Suggested Swaps */}
              <div className="space-y-4">
                <p className="text-sm font-medium">Suggested Swap Matches</p>
                <div className="space-y-2">
                  {mockResults.suggestedSwaps.map((swap) => (
                    <div
                      key={swap.item}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span>{swap.item}</span>
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {swap.match}% Match
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
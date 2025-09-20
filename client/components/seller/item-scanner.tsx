"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, X, Sparkles, Check, Loader2 } from "lucide-react"

interface ItemScannerProps {
  onClose: () => void
}

export function ItemScanner({ onClose }: ItemScannerProps) {
  const [scanStep, setScanStep] = useState<"capture" | "analyze" | "details" | "complete">("capture")
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [itemDetails, setItemDetails] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    estimatedValue: "",
    swapPreferences: [] as string[],
  })

  const handleImageCapture = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setCapturedImage(e.target?.result as string)
      analyzeImage()
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async () => {
    setIsScanning(true)
    setScanStep("analyze")

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis({
        title: "Vintage Leather Armchair",
        category: "Furniture",
        condition: "Good",
        description:
          "Classic brown leather armchair with wooden frame. Shows some wear on armrests but structurally sound.",
        estimatedValue: "$150-200",
        suggestedSwaps: ["Modern furniture", "Home decor", "Books"],
        confidence: 92,
      })
      setItemDetails((prev) => ({
        ...prev,
        title: "Vintage Leather Armchair",
        category: "Furniture",
        condition: "Good",
        description:
          "Classic brown leather armchair with wooden frame. Shows some wear on armrests but structurally sound.",
        estimatedValue: "175",
      }))
      setIsScanning(false)
      setScanStep("details")
    }, 3000)
  }

  const handleSubmit = () => {
    setScanStep("complete")
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              AI Item Scanner
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {scanStep === "capture" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Capture Your Item</h3>
                <p className="text-muted-foreground mb-4">
                  Take a photo or upload an image of your item for AI analysis
                </p>
              </div>

              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-sm text-muted-foreground">Supports JPG, PNG up to 10MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageCapture(e.target.files[0])}
                />
              </div>
            </div>
          )}

          {scanStep === "analyze" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured item"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="font-medium">Analyzing your item...</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI is identifying the category, condition, and estimated value
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">Detecting item category...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">Assessing condition...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">Estimating value...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {scanStep === "details" && aiAnalysis && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured item"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="bg-primary text-primary-foreground mb-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {aiAnalysis.confidence}% Confidence
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input
                    id="title"
                    value={itemDetails.title}
                    onChange={(e) => setItemDetails((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={itemDetails.category}
                    onValueChange={(value) => setItemDetails((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Sports Equipment">Sports Equipment</SelectItem>
                      <SelectItem value="Kitchen Items">Kitchen Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={itemDetails.condition}
                    onValueChange={(value) => setItemDetails((prev) => ({ ...prev, condition: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={itemDetails.estimatedValue}
                    onChange={(e) => setItemDetails((prev) => ({ ...prev, estimatedValue: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={itemDetails.description}
                  onChange={(e) => setItemDetails((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Suggested Swap Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.suggestedSwaps.map((swap: string) => (
                    <Badge
                      key={swap}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {swap}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setScanStep("capture")}>
                  Retake Photo
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  List Item for Swap
                </Button>
              </div>
            </div>
          )}

          {scanStep === "complete" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Item Listed Successfully!</h3>
              <p className="text-muted-foreground">Your item is now live and available for swapping</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

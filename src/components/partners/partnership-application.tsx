"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, FileText, CheckCircle, Building2, Leaf, Package } from "lucide-react"

export function PartnershipApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: "",
    sustainabilityPrograms: [],
    documents: [],
  })

  const steps = [
    { number: 1, title: "Business Information", icon: Building2 },
    { number: 2, title: "Sustainability Programs", icon: Leaf },
    { number: 3, title: "Partnership Details", icon: Package },
    { number: 4, title: "Documentation", icon: FileText },
  ]

  const businessTypes = [
    { id: "retail", label: "Retail Store", description: "Physical or online retail business" },
    { id: "restaurant", label: "Restaurant/Café", description: "Food service establishment" },
    { id: "service", label: "Service Provider", description: "Repair, cleaning, or other services" },
    { id: "manufacturer", label: "Manufacturer", description: "Product manufacturing business" },
    { id: "nonprofit", label: "Non-Profit", description: "Community organization or NGO" },
  ]

  const sustainabilityOptions = [
    { id: "reusable-packaging", label: "Reusable Packaging Program" },
    { id: "bulk-refill", label: "Bulk & Refill Services" },
    { id: "repair-upcycle", label: "Repair & Upcycling" },
    { id: "composting", label: "Composting Program" },
    { id: "zero-waste", label: "Zero Waste Initiative" },
    { id: "local-sourcing", label: "Local Sourcing" },
    { id: "renewable-energy", label: "Renewable Energy" },
    { id: "carbon-neutral", label: "Carbon Neutral Operations" },
  ]

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className="text-sm font-medium">{step.title}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            \{steps[currentStep - 1].icon && <steps[currentStep - 1].icon className="h-5 w-5" />}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input id="business-name" placeholder="Enter your business name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Person *</Label>
                  <Input id="contact-name" placeholder="Your full name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="business@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address *</Label>
                <Input id="address" placeholder="Street address" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code *</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Type *</Label>
                <RadioGroup
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  {businessTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <div className="flex-1">
                        <Label htmlFor={type.id} className="font-medium cursor-pointer">
                          {type.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your business, products/services, and target customers..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Current Sustainability Programs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all sustainability initiatives your business currently implements or plans to implement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sustainabilityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Environmental Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waste-reduction">Monthly Waste Reduction Goal (lbs)</Label>
                    <Input id="waste-reduction" type="number" placeholder="e.g., 500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customers-served">Customers Served Monthly</Label>
                    <Input id="customers-served" type="number" placeholder="e.g., 1000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sustainability-goals">Sustainability Goals & Timeline</Label>
                  <Textarea
                    id="sustainability-goals"
                    placeholder="Describe your sustainability goals and expected timeline for implementation..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Partnership Preferences</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preferred Partnership Type</Label>
                    <RadioGroup>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="basic" id="basic" />
                        <div className="flex-1">
                          <Label htmlFor="basic" className="font-medium cursor-pointer">
                            Basic Partnership
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Directory listing and basic promotional support
                          </p>
                        </div>
                        <Badge variant="outline">Free</Badge>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="premium" id="premium" />
                        <div className="flex-1">
                          <Label htmlFor="premium" className="font-medium cursor-pointer">
                            Premium Partnership
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Featured listings, analytics dashboard, and marketing support
                          </p>
                        </div>
                        <Badge>$49/month</Badge>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="offers">Special Offers for EcoSwap Members</Label>
                    <Textarea
                      id="offers"
                      placeholder="Describe any discounts, programs, or special services you'd like to offer to EcoSwap community members..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collaboration">Collaboration Interests</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="events" />
                        <Label htmlFor="events">Community events and workshops</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="education" />
                        <Label htmlFor="education">Educational content creation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="research" />
                        <Label htmlFor="research">Sustainability research partnerships</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cross-promotion" />
                        <Label htmlFor="cross-promotion">Cross-promotion with other partners</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Required Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload the following documents to complete your application.
                </p>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Business License or Registration</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload your business license, registration, or incorporation documents
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Sustainability Certifications (Optional)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      B-Corp, LEED, organic certifications, or other sustainability credentials
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Certificates
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Business Photos</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Photos of your storefront, products, or sustainability initiatives
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Terms and Conditions</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the EcoSwap Partner Terms and Conditions and understand that my business information
                      will be reviewed before approval.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing" className="text-sm leading-relaxed">
                      I consent to receive marketing communications about partnership opportunities and platform
                      updates.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="data" />
                    <Label htmlFor="data" className="text-sm leading-relaxed">
                      I agree to share basic business metrics (anonymized) to help improve the EcoSwap platform and
                      demonstrate collective impact.
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>
            <div className="flex gap-2">
              {currentStep < 4 ? (
                <Button onClick={nextStep}>Next Step</Button>
              ) : (
                <Button className="bg-primary">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

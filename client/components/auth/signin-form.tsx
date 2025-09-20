"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, ArrowRightLeft, Eye, EyeOff, Loader2, Shield, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface FormData {
  email: string
  password: string
}

export function SigninForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("user")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Admin bypass for testing - hardcoded credentials
      if (activeTab === "admin") {
        const ADMIN_USERNAME = "admin"
        const ADMIN_PASSWORD = "admin123"

        if (formData.email === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
          // Create mock admin token and user
          const adminToken = "admin-test-token-" + Date.now()
          const adminUser = {
            id: "admin-1",
            email: "admin@ecoswap.com",
            role: "admin",
            name: "System Administrator"
          }

          await login(adminToken, adminUser)
          router.push("/analytics") // Always redirect to user dashboard
          return
        } else {
          throw new Error("Invalid admin credentials")
        }
      }

      // Normal user authentication flow
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      if (response.ok) {
        const { token } = await response.json()
        await login(token)
        router.push("/analytics") // Always redirect to user dashboard
      } else {
        const data = await response.json()
        throw new Error(data.error || "Sign in failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    })
    setError("")
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    resetForm()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Leaf className="h-12 w-12 text-primary" />
              <ArrowRightLeft className="absolute -bottom-1 -right-1 h-6 w-6 text-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back to EcoSwap</CardTitle>
          <CardDescription>
            {activeTab === "admin"
              ? "Admin portal access - Manage the platform"
              : "Sign in to continue your sustainable journey"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                User
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="user" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Username</Label>
                    <Input
                      id="admin-email"
                      name="email"
                      type="text"
                      placeholder="Enter admin username"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter admin password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Test Credentials:</strong><br />
                      Username: <code className="bg-yellow-100 px-1 rounded">admin</code><br />
                      Password: <code className="bg-yellow-100 px-1 rounded">admin123</code>
                    </p>
                  </div>
                </TabsContent>

                {activeTab === "user" && (
                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-4 mt-6">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      {activeTab === "admin" ? (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Sign In
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </>
                  )}
                </Button>

                {activeTab === "user" && (
                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
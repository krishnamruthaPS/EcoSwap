"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Bell, User, Menu, Leaf, ArrowRightLeft, BarChart3, Users, Building2, Home, LogIn, UserPlus, Settings, LogOut, Store } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, isLoading } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    setUserMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary" />
              <ArrowRightLeft className="absolute -bottom-1 -right-1 h-4 w-4 text-accent" />
            </div>
            <span className="text-xl font-bold text-foreground font-[family-name:var(--font-poppins)]">EcoSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <Link href="/" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/marketplace" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Marketplace</span>
            </Link>
            <Link href="/community" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </Link>
            <Link href="/analytics" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link href="/partners" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <Building2 className="h-4 w-4" />
              <span>Partners</span>
            </Link>
          </nav>

          {/* Search Bar (commented out) */}
          {/*
          <div className="flex-1 flex justify-center px-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="search"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          */}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
              </Button>
            )}

            {/* Authentication State */}
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            ) : isAuthenticated ? (
              /* Profile Dropdown - Shown when logged in */
              <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    {/* Avatar */}
                    {/* You can use Avatar component here if available */}
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.name && <p className="font-medium">{user.name}</p>}
                      {user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); router.push("/profile"); }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); router.push("/settings"); }}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {/* Admin Dashboard only for admin role, but you said you want normal dashboard for admin, so skip this */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { handleSignOut(); }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Sign In/Sign Up Buttons - Shown when not logged in */
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => router.push('/auth/signin')}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button size="sm" onClick={() => router.push('/auth/signup')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 space-y-2">
              <Link href="/" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                Home
              </Link>
              <Link href="/marketplace" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                Marketplace
              </Link>
              <Link href="/community" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                Community
              </Link>
              <Link href="/analytics" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                Analytics
              </Link>
              <Link href="/partners" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                Partners
              </Link>
              {!isAuthenticated && (
                <>
                  <Link href="/auth/signin" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
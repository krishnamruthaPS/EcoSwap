"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, Menu, Leaf, ArrowRightLeft, BarChart3, Users, Building2, Home } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              
              
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span>AI Marketplace</span>
            </Link>
            <Link
              href="/partners"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Building2 className="h-4 w-4" />
              <span>Business Partners</span>
            </Link>
            <Link
              href="/community"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Community</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search items, partners, or community..." className="pl-10 w-full" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/marketplace"
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>AI Marketplace</span>
              </Link>
              <Link
                href="/partners"
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Building2 className="h-4 w-4" />
                <span>Business Partners</span>
              </Link>
              <Link
                href="/community"
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Link>
              <Link
                href="/analytics"
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
              <div className="pt-2">
                <Input type="search" placeholder="Search..." className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

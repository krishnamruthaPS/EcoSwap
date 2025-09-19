import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Bell, User, Menu, Leaf, ArrowRightLeft, BarChart3, Users, Building2, Home } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary" />
              <ArrowRightLeft className="absolute -bottom-1 -right-1 h-4 w-4 text-accent" />
            </div>
            <span className="text-xl font-bold text-foreground font-[family-name:var(--font-poppins)]">EcoSwap</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a
              href="/analytics"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </a>
            <a
              href="/community"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Community</span>
            </a>
            <a
              href="/partners"
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>Partners</span>
            </a>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <form className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="w-[300px] pl-8 bg-background"
                />
              </form>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="flex items-center space-x-2 text-foreground">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
              <a href="/analytics" className="flex items-center space-x-2 text-foreground">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </a>
              <a href="/community" className="flex items-center space-x-2 text-foreground">
                <Users className="w-5 h-5" />
                <span>Community</span>
              </a>
              <a href="/partners" className="flex items-center space-x-2 text-foreground">
                <Building2 className="w-5 h-5" />
                <span>Partners</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
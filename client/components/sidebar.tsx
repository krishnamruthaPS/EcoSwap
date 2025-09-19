"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  ArrowLeftRight,
  MessageCircle,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Leaf,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NotificationCenter } from "./real-time/notification-center"

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag, badge: "12 new" },
  { name: "My Swaps", href: "/swaps", icon: ArrowLeftRight, badge: "3" },
  { name: "Messages", href: "/messages", icon: MessageCircle, badge: "2" },
  { name: "Community", href: "/community", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

const supportItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ecoswap-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EcoSwap</span>
            </Link>
          )}
          <div className="flex items-center space-x-2">
            {!isCollapsed && <NotificationCenter />}
            <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 px-3 py-4">
          {!isCollapsed && <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Main Menu</p>}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-ecoswap-primary text-white" : "text-gray-700 hover:bg-gray-100",
                    isCollapsed && "justify-center",
                  )}
                >
                  <item.icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            isActive ? "bg-white/20 text-white" : "bg-ecoswap-primary text-white",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Support Section */}
          {!isCollapsed && (
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 mt-8">Support</p>
          )}
          <nav className="space-y-1 mt-4">
            {supportItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-ecoswap-primary text-white" : "text-gray-700 hover:bg-gray-100",
                    isCollapsed && "justify-center",
                  )}
                >
                  <item.icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Impact Tracker */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-4 h-4 text-ecoswap-primary mr-2" />
                <span className="text-sm font-medium text-gray-900">Your Impact</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items Swapped</span>
                  <span className="font-medium text-gray-900">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">CO₂ Saved</span>
                  <span className="font-medium text-gray-900">45kg</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Monthly Goal</span>
                    <span className="text-gray-900">76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ecoswap-primary h-2 rounded-full" style={{ width: "76%" }}></div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3 bg-ecoswap-primary hover:bg-ecoswap-primary/90 text-white text-sm">
                + List Item
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

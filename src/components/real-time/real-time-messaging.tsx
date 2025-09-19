"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, MoreVertical, ArrowRightLeft } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  type: "text" | "image" | "swap-proposal"
  swapDetails?: {
    itemOffered: string
    itemRequested: string
    status: "pending" | "accepted" | "declined"
  }
}

interface Conversation {
  id: string
  participant: {
    name: string
    avatar?: string
    online: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
}

export function RealTimeMessaging() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      participant: {
        name: "Sarah Chen",
        avatar: "/diverse-woman-portrait.png",
        online: true,
      },
      lastMessage: "Great! When would you like to meet for the swap?",
      timestamp: "2 min ago",
      unreadCount: 2,
    },
    {
      id: "2",
      participant: {
        name: "Mike Johnson",
        avatar: "/thoughtful-man.png",
        online: false,
      },
      lastMessage: "Is the garden tool set still available?",
      timestamp: "1 hour ago",
      unreadCount: 0,
    },
    {
      id: "3",
      participant: {
        name: "Emma Davis",
        online: true,
      },
      lastMessage: "Thanks for the quick response!",
      timestamp: "3 hours ago",
      unreadCount: 1,
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah Chen",
      senderAvatar: "/diverse-woman-portrait.png",
      content: "Hi! I'm interested in your kitchen appliances. Would you be willing to swap for my vintage camera?",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      content: "That sounds interesting! Can you tell me more about the camera?",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "sarah",
      senderName: "Sarah Chen",
      senderAvatar: "/diverse-woman-portrait.png",
      content: "It's a 1970s Pentax K1000 in excellent condition. Perfect for film photography enthusiasts!",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: "4",
      senderId: "sarah",
      senderName: "Sarah Chen",
      senderAvatar: "/diverse-woman-portrait.png",
      content: "Swap Proposal",
      timestamp: "10:36 AM",
      type: "swap-proposal",
      swapDetails: {
        itemOffered: "Vintage Pentax K1000 Camera",
        itemRequested: "Kitchen Appliance Set",
        status: "pending",
      },
    },
    {
      id: "5",
      senderId: "sarah",
      senderName: "Sarah Chen",
      senderAvatar: "/diverse-woman-portrait.png",
      content: "Great! When would you like to meet for the swap?",
      timestamp: "10:45 AM",
      type: "text",
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "me",
        senderName: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleSwapProposal = (action: "accept" | "decline", messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId && msg.swapDetails
          ? {
              ...msg,
              swapDetails: {
                ...msg.swapDetails,
                status: action === "accept" ? "accepted" : "declined",
              },
            }
          : msg,
      ),
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? "bg-blue-50 border-r-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.participant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{conversation.participant.name}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="w-5 h-5 p-0 flex items-center justify-center text-xs bg-blue-500">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-2">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/diverse-woman-portrait.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex space-x-2 max-w-xs ${message.senderId === "me" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      {message.senderId !== "me" && (
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {message.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        {message.type === "swap-proposal" ? (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center mb-2">
                              <ArrowRightLeft className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="font-medium text-blue-900">Swap Proposal</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <p>
                                <span className="font-medium">Offering:</span> {message.swapDetails?.itemOffered}
                              </p>
                              <p>
                                <span className="font-medium">Requesting:</span> {message.swapDetails?.itemRequested}
                              </p>
                            </div>
                            {message.swapDetails?.status === "pending" && message.senderId !== "me" && (
                              <div className="flex space-x-2 mt-3">
                                <Button
                                  size="sm"
                                  onClick={() => handleSwapProposal("accept", message.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSwapProposal("decline", message.id)}
                                >
                                  Decline
                                </Button>
                              </div>
                            )}
                            {message.swapDetails?.status !== "pending" && (
                              <Badge
                                className={`mt-2 ${
                                  message.swapDetails?.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {message.swapDetails?.status === "accepted" ? "Accepted" : "Declined"}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <div
                            className={`rounded-lg px-3 py-2 ${
                              message.senderId === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

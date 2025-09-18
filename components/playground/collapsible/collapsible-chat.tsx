"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle, Send, MoreVertical, Phone, Video } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  sender: string
  content: string
  time: string
  isOwn: boolean
}

interface ChatConversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: Message[]
}

const conversations: ChatConversation[] = [
  {
    id: "alice",
    name: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    lastMessage: "Hey! How's the project going?",
    time: "2m ago",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "Alice Johnson",
        content: "Hey! How's the project going?",
        time: "2m ago",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Going well! Just finished the UI components.",
        time: "1m ago",
        isOwn: true
      },
      {
        id: 3,
        sender: "Alice Johnson",
        content: "That's awesome! Can't wait to see them.",
        time: "30s ago",
        isOwn: false
      }
    ]
  },
  {
    id: "bob",
    name: "Bob Smith",
    avatar: "/avatars/bob.jpg",
    lastMessage: "Thanks for the help!",
    time: "1h ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Bob Smith",
        content: "Could you help me with the API integration?",
        time: "2h ago",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Sure! Let me send you the documentation.",
        time: "1h ago",
        isOwn: true
      },
      {
        id: 3,
        sender: "Bob Smith",
        content: "Thanks for the help!",
        time: "1h ago",
        isOwn: false
      }
    ]
  },
  {
    id: "team",
    name: "Team Chat",
    avatar: "/avatars/team.jpg",
    lastMessage: "Meeting at 3 PM today",
    time: "3h ago",
    unread: 5,
    online: true,
    messages: [
      {
        id: 1,
        sender: "Sarah",
        content: "Meeting at 3 PM today",
        time: "3h ago",
        isOwn: false
      },
      {
        id: 2,
        sender: "Mike",
        content: "I'll be there!",
        time: "2h ago",
        isOwn: false
      }
    ]
  }
]

export default function CollapsibleChat() {
  const [openChats, setOpenChats] = useState<Record<string, boolean>>({})
  const [newMessages, setNewMessages] = useState<Record<string, string>>({})

  const toggleChat = (id: string) => {
    setOpenChats(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleSendMessage = (chatId: string) => {
    const message = newMessages[chatId]
    if (message?.trim()) {
      // In a real app, you would send this message to your backend
      console.log(`Sending message to ${chatId}: ${message}`)
      setNewMessages(prev => ({ ...prev, [chatId]: '' }))
    }
  }

  const updateMessage = (chatId: string, message: string) => {
    setNewMessages(prev => ({ ...prev, [chatId]: message }))
  }

  return (
    <div className="w-[400px] border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="font-semibold">Messages</h2>
          <Badge variant="secondary">
            {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <Collapsible 
              open={openChats[conversation.id]} 
              onOpenChange={() => toggleChat(conversation.id)}
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-4 h-auto"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="h-5 min-w-5 text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openChats[conversation.id] ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="border-t bg-muted/30">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{conversation.name}</span>
                      {conversation.online && (
                        <Badge variant="secondary" className="text-xs">Online</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <ScrollArea className="h-48 p-3">
                    <div className="space-y-3">
                      {conversation.messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-2 rounded-lg text-sm ${
                              message.isOwn 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            {!message.isOwn && (
                              <div className="font-medium text-xs mb-1">{message.sender}</div>
                            )}
                            <div>{message.content}</div>
                            <div className={`text-xs mt-1 ${
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="p-3 border-t">
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Type a message..."
                        value={newMessages[conversation.id] || ''}
                        onChange={(e) => updateMessage(conversation.id, e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage(conversation.id)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleSendMessage(conversation.id)}
                        disabled={!newMessages[conversation.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  )
}
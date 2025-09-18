"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Users,
  UserPlus,
  MessageCircle
} from "lucide-react";

const users = [
  {
    id: 1,
    username: "sarah_dev",
    name: "Sarah Johnson",
    bio: "Full-stack developer passionate about React and TypeScript. Building the future one component at a time.",
    avatar: "https://i.pravatar.cc/80?img=1",
    location: "San Francisco, CA",
    website: "sarahdev.com",
    joinDate: "Joined March 2020",
    followers: 1234,
    following: 567,
    isFollowing: false,
    verified: true
  },
  {
    id: 2,
    username: "alex_design",
    name: "Alex Chen",
    bio: "UI/UX Designer & Frontend Developer. Creating beautiful and accessible user experiences.",
    avatar: "https://i.pravatar.cc/80?img=2",
    location: "New York, NY",
    website: "alexchen.design",
    joinDate: "Joined January 2019",
    followers: 2890,
    following: 432,
    isFollowing: true,
    verified: false
  },
  {
    id: 3,
    username: "mike_backend",
    name: "Mike Rodriguez",
    bio: "Backend engineer specializing in Node.js and cloud architecture. Coffee enthusiast ☕",
    avatar: "https://i.pravatar.cc/80?img=3",
    location: "Austin, TX",
    website: "mikerod.dev",
    joinDate: "Joined July 2021",
    followers: 856,
    following: 234,
    isFollowing: false,
    verified: true
  }
];

export default function HoverCardUserProfile() {
  const [followStates, setFollowStates] = useState<Record<number, boolean>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.isFollowing }), {} as Record<number, boolean>)
  );

  const toggleFollow = (userId: number) => {
    setFollowStates(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">User Profile Hover Cards</h3>
        <p className="text-sm text-muted-foreground">
          Hover over usernames to see detailed profile information
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {users.map((user) => (
          <HoverCard key={user.id}>
            <HoverCardTrigger asChild>
              <Button variant="link" className="flex items-center gap-2 p-0 h-auto">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-medium">@{user.username}</span>
                {user.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{user.name}</h4>
                        {user.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={followStates[user.id] ? "outline" : "default"}
                      onClick={() => toggleFollow(user.id)}
                      className="h-8"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      {followStates[user.id] ? "Following" : "Follow"}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm">{user.bio}</p>

                {/* Details */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <a href={`https://${user.website}`} className="text-blue-600 hover:underline">
                      {user.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{user.joinDate}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{user.following.toLocaleString()}</span>
                    <span className="text-muted-foreground">Following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{user.followers.toLocaleString()}</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}